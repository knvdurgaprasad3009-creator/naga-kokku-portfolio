import type { Metadata } from "next";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="max-w-[520px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          404
        </p>

        <h1 className="mt-4 font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[42px]">
          There&apos;s nothing at this address.
        </h1>

        <p className="mx-auto mt-4 max-w-[42ch] text-[15px] text-muted">
          The link may be out of date. Everything on this site lives on a single
          page — head back and you&apos;ll find it.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-hover"
          >
            Back to the portfolio
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-line-strong px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Email me
          </a>
        </div>
      </div>
    </main>
  );
}
