---
category: Sections
---

## Component spec

Call-to-action banner. Always the last section before `<Footer>`.

```tsx
import { CtaSection } from '@/components/sections/CtaSection'

interface CtaSectionProps {
  label?: string
  title: string
  subtitle?: string
  primaryCta: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  background?: 'red' | 'violet' | 'blue' | 'teal' // default 'red'
  className?: string
}
```

**Background color guidance** (from `visual-design.md`):

- Product/technical pages → `red` or `violet`
- Cloud/infrastructure pages → `blue`
- Data/analytics pages → `teal`

## Section usage

File: `src/components/sections/CtaSection.tsx`

Props:

| Prop           | Type                                         | Notes              |
| -------------- | -------------------------------------------- | ------------------ |
| `title`        | `string`                                     | Required.          |
| `subtitle`     | `string`                                     | Optional subtitle. |
| `image`        | `{ image: ImageRef; alt?; width?; height? }` | Optional image.    |
| `primaryCta`   | `{ text: string; href: string }`             | Required.          |
| `secondaryCta` | `{ text: string; href: string }`             | Optional.          |
| `className`    | `string`                                     | Root class.        |
