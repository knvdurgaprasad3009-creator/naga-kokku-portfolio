import { skills } from "@/data/content";

/**
 * Horizontal auto-scrolling skills marquee. The list is rendered twice inside a
 * 200%-wide track and translated -50%, so the loop is seamless. Pure CSS — it
 * pauses on hover and stops entirely under prefers-reduced-motion (globals.css).
 */
export default function SkillsTicker() {
  return (
    <section
      aria-label="Skills"
      className="overflow-hidden border-b border-line py-5"
    >
      <div className="ticker-track flex w-max animate-ticker">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {skills.map((skill) => (
              <li
                key={skill}
                className="flex items-center whitespace-nowrap font-mono text-[13px] text-paper-dim"
              >
                <span className="cursor-default px-6 transition-colors hover:text-copper">
                  {skill}
                </span>
                <span aria-hidden className="text-copper-dim">
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
