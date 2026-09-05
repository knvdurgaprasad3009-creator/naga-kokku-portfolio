"use client";

import { useEffect, useState } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { hero, site } from "@/data/content";
import { Button } from "./primitives";

/**
 * The one orchestrated animation on the site: a staggered reveal of the status
 * pill, the display headline lines, and the supporting copy.
 *
 * Reduced motion is delegated to <MotionConfig reducedMotion="user">, which
 * drops transform animations at runtime. It deliberately is NOT handled by
 * branching on useReducedMotion(): that hook resolves to null during SSR and to
 * the real preference on the client, which produces a hydration mismatch.
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Cycles the accent phrase under the headline with a blinking caret. */
function TypedLine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % hero.typedPhrases.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-accent2">
      {hero.typedPhrases[index]}
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse-dot bg-accent2" />
    </span>
  );
}

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="top"
        className="hero-glow relative overflow-hidden px-6 pb-20 pt-16 sm:pb-28 sm:pt-24"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-wrap"
        >
          {/* Availability pill */}
          <motion.div variants={rise}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent-soft px-4 py-2 font-mono text-[12px] text-accent">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              {hero.status}
            </span>
          </motion.div>

          {/* Display headline — the outlined line is set in content.ts */}
          {/* No `uppercase` here on purpose — the lines are already cased in
              content.ts, which keeps "IoT" correct rather than "IOT". */}
          <h1 className="mt-8 font-display text-[clamp(34px,7.4vw,84px)] font-semibold leading-[1.04] tracking-[-0.02em]">
            {hero.headlineLines.map((line, i) => (
              <motion.span
                key={line}
                variants={rise}
                className={`block ${i === hero.outlinedLine ? "text-outline" : ""}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            variants={rise}
            className="mt-6 font-mono text-[15px] sm:text-[17px]"
          >
            <TypedLine />
          </motion.p>

          <motion.p
            variants={rise}
            className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-muted sm:text-[16px]"
          >
            7+ years building and commercializing enterprise, Industrial IoT,
            RAG, digital-twin, and asset-management products across global
            operations. I turn physical operations data into intelligent,
            automated software — uncovering{" "}
            <b className="font-semibold text-paper">$7.2M</b> in unmanaged spend
            and eliminating <b className="font-semibold text-paper">$4M</b> in
            unnecessary purchases along the way.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12.5px] text-dim"
          >
            <span>{site.location}</span>
            <span aria-hidden className="text-line-strong">
              /
            </span>
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <span aria-hidden className="text-line-strong">
              /
            </span>
            <a
              href={site.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-accent"
            >
              {site.linkedinLabel}
            </a>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
