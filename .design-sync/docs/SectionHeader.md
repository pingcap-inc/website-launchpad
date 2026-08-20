---
category: UI
---

## Component spec

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
