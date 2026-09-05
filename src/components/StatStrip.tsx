"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { stats } from "@/data/content";

/**
 * Blueprint dimension-style stat callouts: tick mark + mono numeral, hairline
 * dividers — not big gradient numbers. The count-up is the second half of the
 * page-load moment; it fires once, the first time the strip is on screen.
 */

/**
 * Per-cell divider rules. Mobile is a 2×2 grid (right border on the left
 * column, bottom border on the top row); desktop is a single row of four with
 * no trailing edge. Written out per index rather than derived, so Tailwind's
 * scanner sees every literal class.
 */
const DIVIDERS = [
  "border-r border-b md:border-b-0",
  "border-b md:border-b-0 md:border-r",
  "border-r",
  "",
];

function StatValue({
  to,
  decimals,
  prefix,
  suffix,
  play,
}: {
  to: number;
  decimals: number;
  prefix: string;
  suffix: string;
  play: boolean;
}) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const final = to.toFixed(decimals);

  // `counted` only takes over once we're client-side and actually animating.
  // Server-rendered HTML therefore carries the real number, so the stats still
  // read correctly with JavaScript disabled and to crawlers.
  const [counted, setCounted] = useState<string | null>(null);

  useEffect(() => {
    if (reduced) return;
    setCounted((0).toFixed(decimals));
  }, [reduced, decimals]);

  useEffect(() => {
    if (!play || reduced) return;

    const unsubscribe = mv.on("change", (v) => setCounted(v.toFixed(decimals)));
    const controls = animate(mv, to, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [play, reduced, to, decimals, mv]);

  return (
    <span>
      {prefix}
      {counted ?? final}
      {suffix}
    </span>
  );
}

export default function StatStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section aria-label="Key results" className="border-y border-line">
      <div ref={ref} className="mx-auto grid max-w-wrap grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={s.label} className={`border-line px-8 py-[30px] ${DIVIDERS[i]}`}>
            <div className="flex items-baseline font-mono text-[30px] font-semibold text-copper">
              <span className="tick" />
              <StatValue
                to={s.to}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                play={inView}
              />
            </div>
            <div className="mt-1.5 max-w-[160px] text-[12.5px] text-paper-dim">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
