import type { ReactNode } from "react";

/**
 * Shared building blocks for the dark/lime system: rounded surface cards,
 * pill tags, numbered section heads. Everything repeated across sections
 * lives here so the competency, project and recognition blocks stay identical.
 */

export function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`px-6 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-wrap">{children}</div>
    </section>
  );
}

/** Small monospace eyebrow above a section title. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
      <span className="h-px w-6 bg-accent" />
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mb-12 max-w-[720px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-[30px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[42px]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-[15px] text-muted">{intro}</p>}
    </header>
  );
}

/** Rounded surface card — the one container shape used site-wide. */
export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-card border border-line bg-surface p-7 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 font-mono text-[11.5px] text-muted">
      {children}
    </span>
  );
}

/** Numbered index pill — "01", "02", … */
export function NumPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-accent">
      {children}
    </span>
  );
}

export function Metric({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[26px] font-semibold text-accent">
        {num}
      </div>
      <div className="mt-1 max-w-[180px] text-[12.5px] text-dim">{label}</div>
    </div>
  );
}

/** Pill button. `variant="primary"` is the solid accent CTA. */
export function Button({
  href,
  variant = "secondary",
  external = false,
  children,
}: {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  children: ReactNode;
}) {
  const base =
    "inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200";
  const styles =
    variant === "primary"
      ? "bg-accent text-ink hover:bg-accent-hover"
      : "border border-line-strong text-paper hover:border-accent hover:text-accent";

  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {children}
    </a>
  );
}
