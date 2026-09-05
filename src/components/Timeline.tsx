import { experience } from "@/data/content";
import { Section, SectionHead } from "./primitives";

/**
 * Vertical timeline: a copper connector line running down the left, mono date
 * labels, and a node per role. The current role gets a filled node.
 */
export default function Timeline() {
  return (
    <Section id="experience">
      <SectionHead num="04" title="Experience" />

      <ol className="relative border-l border-copper-dim pl-8 sm:pl-10">
        {experience.map((job) => (
          <li key={`${job.role}-${job.dates}`} className="relative pb-12 last:pb-0">
            {/* Connector node */}
            <span
              aria-hidden
              className={`absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 border-2 border-copper sm:-left-[calc(2.5rem+5px)] ${
                job.current ? "bg-copper" : "bg-ink"
              }`}
            />

            <div className="mb-1 font-mono text-[12px] tracking-[0.04em] text-copper">
              {job.dates}
            </div>

            <h3 className="text-[17px] font-semibold leading-snug">{job.role}</h3>

            <div className="mb-3 font-mono text-[12.5px] text-paper-dim">
              {job.org} · {job.place}
            </div>

            {job.bullets.length > 0 && (
              <ul className="max-w-[70ch] space-y-2">
                {job.bullets.map((b) => (
                  <li
                    key={b.slice(0, 40)}
                    className="relative pl-4 text-[14.5px] text-paper-dim before:absolute before:left-0 before:top-[9px] before:h-px before:w-2 before:bg-copper-dim"
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
