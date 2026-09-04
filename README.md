# website-launchpad

> Business teams use AI to generate pages. Tech team maintains the design system.

Next.js pages coexisting with the main [PingCAP](https://www.pingcap.com) WordPress site. Nginx proxies specific paths to this app.

## Build a Page (Marketing/Ops)

Use the **Admin page builder** — a web tool, no install and no Terminal:

**👉 https://website-launchpad-git-staging-pingcap.vercel.app/admin**

1. Open the link and pick the path that fits you:
   - **Build a New Page with AI** — create a page from scratch from your brief.
   - **Publish an Existing AI Page** — import Google Docs / paste / upload `.docx` / `.md`.
   - **I Don't Know Where to Start** — a guided, step-by-step walkthrough.
2. Generate and edit the page, and preview it live in the browser.
3. Click **Publish** when it's ready.

**What Publish does:** it runs a quality review, then opens a Pull Request on GitHub and builds a preview (track it on the **Builds** page). An admin — a tech-team maintainer with merge access — reviews and merges the PR; once merged into `main`, the page goes live automatically (`deploy.yml`).

### Alternative: build with Claude Code

Prefer chatting instead of the web UI? You can do the same with the Claude desktop app — no local setup and no Terminal, Claude generates and previews pages for you.

1. Install the Claude desktop app: https://claude.ai/download
2. Open this repo in Claude Code.
3. Paste your brief and ask Claude to create or update the page.
4. Ask Claude to preview it — a live preview opens right inside Claude.
5. When the page is ready, ask Claude: `Submit to GitHub`.

**What "Submit to GitHub" does** — Claude runs a quality gate and opens a Pull Request for you; it does not merge anything:

1. **Branch check** — if you are on `main`, Claude stops and creates a feature branch first (changes must go through a PR).
2. **Pre-push review** — scores the page across Code / Design / UX / SEO / AEO (0–10 each), auto-fixes anything below 7, and shows you the score report.
3. **Commit** — runs the pre-commit checks (prettier + lint + type-check); a failure blocks the commit until fixed.
4. **Push + PR** — pushes the branch and opens a PR against `main`, which triggers CI (lint / type-check / build, broken-link check).

Just like the web builder, an admin then reviews and merges the PR, and the page goes live automatically.

## Local Development (Tech Team)

For maintaining the design system and components.

```bash
git clone https://github.com/pingcap-inc/website-launchpad.git
cd website-launchpad
pnpm install
pnpm dev
```

Other commands: `pnpm build` · `pnpm lint` · `pnpm type-check`

## Project Map

```text
src/
  app/            Next.js routes + sitemap.ts
  components/     ui/ and sections/
  lib/            schema.ts + gtm.tsx
  styles/         globals.css

.ai/
  page-types/     generation specs by page type
  skills/
    design-system/
    seo/
    quick-setup/
  context/brand.md
```

## Quality Gates

- Pre-commit (Husky): `lint-staged` (prettier + title-case check) -> `pnpm lint` -> `pnpm type-check`
- PR (GitHub Actions):
  - `ci.yml` — lint / type-check / build on `src/**` changes
  - `broken-links.yml` — link check on changed `src/app/**/*.tsx`
- Push to `main`: `deploy.yml`
- Manual (workflow_dispatch): `lighthouse-ci.yml`, `score-pages.yml`

## Key Rules

- Colors: Tailwind tokens only, no hardcoded hex
- Font weight: use `font-bold`, not `font-semibold`
- Images: use `next/image`
- Links: `<Link>` for internal routes, `<a>` for external
- Analytics: use `@/lib/gtm`, no raw `dataLayer.push()`
- Schema: use `buildPageSchema()`, no raw JSON-LD
- SEO constants: `siteName: 'TiDB'`, `twitter.site: '@PingCAP'`
- Canonical: `https://www.pingcap.com/[path]/`

## References

- Full generation and review workflow: `CLAUDE.md`
- Component rules: `.ai/skills/design-system/components.md`
- SEO rules: `.ai/skills/seo/SKILL.md`
