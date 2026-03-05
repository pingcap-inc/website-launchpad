# Page Type: Product Page

> **Internal spec for Claude.** Ops users never need to read this file.
> Claude reads this automatically when generating a product page.

---

## Trigger Conditions

Use this page type when the pasted material is:

- A product introduction or product overview doc
- A feature explanation or capability description
- A product comparison ("TiDB vs X" or "Why TiDB over X")
- A technical solution brief (e.g., "TiDB for Financial Services")
- A use-case or workload-specific page

---

## URL Rules

- **Ops-defined** — no fixed convention. Confirm with user before generating.
- Suggested patterns: `/tidb/[feature]/` · `/[product-name]/` · `/compare/[vs-competitor]/`
- Always lowercase, hyphen-separated, trailing slash

---

## Page Structure

```
HeroSection (variant: split — text left, visual/image right)
  eyebrow: product category label
  headline: product name + primary benefit (≤10 words)
  subheadline: 1–2 sentence value prop
  primaryCta: 'Start for Free' → https://tidbcloud.com/free-trial/
  secondaryCta: 'Read the Docs' or 'Learn More'
  rightSlot: product screenshot, diagram, or code sample

FeaturesGrid
  3–6 key capabilities from the material
  Use icon + title + description for each feature

[Optional] Tabs — multi-capability showcase
  Use when material describes 3+ distinct feature areas
  autoSwitch={true} autoSwitchInterval={6000}

[Optional] ColorCard — use case / workload highlights
  Use when material describes 2–4 industry or workload scenarios
  Each card: variant matching brand, title, description, cta

[Optional] CountUp stats row
  Use when material includes concrete benchmark or scale metrics

CtaSection
  Repeat primary CTA at page bottom
```

---

## SEO

```tsx
export const metadata: Metadata = {
  title: '{Product Name}: {Primary Benefit} | TiDB', // 50–60 chars
  description: '{150 chars max}',
  openGraph: {
    title: '...',
    description: '...',
    type: 'website',
    url: 'https://www.pingcap.com/{path}/',
    siteName: 'TiDB | SQL at Scale',
    images: [{ url: '...', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image', site: '@PingCAP' },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/{path}/' },
}
```

---

## Schema

```tsx
import { buildPageSchema, softwareApplicationSchema } from '@/lib/schema'

const schema = buildPageSchema({
  pageType: 'WebPage',
  url: 'https://www.pingcap.com/{path}/',
  title: '{page title}',
  description: '{page description}',
  extra: softwareApplicationSchema({
    name: 'TiDB',
    description: '{page description}',
    url: 'https://www.pingcap.com/{path}/',
  }),
})
```

---

## GTM

```tsx
import { trackCTAClick } from '@/lib/gtm'
// page_type for this path: 'product'
// page_view fires automatically — no manual call needed
trackCTAClick({ cta_text: 'Start for Free', cta_location: 'hero', page_path: '/{path}/' })
```

---

## Sitemap

Add to `src/app/sitemap.ts`:

```ts
{ url: '/{path}/', priority: 0.8, changeFrequency: 'monthly' },
```

---

## Checklist (auto-run after generating)

- [ ] `metadata` export present with all required fields
- [ ] `canonical` points to `https://www.pingcap.com/{path}/`
- [ ] `siteName: 'TiDB | SQL at Scale'` (exact string)
- [ ] `twitter.site: '@PingCAP'` (exact string)
- [ ] `buildPageSchema()` + `softwareApplicationSchema()` used
- [ ] Page added to `src/app/sitemap.ts`
- [ ] HeroSection uses split layout (rightSlot provided)
- [ ] All colors use design tokens (no `bg-[#...]`)
- [ ] `<Header />` and `<Footer />` included
- [ ] Page content wrapper has `pt-[62px] lg:pt-20`
