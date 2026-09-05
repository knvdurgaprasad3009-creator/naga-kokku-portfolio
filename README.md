# Naga Prasad Kokku — Portfolio

Personal portfolio site with an "Ask Naga" AI assistant grounded in my résumé.

Built from `claude-code-build-brief.md`, with copy from `portfolio-content-draft.md`
and the visual direction from `portfolio-mockup.html`.

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
    globals.css       Design tokens + blueprint motifs (grid, brackets, tick)
    api/chat/route.ts "Ask Naga" backend — streams from the Anthropic API
  components/
    primitives.tsx    Shared motifs: Brackets, SectionHead, Section, Tag, Metric
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

Extracted from the approved mockup and defined in both `tailwind.config.ts` and
`globals.css`:

| Token | Value | Use |
|---|---|---|
| `ink` | `#0E2233` | Background |
| `ink-2` | `#132C42` | Secondary surface |
| `paper` | `#EDE6D6` | Primary text |
| `paper-dim` | `#B9C2C9` | Secondary text |
| `copper` | `#C97D3D` | CTAs, stats, highlights |
| `copper-dim` | `#8F5A2C` | Subdued accent |
| `line` | `rgba(237,230,214,0.18)` | Hairlines, grid |

Type is IBM Plex Sans for headings and body, IBM Plex Mono for data, labels,
stats and the nav brand — loaded via `next/font/google`.

**Motion:** exactly one orchestrated moment — the hero text stagger plus the CAD
bracket reveal on load, and the stat count-up when the strip first scrolls into
view. Nothing else fades up on scroll. Everything respects
`prefers-reduced-motion`.

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
