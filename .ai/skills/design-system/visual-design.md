# Visual Design Guide

> **When to read:** Required when generating any page. Specifies mandatory icons, illustrations, background rhythm, animations, and interaction patterns.

---

## A — Mandatory Visual Requirements

Every page MUST meet all of the following. These are not optional.

| Element                    | Requirement                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `FeatureCard`              | MUST include `icon={<LucideIcon strokeWidth={1.5} />}` — never omit the icon prop     |
| `ColorCard`                | MUST include `icon` (Lucide ReactNode) OR `image` prop                                |
| `HeroSection` split layout | MUST include `rightSlot` or `heroImage` — never leave the right column empty          |
| Section backgrounds        | Page MUST use ≥2 distinct backgrounds — never all `bg-bg-primary`                     |
| Stat/metric sections       | If page has ≥3 quantitative metrics, MUST use `<CountUp>` for scroll-triggered reveal |
| Tabs                       | If used, MUST include `autoSwitch={true} autoSwitchInterval={6000}`                   |
| Clickable cards            | Any card with `href` or `onClick` MUST have hover float transition                    |

---

## B — Lucide Icon Selection Guide

Always use `lucide-react`. Set `strokeWidth={1.5}` on all icons. Never use header-icons in page content.

```
# Data & Infrastructure
Database                → database storage SQL persistence
Server                  → server hosting infrastructure backend
Cloud                   → cloud hosting deployment SaaS
CloudCog                → cloud configuration hybrid multi-cloud
Cpu                     → compute performance processing hardware
Network                 → networking distributed systems microservices
Layers                  → architecture stack layers HTAP
Layers3                 → multi-layer mixed workloads HTAP

# AI & Analytics
Bot                     → AI automation machine learning agent
Sparkles                → AI generative features intelligence
BarChart2               → analytics metrics dashboards reporting
LineChart               → trend analytics time-series monitoring
Activity                → real-time activity telemetry live data
TrendingUp              → growth performance improvement

# Developer Experience
Code2                   → code development programming SDK
Terminal                → CLI developer tools command line
FileCode2               → code files source configuration
GitBranch               → version control branching CI/CD
Github                  → open source community contributions

# Security & Reliability
Shield                  → security protection data safety
ShieldCheck             → compliance certifications verified security
Lock                    → access control permissions encryption
Award                   → SLA reliability certifications excellence
Star                    → quality rating best-in-class
BadgeCheck              → verified compliance certified

# Performance
Zap                     → speed performance fast low-latency
Rocket                  → launch scale growth fast start
RefreshCw               → high availability auto-healing recovery
HeartPulse              → health monitoring uptime SLA
Timer                   → real-time low-latency fast response
Clock                   → scheduling time-based operations

# Integration & Migration
ArrowRightLeft          → migration bidirectional sync integration
Plug                    → connectors plugins integrations
GitMerge                → merge consolidation integration CDC
Shuffle                 → multi-cloud hybrid routing flexibility

# Business & Cost
DollarSign              → cost savings pricing economics
CreditCard              → billing pay-as-you-go pricing
Wallet                  → cost optimization budget management
TrendingDown            → cost reduction efficiency

# Users & Scale
Users                   → team multi-tenant community users
Globe                   → global multi-region worldwide
Globe2                  → international distributed geo regions
SplitSquareHorizontal   → horizontal scaling sharding partitioning

# Content & Learning
FileText                → documentation guides reports
BookOpen                → learning tutorials education
GraduationCap           → certification courses learning paths
FlaskConical            → testing experimentation labs
```

### Usage inside components

```tsx
// FeatureCard / ColorCard — fill the container (w-12 h-12 wrapper)
import { Database } from 'lucide-react'
icon={<Database className="w-full h-full" strokeWidth={1.5} />}

// Standalone inline icon
import { Zap } from 'lucide-react'
<Zap className="w-5 h-5 text-brand-red-primary" strokeWidth={1.5} />
```

---

## C — Section Background Rhythm

Alternate backgrounds to create visual depth. Never repeat the same background 3+ sections in a row.

### Recommended sequence

```
1. Hero          → bg-bg-primary (pure black — always)
2. Features 1    → bg-bg-primary
3. Features 2    → bg-gradient-dark-bottom   (#000 → #06111A)
4. Tabs / Split  → bg-bg-primary
5. ColorCard row → bg-gradient-dark-top      (#06111A → #000)
6. Stats         → bg-brand-{color}-bg       (brand dark for visual break)
7. CTA           → CtaSection background="red|violet|blue|teal"
```

### When to use brand-colored sections

- Use `bg-brand-violet-bg` for AI / ML feature highlights
- Use `bg-brand-blue-bg` for cloud / infrastructure sections
- Use `bg-brand-teal-bg` for data platform / success stories
- Use `bg-brand-red-bg` sparingly — reserve for CTA only

### CTA section color mapping

| Page focus                    | CtaSection background |
| ----------------------------- | --------------------- |
| General / get started         | `red`                 |
| AI features                   | `violet`              |
| Cloud-native / infrastructure | `blue`                |
| Data platform / analytics     | `teal`                |

---

## D — Animation & Interaction Requirements

### Hover states (REQUIRED on all interactive cards)

```tsx
// Float up — any card with href or onClick
className = 'hover:-translate-y-2 transition-transform duration-200 ease-in-out cursor-pointer'

// Color fade — links, icon buttons, nav items
className = 'transition-colors duration-150 ease-in-out'

// Combined float + shadow (FeatureCard without href uses shadow instead of translate)
className = 'hover:shadow-card transition-shadow duration-200 ease-in-out'
```

### Scroll-triggered animations

```tsx
// CountUp — scroll-triggered number reveal (built-in behavior, no extra config)
import { CountUp } from '@/components'

// Usage in a stats row
;<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
  <div className="text-center">
    <CountUp value="99.99%" className="text-h2-sm font-bold text-text-inverse" />
    <p className="text-body-sm text-carbon-400 mt-2">Availability SLA</p>
  </div>
  <div className="text-center">
    <CountUp value="1M+ TPS" className="text-h2-sm font-bold text-text-inverse" />
    <p className="text-body-sm text-carbon-400 mt-2">Peak throughput</p>
  </div>
</div>
```

### Auto-switching Tabs (REQUIRED when Tabs component is used)

```tsx
<Tabs
  tabs={tabsData}
  autoSwitch={true}
  autoSwitchInterval={6000}
  defaultActiveTab={tabsData[0].id}
/>
```

### Timing standards

| Animation type   | Duration            | Easing        |
| ---------------- | ------------------- | ------------- |
| Card hover float | `duration-200`      | `ease-in-out` |
| Color transition | `duration-150`      | `ease-in-out` |
| Icon rotation    | `duration-300`      | `ease-in-out` |
| Tab progress bar | `duration-[6000ms]` | `linear`      |

All transitions MUST use `ease-in-out`. Never use `ease-in` or `ease-out` alone.

---

## E — Hero Illustration Guide

### Split layout (`layout="split"` — default)

The right column (`rightSlot`) MUST contain a visual. Priority order:

1. **Product screenshot / diagram** — if the user provides an image asset, use it
2. **Inline SVG illustration** — isometric cube with diagonal grid (code template below)
3. **Seeded hero image** — omit `rightSlot` entirely; HeroSection auto-seeds from `/public/images/hero/r/Graphic-{N}-Dk.png`

Always use `-Dk` (dark) variants. Never use `-Lt` variants on this dark-background site.

```tsx
// Inline SVG hero illustration — wireframe cube with diagonal grid background
function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[480px] mx-auto"
    >
      <defs>
        <pattern
          id="hero-diag"
          x="0"
          y="0"
          width="56"
          height="56"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45 240 200)"
        >
          <line
            x1="0"
            y1="0"
            x2="56"
            y2="0"
            stroke="white"
            strokeWidth="0.4"
            strokeOpacity="0.12"
            strokeDasharray="2 10"
          />
        </pattern>
      </defs>
      {/* Background grid */}
      <rect width="480" height="400" fill="url(#hero-diag)" />
      {/* Outer wireframe cube */}
      <g stroke="white" strokeOpacity="0.1" strokeWidth="0.6" fill="none">
        <polygon points="240,22 442,138 240,254 38,138" />
        <line x1="240" y1="22" x2="240" y2="254" />
        <line x1="442" y1="138" x2="38" y2="138" />
      </g>
      {/* Mid wireframe cube */}
      <g stroke="white" strokeOpacity="0.22" strokeWidth="0.6" fill="none">
        <polygon points="240,64 376,138 240,212 104,138" />
        <line x1="240" y1="64" x2="240" y2="212" />
      </g>
      {/* Inner wireframe */}
      <g stroke="white" strokeOpacity="0.35" strokeWidth="0.8" fill="none">
        <polygon points="240,98 340,152 240,206 140,152" />
      </g>
      {/* Solid accent cube — top face (brand red light) */}
      <polygon points="240,78 336,130 240,182 144,130" fill="#F35048" />
      {/* Left face (brand red primary) */}
      <polygon points="144,130 240,182 240,286 144,234" fill="#DC150B" />
      {/* Right face (brand red dark) */}
      <polygon points="336,130 240,182 240,286 336,234" fill="#87120C" />
    </svg>
  )
}

// Use as rightSlot
;<HeroSection headline="..." rightSlot={<HeroIllustration />} />
```

### Centered layout (`layout="centered"`)

Omit `backgroundImage` — HeroSection auto-seeds from `/public/images/hero/c/`. No eyebrow by default for centered layout.

---

## F — Badge Usage (shadcn Badge component)

Use `<Badge>` for feature labels, category chips, status indicators, and "New" / "Beta" tags.

```tsx
import { Badge } from '@/components/ui/badge'

// Feature label in a card
<Badge variant="outline">New</Badge>
<Badge variant="secondary">Beta</Badge>

// Category chip in a hero or section header
<Badge variant="default">TiDB Cloud</Badge>
```

Badge variants and brand mapping:
| Variant | Use case | Tailwind classes applied |
|---------|----------|--------------------------|
| `default` | Primary feature tag | `bg-brand-red-primary text-white` |
| `secondary` | Secondary tag / beta | `bg-carbon-800 text-carbon-100` |
| `outline` | Subtle label | `border-carbon-700 text-carbon-300` |

---

## G — Accordion Usage (shadcn Accordion component)

Use for FAQ sections. Always place near the end of the page before the CtaSection.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

// Wrap in a section with SectionHeader
;<section className="py-section-sm lg:py-section bg-bg-primary">
  <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
    <SectionHeader label="FAQ" title="Frequently Asked Questions" className="mb-12" />
    <div className="max-w-3xl mx-auto">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="q1">
          <AccordionTrigger>Question text here?</AccordionTrigger>
          <AccordionContent>Answer text here.</AccordionContent>
        </AccordionItem>
        {/* repeat */}
      </Accordion>
    </div>
  </div>
</section>
```

When to add FAQ:

- Landing pages: add if material contains 3+ questions / objections
- Product pages: add if material mentions common misconceptions or comparisons
- Glossary pages: skip (the page IS the answer)
