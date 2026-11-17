/**
 * Low-level building blocks used by <SolutionTemplate> for the /solutions/* pages.
 * Copy lives in each page's data object, not here.
 */
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { HeroSection } from '@/components/sections/HeroSection'
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
  headline: string
  subheadline: string
  primaryCta: LinkItem
  secondaryCta: LinkItem
  backgroundUrl: string
}) {
  return (
    <SectionWrapper
      style={{
        spacing: 'section',
        backgroundImage: { image: { url: backgroundUrl } },
      }}
    >
      <HeroSection
        layout="centered"
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
  className,
}: {
  eyebrow?: string
  title: string
  paragraphs?: ReactNode[]
  align?: 'left' | 'center'
  /** H2 size: lg 64px · md 56px · sm 50px · xs 40px (desktop). Match the live page. */
  size?: 'lg' | 'md' | 'sm' | 'xs'
  className?: string
}) {
  return (
    <SectionHeader
      eyebrow={eyebrow}
      title={title}
      align={align}
      h2Size={size === 'xs' ? 'sm' : size}
      // SectionHeader has no 40px option; override its H2 size for "xs".
      className={cn(size === 'xs' && 'md:[&_h2]:text-h2-mb', className)}
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

// ─── Workload cards (2x2, icon left) ───────────────────────────────────────────

export interface WorkloadItem {
  /** Rendered icon (image or Lucide), sized by the caller. */
  icon: ReactNode
  tag?: string
  title: string
  body: ReactNode
  links?: LinkItem[]
}

/** Two-column grid, icon left, matching the live WordPress "card-workload" layout. */
export function WorkloadCards({ items }: { items: WorkloadItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <div className="shrink-0">{item.icon}</div>
          <div className="flex flex-col gap-4">
            {item.tag && <p className="font-mono text-eyebrow text-secondary m-0">{item.tag}</p>}
            <h3 className="text-h3-lg font-medium leading-snug m-0">{item.title}</h3>
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

// ─── Logo row ──────────────────────────────────────────────────────────────────

export function LogoRow({
  title,
  logos,
}: {
  title: string
  logos: { name: string; src: string; href?: string }[]
}) {
  return (
    <div className="space-y-12">
      <Intro title={title} align="center" size="xs" />
      <LogoCloudSection
        align="center"
        logos={logos.map((l) => ({ name: l.name, image: { url: l.src }, href: l.href }))}
      />
    </div>
  )
}
