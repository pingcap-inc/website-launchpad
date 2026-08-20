---
category: UI
---

## Component spec

White rectangle, on hover a red circle expands to flood the button; text transitions to white.

**Layer structure — must be strictly followed:**

```
button  →  relative + overflow-hidden
  span  →  absolute z-0   (Red Flood circle)
  span  →  relative z-10  (text)
  icon  →  relative z-10  (icon)
```

```tsx
// components/ui/PrimaryButton.tsx
export function PrimaryButton({
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
  const classes = cn(
    'group relative overflow-hidden',
    'rounded-none h-10 bg-bg-inverse px-4', // px-4 = 16px
    'inline-flex items-center gap-2',
    'border-none outline-none cursor-pointer whitespace-nowrap',
    className
  )
  // content: Red Flood circle + text span + ArrowUpRight icon
  // all three must have relative z-10 except the circle (absolute z-0)
}
```

| Property   | Value                                           |
| ---------- | ----------------------------------------------- |
| Height     | `h-10` (40px)                                   |
| Padding    | `px-4` (16px)                                   |
| Background | `bg-bg-inverse` (`#FFFFFF`)                     |
| Red Flood  | `w-[30%]` circle scales to `scale-[6]` on hover |
| Transition | `500ms ease-in-out`                             |

---
