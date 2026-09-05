"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { chat, site } from "@/data/content";
import { Card, Section, SectionHead } from "./primitives";

type Message = { role: "user" | "assistant"; content: string };

export default function AskNaga() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Keep the newest message in view as tokens stream in.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // Don't leave a request hanging if the visitor navigates away mid-answer.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || busy) return;

      setError(null);
      setInput("");

      const history: Message[] = [
        ...messages,
        { role: "user", content: question },
      ];
      // Render the user turn plus an empty assistant turn to stream into.
      setMessages([...history, { role: "assistant", content: "" }]);
      setBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const payload = await res.json().catch(() => null);
          throw new Error(
            payload?.error ?? "Couldn't reach the assistant. Please try again.",
          );
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            next[next.length - 1] = { ...last, content: last.content + chunk };
            return next;
          });
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;

        // Drop the empty assistant bubble and surface the failure instead.
        setMessages((prev) => prev.slice(0, -1));
        setError(
          err instanceof Error
            ? err.message
            : "Couldn't reach the assistant. Please try again.",
        );
      } finally {
        setBusy(false);
        abortRef.current = null;
        inputRef.current?.focus();
      }
    },
    [busy, messages],
  );

  const started = messages.length > 0;

  return (
    <Section id="ask">
      <SectionHead
        eyebrow="AI Twin"
        title="Ask me anything about my product work."
        intro="Grounded in my résumé — the IoT deployments, the RAG assistant, how I prioritize a roadmap."
      />

      <Card className="p-0 sm:p-0">
        {/* Transcript */}
        <div
          ref={scrollRef}
          className="chat-scroll max-h-[440px] min-h-[180px] overflow-y-auto p-6 sm:p-8"
          aria-live="polite"
          aria-atomic="false"
        >
          {!started && (
            <p className="font-mono text-[12.5px] text-dim">
              No questions yet — pick a starter below, or type your own.
            </p>
          )}

          <ul className="space-y-6">
            {messages.map((m, i) => (
              <li key={i}>
                <div
                  className={`mb-2 font-mono text-[10.5px] uppercase tracking-[0.16em] ${
                    m.role === "user" ? "text-dim" : "text-accent"
                  }`}
                >
                  {m.role === "user" ? "You" : site.name.split(" ")[0]}
                </div>

                <div
                  className={`max-w-[70ch] whitespace-pre-wrap text-[14.5px] leading-relaxed ${
                    m.role === "user" ? "text-paper" : "text-muted"
                  }`}
                >
                  {m.content}
                  {busy &&
                    m.role === "assistant" &&
                    i === messages.length - 1 && (
                      <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse-dot bg-accent" />
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-line p-6 sm:p-8">
          {!started && (
            <div className="mb-4 flex flex-wrap gap-2">
              {chat.starters.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  disabled={busy}
                  className="rounded-full border border-line px-3.5 py-2 font-mono text-[11.5px] text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex flex-col gap-2.5 sm:flex-row"
          >
            <label htmlFor="ask-input" className="sr-only">
              Ask a question about {site.name}
            </label>
            <input
              id="ask-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              maxLength={1000}
              autoComplete="off"
              placeholder="Ask about a project, a metric, or how I work…"
              className="flex-1 rounded-full border border-line bg-elevated px-5 py-3 text-[14.5px] text-paper placeholder:text-dim focus:border-accent focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink transition-colors hover:bg-[#c2ee2c] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {busy ? "Thinking…" : "Send"}
            </button>
          </form>

          {error && (
            <p role="alert" className="mt-3 font-mono text-[12px] text-accent">
              {error}
            </p>
          )}

          <p className="mt-5 text-[11.5px] leading-relaxed text-dim">
            {chat.disclaimer}
          </p>
        </div>
      </Card>
    </Section>
  );
}
