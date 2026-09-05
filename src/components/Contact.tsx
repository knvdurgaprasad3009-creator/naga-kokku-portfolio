import { contact, site } from "@/data/content";
import { Button, Card, Eyebrow, Section } from "./primitives";

export default function Contact() {
  return (
    <Section id="contact">
      <Card className="relative overflow-hidden p-8 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Eyebrow>Contact</Eyebrow>

            <h2 className="max-w-[620px] font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[38px]">
              {contact.openTo}
            </h2>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`} variant="primary">
                Email me
              </Button>
              <Button href={site.linkedinUrl} external>
                Connect on LinkedIn
              </Button>
            </div>
          </div>

          <dl className="divide-y divide-line rounded-panel border border-line bg-elevated px-6">
            <div className="flex justify-between gap-4 py-4 text-[13.5px]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                Email
              </dt>
              <dd className="max-w-[64%] break-words text-right">
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </dd>
            </div>

            <div className="flex justify-between gap-4 py-4 text-[13.5px]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                LinkedIn
              </dt>
              <dd className="max-w-[64%] break-words text-right">
                <a
                  href={site.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {site.linkedinLabel}
                </a>
              </dd>
            </div>

            <div className="flex justify-between gap-4 py-4 text-[13.5px]">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                Location
              </dt>
              <dd className="text-right">{site.location}</dd>
            </div>
          </dl>
        </div>
      </Card>
    </Section>
  );
}
