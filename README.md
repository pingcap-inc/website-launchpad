# website-launchpad

> Marketing pages and landing pages powered by Next.js + Tailwind CSS.  
> Business teams use AI to generate pages. Tech team maintains the design system.

Next.js pages coexisting with the main [PingCAP](https://www.pingcap.com) WordPress site. Nginx proxies specific paths to this app. The homepage (`/`) stays on WordPress — do **not** create `src/app/page.tsx`.

## Stack

|                 |                         |
| --------------- | ----------------------- |
| Framework       | Next.js 16 (App Router) |
| Styling         | Tailwind CSS v3         |
| Language        | TypeScript              |
| Package manager | pnpm                    |

## Getting Started

```bash
git clone https://github.com/pingcap-inc/website-launchpad.git
cd website-launchpad
pnpm install
pnpm dev          # http://localhost:3000
```

Other commands:

```bash
pnpm build        # production build
pnpm lint         # ESLint
pnpm type-check   # TypeScript
```

## Project Structure

```
src/
├── app/               # Next.js App Router pages
│   └── sitemap.ts     # XML sitemap (add every new indexable page here)
├── components/
│   ├── ui/            # Primitive components (Button, Card, Tabs…)
│   └── sections/      # Page-level sections (HeroSection, FeaturesGrid, CtaSection)
├── lib/
│   ├── schema.ts      # buildPageSchema() and all JSON-LD builders
│   └── gtm.tsx        # GTM helpers — use instead of raw dataLayer.push()
└── styles/
    └── globals.css    # @font-face (CDN) + base styles

.ai/
├── page-types/        # Per-type spec: structure, schema, GTM, sitemap rules
├── skills/
│   ├── design-system/ # Design tokens, components, layout, quality rules
│   ├── seo/           # Metadata, schema, analytics, cross-stack rules
│   └── for-marketing/ # Non-technical user workflow guides
└── context/
    └── brand.md       # Product names, tone, CTA copy, forbidden words

.github/
├── workflows/
│   └── lighthouse-ci.yml    # Runs Lighthouse on every PR, posts score comment
└── PULL_REQUEST_TEMPLATE.md
```

## Creating Pages

`CLAUDE.md` (auto-loaded by Claude Code) contains the full generation workflow, component reference, and quality checklist.

**For marketing / ops (no coding):** See `.ai/skills/for-marketing/SETUP.md` for the one-time setup and `GUIDE.md` for the daily workflow.

**For adding components:** build in `src/components/ui/` or `src/components/sections/`, export from `src/components/index.ts`, then document in `.ai/skills/design-system/components.md`.

## Quality Gates

**Pre-commit (Husky)** — runs on every `git commit`:

```
lint-staged → pnpm lint → pnpm type-check → pnpm build
```

**Pre-push (Claude)** — before running `git push`, Claude reviews all changed pages in `src/app/` across 5 dimensions and auto-fixes issues before pushing:

| Dimension | Checks                                                                     |
| --------- | -------------------------------------------------------------------------- |
| Code      | No hex colors, no font-semibold, next/image, Link scope, buildPageSchema() |
| Design    | Token usage, component reuse, no inline styles                             |
| UX        | Single H1, heading hierarchy, CTA above fold, alt text                     |
| SEO       | Complete metadata, correct siteName/twitter.site, canonical, sitemap entry |
| AEO       | Structured data quality, AI-citable content, faqSchema where applicable    |

All dimensions must score ≥ 7/10 to proceed.

**PR (Lighthouse CI)** — GitHub Actions runs Lighthouse on every PR touching `src/app/**/*.tsx` and posts a score comment (Performance · Accessibility · Best Practices · SEO). Uses the auto-provided `GITHUB_TOKEN` — no secrets required.

## Key Rules

| Rule           | Correct                                         |
| -------------- | ----------------------------------------------- |
| Colors         | Tailwind tokens only — no hardcoded hex         |
| Font weight    | `font-bold` — never `font-semibold`             |
| Images         | `<Image>` from `next/image`                     |
| External links | `<a href>` — `<Link>` is Next.js internal only  |
| Analytics      | `@/lib/gtm` helpers — no raw `dataLayer.push()` |
| Schema         | `buildPageSchema()` — no raw JSON-LD            |
| siteName       | `'TiDB'`                                        |
| twitter.site   | `'@PingCAP'`                                    |
| Canonical      | `https://www.pingcap.com/[path]/`               |

## Technical Setup (one-time, dev team)

1. **Nginx** — route new paths from `www.pingcap.com` to the Vercel deployment, forwarding `Host: www.pingcap.com`.
2. **WordPress sitemap** — inject the Next.js sitemap into Yoast's `sitemap_index.xml` (see `.ai/skills/seo/audit-rules.md` Rule 4).
3. **GTM** — set `NEXT_PUBLIC_GTM_ID` in Vercel environment variables.
