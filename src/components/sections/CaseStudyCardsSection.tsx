'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

/** More than this many cards flips the section into carousel mode. */
const CAROUSEL_THRESHOLD = 3

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
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#e54545]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e54545]" />
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
      <p className="mt-5 text-base leading-7 text-secondary font-light flex-1">{description}</p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 border-t border-carbon-900 py-8">
        {stats.map((stat, index) => (
          <div
            key={`${title}-${stat.value}-${index}`}
            className="rounded-lg bg-white/5 border border-carbon-900 px-4 py-4"
          >
            <div className="text-[36px] font-bold leading-none text-white">{stat.value}</div>
            <div className="mt-2 min-h-10 text-sm leading-5 text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <SecondaryButton as="span" className="text-white">
          {cta || 'Read the story'}
        </SecondaryButton>
      </div>
    </Wrapper>
  )
}

/** Responsive card width — one card per "slide", 3 across on desktop. */
const SLIDE_WIDTH = 'w-[85%] shrink-0 snap-start sm:w-[360px] lg:w-[calc((100%-2rem)/3)]'

/** Auto-advance interval in ms. */
const AUTOPLAY_MS = 4000

function CaseStudyCarousel({ items }: { items: CaseStudyCardItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [paused, setPaused] = useState(false)
  // Mirror `active` into a ref so the autoplay interval reads the latest index
  // without needing to reset the timer on every scroll.
  const activeRef = useRef(0)
  useEffect(() => {
    activeRef.current = active
  }, [active])

  const sync = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    let idx = 0
    let min = Infinity
    children.forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - el.scrollLeft)
      if (distance < min) {
        min = distance
        idx = i
      }
    })
    setActive(idx)
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [sync])

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollerRef.current
      if (!el) return
      const clamped = Math.max(0, Math.min(index, items.length - 1))
      const child = el.children[clamped] as HTMLElement | undefined
      if (child) el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
    },
    [items.length]
  )

  // Auto-advance every AUTOPLAY_MS, looping back to the start. Paused on hover /
  // focus and when the tab is backgrounded; skipped entirely for users who
  // prefer reduced motion.
  useEffect(() => {
    if (paused) return
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }
    const id = window.setInterval(() => {
      if (document.hidden) return
      scrollToIndex((activeRef.current + 1) % items.length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, scrollToIndex, items.length])

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={scrollerRef}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className={SLIDE_WIDTH}>
            <Card {...item} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollToIndex(active - 1)}
          disabled={atStart}
          aria-label="Previous case studies"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white/70"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={`dot-${item.title}-${index}`}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to case study ${index + 1}`}
              aria-current={index === active}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-colors',
                index === active ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToIndex(active + 1)}
          disabled={atEnd}
          aria-label="Next case studies"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white/70"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

export function CaseStudyCardsSection({ eyebrow, title, items, className }: CaseStudyCardsProps) {
  const isCarousel = items.length > CAROUSEL_THRESHOLD

  return (
    <div className={cn('space-y-10', className)}>
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-4 text-body-sm uppercase tracking-wide text-secondary">{eyebrow}</p>
        ) : null}
        <h2 className="text-h2-mb md:text-h2-md font-bold leading-tight text-white">{title}</h2>
      </div>
      {isCarousel ? (
        <CaseStudyCarousel items={items} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((item, index) => (
            <Card key={`${item.title}-${index}`} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}
