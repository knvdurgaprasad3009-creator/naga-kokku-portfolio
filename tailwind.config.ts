import type { Config } from "tailwindcss";

/**
 * Design tokens are lifted verbatim from the approved mockup
 * (portfolio-mockup.html) so Tailwind utilities and raw CSS stay in sync.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E2233",
        "ink-2": "#132C42",
        paper: "#EDE6D6",
        "paper-dim": "#B9C2C9",
        copper: "#C97D3D",
        "copper-dim": "#8F5A2C",
        line: "rgba(237,230,214,0.18)",
      },
      borderColor: {
        DEFAULT: "rgba(237,230,214,0.18)",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        wrap: "1120px",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        ticker: "ticker 45s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
