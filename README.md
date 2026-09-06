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

Regenerate the social share card after changing the name, title or stats:

```bash
npm run og
```

Regenerate the Apple touch icon after editing `src/app/icon.svg`:

```bash
npm run icon
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
    api/contact/route.ts  Contact form — Google Sheets + email
    icon.svg          Favicon; apple-icon.png is generated from it
    not-found.tsx     On-brand 404
    robots.ts         robots.txt
    sitemap.ts        sitemap.xml
  lib/
    site-url.ts       Canonical base URL, shared by metadata/sitemap/robots
  components/
    primitives.tsx    Section, SectionHead, Card, Tag, NumPill, Metric, Button
    Nav.tsx  Hero.tsx  StatStrip.tsx  SkillsTicker.tsx  About.tsx
    Competencies.tsx  Projects.tsx  Timeline.tsx  Recognition.tsx
    AskNaga.tsx  Contact.tsx  Footer.tsx
  data/
    content.ts        Every piece of site copy — edit here, not in components
    profile.ts        Résumé context + system prompt for the assistant
  app/og-fonts/       TTFs for the share-card generator (Satori needs TTF)
scripts/
  generate-og.mjs     Renders public/og.png from the site's tokens
public/
  headshot.jpg
  og.png              Social share card — committed, regenerate with `npm run og`
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

Dark system with exactly one accent, defined in both `tailwind.config.ts` and `globals.css`:

| Token | Value | Use |
|---|---|---|
| `ink` | `#07080A` | Page background |
| `surface` | `#121417` | Cards |
| `elevated` | `#0E1013` | Raised panels |
| `accent` | `#00E0B8` | CTAs, stats, highlights |
| `accent-hover` | `#00C3A0` | Solid-button hover |
| `paper` | `#F3F5F6` | Primary text |
| `muted` | `#9AA0A6` | Secondary text |
| `dim` | `#7A8189` | Labels, tertiary text |
| `line` | `rgba(255,255,255,.09)` | Hairlines |

There is deliberately **no secondary accent** — teal carries every
highlight, and anything that isn't a highlight is neutral.

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

## Contact form

`POST /api/contact` takes `{ name, email, subject, message }` and writes to two
independent sinks. Configure either or both:

**1. Google Sheets** — one row per submission: date contacted, name, email,
subject, message. It goes through an Apps Script webhook rather than the Sheets
API, so there's no GCP project, service account or private key to manage. Full
setup (about five minutes) is in `scripts/google-sheets-webhook.gs`; set
`GOOGLE_SHEETS_WEBHOOK_URL` and `GOOGLE_SHEETS_SECRET`.

The timestamp is sent as ISO 8601 UTC and written as a real Date cell, so the
column sorts and filters properly and renders in the sheet's own timezone.

**2. Email** via [Resend](https://resend.com), called with plain `fetch` — no
extra dependency. Set `RESEND_API_KEY`, optionally `CONTACT_TO` / `CONTACT_FROM`.
`reply_to` is the sender, so hitting Reply answers them directly.

Both are attempted together and the submission succeeds if **either** lands, so
a Sheets outage never costs an enquiry. With neither configured the form still
renders and returns 503 telling visitors to email directly — nothing silently
swallows a message.

**Abuse controls:** 5 submissions per IP per hour (in-memory, so it resets on
cold start and is per serverless instance), per-field length caps, an
email-format check, and an off-screen honeypot field that bots fill and people
never see. The message is stored and sent as plain text.

The sheet deliberately records no IP address — it isn't needed to answer an
enquiry, and it's the one field here that's unambiguously personal data.

---

## Social share card

`public/og.png` (1200x630) is generated by `scripts/generate-og.mjs` with Satori
and committed to the repo, so nothing renders it at build or request time.
Run `npm run og` after changing the name, title, stats or palette.

Share links resolve against `metadataBase`: Vercel's `VERCEL_URL` per deployment,
or `NEXT_PUBLIC_SITE_URL` once a custom domain is attached. That value is inlined
at **build** time, so set it in Vercel before deploying, not after.

> The idiomatic Next approach is `app/opengraph-image.tsx`, and it was tried
> first. Its bundled `@vercel/og` resolves its fallback font through
> `fileURLToPath` on a URL-encoded path, which throws `ERR_INVALID_URL` on
> Windows whenever the project directory contains spaces — and it fails the
> whole `next build`, not just the image. Driving Satori directly avoids that,
> because every font is supplied explicitly.

---

## SEO & discovery

- **`robots.txt`** allows everything except `/api/`, and points at the sitemap.
- **`sitemap.xml`** carries the single page — mainly to declare the canonical host.
- **JSON-LD `Person` schema** in the layout ties the name to the role, employer,
  degrees and certifications. Most people reach a portfolio by searching the
  name, so this is the part that helps them land on the right one. It's built
  from the same `content.ts` data, so it can't drift from the page.
- **Icons:** `src/app/icon.svg` is the source of truth; `apple-icon.png` is
  generated from it with `npm run icon`. The mark is geometric rather than
  lettered so it renders identically everywhere, with no font dependency.
- **`not-found.tsx`** is an on-brand 404 marked `noindex`.

All URLs resolve against `siteUrl` in `src/lib/site-url.ts`, which resolves in
this order: `NEXT_PUBLIC_SITE_URL` → the canonical domain (`kokkutech.online`) on
Vercel production → `VERCEL_URL` on previews → localhost.

The canonical domain is hardcoded rather than read from `VERCEL_URL`, because
that variable is the per-deployment hostname — using it in production would make
every build advertise a different canonical URL and publish share-card links
that rot.

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
