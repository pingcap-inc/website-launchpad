# Page Type: Glossary Page

> **Internal spec for Claude.** Ops users never need to read this file.
> Claude reads this automatically when generating glossary content.

---

## Trigger Conditions

Use this page type when the pasted material is:

- A definition or explanation of a technical term
- A "What is X?" article or FAQ
- A dictionary/encyclopedia-style entry
- A terminology reference (e.g., "What is HTAP?", "What is distributed SQL?")

---

## Two Sub-types

### A. Glossary Index Page (`/glossary/`)

The listing page showing all terms. Only one of these exists.

**Page Structure:**

```
HeroSection (variant: centered)
  headline: "Database Glossary"
  subheadline: brief description

Term groups (alphabetical or by category)
  Each term: title + short description + link to term page

CtaSection
```

**Schema:**

```tsx
import { buildPageSchema, glossaryIndexSchema } from '@/lib/schema'
const schema = buildPageSchema({
  pageType: 'CollectionPage',
  url: 'https://www.pingcap.com/glossary/',
  title: 'Database Glossary | PingCAP',
  description: '...',
  extra: glossaryIndexSchema(),
})
```

**GTM page_type:** `'glossary'`

---

### B. Individual Term Page (`/glossary/[term]/`)

One page per term. These are the primary SEO targets.

**Page Structure:**

```
HeroSection (variant: centered)
  eyebrow: "Glossary"
  headline: term name (e.g., "What is HTAP?")
  subheadline: 1-sentence definition

Definition content section
  Full definition (3–5 paragraphs)
  Include: what it is, why it matters, how TiDB relates

[Optional] Related concepts section
  3–4 FeatureCards linking to related glossary terms

CtaSection
  CTA: "Try TiDB for Free" or "Explore TiDB Documentation"
```

**URL:** `/glossary/[term-name]/` — lowercase, hyphen-separated, trailing slash

**SEO:**

```tsx
export const metadata: Metadata = {
  title: 'What is {Term}? | TiDB Glossary | TiDB', // 50–60 chars
  description: '{1-sentence definition, 120–150 chars}',
  openGraph: {
    title: '...',
    description: '...',
    type: 'article',
    url: 'https://www.pingcap.com/glossary/{term}/',
    siteName: 'TiDB | SQL at Scale',
    images: [{ url: '...', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', site: '@PingCAP' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/glossary/{term}/' },
}
```

**Schema:**

```tsx
import { buildPageSchema, definedTermSchema } from '@/lib/schema'
const schema = buildPageSchema({
  pageType: 'DefinedTermSet',
  url: 'https://www.pingcap.com/glossary/{term}/',
  title: '{page title}',
  description: '{page description}',
  extra: definedTermSchema({
    name: '{Term Name}',
    description: '{full definition}',
    url: 'https://www.pingcap.com/glossary/{term}/',
  }),
})
```

**GTM page_type:** `'glossary'`

---

## Sitemap

For new individual term pages, add to `src/app/sitemap.ts`:

```ts
{ url: '/glossary/{term}/', priority: 0.7, changeFrequency: 'monthly' },
```

The index page `/glossary/` is already in `src/app/sitemap.ts`.

---

## Checklist (auto-run after generating)

- [ ] `metadata` export present with all required fields
- [ ] `canonical` points to `https://www.pingcap.com/glossary/{term}/`
- [ ] `siteName: 'TiDB | SQL at Scale'` (exact string)
- [ ] `twitter.site: '@PingCAP'` (exact string)
- [ ] `buildPageSchema()` + `definedTermSchema()` used for individual terms
- [ ] Term page added to `src/app/sitemap.ts`
- [ ] All colors use design tokens (no `bg-[#...]`)
- [ ] `<Header />` and `<Footer />` included
- [ ] Page content wrapper has `pt-[62px] lg:pt-20`
