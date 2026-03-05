# Cross-Stack SEO Rules

> Rules ensuring WordPress + Next.js appear as one unified site to Google.
> Every Next.js page must comply with all of these.

---

## Rule 1 — Canonical URLs

Always generate canonical URLs as `https://www.pingcap.com/[path]/`.
Never use relative URLs or `vercel.app` in canonical or OG tags.

---

## Rule 2 — Required Metadata on Every Page

```tsx
export const metadata: Metadata = {
  title: '{Page Title} | TiDB', // 50–60 chars, includes primary keyword
  description: '{150 chars max}', // full sentence, includes keyword
  openGraph: {
    title: '...',
    description: '...',
    type: 'website',
    url: 'https://www.pingcap.com/{path}/',
    siteName: 'TiDB', // exact string — no variations
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ], // default; replace with page-specific OG image when available
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP', // exact string
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'], // default; replace with page-specific image when available
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.pingcap.com/{path}/',
  },
}
```

Never omit `canonical`. Never use `siteName` other than `'TiDB'`. Never use `twitter:site` other than `'@PingCAP'`. Never omit `openGraph.images` or `twitter.images` — use the default URL when no page-specific image exists.

---

## Rule 3 — Schema Markup

Every page must use `buildPageSchema()` from `@/lib/schema`. Never write standalone JSON-LD objects. See `SKILL.md` for usage examples.

---

## Rule 4 — Sitemap

Every new page must be added to `src/app/sitemap.ts`.
**Exception:** landing pages with `robots: { index: false }` must NOT be added.

---

## Rule 5 — Navigation & Footer

Always include `<Header />` and `<Footer />` from `@/components/ui/`. Never create custom nav or footer markup.

---

## Rule 6 — URL Patterns

All URLs: lowercase · hyphen-separated · trailing slash · max 3 levels deep.

---

## Rule 7 — Security Headers

Do not add security headers in `next.config.ts` — they are applied at the proxy layer.

---

## Rule 8 — Analytics

Import helpers from `@/lib/gtm`. Never write raw `window.dataLayer.push()`. Pass the correct `page_type`:

| Path                     | page_type      |
| ------------------------ | -------------- |
| `/tidb/`, `/tidb/cloud/` | `product`      |
| `/lp/*`                  | `landing_page` |
| `/glossary/*`            | `glossary`     |
| `/compare/*`             | `compare`      |

`page_view` fires automatically via `RouteTracker` — no manual call needed.

---

## Rule 9 — Internal Linking

`<Link>` only for client-side navigation within Next.js. Link to WordPress pages (`/blog/`, `/case-studies/`) using `<a href>`.
