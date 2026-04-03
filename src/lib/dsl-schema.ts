// Page DSL — single source of truth for all AI-generated pages.
// AI generates this JSON; dsl-renderer.tsx renders it; dsl-to-tsx.ts publishes it.

export interface PageDSL {
  pageName?: string
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
  | 'featureMedia'
  | 'logoCloud'
  | 'testimonials'
  | 'faq'
  | 'cta'
  | 'form'
  | 'agenda'
  | 'speakers'
  | 'comparisonTable'
  | 'richTextBlock'
  | 'tableOfContents'
  | 'codeBlock'

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
  /** Remove top padding on this section. */
  removePaddingTop?: boolean
  /** Remove bottom padding on this section. */
  removePaddingBottom?: boolean
  className?: string
  /** Tailwind opacity class for section background image, e.g. "opacity-60". */
  backgroundImageOpacityClassName?: string
  /** Optional overlay class (e.g. "bg-black/40"). No overlay unless provided. */
  backgroundImageOverlayClassName?: string
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
  /** Embeds a HubSpot form in the hero right slot. Auto-sets layout="split". */
  heroForm?: HeroForm
  className?: string
}

// ─── Stats ──────────────────────────────────────────────────────────────────

export interface StatsProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  items: StatsItem[]
  columns?: 2 | 3 | 4
  className?: string
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
  itemLayout?: 'horizontal' | 'vertical'
  className?: string
}

export interface FeatureGridItem {
  /** Lucide icon name OR an image path string (e.g. "/images/..." or "https://...") */
  icon?: IconValue
  title: string
  description: string
  cta?: Cta
  layout?: 'horizontal' | 'vertical'
}

// ─── Feature Card ────────────────────────────────────────────────────────────

export interface FeatureCardProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: FeatureCardItem[]
  columns?: 2 | 3 | 4
  borderStyle?: 'gray' | 'color'
  className?: string
}

export interface FeatureCardItem {
  /** Lucide icon name OR an image path string (e.g. "/images/..." or "https://...") */
  icon?: IconValue
  title: string
  description: string
  borderColor?: string
  href?: string
  className?: string
}

// ─── Feature Tabs ────────────────────────────────────────────────────────────

export interface FeatureTabsProps {
  eyebrow?: string
  title: string
  subtitle?: string
  tabs: FeatureTab[]
  autoSwitch?: boolean
  autoSwitchInterval?: number
  className?: string
}

export interface FeatureTab {
  id: string
  label: string
  description?: string
  bullets?: string[]
  primaryCta?: Cta
  secondaryCta?: Cta
  /** Optional plain text override for the left content column. */
  content?: string
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
  className?: string
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
  align?: 'center' | 'left'
  autoScroll?: boolean
  scrollSpeedSeconds?: number
  scrollContentMaxWidth?: number
  className?: string
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
  className?: string
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
  className?: string
}

export interface FaqItem {
  q: string
  a: string
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

export interface CtaProps {
  title: string
  subtitle?: string
  image?: {
    image: ImageRef
    alt?: string
    width?: number
    height?: number
  }
  primaryCta: Cta
  secondaryCta?: Cta
  className?: string
}

// ─── Feature Media ───────────────────────────────────────────────────────────

export interface FeatureMediaProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  items: FeatureMediaItemDSL[]
  startPosition?: 'left' | 'right'
  className?: string
}

export interface FeatureMediaItemDSL {
  title: string
  description: string
  image: {
    image: ImageRef
    alt?: string
    width?: number
    height?: number
  }
  imagePosition?: 'left' | 'right'
}

// ─── HubSpot Form ────────────────────────────────────────────────────────────

export interface FormProps {
  title?: string
  subtitle?: string
  portalId: string // HubSpot portal ID — replace placeholder before publishing
  formId: string // HubSpot form ID — replace placeholder before publishing
  region?: string // default 'na1'
  className?: string
}

// ─── Agenda ─────────────────────────────────────────────────────────────────

export interface AgendaProps {
  eyebrow?: string
  title: string
  subtitle?: string
  items: AgendaItem[]
  className?: string
}

export interface AgendaItem {
  time?: string
  title: string
  description?: string
}

// ─── Speakers ───────────────────────────────────────────────────────────────

export interface SpeakersProps {
  eyebrow?: string
  title: string
  items: SpeakerItem[]
  className?: string
}

export interface SpeakerItem {
  name: string
  title: string
  company?: string
  bio?: string
  image?: {
    image: ImageRef
    alt?: string
  }
}

// ─── Comparison Table ───────────────────────────────────────────────────────

export interface ComparisonTableProps {
  eyebrow?: string
  title: string
  subtitle?: string
  ourProduct: string
  competitor: string
  rows: ComparisonRow[]
  cta?: Cta
  className?: string
}

export interface ComparisonRow {
  feature: string
  ours: string | boolean
  theirs: string | boolean
}

// ─── Rich Text Block ────────────────────────────────────────────────────────

export interface RichTextBlockProps {
  content: string
  className?: string
}

// ─── Code Block ─────────────────────────────────────────────────────────────

export interface CodeBlockProps {
  title?: string
  filename?: string
  language?: string
  code: string
  className?: string
}

// ─── Table of Contents ──────────────────────────────────────────────────────

export interface TocItem {
  id: string
  label: string
  level?: 1 | 2
}

export interface TableOfContentsProps {
  items: TocItem[]
  sticky?: boolean
  className?: string
}

// ─── Numbered List ──────────────────────────────────────────────────────────

export type SectionPropsMap = {
  hero: HeroProps
  stats: StatsProps
  featureGrid: FeatureGridProps
  featureCard: FeatureCardProps
  featureTabs: FeatureTabsProps
  featureHighlights: FeatureHighlightsProps
  featureMedia: FeatureMediaProps
  logoCloud: LogoCloudProps
  testimonials: TestimonialsProps
  faq: FaqProps
  cta: CtaProps
  form: FormProps
  agenda: AgendaProps
  speakers: SpeakersProps
  comparisonTable: ComparisonTableProps
  richTextBlock: RichTextBlockProps
  tableOfContents: TableOfContentsProps
  codeBlock: CodeBlockProps
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
        "removePaddingTop"?: boolean,
        "removePaddingBottom"?: boolean,
        "backgroundImage"?: { "image": {assetId?: string, url: string} },
        "backgroundImageOpacityClassName"?: string,
        "backgroundImageOverlayClassName"?: string
      }
    }
  ]
}

Image fields must use this structure:
{ "assetId"?: string, "url": string }
Do NOT include any image fields in AI output. Leave all image fields out entirely; the system will fill component defaults.

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
      heroImage?: { image: {assetId?, url}, alt?, width?, height?, align?:"right"|"center", priority? },
      heroForm?: {formId, portalId?, region?},
      className?
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
- { type: "stats", props: { eyebrow?, title?, subtitle?, items: [{icon?, value, label, description?}], columns?: 2|3|4, className? } }
- { type: "featureGrid", props: { eyebrow?, title, subtitle?, items: [{icon?, title, description, cta?: {text, href}, layout?: "horizontal"|"vertical"}], columns?: 2|3|4, viewMore?: {text, href}, itemLayout?: "horizontal"|"vertical", className? } }
- { type: "featureCard", props: { eyebrow?, title, subtitle?, items: [{icon?, title, description, borderColor?, href?, className?}], columns?: 2|3|4, borderStyle?: "gray"|"color", className? } }
- { type: "featureTabs", props: { eyebrow?, title, subtitle?, tabs: [{id, label, description?, bullets?, primaryCta?, secondaryCta?, content?, image: { image: {assetId?, url}, alt?, width?, height? }}], autoSwitch?, autoSwitchInterval?, className? } }
- { type: "featureHighlights", props: { eyebrow?, title, subtitle?, items: [{variant: "red"|"violet"|"blue"|"teal", title, description, cta: {text, href}, icon?}], columns?: 2|3|4, viewMore?: {text, href}, className? } }
- { type: "featureMedia", props: { eyebrow?, title?, subtitle?, items: [{title, description, image: {image: {assetId?, url}, alt?, width?, height?}, imagePosition?: "left"|"right"}], startPosition?: "left"|"right", className? } }
- { type: "faq", props: { title?, items: [{q, a}], className? } }
- { type: "cta", props: { title, subtitle?, primaryCta: {text,href}, secondaryCta?: {text,href}, image?: { image: {assetId?, url}, alt?, width?, height? }, className? } }
- { type: "testimonials", props: { eyebrow?, title, items: [{quote, author, href?, cta?, logo?: { image: {assetId?, url}, alt?, size? }}], className? } }
- { type: "logoCloud", props: { eyebrow?, title?, subtitle?, logos: [{name, image: {assetId?, url}, href?, width?, height?}], variant?: "default"|"minimal", align?: "center"|"left", autoScroll?, scrollSpeedSeconds?, scrollContentMaxWidth?, className? } }
- { type: "form", props: { title?, subtitle?, portalId: "YOUR_PORTAL_ID", formId: "YOUR_FORM_ID", region?: "na1", className? } }
- { type: "agenda", props: { eyebrow?, title, subtitle?, items: [{time?, title, description?}], className? } }
- { type: "speakers", props: { eyebrow?, title, items: [{name, title, company?, bio?, image?: { image: {assetId?, url}, alt? }}], className? } }
- { type: "comparisonTable", props: { eyebrow?, title, subtitle?, ourProduct, competitor, rows: [{feature, ours: string|boolean, theirs: string|boolean}], cta?: {text, href}, className? } }
- { type: "richTextBlock", props: { content: string (Markdown), className? } }
- { type: "tableOfContents", props: { items: [{id, label, level?: 1|2}], sticky?: boolean, className? } }

Icon names (use for icon fields): ${ALL_ICON_NAMES.join(', ')}
CTA hrefs: use real PingCAP URLs or "https://tidbcloud.com/free-trial/" for signup CTAs.
IMPORTANT: Do NOT invent documentation URLs or blog post paths. Only use these verified external URLs:
- Signup CTA ("Start for Free"): https://tidbcloud.com/free-trial/
- Contact: https://www.pingcap.com/contact-us/
- TiDB Cloud: https://www.pingcap.com/tidb/cloud/
- View Demo: https://www.pingcap.com/demo/
- Docs home: https://docs.pingcap.com/
- GitHub: https://github.com/pingcap/tidb
Always start with a "hero" section and end with a "cta" section.

If pageType is "listicle", only use these section types:
- hero (centered headline)
- tableOfContents (table of contents for headings and list entries)
- richTextBlock (intro text, explanatory copy; first line includes last updated + author)
- faq (frequently asked questions)
- cta (call to action)
Do NOT use stats, featureGrid, featureCard, featureTabs, featureHighlights, featureMedia, testimonials, logoCloud, or form for listicle pages.
Return ONLY the JSON object, no markdown, no code blocks.
IMPORTANT: style.background MUST be one of the exact values listed above. Do not invent other values.
IMPORTANT: style.spacing MUST be one of the exact values listed above. Do not invent other values.
`.trim()
