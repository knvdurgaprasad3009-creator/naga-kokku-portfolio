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
      className={`sticky top-0 z-50 border-b border-line transition-colors duration-300 ${
        scrolled ? "bg-ink/90 backdrop-blur-sm" : "bg-ink"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-wrap items-center justify-between px-8 py-[22px]"
      >
        <a
          href="#top"
          className="font-mono text-sm tracking-[0.02em] text-paper transition-colors hover:text-copper"
        >
          {site.brandLeft}
          <span className="text-copper">·</span>
          {site.brandRight}
        </a>

        {/* Desktop links */}
        <ul className="hidden gap-7 text-sm text-paper-dim md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="transition-colors hover:text-copper"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="font-mono text-[13px] text-paper-dim transition-colors hover:text-copper md:hidden"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-nav"
          className="border-t border-line px-8 pb-5 pt-3 md:hidden"
        >
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 font-mono text-[13px] text-paper-dim transition-colors hover:text-copper"
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
