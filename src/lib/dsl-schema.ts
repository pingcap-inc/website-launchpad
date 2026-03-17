// Page DSL — single source of truth for all AI-generated pages.
// AI generates this JSON; dsl-renderer.tsx renders it; dsl-to-tsx.ts publishes it.

export interface PageDSL {
  meta: PageMeta
  sections: SectionNode[]
}

export interface PageMeta {
  title: string // 50-60 chars, must include "TiDB"
  description: string // 120-160 chars
  canonical: string // /slug/  (leading and trailing slash)
  noindex?: boolean
}

export interface Cta {
  text: string
  href: string
}

export type IconName =
  // Core
  | 'Zap'
  | 'Shield'
  | 'Globe'
  | 'Database'
  | 'Server'
  | 'Cloud'
  | 'Lock'
  | 'Activity'
  | 'Layers'
  | 'Cpu'
  | 'Rocket'
  | 'BarChart'
  | 'CheckCircle'
  | 'Star'
  | 'ArrowRight'
  | 'GitBranch'
  | 'Package'
  | 'RefreshCw'
  | 'Gauge'
  | 'Code2'
  // AI / Dev
  | 'Brain'
  | 'Sparkles'
  | 'Bot'
  | 'MessageSquare'
  | 'Search'
  | 'Settings'
  | 'Wrench'
  | 'Terminal'
  | 'FileCode'
  | 'GitMerge'
  // Data / Analytics
  | 'LayoutGrid'
  | 'Table'
  | 'BarChart2'
  | 'LineChart'
  | 'PieChart'
  | 'TrendingUp'
  | 'Filter'
  | 'Clock'
  | 'Repeat'
  | 'Scale'
  // Business
  | 'DollarSign'
  | 'Users'
  | 'Building'
  | 'Briefcase'
  | 'Award'
  | 'Target'
  | 'Lightbulb'
  | 'Puzzle'
  | 'Network'

export type SectionNode =
  | HeroNode
  | StatsNode
  | FeatureGridNode
  | FeatureCardNode
  | FeatureTabsNode
  | LogoCloudNode
  | TestimonialsNode
  | FaqNode
  | CtaNode
  | FormNode

// ─── Hero ───────────────────────────────────────────────────────────────────

/** Used with layout="image-right" */
export interface HeroImage {
  src: string
  alt?: string
  width: number
  height: number
  /** Desktop alignment. Defaults to 'right'. */
  align?: 'right' | 'center'
}

/** Used with layout="centered" */
export interface HeroBackgroundImage {
  src: string
  alt?: string
  /** Tailwind opacity class, e.g. "opacity-30". Defaults to "opacity-40". */
  opacityClassName?: string
}

export interface HeroForm {
  formId: string // HubSpot form ID (required)
  portalId?: string // HubSpot portal ID — defaults to '4466002'
  region?: string // default 'na1'
}

export interface HeroNode {
  type: 'hero'
  layout?: 'split' | 'centered' | 'image-right'
  eyebrow?: string
  /**
   * Plain text OR an HTML string. When HTML tags are detected,
   * rendered via dangerouslySetInnerHTML (internal tool only).
   * Use gradient spans sparingly (1-2 words max), e.g.
   * <span class="text-gradient-violet">word</span>
   * <span class="text-gradient-blue">word</span>
   * <span class="text-gradient-teal">word</span>
   * <span class="text-gradient-red">word</span>
   * Add animate-glow-sweep to the class for an animated glow sweep effect, e.g.
   * <span class="text-gradient-violet animate-glow-sweep">word</span>
   */
  headline: string
  subheadline?: string
  primaryCta?: Cta
  secondaryCta?: Cta
  /** Image shown on the right side. Requires layout="image-right". */
  heroImage?: HeroImage
  /** Full-bleed background image. Requires layout="centered". */
  backgroundImage?: HeroBackgroundImage
  /** Embeds a HubSpot form in the hero right slot. Auto-sets layout="split". */
  heroForm?: HeroForm
}

// ─── Stats ──────────────────────────────────────────────────────────────────

export interface StatsNode {
  type: 'stats'
  title?: string
  subtitle?: string
  items: StatsItem[]
  columns?: 2 | 3 | 4
}

export interface StatsItem {
  /** Lucide icon name OR an image path string */
  icon?: IconName | string
  value: string
  label: string
  description?: string
}

// ─── Feature Grid ────────────────────────────────────────────────────────────

export interface FeatureGridNode {
  type: 'featureGrid'
  eyebrow?: string
  title: string
  subtitle?: string
  items: FeatureGridItem[]
  columns?: 2 | 3 | 4
}

export interface FeatureGridItem {
  /** Lucide icon name OR an image path string (e.g. "/images/..." or "https://...") */
  icon?: IconName | string
  title: string
  description: string
  cta?: Cta
}

// ─── Feature Card ────────────────────────────────────────────────────────────

export interface FeatureCardNode {
  type: 'featureCard'
  eyebrow?: string
  title: string
  subtitle?: string
  items: FeatureCardItem[]
  columns?: 2 | 3 | 4
}

export interface FeatureCardItem {
  /** Lucide icon name OR an image path string (e.g. "/images/..." or "https://...") */
  icon?: IconName | string
  title: string
  description: string
  href?: string
}

// ─── Feature Tabs ────────────────────────────────────────────────────────────

export interface FeatureTabsNode {
  type: 'featureTabs'
  eyebrow?: string
  title: string
  subtitle?: string
  tabs: FeatureTab[]
  autoSwitch?: boolean
  autoSwitchInterval?: number
}

export interface FeatureTab {
  id: string
  label: string
  description?: string
  bullets?: string[]
  primaryCta?: Cta
  image: {
    src: string
    alt: string
    width: number
    height: number
  }
}

// ─── Logo Cloud ──────────────────────────────────────────────────────────────

export interface LogoCloudNode {
  type: 'logoCloud'
  eyebrow?: string
  title?: string
  subtitle?: string
  logos: Logo[]
  variant?: 'default' | 'minimal'
  autoScroll?: boolean
}

export interface Logo {
  name: string
  src: string
  href?: string
  width?: number
  height?: number
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export interface TestimonialsNode {
  type: 'testimonials'
  eyebrow?: string
  title: string
  items: Testimonial[]
}

export interface Testimonial {
  quote: string
  author: string
  href?: string
  cta?: string
  logo?: {
    src: string
    alt: string
    size?: number
  }
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqNode {
  type: 'faq'
  title?: string
  items: FaqItem[]
}

export interface FaqItem {
  q: string
  a: string
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

export interface CtaNode {
  type: 'cta'
  title: string
  subtitle?: string
  background?: 'red' | 'violet' | 'blue' | 'teal'
  primaryCta: Cta
  secondaryCta?: Cta
}

// ─── HubSpot Form ────────────────────────────────────────────────────────────

export interface FormNode {
  type: 'form'
  title?: string
  subtitle?: string
  portalId: string // HubSpot portal ID — replace placeholder before publishing
  formId: string // HubSpot form ID — replace placeholder before publishing
  region?: string // default 'na1'
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const ALL_ICON_NAMES: IconName[] = [
  // Core
  'Zap',
  'Shield',
  'Globe',
  'Database',
  'Server',
  'Cloud',
  'Lock',
  'Activity',
  'Layers',
  'Cpu',
  'Rocket',
  'BarChart',
  'CheckCircle',
  'Star',
  'ArrowRight',
  'GitBranch',
  'Package',
  'RefreshCw',
  'Gauge',
  'Code2',
  // AI / Dev
  'Brain',
  'Sparkles',
  'Bot',
  'MessageSquare',
  'Search',
  'Settings',
  'Wrench',
  'Terminal',
  'FileCode',
  'GitMerge',
  // Data / Analytics
  'LayoutGrid',
  'Table',
  'BarChart2',
  'LineChart',
  'PieChart',
  'TrendingUp',
  'Filter',
  'Clock',
  'Repeat',
  'Scale',
  // Business
  'DollarSign',
  'Users',
  'Building',
  'Briefcase',
  'Award',
  'Target',
  'Lightbulb',
  'Puzzle',
  'Network',
]

const VALID_ICON_SET = new Set<string>(ALL_ICON_NAMES)

/** Sanitize an AI-generated icon name; falls back to 'Zap' if unknown. */
export function sanitizeIconName(name: string | undefined): IconName {
  if (name && VALID_ICON_SET.has(name)) return name as IconName
  return 'Zap'
}

/** Walk a parsed DSL and replace any invalid icon names with 'Zap'. */
export function sanitizeDSLIcons(dsl: PageDSL): void {
  for (const section of dsl.sections) {
    if ('items' in section && Array.isArray(section.items)) {
      for (const item of section.items as Array<{ icon?: string }>) {
        if ('icon' in item) item.icon = sanitizeIconName(item.icon)
      }
    }
  }
}

/** DSL schema as JSON string — injected into Qwen prompts so AI knows the exact format. */
export const DSL_SCHEMA_PROMPT = `
Generate a PageDSL JSON object with this exact structure:
{
  "meta": {
    "title": string,        // 50-60 chars, must include "TiDB"
    "description": string,  // 120-160 chars, full sentence
    "canonical": string     // e.g. "/tidb-cloud/"
  },
  "sections": [SectionNode, ...]  // 4-8 sections
}

Available section types (choose appropriate mix):
- { type: "hero", layout?: "split"|"centered"|"image-right", eyebrow?, headline, subheadline?, primaryCta?: {text,href}, secondaryCta?: {text,href}, heroImage?: {src,alt?,width,height,align?:"right"|"center"}, backgroundImage?: {src,alt?,opacityClassName?}, heroForm?: {formId, portalId?, region?} }
  DEFAULT layout is "image-right". Always include heroImage when using image-right layout; default image: { src: "/images/hero/r/Graphic-1-Dk.png", alt: "", width: 800, height: 500 }
  (heroImage: used when layout="image-right"; backgroundImage: used when layout="centered")
  (heroForm: embeds a HubSpot form in the hero right slot — auto-sets layout="split"; portalId defaults to "4466002"; use when page intent mentions a form/signup in the hero)
  (headline supports gradient spans; use sparingly on 1-2 words max:
    <span class="text-gradient-violet">word</span>
    <span class="text-gradient-blue">word</span>
    <span class="text-gradient-teal">word</span>
    <span class="text-gradient-red">word</span>
    Add animate-glow-sweep to the class for an animated glow sweep effect, e.g.
    <span class="text-gradient-violet animate-glow-sweep">word</span>
  )
- { type: "stats", title?, items: [{icon?, value, label, description?}], columns?: 2|3|4 }
- { type: "featureGrid", eyebrow?, title, subtitle?, items: [{icon?, title, description, cta?: {text, href}}], columns?: 2|3|4 }
- { type: "featureCard", eyebrow?, title, subtitle?, items: [{icon?, title, description, href?}], columns?: 2|3|4 }
- { type: "faq", title?, items: [{q, a}] }
- { type: "cta", title, subtitle?, background?: "red"|"violet"|"blue"|"teal", primaryCta: {text,href}, secondaryCta?: {text,href} }
- { type: "testimonials", title, items: [{quote, author, href?, cta?}] }
- { type: "logoCloud", title?, logos: [{name, src, href?}], variant?: "default"|"minimal" }
- { type: "form", title?, subtitle?, portalId: "YOUR_PORTAL_ID", formId: "YOUR_FORM_ID", region?: "na1" }

Icon names (use for icon fields): ${ALL_ICON_NAMES.join(', ')}
CTA hrefs: use real PingCAP URLs or "/tidbcloud/trial/" for signup CTAs.
Always start with a "hero" section and end with a "cta" section.
Return ONLY the JSON object, no markdown, no code blocks.
`.trim()
