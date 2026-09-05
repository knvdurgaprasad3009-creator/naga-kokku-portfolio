import { contact, site } from "@/data/content";
import ContactForm from "./ContactForm";
import { Button, Eyebrow, Section } from "./primitives";

export default function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* Pitch + direct routes */}
        <div>
          <Eyebrow>Contact</Eyebrow>

          <h2 className="max-w-[520px] font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[36px]">
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

          <dl className="mt-9 divide-y divide-line rounded-panel border border-line bg-elevated px-6">
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

        <ContactForm />
      </div>
    </Section>
  );
}
