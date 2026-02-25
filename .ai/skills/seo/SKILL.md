---
name: website-launchpad-seo
description: >
  Trigger when building or modifying any page that needs SEO optimization,
  including metadata, structured data, semantic HTML, URL structure,
  and Core Web Vitals. Always read this alongside design-system/SKILL.md
  before generating any page code.
---

# SEO Skill

> **Read seo.md for the full specification.**
> This skill must be applied to every page generated in this project.

## When to Apply

- Any new page (`app/**/page.tsx`)
- Any landing page (`app/lp/**/page.tsx`)
- Any product or marketing page (`app/marketing/**/page.tsx`)
- When asked to "optimize SEO", "add metadata", or "improve search ranking"

## Quick Checklist

- [ ] `metadata` export with `title`, `description`, `openGraph`, `twitter`, `robots`, `canonical`
- [ ] Exactly one `<h1>` per page
- [ ] Heading hierarchy: h1 → h2 → h3, no skipped levels
- [ ] All `<Image>` components have descriptive `alt` text
- [ ] `priority` on above-the-fold images
- [ ] `JsonLd` structured data on product pages
- [ ] URL: lowercase, hyphen-separated, trailing slash

## File Index

| File | Contents |
|------|----------|
| `seo.md` | Full SEO specification — metadata, structured data, performance, URL rules |
| `cross-stack.md` | Reverse proxy routing, sitemap merge, route-level analytics, security headers, go-live checklist |

---

## Schema — Yoast @graph Parity

Every Next.js page must use `buildPageSchema()` from `@/lib/schema` instead of standalone schema objects. This ensures the JSON-LD @graph structure matches what Yoast outputs on WordPress pages.

```ts
// ✅ Correct — Yoast-compatible @graph
import { buildPageSchema, softwareApplicationSchema } from '@/lib/schema'

const schema = buildPageSchema({
  path: '/tidb/',
  title: 'TiDB — Distributed SQL Database',
  description: '...',
  pageType: 'WebPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'TiDB', path: '/tidb/' },
  ],
  extraSchemas: [softwareApplicationSchema({ ... })],
})

// ❌ Forbidden — standalone schema without @graph
const schema = { '@context': 'https://schema.org', '@type': 'Organization', ... }
```

Extra schema builders available in `@/lib/schema`:
- `softwareApplicationSchema()` — product pages
- `articleSchema()` — SEO content pages
- `faqSchema()` — any page with FAQ content
- `definedTermSchema()` — individual glossary term pages (`/glossary/[term]/`)
- `glossaryIndexSchema()` — glossary index page (`/glossary/`)

---

## GTM dataLayer Parity

Use helpers from `@/lib/gtm` for all tracking calls. Event names and property names must match WordPress GTM events exactly.

```ts
import { trackCTAClick } from '@/lib/gtm'

// On CTA button click
trackCTAClick({
  cta_text: 'Start for Free',
  cta_location: 'hero',
  page_path: '/tidb/',
})
```

Standard event contract:
| Event | Required properties |
|-------|-------------------|
| `page_view` | `page_type`, `page_path`, `page_title` |
| `cta_click` | `cta_text`, `cta_location`, `page_path` |
| `form_submit` | `form_id`, `page_path` |

Two GTM container IDs are set in `.env.production` (production-only, not loaded in dev):
- `NEXT_PUBLIC_GTM_ID_PINGCAP` — pingcap.com container (www.pingcap.com, tidbcloud.com)
- `NEXT_PUBLIC_GTM_ID_ALL_WEBSITES` — all_websites container (www.pingcap.com, tidbcloud.com, docs.pingcap.com)

Both containers must fire the same event names as WordPress GTM.

---

## Glossary Pages

Two types of glossary pages, each with different schema:

### Glossary Index (`/glossary/`)

```ts
const schema = buildPageSchema({
  path: '/glossary/',
  title: 'Database & TiDB Glossary — PingCAP',
  description: '...',
  pageType: 'CollectionPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Glossary', path: '/glossary/' },
  ],
  extraSchemas: [glossaryIndexSchema({ termCount: 42 })],
})
```

### Individual Term Page (`/glossary/[term]/`)

```ts
const schema = buildPageSchema({
  path: '/glossary/htap/',
  title: 'What is HTAP? — TiDB Glossary',
  description: '...',
  pageType: 'ItemPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Glossary', path: '/glossary/' },
    { name: 'HTAP', path: '/glossary/htap/' },
  ],
  extraSchemas: [
    definedTermSchema({
      name: 'HTAP',
      description: 'Hybrid Transactional and Analytical Processing...',
      url: '/glossary/htap/',
      alternateName: ['Hybrid Transactional/Analytical Processing'],
    }),
  ],
})
```

Schema builders: `glossaryIndexSchema()` and `definedTermSchema()` — both in `@/lib/schema`.

---

## Cross-Stack Mechanism

Read `cross-stack.md` for the full configuration covering:
- Nginx / Cloudflare reverse proxy routing rules
- Sitemap merge (WordPress Yoast + Next.js)
- Route-level `page_view` tracking
- Security headers at proxy layer
- Validation checklist before going live
