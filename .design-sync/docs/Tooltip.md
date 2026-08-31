---
category: UI
---

## Component spec

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Wrap page or section in TooltipProvider (once per subtree)
;<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="underline decoration-dotted cursor-help">HTAP</span>
    </TooltipTrigger>
    <TooltipContent>
      <p>Hybrid Transactional and Analytical Processing</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

**When to use:** Technical terms on hover, icon button labels, truncated text explanations. Don't use for important information that must always be visible.

---
