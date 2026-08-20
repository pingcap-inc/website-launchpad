---
category: UI
---

## Component spec

Animated number counter. Triggers once when element scrolls into view. `'use client'` component.

```tsx
// components/ui/CountUp.tsx — 'use client'
export function CountUp({ value, className }: { value: string; className?: string })
```

**Value parsing** — `"$2,000+"` → `{ prefix: "$", target: 2000, suffix: "+", hasComma: true }`

| Input       | Parsed                                  |
| ----------- | --------------------------------------- |
| `"$2,000+"` | prefix `$`, number `2000`, suffix `+`   |
| `"99.99%"`  | prefix `""`, number `99`, suffix `.99%` |
| `"10M+"`    | prefix `""`, number `10`, suffix `M+`   |

Animation: 1400ms cubic ease-out (`1 - (1-t)^3`). Fires once at 40% viewport visibility. Comma formatting via `toLocaleString('en-US')` when source includes comma.

```tsx
// Stats row
<div className="grid grid-cols-3 gap-8 text-center">
  <div>
    <CountUp value="$2,000+" className="text-h2-mb md:text-h2-lg font-bold text-text-inverse" />
    <p className="text-body-sm text-text-secondary mt-2">in cloud credits</p>
  </div>
</div>
```

---
