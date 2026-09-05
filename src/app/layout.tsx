import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/data/content";
import "./globals.css";

/** Display face — headlines and section titles only. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** Data, labels, stats, nav brand. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Naga Prasad Kokku — Product Manager with 7+ years building and commercializing enterprise, Industrial IoT, RAG, and digital-twin products across six global regions.";

/**
 * Absolute base for OG/Twitter image URLs. Vercel injects VERCEL_URL per
 * deployment; set NEXT_PUBLIC_SITE_URL once a custom domain is attached so
 * share cards point at the canonical host rather than the preview URL.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

/** Regenerate with `npm run og` after changing the name, title or stats. */
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Naga Prasad Kokku — Product Manager, IoT, AI & Enterprise Platforms",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.title}`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "Product Manager",
    "Industrial IoT",
    "AI Products",
    "Enterprise Platforms",
    "RAG",
    "Digital Twin",
    "Naga Prasad Kokku",
  ],
  authors: [{ name: site.name, url: site.linkedinUrl }],
  creator: site.name,
  openGraph: {
    type: "profile",
    title: `${site.name} — ${site.title}`,
    description,
    siteName: site.name,
    locale: "en_US",
    url: "/",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07080A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-ink font-sans text-paper antialiased">{children}</body>
    </html>
  );
}
