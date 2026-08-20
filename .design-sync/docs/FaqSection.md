---
category: Sections
---

## Component spec

FAQ accordion. Always place immediately before `<CtaSection>`.

```tsx
import { FaqSection } from '@/components/sections/FaqSection'

interface FaqSectionProps {
  title?: string // default "FAQ"
  items: Array<{ q: string; a: string }>
  className?: string
}
```

**Background:** `bg-gradient-dark-bottom` (built in).
**Rule:** First item opens by default. Use `<FaqSection>` instead of raw `<Accordion>` for FAQ blocks.

---

## Section usage

File: `src/components/sections/FaqSection.tsx`

Props:

| Prop        | Type        | Notes           |
| ----------- | ----------- | --------------- |
| `title`     | `string`    | Optional title. |
| `items`     | `FaqItem[]` | Q&A list.       |
| `className` | `string`    | Root class.     |

Faq item:

| Field | Type     | Notes     |
| ----- | -------- | --------- |
| `q`   | `string` | Question. |
| `a`   | `string` | Answer.   |
