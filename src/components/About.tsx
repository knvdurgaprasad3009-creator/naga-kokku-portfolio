import Image from "next/image";
import { about, site } from "@/data/content";
import { Card, Section, SectionHead } from "./primitives";

export default function About() {
  return (
    <Section id="about">
      <SectionHead
        eyebrow="About"
        title="Hardware instincts. Enterprise software execution."
      />

      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Portrait — moved here from the hero, which is now full-bleed type.
            The source is a tall 478x1024 crop, so it's framed to a 4:5 box with
            object-cover rather than left to run the full column height. */}
        <div className="mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-line">
            <Image
              src="/headshot.jpg"
              alt={`${site.name}, ${site.title}`}
              width={478}
              height={1024}
              sizes="(max-width: 1024px) 340px, 500px"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="mt-4 flex items-center gap-2.5 font-mono text-[11.5px] text-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {site.location}
          </div>
        </div>

        <div>
          <div className="space-y-4">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="text-[15px] text-muted">
                {p}
              </p>
            ))}
          </div>

          {/* Fixed label column with left-aligned values, so both columns share
              a consistent edge. The previous justify-between layout right-aligned
              the values, which left their left edges ragged and wrapped long
              entries into a narrow, uneven block. */}
          <Card className="mt-8">
            <dl className="divide-y divide-line">
              {about.snapshot.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-1 gap-x-6 gap-y-1 py-3.5 text-[14px] first:pt-0 last:pb-0 sm:grid-cols-[132px_1fr]"
                >
                  <dt className="font-mono text-[11px] uppercase leading-5 tracking-[0.12em] text-dim">
                    {row.label}
                  </dt>
                  <dd className="leading-5 text-paper">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </Section>
  );
}
