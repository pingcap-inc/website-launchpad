---
category: UI
---

## Component spec

```tsx
// components/ui/GhostButton.tsx
export function GhostButton({
  children,
  className,
  onClick,
  href,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
}) {
  // rounded-pill · bg-transparent · text-text-inverse hover:text-carbon-400
  // px-4 py-3 · transition-colors 200ms
}
```

---
