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
 * Stat row with hairline dividers. The count-up fires once, the first time the
 * strip scrolls into view.
 */
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

  // `counted` only takes over once we're client-side and actually animating,
  // so server-rendered HTML carries the real number — the stats still read
  // correctly with JavaScript disabled and to crawlers.
  const [counted, setCounted] = useState<string | null>(null);

  useEffect(() => {
    if (reduced) return;
    setCounted((0).toFixed(decimals));
  }, [reduced, decimals]);

  useEffect(() => {
    if (!play || reduced) return;

    const unsubscribe = mv.on("change", (v) => setCounted(v.toFixed(decimals)));
    const controls = animate(mv, to, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
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
    <section aria-label="Key results" className="border-y border-line px-6">
      <div
        ref={ref}
        className="mx-auto grid max-w-wrap grid-cols-2 gap-px md:grid-cols-4"
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`py-8 sm:py-10 ${i % 2 === 1 ? "pl-6" : "pr-6"} md:pl-6 md:pr-6 ${
              // Divider between cells only — never a trailing edge.
              i % 2 === 0 ? "border-r border-line" : "md:border-r md:border-line"
            } ${i === 3 ? "md:border-r-0" : ""} ${
              i < 2 ? "border-b border-line md:border-b-0" : ""
            }`}
          >
            <div className="font-display text-[32px] font-semibold leading-none text-accent sm:text-[40px]">
              <StatValue
                to={s.to}
                decimals={s.decimals}
                prefix={s.prefix}
                suffix={s.suffix}
                play={inView}
              />
            </div>
            <div className="mt-3 max-w-[170px] font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
