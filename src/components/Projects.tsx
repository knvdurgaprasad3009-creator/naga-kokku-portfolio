import { projects } from "@/data/content";
import { Card, Metric, Section, SectionHead, Tag } from "./primitives";

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHead
        eyebrow="Flagship Work"
        title="Four products, taken from discovery to production."
      />

      <div className="grid gap-5">
        {projects.map((p) => (
          <Card
            key={p.fig}
            className="transition-colors duration-200 hover:border-line-strong"
          >
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-[11px] text-accent">
                    {p.fig}
                  </span>
                  <span aria-hidden className="h-px w-5 bg-line-strong" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                    {p.org}
                  </span>
                </div>

                <h3 className="mb-3 max-w-[560px] font-display text-[21px] font-semibold leading-snug sm:text-[24px]">
                  {p.title}
                </h3>

                <p className="max-w-[62ch] text-[14.5px] text-muted">
                  {p.body}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>

                {"link" in p && p.link && (
                  <a
                    href={p.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] text-accent transition-colors hover:text-paper"
                  >
                    {p.link.label}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Headline metrics, pulled out of the prose */}
              <div className="flex gap-10 rounded-panel border border-line bg-elevated p-6 lg:flex-col lg:gap-6">
                {p.metrics.map((m) => (
                  <Metric key={m.label} num={m.num} label={m.label} />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
