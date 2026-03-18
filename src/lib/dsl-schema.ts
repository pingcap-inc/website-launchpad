// Page DSL — single source of truth for all AI-generated pages.
// AI generates this JSON; dsl-renderer.tsx renders it; dsl-to-tsx.ts publishes it.

export interface PageDSL {
  meta: PageMeta
  sections: SectionDefinition[]
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

export interface ImageRef {
  assetId?: string
  url: string
  alt?: string
  width?: number
  height?: number
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

export type IconValue = IconName | ImageRef

export type SectionType =
  | 'hero'
  | 'stats'
  | 'featureGrid'
  | 'featureCard'
  | 'featureTabs'
  | 'featureHighlights'
  | 'logoCloud'
  | 'testimonials'
  | 'faq'
  | 'cta'
  | 'form'

export interface SectionStyle {
  background?:
    | 'primary'
    | 'inverse'
    | 'gradient-dark-top'
    | 'gradient-dark-bottom'
    | 'brand-red'
    | 'brand-violet'
    | 'brand-blue'
    | 'brand-teal'
    | 'none'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'section' | 'hero'
  /** When true, collapse top padding if adjacent sections share the same background. */
  collapse?: boolean
  className?: string
  backgroundImage?: {
    image: ImageRef
  }
}

export interface SectionDefinition<TType extends SectionType = SectionType> {
  id: string
  type: TType
  props: SectionPropsMap[TType]
  style?: SectionStyle
}

export type SectionNode = SectionDefinition

// ─── Hero ───────────────────────────────────────────────────────────────────

/** Used with layout="image-right" */
export interface HeroImage {
  image: ImageRef
  alt?: string
  width?: number
  height?: number
  /** Desktop alignment. Defaults to 'right'. */
  align?: 'right' | 'center'
  priority?: boolean
}

/** Used with layout="centered" */
export interface HeroBackgroundImage {
  image: ImageRef
  alt?: string
  priority?: boolean
  /** Tailwind opacity class, e.g. "opacity-30". Defaults to "opacity-40". */
  opacityClassName?: string
  /** Optional overlay class. */
  overlayClassName?: string
  /** Defaults to object-center / bg-center */
  positionClassName?: string
}

export interface HeroForm {
  formId: string // HubSpot form ID (required)
  portalId?: string // HubSpot portal ID — defaults to '4466002'
  region?: string // default 'na1'
}

export interface HeroProps {
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

export interface StatsProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  items: StatsItem[]
  columns?: 2 | 3 | 4
}

export interface StatsItem {
  /** Lucide icon name OR an image path string */
  icon?: IconValue
  value: string
  label: string
  description?: string
}

// ─── Feature Grid ────────────────────────────────────────────────────────────

export interface FeatureGridProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: FeatureGridItem[]
  columns?: 2 | 3 | 4
  viewMore?: { text: string; href: string }
}

export interface FeatureGridItem {
  /** Lucide icon name OR an image path string (e.g. "/images/..." or "https://...") */
  icon?: IconValue
  title: string
  description: string
  cta?: Cta
}

// ─── Feature Card ────────────────────────────────────────────────────────────

export interface FeatureCardProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: FeatureCardItem[]
  columns?: 2 | 3 | 4
}

export interface FeatureCardItem {
  /** Lucide icon name OR an image path string (e.g. "/images/..." or "https://...") */
  icon?: IconValue
  title: string
  description: string
  href?: string
}

// ─── Feature Tabs ────────────────────────────────────────────────────────────

export interface FeatureTabsProps {
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
  title?: string
  description?: string
  bullets?: string[]
  primaryCta?: Cta
  secondaryCta?: Cta
  image: {
    image: ImageRef
    alt?: string
    width?: number
    height?: number
  }
}

// ─── Feature Highlights ──────────────────────────────────────────────────────

export type ColorCardVariant = 'red' | 'violet' | 'blue' | 'teal'

export interface FeatureHighlightsProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: FeatureHighlightItem[]
  columns?: 2 | 3 | 4
  viewMore?: { text: string; href: string }
}

export interface FeatureHighlightItem {
  variant: ColorCardVariant
  title: string
  description: string
  cta: Cta
  icon?: IconValue
}

// ─── Logo Cloud ──────────────────────────────────────────────────────────────

export interface LogoCloudProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  logos: Logo[]
  variant?: 'default' | 'minimal'
  autoScroll?: boolean
  scrollSpeedSeconds?: number
}

export interface Logo {
  name: string
  image: ImageRef
  href?: string
  width?: number
  height?: number
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export interface TestimonialsProps {
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
    image: ImageRef
    alt?: string
    size?: number
  }
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqProps {
  title?: string
  items: FaqItem[]
}

export interface FaqItem {
  q: string
  a: string
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

export interface CtaProps {
  title: string
  subtitle?: string
  label?: string
  image?: {
    image: ImageRef
    alt?: string
    width?: number
    height?: number
  }
  primaryCta: Cta
  secondaryCta?: Cta
}

// ─── HubSpot Form ────────────────────────────────────────────────────────────

export interface FormProps {
  title?: string
  subtitle?: string
  portalId: string // HubSpot portal ID — replace placeholder before publishing
  formId: string // HubSpot form ID — replace placeholder before publishing
  region?: string // default 'na1'
}

export type SectionPropsMap = {
  hero: HeroProps
  stats: StatsProps
  featureGrid: FeatureGridProps
  featureCard: FeatureCardProps
  featureTabs: FeatureTabsProps
  featureHighlights: FeatureHighlightsProps
  logoCloud: LogoCloudProps
  testimonials: TestimonialsProps
  faq: FaqProps
  cta: CtaProps
  form: FormProps
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
    const props = section.props as unknown as Record<string, unknown>
    if ('items' in props && Array.isArray(props.items)) {
      for (const item of props.items as Array<{ icon?: IconValue }>) {
        if (typeof item.icon === 'string') {
          const original = item.icon
          item.icon = sanitizeIconName(item.icon)
          if (item.icon !== original) {
            console.warn(
              `[DSL] Unknown icon "${original}" on section "${section.id}", replaced with "Zap"`
            )
          }
        }
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
  "sections": [
    {
      "id": string,
      "type": string,
      "props": object,
      "style": {
        "background"?: "primary"|"inverse"|"gradient-dark-top"|"gradient-dark-bottom"|"brand-red"|"brand-violet"|"brand-blue"|"brand-teal"|"none",
        "spacing"?: "none"|"sm"|"md"|"lg"|"section"|"hero",
        "collapse"?: boolean,
        "backgroundImage"?: { "image": {assetId?: string, url: string} }
      }
    }
  ]
}

Image fields must use this structure:
{ "assetId"?: string, "url": string }

Available section types (choose appropriate mix):
- {
    type: "hero",
    props: {
      layout?: "centered"|"image-right"|"split",
      eyebrow?,
      headline,
      subheadline?,
      primaryCta?: {text,href},
      secondaryCta?: {text,href},
      heroImage?: { image: {assetId?, url}, alt?, width?, height?, align?:"right"|"center" },
      backgroundImage?: { image: {assetId?, url}, alt?, opacityClassName?, overlayClassName?, positionClassName? },
      heroForm?: {formId, portalId?, region?}
    }
  }
  (heroForm: embeds a HubSpot form in the hero right slot — auto-sets layout="split")
  (headline supports gradient spans; use sparingly on 1-2 words max:
    <span class="text-gradient-violet">word</span>
    <span class="text-gradient-blue">word</span>
    <span class="text-gradient-teal">word</span>
    <span class="text-gradient-red">word</span>
    Add animate-glow-sweep to the class for an animated glow sweep effect, e.g.
    <span class="text-gradient-violet animate-glow-sweep">word</span>
  )
- { type: "stats", props: { title?, subtitle?, items: [{icon?, value, label, description?}], columns?: 2|3|4 } }
- { type: "featureGrid", props: { eyebrow?, title, subtitle?, items: [{icon?, title, description, cta?: {text, href}}], columns?: 2|3|4 } }
- { type: "featureCard", props: { eyebrow?, title, subtitle?, items: [{icon?, title, description, href?}], columns?: 2|3|4 } }
- { type: "featureTabs", props: { eyebrow?, title, subtitle?, tabs: [{id, label, description?, bullets?, primaryCta?, secondaryCta?, image: { image: {assetId?, url}, alt?, width?, height? }}], autoSwitch?, autoSwitchInterval? } }
- { type: "featureHighlights", props: { eyebrow?, title, subtitle?, items: [{variant: "red"|"violet"|"blue"|"teal", title, description, cta: {text, href}, icon?}], columns?: 2|3|4, viewMore?: {text, href} } }
- { type: "faq", props: { title?, items: [{q, a}] } }
- { type: "cta", props: { title, subtitle?, primaryCta: {text,href}, secondaryCta?: {text,href}, image?: { image: {assetId?, url}, alt?, width?, height? } } }
- { type: "testimonials", props: { title, items: [{quote, author, href?, cta?, logo?: { image: {assetId?, url}, alt?, size? }}] } }
- { type: "logoCloud", props: { title?, logos: [{name, image: {assetId?, url}, href?}], variant?: "default"|"minimal" } }
- { type: "form", props: { title?, subtitle?, portalId: "YOUR_PORTAL_ID", formId: "YOUR_FORM_ID", region?: "na1" } }

Icon names (use for icon fields): ${ALL_ICON_NAMES.join(', ')}
CTA hrefs: use real PingCAP URLs or "/tidbcloud/trial/" for signup CTAs.
Always start with a "hero" section and end with a "cta" section.
Return ONLY the JSON object, no markdown, no code blocks.
IMPORTANT: style.background MUST be one of the exact values listed above. Do not invent other values.
IMPORTANT: style.spacing MUST be one of the exact values listed above. Do not invent other values.
`.trim()
