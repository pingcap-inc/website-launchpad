---
category: Sections
---

## Component spec

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

## Section usage

File: `src/components/sections/StatsSection.tsx` (client component)

Props:

| Prop        | Type          | Notes                      |
| ----------- | ------------- | -------------------------- |
| `eyebrow`   | `string`      | Optional eyebrow.          |
| `title`     | `string`      | Optional title.            |
| `subtitle`  | `string`      | Optional subtitle.         |
| `stats`     | `StatItem[]`  | Stat cards.                |
| `columns`   | `2 \| 3 \| 4` | Grid columns. Default `3`. |
| `className` | `string`      | Root class.                |

Stat item:

| Field         | Type        | Notes                 |
| ------------- | ----------- | --------------------- |
| `icon`        | `ReactNode` | Optional icon.        |
| `value`       | `string`    | CountUp value.        |
| `label`       | `string`    | Required label.       |
| `description` | `string`    | Optional description. |
