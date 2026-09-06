import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { certifications, education, site } from "@/data/content";
import { siteUrl } from "@/lib/site-url";
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

/**
 * Person schema. Helps search engines connect the name to the role, employer
 * and credentials — which is most of the job for a portfolio that people reach
 * by searching the name.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  description,
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  email: `mailto:${site.email}`,
  sameAs: [site.linkedinUrl],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Memphis",
    addressRegion: "TN",
    addressCountry: "US",
  },
  worksFor: {
    "@type": "Organization",
    name: "Buckman Laboratories International Inc.",
  },
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
  })),
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
    ...(c.org ? { recognizedBy: { "@type": "Organization", name: c.org } } : {}),
  })),
  knowsAbout: [
    "Product Management",
    "Industrial IoT",
    "Retrieval-Augmented Generation",
    "Digital Twins",
    "Enterprise Platforms",
    "Supply Chain Optimization",
  ],
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
      <body className="bg-ink font-sans text-paper antialiased">
        {/* Reachable by keyboard, invisible until focused. */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>

        {children}

        <script
          type="application/ld+json"
          // Serialised from a local object, so there is no untrusted input here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
