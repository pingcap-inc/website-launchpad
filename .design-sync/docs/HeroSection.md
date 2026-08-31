---
category: Sections
---

## Component spec

Full-width hero. Supports `image-right` (default), `centered`, and `split` layouts.

```tsx
import { HeroSection } from '@/components/sections/HeroSection'

interface HeroSectionProps {
  layout?: 'image-right' | 'centered' | 'split' // default 'image-right'
  eyebrow?: string
  headline: string // supports \n for line breaks
  subheadline?: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  rightSlot?: React.ReactNode // split layout: right column (form, image, SVG)
  heroImage?: {
    // image-right layout — defaults to Graphic-1-Dk.png (800×500) if omitted
    src: string
    alt?: string
    width: number
    height: number
    align?: 'right' | 'center'
    priority?: boolean
  }
  backgroundImage?: {
    src?: string
    alt?: string
    priority?: boolean
    opacityClassName?: string // default 'opacity-40'
    overlayClassName?: string
    positionClassName?: string // default 'object-center'
  }
  className?: string
}
```

**Rules:**

- `image-right` is the default layout; `heroImage` is optional (falls back to `Graphic-1-Dk.png`).
- `split` layout right column is empty when `rightSlot` is omitted — provide a visual.
- Centered layout defaults to no eyebrow.

---

## Section usage

File: `src/components/sections/HeroSection.tsx`

Layouts: `centered`, `split`, `image-right` (default).

Props:

| Prop              | Type                                                                                  | Notes                                                                        |
| ----------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `layout`          | `'centered' \| 'split' \| 'image-right'`                                              | Layout variant.                                                              |
| `eyebrow`         | `string`                                                                              | Optional eyebrow.                                                            |
| `headline`        | `string \| ReactNode`                                                                 | HTML strings are rendered via `dangerouslySetInnerHTML` and must be trusted. |
| `subheadline`     | `string`                                                                              | Optional subheadline.                                                        |
| `primaryCta`      | `{ text: string; href: string }`                                                      | Optional primary CTA.                                                        |
| `secondaryCta`    | `{ text: string; href: string }`                                                      | Optional secondary CTA.                                                      |
| `rightSlot`       | `ReactNode`                                                                           | Used only in `split` layout.                                                 |
| `heroImage`       | `{ image: ImageRef; alt?; width?; height?; align?; priority? }`                       | Used only in `image-right` layout.                                           |
| `backgroundImage` | `{ image: ImageRef; alt?; opacityClassName?; overlayClassName?; positionClassName? }` | Used only in `centered` layout.                                              |
| `className`       | `string`                                                                              | Root class.                                                                  |
