# website-launchpad

> Business teams use AI to generate pages. Tech team maintains the design system.

Next.js pages coexisting with the main [PingCAP](https://www.pingcap.com) WordPress site. Nginx proxies specific paths to this app.

## Quick Start

```bash
git clone https://github.com/pingcap-inc/website-launchpad.git
cd website-launchpad
pnpm setup:env
pnpm verify:env
pnpm dev
```

Useful commands:

```bash
pnpm build
pnpm lint
pnpm type-check
```

## No-Code Quick Start (Marketing/Ops)

1. Install Claude desktop app: https://claude.ai/download
2. Open this repo in Claude Code.
3. Run once in Terminal:

```bash
pnpm setup:env
pnpm verify:env
```

4. Paste brief and ask Claude to create/update the page.
5. Preview with `pnpm dev`.
6. When page updates are complete and ready, ask Claude: `Submit to GitHub`.

Troubleshooting:

- `command not found: git` -> https://git-scm.com/downloads
- `command not found: pnpm` -> `bash .ai/skills/quick-setup/scripts/setup-environment.sh`
- `node` missing -> https://nodejs.org/en/download

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

- Pre-commit (Husky): `lint-staged -> pnpm lint -> pnpm type-check -> pnpm build`
- PR (GitHub Action): Lighthouse CI for changed `src/app/**/*.tsx`

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
