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
  rightSlot: product screenshot, diagram, code sample, or SVG illustration
  [if no rightSlot provided, omit prop — HeroSection auto-seeds from /public/images/hero/r/]

FeaturesGrid
  3–6 key capabilities from the material
  REQUIRED: every features[] item MUST include icon (Lucide, strokeWidth={1.5}) + title + description
  See visual-design.md Section B for concept→icon mapping

[Optional] Tabs — multi-capability showcase
  Use when material describes 3+ distinct feature areas
  REQUIRED: autoSwitch={true} autoSwitchInterval={6000}

[Optional] ColorCard — use case / workload highlights
  Use when material describes 2–4 industry or workload scenarios
  REQUIRED: every ColorCard MUST include icon prop
  Each card: variant matching brand (red/violet/blue/teal), title, description, cta

[Optional] CountUp stats row
  Use when material includes concrete benchmark or scale metrics
  REQUIRED: wrap each stat in <CountUp> for scroll-triggered reveal

[Optional] Accordion FAQ
  Use when material includes 3+ questions or "How does X work?" content
  Import from '@/components/ui/accordion' — place before CtaSection

CtaSection
  Repeat primary CTA at page bottom
  background: red=general, violet=AI, blue=cloud, teal=data
```

---

## Visual & Interaction Requirements

> See `.ai/skills/design-system/visual-design.md` for the full icon guide and animation patterns.

**Icons (non-negotiable):**

- FeaturesGrid: every item MUST have `icon={<LucideIcon strokeWidth={1.5} />}`
- ColorCard: every card MUST have `icon` prop
- Hero right column: MUST contain a visual — product screenshot, diagram, or SVG illustration

**Background rhythm:**

- Use `bg-gradient-dark-bottom` or `bg-gradient-dark-top` for at least one non-hero section
- Colored section (`bg-brand-{color}-bg`) for stats or a feature highlight area
- Never all `bg-bg-primary`

**Animations:**

- Clickable cards: `hover:-translate-y-2 transition-transform duration-200 ease-in-out`
- Stats: `<CountUp>` for all quantitative values (benchmarks, percentages, counts)
- Tabs: `autoSwitch={true} autoSwitchInterval={6000}` always

**New interactive components:**

- `<Badge>` from `@/components/ui/badge`: use for "New", "Beta", version labels in cards
- `<Accordion>` from `@/components/ui/accordion`: FAQ sections
- `<Tooltip>` from `@/components/ui/tooltip`: technical term hover definitions

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
- [ ] HeroSection uses split layout with rightSlot or heroImage
- [ ] All colors use design tokens (no `bg-[#...]`)
- [ ] `<Header />` and `<Footer />` included
- [ ] Page content wrapper has `pt-[62px] lg:pt-20`
- [ ] Every FeaturesGrid item has `icon` prop (Lucide, strokeWidth={1.5})
- [ ] Every ColorCard item has `icon` prop
- [ ] Clickable cards have `hover:-translate-y-2 transition-transform duration-200 ease-in-out`
- [ ] Tabs (if used) has `autoSwitch={true} autoSwitchInterval={6000}`
- [ ] `<CountUp>` used for benchmark / scale metrics (≥3 stats)
- [ ] Page uses ≥2 distinct section backgrounds
- [ ] FAQ section (if any) uses `<Accordion>` component
