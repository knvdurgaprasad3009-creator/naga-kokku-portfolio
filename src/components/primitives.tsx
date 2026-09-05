import type { ReactNode } from "react";

/**
 * Shared blueprint motifs. Everything the mockup repeats — CAD corner brackets,
 * numbered section heads, tag pills — lives here so the four project blocks, the
 * competency clusters and the recognition panels stay visually identical.
 */

/** The four copper CAD-viewport corner brackets, drawn around a bordered box. */
export function Brackets() {
  return (
    <>
      <span className="bracket bracket-tl" />
      <span className="bracket bracket-tr" />
      <span className="bracket bracket-bl" />
      <span className="bracket bracket-br" />
    </>
  );
}

export function SectionHead({
  num,
  title,
}: {
  num: string;
  title: string;
}) {
  return (
    <div className="mb-10 flex items-baseline gap-3.5">
      <span className="font-mono text-[13px] text-copper-dim">{num}</span>
      <h2 className="text-[26px] font-semibold leading-tight">{title}</h2>
    </div>
  );
}

export function Section({
  id,
  grid = false,
  className = "",
  children,
}: {
  id?: string;
  grid?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`px-8 py-[88px] ${grid ? "grid-bg" : ""} ${className}`}
    >
      <div className="mx-auto max-w-wrap">{children}</div>
    </section>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border border-line px-2.5 py-[5px] font-mono text-[11.5px] text-paper-dim">
      {children}
    </span>
  );
}

/** Blueprint dimension callout: tick mark + mono numeral + small label. */
export function Metric({
  num,
  label,
  size = "md",
}: {
  num: string;
  label: string;
  size?: "md" | "lg";
}) {
  return (
    <div>
      <div
        className={`flex items-baseline font-mono font-semibold text-copper ${
          size === "lg" ? "text-[30px]" : "text-2xl"
        }`}
      >
        <span className="tick" />
        {num}
      </div>
      <div className="mt-0.5 max-w-[180px] text-xs text-paper-dim">{label}</div>
    </div>
  );
}
