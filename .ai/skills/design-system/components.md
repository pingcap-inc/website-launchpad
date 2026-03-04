# Component Specifications

> All components use `cn()` for className merging, imported from `@/lib/utils`.
> **Icons**: `lucide-react` for chrome UI only (Menu, X, ChevronRight, ArrowUpRight). All nav/content icons use `pingcap-icons` (204 custom SVG icons from PingCAP iconfont).
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

**Dropdown icons** use `pingcap-icons`:

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
  icon?: React.ReactNode | string // string path → next/image fill in 90×60 container
  title: string
  description: string
  borderColor?: string // Tailwind border class. Default: 'border-carbon-800'
  href?: string // When set: renders <a> with hover -translate-y-2
  className?: string
}
```

| Prop          | Default               | Notes                                                                        |
| ------------- | --------------------- | ---------------------------------------------------------------------------- |
| `icon`        | —                     | Optional. String → `<Image fill>` in 90×60 box. ReactNode rendered directly. |
| `borderColor` | `'border-carbon-800'` | Any Tailwind `border-*` class                                                |
| `href`        | —                     | With href: float `-translate-y-2`; without: `hover:shadow-card`              |
| `className`   | —                     | Add `h-full` when used in a grid for equal heights                           |

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
| Subtitle        | `text-body-xl leading-relaxed max-w-subtitle text-text-secondary` + `mx-auto` when centered                    |
| Wrapper         | `mb-16` (overridable via className)                                                                            |

```tsx
<SectionHeader h2Size="lg" label="OVERVIEW" title="Modern Database Architecture" />
<SectionHeader label="BENEFITS" title="Advanced Features" subtitle="..." align="left" />
<SectionHeader h2Size="sm" title="Built for Real-Time Apps" align="center" />
```

---

## PingCAP Icons

```tsx
// components/ui/pingcap-icons.tsx
// 204 custom SVG icons from PingCAP iconfont
import { NewspaperIcon, BuildingsIcon, CloudTIcon } from '@/components/ui/pingcap-icons'
;<NewspaperIcon size={16} className="text-carbon-400" />
```

All nav/content icons use `pingcap-icons`. `lucide-react` only for: `Menu`, `X`, `ChevronRight`, `ArrowUpRight`.

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
    pingcap-icons.tsx       # 204 custom PingCAP SVG icons
  sections/
    HeroSection.tsx
    FeaturesGrid.tsx
    CtaSection.tsx
lib/
  utils.ts                  # cn() utility
  gtm.ts                    # trackCTAClick, trackFormSubmit
  schema.ts                 # buildPageSchema and all schema builders
```
