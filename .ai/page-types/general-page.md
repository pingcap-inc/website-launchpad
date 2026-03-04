# Page Type: General Page (Fallback)

> **Internal spec for Claude.** Ops users never need to read this file.
> Claude reads this automatically when the content doesn't match any specific page type.

---

## Trigger Conditions

Use this page type when the pasted material is:

- An "About Us" or company/team introduction
- A community page, open-source program, or partnership page
- An event or conference page
- A resource hub or knowledge center
- Any marketing page that isn't clearly a landing page, product page, or glossary

When in doubt, use this type and confirm with the user before generating.

---

## URL Rules

- **Ops-defined** — no fixed convention. Confirm with user before generating.
- Always lowercase, hyphen-separated, trailing slash

---

## Page Structure

This is a flexible structure. Choose layout based on content:

```
HeroSection
  variant: split OR centered
  eyebrow: optional category label
  headline: page title
  subheadline: 1–2 sentence description
  primaryCta: primary action (if applicable)

Content Sections (compose as needed — follow Section Layout Decision Tree in layout.md):
  Split Layout (text ↔ image)       → single concept + visual support (alternate sides per section)
  SectionHeader + FeatureCard grid  → for listing features/benefits/requirements
  SectionHeader + ColorCard grid    → for highlighting 2–4 use cases or segments
  SectionHeader + Tabs              → for multi-topic content (3+ distinct areas)
  SectionHeader + CountUp row       → for impact/stats metrics
  SectionHeader + prose content     → for narrative or story sections

CtaSection
  Include at page bottom; match CTA text to page goal
```

---

## Layout Guidance

- **centered hero**: use when the page is informational and audience is broad
- **split hero** (with rightSlot): use when showcasing a specific product, team, or visual asset
- **Split Layout sections**: use when material contains 2–4 distinct concepts each paired with a diagram or screenshot — alternate text/image sides for visual rhythm
- Mix and match content sections based on what's in the material — don't add sections you have no content for
- Aim for 4–6 sections total (including hero and CTA)

---

## SEO

```tsx
export const metadata: Metadata = {
  title: '{Page Title} | TiDB', // 50–60 chars
  description: '{150 chars max — full sentence}',
  openGraph: {
    title: '...',
    description: '...',
    type: 'website',
    url: 'https://www.pingcap.com/{path}/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/{path}/' },
}
```

---

## Schema

```tsx
import { buildPageSchema } from '@/lib/schema'

const schema = buildPageSchema({
  pageType: 'WebPage',
  url: 'https://www.pingcap.com/{path}/',
  title: '{page title}',
  description: '{page description}',
})
```

---

## GTM

```tsx
import { trackCTAClick } from '@/lib/gtm'
// page_type for this path: 'product' (default for general pages — refine if path is known)
// page_view fires automatically — no manual call needed
trackCTAClick({ cta_text: '...', cta_location: 'hero', page_path: '/{path}/' })
```

---

## Sitemap

Add to `src/app/sitemap.ts`:

```ts
{ url: '/{path}/', priority: 0.6, changeFrequency: 'monthly' },
```

---

## Checklist (auto-run after generating)

- [ ] `metadata` export present with all required fields
- [ ] `canonical` points to `https://www.pingcap.com/{path}/`
- [ ] `siteName: 'TiDB'` (exact string)
- [ ] `openGraph.images` and `twitter.images` present (default URL used if no page-specific image)
- [ ] `twitter.site: '@PingCAP'` (exact string)
- [ ] `buildPageSchema()` used — no raw JSON-LD
- [ ] Page added to `src/app/sitemap.ts`
- [ ] All colors use design tokens (no `bg-[#...]`)
- [ ] `<Header />` and `<Footer />` included
- [ ] Page content wrapper has `pt-[62px] lg:pt-20`
- [ ] No empty sections — every section has real content from the material
