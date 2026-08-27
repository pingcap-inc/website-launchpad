---
category: Sections
---

## Component spec

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

## Section usage

File: `src/components/sections/LogoCloudSection.tsx`

Props:

| Prop                    | Type                     | Notes                                                 |
| ----------------------- | ------------------------ | ----------------------------------------------------- |
| `eyebrow`               | `string`                 | Optional eyebrow.                                     |
| `title`                 | `string`                 | Optional title.                                       |
| `subtitle`              | `string`                 | Optional subtitle.                                    |
| `logos`                 | `LogoCloudItem[]`        | Logo items.                                           |
| `variant`               | `'default' \| 'minimal'` | Image size/opacity style.                             |
| `align`                 | `'center' \| 'left'`     | Header + content alignment.                           |
| `autoScroll`            | `boolean`                | Default `true`. Only scrolls when `logos.length > 4`. |
| `scrollSpeedSeconds`    | `number`                 | Default `28`.                                         |
| `scrollContentMaxWidth` | `number`                 | Optional max width for the scroll container (px).     |
| `className`             | `string`                 | Root class.                                           |

Logo item:

| Field    | Type       | Notes                  |
| -------- | ---------- | ---------------------- |
| `name`   | `string`   | Used for alt and keys. |
| `image`  | `ImageRef` | Required.              |
| `href`   | `string`   | Optional link.         |
| `width`  | `number`   | Optional image width.  |
| `height` | `number`   | Optional image height. |
