import { createElement, type ComponentType, type ReactNode } from 'react'
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
  StatsSection,
  CtaSection,
  LogoCloudSection,
  TestimonialsSection,
  FaqSection,
  FeatureTabsSection,
  FeatureHighlightsSection,
  FormSection,
} from '@/components'
import { HubSpotForm } from '@/components/ui/HubSpotForm'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { cn } from '@/lib/utils'
import type {
  IconName,
  IconValue,
  PageDSL,
  SectionDefinition,
  SectionPropsMap,
  SectionStyle,
  SectionType,
} from './dsl-schema'
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

function renderIcon(value?: IconValue) {
  if (!value) return undefined
  if (typeof value === 'object' && 'url' in value) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={value.url} alt="" className="object-contain" />
  }
  const Icon = ICON_MAP[value as IconName] ?? Zap
  return createElement(Icon, { className: '', strokeWidth: 1.5 })
}

// ─── Section wrapper ─────────────────────────────────────────────────────────

const BACKGROUND_CLASS: Record<string, string> = {
  primary: 'bg-bg-primary',
  inverse: 'bg-bg-inverse',
  'gradient-dark-top': 'bg-gradient-dark-top',
  'gradient-dark-bottom': 'bg-gradient-dark-bottom',
  'brand-red': 'bg-brand-red-bg',
  'brand-violet': 'bg-brand-violet-bg',
  'brand-blue': 'bg-brand-blue-bg',
  'brand-teal': 'bg-brand-teal-bg',
  none: '',
}

const SPACING_CLASS: Record<string, string> = {
  none: '',
  sm: 'py-section-sm',
  md: 'py-section-md',
  lg: 'py-section',
  section: 'py-section-sm lg:py-section',
  hero: 'py-10 md:py-0',
}

function resolveSectionStyle(style?: SectionStyle, defaults?: SectionStyle): SectionStyle {
  return {
    background: style?.background ?? defaults?.background ?? 'primary',
    spacing: style?.spacing ?? defaults?.spacing ?? 'section',
    collapse: style?.collapse ?? defaults?.collapse ?? false,
    className: style?.className ?? defaults?.className,
    backgroundImage: style?.backgroundImage ?? defaults?.backgroundImage,
  }
}

interface SectionWrapperProps {
  style?: SectionStyle
  defaultStyle?: SectionStyle
  previousStyle?: SectionStyle
  children: ReactNode
}

export function SectionWrapper({
  style,
  defaultStyle,
  previousStyle,
  children,
}: SectionWrapperProps) {
  const resolved = resolveSectionStyle(style, defaultStyle)
  const background = resolved.background ?? 'primary'
  const backgroundImage = resolved.backgroundImage?.image?.url
    ? resolved.backgroundImage
    : undefined
  const collapseTop =
    resolved.collapse && previousStyle?.background && previousStyle.background === background

  return (
    <section
      className={cn(
        BACKGROUND_CLASS[background] ?? '',
        SPACING_CLASS[resolved.spacing ?? 'section'] ?? '',
        collapseTop && 'pt-0',
        backgroundImage && 'relative overflow-hidden',
        resolved.className
      )}
    >
      {backgroundImage && (
        <>
          <div
            aria-hidden="true"
            className={cn('pointer-events-none absolute inset-0 bg-cover bg-center opacity-80')}
            style={{ backgroundImage: `url("${backgroundImage.image.url}")` }}
          />
        </>
      )}
      <div className={cn(backgroundImage && 'relative z-10')}>{children}</div>
    </section>
  )
}

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
      layout: props.heroForm ? 'split' : props.layout,
      rightSlot: props.heroForm ? (
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
    }),
    defaultStyle: { background: 'gradient-dark-top', spacing: 'section', collapse: true },
  },
  featureGrid: {
    Component: FeatureGridSection,
    mapProps: (props: SectionPropsMap['featureGrid']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      features: props.items.map((f) => ({ ...f, icon: renderIcon(f.icon) })),
      columns: props.columns,
      viewMore: props.viewMore,
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
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
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
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  featureHighlights: {
    Component: FeatureHighlightsSection,
    mapProps: (props: SectionPropsMap['featureHighlights']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      subtitle: props.subtitle,
      items: props.items.map((item) => ({ ...item, icon: renderIcon(item.icon) })),
      columns: props.columns,
      viewMore: props.viewMore,
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
      autoScroll: props.autoScroll,
      scrollSpeedSeconds: props.scrollSpeedSeconds,
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
  testimonials: {
    Component: TestimonialsSection,
    mapProps: (props: SectionPropsMap['testimonials']) => ({
      eyebrow: props.eyebrow,
      title: props.title,
      testimonials: props.items,
    }),
    defaultStyle: { background: 'gradient-dark-top', spacing: 'section' },
  },
  faq: {
    Component: FaqSection,
    mapProps: (props: SectionPropsMap['faq']) => ({
      title: props.title,
      items: props.items,
    }),
    defaultStyle: { background: 'gradient-dark-bottom', spacing: 'section', collapse: true },
  },
  cta: {
    Component: CtaSection,
    mapProps: (props: SectionPropsMap['cta']) => ({
      title: props.title,
      subtitle: props.subtitle,
      label: props.label,
      image: props.image,
      primaryCta: props.primaryCta,
      secondaryCta: props.secondaryCta,
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
    }),
    defaultStyle: { background: 'primary', spacing: 'section' },
  },
}

// ─── Page renderer ───────────────────────────────────────────────────────────

interface PageRendererProps {
  dsl: PageDSLInput
  withChrome?: boolean
}

export function PageRenderer({ dsl, withChrome = false }: PageRendererProps) {
  const normalized = normalizeDSL(dsl)
  const sections = normalized.sections
  const renderedSections = sections.map((section, index) => {
    const entry = componentMap[section.type]
    if (!entry) return null
    const props = entry.mapProps ? entry.mapProps(section.props as any) : (section.props as any)
    const previous = index > 0 ? sections[index - 1] : undefined
    const previousStyle = previous
      ? resolveSectionStyle(previous.style, componentMap[previous.type]?.defaultStyle)
      : undefined

    if (section.type === 'hero') {
      return <entry.Component key={section.id} {...props} />
    }

    return (
      <SectionWrapper
        key={section.id}
        style={section.style}
        defaultStyle={entry.defaultStyle}
        previousStyle={previousStyle}
      >
        <entry.Component {...props} />
      </SectionWrapper>
    )
  })

  const content = <div className="bg-bg-primary">{renderedSections}</div>

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
