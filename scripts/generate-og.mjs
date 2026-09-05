/**
 * Generates public/og.png — the social share card — from the site's own tokens.
 *
 * Run with `npm run og` after changing the name, title, stats or palette.
 * The output is committed, so builds and deploys need nothing at runtime.
 *
 * Why not `app/opengraph-image.tsx` (the idiomatic Next route)? Its bundled
 * @vercel/og resolves its fallback font with fileURLToPath against a URL-encoded
 * path, which throws ERR_INVALID_URL on Windows whenever the project directory
 * contains spaces — and it fails the whole `next build`, not just the image.
 * Driving satori directly sidesteps that: we supply every font ourselves.
 *
 * Satori understands only a flexbox subset of CSS. Every element with more than
 * one child needs an explicit display:flex, and `gap` is unsupported — spacing
 * is set per-child with margins.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => fs.readFileSync(path.join(root, ...p));

const T = {
  bg: "#07080a",
  accent: "#00e0b8",
  accentSoft: "rgba(0,224,184,0.14)",
  paper: "#f3f5f6",
  muted: "#9aa0a6",
  dim: "#7a8189",
  line: "rgba(255,255,255,0.09)",
};

const NAME = "Naga Prasad Kokku";
const ROLE = "Product Manager — IoT, AI & Enterprise Platforms";
const BLURB =
  "7+ years turning physical operations data into intelligent, automated software across six global regions.";
const STATUS = "Open to Product Manager / Senior PM roles";
const EMAIL = "knvdurgaprasad3009@gmail.com";
const LINKEDIN = "linkedin.com/in/knvdurgaprasad";
const STATS = [
  ["7+", "Years of product experience"],
  ["$7.2M", "Unmanaged spend uncovered"],
  ["6", "Global regions"],
  ["95%", "AI order-intake accuracy"],
];

/** Terse element helper so the tree below stays readable. */
const el = (type, style, children) => ({ type, props: { style, children } });
const row = (style, children) =>
  el("div", { display: "flex", ...style }, children);
const text = (content, style) =>
  el("div", { display: "flex", ...style }, content);

const headshot = `data:image/jpeg;base64,${read("public", "headshot.jpg").toString("base64")}`;

const tree = row(
  {
    width: 1200,
    height: 630,
    background: T.bg,
    fontFamily: "Inter",
    position: "relative",
  },
  [
    // accent wash, mirroring the site's hero glow
    el("div", {
      position: "absolute",
      top: -240,
      left: -180,
      width: 800,
      height: 800,
      borderRadius: 9999,
      display: "flex",
      background:
        "radial-gradient(circle, rgba(0,224,184,0.17) 0%, rgba(0,224,184,0) 70%)",
    }),

    // ---- text column ----
    row(
      {
        flexDirection: "column",
        justifyContent: "center",
        width: 780,
        padding: "60px 0 60px 68px",
      },
      [
        text(STATUS, {
          alignSelf: "flex-start",
          border: "1px solid rgba(0,224,184,0.32)",
          background: T.accentSoft,
          color: T.accent,
          borderRadius: 9999,
          padding: "10px 20px",
          fontSize: 20,
        }),
        text(NAME, {
          fontFamily: "Space Grotesk",
          fontWeight: 700,
          fontSize: 76,
          letterSpacing: -2.2,
          color: T.paper,
          marginTop: 28,
          lineHeight: 1.04,
        }),
        text(ROLE, {
          fontFamily: "Space Grotesk",
          fontWeight: 500,
          fontSize: 27,
          color: T.accent,
          marginTop: 16,
        }),
        text(BLURB, {
          fontSize: 22,
          lineHeight: 1.45,
          color: T.muted,
          marginTop: 18,
          maxWidth: 640,
        }),
        row(
          { marginTop: 38, paddingTop: 26, borderTop: `1px solid ${T.line}` },
          STATS.map(([value, label], i) =>
            row(
              {
                flexDirection: "column",
                paddingRight: 30,
                marginRight: 30,
                borderRight:
                  i === STATS.length - 1 ? "none" : `1px solid ${T.line}`,
              },
              [
                text(value, {
                  fontFamily: "Space Grotesk",
                  fontWeight: 700,
                  fontSize: 35,
                  color: T.accent,
                }),
                text(label, {
                  fontSize: 15,
                  color: T.dim,
                  marginTop: 8,
                  maxWidth: 125,
                  lineHeight: 1.3,
                }),
              ],
            ),
          ),
        ),
      ],
    ),

    // ---- portrait ----
    row(
      {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 60px 60px 0",
      },
      [
        el("img", {
          width: 290,
          height: 362,
          objectFit: "cover",
          objectPosition: "top",
          borderRadius: 20,
          border: `1px solid ${T.line}`,
        }),
      ],
    ),

    // ---- footer ----
    row(
      {
        position: "absolute",
        bottom: 32,
        left: 68,
        right: 60,
        justifyContent: "space-between",
        fontSize: 17,
        color: T.dim,
      },
      [text(EMAIL, {}), text(LINKEDIN, {})],
    ),
  ],
);

// satori needs the img src on props, not style
tree.props.children[2].props.children[0].props.src = headshot;

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: "Space Grotesk",
      data: read("src", "app", "og-fonts", "SpaceGrotesk-Bold.ttf"),
      weight: 700,
      style: "normal",
    },
    {
      name: "Space Grotesk",
      data: read("src", "app", "og-fonts", "SpaceGrotesk-Medium.ttf"),
      weight: 500,
      style: "normal",
    },
    {
      name: "Inter",
      data: read("src", "app", "og-fonts", "Inter-Regular.ttf"),
      weight: 400,
      style: "normal",
    },
  ],
});

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: { loadSystemFonts: false },
})
  .render()
  .asPng();

const out = path.join(root, "public", "og.png");
fs.writeFileSync(out, png);
console.log(`wrote ${path.relative(root, out)} — ${(png.length / 1024).toFixed(0)} KB, 1200x630`);
