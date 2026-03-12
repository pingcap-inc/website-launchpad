# Component Specifications

> All components use `cn()` for className merging, imported from `@/lib/utils`.
> **Icons**: Header dropdown/menu icons use `header-icons` (Header-only subset). All other page/section/content icons use `lucide-react`.
> **Links**: Within website-launchpad, internal hrefs use relative paths (`/tidb/`). **Outside website-launchpad**, use full domain `https://www.pingcap.com/...`. Sign In → `https://tidbcloud.com/signin`. Start for Free → `https://tidbcloud.com/free-trial/`.

---

## Header

```tsx
// components/ui/Header.tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary h-[62px] lg:h-20 px-4 md:px-8 lg:px-16 flex items-center justify-between">
  {/* Logo: 92×38 mobile / 120×50 desktop, do not replace */}
  <a href="https://www.pingcap.com/tidb/" className="shrink-0">
    <Image
      src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
      alt="TiDB"
      width={120}
      height={50}
      className="block w-[92px] h-[38px] lg:w-[120px] lg:h-[50px]"
    />
  </a>

  {/* Desktop menu: hover-triggered mega-menu dropdowns */}
  <ul className="hidden lg:flex items-center gap-1 text-base font-medium text-text-inverse">
    <li>Product</li>
    <li>Solutions</li>
    <li>Resources</li>
    <li>Company</li>
    <li>
      <a href="https://docs.pingcap.com/">Docs</a>
    </li>
  </ul>

  {/* Desktop CTAs */}
  <div className="hidden lg:flex items-center gap-4 shrink-0">
    <GhostButton href="https://tidbcloud.com/signin">Sign In</GhostButton>
    <PrimaryButton href="https://tidbcloud.com/free-trial/">Start for Free</PrimaryButton>
  </div>

  {/* Mobile: hamburger → accordion menu */}
</nav>
```

**Implementation details (current):**

- `Header.tsx` keeps a lightweight shell (logo / top-level nav labels / CTA / mobile toggle).
- `HeaderMenus.tsx` contains mega-menu + mobile accordion content and is loaded with `next/dynamic`.
- Desktop dropdown content renders only when hovered/focused (`openDropdown === item.label`), not pre-rendered.
- Mobile menu mounts only when opened (`mobileOpen`).
- Header dropdown icons are imported from `header-icons.tsx` (subset), avoiding full `pingcap-icons.tsx` in initial Header path.

**Dropdown icons** in Header use this subset:

- Product: `CloudTIcon`, `StackTIcon`, `DollarTIcon`, `GearIcon`, `SlidersIcon`, `StarIcon`, `EyeIcon`
- Solutions: `ChartDownTIcon`, `StarIcon`, `CloudTIcon`, `AiTIcon`, `WalletTIcon`, `BagT1Icon`, `DesktopTIcon`
- Resources: `FileTIcon`, `BookTIcon`, `VideoIcon`, `ScaleTIcon`, `CalendarTIcon`, `CommentsTIcon`, `CodeTIcon`, `BookmarkTIcon`, `EducationIcon`, `AppWindowIcon`, `AwardIcon`
- Company: `NewspaperIcon`, `BuildingsIcon`, `BriefcaseIcon`, `HandshakeIcon`, `AtIcon`

Rules: `h-[62px] lg:h-20` · `px-4 md:px-8 lg:px-16` · pure black background · add `pt-[62px] lg:pt-20` to page content wrapper.

---

## PrimaryButton — "The Red Flood"

White rectangle, on hover a red circle expands to flood the button; text transitions to white.

**Layer structure — must be strictly followed:**

```
button  →  relative + overflow-hidden
  span  →  absolute z-0   (Red Flood circle)
  span  →  relative z-10  (text)
  icon  →  relative z-10  (icon)
```

```tsx
// components/ui/PrimaryButton.tsx
export function PrimaryButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}) {
  const classes = cn(
    'group relative overflow-hidden',
    'rounded-none h-10 bg-bg-inverse px-4', // px-4 = 16px
    'inline-flex items-center gap-2',
    'border-none outline-none cursor-pointer whitespace-nowrap',
    className
  )
  // content: Red Flood circle + text span + ArrowUpRight icon
  // all three must have relative z-10 except the circle (absolute z-0)
}
```

| Property   | Value                                           |
| ---------- | ----------------------------------------------- |
| Height     | `h-10` (40px)                                   |
| Padding    | `px-4` (16px)                                   |
| Background | `bg-bg-inverse` (`#FFFFFF`)                     |
| Red Flood  | `w-[30%]` circle scales to `scale-[6]` on hover |
| Transition | `500ms ease-in-out`                             |

---

## SecondaryButton

No background, no border. `dark` prop controls color scheme (default `true` for dark backgrounds).

```tsx
// components/ui/SecondaryButton.tsx
interface SecondaryButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string // renders as <a> when provided
  dark?: boolean // default true — use false on light/white backgrounds
}

export function SecondaryButton({
  children,
  className,
  onClick,
  href,
  dark = true,
}: SecondaryButtonProps) {
  const classes = cn(
    'group inline-flex items-center gap-2 text-base font-medium',
    dark ? 'text-text-inverse' : 'text-text-primary',
    'bg-transparent border-none outline-none cursor-pointer whitespace-nowrap',
    className
  )
  // circle: dark=true → group-hover:bg-text-inverse; dark=false → group-hover:bg-text-primary
  // arrow: dark=true → text-text-inverse, hover: text-text-primary
  //        dark=false → text-text-primary, hover: text-text-inverse
  // Both rotate 45° on hover
}
```

| State        | `dark=true` (dark bg)       | `dark=false` (light bg)     |
| ------------ | --------------------------- | --------------------------- |
| Text         | `text-text-inverse` (white) | `text-text-primary` (black) |
| Circle hover | `bg-text-inverse`           | `bg-text-primary`           |
| Arrow idle   | white                       | black                       |
| Arrow hover  | black + `rotate-45`         | white + `rotate-45`         |

```tsx
// Dark background (default)
<SecondaryButton href="/docs/">Read the Docs</SecondaryButton>

// Light background
<SecondaryButton href="/docs/" dark={false}>Read the Docs</SecondaryButton>
```

---

## GhostButton (Header only)

```tsx
// components/ui/GhostButton.tsx
export function GhostButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}) {
  // rounded-pill · bg-transparent · text-text-inverse hover:text-carbon-400
  // px-4 py-3 · transition-colors 200ms
}
```

---

## FeatureCard

Bordered card. Optional icon (ReactNode or image path). Optional link → `<a>` with hover float; no link → `<div>` with hover shadow.

```tsx
// components/ui/FeatureCard.tsx
interface FeatureCardProps {
  icon?: React.ReactNode | string // string path → next/image fill in relative container
  title: string
  description: string
  borderColor?: string // Tailwind border class. Default: 'border-carbon-800'
  href?: string // When set: renders <a> with hover -translate-y-2
  className?: string
}
```

| Prop          | Default               | Notes                                                                               |
| ------------- | --------------------- | ----------------------------------------------------------------------------------- |
| `icon`        | —                     | Optional. String → `<Image fill>` in relative wrapper. ReactNode rendered directly. |
| `borderColor` | `'border-carbon-800'` | Any Tailwind `border-*` class                                                       |
| `href`        | —                     | With href: float `-translate-y-2`; without: `hover:shadow-card`                     |
| `className`   | —                     | Add `h-full` when used in a grid for equal heights                                  |

Typography in current implementation:

- title: `text-h3-lg` (24px, bold)
- description: `text-body-md` (16px, light)

```tsx
// Usage examples
<FeatureCard title="High Availability" description="99.99% uptime SLA." />
<FeatureCard icon="/images/icon.svg" title="..." description="..." borderColor="border-brand-red-primary" />
<FeatureCard icon={<DatabaseIcon />} title="..." description="..." href="/product/" />
```

---

## Tabs

Tab switcher with animated underline. `'use client'` component.

```tsx
// components/ui/Tabs.tsx — 'use client'
interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultActiveTab?: string // defaults to tabs[0].id
  className?: string
  autoSwitch?: boolean // default false
  autoSwitchInterval?: number // ms, default 6000
  onTabChange?: (tabId: string) => void
}
```

**Behavior:**

| Mode               | Interaction                   | Underline                                                 |
| ------------------ | ----------------------------- | --------------------------------------------------------- |
| `autoSwitch=false` | click-only                    | Full-width static (`w-full`)                              |
| `autoSwitch=true`  | hover switches + auto-rotates | Left-to-right progress animation (`animate-tab-progress`) |

- Tab label: active → `text-white`; inactive → `text-carbon-900 hover:text-white`
- 2-layer underline: base `bg-carbon-900 h-[2px]` (always) + active `bg-white h-[2px]`
- `autoSwitch=true`: `animationDuration = autoSwitchInterval`ms; hover pauses auto-rotation
- Content: `opacity-100 block` ↔ `opacity-0 hidden` with `transition-opacity duration-300`
- Requires `animate-tab-progress` keyframe in `tailwind.config.ts`

```tsx
// Auto-switch with 5s interval
<Tabs
  tabs={[
    { id: 'oltp', label: 'OLTP', content: <OltpContent /> },
    { id: 'analytics', label: 'Analytics', content: <AnalyticsContent /> },
  ]}
  autoSwitch
  autoSwitchInterval={5000}
/>

// Static click-only tabs
<Tabs tabs={tabs} />
```

---

## CountUp

Animated number counter. Triggers once when element scrolls into view. `'use client'` component.

```tsx
// components/ui/CountUp.tsx — 'use client'
export function CountUp({ value, className }: { value: string; className?: string })
```

**Value parsing** — `"$2,000+"` → `{ prefix: "$", target: 2000, suffix: "+", hasComma: true }`

| Input       | Parsed                                  |
| ----------- | --------------------------------------- |
| `"$2,000+"` | prefix `$`, number `2000`, suffix `+`   |
| `"99.99%"`  | prefix `""`, number `99`, suffix `.99%` |
| `"10M+"`    | prefix `""`, number `10`, suffix `M+`   |

Animation: 1400ms cubic ease-out (`1 - (1-t)^3`). Fires once at 40% viewport visibility. Comma formatting via `toLocaleString('en-US')` when source includes comma.

```tsx
// Stats row
<div className="grid grid-cols-3 gap-8 text-center">
  <div>
    <CountUp value="$2,000+" className="text-h2-mb md:text-h2-lg font-bold text-text-inverse" />
    <p className="text-body-sm text-text-secondary mt-2">in cloud credits</p>
  </div>
</div>
```

---

## SectionHeader

Section title block with optional eyebrow, H2, and subtitle. Mobile-first sizing.

```tsx
// components/ui/SectionHeader.tsx
// Mobile-first: text-h2-mb (40px mobile) → md:text-h2-{size} (desktop)
const h2SizeMap = {
  lg: 'text-h2-mb md:text-h2-lg', // 40px → 64px
  md: 'text-h2-mb md:text-h2-md', // 40px → 56px
  sm: 'text-h2-mb md:text-h2-sm', // 40px → 50px
}

export function SectionHeader({
  label,
  title,
  subtitle,
  h2Size = 'lg',
  align = 'center',
  className,
}: {
  label?: string
  title: string
  subtitle?: string
  h2Size?: 'lg' | 'md' | 'sm'
  align?: 'center' | 'left'
  className?: string
})
```

| Element         | Classes                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| Eyebrow (label) | `font-mono text-eyebrow text-text-secondary block mb-8`                                                        |
| H2              | `{h2SizeMap[h2Size]} font-bold leading-tight mb-4 text-text-inverse` + `max-w-section-title` when left-aligned |
| Subtitle        | `text-body-2xl leading-relaxed max-w-subtitle text-text-secondary` + `mx-auto` when centered                   |
| Wrapper         | `mb-16` (overridable via className)                                                                            |

```tsx
<SectionHeader h2Size="lg" label="OVERVIEW" title="Modern Database Architecture" />
<SectionHeader label="BENEFITS" title="Advanced Features" subtitle="..." align="left" />
<SectionHeader h2Size="sm" title="Built for Real-Time Apps" align="center" />
```

---

## Icon Usage

```tsx
// Header dropdown/menu only
import { CloudTIcon, NewspaperIcon } from '@/components/ui/header-icons'

// Non-header page/section content
import { Globe, Database, Rocket } from 'lucide-react'
```

Rule:

- Header dropdown/menu icons: `header-icons`
- Non-header icons: `lucide-react`

---

## Footer

```tsx
// components/ui/Footer.tsx
// 4-column nav grid + newsletter + 7 social icons (GitHub/Twitter/LinkedIn/Facebook/Slack/Discord/YouTube)
// All footer links use full https://www.pingcap.com/... domain
```

---

## File Structure

```
components/
  ui/
    Header.tsx              # Fixed navbar with mega-menu + mobile accordion
    Footer.tsx              # Footer nav + social icons + newsletter
    PrimaryButton.tsx       # "Red Flood" CTA button (supports href)
    SecondaryButton.tsx     # Text + arrow button (href?, dark=true)
    GhostButton.tsx         # Transparent nav button (supports href)
    Tabs.tsx                # Tab switcher with progress underline ('use client')
    CountUp.tsx             # Animated number counter ('use client')
    FeatureCard.tsx         # Card with optional icon, href, borderColor
    SectionHeader.tsx       # Eyebrow + H2 + subtitle (mobile-first sizing)
    HubSpotForm.tsx         # HubSpot form embed
    LanguageSwitcher.tsx    # EN / JP language selector
    header-icons.tsx        # Header dropdown/menu icon subset
  sections/
    HeroSection.tsx
    FeaturesGrid.tsx
    CtaSection.tsx
lib/
  utils.ts                  # cn() utility (uses clsx + tailwind-merge)
  gtm.ts                    # trackCTAClick, trackFormSubmit
  schema.ts                 # buildPageSchema and all schema builders
```

---

## shadcn Components (Radix UI Primitives)

> These components are built on Radix UI for accessibility (keyboard nav, ARIA, focus management).
> All are customized to use project brand tokens — no CSS variables required.

### Badge

```tsx
import { Badge } from '@/components/ui/badge'

// Outline (default) — category labels, eyebrow tags, filter chips
<Badge>Open Source</Badge>
<Badge variant="outline">Distributed SQL</Badge>

// Primary (red) — "New", "Hot", highlighted
<Badge variant="default">New</Badge>

// Secondary (carbon) — "Beta", "Preview", status
<Badge variant="secondary">Beta</Badge>
```

**Variants:** `default` (red) · `secondary` (carbon-800) · `outline` (border-carbon-700, default)

**Rules:** Always use `font-bold` (built in). Place alongside section titles or inside cards. Never use for navigation.

---

### Accordion

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// FAQ section pattern — always place before CtaSection
;<section className="py-section-sm lg:py-section bg-bg-primary">
  <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
    <SectionHeader label="FAQ" title="Frequently Asked Questions" className="mb-12" />
    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="q1">
          <AccordionTrigger>What is TiDB?</AccordionTrigger>
          <AccordionContent>
            TiDB is a distributed SQL database that supports HTAP workloads...
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>How does TiDB scale?</AccordionTrigger>
          <AccordionContent>
            TiDB uses a shared-nothing architecture with separate storage and compute layers...
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  </div>
</section>
```

**Props:** `type="single"` (one open at a time) · `collapsible` (allow closing all)
**Animation:** Accordion open/close uses CSS height animation via `animate-accordion-down` / `animate-accordion-up` keyframes (added to `tailwind.config.ts`).

---

### Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// CTA modal pattern
;<Dialog>
  <DialogTrigger asChild>
    <PrimaryButton>Start for Free</PrimaryButton>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Get Started with TiDB Cloud</DialogTitle>
      <DialogDescription>
        Create your free cluster in under 5 minutes. No credit card required.
      </DialogDescription>
    </DialogHeader>
    {/* form or HubSpot embed */}
  </DialogContent>
</Dialog>
```

**Styling:** Dark surface (`bg-bg-surface` #06111A) with `border-carbon-800`. Overlay: `bg-black/80`. Inherits Moderat font from site globals.

---

### Tooltip

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Wrap page or section in TooltipProvider (once per subtree)
;<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="underline decoration-dotted cursor-help">HTAP</span>
    </TooltipTrigger>
    <TooltipContent>
      <p>Hybrid Transactional and Analytical Processing</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**When to use:** Technical terms on hover, icon button labels, truncated text explanations. Don't use for important information that must always be visible.

---

### Separator

```tsx
import { Separator } from '@/components/ui/separator'

// Horizontal divider (default)
<Separator className="my-8" />

// Vertical divider (e.g., in stat rows)
<Separator orientation="vertical" className="h-12 mx-4" />
```

**Color:** `bg-carbon-800` by default — subtle 1px divider for dark backgrounds.

---

## Section Components

> Always import from `@/components` (barrel) or the direct path `@/components/sections/`.
> All sections use `py-section-sm lg:py-section` vertical padding.
> See `visual-design.md` § Section C for background rhythm guidelines.

---

### HeroSection

Full-width hero. Supports `image-right` (default), `centered`, and `split` layouts.

```tsx
import { HeroSection } from '@/components/sections/HeroSection'

interface HeroSectionProps {
  layout?: 'image-right' | 'centered' | 'split' // default 'image-right'
  eyebrow?: string
  headline: string // supports \n for line breaks
  subheadline?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  rightSlot?: React.ReactNode // split layout: right column (form, image, SVG)
  heroImage?: {
    // image-right layout — defaults to Graphic-1-Dk.png (800×500) if omitted
    src: string
    alt?: string
    width: number
    height: number
    align?: 'right' | 'center'
    priority?: boolean
  }
  backgroundImage?: {
    src?: string
    alt?: string
    priority?: boolean
    opacityClassName?: string // default 'opacity-40'
    overlayClassName?: string
    positionClassName?: string // default 'object-center'
  }
  className?: string
}
```

**Rules:**

- `image-right` is the default layout; `heroImage` is optional (falls back to `Graphic-1-Dk.png`).
- `split` layout right column is empty when `rightSlot` is omitted — provide a visual.
- Centered layout defaults to no eyebrow.

---

### FeatureGridSection

Clean feature grid with icon + title + description items, no card border.

```tsx
import { FeatureGridSection } from '@/components/sections/FeatureGridSection'

interface FeatureGridSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  features: Array<{
    icon?: React.ReactNode
    title: string
    description: string
    cta?: { text: string; href: string }
  }>
  columns?: 2 | 3 | 4 // default 3
  viewMore?: { text?: string; href: string }
  className?: string
}
```

---

### FeatureCardSection

Feature grid using `<FeatureCard>` bordered cards. Supports links per card.

```tsx
import { FeatureCardSection } from '@/components/sections/FeatureCardSection'

interface FeatureCardSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: Array<{
    icon?: React.ReactNode
    title: string
    description: string
    borderColor?: string // e.g. 'border-brand-red-primary'
    href?: string // enables hover float on the card
    className?: string
  }>
  columns?: 2 | 3 | 4 // default 3
  borderStyle?: 'gray' | 'color' // 'color' cycles brand colors
  className?: string
}
```

---

### FeatureHighlightsSection

Grid of `<ColorCard>` items with brand-color backgrounds. Use for showcase moments.

```tsx
import { FeatureHighlightsSection } from '@/components/sections/FeatureHighlightsSection'

interface FeatureHighlightsSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: Array<{
    variant: 'red' | 'violet' | 'blue' | 'teal'
    title: string
    description: string
    cta: { text: string; href: string }
    icon: React.ReactNode // required — lucide icon, strokeWidth={1.5}
  }>
  columns?: 2 | 3 | 4 // default 3
  viewMore?: { text?: string; href: string }
  className?: string
}
```

---

### FeatureTabsSection

Tabbed section with left text/bullets and right image. Auto-switches tabs. `'use client'`.

```tsx
import { FeatureTabsSection } from '@/components/sections/FeatureTabsSection'

interface FeatureTabsSectionProps {
  eyebrow?: string
  title: string
  subtitle?: string
  tabs: Array<{
    id: string
    label: string
    title?: string
    description?: string
    bullets?: string[]
    primaryCta?: { text: string; href: string }
    secondaryCta?: { text: string; href: string }
    content?: React.ReactNode
    image: { src: string; alt: string; width?: number; height?: number }
  }>
  autoSwitch?: boolean // default false
  autoSwitchInterval?: number // ms, default 6000
  className?: string
}
```

**Rule:** Always use `autoSwitch={true} autoSwitchInterval={6000}`.

---

### StatsSection _(new)_

Metrics grid with `<CountUp>` animation. Use for 3–6 key stats on product/landing pages. `'use client'`.

```tsx
import { StatsSection } from '@/components/sections/StatsSection'

interface StatsSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  stats: Array<{
    icon?: React.ReactNode // optional lucide icon, strokeWidth={1.5}
    value: string // "99.9%", "$2M+", "10x" — parsed by CountUp
    label: string // "Uptime SLA"
    description?: string // additional context (carbon-400)
  }>
  columns?: 2 | 3 | 4 // default 3
  className?: string
}
```

**Background:** `bg-gradient-dark-top` (built in — follow alternating rhythm).
**Rule:** Each `value` is passed to `<CountUp>` — use numeric-parseable strings (e.g. `"99.9%"`, `"10x"`, `"$2,000+"`).

```tsx
<StatsSection
  eyebrow="BY THE NUMBERS"
  title="Trusted at Scale"
  stats={[
    {
      icon: <Zap strokeWidth={1.5} />,
      value: '10x',
      label: 'Faster Queries',
      description: 'Compared to standard MySQL',
    },
    {
      icon: <Shield strokeWidth={1.5} />,
      value: '99.99%',
      label: 'Uptime SLA',
      description: 'Enterprise-grade availability',
    },
    {
      icon: <Globe strokeWidth={1.5} />,
      value: '5,000+',
      label: 'Global Customers',
      description: 'Across 60+ countries',
    },
  ]}
/>
```

---

### LogoCloudSection

Logo grid or auto-scrolling marquee. Two visual variants.

```tsx
import { LogoCloudSection } from '@/components/sections/LogoCloudSection'

interface LogoCloudSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  logos: Array<{
    name: string
    src: string
    href?: string
    width?: number // default 140
    height?: number // default 48
  }>
  columns?: 2 | 3 | 4 | 5 | 6 // default 4 (grid mode only)
  variant?: 'default' | 'minimal' // default 'default'
  autoScroll?: boolean // default true (triggers when logos > 5)
  scrollSpeedSeconds?: number // default 28
  className?: string
}
```

**Variants:**

- `default` — bordered containers, color on hover, `grayscale` at rest
- `minimal` — transparent, white inverted (`brightness-0 invert`)

---

### TestimonialsSection

Auto-rotating testimonial carousel with pause-on-hover. `'use client'`.

```tsx
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

interface TestimonialsSectionProps {
  eyebrow?: string // default "Testimonials"
  title: string
  testimonials: Array<{
    quote: string
    author: string
    href?: string
    cta?: string // link text (requires href)
    logo?: { src: string; alt: string; size?: number }
  }>
  className?: string
}
```

**Behavior:** Cycles every 4s with 700ms slide transition. Respects `prefers-reduced-motion`. Height is computed from the tallest card to avoid layout shift.

---

### FaqSection

FAQ accordion. Always place immediately before `<CtaSection>`.

```tsx
import { FaqSection } from '@/components/sections/FaqSection'

interface FaqSectionProps {
  title?: string // default "FAQ"
  items: Array<{ q: string; a: string }>
  className?: string
}
```

**Background:** `bg-gradient-dark-bottom` (built in).
**Rule:** First item opens by default. Use `<FaqSection>` instead of raw `<Accordion>` for FAQ blocks.

---

### CtaSection

Call-to-action banner. Always the last section before `<Footer>`.

```tsx
import { CtaSection } from '@/components/sections/CtaSection'

interface CtaSectionProps {
  label?: string
  title: string
  subtitle?: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  background?: 'red' | 'violet' | 'blue' | 'teal' // default 'red'
  className?: string
}
```

**Background color guidance** (from `visual-design.md`):

- Product/technical pages → `red` or `violet`
- Cloud/infrastructure pages → `blue`
- Data/analytics pages → `teal`
