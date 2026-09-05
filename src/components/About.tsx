import { about } from "@/data/content";
import { Section, SectionHead } from "./primitives";

export default function About() {
  return (
    <Section id="about" grid>
      <SectionHead num="01" title="About" />

      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {about.paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="mb-4 max-w-[60ch] text-[15.5px] text-paper-dim"
            >
              {p}
            </p>
          ))}
        </div>

        <dl className="h-fit border border-line p-[26px]">
          {about.snapshot.map((row, i) => (
            <div
              key={row.label}
              className={`flex justify-between gap-4 py-3 text-sm ${
                i === about.snapshot.length - 1 ? "" : "border-b border-line"
              }`}
            >
              <dt className="shrink-0 font-mono text-[12.5px] text-paper-dim">
                {row.label}
              </dt>
              <dd className="max-w-[60%] text-right text-paper">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
