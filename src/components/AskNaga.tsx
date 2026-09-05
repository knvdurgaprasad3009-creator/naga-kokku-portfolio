"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { chat, site } from "@/data/content";
import { Brackets, Section, SectionHead } from "./primitives";

type Message = { role: "user" | "assistant"; content: string };

const GREETING =
  "Ask me anything about my product work — the IoT deployments, the RAG assistant, how I prioritize a roadmap. I'll answer from my résumé.";

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

      const history: Message[] = [...messages, { role: "user", content: question }];
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
      <SectionHead num="06" title="Ask Naga" />

      <div className="relative border border-line p-6 sm:p-8">
        <Brackets />

        <span className="absolute -left-px -top-px bg-copper px-[9px] py-1 font-mono text-[11px] text-ink">
          AI TWIN
        </span>

        <p className="mb-6 mt-3.5 max-w-[62ch] text-[14.5px] text-paper-dim">
          {GREETING}
        </p>

        {/* ---- Transcript ---- */}
        <div
          ref={scrollRef}
          className="chat-scroll mb-4 max-h-[420px] min-h-[120px] overflow-y-auto border border-line bg-ink-2/40 p-4 sm:p-5"
          aria-live="polite"
          aria-atomic="false"
        >
          {!started && (
            <p className="font-mono text-[12.5px] text-paper-dim">
              {"// no questions yet — pick a starter below or type your own"}
            </p>
          )}

          <ul className="space-y-4">
            {messages.map((m, i) => (
              <li key={i}>
                <div
                  className={`mb-1 font-mono text-[11px] tracking-[0.04em] ${
                    m.role === "user" ? "text-paper-dim" : "text-copper"
                  }`}
                >
                  {m.role === "user" ? "YOU" : "NAGA"}
                </div>

                <div
                  className={`max-w-[68ch] whitespace-pre-wrap text-[14.5px] ${
                    m.role === "user" ? "text-paper" : "text-paper-dim"
                  }`}
                >
                  {m.content}
                  {/* Blinking caret while the last assistant turn is streaming */}
                  {busy &&
                    m.role === "assistant" &&
                    i === messages.length - 1 && (
                      <span className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse bg-copper" />
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Starter prompts ---- */}
        {!started && (
          <div className="mb-4 flex flex-wrap gap-2">
            {chat.starters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                disabled={busy}
                className="border border-line px-2.5 py-[7px] font-mono text-[11.5px] text-paper-dim transition-colors hover:border-copper hover:text-copper disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ---- Composer ---- */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="flex flex-col gap-2 sm:flex-row"
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
            className="flex-1 border border-line bg-transparent px-3.5 py-3 text-[14.5px] text-paper placeholder:text-paper-dim/60 focus:border-copper focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="border border-copper bg-copper px-[22px] py-3 font-mono text-[13px] font-semibold text-ink transition-colors hover:border-copper-dim hover:bg-copper-dim disabled:cursor-not-allowed disabled:opacity-45"
          >
            {busy ? "THINKING…" : "SEND"}
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-3 font-mono text-[12px] text-copper">
            {error}
          </p>
        )}

        <p className="mt-4 border-t border-line pt-4 font-mono text-[11.5px] leading-relaxed text-paper-dim">
          {chat.disclaimer}
        </p>
      </div>
    </Section>
  );
}
