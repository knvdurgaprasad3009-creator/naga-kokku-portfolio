import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/data/profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Trades quality for cost if you set it — see .env.example. */
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-5";

const MAX_MESSAGE_CHARS = 1_000;
const MAX_HISTORY_TURNS = 12;

/**
 * Crude per-IP throttle. This endpoint is public and spends real money, so it
 * needs *some* brake. In-memory means it resets on cold start and is per
 * serverless instance — fine for a portfolio's traffic, but if this ever gets
 * genuinely abused, move the counter to Upstash/Vercel KV.
 */
const RATE_LIMIT = { windowMs: 60_000, max: 10 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });

    // Opportunistic sweep so the map can't grow without bound.
    if (hits.size > 5_000) {
      for (const [key, value] of hits) {
        if (now > value.resetAt) hits.delete(key);
      }
    }
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT.max;
}

type IncomingMessage = { role: "user" | "assistant"; content: string };

function parseMessages(body: unknown): IncomingMessage[] | null {
  if (typeof body !== "object" || body === null) return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: IncomingMessage[] = [];
  for (const item of raw) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;

    const trimmed = content.trim();
    if (!trimmed) return null;
    messages.push({ role, content: trimmed.slice(0, MAX_MESSAGE_CHARS) });
  }

  // Keep only the tail of a long conversation, and make sure it still starts
  // with a user turn — the API rejects a history that opens on `assistant`.
  const tail = messages.slice(-MAX_HISTORY_TURNS);
  while (tail.length && tail[0].role !== "user") tail.shift();
  if (!tail.length || tail[tail.length - 1].role !== "user") return null;

  return tail;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The assistant is not configured yet. Please email me instead." },
      { status: 503 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return Response.json(
      { error: "That's a lot of questions at once — give it a minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = parseMessages(body);
  if (!messages) {
    return Response.json({ error: "Invalid message list." }, { status: 400 });
  }

  const client = new Anthropic();

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 2048,
      // Q&A over a fixed profile — low effort keeps replies quick and cheap
      // without costing anything in answer quality at this scope.
      output_config: { effort: "low" },
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          // The profile is identical on every request; caching it makes repeat
          // questions substantially cheaper.
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });

    const encoder = new TextEncoder();

    const responseStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }

          const final = await stream.finalMessage();
          if (final.stop_reason === "refusal") {
            controller.enqueue(
              encoder.encode(
                "Sorry — I can't answer that one. Ask me about my product work instead.",
              ),
            );
          }
        } catch (error) {
          console.error("[api/chat] stream failed:", error);
          controller.enqueue(
            encoder.encode(
              "\n\nSomething went wrong on my end. Please try again, or email me at knvdurgaprasad3009@gmail.com.",
            ),
          );
        } finally {
          controller.close();
        }
      },
      cancel() {
        stream.abort();
      },
    });

    return new Response(responseStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("[api/chat] bad ANTHROPIC_API_KEY");
      return Response.json(
        { error: "The assistant is misconfigured. Please email me instead." },
        { status: 503 },
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return Response.json(
        { error: "I'm getting a lot of questions right now — try again shortly." },
        { status: 429 },
      );
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`[api/chat] Anthropic API error ${error.status}:`, error.message);
    } else {
      console.error("[api/chat] unexpected error:", error);
    }
    return Response.json(
      { error: "Couldn't reach the assistant. Please try again." },
      { status: 502 },
    );
  }
}
