import { site } from "@/data/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Contact form delivery.
 *
 * Two independent sinks, both optional:
 *   1. Google Sheets — appends a row via an Apps Script webhook
 *      (see scripts/google-sheets-webhook.gs). Chosen over the Sheets API so
 *      there's no GCP project, service account or private key to manage.
 *   2. Email — Resend's REST API, called with plain fetch (no extra dependency).
 *
 * They're attempted together and the submission succeeds if *either* lands, so
 * a Sheets outage never costs you the enquiry. With neither configured the
 * endpoint returns 503 and the form tells visitors to email directly — nothing
 * ever silently swallows a message.
 */

const MAX = { name: 100, email: 254, subject: 150, message: 4000 };

/** Public endpoint with side effects — it needs a brake. */
const RATE_LIMIT = { windowMs: 60 * 60 * 1000, max: 5 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
    if (hits.size > 5_000) {
      for (const [key, value] of hits) if (now > value.resetAt) hits.delete(key);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

/** Deliberately permissive — real addresses beat a clever regex. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = keyof typeof MAX;

function readField(body: Record<string, unknown>, key: Field): string | null {
  const raw = body[key];
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > MAX[key]) return null;
  return trimmed;
}

type Submission = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
};

/** Appends one row to the sheet. Throws on any non-ok reply. */
async function appendToSheet(s: Submission): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) throw new Error("not configured");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Apps Script web apps answer with a 302 to googleusercontent.com.
    redirect: "follow",
    body: JSON.stringify({
      secret: process.env.GOOGLE_SHEETS_SECRET ?? "",
      ...s,
    }),
  });

  if (!res.ok) throw new Error(`sheets responded ${res.status}`);

  // Apps Script returns 200 even for handled failures, so check the payload.
  const payload = (await res.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;
  if (!payload?.ok) throw new Error(payload?.error ?? "sheets rejected the row");
}

async function sendEmail(s: Submission): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("not configured");

  // Plain text — nothing the sender typed is interpreted as markup.
  const text = [
    `From: ${s.name} <${s.email}>`,
    `Subject: ${s.subject}`,
    `Received: ${s.submittedAt}`,
    "",
    s.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? site.email],
      // Hitting Reply in the inbox answers the visitor directly.
      reply_to: s.email,
      subject: `Portfolio enquiry — ${s.subject}`,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`resend ${res.status}: ${detail.slice(0, 300)}`);
  }
}

export async function POST(req: Request) {
  const sheetsOn = Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL);
  const emailOn = Boolean(process.env.RESEND_API_KEY);

  if (!sheetsOn && !emailOn) {
    return Response.json(
      { error: `The form isn't connected yet — please email me at ${site.email}.` },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { error: "That's a few messages already — try again in a little while." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: hidden from people, irresistible to bots. Return success so the
  // bot sees a win, but record nothing.
  if (typeof body.company === "string" && body.company.trim()) {
    return Response.json({ ok: true });
  }

  const name = readField(body, "name");
  const email = readField(body, "email");
  const subject = readField(body, "subject");
  const message = readField(body, "message");

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "Please fill in every field." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const submission: Submission = {
    name,
    email,
    subject,
    message,
    // ISO 8601 UTC. The Apps Script turns this into a real Date cell, so the
    // sheet renders it in your timezone and stays sortable.
    submittedAt: new Date().toISOString(),
  };

  const tasks: Array<{ label: string; run: Promise<void> }> = [];
  if (sheetsOn) tasks.push({ label: "sheets", run: appendToSheet(submission) });
  if (emailOn) tasks.push({ label: "email", run: sendEmail(submission) });

  const results = await Promise.allSettled(tasks.map((t) => t.run));

  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[api/contact] ${tasks[i].label} failed:`, r.reason);
    }
  });

  // One sink landing is enough to call the enquiry captured.
  if (results.every((r) => r.status === "rejected")) {
    return Response.json(
      { error: `Couldn't send that. Please email me at ${site.email}.` },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
