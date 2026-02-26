# Cross-Stack SEO Rules — Audit Compliance

> The 10 rules from the PingCAP SEO Audit (Q3) that make WordPress + Next.js
> appear as one unified site to Google. Every Next.js page must comply with all of these.

---

## Rule 1 — Same Domain, Path-Based Routing

**What it means:** Next.js pages must be served at `www.pingcap.com/[path]/`,
not at `vercel.app`. Nginx/Cloudflare proxies specific paths to Vercel.

**Critical:** Always set `Host: www.pingcap.com` in proxy headers.
Without this, Next.js generates canonical URLs pointing to `vercel.app` — a duplicate content penalty.

**Status:** ✅ `trailingSlash: true` configured in `next.config.ts`
⏳ Nginx/Cloudflare routing rules → see `cross-stack.md`

**AI rule:** Always generate canonical URLs as `https://www.pingcap.com/[path]/`.
Never use relative URLs or `vercel.app` in canonical or OG tags.

---

## Rule 2 — Identical Meta Tag Contract

**What it means:** Every page — WordPress or Next.js — outputs the exact same
set of meta tags. If Yoast outputs a tag on WordPress, Next.js must output the identical tag.

**Required tags on every Next.js page:**
```tsx
export const metadata: Metadata = {
  title: '{Page Title} | PingCAP',          // 50–60 chars, includes primary keyword
  description: '{150 chars max}',            // full sentence, includes keyword
  openGraph: {
    title: '...',
    description: '...',                      // same as meta description
    type: 'website',
    url: 'https://www.pingcap.com/{path}/',
    siteName: 'TiDB | SQL at Scale',         // exact string — no variations
    images: [{ url: '...', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',                        // exact string
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.pingcap.com/{path}/',
  },
}
```

**Status:** ✅ Fully implemented in `seo.md` and page examples

**AI rule:** Never omit `canonical`. Never use `siteName` other than `'TiDB | SQL at Scale'`.
Never use `twitter:site` other than `'@PingCAP'`.

---

## Rule 3 — Matching Schema Markup Patterns

**What it means:** Yoast outputs a `@graph` array on every WordPress page.
Next.js pages must output the exact same `@graph` structure.

**Required @graph nodes on every page:**
1. `WebSite` with `@id: https://www.pingcap.com/#website`
2. `Organization` with `@id: https://www.pingcap.com/#organization`
3. `WebPage` (or subtype) linked to WebSite and Organization
4. `BreadcrumbList` (when breadcrumbs exist)
5. Page-specific extra schema appended to the same graph

**Implementation:** Use `buildPageSchema()` from `@/lib/schema` — never use
standalone schema objects. See `SKILL.md` for usage examples.

**Status:** ✅ `buildPageSchema()` + all schema builders implemented in `src/lib/schema.ts`

**AI rule:** Always use `buildPageSchema()`. Never write raw JSON-LD without `@graph`.

---

## Rule 4 — Unified Sitemap

**What it means:** Next.js pages must appear in the sitemap that Google already
knows about (the WordPress Yoast sitemap_index.xml).

**Implementation (Option A — recommended):**
WordPress `functions.php` injects the Next.js sitemap into Yoast's sitemap_index:
```php
add_filter('wpseo_sitemap_index', function($sitemap_index) {
    $sitemap_index .= '<sitemap>'
        . '<loc>https://www.pingcap.com/nextjs-sitemap.xml</loc>'
        . '<lastmod>' . date('c') . '</lastmod>'
        . '</sitemap>';
    return $sitemap_index;
});
```

Next.js generates its own sitemap at `/nextjs-sitemap.xml` via `src/app/sitemap.ts`.

**Status:** ✅ `src/app/sitemap.ts` created
⏳ WordPress `functions.php` filter — needs to be added by WordPress team

**AI rule:** Every new page added to Next.js must also be added to `src/app/sitemap.ts`.

---

## Rule 5 — Shared Navigation & Footer

**What it means:** Navbar and Footer HTML structure must match WordPress exactly —
same CSS classes, same aria-labels, same mobile menu behavior.

**Implementation:** Start with hardcoded HTML (Option A). Match WordPress DOM structure.

**Status:** ✅ `Navbar` component implemented
⏳ `Footer` component — not yet built

**AI rule:** When generating pages, always include `<Navbar />`. Do not create
custom nav or footer markup — use the shared components only.

---

## Rule 6 — Consistent URL Patterns

**What it means:** All URLs must follow WordPress conventions:
lowercase, hyphen-separated, trailing slash.

**Rules:**
- ✅ Lowercase: `/distributed-sql/` not `/Distributed-SQL/`
- ✅ Hyphens: `/distributed-sql/` not `/distributed_sql/`
- ✅ Trailing slash: `/glossary/` not `/glossary`
- ✅ Max 3 levels deep: `/tidb/features/htap/`
- ✅ Keyword-rich: `/htap-database/` not `/page-42/`

**Status:** ✅ `trailingSlash: true` in `next.config.ts`

**AI rule:** Always use trailing slashes in all URLs — canonical, OG, href links, sitemap entries.

---

## Rule 7 — Security Headers on Both

**What it means:** Both WordPress and Next.js responses must include the same
5 security headers. Apply at the Nginx/Cloudflare proxy layer so both backends
get them automatically.

**Required headers:**
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

**Status:** ⏳ Must be configured at proxy layer — see `cross-stack.md`

**AI rule:** Do not add security headers in Next.js `next.config.ts` headers array —
they must be applied at the proxy layer to cover WordPress too.

---

## Rule 8 — Analytics & Tracking Parity

**What it means:** Both stacks must fire the same GTM container with identical
`dataLayer` event structure. Same event names, same property names.

**GTM container:** One container ID shared across WordPress and Next.js.
Set via `NEXT_PUBLIC_GTM_ID` in `.env.local`.

**dataLayer contract:**
```ts
// page_view — fires on every page load and route change
{ event: 'page_view', page_type: PageType, page_path: string, page_title: string }

// cta_click — fires on every CTA button click
{ event: 'cta_click', cta_text: string, cta_location: string, page_path: string }

// form_submit — fires on form submissions
{ event: 'form_submit', form_id: string, page_path: string }
```

**page_type values by path:**
| Path | page_type |
|------|-----------|
| `/` | `home` |
| `/tidb/`, `/tidb/cloud/` | `product` |
| `/lp/*` | `landing_page` |
| `/glossary/*` | `glossary` |
| `/compare/*` | `compare` |
| `/marketing/*` | `seo_content` |
| `/blog/*` | `blog` (WordPress) |

**Status:** ✅ GTM integrated in `layout.tsx`, helpers in `src/lib/gtm.ts`
✅ `RouteTracker` component fires `page_view` on route changes

**AI rule:** Always import tracking helpers from `@/lib/gtm`. Never write raw
`window.dataLayer.push()` calls. Always pass the correct `page_type` for the path.

---

## Rule 9 — Internal Linking Between Stacks

**What it means:** Links between WordPress pages and Next.js pages are standard
`<a href>` tags. Google doesn't know or care that they cross backend boundaries.

**Status:** ✅ No action needed — standard HTML links work automatically

**AI rule:** Link to WordPress pages (e.g. `/blog/`, `/case-studies/`) using
normal `<a href>` tags, not Next.js `<Link>`. `<Link>` only works for
client-side navigation within the Next.js app.

---

## Rule 10 — Validation Checklist

Run this checklist before every new path goes live:

```
Domain & Routing
- [ ] Page loads at www.pingcap.com/[path]/ — not vercel.app
- [ ] <link rel="canonical"> shows www.pingcap.com — not vercel.app

Meta Tags
- [ ] <title> present, unique, 50–60 chars
- [ ] <meta name="description"> present, 120–160 chars
- [ ] og:title, og:description, og:image, og:site_name present
- [ ] twitter:card and twitter:site present

Schema
- [ ] JSON-LD present with @graph structure
- [ ] Page-specific schema node present (DefinedTerm / Article / SoftwareApplication)
- [ ] Validate at https://validator.schema.org

Security Headers
- [ ] Strict-Transport-Security present
- [ ] X-Frame-Options: DENY present
- [ ] Check at https://securityheaders.com

Analytics
- [ ] GTM fires on page load
- [ ] page_view in dataLayer with correct page_type
- [ ] No duplicate GTM containers firing

Sitemap
- [ ] URL in src/app/sitemap.ts
- [ ] /nextjs-sitemap.xml accessible and includes the URL
```
