---
category: Sections
---

## Component spec

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

## Section usage

File: `src/components/sections/FeatureHighlightsSection.tsx`

Props:

| Prop        | Type                             | Notes                      |
| ----------- | -------------------------------- | -------------------------- |
| `eyebrow`   | `string`                         | Optional eyebrow.          |
| `title`     | `string`                         | Required.                  |
| `subtitle`  | `string`                         | Optional subtitle.         |
| `items`     | `ColorCardItem[]`                | Color cards.               |
| `columns`   | `2 \| 3 \| 4`                    | Grid columns. Default `3`. |
| `viewMore`  | `{ text: string; href: string }` | Optional CTA below grid.   |
| `className` | `string`                         | Root class.                |

Color card item:

| Field         | Type                                    | Notes                    |
| ------------- | --------------------------------------- | ------------------------ |
| `variant`     | `'red' \| 'violet' \| 'blue' \| 'teal'` | Card background variant. |
| `title`       | `string`                                | Required.                |
| `description` | `string`                                | Required.                |
| `cta`         | `{ text: string; href: string }`        | Required CTA.            |
| `icon`        | `ReactNode`                             | Optional icon.           |
