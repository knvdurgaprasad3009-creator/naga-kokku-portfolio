import { recognition } from "@/data/content";
import { Card, NumPill, Section, SectionHead } from "./primitives";

export default function Recognition() {
  return (
    <Section id="recognition">
      <SectionHead
        eyebrow="Recognition"
        title="Awards, patents, and credentials."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {recognition.map((panel) => (
          <Card key={panel.num}>
            <div className="mb-5 flex items-center gap-3 border-b border-line pb-4">
              <NumPill>{panel.num}</NumPill>
              <h3 className="font-display text-[16px] font-semibold">
                {panel.title}
              </h3>
            </div>

            <ul className="space-y-3">
              {panel.items.map((item) => (
                <li
                  key={item}
                  className="relative pl-5 text-[14px] text-muted before:absolute before:left-0 before:top-[9px] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
