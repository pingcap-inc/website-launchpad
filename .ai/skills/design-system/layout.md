# Page Layout

## Container

```tsx
// max-w-container = 1502px (outer) · content = 1374px · responsive horizontal padding
<div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
```

| Breakpoint       | Padding           |
| ---------------- | ----------------- |
| Mobile (default) | `px-4` (16px)     |
| ≥768px (md)      | `md:px-8` (32px)  |
| ≥1024px (lg)     | `lg:px-16` (64px) |

---

## Page Structure

```
Navbar          fixed h-[62px] lg:h-20 — add pt-[62px] lg:pt-20 to page content
                Links: relative paths within website-launchpad;
                       full domain https://www.pingcap.com/... outside website-launchpad
                CTAs: Sign In → https://tidbcloud.com/signin
                      Start for Free → https://tidbcloud.com/free-trial/
Hero            bg-bg-primary (pure black), no gradients
Feature Sections  alternating bg-bg-primary / bg-bg-subtle
CTA Section     one of four brand dark backgrounds
Footer          Links: same rule — relative inside, full domain outside website-launchpad
```

---

## Hero Section

```tsx
<section className="bg-bg-primary pt-20 pb-20 relative overflow-hidden">
  <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        {eyebrow && <p className="font-mono text-eyebrow text-carbon-400 mb-8">{eyebrow}</p>}
        <h1 className="text-h1-mb md:text-h1 font-bold leading-tight text-text-inverse mb-6">
          Modern Database for Real-Time Workloads
        </h1>
        <p className="text-body-xl text-carbon-400 max-w-subtitle mb-10">
          Scale from gigabytes to petabytes without re-architecting your application.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <PrimaryButton>Start for Free</PrimaryButton>
          <SecondaryButton>View Demo</SecondaryButton>
        </div>
      </div>
      <div>{/* illustration / form / visual panel */}</div>
    </div>
  </div>
</section>
```

### Hero visual references

All Hero illustration generation and manual selection should align to:
`.ai/skills/design-system/references/hero/`

Current references:

- `hero-ref-main-01.png`
- `hero-ref-main-02.png`
- `hero-ref-main-03.png`

Usage rule:

- Prefer SVG references first for shape language and composition.
- PNG references are secondary for texture/lighting hints.
- Auto-generated Hero visuals must follow these references for geometry density, color restraint, and spacing rhythm.

### Variant A — Split layout (default)

Default Hero layout is split: left column for copy + CTAs, right column for a visual slot.
The right slot can be an illustration, product screenshot, stats panel, or form.

### Variant B — Centered layout

Use centered layout only when the page intent is message-first.
Centered Hero must include a background image and defaults to no eyebrow.

```tsx
<HeroSection
  headline="Launch Fast. Scale without Limits."
  subheadline="Apply now and start building with the distributed SQL database that grows with you."
  centered
  autoGenerateBackgroundImage
/>
```

### Background image behavior (all Hero variants)

```tsx
// Preferred: use provided background image asset
<HeroSection backgroundImage={{ src: heroBg }} />

// Fallback: if no image resource is specified, auto-generate from page content
<HeroSection autoGenerateBackgroundImage />
```

**Hero Rules:**

- Background: `bg-bg-primary` (`#000000`), **no gradients of any kind**
- Default layout is split (`grid-cols-1 lg:grid-cols-2`): left text+buttons, right visual slot
- Right visual slot accepts illustration, form, chart, screenshot, or product panel
- Centered layout: default **no eyebrow**
- Centered layout: background image is required
- If no background image resource is provided, auto-generate the Hero illustration from page content
- Eyebrow (when used): place directly above H1 with `mb-8`
- Add `pt-[62px] lg:pt-20` to the page content wrapper to compensate for the fixed Navbar (mobile 62px / desktop 80px)
- Hero background image: no overlay layer by default
- Hero image treatment: use `opacity-30` to `opacity-70`; no heavy blur, no strong color cast that competes with headline
- Mobile fallback (`<md`): text-first reading order; split layout collapses to single column with copy above visual

---

## ColorCard

Colored background card with no border. The card IS the link — on hover it floats up 8px and the SecondaryButton arrow animates. Use in a 4-column grid following the red → violet → blue → teal order.

```tsx
import { ColorCard } from '@/components'
import { Rocket } from 'lucide-react'
;<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <ColorCard
    variant="red"
    icon={<Rocket className="w-full h-full" />}
    title="..."
    description="..."
    cta={{ text: 'Learn More', href: '/' }}
  />
  <ColorCard
    variant="violet"
    icon={<Rocket className="w-full h-full" />}
    title="..."
    description="..."
    cta={{ text: 'Learn More', href: '/' }}
  />
  <ColorCard
    variant="blue"
    image={{ src: '/icon.svg', alt: '...' }}
    title="..."
    description="..."
    cta={{ text: 'Learn More', href: '/' }}
  />
  <ColorCard
    variant="teal"
    image={{ src: '/icon.svg', alt: '...' }}
    title="..."
    description="..."
    cta={{ text: 'Learn More', href: '/' }}
  />
</div>
```

**Props:**

- `variant`: `'red'` · `'violet'` · `'blue'` · `'teal'` — sets background color
- `title`: required
- `description`: required
- `cta`: required `{ text, href }` — SecondaryButton style, triggered by card hover
- `icon`: optional — Lucide icon or SVG ReactNode (rendered at 48×48, white/80)
- `image`: optional — `{ src, alt, width?, height? }` (rendered via next/image at 48×48)

**Hover behavior:** card floats up 8px · arrow rotates 45° · circle fills white

**Background colors:** red `#630D09` · violet `#3C174C` · blue `#0D3152` · teal `#093434`

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

| value    | use case              | bg color  |
| -------- | --------------------- | --------- |
| `red`    | general / get started | `#630D09` |
| `violet` | AI features           | `#3C174C` |
| `blue`   | cloud-native          | `#0D3152` |
| `teal`   | data / success        | `#093434` |

The cube image automatically matches the background color — do not override it.

---

## Responsive Breakpoints

Mobile-first. Primary design target: `xl` (>1280px).

| Breakpoint | Prefix | Range    |
| ---------- | ------ | -------- |
| xs         | none   | < 480px  |
| sm         | `sm:`  | ≥ 480px  |
| md         | `md:`  | ≥ 768px  |
| lg         | `lg:`  | ≥ 1024px |
| xl         | `xl:`  | ≥ 1280px |

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
