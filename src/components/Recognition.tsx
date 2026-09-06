import {
  awardGroups,
  certifications,
  coverage,
  education,
  patents,
  recognitionCounts,
  type Patent,
} from "@/data/content";
import { Card, Section, SectionHead } from "./primitives";

/**
 * Recognition previously read as four identical bullet lists, which blended
 * into the surrounding prose. It now leads with a row of count tiles, gives
 * patents a featured two-card treatment with status chips, and turns awards
 * into scannable chips — so the section carries visual weight of its own.
 */

function ExternalArrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function PatentCard({ patent }: { patent: Patent }) {
  const linked = Boolean(patent.url);
  const issued = patent.status === "Issued";

  const inner = (
    <>
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.14em] ${
            issued
              ? "bg-accent text-ink"
              : "border border-line-strong text-muted"
          }`}
        >
          {patent.status}
        </span>

        {linked && (
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-dim transition-colors group-hover:text-accent">
            View record
            <ExternalArrow />
          </span>
        )}
      </div>

      <h4 className="font-display text-[16.5px] font-semibold leading-snug text-paper">
        {patent.title}
      </h4>

      {/* Granted patents lead with the patent number and grant date; pending
          ones show the application number and filing date. */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[11.5px] text-dim">
        <span>{patent.org}</span>

        <span aria-hidden className="text-line-strong">
          ·
        </span>
        <span>
          {issued
            ? `Patent ${patent.patentNumber}`
            : `App. ${patent.applicationNumber}`}
        </span>

        <span aria-hidden className="text-line-strong">
          ·
        </span>
        <span>
          {issued ? "Issued" : "Filed"} {patent.date}
        </span>
      </div>
    </>
  );

  const base =
    "group relative rounded-card border border-line bg-surface p-6 transition-colors duration-200";

  // Renders as a plain card until a URL exists — no dead links ship.
  return linked ? (
    <a
      href={patent.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} block hover:border-accent`}
    >
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
}

export default function Recognition() {
  return (
    <Section id="recognition">
      <SectionHead
        eyebrow="Recognition"
        title="Patents, awards, and credentials."
      />

      {/* Count tiles — gives the section an anchor before the detail */}
      <div className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-4">
        {recognitionCounts.map((c) => (
          <div key={c.label} className="bg-surface px-6 py-6">
            <div className="font-display text-[30px] font-semibold leading-none text-accent">
              {c.value}
            </div>
            <div className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              {c.label}
            </div>
          </div>
        ))}
      </div>

      {/* Patents — featured */}
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
        Patents
      </h3>
      <div className="mb-12 grid gap-4 md:grid-cols-2">
        {patents.map((p, i) => (
          <PatentCard key={`${p.status}-${i}`} patent={p} />
        ))}
      </div>

      {/* Coverage — third-party proof, so it sits high in the section */}
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
        In the press
      </h3>
      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        {coverage.map((c) => (
          <a
            key={c.url}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-card border border-line bg-surface p-5 transition-colors duration-200 hover:border-accent"
          >
            <span className="mt-0.5 shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
              {c.kind}
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-[14.5px] font-medium leading-snug text-paper">
                {c.title}
              </span>
              <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-[11.5px] text-dim">
                <span>{c.outlet}</span>
                {c.meta && (
                  <>
                    <span aria-hidden className="text-line-strong">
                      ·
                    </span>
                    <span>{c.meta}</span>
                  </>
                )}
              </span>
            </span>

            <span className="mt-0.5 text-dim transition-colors group-hover:text-accent">
              <ExternalArrow />
            </span>
          </a>
        ))}
      </div>

      {/* Awards — split by employer, so the section shows recognition earned
          at two very different organisations rather than one flat list */}
      <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
        Awards
      </h3>
      <div className="mb-12 grid gap-4 md:grid-cols-2">
        {awardGroups.map((group) => (
          <Card key={group.org} className="p-6 sm:p-6">
            <h4 className="mb-4 border-b border-line pb-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
              {group.org}
            </h4>
            <ul>
              {group.items.map((a) => (
                <li key={a.name} className="flex items-center gap-3.5 py-2.5">
                  <span
                    className={`min-w-[34px] rounded-md py-1 text-center font-mono text-[11.5px] font-semibold ${
                      a.count > 1
                        ? "bg-accent-soft text-accent"
                        : "border border-line text-dim"
                    }`}
                  >
                    {a.count > 1 ? `${a.count}×` : a.count}
                  </span>
                  <span className="text-[13.5px] text-paper">{a.name}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Education + certifications */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            Education
          </h3>
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={e.degree}>
                <div className="text-[14.5px] font-medium text-paper">
                  {e.degree}
                </div>
                <div className="mt-1 font-mono text-[11.5px] text-dim">
                  {e.school}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="mb-5 font-mono text-[11px] uppercase tracking-[0.18em] text-dim">
            Certifications
          </h3>
          <ul className="space-y-4">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>
                  <span className="text-[14.5px] text-paper">{c.name}</span>
                  {c.org && (
                    <span className="ml-2 font-mono text-[11.5px] text-dim">
                      {c.org}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
