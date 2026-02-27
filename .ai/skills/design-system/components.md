# Component Specifications

> All components use `cn()` for className merging, imported from `@/lib/utils`.
> **Icons**: `lucide-react` for chrome UI only (Menu, X, ChevronRight). All nav/content icons use `pingcap-icons` (204 custom SVG icons from PingCAP iconfont).
> **Links**: Within website-launchpad, internal hrefs use relative paths (`/tidb/`). **Outside website-launchpad**, use full domain `https://www.pingcap.com/...`. Sign In → `https://tidbcloud.com/signin`. Start for Free → `https://tidbcloud.com/free-trial/`.

---

## Navbar

```tsx
// components/ui/Navbar.tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-bg-inverse h-[62px] lg:h-20 px-4 md:px-8 lg:px-16 flex items-center justify-between">

  {/* Logo: 92×38 mobile / 120×50 desktop, do not replace */}
  <a href="https://www.pingcap.com/tidb/" className="shrink-0">
    <Image src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
         alt="TiDB" width={120} height={50}
         className="block w-[92px] h-[38px] lg:w-[120px] lg:h-[50px]" />
  </a>

  {/* Desktop menu: hover-triggered mega-menu dropdowns */}
  <ul className="hidden lg:flex items-center gap-1 text-base font-medium text-text-inverse">
    <li>Product</li>      {/* MegaMenu dropdown with featured panel + sections */}
    <li>Solutions</li>     {/* MegaMenu dropdown */}
    <li>Resources</li>     {/* MegaMenu dropdown */}
    <li>Company</li>       {/* MegaMenu dropdown */}
    <li><a href="https://docs.pingcap.com/">Docs</a></li>
  </ul>

  {/* Desktop CTAs */}
  <div className="hidden lg:flex items-center gap-4 shrink-0">
    <GhostButton href="https://tidbcloud.com/signin">Sign In</GhostButton>
    <PrimaryButton href="https://tidbcloud.com/free-trial/">Start for Free</PrimaryButton>
  </div>

  {/* Mobile: hamburger → accordion menu */}
</nav>
```

**Dropdown icons** use `pingcap-icons` (imported from `./pingcap-icons`):
- Product: `CloudTIcon`, `StackTIcon`, `DollarTIcon`, `GearIcon`, `SlidersIcon`, `StarIcon`, `EyeIcon`
- Solutions: `ChartDownTIcon`, `StarIcon`, `CloudTIcon`, `AiTIcon`, `WalletTIcon`, `BagT1Icon`, `DesktopTIcon`
- Resources: `FileTIcon`, `BookTIcon`, `VideoIcon`, `ScaleTIcon`, `CalendarTIcon`, `CommentsTIcon`, `CodeTIcon`, `BookmarkTIcon`, `EducationIcon`, `AppWindowIcon`, `AwardIcon`
- Company: `NewspaperIcon`, `BuildingsIcon`, `BriefcaseIcon`, `HandshakeIcon`, `AtIcon`

Rules: `h-[62px] lg:h-20` (62px mobile / 80px desktop) · responsive padding `px-4 md:px-8 lg:px-16` · pure black background · no transparency / gradient / blur · add `pt-[62px] lg:pt-20` to page content.

---

## PrimaryButton — "The Red Flood"

White rectangle, on hover a red circle expands from the bottom center to flood the entire button; text transitions to white simultaneously.

**Layer structure — must be strictly followed:**
```
button  →  relative + overflow-hidden  (clips the circle)
  span  →  absolute z-0               (Red Flood circle)
  span  →  relative z-10              (text)
  icon  →  relative z-10              (icon)
```

```tsx
// components/ui/PrimaryButton.tsx
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Supports both <button> and <a> via optional `href` prop.
// When `href` is provided, renders as <a>; otherwise renders as <button>.
export function PrimaryButton({ children, className, onClick, href }: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}) {
  const classes = cn(
    'group relative overflow-hidden',
    'rounded-none h-10 bg-white px-[14px]',
    'inline-flex items-center gap-2',
    'border-none outline-none cursor-pointer whitespace-nowrap',
    className
  )

  const content = (
    <>
      {/* Red Flood circle */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-full
                   w-[30%] aspect-square rounded-full bg-brand-red-primary z-0
                   transition-transform duration-500 ease-in-out
                   group-hover:translate-y-[10%] group-hover:scale-[6]"
      />
      {/* Text */}
      <span className="relative z-10 text-base font-medium leading-none
                       text-text-primary transition-colors duration-500 ease-in-out
                       group-hover:text-text-inverse">
        {children}
      </span>
      {/* Icon */}
      <ArrowUpRight
        size={17}
        className="relative z-10 shrink-0 text-text-primary
                   transition-colors duration-500 ease-in-out
                   group-hover:text-text-inverse"
      />
    </>
  )

  if (href) return <a href={href} className={classes}>{content}</a>
  return <button onClick={onClick} className={classes}>{content}</button>
}
```

| Property | Value |
|----------|-------|
| Shape | `rounded-none` (strictly rectangular, 0 border-radius) |
| Height | `h-10` (40px) |
| Padding | `px-[14px]` |
| Background | `bg-white` |
| Red Flood initial | `w-[30%] bottom-0 translate-y-full` |
| Red Flood hover | `scale-[6] translate-y-[10%]` |
| Transition | `500ms ease-in-out` |

---

## SecondaryButton

No background, no border, black text. On hover: black circle appears behind the icon + arrow rotates 45°.

```tsx
// components/ui/SecondaryButton.tsx
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SecondaryButton({ children, className, onClick }: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group inline-flex items-center gap-2',
        'text-text-primary text-base font-medium',
        'bg-transparent border-none outline-none cursor-pointer whitespace-nowrap',
        className
      )}
    >
      <span>{children}</span>
      <span className="relative flex items-center justify-center
                       w-6 h-6 rounded-full aspect-square shrink-0
                       transition-colors duration-300 ease-in-out
                       group-hover:bg-text-primary">
        <ArrowUpRight
          size={16}
          className="transition-all duration-300 ease-in-out
                     rotate-0 text-text-primary
                     group-hover:rotate-45 group-hover:text-text-inverse"
        />
      </span>
    </button>
  )
}
```

| State | Arrow Rotation | Arrow Color | Circle Background |
|-------|---------------|-------------|-------------------|
| Idle | `rotate-0` | Black | Transparent |
| Hover | `rotate-45` | White | `bg-text-primary` (black) |

Transition `300ms ease-in-out`. No shadow / blur / glow.

> On dark backgrounds: change text/icon to `text-text-inverse`, circle hover to `group-hover:bg-text-inverse`, arrow hover to `group-hover:text-text-primary`.

---

## GhostButton (Navbar only)

```tsx
// components/ui/GhostButton.tsx
// Supports both <button> and <a> via optional `href` prop.
export function GhostButton({ children, className, onClick, href }: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}) {
  const classes = cn(
    'inline-flex items-center gap-2 font-medium rounded-pill',
    'bg-transparent text-text-inverse hover:text-carbon-400',
    'border-0 cursor-pointer px-4 py-3 text-base',
    'transition-colors duration-200 whitespace-nowrap',
    className
  )

  if (href) return <a href={href} className={classes}>{children}</a>
  return <button onClick={onClick} className={classes}>{children}</button>
}
```

| State | Text Color | Background |
|-------|-----------|------------|
| Idle | `text-text-inverse` (`#FFFFFF`) | None |
| Hover | `text-carbon-400` (`#A2ADB9`) | None |

---

## FeatureCard

```tsx
// components/ui/FeatureCard.tsx
export function FeatureCard({ icon, title, description, className }: {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={cn(
      'flex flex-col gap-4 p-8 rounded-none border border-border-subtle/20',
      'transition-all duration-250 hover:shadow-card',
      className
    )}>
      <div className="w-12 h-12">{icon}</div>
      <h3 className="text-h3-sm font-bold leading-normal m-0 text-text-inverse">{title}</h3>
      <p className="text-body-sm leading-relaxed m-0 text-text-inverse/65">{description}</p>
    </div>
  )
}
```

---

## SectionHeader

```tsx
// components/ui/SectionHeader.tsx
// h2Size: 'lg'=64px / 'md'=56px (default) / 'sm'=50px, mobile unified at 40px
const h2SizeMap = {
  lg: 'text-h2-lg md:text-h2-mb',
  md: 'text-h2-md md:text-h2-mb',
  sm: 'text-h2-sm md:text-h2-mb',
}

export function SectionHeader({ label, title, subtitle, h2Size = 'md', align = 'center' }: {
  label?: string
  title: string
  subtitle?: string
  h2Size?: 'lg' | 'md' | 'sm'
  align?: 'center' | 'left'
}) {
  return (
    <div className={cn('mb-16', align === 'center' && 'text-center')}>
      {label && (
        <p className="font-mono text-eyebrow text-carbon-400 mb-8">{label}</p>
      )}
      <h2 className={cn(h2SizeMap[h2Size], 'font-bold leading-tight mb-4 text-text-inverse')}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-body-lg leading-relaxed max-w-subtitle text-text-inverse/65',
          align === 'center' && 'mx-auto'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
```

**Eyebrow**: `font-mono text-eyebrow text-carbon-400 mb-8` — placed directly above H1 or H2. Do not add `uppercase` or `tracking-widest`.

Usage examples:
```tsx
<SectionHeader h2Size="lg" label="OVERVIEW" title="Modern Database Architecture" />
<SectionHeader label="BENEFITS" title="Advanced Features" subtitle="..." />
<SectionHeader h2Size="sm" label="USE CASES" title="Built for Real-Time Apps" />
```

---

## PingCAP Icons

```tsx
// components/ui/pingcap-icons.tsx
// 204 custom SVG icons extracted from PingCAP's iconfont (iconfont.woff).
// Factory pattern: makeIcon(path, displayName) → React.FC<IconProps>
// viewBox: 0 0 1024 1024, y-axis flipped via transform="translate(0,1024) scale(1,-1)"

import type { IconProps } from './pingcap-icons'
// Usage:
import { NewspaperIcon, BuildingsIcon, CloudTIcon } from './pingcap-icons'

<NewspaperIcon size={16} className="text-carbon-400" />
```

All nav dropdown icons must use `pingcap-icons`, not `lucide-react`. See Navbar section for the full mapping.

---

## Footer

```tsx
// components/ui/Footer.tsx
// 4-column nav grid + "Stay Connected" with newsletter + 7 social icons
// Social icons: exact SVG sprites from pingcap.com (viewBox 0 0 25 25, circular style)
// GitHub · Twitter · LinkedIn · Facebook · Slack · Discord · YouTube
// Social icon gap: gap-4 (16px)
```

All footer nav links use full `https://www.pingcap.com/...` domain. External links (ossinsight.io, docs.pingcap.com) keep their own domains.

---

## LanguageSwitcher

```tsx
// components/ui/LanguageSwitcher.tsx
// Dropdown: English (/) · 日本語 (https://pingcap.co.jp/)
// External links open in new tab via window.open()
```

---

## File Structure

```
components/
  ui/
    Navbar.tsx              # Nav bar with mega-menu dropdowns + mobile accordion
    Footer.tsx              # Footer nav grid + social icons + newsletter
    PrimaryButton.tsx       # "Red Flood" CTA button (supports href)
    SecondaryButton.tsx     # Text + arrow icon button
    GhostButton.tsx         # Transparent nav button (supports href)
    FeatureCard.tsx         # Icon + title + description card
    SectionHeader.tsx       # Eyebrow + H2 + subtitle
    NewsletterForm.tsx      # Email subscribe form
    LanguageSwitcher.tsx    # EN / JP language dropdown
    pingcap-icons.tsx       # 204 custom PingCAP SVG icons (iconfont)
  sections/
    HeroSection.tsx
    FeaturesGrid.tsx
    CtaSection.tsx
lib/utils.ts
```

Naming: components PascalCase · page/section files kebab-case · Props camelCase · boolean Props with `is/has` prefix.
