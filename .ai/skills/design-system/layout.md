# Page Layout

## Container

```tsx
// max-w-container = 1502px (outer) · content = 1374px · responsive horizontal padding
<div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
```

| Breakpoint | Padding |
|------------|---------|
| Mobile (default) | `px-4` (16px) |
| ≥768px (md) | `md:px-8` (32px) |
| ≥1024px (lg) | `lg:px-16` (64px) |

---

## Page Structure

```
Navbar          fixed h-[62px] lg:h-20 — add pt-[62px] lg:pt-20 to page content
                Links: relative paths within website-launchpad;
                       full domain https://www.pingcap.com/... outside website-launchpad
                CTAs: Sign In → https://tidbcloud.com/signin
                      Start for Free → https://tidbcloud.com/free-trial/
Hero            bg-bg-inverse (pure black), no gradients
Feature Sections  alternating bg-bg-primary / bg-bg-subtle
CTA Section     one of four brand dark backgrounds
Footer          Links: same rule — relative inside, full domain outside website-launchpad
```

---

## Hero Section

```tsx
<section className="bg-bg-inverse pt-20 pb-20 text-center relative overflow-hidden">
  {/* Eyebrow: optional, placed directly above H1 when used */}
  {eyebrow && (
    <p className="font-mono text-eyebrow text-carbon-400 mb-8">{eyebrow}</p>
  )}
  {/* H1: 48px mobile / 68px desktop — mobile-first order */}
  <h1 className="text-h1-mb md:text-h1 font-bold leading-tight text-text-inverse max-w-hero-title mx-auto mb-6">
    Modern Database for Real-Time Workloads
  </h1>
  <p className="text-body-xl text-carbon-400 max-w-subtitle mx-auto mb-10">
    Scale from gigabytes to petabytes without re-architecting your application.
  </p>
  <div className="flex items-center justify-center gap-4 flex-wrap">
    <PrimaryButton>Start for Free</PrimaryButton>
    <SecondaryButton>View Demo</SecondaryButton>
  </div>
</section>
```

### Variant B — Split layout (text left + right slot)

Use `rightSlot` for hero sections that pair copy with a form, image, or other content on the right.

```tsx
<HeroSection
  eyebrow="TiDB Cloud Startup Program"
  headline="Launch Fast. Scale without Limits."
  subheadline="Apply now and start building with the distributed SQL database that grows with you."
  rightSlot={
    <div id="hero-form">
      <HubSpotForm formId={FORM_ID} />
    </div>
  }
/>
```

**Hero Rules:**
- Background: `bg-bg-inverse` (`#000000`), **no gradients of any kind**
- Eyebrow: **optional** — when present, place directly above H1 with `mb-8`
- Add `pt-[62px] lg:pt-20` to the page content wrapper to compensate for the fixed Navbar (mobile 62px / desktop 80px)
- Split layout: when `rightSlot` is provided, layout switches to a 2-column grid (`grid-cols-1 lg:grid-cols-2`), text becomes left-aligned, headline uses `text-h2` scale instead of `text-h1`

---

## CTA Section

Always use the `<CtaSection>` component. Layout: colored background · cube image left (4 cols) · title + CTAs right (8 cols).

```tsx
<CtaSection
  title="Ready to Scale Your Database?"
  subtitle="Deploy TiDB in minutes. No credit card required."
  primaryCta={{ text: 'Start for Free', href: '/signup/' }}
  secondaryCta={{ text: 'Read the Docs', href: '/docs/' }}
  background="red"
/>
```

**Props:**
- `background`: `'red'` (default) · `'violet'` · `'blue'` · `'teal'` — controls both background color and cube image
- `title`: required
- `subtitle`: optional
- `primaryCta`: required `{ text, href }`
- `secondaryCta`: optional `{ text, href }`

**Background options:**

| value | use case | bg color |
|-------|----------|----------|
| `red` | general / get started | `#630D09` |
| `violet` | AI features | `#3C174C` |
| `blue` | cloud-native | `#0D3152` |
| `teal` | data / success | `#093434` |

The cube image automatically matches the background color — do not override it.

---

## Responsive Breakpoints

Mobile-first. Primary design target: `xl` (>1280px).

| Breakpoint | Prefix | Range |
|------------|--------|-------|
| xs | none | < 480px |
| sm | `sm:` | ≥ 480px |
| md | `md:` | ≥ 768px |
| lg | `lg:` | ≥ 1024px |
| xl | `xl:` | ≥ 1280px |

---

## Responsive Grids

```tsx
{/* 3-column Feature Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{/* 4-column */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

{/* 2-column text + image */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
```

---

## Copy Guidelines

- **Tone**: Professional, direct, developer-focused — avoid marketing fluff
- **Headlines**: Verb + noun phrase, e.g. "Deploy TiDB Your Way" / "Built for Real-Time Apps"
- **Eyebrow**: Product name or page category — not all caps, no tracking-widest
- **CTA copy**: `Start for Free` (primary) · `View Demo` (secondary) · `Learn More` (tertiary)
- **Product names**: TiDB · PingCAP · TiDB Cloud · TiKV — casing is strict, no exceptions
- **Metrics**: Highlight technical stats prominently: 99.99% Availability · Petabyte-Scale
