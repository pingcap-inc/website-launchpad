---
category: UI
---

## Component spec

No background, no border. `dark` prop controls color scheme (default `true` for dark backgrounds).

```tsx
// components/ui/SecondaryButton.tsx
interface SecondaryButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string // renders as <a> when provided
  dark?: boolean // default true — use false on light/white backgrounds
}

export function SecondaryButton({
  children,
  className,
  onClick,
  href,
  dark = true,
}: SecondaryButtonProps) {
  const classes = cn(
    'group inline-flex items-center gap-2 text-base font-medium',
    dark ? 'text-text-inverse' : 'text-text-primary',
    'bg-transparent border-none outline-none cursor-pointer whitespace-nowrap',
    className
  )
  // circle: dark=true → group-hover:bg-text-inverse; dark=false → group-hover:bg-text-primary
  // arrow: dark=true → text-text-inverse, hover: text-text-primary
  //        dark=false → text-text-primary, hover: text-text-inverse
  // Both rotate 45° on hover
}
```

| State        | `dark=true` (dark bg)       | `dark=false` (light bg)     |
| ------------ | --------------------------- | --------------------------- |
| Text         | `text-text-inverse` (white) | `text-text-primary` (black) |
| Circle hover | `bg-text-inverse`           | `bg-text-primary`           |
| Arrow idle   | white                       | black                       |
| Arrow hover  | black + `rotate-45`         | white + `rotate-45`         |

```tsx
// Dark background (default)
<SecondaryButton href="/docs/">Read the Docs</SecondaryButton>

// Light background
<SecondaryButton href="/docs/" dark={false}>Read the Docs</SecondaryButton>
```

---
