import { projects } from "@/data/content";
import { Brackets, Metric, Section, SectionHead, Tag } from "./primitives";

/**
 * Four case-study blocks in the mockup's viewport style: hairline border, a
 * copper FIG tag notched into the top-left corner, CAD brackets, and blueprint
 * dimension callouts for the headline metrics.
 */
export default function Projects() {
  return (
    <Section id="projects" grid>
      <SectionHead num="03" title="Flagship Work" />

      <div className="grid gap-12">
        {projects.map((p) => (
          <article key={p.fig} className="relative border border-line p-[34px]">
            <Brackets />

            <span className="absolute -left-px -top-px bg-copper px-[9px] py-1 font-mono text-[11px] text-ink">
              FIG.{p.fig}
            </span>

            <div className="mt-3.5 font-mono text-xs text-copper">{p.org}</div>

            <h3 className="mb-3.5 mt-2.5 max-w-[540px] text-[21px] font-semibold leading-snug">
              {p.title}
            </h3>

            <p className="mb-[22px] max-w-[65ch] text-[14.5px] text-paper-dim">
              {p.body}
            </p>

            <div className="mb-5 flex flex-wrap gap-10">
              {p.metrics.map((m) => (
                <Metric key={m.label} num={m.num} label={m.label} />
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
