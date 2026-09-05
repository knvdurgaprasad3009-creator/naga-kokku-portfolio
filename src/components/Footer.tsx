import { site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-8 py-12 text-center font-mono text-xs text-paper-dim">
      <p>
        {site.brandLeft}
        <span className="text-copper">·</span>
        {site.brandRight} — {site.title.toUpperCase()}
      </p>
      <p className="mt-2">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
