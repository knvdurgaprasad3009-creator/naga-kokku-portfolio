import { skills } from "@/data/content";

/**
 * Horizontal auto-scrolling skills marquee. The list renders twice inside a
 * double-width track translated -50%, so the loop is seamless. Pure CSS — it
 * pauses on hover and stops under prefers-reduced-motion (globals.css).
 */
export default function SkillsTicker() {
  return (
    <section
      aria-label="Skills"
      className="relative overflow-hidden border-b border-line py-6"
    >
      {/* Fade the marquee out at both edges instead of clipping it hard. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />

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
                className="flex items-center whitespace-nowrap font-mono text-[12.5px] text-dim"
              >
                <span className="cursor-default px-5 transition-colors hover:text-accent">
                  {skill}
                </span>
                <span aria-hidden className="text-line-strong">
                  •
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
