import { recognition } from "@/data/content";
import { Section, SectionHead } from "./primitives";

/** Awards, patents, education and certifications in snapshot-card style panels. */
export default function Recognition() {
  return (
    <Section id="recognition" grid>
      <SectionHead num="05" title="Recognition" />

      <div className="grid gap-6 md:grid-cols-2">
        {recognition.map((panel) => (
          <div key={panel.num} className="border border-line p-[26px]">
            <div className="mb-4 flex items-baseline gap-3 border-b border-line pb-3">
              <span className="font-mono text-[11px] text-copper">
                {panel.num}
              </span>
              <h3 className="text-[15px] font-semibold">{panel.title}</h3>
            </div>

            <ul className="space-y-2.5">
              {panel.items.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 text-[14px] text-paper-dim before:absolute before:left-0 before:top-[9px] before:h-px before:w-2 before:bg-copper-dim"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
