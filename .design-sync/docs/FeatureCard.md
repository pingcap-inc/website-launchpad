---
category: UI
---

## Component spec

Bordered card. Optional icon (ReactNode or image path). Optional link → `<a>` with hover float; no link → `<div>` with hover shadow.

```tsx
// components/ui/FeatureCard.tsx
interface FeatureCardProps {
  icon?: React.ReactNode | string // string path → next/image fill in relative container
  title: string
  description: string
  borderColor?: string // Tailwind border class. Default: 'border-carbon-800'
  href?: string // When set: renders <a> with hover -translate-y-2
  className?: string
}
```

| Prop          | Default               | Notes                                                                               |
| ------------- | --------------------- | ----------------------------------------------------------------------------------- |
| `icon`        | —                     | Optional. String → `<Image fill>` in relative wrapper. ReactNode rendered directly. |
| `borderColor` | `'border-carbon-800'` | Any Tailwind `border-*` class                                                       |
| `href`        | —                     | With href: float `-translate-y-2`; without: `hover:shadow-card`                     |
| `className`   | —                     | Add `h-full` when used in a grid for equal heights                                  |

Typography in current implementation:

- title: `text-h3-lg` (24px, bold)
- description: `text-body-md` (16px, light)

```tsx
// Usage examples
<FeatureCard title="High Availability" description="99.99% uptime SLA." />
<FeatureCard icon="/images/icon.svg" title="..." description="..." borderColor="border-brand-red-primary" />
<FeatureCard icon={<DatabaseIcon />} title="..." description="..." href="/product/" />
```

---
