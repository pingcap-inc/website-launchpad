import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { externalLinkProps } from '@/lib/links'
import { cn } from '@/lib/utils'

export interface CaseStudyCardStat {
  value: string
  label: string
}

export interface CaseStudyCardItem {
  badge?: string
  logo?: {
    image: { url: string }
    alt?: string
    width?: number
    height?: number
  }
  title: string
  description: string
  stats: CaseStudyCardStat[]
  href?: string
  cta?: string
}

export interface CaseStudyCardsProps {
  eyebrow?: string
  title: string
  items: CaseStudyCardItem[]
  className?: string
}

function Card({ badge, logo, title, description, stats, href, cta }: CaseStudyCardItem) {
  const Wrapper = href ? 'a' : 'article'

  return (
    <Wrapper
      href={href}
      className={cn(
        'group flex h-full flex-col border border-carbon-900 bg-primary p-6 transition-all duration-200',
        href && 'cursor-pointer'
      )}
      {...(href ? externalLinkProps(href) : {})}
    >
      {badge ? (
        <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f65b67]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f65b67]" />
          <span>{badge}</span>
        </div>
      ) : null}
      {logo?.image?.url ? (
        <div className="mb-6 h-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.image.url}
            alt={logo.alt ?? ''}
            width={logo.width ?? 120}
            height={logo.height ?? 28}
            className="h-full w-auto object-contain object-left"
          />
        </div>
      ) : null}
      <h3 className="text-h3-sm font-bold leading-[1.15] text-white">{title}</h3>
      <p className="mt-5 text-base leading-7 text-secondary font-light">{description}</p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 border-t border-carbon-900 pt-8">
        {stats.map((stat, index) => (
          <div
            key={`${title}-${stat.value}-${index}`}
            className="rounded-lg bg-white/5 border border-carbon-900 px-4 py-4"
          >
            <div className="text-[36px] font-bold leading-none text-white">{stat.value}</div>
            <div className="mt-2 text-sm leading-5 text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-8">
        <SecondaryButton as="span" className="text-white">
          {cta || 'Read the story'}
        </SecondaryButton>
      </div>
    </Wrapper>
  )
}

export function CaseStudyCardsSection({ eyebrow, title, items, className }: CaseStudyCardsProps) {
  return (
    <div className={cn('space-y-10', className)}>
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-4 text-body-sm uppercase tracking-wide text-secondary">{eyebrow}</p>
        ) : null}
        <h2 className="text-h2-mb md:text-h2-md font-bold leading-tight text-white">{title}</h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item, index) => (
          <Card key={`${item.title}-${index}`} {...item} />
        ))}
      </div>
    </div>
  )
}
