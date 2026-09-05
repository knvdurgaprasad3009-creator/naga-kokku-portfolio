import { site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-wrap flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="font-display text-[14px] font-semibold">{site.shortName}</p>
        <p className="font-mono text-[11.5px] text-dim">
          © {new Date().getFullYear()} · {site.location}
        </p>
      </div>
    </footer>
  );
}
