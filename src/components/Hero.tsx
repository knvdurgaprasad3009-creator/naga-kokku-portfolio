"use client";

import Image from "next/image";
import { MotionConfig, motion, type Variants } from "framer-motion";
import { hero, site } from "@/data/content";

/**
 * The one orchestrated animation on the site: a single staggered reveal of the
 * hero text plus the CAD corner brackets drawing themselves in around the
 * photo. Nothing else animates on scroll — per the design brief this is the one
 * memorable moment, not a page full of fade-ups.
 *
 * Reduced motion is delegated to <MotionConfig reducedMotion="user">, which
 * drops the transform half of each variant at runtime. It deliberately is NOT
 * handled by branching on useReducedMotion() here: that hook resolves to null
 * during SSR and to the real preference on the client, so branching the
 * rendered output on it produces a hydration mismatch.
 */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const frame: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
};

const bracketIn: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.55 + i * 0.08, ease: "easeOut" },
  }),
};

const BRACKET_POS = [
  "bracket-tl",
  "bracket-tr",
  "bracket-bl",
  "bracket-br",
] as const;

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="top" className="grid-bg relative px-8 pb-24 pt-[88px]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto grid max-w-wrap items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* ---- Text column ---- */}
          <div>
            <motion.p
              variants={rise}
              className="mb-[22px] flex items-center gap-2.5 font-mono text-[13px] text-copper"
            >
              <span className="inline-block h-px w-[22px] shrink-0 bg-copper" />
              {hero.kicker}
            </motion.p>

            <motion.h1
              variants={rise}
              className="max-w-[560px] text-[32px] font-semibold leading-[1.18] tracking-[-0.01em] text-paper sm:text-[44px]"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-[22px] max-w-[520px] text-[16.5px] text-paper-dim"
            >
              7+ years building and commercializing enterprise, Industrial IoT,
              RAG, digital-twin, and asset-management products across global
              operations. I turn physical operations data into intelligent,
              automated software — uncovering{" "}
              <b className="font-semibold text-paper">$7.2M</b> in unmanaged
              spend and eliminating{" "}
              <b className="font-semibold text-paper">$4M</b> in unnecessary
              purchases along the way.
            </motion.p>

            <motion.div
              variants={rise}
              className="mt-[34px] flex flex-wrap gap-3.5"
            >
              <a
                href={hero.primaryCta.href}
                className="border border-copper bg-copper px-[22px] py-[13px] font-mono text-[13.5px] font-semibold text-ink transition-colors hover:border-copper-dim hover:bg-copper-dim"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="border border-copper px-[22px] py-[13px] font-mono text-[13.5px] text-copper transition-colors hover:bg-copper hover:text-ink"
              >
                {hero.secondaryCta.label}
              </a>
            </motion.div>

            <motion.div
              variants={rise}
              className="mt-10 flex flex-wrap gap-[18px] font-mono text-[13.5px] text-paper-dim"
            >
              <span>{site.location}</span>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-copper"
              >
                {site.email}
              </a>
              <a
                href={site.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-copper"
              >
                {site.linkedinLabel}
              </a>
            </motion.div>
          </div>

          {/* ---- Photo column: CAD viewport, not a soft-shadow card ---- */}
          <motion.div
            variants={frame}
            className="relative mb-8 w-full max-w-[220px] sm:max-w-[340px] lg:mb-14 lg:ml-auto"
          >
            {BRACKET_POS.map((pos, i) => (
              <motion.span
                key={pos}
                custom={i}
                variants={bracketIn}
                className={`bracket ${pos}`}
              />
            ))}

            <Image
              src="/headshot.jpg"
              alt={`${site.name}, ${site.title}`}
              width={680}
              height={850}
              priority
              sizes="(max-width: 640px) 220px, 340px"
              className="block h-auto w-full border border-line contrast-[1.03] saturate-[0.9]"
            />

            <span className="absolute -bottom-[30px] -left-2 font-mono text-[11px] tracking-[0.03em] text-paper-dim">
              {hero.photoTag}
            </span>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
