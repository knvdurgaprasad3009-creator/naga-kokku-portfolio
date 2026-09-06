/**
 * Absolute base URL for metadata, share cards, the sitemap and robots.txt.
 *
 * Vercel injects VERCEL_URL per deployment. Set NEXT_PUBLIC_SITE_URL once a
 * custom domain is attached so those all point at the canonical host.
 *
 * NEXT_PUBLIC_* is inlined at build time, so set it in Vercel *before* the
 * build — changing it afterwards needs a redeploy to take effect.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
