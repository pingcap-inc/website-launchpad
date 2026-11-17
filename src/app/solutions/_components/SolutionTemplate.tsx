/**
 * Standard section template for /solutions/* pages.
 *
 * Order (fixed): 1 Hero · 2 Logo bar · 3 Problem · 4 How TiDB solves it · 5 Workloads ·
 * 6a How it works (optional) · 6b Comparison (optional) · 7 Customer proof · 8 FAQ ·
 * 9 Resources · 10 Closing ("See TiDB in Action" + Start for Free).
 *
 * Pages pass one SolutionPageData object; no copy lives in this file except the fixed
 * closing block, which is identical on every solution page.
 */
import Image from 'next/image'
import {
  Activity,
  Bot,
  Clock,
  Database,
  Gauge,
  GitBranch,
  Layers,
  Network,
  Shield,
  ShoppingCart,
  Zap,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { InlineLink } from '@/components/ui/InlineLink'
import { ColorCard } from '@/components/ui/ColorCard'
import { FeatureCard } from '@/components/ui/FeatureCard'
import { FaqSection } from '@/components/sections/FaqSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { FeatureTabsSection } from '@/components/sections/FeatureTabsSection'
import { CaseStudyCardsSection } from '@/components/sections/CaseStudyCardsSection'
import { FormSection } from '@/components/sections/FormSection'
import type { SectionStyle } from '@/lib/dsl-schema'
import { VideoDialog } from '@/components/ui/VideoDialog'
import { CompareTabs } from './CompareTabs'
import { Intro, LogoRow, SolutionHero, WorkloadCards } from './shared'
import type {
  CardIcon,
  ComparisonData,
  FaqData,
  HowItWorksData,
  ProblemData,
  ProofData,
  ResourcesData,
  SectionIntro,
  SolutionData,
  SolutionPageData,
} from './types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

/** Renders `[label](url)` inline links inside plain copy. */
export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(INLINE_LINK)) {
    const i = m.index ?? 0
    if (i > last) nodes.push(text.slice(last, i))
    nodes.push(
      <InlineLink key={i} href={m[2]}>
        {m[1]}
      </InlineLink>
    )
    last = i + m[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return <>{nodes}</>
}

const LUCIDE = {
  Activity,
  Bot,
  Clock,
  Database,
  Gauge,
  GitBranch,
  Layers,
  Network,
  Shield,
  ShoppingCart,
  Zap,
}

function CardIconView({ icon, size = 'md' }: { icon: CardIcon; size?: 'md' | 'lg' }) {
  if ('lucide' in icon) {
    const Icon = LUCIDE[icon.lucide]
    return (
      <div className="h-12 w-12">
        <Icon strokeWidth={1.5} className="h-full w-full" />
      </div>
    )
  }
  const box = size === 'lg' ? 120 : 96
  return (
    <Image
      src={icon.src}
      alt={icon.alt}
      width={icon.width ?? box}
      height={icon.height ?? box}
      className={cn(
        'object-contain object-left',
        size === 'lg' ? 'h-24 w-24 sm:h-[120px] sm:w-[120px]' : 'h-24 w-24'
      )}
    />
  )
}

/** Card grid columns that never leave an odd count in a 2-column row. */
function gridFor(count: number) {
  if (count === 4) return 'md:grid-cols-2 lg:grid-cols-4'
  if (count === 6) return 'md:grid-cols-2 lg:grid-cols-3'
  if (count % 2 === 0) return 'md:grid-cols-2'
  return 'lg:grid-cols-3'
}

function Section({
  kind,
  style,
  id,
  children,
}: {
  kind: string
  style?: SectionStyle
  id?: string
  children: ReactNode
}) {
  return (
    <div data-template-section={kind}>
      <SectionWrapper id={id} style={style}>
        {children}
      </SectionWrapper>
    </div>
  )
}

function SectionHead({ intro, size }: { intro: SectionIntro; size?: 'lg' | 'md' | 'sm' | 'xs' }) {
  return (
    <Intro
      eyebrow={intro.eyebrow}
      title={intro.title}
      size={size}
      paragraphs={(intro.paragraphs ?? []).map((p, i) => (
        <RichText key={i} text={p} />
      ))}
    />
  )
}

// ─── §3 Problem ──────────────────────────────────────────────────────────────

const PROBLEM_BORDERS = [
  'border-brand-red-medium',
  'border-brand-violet-medium',
  'border-brand-blue-medium',
]

export function ProblemCards({ data }: { data: ProblemData }) {
  return (
    <div className="space-y-16">
      <SectionHead intro={data} />
      <div className={cn('grid grid-cols-1 gap-6', gridFor(data.cards.length))}>
        {data.cards.map((c, i) => (
          <FeatureCard
            key={c.title}
            icon={<CardIconView icon={c.icon} />}
            title={c.title}
            description={<RichText text={c.body} />}
            borderColor={PROBLEM_BORDERS[i % PROBLEM_BORDERS.length]}
          />
        ))}
      </div>
    </div>
  )
}

// ─── §4 How TiDB solves it ───────────────────────────────────────────────────

export function CapabilityCards({ data }: { data: SolutionData }) {
  return (
    <div className="space-y-16">
      <div className="space-y-8">
        <SectionHead intro={data} />
        {data.cta && <PrimaryButton href={data.cta.href}>{data.cta.text}</PrimaryButton>}
      </div>
      <div className={cn('grid grid-cols-1 gap-10', gridFor(data.cards.length))}>
        {data.cards.map((c) => (
          <div key={c.title} className="flex flex-col gap-5">
            <CardIconView icon={c.icon} size="lg" />
            <h3 className="text-h3-lg font-bold leading-normal m-0">{c.title}</h3>
            {c.body && (
              <p className="text-body-md leading-relaxed text-secondary m-0">
                <RichText text={c.body} />
              </p>
            )}
            {c.points?.map((p) => (
              <div key={p.heading}>
                <h4 className="text-body-xl font-bold mb-1">{p.heading}</h4>
                <p className="text-body-md leading-relaxed text-secondary m-0">{p.body}</p>
              </div>
            ))}
            {c.link && <SecondaryButton href={c.link.href}>{c.link.text}</SecondaryButton>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── §6a How it works ────────────────────────────────────────────────────────

export function StepsTimeline({ data }: { data: HowItWorksData }) {
  if (data.tabs) {
    // The tab row is wider than a phone screen; let it scroll inside the section.
    return (
      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <FeatureTabsSection
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.paragraphs?.join('\n')}
          autoSwitch={true}
          autoSwitchInterval={6000}
          tabs={data.tabs.map((t) => ({
            id: t.id,
            label: t.label,
            bullets: t.bullets,
            image: {
              image: { url: t.image.src },
              alt: t.image.alt,
              width: t.image.width,
              height: t.image.height,
            },
          }))}
        />
      </div>
    )
  }
  const steps = data.steps ?? []
  const cols = steps.length % 2 === 0 ? 'md:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-5'
  return (
    <div className="space-y-16">
      <SectionHead intro={data} />
      <ol className={cn('grid grid-cols-1 gap-10', cols)}>
        {steps.map((s) => (
          <li key={s.title} className="flex flex-col gap-4 border-t border-carbon-700 pt-6">
            <Image
              src={s.icon.src}
              alt={s.icon.alt}
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
            <h3 className="text-h3-lg font-bold leading-normal m-0">{s.title}</h3>
            <p className="text-body-md leading-relaxed text-secondary m-0">{s.body}</p>
            {s.list && (
              <div className="text-body-md text-secondary">
                {s.listLabel && (
                  <p className="m-0 mb-2">
                    <strong className="text-text-inverse">{s.listLabel}</strong>
                  </p>
                )}
                <ul className="list-disc space-y-1 pl-5">
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

// ─── §6b Comparison ──────────────────────────────────────────────────────────

export function ComparisonMatrix({ data }: { data: NonNullable<ComparisonData['matrix']> }) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr>
              <th className="p-4" />
              {data.columns.map((c) => (
                <th key={c} scope="col" className="p-4 text-body-md font-bold">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.label} className="border-t border-carbon-800">
                <th scope="row" className="p-4 text-body-md font-bold">
                  {row.image ? (
                    <Image
                      src={row.image.src}
                      alt={row.image.alt}
                      width={row.image.width ?? 80}
                      height={row.image.height ?? 32}
                      className="h-8 w-auto"
                    />
                  ) : (
                    row.label
                  )}
                </th>
                {row.checks.map((ok, i) => (
                  <td key={data.columns[i]} className="p-4">
                    {ok ? (
                      <Image
                        src="https://static.pingcap.com/files/2024/11/04012428/check.svg"
                        alt="Yes"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    ) : (
                      <span className="block h-px w-6 bg-carbon-700" aria-label="No" role="img" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.mobileHint && (
        <p className="text-body-sm text-secondary md:hidden">{data.mobileHint}</p>
      )}
    </div>
  )
}

export function Comparison({ data }: { data: ComparisonData }) {
  return (
    <div className="space-y-16">
      {data.title && <SectionHead intro={{ ...data, title: data.title }} />}
      {data.tabs && (
        <CompareTabs
          tabs={data.tabs.map((t) => ({
            id: t.id,
            label: t.label,
            columns: [
              { ...t.columns[0], image: t.columns[0].image.src, imageAlt: t.columns[0].image.alt },
              { ...t.columns[1], image: t.columns[1].image.src, imageAlt: t.columns[1].image.alt },
            ],
          }))}
        />
      )}
      {data.matrix && <ComparisonMatrix data={data.matrix} />}
    </div>
  )
}

// ─── §7 Customer proof ───────────────────────────────────────────────────────

export function FeaturedQuote({ quote }: { quote: NonNullable<ProofData['quote']> }) {
  const body = (
    <figure className="flex flex-col gap-6 border border-carbon-800 p-8 md:p-12">
      {quote.rating && (
        <div className="flex flex-wrap items-center gap-6">
          <Image
            src={quote.rating.badge.src}
            alt={quote.rating.badge.alt}
            width={quote.rating.badge.width ?? 96}
            height={quote.rating.badge.height ?? 96}
            className="h-20 w-auto"
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-h3-lg font-bold m-0">{quote.rating.title}</h3>
            <Image
              src={quote.rating.stars.src}
              alt={quote.rating.stars.alt}
              width={quote.rating.stars.width ?? 180}
              height={quote.rating.stars.height ?? 32}
              className="h-auto w-[160px]"
            />
          </div>
        </div>
      )}
      {quote.logo && (
        <Image
          src={quote.logo.src}
          alt={quote.logo.alt}
          width={quote.logo.width ?? 140}
          height={quote.logo.height ?? 40}
          className="h-10 w-auto object-contain object-left"
        />
      )}
      <blockquote className="m-0 text-body-2xl leading-relaxed">{quote.quote}</blockquote>
      <figcaption className="text-body-md">
        <span className="font-bold">{quote.name}</span>
        {quote.role && <span className="text-secondary"> {quote.role}</span>}
      </figcaption>
    </figure>
  )
  return quote.href ? (
    <a
      href={quote.href}
      className="block transition-transform duration-200 ease-in-out hover:-translate-y-2"
    >
      {body}
    </a>
  ) : (
    body
  )
}

export function CustomerProof({ data }: { data: ProofData }) {
  return (
    <div className="space-y-16">
      {data.cases ? (
        <CaseStudyCardsSection
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.paragraphs?.join(' ')}
          items={data.cases.map((c) => ({
            logo: c.logo
              ? {
                  image: { url: c.logo.src },
                  alt: c.logo.alt,
                  width: c.logo.width,
                  height: c.logo.height,
                }
              : undefined,
            title: c.title,
            description: c.description,
            stats: c.stat ? [c.stat] : undefined,
            href: c.href,
            cta: c.cta ?? 'Read More',
          }))}
        />
      ) : (
        <SectionHead intro={data} />
      )}
      {data.videos && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {data.videos.map((v) => (
            <VideoDialog key={v.url} videoUrl={v.url} title={`${v.name}, ${v.role}`}>
              <button
                type="button"
                className="group flex flex-col border border-carbon-800 text-left transition-transform duration-200 ease-in-out hover:-translate-y-2"
              >
                <Image
                  src={v.thumbnail}
                  alt=""
                  width={640}
                  height={360}
                  className="aspect-video h-auto w-full object-cover"
                />
                <span className="flex flex-1 flex-col gap-4 p-6">
                  <span className="text-body-lg leading-relaxed">{v.quote}</span>
                  <span className="flex flex-col">
                    <span className="font-bold">{v.name}</span>
                    <span className="text-body-sm text-secondary">{v.role}</span>
                  </span>
                  <span className="mt-auto font-bold underline-offset-4 group-hover:underline">
                    Watch the Video
                  </span>
                </span>
              </button>
            </VideoDialog>
          ))}
        </div>
      )}
      {data.stats && <StatsSection stats={data.stats} columns={4} />}
      {data.quote && <FeaturedQuote quote={data.quote} />}
      {data.cta && (
        <div className="flex justify-center">
          <SecondaryButton href={data.cta.href}>{data.cta.text}</SecondaryButton>
        </div>
      )}
    </div>
  )
}

// ─── §9 Resources ────────────────────────────────────────────────────────────

const RESOURCE_ICONS: Record<string, { src: string; alt: string }> = {
  read: { src: 'https://static.pingcap.com/files/2024/10/07235531/resource-1-1.svg', alt: 'read' },
  learn: {
    src: 'https://static.pingcap.com/files/2024/10/07235658/resource-3-1.svg',
    alt: 'Learn',
  },
  lab: { src: 'https://static.pingcap.com/files/2025/05/20200258/TiDB-Labs.svg', alt: 'TiDB Labs' },
}
const RESOURCE_VARIANTS = ['red', 'violet', 'blue', 'teal'] as const

function iconForType(type: string) {
  const t = type.toLowerCase()
  if (t.includes('lab')) return RESOURCE_ICONS.lab
  if (t.includes('case') || t.includes('story') || t.includes('blog')) return RESOURCE_ICONS.learn
  return RESOURCE_ICONS.read
}

export function ResourceCards({ data }: { data: ResourcesData }) {
  return (
    <div className="space-y-10">
      <Intro title={data.title} size="xs" />
      <div className={cn('grid grid-cols-1 gap-6', gridFor(data.items.length))}>
        {data.items.map((r, i) => {
          const icon = iconForType(r.type)
          return (
            <ColorCard
              key={r.href}
              variant={RESOURCE_VARIANTS[i % RESOURCE_VARIANTS.length]}
              icon={
                <Image src={icon.src} alt={icon.alt} width={48} height={48} className="h-12 w-12" />
              }
              title={r.title}
              description={
                <>
                  <span className="mb-2 block font-mono text-eyebrow">{r.type}</span>
                  {r.description}
                </>
              }
              cta={{ text: r.cta, href: r.href }}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── §10 Closing ─────────────────────────────────────────────────────────────

/** Fixed on every solution page: the live "See TiDB in Action" block plus a self-serve button. */
export const SEE_TIDB_IN_ACTION = {
  title: 'See TiDB in Action',
  subtitle: 'Get to know TiDB in the way that fits you best',
  demo: {
    title: 'View Interactive Demos',
    body: 'You’ll learn how to:',
    bullets: [
      'Scale out MySQL workloads with zero downtime',
      'Combine transactional, operational, and AI data in one system',
      'Gain real-time insights and built-in resilience',
    ],
    cta: { text: 'View Now', href: '/demo/' },
    secondaryCta: { text: 'Start for Free', href: 'https://tidbcloud.com/free-trial/' },
    image: {
      src: 'https://static.pingcap.com/files/2025/11/04220532/Mask-group.svg',
      width: 465,
      height: 363,
    },
  },
  formTitle: 'Book a 30-Minute Meeting',
  formSubtitle: 'Please enter your information in the form and we’ll contact you shortly.',
  portalId: '4466002',
  formId: '066e9d00-f659-43b2-8fa5-71fb88dfab59',
}

export function Closing() {
  const c = SEE_TIDB_IN_ACTION
  return (
    <FormSection
      title={c.title}
      subtitle={c.subtitle}
      portalId={c.portalId}
      formId={c.formId}
      demo={c.demo}
      formTitle={c.formTitle}
      formSubtitle={c.formSubtitle}
    />
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function SolutionTemplate({ data }: { data: SolutionPageData }) {
  return (
    <>
      <div data-template-section="hero">
        <SolutionHero
          headline={data.hero.headline}
          subheadline={data.hero.subheadline}
          primaryCta={data.hero.primaryCta}
          secondaryCta={data.hero.secondaryCta}
          backgroundUrl={data.hero.backgroundImage}
        />
      </div>

      <Section kind="logos">
        <LogoRow title={data.logos.title} logos={data.logos.logos} />
      </Section>

      {data.problem && (
        <Section kind="problem">
          <ProblemCards data={data.problem} />
        </Section>
      )}

      <Section kind="solution" style={{ background: 'gradient-dark-bottom' }}>
        <CapabilityCards data={data.solution} />
      </Section>

      {data.workloads && (
        <Section kind="workloads">
          <div className="space-y-16">
            <SectionHead intro={data.workloads} />
            <WorkloadCards
              items={data.workloads.cards.map((c) => ({
                ...c,
                icon: <CardIconView icon={c.icon} size="lg" />,
                body: <RichText text={c.body} />,
              }))}
            />
          </div>
        </Section>
      )}

      {data.howItWorks && (
        <Section kind="how-it-works" style={{ background: 'gradient-dark-top' }}>
          <StepsTimeline data={data.howItWorks} />
        </Section>
      )}

      {data.comparison && (
        <Section kind="comparison">
          <Comparison data={data.comparison} />
        </Section>
      )}

      <Section kind="proof" style={{ background: 'gradient-dark-bottom' }}>
        <CustomerProof data={data.proof} />
      </Section>

      <Section kind="faq">
        <FaqSection title={data.faq.title ?? 'FAQ'} items={data.faq.items} />
      </Section>

      <Section kind="resources">
        <ResourceCards data={data.resources} />
      </Section>

      <Section kind="closing" id="demo">
        <Closing />
      </Section>
    </>
  )
}

/** Plain-text FAQ entries for faqSchema (inline `[label](url)` links reduced to labels). */
export function faqForSchema(faq: FaqData) {
  return faq.items.map((f) => ({ question: f.q, answer: f.a.replace(INLINE_LINK, '$1') }))
}
