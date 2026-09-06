import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/** Single-page site — one entry, but it gives crawlers a canonical host. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
