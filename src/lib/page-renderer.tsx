import { createElement, type ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  Zap,
  Shield,
  Globe,
  Database,
  Server,
  Cloud,
  Lock,
  Activity,
  Layers,
  Cpu,
  Rocket,
  BarChart,
  CheckCircle,
  Star,
  ArrowRight,
  GitBranch,
  Package,
  RefreshCw,
  Gauge,
  Code2,
  Brain,
  Sparkles,
  Bot,
  MessageSquare,
  Search,
  Settings,
  Wrench,
  Terminal,
  FileCode,
  GitMerge,
  LayoutGrid,
  Table,
  BarChart2,
  LineChart,
  PieChart,
  TrendingUp,
  Filter,
  Clock,
  Repeat,
  Scale,
  DollarSign,
  Users,
  Building,
  Briefcase,
  Award,
  Target,
  Lightbulb,
  Puzzle,
  Network,
} from 'lucide-react'
import {
  HeroSection,
  FeatureGridSection,
  FeatureCardSection,
  CaseStudyCardsSection,
  StatsSection,
  CtaSection,
  LogoCloudSection,
  TestimonialsSection,
  FaqSection,
  FeatureTabsSection,
  FeatureHighlightsSection,
  FeatureMediaSection,
  FormSection,
  Agenda,
  Speakers,
  ComparisonTable,
  RichTextBlock,
  CodeBlock,
  TableOfContents,
} from '@/components'
import { HubSpotForm } from '@/components/ui/HubSpotForm'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { SectionWrapper, resolveSectionStyle } from '@/components/ui/SectionWrapper'
import type {
  IconName,
  IconValue,
  PageDSL,
  SectionPropsMap,
  SectionStyle,
  SectionType,
} from './dsl-schema'
import { ALLOWED_BG_BY_SECTION, ALLOWED_SPACING_BY_SECTION } from './section-style'
import type { PageDSLInput } from './dsl-utils'
import { normalizeDSL } from './dsl-utils'

// ─── Icon map ────────────────────────────────────────────────────────────────

type IconComponent = ComponentType<LucideProps>

const ICON_MAP: Record<IconName, IconComponent> = {
  // Core
  Zap,
  Shield,
  Globe,
  Database,
  Server,
  Cloud,
  Lock,
  Activity,
  Layers,
  Cpu,
  Rocket,
  BarChart,
  CheckCircle,
  Star,
  ArrowRight,
  GitBranch,
  Package,
  RefreshCw,
  Gauge,
  Code2,
  // AI / Dev
  Brain,
  Sparkles,
  Bot,
  MessageSquare,
  Search,
  Settings,
  Wrench,
  Terminal,
  FileCode,
  GitMerge,
  // Data / Analytics
  LayoutGrid,
  Table,
  BarChart2,
  LineChart,
  PieChart,
  TrendingUp,
  Filter,
  Clock,
  Repeat,
  Scale,
  // Business
  DollarSign,
  Users,
  Building,
  Briefcase,
  Award,
  Target,
  Lightbulb,
  Puzzle,
  Network,
}

function getDefaultBackground(type: SectionType): SectionStyle['background'] {
  const allowed = ALLOWED_BG_BY_SECTION[type]
  return allowed.values().next().value ?? 'primary'
}

function sanitizeBackgroundBySection(
  type: SectionType,
  style?: SectionStyle
): SectionStyle | undefined {
  if (!style?.background) return style
  const allowed = ALLOWED_BG_BY_SECTION[type]
  if (!allowed.has(style.background)) {
    const { background, ...rest } = style
    return Object.keys(rest).length > 0 ? rest : undefined
  }
  return style
}

function sanitizeSpacingBySection(
  type: SectionType,
  style?: SectionStyle
): SectionStyle | undefined {
  if (!style?.spacing) return style
  const allowed = ALLOWED_SPACING_BY_SECTION[type]
  if (!allowed.has(style.spacing)) {
    const { spacing, ...rest } = style
    return Object.keys(rest).length > 0 ? rest : undefined
  }
  return style
}

function renderIcon(value?: IconValue, size?: number) {
  if (!value) return undefined
  if (typeof value === 'object' && 'url' in value) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={value.url}
        alt=""
        className="object-contain"
        style={size ? { width: size, height: size } : undefined}
      />
    )
  }
  const Icon = ICON_MAP[value as IconName] ?? Zap
  return createElement(Icon, { className: '', strokeWidth: 1.5, ...(size ? { size } : {}) })
}

// SectionWrapper now lives in components/ui for reuse outside the renderer.

// ─── Component map ───────────────────────────────────────────────────────────

type ComponentEntry<T extends SectionType> = {
  Component: ComponentType<any>
  mapProps?: (props: SectionPropsMap[T]) => Record<string, unknown>
  defaultStyle?: SectionStyle
}

export const componentMap: Record<SectionType, ComponentEntry<any>> = {
  hero: {
    Component: HeroSection,
    mapProps: (props: SectionPropsMap['hero']) => ({
      ...props,
      layout: props.layout,
      rightSlot:
        props.layout === 'split' && props.heroForm ? (
          <HubSpotForm
            formId={props.heroForm.formId}
            portalId={props.heroForm.portalId}
            region={props.heroForm.region}
          />
        ) : undefined,
    }),
    defaultStyle: { background: 'primary', spacing: 'hero' },
  },
  stats: {
    Component: StatsSection,
    mapProps: (props: SectionPropsMap['stats']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      stats: props.items.map((s) => ({ ...s, icon: renderIcon(s.icon) })),
      columns: props.columns,
      className: props.className,
    }),
    defaultStyle: { background: 'gradient-dark-top', spacing: 'section' },
  },
  featureGrid: {
    Component: FeatureGridSection,
    mapProps: (props: SectionPropsMap['featureGrid']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      features: props.items.map((f) => ({ ...f, icon: renderIcon(f.icon, props.iconSize) })),
      columns: props.columns,
      viewMore: props.viewMore,
      itemLayout: props.itemLayout,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  featureCard: {
    Component: FeatureCardSection,
    mapProps: (props: SectionPropsMap['featureCard']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      items: props.items.map((f) => ({ ...f, icon: renderIcon(f.icon) })),
      columns: props.columns,
      borderStyle: props.borderStyle,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  caseStudyCards: {
    Component: CaseStudyCardsSection,
    mapProps: (props: SectionPropsMap['caseStudyCards']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      items: props.items,
      className: props.className,
    }),
    defaultStyle: { background: 'gradient-dark-bottom', spacing: 'section' },
  },
  featureTabs: {
    Component: FeatureTabsSection,
    mapProps: (props: SectionPropsMap['featureTabs']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      tabs: props.tabs,
      autoSwitch: props.autoSwitch,
      autoSwitchInterval: props.autoSwitchInterval,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  featureHighlights: {
    Component: FeatureHighlightsSection,
    mapProps: (props: SectionPropsMap['featureHighlights']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      items: props.items.map((item) => ({ ...item, icon: renderIcon(item.icon, props.iconSize) })),
      columns: props.columns,
      viewMore: props.viewMore,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  featureMedia: {
    Component: FeatureMediaSection,
    mapProps: (props: SectionPropsMap['featureMedia']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      items: props.items,
      startPosition: props.startPosition,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  logoCloud: {
    Component: LogoCloudSection,
    mapProps: (props: SectionPropsMap['logoCloud']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      logos: props.logos,
      variant: props.variant,
      align: props.align,
      autoScroll: props.autoScroll,
      scrollSpeedSeconds: props.scrollSpeedSeconds,
      scrollContentMaxWidth: props.scrollContentMaxWidth,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  testimonials: {
    Component: TestimonialsSection,
    mapProps: (props: SectionPropsMap['testimonials']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      testimonials: props.items,
      className: props.className,
    }),
    defaultStyle: { background: 'gradient-dark-top', spacing: 'section' },
  },
  faq: {
    Component: FaqSection,
    mapProps: (props: SectionPropsMap['faq']) => ({
      title: props.title,
      items: props.items,
      className: props.className,
    }),
    defaultStyle: { background: 'gradient-dark-bottom', spacing: 'section' },
  },
  cta: {
    Component: CtaSection,
    mapProps: (props: SectionPropsMap['cta']) => ({
      title: props.title,
      subtitle: props.subtitle,
      image: props.image,
      primaryCta: props.primaryCta,
      secondaryCta: props.secondaryCta,
      className: props.className,
    }),
    defaultStyle: { background: 'brand-violet', spacing: 'section' },
  },
  form: {
    Component: FormSection,
    mapProps: (props: SectionPropsMap['form']) => ({
      title: props.title,
      subtitle: props.subtitle,
      portalId: props.portalId,
      formId: props.formId,
      region: props.region,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  agenda: {
    Component: Agenda,
    mapProps: (props: SectionPropsMap['agenda']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      items: props.items,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  speakers: {
    Component: Speakers,
    mapProps: (props: SectionPropsMap['speakers']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      items: props.items,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  comparisonTable: {
    Component: ComparisonTable,
    mapProps: (props: SectionPropsMap['comparisonTable']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      ourProduct: props.ourProduct,
      competitor: props.competitor,
      rows: props.rows,
      cta: props.cta,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  richTextBlock: {
    Component: RichTextBlock,
    mapProps: (props: SectionPropsMap['richTextBlock']) => ({
      content: props.content,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  codeBlock: {
    Component: CodeBlock,
    mapProps: (props: SectionPropsMap['codeBlock']) => ({
      title: props.title,
      filename: props.filename,
      language: props.language,
      code: props.code,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  tableOfContents: {
    Component: TableOfContents,
    mapProps: (props: SectionPropsMap['tableOfContents']) => ({
      items: props.items,
      sticky: props.sticky,
      className: props.className,
    }),
    defaultStyle: { background: 'primary', spacing: 'none' },
  },
}

// ─── Page renderer ───────────────────────────────────────────────────────────

interface PageRendererProps {
  dsl: PageDSLInput
  withChrome?: boolean
}

/** Types that sit alongside the TOC sidebar in a two-column layout */
const TOC_COMPANION_TYPES = new Set<SectionType>(['richTextBlock', 'faq', 'codeBlock', 'cta'])
const LONG_FORM_GENERATED_TYPES = new Set<SectionType>([
  'hero',
  'tableOfContents',
  'richTextBlock',
  'faq',
  'codeBlock',
  'cta',
])

function isLongFormGeneratedPage(sections: PageDSL['sections']) {
  const hasToc = sections.some((section) => section.type === 'tableOfContents')
  const hasRichText = sections.some((section) => section.type === 'richTextBlock')
  return (
    hasToc &&
    hasRichText &&
    sections.every((section) => LONG_FORM_GENERATED_TYPES.has(section.type))
  )
}

function renderSection(
  section: {
    id: string
    type: SectionType
    props: unknown
    style?: SectionStyle
  },
  options?: { compactFaq?: boolean; longFormLightTheme?: boolean }
) {
  const entry = componentMap[section.type]
  if (!entry) return null
  const baseProps = entry.mapProps ? entry.mapProps(section.props as any) : (section.props as any)
  const themedProps =
    options?.longFormLightTheme && section.type === 'tableOfContents'
      ? { ...baseProps, tone: 'light' as const }
      : options?.longFormLightTheme && section.type === 'hero'
        ? { ...baseProps, layout: 'image-right' as const }
        : baseProps
  const props =
    section.type === 'faq' && options?.compactFaq ? { ...themedProps, compact: true } : themedProps
  const resolvedStyle = sanitizeSpacingBySection(
    section.type,
    sanitizeBackgroundBySection(section.type, section.style)
  )
  const themedStyle =
    options?.longFormLightTheme && section.type !== 'cta'
      ? ({
          ...(resolvedStyle ?? {}),
          background:
            section.type === 'tableOfContents'
              ? 'none'
              : section.type === 'hero'
                ? 'primary'
                : 'inverse',
          className: [
            resolvedStyle?.className,
            section.type !== 'tableOfContents' && section.type !== 'hero' ? '!bg-white' : '',
          ]
            .filter(Boolean)
            .join(' '),
        } satisfies SectionStyle)
      : resolvedStyle
  const defaultStyle: SectionStyle = {
    ...(entry.defaultStyle ?? {}),
    background: getDefaultBackground(section.type),
  }
  return (
    <SectionWrapper
      key={section.id}
      id={section.style?.anchorId || section.id}
      style={themedStyle}
      defaultStyle={defaultStyle}
    >
      <entry.Component {...props} />
    </SectionWrapper>
  )
}

export function PageRenderer({ dsl, withChrome = false }: PageRendererProps) {
  const normalized = normalizeDSL(dsl)
  const sections = normalized.sections
  const isLongFormGenerated = isLongFormGeneratedPage(sections)

  // Detect TOC section for sidebar layout
  const tocIndex = sections.findIndex((s) => s.type === 'tableOfContents')
  const hasToc = tocIndex !== -1

  // For pages without a hero (e.g. listicle), render pageName as H1
  const hasHero = sections.some((s) => s.type === 'hero')
  const pageH1 =
    !hasHero && normalized.pageName ? (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-0">
        <h1
          className={`text-h1-mb md:text-h1 font-bold leading-tight ${
            isLongFormGenerated ? 'text-text-primary' : 'text-text-inverse'
          }`}
        >
          {normalized.pageName}
        </h1>
      </div>
    ) : null

  let renderedSections: React.ReactNode[]

  if (hasToc) {
    // Build three groups: before-TOC, TOC+companions, after-companions
    const beforeToc = sections.slice(0, tocIndex)
    const tocSection = sections[tocIndex]

    // Collect companion sections after the TOC (right column), keep others below
    const companionSections: typeof sections = []
    const afterCompanions: typeof sections = []
    for (let i = tocIndex + 1; i < sections.length; i += 1) {
      const section = sections[i]
      if (TOC_COMPANION_TYPES.has(section.type)) {
        companionSections.push(section)
      } else {
        afterCompanions.push(section)
      }
    }

    renderedSections = [
      // Sections before TOC (e.g. intro richTextBlock)
      ...beforeToc.map((s) => renderSection(s, { longFormLightTheme: isLongFormGenerated })),
      // TOC sidebar layout
      <div
        key="toc-layout"
        className={`contain py-10 lg:py-20 ${isLongFormGenerated ? 'longform-generated-page' : ''}`}
      >
        <div className="lg:flex lg:gap-12">
          {/* TOC sidebar — rendered without SectionWrapper for direct flex control */}
          {(() => {
            const entry = componentMap[tocSection.type]
            if (!entry) return null
            const props = entry.mapProps
              ? entry.mapProps(tocSection.props as any)
              : (tocSection.props as any)
            const themedProps = isLongFormGenerated ? { ...props, tone: 'light' as const } : props
            return <entry.Component {...themedProps} />
          })()}
          {/* Main content alongside TOC */}
          <div className="flex-1 min-w-0">
            {companionSections.map((s) =>
              renderSection(s, {
                compactFaq: true,
                longFormLightTheme: isLongFormGenerated,
              })
            )}
          </div>
        </div>
      </div>,
      // Remaining sections (FAQ, CTA, etc.)
      ...afterCompanions.map((s) => renderSection(s, { longFormLightTheme: isLongFormGenerated })),
    ]
  } else {
    renderedSections = sections.map((section) =>
      renderSection(section, { longFormLightTheme: isLongFormGenerated })
    )
  }

  const content = (
    <div className={isLongFormGenerated ? 'bg-white longform-generated-page' : 'bg-bg-primary'}>
      {pageH1}
      {renderedSections}
    </div>
  )

  if (!withChrome) return content

  return (
    <>
      <Header />
      <main className="pt-[62px] lg:pt-20">{content}</main>
      <Footer />
    </>
  )
}

export type { PageDSL }
