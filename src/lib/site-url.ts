/**
 * Absolute base URL for metadata, share cards, the sitemap and robots.txt.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — explicit override, wins everywhere.
 *   2. Production on Vercel  — the canonical domain below. Hardcoded on purpose:
 *      VERCEL_URL is the per-deployment hostname, so relying on it would make
 *      every production build advertise a different canonical URL and publish
 *      share-card links that rot.
 *   3. Preview deployments   — VERCEL_URL, so previews reference themselves.
 *   4. Local development     — localhost.
 *
 * NEXT_PUBLIC_* is inlined at build time, so changing it needs a redeploy.
 */
const CANONICAL = "https://kokkutech.com";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? CANONICAL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
