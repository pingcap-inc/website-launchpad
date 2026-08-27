---
category: Sections
---

## Component spec

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

## Section usage

File: `src/components/sections/FeatureCardSection.tsx`

Props:

| Prop          | Type                | Notes                      |
| ------------- | ------------------- | -------------------------- |
| `eyebrow`     | `string`            | Optional eyebrow.          |
| `title`       | `string`            | Required.                  |
| `subtitle`    | `string`            | Optional subtitle.         |
| `items`       | `FeatureCardItem[]` | Card items.                |
| `columns`     | `2 \| 3 \| 4`       | Grid columns. Default `2`. |
| `borderStyle` | `'gray' \| 'color'` | Default `gray`.            |
| `className`   | `string`            | Root class.                |

Card item:

| Field         | Type        | Notes                                    |
| ------------- | ----------- | ---------------------------------------- |
| `icon`        | `ReactNode` | Optional icon.                           |
| `title`       | `string`    | Required.                                |
| `description` | `string`    | Required.                                |
| `borderColor` | `string`    | Optional tailwind border class override. |
| `href`        | `string`    | Optional link.                           |
| `className`   | `string`    | Optional per-card class.                 |
