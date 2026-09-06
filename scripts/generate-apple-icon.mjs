/**
 * Renders src/app/apple-icon.png (180x180) from src/app/icon.svg.
 *
 * Apple touch icons must be PNG, so the one SVG mark is the source of truth for
 * both. Re-run with `npm run icon` if icon.svg changes.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const svg = fs.readFileSync(path.join(root, "src/app/icon.svg"), "utf8");

const png = new Resvg(svg, {
  fitTo: { mode: "width", value: 180 },
  font: { loadSystemFonts: false },
})
  .render()
  .asPng();

const out = path.join(root, "src/app/apple-icon.png");
fs.writeFileSync(out, png);
console.log(`wrote ${path.relative(root, out)} — ${(png.length / 1024).toFixed(1)} KB, 180x180`);
