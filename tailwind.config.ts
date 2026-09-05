import type { Config } from "tailwindcss";

/**
 * Dark design system with a single warm accent.
 *
 * Every value below is shared with globals.css. To re-accent the whole site,
 * change the three `accent*` entries here and their `--accent*` twins in
 * globals.css. No component hardcodes the colour.
 *
 * Alternates that hold up on this ground (contrast vs. #07080a):
 *   teal          #00e0b8 / #00c3a0   (current)  11.79:1
 *   burnt orange  #ff6b35 / #e85a26               7.07:1
 *   lime          #d4ff3f / #c2ee2c              17.34:1
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07080a", // page background
        surface: "#121417", // cards
        elevated: "#0e1013", // subtle raised panels
        accent: "#00e0b8", // primary accent — CTAs, stats, highlights
        "accent-hover": "#00c3a0", // solid-button hover
        "accent-soft": "rgba(0,224,184,0.14)",
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
