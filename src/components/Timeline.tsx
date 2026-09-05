import { experience } from "@/data/content";
import { Section, SectionHead } from "./primitives";

/** Vertical timeline: hairline connector, accent node on the current role. */
export default function Timeline() {
  return (
    <Section id="experience">
      <SectionHead eyebrow="Experience" title="Where I've done the work." />

      <ol className="relative border-l border-line pl-7 sm:pl-10">
        {experience.map((job) => (
          <li
            key={`${job.role}-${job.dates}`}
            className="relative pb-12 last:pb-0"
          >
            <span
              aria-hidden
              className={`absolute top-2 h-2.5 w-2.5 rounded-full -left-[calc(1.75rem+5px)] sm:-left-[calc(2.5rem+5px)] ${
                job.current
                  ? "bg-accent ring-4 ring-accent-soft"
                  : "border border-line-strong bg-ink"
              }`}
            />

            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              {job.dates}
            </div>

            <h3 className="font-display text-[18px] font-semibold leading-snug">
              {job.role}
            </h3>

            <div className="mb-4 mt-1 text-[13.5px] text-dim">
              {job.org} · {job.place}
            </div>

            {job.bullets.length > 0 && (
              <ul className="max-w-[72ch] space-y-2.5">
                {job.bullets.map((b) => (
                  <li
                    key={b.slice(0, 40)}
                    className="relative pl-5 text-[14.5px] text-muted before:absolute before:left-0 before:top-[10px] before:h-1 before:w-1 before:rounded-full before:bg-line-strong"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
