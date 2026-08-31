---
category: UI
---

## Component spec

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// CTA modal pattern
;<Dialog>
  <DialogTrigger asChild>
    <PrimaryButton>Start for Free</PrimaryButton>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Get Started with TiDB Cloud</DialogTitle>
      <DialogDescription>
        Create your free cluster in under 5 minutes. No credit card required.
      </DialogDescription>
    </DialogHeader>
    {/* form or HubSpot embed */}
  </DialogContent>
</Dialog>
```

**Styling:** Dark surface (`bg-bg-surface` #06111A) with `border-carbon-800`. Overlay: `bg-black/80`. Inherits Moderat font from site globals.

---
