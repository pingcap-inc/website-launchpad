/**
 * Building blocks shared by the hand-written /solutions/* pages
 * (fintech, saas, e-commerce, modernize-mysql-workloads, enable-operational-intelligence).
 *
 * These mirror the section layouts of the original WordPress solution pages
 * using the repo's design tokens. Copy lives in each page file, not here.
 */
import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { externalLinkProps } from '@/lib/links'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeatureHighlightsSection } from '@/components/sections/FeatureHighlightsSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { FormSection } from '@/components/sections/FormSection'
import { LogoCloudSection } from '@/components/sections/LogoCloudSection'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

export interface LinkItem {
  text: string
  href: string
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

export function SolutionHero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  backgroundUrl,
}: {
  /** Plain text, or a node for styled headlines (e.g. web3's gradient first line). */
  headline: ReactNode
  subheadline: string
  primaryCta: LinkItem
  secondaryCta: LinkItem
  /** Optional hero background image. Omit for a plain dark hero (e.g. the costs page). */
  backgroundUrl?: string
}) {
  return (
    <SectionWrapper
      style={{
        // 'hero' = no outer padding; the vertical rhythm comes from HeroSection's
        // own `pt-10 md:py-20` plus the className below.
        spacing: 'hero',
        ...(backgroundUrl ? { backgroundImage: { image: { url: backgroundUrl } } } : {}),
      }}
    >
      <HeroSection
        layout="centered"
        // Live WordPress banner padding (top/bottom): 60/40 mobile, 120/200 from
        // 1024px. Added to HeroSection's inner pt-10 md:py-20, that gives
        // 60/40 mobile, 80/80 tablet (live 60/60) and 120/200 desktop.
        className="pb-10 pt-5 md:pb-0 md:pt-0 lg:pb-[120px] lg:pt-10"
        headline={headline}
        subheadline={subheadline}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />
    </SectionWrapper>
  )
}

// ─── Section intro (H2 + one or more paragraphs) ───────────────────────────────

export function Intro({
  eyebrow,
  title,
  paragraphs = [],
  align = 'left',
  size = 'lg',
  fullWidth = false,
  className,
}: {
  eyebrow?: string
  title: string
  paragraphs?: ReactNode[]
  align?: 'left' | 'center'
  /** H2 size: lg 64px · md 56px · sm 50px · xs 40px (desktop). Match the live page. */
  size?: 'lg' | 'md' | 'sm' | 'xs'
  /** Drop the default title/subtitle max-width (live "Resources" headings span the row). */
  fullWidth?: boolean
  className?: string
}) {
  return (
    <SectionHeader
      eyebrow={eyebrow}
      title={title}
      align={align}
      fullWidth={fullWidth}
      h2Size={size === 'xs' ? 'sm' : size}
      className={cn(
        // SectionHeader has no 40px option; override its H2 size for "xs".
        size === 'xs' && 'md:[&_h2]:text-h2-mb',
        // Live centered section headings sit in a 1050px column with the intro at 840px.
        align === 'center' &&
          !fullWidth &&
          '[&>h2]:mx-auto [&>h2]:max-w-[1050px] [&>p]:max-w-[840px]',
        className
      )}
      subtitle={
        paragraphs.length > 0 ? (
          <span className="flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <span key={i} className="block">
                {p}
              </span>
            ))}
          </span>
        ) : undefined
      }
    />
  )
}

// ─── Media rows (text + illustration) ─────────────────────────────────────────

/** Text side of a FeatureMediaSection row, sized to the live pages (42px H3, 22px body). */
export function MediaText({ title, description }: { title: string; description: string }) {
  return (
    <>
      <h3 className="text-h3-xl md:text-h2-mb font-bold leading-tight mb-6">{title}</h3>
      <p className="text-body-2xl text-secondary leading-relaxed m-0">{description}</p>
    </>
  )
}

/** Adds the live-sized text block to FeatureMediaSection items. */
export function withMediaText<T extends { title: string; description: string }>(item: T) {
  return { ...item, content: <MediaText title={item.title} description={item.description} /> }
}

// ─── Workload cards (single column, icon left) ─────────────────────────────────

export interface WorkloadItem {
  icon: { src: string; alt: string }
  tag?: string
  title: string
  body: ReactNode
  links?: LinkItem[]
  /** Optional colored border class (e.g. 'border-brand-teal-medium'); wraps the card in a box. */
  borderColor?: string
}

/** Two-column grid, icon left, matching the live WordPress "card-workload" layout. */
export function WorkloadCards({ items }: { items: WorkloadItem[] }) {
  const bordered = items.some((i) => i.borderColor)
  return (
    <div
      className={cn('grid grid-cols-1 lg:grid-cols-2', bordered ? 'gap-6' : 'gap-x-12 gap-y-16')}
    >
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            'flex flex-col gap-6',
            // Bordered variant (web3 on live): 60px icon stacked above the title.
            // Borderless variant: icon left of the text.
            item.borderColor
              ? `border ${item.borderColor} bg-black p-8`
              : 'sm:flex-row sm:items-start sm:gap-8'
          )}
        >
          <Image
            src={item.icon.src}
            alt={item.icon.alt}
            width={item.borderColor ? 60 : 120}
            height={item.borderColor ? 60 : 120}
            className={cn(
              'shrink-0',
              item.borderColor ? 'h-[60px] w-[60px]' : 'h-24 w-24 sm:h-[120px] sm:w-[120px]'
            )}
          />
          <div className="flex flex-col gap-4">
            {item.tag && <p className="font-mono text-eyebrow text-secondary m-0">{item.tag}</p>}
            <h3
              className={cn(
                'text-h3-lg leading-snug m-0',
                item.borderColor ? 'font-bold' : 'font-medium'
              )}
            >
              {item.title}
            </h3>
            <p className="text-body-md leading-relaxed text-secondary m-0">{item.body}</p>
            {item.links && item.links.length > 0 && (
              <div className="mt-2 flex flex-col items-start gap-3">
                {item.links.map((l) => (
                  <SecondaryButton key={l.href + l.text} href={l.href}>
                    {l.text}
                  </SecondaryButton>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Icon grid (image icon on top, H3, body) ───────────────────────────────────

export interface IconGridItem {
  icon: { src: string; alt: string }
  title: string
  body?: ReactNode
  extra?: ReactNode
}

const gridCols = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
} as const

const ICON_SIZE_CLASS = {
  40: 'h-10 w-10',
  50: 'h-[50px] w-[50px]',
  96: 'h-24 w-24',
  120: 'h-[120px] w-[120px]',
  150: 'h-[150px] w-[150px]',
} as const

export function IconGrid({
  items,
  columns = 3,
  iconSize = 96,
  horizontal = false,
  centered = false,
}: {
  items: IconGridItem[]
  columns?: 2 | 3 | 4
  iconSize?: keyof typeof ICON_SIZE_CLASS
  /** Icon to the left of the text instead of above it. */
  horizontal?: boolean
  /** Center the icon and text in each item (e.g. modernize-mysql's pain points). */
  centered?: boolean
}) {
  return (
    <div className={cn('grid grid-cols-1', centered ? 'gap-8' : 'gap-10', gridCols[columns])}>
      {items.map((item) => (
        <div
          key={item.title}
          className={cn(
            'flex gap-6',
            horizontal ? 'flex-row' : 'flex-col',
            centered && 'items-center text-center'
          )}
        >
          <Image
            src={item.icon.src}
            alt={item.icon.alt}
            width={iconSize}
            height={iconSize}
            className={cn('shrink-0', ICON_SIZE_CLASS[iconSize])}
          />
          <div className={cn('flex flex-col', centered ? 'gap-5' : 'gap-3')}>
            <h3 className="text-h3-sm md:text-h3-lg font-bold leading-normal m-0">{item.title}</h3>
            {item.body && (
              <p className="text-body-md leading-relaxed text-secondary m-0">{item.body}</p>
            )}
            {item.extra}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Dotted step columns (line across the top, one coloured dot per step) ─────

export interface DottedStep {
  icon: { src: string; alt: string }
  title: string
  body: ReactNode
  extra?: ReactNode
}

/** Dot colours in step order, as on live (teal, violet, red, blue). */
const STEP_DOTS = [
  'bg-brand-teal-medium',
  'bg-brand-violet-medium',
  'bg-brand-red-primary',
  'bg-brand-blue-medium',
]

/**
 * Four step columns under a line that ends in an arrow, matching the live
 * modernize-mysql "Adoption Made Simple" block (1440px): equal columns, steps
 * 2–4 inset 32px so each 12px dot sits at its column's text start, 50px icon
 * 33px below the line, title 22px below the icon. Below `lg` each step gets its
 * own top rule with the dot on it.
 */
export function DottedSteps({ items }: { items: DottedStep[] }) {
  return (
    <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4 lg:gap-x-0 lg:gap-y-0">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 hidden h-px bg-carbon-700 lg:block"
      >
        <span className="absolute -top-1 right-0 h-0 w-0 border-y-4 border-l-8 border-y-transparent border-l-white" />
      </div>
      {items.map((item, i) => (
        <div
          key={item.title}
          className={cn(
            'relative border-t border-carbon-700 pt-8 lg:border-t-0 lg:pt-[33px]',
            i > 0 && 'lg:pl-8'
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'absolute -top-1.5 left-0 h-3 w-3 rounded-full',
              i > 0 && 'lg:left-8',
              STEP_DOTS[i % STEP_DOTS.length]
            )}
          />
          <Image
            src={item.icon.src}
            alt={item.icon.alt}
            width={50}
            height={50}
            className="h-[50px] w-[50px]"
          />
          <h3 className="mb-0 mt-[22px] text-h3-lg font-bold leading-[30px]">{item.title}</h3>
          <p className="mb-0 mt-5 text-body-md leading-relaxed text-secondary">{item.body}</p>
          {item.extra}
        </div>
      ))}
    </div>
  )
}

// ─── Logo row ──────────────────────────────────────────────────────────────────

export function LogoRow({
  title,
  logos,
}: {
  title: string
  logos: { name: string; src: string; href?: string }[]
}) {
  // Live solution pages: a static, centered row (no marquee), each logo 165px wide
  // with height from its aspect ratio, 32px apart, under a 36px heading.
  return (
    <div className="space-y-14">
      <Intro title={title} align="center" size="xs" fullWidth className="md:[&_h2]:text-[36px]" />
      <LogoCloudSection
        align="center"
        autoScroll={false}
        logoClassName="h-auto w-[165px]"
        className="[&>div:last-child]:gap-8"
        logos={logos.map((l) => ({ name: l.name, image: { url: l.src }, href: l.href }))}
      />
    </div>
  )
}

// ─── Case cards (logo, H3, short result, "Read More") ──────────────────────────

export interface CaseCardItem {
  logo: { src: string; alt: string }
  title: string
  body: string
  href: string
}

function CaseCard({ item, className }: { item: CaseCardItem; className?: string }) {
  return (
    <a
      href={item.href}
      {...externalLinkProps(item.href)}
      className={cn(
        'group flex flex-col transition-transform duration-200 ease-in-out hover:-translate-y-2',
        className
      )}
    >
      <Image
        src={item.logo.src}
        alt={item.logo.alt}
        width={160}
        height={30}
        className="h-[30px] w-auto max-w-[180px] object-contain object-left"
      />
      <h3 className="mb-0 mt-8 text-h3-lg font-bold leading-snug">{item.title}</h3>
      <p className="mb-0 mt-5 text-body-md leading-relaxed text-secondary">{item.body}</p>
      <div className="mt-4">
        <SecondaryButton as="span">Read More</SecondaryButton>
      </div>
    </a>
  )
}

/**
 * Case-study grid, laid out like the live solution pages: a 4-column grid where
 * the intro spans columns 1–2 of the first row, the first case sits in column 4
 * beside it, and the remaining cases fill the row below. Borderless cards:
 * 30px-tall logo, title, short result, "Read More ↗".
 */
export function CaseCards({ intro, items }: { intro?: ReactNode; items: CaseCardItem[] }) {
  const [first, ...rest] = items
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-y-[72px]">
      {intro && <div className="md:col-span-2">{intro}</div>}
      {first && <CaseCard item={first} className={cn(intro && 'lg:col-start-4')} />}
      {rest.map((item) => (
        <CaseCard key={item.href} item={item} />
      ))}
    </div>
  )
}

// ─── Quote cards ("Customers Give TiDB 4.9 Stars") ─────────────────────────────

export interface QuoteCardItem {
  logo: { src: string; alt: string }
  quote: string
  name: string
  role: string
  href: string
}

export function CustomerRatingQuotes({ items }: { items: QuoteCardItem[] }) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col items-center gap-6 text-center">
        <Image
          src="https://static.pingcap.com/files/2025/08/17212019/cc_award_logo_general_2025.svg"
          alt="Gartner Peer Insights"
          width={160}
          height={160}
          className="h-auto w-[140px]"
        />
        <h2 className="text-h2-mb md:text-h2-lg font-bold leading-tight m-0">
          Customers Give TiDB 4.9 Stars
        </h2>
        <Image
          src="https://static.pingcap.com/files/2024/11/06192433/stars.svg"
          alt="stars"
          width={180}
          height={32}
          className="h-auto w-[180px]"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex flex-col gap-6 border border-carbon-300 bg-white p-8 transition-transform duration-200 ease-in-out hover:-translate-y-2"
          >
            <Image
              src={item.logo.src}
              alt={item.logo.alt}
              width={140}
              height={40}
              className="h-10 w-auto object-contain object-left"
            />
            <p className="text-body-md leading-relaxed m-0 flex-1">{item.quote}</p>
            <p className="text-body-sm font-bold m-0">
              {item.name}
              <br />
              {item.role}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Resources row ─────────────────────────────────────────────────────────────

export interface ResourceCard {
  title: string
  description: string
  cta: LinkItem
  icon: { src: string; alt: string }
}

export const DEFAULT_RESOURCES: ResourceCard[] = [
  {
    title: 'Modernizing MySQL',
    description: 'Dynamic scaling on reads and writes while providing strong consistency.',
    cta: { text: 'Read', href: '/blog/why-distributed-sql-databases-elevate-modern-app-dev/' },
    icon: {
      src: 'https://static.pingcap.com/files/2024/10/07235531/resource-1-1.svg',
      alt: 'read',
    },
  },
  {
    title: 'Hands-on Labs',
    description: 'Dive in and master TiDB’s unique capabilities through hands-on practice.',
    cta: { text: 'Explore', href: 'https://labs.tidb.io/?utm_source=website_en&utm_medium=direct' },
    icon: {
      src: 'https://static.pingcap.com/files/2025/05/20200258/TiDB-Labs.svg',
      alt: 'TiDB Labs',
    },
  },
  {
    title: 'Blogs',
    description:
      'Stay updated with the latest insights, tips, and industry trends from experts in database technologies.',
    cta: { text: 'Learn', href: '/blog/' },
    icon: {
      src: 'https://static.pingcap.com/files/2024/10/07235658/resource-3-1.svg',
      alt: 'Learn',
    },
  },
  {
    title: 'Community',
    description:
      'Become part of the TiDB community and connect with other like minded users and developers.',
    cta: { text: 'Join', href: 'https://discord.com/invite/vYU9h56kAX' },
    icon: {
      src: 'https://static.pingcap.com/files/2024/10/07235757/resource-4-1.svg',
      alt: 'join',
    },
  },
]

const RESOURCE_VARIANTS = ['red', 'violet', 'blue', 'teal'] as const

export function ResourcesRow({
  title,
  items = DEFAULT_RESOURCES,
  titleSize = 'xs',
  titleAlign = 'center',
}: {
  title: string
  items?: ResourceCard[]
  /** Heading size; most live solution pages use ~40px ('xs'), costs uses 56px ('md'). */
  titleSize?: 'lg' | 'md' | 'sm' | 'xs'
  /** Most live solution pages center this heading; costs left-aligns it. */
  titleAlign?: 'left' | 'center'
}) {
  // ColorCard tuned to the live solution pages' resource card: 16/16/26px padding,
  // 60×80 icon with the title 32px below it, "Read ↗" pinned bottom-right.
  return (
    <SectionWrapper>
      <Intro title={title} size={titleSize} align={titleAlign} fullWidth className="mb-10" />
      <FeatureHighlightsSection
        columns={4}
        cardClassName="px-4 pt-4 pb-[26px] lg:min-h-[358px]"
        items={items.map((r, i) => ({
          variant: RESOURCE_VARIANTS[i % RESOURCE_VARIANTS.length],
          title: r.title,
          description: r.description,
          cta: r.cta,
          ctaAlign: 'end' as const,
          icon: (
            <Image
              src={r.icon.src}
              alt={r.icon.alt}
              width={60}
              height={80}
              // ColorCard puts 24px under the icon; +8px gives live's 32px.
              className="mb-2 h-20 w-[60px] object-contain"
            />
          ),
        }))}
      />
    </SectionWrapper>
  )
}

// ─── Violet CTA band ───────────────────────────────────────────────────────────

export function CtaBand({ title }: { title: string }) {
  return (
    <SectionWrapper style={{ background: 'brand-violet' }}>
      <CtaSection
        title={title}
        image={{
          image: { url: 'https://static.pingcap.com/files/2024/10/07235318/cta-1-1.svg' },
          alt: 'CTA',
          width: 278,
          height: 256,
        }}
        primaryCta={{ text: 'Start for Free', href: 'https://tidbcloud.com/free-trial/' }}
      />
    </SectionWrapper>
  )
}

// ─── "See TiDB in Action" footer block ─────────────────────────────────────────

/** Left column of "See TiDB in Action", copied verbatim from the live WordPress pages. */
export const VIEW_INTERACTIVE_DEMOS = {
  title: 'View Interactive Demos',
  body: 'You’ll learn how to:',
  bullets: [
    'Scale out MySQL workloads with zero downtime',
    'Combine transactional, operational, and AI data in one system',
    'Gain real-time insights and built-in resilience',
  ],
  cta: { text: 'View Now', href: '/demo/' },
  image: {
    src: 'https://static.pingcap.com/files/2025/11/04220532/Mask-group.svg',
    width: 465,
    height: 363,
  },
}

/** The meeting form most live solution pages post to. */
const DEMO_FORM_ID = '066e9d00-f659-43b2-8fa5-71fb88dfab59'

export function SeeTidbInAction({
  formId = DEMO_FORM_ID,
  headerAlign = 'center',
}: {
  /** HubSpot form ID; must match the live page (costs uses its own form). */
  formId?: string
  headerAlign?: 'center' | 'left'
} = {}) {
  return (
    <SectionWrapper id="demo">
      <FormSection
        title="See TiDB in Action"
        subtitle="Get to know TiDB in the way that fits you best"
        portalId="4466002"
        formId={formId}
        headerAlign={headerAlign}
        demo={VIEW_INTERACTIVE_DEMOS}
        formTitle="Book a 30-Minute Meeting"
        formSubtitle="Please enter your information in the form and we’ll contact you shortly."
      />
    </SectionWrapper>
  )
}
