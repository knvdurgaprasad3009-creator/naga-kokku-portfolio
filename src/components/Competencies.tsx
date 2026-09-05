import { competencies } from "@/data/content";
import { Card, NumPill, Section, SectionHead, Tag } from "./primitives";

export default function Competencies() {
  return (
    <Section id="competencies">
      <SectionHead
        eyebrow="Expertise"
        title="Three clusters I build products in."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {competencies.map((cluster) => (
          <Card
            key={cluster.num}
            className="transition-colors duration-200 hover:border-line-strong"
          >
            <NumPill>{cluster.num}</NumPill>
            <h3 className="mb-5 mt-5 font-display text-[19px] font-semibold leading-snug">
              {cluster.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cluster.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
