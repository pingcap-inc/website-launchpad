---
name: website-launchpad-seo
version: v2
description: >
  SEO specification for website-launchpad. Trigger when building or modifying
  any page, adding metadata, configuring schema, setting up analytics, or
  working on anything that affects search engine visibility.
  Always read this alongside design-system/SKILL.md before generating any page code.
---

# SEO Skill — v2

> Based on PingCAP SEO Audit (February 2026).
> Every rule in this skill derives from the audit findings.

---

## File Index — Read Based on Your Task

| File | When to Read |
|------|-------------|
| `audit-decisions.md` | First time working in this repo — understand *why* we use hybrid stack |
| `audit-rules.md` | **Required for every page** — 10 cross-stack rules + compliance status |
| `audit-page-types.md` | **Required for every page** — schema, metadata, GTM spec per page type |
| `seo.md` | Detailed metadata, image SEO, Core Web Vitals, URL rules |
| `cross-stack.md` | Nginx config, sitemap merge, security headers, route tracking |

---

## Quick Checklist (run before outputting any page)

**Metadata**
- [ ] `metadata` export with `title`, `description`, `openGraph`, `twitter`, `robots`, `canonical`
- [ ] `siteName: 'TiDB | SQL at Scale'` — exact string, no variations
- [ ] `twitter.site: '@PingCAP'` — exact string
- [ ] `canonical` always `https://www.pingcap.com/[path]/` — never `vercel.app`
- [ ] Landing pages (`/lp/*`): `robots: { index: false, follow: false }`

**Schema**
- [ ] Always use `buildPageSchema()` from `@/lib/schema` — never standalone JSON-LD
- [ ] Correct extra schema for page type (see `audit-page-types.md`)
- [ ] Glossary index → `glossaryIndexSchema()`
- [ ] Glossary term → `definedTermSchema()`
- [ ] Product page → `softwareApplicationSchema()`
- [ ] SEO content page → `articleSchema()`
- [ ] Compare page → `faqSchema()`

**Analytics**
- [ ] Import tracking helpers from `@/lib/gtm` — never raw `dataLayer.push()`
- [ ] Correct `page_type` for the path (see `audit-page-types.md`)

**Sitemap**
- [ ] New page added to `src/app/sitemap.ts`

**HTML**
- [ ] Exactly one `<h1>` per page
- [ ] Heading hierarchy: h1 → h2 → h3, no skipped levels
- [ ] All `<Image>` have descriptive `alt` text
- [ ] `priority` on above-the-fold images
- [ ] WordPress cross-links use `<a href>`, not `<Link>`

**URL**
- [ ] Lowercase, hyphen-separated, trailing slash

---

## Schema Usage Reference

```ts
import { buildPageSchema, softwareApplicationSchema, articleSchema,
         faqSchema, definedTermSchema, glossaryIndexSchema } from '@/lib/schema'

// Every page — base structure
const schema = buildPageSchema({
  path: '/glossary/',
  title: '...',
  description: '...',
  pageType: 'CollectionPage',
  breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary/' }],
  extraSchemas: [glossaryIndexSchema({ termCount: 42 })],
})
```

---

## GTM Usage Reference

```ts
import { trackCTAClick, trackFormSubmit } from '@/lib/gtm'

// CTA button click
trackCTAClick({ cta_text: 'Start for Free', cta_location: 'hero', page_path: '/glossary/' })

// page_view fires automatically via RouteTracker in layout.tsx — no manual call needed
```

---

## Cross-Stack Rules Summary

Google sees one unified site only if all 10 rules are followed:

| # | Rule | Status |
|---|------|--------|
| 1 | Same domain via reverse proxy | ⏳ Nginx config needed |
| 2 | Identical meta tag contract | ✅ |
| 3 | Yoast-compatible @graph schema | ✅ |
| 4 | Unified sitemap | ✅ Next.js / ⏳ WordPress injection needed |
| 5 | Shared nav & footer | ✅ Navbar / ⏳ Footer needed |
| 6 | Consistent URL patterns | ✅ |
| 7 | Security headers at proxy layer | ⏳ Proxy config needed |
| 8 | Analytics & GTM parity | ✅ |
| 9 | Internal linking across stacks | ✅ |
| 10 | Validation checklist | ⏳ Run before each go-live |

Full config for ⏳ items → `cross-stack.md`
