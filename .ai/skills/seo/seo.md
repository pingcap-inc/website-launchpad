# SEO Specification

## Page Metadata (Next.js App Router)

Every page must export complete metadata via `generateMetadata` or a static `metadata` export.

```tsx
// app/tidb/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TiDB — The Distributed SQL Database for Real-Time Analytics',
  description: 'TiDB is an open-source distributed SQL database that supports Hybrid Transactional and Analytical Processing (HTAP). Scale from gigabytes to petabytes without re-architecting.',
  keywords: ['TiDB', 'distributed database', 'HTAP', 'MySQL compatible', 'NewSQL', 'PingCAP'],
  authors: [{ name: 'PingCAP' }],

  openGraph: {
    title: 'TiDB — The Distributed SQL Database for Real-Time Analytics',
    description: 'Open-source distributed SQL database supporting HTAP workloads at any scale.',
    url: 'https://www.pingcap.com/tidb/',
    siteName: 'PingCAP',
    images: [
      {
        url: 'https://www.pingcap.com/og/tidb.png',
        width: 1200,
        height: 630,
        alt: 'TiDB Distributed SQL Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TiDB — The Distributed SQL Database',
    description: 'Open-source HTAP database. Scale without re-architecting.',
    images: ['https://www.pingcap.com/og/tidb.png'],
    creator: '@PingCAP',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://www.pingcap.com/tidb/',
    languages: {
      'en-US': 'https://www.pingcap.com/tidb/',
      'x-default': 'https://www.pingcap.com/tidb/',
    },
  },
}
```

---

## Metadata Field Rules

| Field | Length | Rules |
|-------|--------|-------|
| `title` | 50–60 chars | Format: `Page Name — Product \| Brand`, include primary keyword |
| `description` | 120–160 chars | Full sentence, includes keyword, clear value proposition |
| `og:image` | 1200×630px | Unique image per page — never reuse one image across all pages |
| `canonical` | — | Required on every page to prevent duplicate content |
| `robots` | — | Product pages: `index: true` · Internal tools: `index: false` |

---

## HTML Semantic Structure

```tsx
// ✅ Correct semantic structure
<main>
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">Modern Database for Real-Time Workloads</h1>
  </section>

  <section aria-labelledby="features-title">
    <h2 id="features-title">Why TiDB</h2>
    <div className="grid ...">
      <article>
        <h3>Horizontal Scalability</h3>
        <p>...</p>
      </article>
    </div>
  </section>
</main>
```

**Heading hierarchy rules:**
- Each page must have exactly **one `<h1>`** (Hero headline)
- `<h2>` for section titles — never skip levels
- `<h3>` for card / sub-module titles
- Never skip heading levels for visual reasons (e.g. h1 directly to h3)

---

## Image SEO

```tsx
// ✅ Correct
<Image
  src="/images/tidb-architecture.png"
  alt="TiDB distributed architecture diagram showing TiKV storage and TiDB compute layers"
  width={800}
  height={450}
  priority={isAboveFold}   // Add priority for above-the-fold images
  loading={isAboveFold ? 'eager' : 'lazy'}
/>

// ❌ Forbidden
<img src="..." alt="" />           // empty alt on non-decorative image
<Image src="..." alt="image" />    // non-descriptive alt
<img src="..." />                  // missing alt attribute entirely
```

**Alt text rules:**
- Describe the image content, include relevant keywords
- Purely decorative images use `alt=""` (empty string — do not omit the attribute)
- Recommended length: < 125 characters

---

## Structured Data (JSON-LD)

Product pages must include Organization and SoftwareApplication schemas:

```tsx
// components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Use in layout.tsx or page.tsx
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PingCAP',
  url: 'https://www.pingcap.com',
  logo: 'https://www.pingcap.com/logo.svg',
  sameAs: [
    'https://twitter.com/PingCAP',
    'https://github.com/pingcap',
    'https://www.linkedin.com/company/pingcap',
  ],
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'TiDB',
  applicationCategory: 'DatabaseApplication',
  operatingSystem: 'Linux, macOS, Windows',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Open-source distributed SQL database supporting HTAP workloads.',
  url: 'https://www.pingcap.com/tidb/',
}
```

---

## Performance SEO (Core Web Vitals)

| Metric | Target | How to achieve |
|--------|--------|----------------|
| LCP | < 2.5s | Add `priority` to Hero images · `preconnect` for font CDN |
| CLS | < 0.1 | Specify `width/height` on all images · `font-display: swap` on fonts |
| INP | < 200ms | Avoid large JS bundles · use CSS transitions for animations |

```tsx
// Required in layout.tsx <head>
<link rel="preconnect" href="https://static.pingcap.com" />
<link rel="dns-prefetch" href="https://static.pingcap.com" />
```

---

## URL Rules

| Rule | Example |
|------|---------|
| Lowercase, hyphen-separated | `/tidb-cloud/` ✅  `/TiDB_Cloud/` ❌ |
| Trailing slash | `/tidb/` ✅  `/tidb` ❌ |
| Short, keyword-rich | `/distributed-sql-database/` ✅  `/page-1234/` ❌ |
| Max 3 levels deep | `/tidb/features/htap/` ✅ |

---

## Forbidden Patterns

```tsx
// ❌ Missing title / description
export default function Page() { ... }   // no metadata export

// ❌ Duplicate title across pages
title: 'PingCAP'   // same title on every page

// ❌ Description too short or generic
description: 'TiDB page'

// ❌ Broken heading hierarchy
<h1>Section Title</h1>   // multiple h1s on one page
<h3>First heading</h3>   // jumping from h1 directly to h3

// ❌ Missing or empty alt on non-decorative images
<Image src="..." alt="" />   // non-decorative image with empty alt
<img src="..." />             // missing alt attribute

// ❌ Missing canonical
// No alternates.canonical → duplicate content penalty risk
```
