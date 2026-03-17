'use client'

import { createElement } from 'react'
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
import type { LucideProps } from 'lucide-react'
import {
  HeroSection,
  FeatureGridSection,
  FeatureCardSection,
  StatsSection,
  CtaSection,
  LogoCloudSection,
  TestimonialsSection,
  FaqSection,
} from '@/components'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LazyHubSpotForm } from '@/components/ui/LazyHubSpotForm'
import { HubSpotForm } from '@/components/ui/HubSpotForm'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import type { PageDSL, SectionNode, IconName } from './dsl-schema'

// ─── Icon map ────────────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<LucideProps>

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

function renderIcon(name?: IconName | string) {
  if (!name) return undefined
  // If it looks like an image path or URL, render as <img>
  if (name.startsWith('/') || name.startsWith('http')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={name} alt="" className="object-contain" />
  }
  const Icon = ICON_MAP[name as IconName] ?? Zap
  return createElement(Icon, { className: '', strokeWidth: 1.5 })
}

// ─── Section renderer ────────────────────────────────────────────────────────

function renderSection(node: SectionNode): React.ReactNode {
  switch (node.type) {
    case 'hero':
      return (
        <HeroSection
          layout={node.heroForm ? 'split' : node.layout}
          eyebrow={node.eyebrow}
          headline={node.headline}
          subheadline={node.subheadline}
          primaryCta={node.primaryCta}
          secondaryCta={node.secondaryCta}
          heroImage={node.heroImage}
          backgroundImage={node.backgroundImage}
          rightSlot={
            node.heroForm ? (
              <HubSpotForm
                formId={node.heroForm.formId}
                portalId={node.heroForm.portalId ?? '4466002'}
                region={node.heroForm.region ?? 'na1'}
              />
            ) : undefined
          }
        />
      )

    case 'stats':
      return (
        <StatsSection
          title={node.title}
          subtitle={node.subtitle}
          stats={node.items.map((s) => ({ ...s, icon: renderIcon(s.icon) }))}
          columns={node.columns}
        />
      )

    case 'featureGrid':
      return (
        <FeatureGridSection
          eyebrow={node.eyebrow}
          title={node.title}
          subtitle={node.subtitle}
          features={node.items.map((f) => ({ ...f, icon: renderIcon(f.icon) }))}
          columns={node.columns}
        />
      )

    case 'featureCard':
      return (
        <FeatureCardSection
          eyebrow={node.eyebrow}
          title={node.title}
          subtitle={node.subtitle}
          items={node.items.map((f) => ({ ...f, icon: renderIcon(f.icon) }))}
          columns={node.columns}
        />
      )

    case 'logoCloud':
      return (
        <LogoCloudSection
          eyebrow={node.eyebrow}
          title={node.title}
          subtitle={node.subtitle}
          logos={node.logos}
          variant={node.variant}
          autoScroll={node.autoScroll}
        />
      )

    case 'testimonials':
      return (
        <TestimonialsSection
          eyebrow={node.eyebrow}
          title={node.title}
          testimonials={node.items.map((t) => ({
            quote: t.quote,
            author: t.author,
            href: t.href,
            cta: t.cta,
            logo: t.logo,
          }))}
        />
      )

    case 'faq':
      return <FaqSection title={node.title} items={node.items} />

    case 'cta':
      return (
        <CtaSection
          title={node.title}
          subtitle={node.subtitle}
          background={node.background}
          primaryCta={node.primaryCta}
          secondaryCta={node.secondaryCta}
        />
      )

    case 'form':
      return (
        <section className="py-section bg-bg-primary">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
              {(node.title || node.subtitle) && (
                <SectionHeader title={node.title ?? ''} subtitle={node.subtitle} className="mb-8" />
              )}
              <LazyHubSpotForm
                portalId={node.portalId}
                formId={node.formId}
                region={node.region ?? 'na1'}
              />
            </div>
          </div>
        </section>
      )

    case 'featureTabs':
      // FeatureTabsSection requires image assets — render a placeholder in preview
      return (
        <section className="py-section bg-bg-surface">
          <div className="max-w-container mx-auto px-container text-center">
            <p className="text-text-secondary text-body-sm mb-4">Feature Tabs Section</p>
            <h2 className="text-h2-mb md:text-h2-sm font-bold text-text-inverse">{node.title}</h2>
            <p className="text-text-secondary mt-4">
              {node.tabs.length} tabs: {node.tabs.map((t) => t.label).join(' · ')}
            </p>
          </div>
        </section>
      )

    default:
      return null
  }
}

// ─── Public component ────────────────────────────────────────────────────────

interface DslPageRendererProps {
  dsl: PageDSL
  /** Wrap in a scaling container for admin preview mode */
  preview?: boolean
  /** Include Header + Footer chrome (mirrors the published page) */
  withChrome?: boolean
}

export function DslPageRenderer({
  dsl,
  preview = false,
  withChrome = false,
}: DslPageRendererProps) {
  const sections = <div className="bg-bg-primary">{dsl.sections.map(renderSection)}</div>

  const content = withChrome ? (
    <>
      <Header />
      <main className="pt-[62px] lg:pt-20">{sections}</main>
      <Footer />
    </>
  ) : (
    sections
  )

  if (!preview) return content

  return (
    <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' /* 16:9 aspect */ }}>
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: '1440px',
          transform: 'scale(var(--preview-scale, 0.45))',
        }}
      >
        {content}
      </div>
    </div>
  )
}
