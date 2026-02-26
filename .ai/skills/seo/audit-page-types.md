# Page Type Specifications — Audit-Derived

> For each Next.js page type, this file defines the exact requirements
> for schema, metadata, GTM page_type, and file path.
> AI must follow these specs when generating any page in this project.

---

## Glossary Index — `/glossary/`

```
File path:     src/app/glossary/page.tsx
pageType:      CollectionPage
page_type:     glossary
Schema:        buildPageSchema() + glossaryIndexSchema()
robots:        index: true
```

**Metadata template:**
```tsx
title: 'Database & TiDB Glossary — Key Terms Explained | PingCAP'
description: 'Definitions of key database, distributed systems, and cloud-native terms...' // 120–160 chars
canonical: 'https://www.pingcap.com/glossary/'
```

**Content structure:**
- `<h1>` — glossary name
- Terms grouped by category under `<h2>` (category name)
- Each term in `<article>` with `<h3>` (term) + `<p>` (definition)
- CTA section at bottom pointing to TiDB Cloud sign-up

---

## Glossary Term — `/glossary/[term]/`

```
File path:     src/app/glossary/[term]/page.tsx
pageType:      ItemPage
page_type:     glossary
Schema:        buildPageSchema() + definedTermSchema()
robots:        index: true
```

**Metadata template:**
```tsx
title: 'What is {Term}? — TiDB Glossary | PingCAP'  // 50–60 chars
description: '{One sentence definition including the term}...'
canonical: 'https://www.pingcap.com/glossary/{term}/'
```

**Breadcrumbs:**
```
Home → Glossary → {Term}
```

**Content structure:**
- `<h1>` — "What is {Term}?"
- Definition paragraph
- Related terms section (`<h2>`)
- Internal links to related product pages
- CTA section

---

## Product Page — `/marketing/[product]/` or `/tidb/`, `/tidb/cloud/`

```
File path:     src/app/marketing/[product]/page.tsx
pageType:      WebPage
page_type:     product
Schema:        buildPageSchema() + softwareApplicationSchema()
robots:        index: true
```

**Metadata template:**
```tsx
title: '{Product} — {One-line value prop} | PingCAP'
description: '{Product} is {category}. {Key benefit}. {Social proof or metric}.'
canonical: 'https://www.pingcap.com/marketing/{product}/'
```

**Content structure:**
- Hero with primary CTA
- Features grid (3 or 4 columns)
- Use cases or metrics section (optional)
- CTA section

---

## Landing Page — `/lp/[slug]/`

```
File path:     src/app/lp/[slug]/page.tsx
pageType:      WebPage
page_type:     landing_page
Schema:        buildPageSchema()
robots:        index: false   ← landing pages must NOT be indexed
```

**Critical:** Landing pages must have `robots: { index: false, follow: false }`.
They are campaign pages, not organic search targets.

**Content structure:**
- Hero with primary CTA
- Key selling points (3 items)
- CTA section

---

## SEO Content Page — `/marketing/[topic]/`

```
File path:     src/app/marketing/[topic]/page.tsx
pageType:      WebPage (or ItemPage for specific topics)
page_type:     seo_content
Schema:        buildPageSchema() + articleSchema()
robots:        index: true
```

**Metadata template:**
```tsx
title: '{Primary keyword} — {Benefit or context} | PingCAP'  // must include keyword
description: '{Definition or hook including primary keyword}. {Value prop}.'
canonical: 'https://www.pingcap.com/marketing/{topic}/'
```

**Content structure:**
- Hero with primary keyword in `<h1>`
- Prose body content following outline
- `<SectionHeader>` to divide sections (uses `<h2>`)
- Internal links to related product pages
- CTA section

---

## Compare Page — `/compare/[vs]/`

```
File path:     src/app/compare/[vs]/page.tsx
pageType:      WebPage
page_type:     compare
Schema:        buildPageSchema() + faqSchema() (for common comparison questions)
robots:        index: true
```

**Metadata template:**
```tsx
title: 'TiDB vs {Competitor} — {Key differentiator} | PingCAP'
description: 'TiDB vs {Competitor}: {Key difference}. Compare {feature1}, {feature2}, and {feature3}.'
canonical: 'https://www.pingcap.com/compare/{vs}/'
```

**Content structure:**
- Hero with comparison headline
- Comparison table (`<h2>`)
- Feature-by-feature breakdown
- FAQ section (triggers `faqSchema()`)
- CTA section

---

## Path → page_type Mapping (complete reference)

| URL Pattern | page_type | robots index |
|-------------|-----------|-------------|
| `/` | `home` | true |
| `/tidb/` | `product` | true |
| `/tidb/cloud/` | `product` | true |
| `/glossary/` | `glossary` | true |
| `/glossary/[term]/` | `glossary` | true |
| `/compare/[vs]/` | `compare` | true |
| `/marketing/[topic]/` | `seo_content` | true |
| `/lp/[slug]/` | `landing_page` | **false** |
