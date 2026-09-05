import { contact, site } from "@/data/content";
import { Section, SectionHead } from "./primitives";

export default function Contact() {
  return (
    <Section id="contact" grid>
      <SectionHead num="07" title="Contact" />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <div className="mb-[22px] flex items-center gap-2.5 font-mono text-[13px] text-copper">
            <span className="inline-block h-px w-[22px] shrink-0 bg-copper" />
            OPEN TO
          </div>

          <p className="max-w-[540px] text-[26px] font-semibold leading-[1.25] tracking-[-0.01em]">
            {contact.openTo}
          </p>

          <div className="mt-[34px] flex flex-wrap gap-3.5">
            <a
              href={`mailto:${site.email}`}
              className="border border-copper bg-copper px-[22px] py-[13px] font-mono text-[13.5px] font-semibold text-ink transition-colors hover:border-copper-dim hover:bg-copper-dim"
            >
              Email me
            </a>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-copper px-[22px] py-[13px] font-mono text-[13.5px] text-copper transition-colors hover:bg-copper hover:text-ink"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>

        {/* Mirrors the hero contact line, in snapshot-panel form. */}
        <dl className="border border-line p-[26px]">
          <div className="flex justify-between gap-4 border-b border-line py-3 text-sm">
            <dt className="font-mono text-[12.5px] text-paper-dim">EMAIL</dt>
            <dd className="max-w-[65%] break-words text-right">
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-copper"
              >
                {site.email}
              </a>
            </dd>
          </div>

          <div className="flex justify-between gap-4 border-b border-line py-3 text-sm">
            <dt className="font-mono text-[12.5px] text-paper-dim">LINKEDIN</dt>
            <dd className="max-w-[65%] break-words text-right">
              <a
                href={site.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-copper"
              >
                {site.linkedinLabel}
              </a>
            </dd>
          </div>

          <div className="flex justify-between gap-4 py-3 text-sm">
            <dt className="font-mono text-[12.5px] text-paper-dim">LOCATION</dt>
            <dd className="text-right">{site.location}</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
