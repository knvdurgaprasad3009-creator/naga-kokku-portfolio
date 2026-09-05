"use client";

import { useRef, useState } from "react";
import { site } from "@/data/content";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-xl border border-line bg-elevated px-4 py-3 text-[14.5px] text-paper placeholder:text-dim focus:border-accent focus:outline-none disabled:opacity-60";

const LABEL =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-dim";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(payload?.error ?? "Something went wrong. Try again?");
      }

      setStatus("sent");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again?",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-card border border-accent/40 bg-accent-soft p-8 text-center">
        <p className="font-display text-[19px] font-semibold text-paper">
          Thanks — message sent.
        </p>
        <p className="mx-auto mt-2 max-w-[42ch] text-[14px] text-muted">
          It lands straight in my inbox and I&apos;ll reply to the address you
          gave. Usually within a couple of days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-full border border-line-strong px-5 py-2.5 font-mono text-[12px] text-paper transition-colors hover:border-accent hover:text-accent"
        >
          Send another
        </button>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="relative rounded-card border border-line bg-surface p-6 sm:p-7"
    >
      <p className={LABEL.replace("mb-2 ", "mb-5 ")}>Send a message</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={LABEL}>
            Name
          </label>
          <input
            id="cf-name"
            name="name"
            required
            maxLength={100}
            autoComplete="name"
            disabled={busy}
            placeholder="Your name"
            className={FIELD}
          />
        </div>

        <div>
          <label htmlFor="cf-email" className={LABEL}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            disabled={busy}
            placeholder="you@company.com"
            className={FIELD}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="cf-subject" className={LABEL}>
          Subject
        </label>
        <input
          id="cf-subject"
          name="subject"
          required
          maxLength={150}
          disabled={busy}
          placeholder="What's this about?"
          className={FIELD}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="cf-message" className={LABEL}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          disabled={busy}
          placeholder="A few lines about the role, the team, or what you're building."
          className={`${FIELD} resize-y`}
        />
      </div>

      {/* Honeypot — hidden from people, catnip to bots. Not `display:none`,
          which some bots detect; positioned off-screen and out of the tab order. */}
      <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="cf-company">Company (leave blank)</label>
        <input id="cf-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-45"
        >
          {busy ? "Sending…" : "Send message"}
        </button>

        <span className="font-mono text-[11.5px] text-dim">
          or email{" "}
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-accent"
          >
            {site.email}
          </a>
        </span>
      </div>

      {error && (
        <p role="alert" className="mt-4 font-mono text-[12px] text-accent">
          {error}
        </p>
      )}
    </form>
  );
}
