---
category: UI
---

## Component spec

Tab switcher with animated underline. `'use client'` component.

```tsx
// components/ui/Tabs.tsx — 'use client'
interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultActiveTab?: string // defaults to tabs[0].id
  className?: string
  autoSwitch?: boolean // default false
  autoSwitchInterval?: number // ms, default 6000
  onTabChange?: (tabId: string) => void
}
```

**Behavior:**

| Mode               | Interaction                   | Underline                                                 |
| ------------------ | ----------------------------- | --------------------------------------------------------- |
| `autoSwitch=false` | click-only                    | Full-width static (`w-full`)                              |
| `autoSwitch=true`  | hover switches + auto-rotates | Left-to-right progress animation (`animate-tab-progress`) |

- Tab label: active → `text-white`; inactive → `text-carbon-900 hover:text-white`
- 2-layer underline: base `bg-carbon-900 h-[2px]` (always) + active `bg-white h-[2px]`
- `autoSwitch=true`: `animationDuration = autoSwitchInterval`ms; hover pauses auto-rotation
- Content: `opacity-100 block` ↔ `opacity-0 hidden` with `transition-opacity duration-300`
- Requires `animate-tab-progress` keyframe in `tailwind.config.ts`

```tsx
// Auto-switch with 5s interval
<Tabs
  tabs={[
    { id: 'oltp', label: 'OLTP', content: <OltpContent /> },
    { id: 'analytics', label: 'Analytics', content: <AnalyticsContent /> },
  ]}
  autoSwitch
  autoSwitchInterval={5000}
/>

// Static click-only tabs
<Tabs tabs={tabs} />
```

---
