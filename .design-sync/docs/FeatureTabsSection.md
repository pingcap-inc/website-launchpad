---
category: Sections
---

## Component spec

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

## Section usage

File: `src/components/sections/FeatureTabsSection.tsx` (client component)

Props:

| Prop                 | Type               | Notes              |
| -------------------- | ------------------ | ------------------ |
| `eyebrow`            | `string`           | Optional eyebrow.  |
| `title`              | `string`           | Required.          |
| `subtitle`           | `string`           | Optional subtitle. |
| `tabs`               | `FeatureTabItem[]` | Tab list.          |
| `autoSwitch`         | `boolean`          | Default `true`.    |
| `autoSwitchInterval` | `number`           | Default `6000` ms. |
| `className`          | `string`           | Root class.        |

Tab item:

| Field          | Type                                         | Notes                                                             |
| -------------- | -------------------------------------------- | ----------------------------------------------------------------- |
| `id`           | `string`                                     | Unique id.                                                        |
| `label`        | `string`                                     | Tab label.                                                        |
| `description`  | `string`                                     | Optional description.                                             |
| `bullets`      | `string[]`                                   | Optional bullet list.                                             |
| `primaryCta`   | `{ text: string; href: string }`             | Optional primary CTA.                                             |
| `secondaryCta` | `{ text: string; href: string }`             | Optional secondary CTA.                                           |
| `content`      | `ReactNode`                                  | Optional custom left content. Overrides description/bullets/ctas. |
| `image`        | `{ image: ImageRef; alt?; width?; height? }` | Required image.                                                   |
