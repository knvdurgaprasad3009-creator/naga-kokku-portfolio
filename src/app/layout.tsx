import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/data/content";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const description =
  "Naga Prasad Kokku — Product Manager with 7+ years building and commercializing enterprise, Industrial IoT, RAG, and digital-twin products across six global regions.";

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E2233",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-ink font-sans text-paper antialiased">{children}</body>
    </html>
  );
}
