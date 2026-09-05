"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/data/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-wrap items-center justify-between px-6 py-4"
      >
        <a
          href="#top"
          className="font-display text-[15px] font-semibold tracking-tight transition-colors hover:text-accent"
        >
          {site.shortName}
        </a>

        <ul className="hidden items-center gap-7 text-[13.5px] text-muted lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            className="hidden rounded-full border border-line-strong px-4 py-2 font-mono text-[12px] transition-colors hover:border-accent hover:text-accent sm:inline-block"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-full border border-line-strong px-4 py-2 font-mono text-[12px] text-muted transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-nav"
          className="border-t border-line bg-ink px-6 pb-5 pt-3 lg:hidden"
        >
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-[14px] text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
