---
category: UI
---

## Component spec

```tsx
import { Badge } from '@/components/ui/badge'

// Outline (default) — category labels, eyebrow tags, filter chips
<Badge>Open Source</Badge>
<Badge variant="outline">Distributed SQL</Badge>

// Primary (red) — "New", "Hot", highlighted
<Badge variant="default">New</Badge>

// Secondary (carbon) — "Beta", "Preview", status
<Badge variant="secondary">Beta</Badge>
```

**Variants:** `default` (red) · `secondary` (carbon-800) · `outline` (border-carbon-700, default)

**Rules:** Always use `font-bold` (built in). Place alongside section titles or inside cards. Never use for navigation.

---
