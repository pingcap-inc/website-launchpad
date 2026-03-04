# Page Type: Landing Page

> **Internal spec for Claude.** Ops users never need to read this file.
> Claude reads this automatically when generating a landing page.

---

## Trigger Conditions

Use this page type when the pasted material is:

- A campaign brief or activity brief (活动简报)
- A paid promotion / ad landing page
- An event registration or limited-time offer page
- A program enrollment page (e.g., startup programs, partner programs)
- Any page where the primary goal is a single conversion action

---

## URL Rules

- **Ops-defined** — no fixed convention. Confirm with user before generating.
- Suggested patterns: `/lp/[campaign-name]/` · `/[program-name]/` · `/event/[name]/`
- Always lowercase, hyphen-separated, trailing slash (`/lp/cloud-trial/` ✅)

---

## Page Structure

```
HeroSection (variant: centered)
  eyebrow: campaign label or program name
  headline: primary value proposition (≤10 words)
  subheadline: 1–2 sentence description
  primaryCta: main conversion action
  secondaryCta: optional secondary link

[Optional] CountUp stats row
  Use when material includes concrete metrics (e.g. "$2,000+ in credits", "10,000+ users")

FeaturesGrid or FeatureCard grid
  3–4 key benefits from the material

[Optional] ColorCard — use case highlights
  Use when material describes distinct audience segments or scenarios
  variant: matches brand color context

CtaSection
  Repeat primary CTA at page bottom
```

---

## SEO

```tsx
export const metadata: Metadata = {
  title: '{Campaign Title} | TiDB', // 50–60 chars
  description: '{150 chars max — full sentence}',
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
  robots: { index: true, follow: true }, // default: indexable
  alternates: { canonical: 'https://www.pingcap.com/{path}/' },
}
```

> **Paid ad / noindex exception:** If the user says "this is a paid ads page" or "don't index this",
> change to `robots: { index: false, follow: false }` and **do NOT add to `src/app/sitemap.ts`**.

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
// page_type for this path: 'landing_page'
// page_view fires automatically — no manual call needed
// Track CTA clicks:
trackCTAClick({ cta_text: 'Start for Free', cta_location: 'hero', page_path: '/{path}/' })
```

---

## Sitemap

Add to `src/app/sitemap.ts` (unless noindex):

```ts
{ url: '/{path}/', priority: 0.6, changeFrequency: 'monthly' },
```

---

## Checklist (auto-run after generating)

- [ ] `metadata` export present with all required fields
- [ ] `canonical` points to `https://www.pingcap.com/{path}/`
- [ ] `siteName: 'TiDB | SQL at Scale'` (exact string)
- [ ] `twitter.site: '@PingCAP'` (exact string)
- [ ] `buildPageSchema()` used — no raw JSON-LD
- [ ] Page added to `src/app/sitemap.ts` (if indexable)
- [ ] All colors use design tokens (no `bg-[#...]`)
- [ ] `<Header />` and `<Footer />` included
- [ ] Page content wrapper has `pt-[62px] lg:pt-20`
