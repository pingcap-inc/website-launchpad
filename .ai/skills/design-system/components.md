# Component Specifications

> All components use `cn()` for className merging, imported from `@/lib/utils`. Icons use `lucide-react`.

---

## Navbar

```tsx
// components/ui/Navbar.tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-bg-inverse h-20 px-12 flex items-center justify-between">

  {/* Logo: fixed 120×50px, do not replace */}
  <a href="/tidb/" className="shrink-0">
    <img src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
         alt="TiDB" width={120} height={50} className="block" />
  </a>

  {/* Menu: 16px font-sans */}
  <ul className="flex items-center gap-8 text-base font-normal text-text-inverse/80">
    <li className="hover:text-carbon-400 cursor-pointer transition-colors duration-200">Product</li>
    <li className="hover:text-carbon-400 cursor-pointer transition-colors duration-200">Solutions</li>
    <li className="hover:text-carbon-400 cursor-pointer transition-colors duration-200">Resources</li>
    <li className="hover:text-carbon-400 cursor-pointer transition-colors duration-200">Company</li>
  </ul>

  <div className="flex items-center gap-4 shrink-0">
    <GhostButton>Sign In</GhostButton>
    <PrimaryButton>Start for Free</PrimaryButton>
  </div>

</nav>
```

Rules: `h-20` (80px) · `px-12` (0 48px) · pure black background · no transparency / gradient / blur · add `pt-20` to page content to avoid being covered.

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

export function PrimaryButton({ children, className, onClick }: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden',
        'rounded-none h-10 bg-white px-[14px]',
        'inline-flex items-center gap-2',
        'border-none outline-none cursor-pointer whitespace-nowrap',
        className
      )}
    >
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
    </button>
  )
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
export function GhostButton({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 font-medium rounded-pill',
        'bg-transparent text-text-inverse hover:text-carbon-400',
        'border-0 cursor-pointer px-4 py-3 text-base',
        'transition-colors duration-200 whitespace-nowrap',
        className
      )}
    >
      {children}
    </button>
  )
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

## File Structure

```
components/
  ui/
    Navbar.tsx
    PrimaryButton.tsx
    SecondaryButton.tsx
    GhostButton.tsx
    FeatureCard.tsx
    SectionHeader.tsx
  sections/
    HeroSection.tsx
    FeaturesGrid.tsx
    CtaSection.tsx
lib/utils.ts
```

Naming: components PascalCase · page/section files kebab-case · Props camelCase · boolean Props with `is/has` prefix.
