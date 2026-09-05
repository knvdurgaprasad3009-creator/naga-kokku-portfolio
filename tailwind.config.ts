import type { Config } from "tailwindcss";

/**
 * Dark / lime design system.
 *
 * Every value below is a single source of truth shared with globals.css.
 * To change the accent across the whole site, edit `accent` here and
 * `--accent` in globals.css — nothing else references the colour directly.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07080a", // page background
        surface: "#121417", // cards
        elevated: "#0e1013", // subtle raised panels
        accent: "#d4ff3f", // primary accent — CTAs, stats, highlights
        "accent-soft": "rgba(212,255,63,0.14)",
        accent2: "#4c7cff", // secondary accent — used sparingly
        "accent2-soft": "rgba(76,124,255,0.14)",
        paper: "#f3f5f6", // primary text
        muted: "#9aa0a6", // secondary text
        dim: "#62676d", // tertiary text / labels
        line: "rgba(255,255,255,0.09)",
        "line-strong": "rgba(255,255,255,0.18)",
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.09)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wrap: "1180px",
      },
      borderRadius: {
        card: "18px",
        panel: "16px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.16, 1, .3, 1)",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        ticker: "ticker 45s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
