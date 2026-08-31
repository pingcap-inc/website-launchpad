---
category: Sections
---

## Component spec

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

## Section usage

File: `src/components/sections/FeatureGridSection.tsx`

Props:

| Prop         | Type                             | Notes                      |
| ------------ | -------------------------------- | -------------------------- |
| `eyebrow`    | `string`                         | Optional eyebrow.          |
| `title`      | `string`                         | Required.                  |
| `subtitle`   | `string`                         | Optional subtitle.         |
| `features`   | `Feature[]`                      | Feature items list.        |
| `columns`    | `2 \| 3 \| 4`                    | Grid columns. Default `3`. |
| `viewMore`   | `{ text: string; href: string }` | Optional CTA below grid.   |
| `itemLayout` | `'horizontal' \| 'vertical'`     | Default layout for items.  |
| `className`  | `string`                         | Root class.                |

Feature item:

| Field         | Type                             | Notes                              |
| ------------- | -------------------------------- | ---------------------------------- |
| `icon`        | `ReactNode`                      | Optional icon.                     |
| `title`       | `string`                         | Required.                          |
| `description` | `string`                         | Required.                          |
| `cta`         | `{ text: string; href: string }` | Optional per-item CTA.             |
| `layout`      | `'horizontal' \| 'vertical'`     | Optional per-item layout override. |
