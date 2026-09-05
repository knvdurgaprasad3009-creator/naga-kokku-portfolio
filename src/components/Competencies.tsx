import { competencies } from "@/data/content";
import { Section, SectionHead, Tag } from "./primitives";

export default function Competencies() {
  return (
    <Section id="competencies">
      <SectionHead num="02" title="Core Competencies" />

      <div className="grid gap-px border border-line bg-line md:grid-cols-3">
        {competencies.map((cluster) => (
          <div key={cluster.num} className="bg-ink p-7">
            <div className="mb-2 font-mono text-[11px] text-copper">
              {cluster.num}
            </div>
            <h3 className="mb-5 text-[17px] font-semibold leading-snug">
              {cluster.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cluster.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
