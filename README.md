# Naga Prasad Kokku — Portfolio

Personal portfolio site with an "Ask Naga" AI assistant grounded in my résumé.

Built from `claude-code-build-brief.md`, with copy from `portfolio-content-draft.md`.
The visual direction is a dark near-black theme with a lime accent.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
Anthropic API · deployed on Vercel.

---

## Prerequisites

Node.js 18.17 or newer (Next.js 14 minimum). Check with `node --version`; if it
isn't installed, get the LTS build from [nodejs.org](https://nodejs.org).

## Run locally

```bash
npm install
```

Then create your local env file and add an API key from
[console.anthropic.com](https://console.anthropic.com/settings/keys):

```bash
cp .env.example .env.local
```

```bash
npm run dev
```

Open http://localhost:3000.

The site renders fully without a key — only the "Ask Naga" section needs one, and
it degrades to a clear message when `ANTHROPIC_API_KEY` is unset.

## Other commands

```bash
npm run build
```

```bash
npm run lint
```

---

## Project structure

```
src/
  app/
    layout.tsx        Fonts, metadata, <html> shell
    page.tsx          Composes the 10 sections in order
    globals.css       Design tokens + shared effects (glow, outline type)
    api/chat/route.ts "Ask Naga" backend — streams from the Anthropic API
  components/
    primitives.tsx    Section, SectionHead, Card, Tag, NumPill, Metric, Button
    Nav.tsx  Hero.tsx  StatStrip.tsx  SkillsTicker.tsx  About.tsx
    Competencies.tsx  Projects.tsx  Timeline.tsx  Recognition.tsx
    AskNaga.tsx  Contact.tsx  Footer.tsx
  data/
    content.ts        Every piece of site copy — edit here, not in components
    profile.ts        Résumé context + system prompt for the assistant
public/
  headshot.jpg
```

### Editing content

All copy lives in `src/data/content.ts`. Components read from it, so changing a
stat, a project metric, or a nav label is a one-line edit in that file.

If you update your résumé, update `src/data/profile.ts` too — that's what the
assistant is grounded in. The phone number on the PDF résumé is deliberately
excluded from it, matching the decision to keep the public site to email and
LinkedIn only.

---

## Design tokens

Dark system with a single accent, defined in both `tailwind.config.ts` and `globals.css`:

| Token | Value | Use |
|---|---|---|
| `ink` | `#07080A` | Page background |
| `surface` | `#121417` | Cards |
| `elevated` | `#0E1013` | Raised panels |
| `accent` | `#00E0B8` | CTAs, stats, highlights |
| `accent-hover` | `#00C3A0` | Solid-button hover |
| `accent2` | `#4C7CFF` | Secondary accent, used sparingly |
| `paper` | `#F3F5F6` | Primary text |
| `muted` | `#9AA0A6` | Secondary text |
| `dim` | `#62676D` | Labels, tertiary text |
| `line` | `rgba(255,255,255,.09)` | Hairlines |

**To re-accent the whole site**, change the three `accent*` entries in
`tailwind.config.ts` and their `--accent*` twins in `globals.css`. No component
hardcodes the colour. Both files list tested alternates in a comment:

| Palette | Accent | Hover | Contrast on `ink` |
|---|---|---|---|
| Teal (current) | `#00E0B8` | `#00C3A0` | 11.79:1 |
| Burnt orange | `#FF6B35` | `#E85A26` | 7.07:1 |
| Lime | `#D4FF3F` | `#C2EE2C` | 17.34:1 |

> Changing `tailwind.config.ts` requires a **dev-server restart** — Tailwind bakes
> the literal hex into its generated utility classes, so hot reload alone will
> update `--accent` in CSS but leave `bg-accent` / `text-accent` on the old colour.

Type is Space Grotesk for display headlines, Inter for body, JetBrains Mono for
labels, stats and the nav — loaded via `next/font/google`.

**Motion:** exactly one orchestrated moment — the staggered hero reveal on load,
plus the stat count-up when the strip first scrolls into view. Nothing else fades
up on scroll. Reduced motion is handled by `<MotionConfig reducedMotion="user">`
rather than by branching render output on `useReducedMotion()`, which would cause
a hydration mismatch.

---

## The "Ask Naga" assistant

`POST /api/chat` takes `{ messages: [{ role, content }] }` and streams back plain
text. The full résumé is injected as the system prompt — RAG-lite, no vector
store needed at this size.

- **Model:** `claude-opus-5`, overridable with `ANTHROPIC_MODEL`.
- **Prompt caching** on the profile block, so repeat questions are much cheaper.
- **Rate limiting:** 10 requests per IP per minute, in-memory. This resets on
  cold start and is per serverless instance — fine for portfolio traffic. If the
  endpoint ever gets genuinely abused, move the counter to Vercel KV or Upstash.
- **Grounding:** the prompt instructs the assistant to decline rather than invent
  details, to refuse contact info beyond email/LinkedIn, and to treat visitor
  messages as questions rather than instructions.

Costs are per-token and billed to the Anthropic account behind the key. Set a
spend limit in the console before making the site public.

---

## Deploy to Vercel

1. Push this directory to a GitHub repo.
2. In [Vercel](https://vercel.com/new), import the repo. The Next.js preset is
   detected automatically — no build settings to change.
3. Under **Settings → Environment Variables**, add `ANTHROPIC_API_KEY` (and
   `ANTHROPIC_MODEL` if you want a different model). Apply to Production,
   Preview and Development.
4. Deploy. Redeploy after adding env vars if the first build ran without them.
5. Optionally attach a custom domain under **Settings → Domains**.

`.env.local` is git-ignored. Never commit a real key — if one is ever pushed,
revoke it in the Anthropic console immediately.
