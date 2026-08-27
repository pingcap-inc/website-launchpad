---
category: Sections
---

## Component spec

Auto-rotating testimonial carousel with pause-on-hover. `'use client'`.

```tsx
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'

interface TestimonialsSectionProps {
  eyebrow?: string // default "Testimonials"
  title: string
  testimonials: Array<{
    quote: string
    author: string
    href?: string
    cta?: string // link text (requires href)
    logo?: { src: string; alt: string; size?: number }
  }>
  className?: string
}
```

**Behavior:** Cycles every 4s with 700ms slide transition. Respects `prefers-reduced-motion`. Height is computed from the tallest card to avoid layout shift.

---

## Section usage

File: `src/components/sections/TestimonialsSection.tsx` (client component)

Props:

| Prop           | Type                | Notes             |
| -------------- | ------------------- | ----------------- |
| `eyebrow`      | `string`            | Optional eyebrow. |
| `title`        | `string`            | Required.         |
| `testimonials` | `TestimonialCard[]` | Card list.        |
| `className`    | `string`            | Root class.       |

Testimonial item:

| Field    | Type                               | Notes                |
| -------- | ---------------------------------- | -------------------- |
| `quote`  | `string`                           | Required.            |
| `author` | `string`                           | Required.            |
| `href`   | `string`                           | Optional link.       |
| `cta`    | `string`                           | Optional CTA label.  |
| `logo`   | `{ image: ImageRef; alt?; size? }` | Optional logo badge. |
