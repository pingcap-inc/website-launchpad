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
  const count = items.length
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  // Current position as an index into the tripled track (0 .. 3*count-1).
  const rawRef = useRef(count)
  const settleRef = useRef<ReturnType<typeof setTimeout>>()
  const snapRef = useRef<ReturnType<typeof setTimeout>>()

  // Three identical copies so the track wraps seamlessly in both directions:
  // scroll lives in the middle copy and is silently recentered when it drifts.
  const loopItems = [...items, ...items, ...items]

  // Width of one copy = offset of the first middle-copy card (children are evenly spaced).
  const copyWidth = useCallback(() => {
    const mid = scrollerRef.current?.children[count] as HTMLElement | undefined
    return mid ? mid.offsetLeft : 0
  }, [count])

  const nearestRaw = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return rawRef.current
    let idx = 0
    let min = Infinity
    for (let i = 0; i < el.children.length; i++) {
      const distance = Math.abs((el.children[i] as HTMLElement).offsetLeft - el.scrollLeft)
      if (distance < min) {
        min = distance
        idx = i
      }
    }
    return idx
  }, [])

  // Jump (no animation) back into the middle copy when scrolling drifts into a
  // clone — invisible because the copies are identical.
  const recenter = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const width = copyWidth()
    if (width <= 0) return
    if (el.scrollLeft < width - 1) el.scrollLeft += width
    else if (el.scrollLeft >= width * 2 - 1) el.scrollLeft -= width
    rawRef.current = nearestRaw()
  }, [copyWidth, nearestRaw])

  const sync = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const raw = nearestRaw()
    rawRef.current = raw
    setActive(((raw % count) + count) % count)
    // Recenter only once scrolling has settled, so a smooth scroll into a clone
    // is allowed to animate before the invisible jump.
    clearTimeout(settleRef.current)
    settleRef.current = setTimeout(recenter, 150)
  }, [count, nearestRaw, recenter])

  // Park in the middle copy on mount, and keep the active card centered on resize.
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const park = () => {
      const logical = ((rawRef.current % count) + count) % count
      const target = el.children[count + logical] as HTMLElement | undefined
      if (target) el.scrollLeft = target.offsetLeft
    }
    park()
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    const onResize = () => {
      park()
      sync()
    }
    window.addEventListener('resize', onResize)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', onResize)
      clearTimeout(settleRef.current)
      clearTimeout(snapRef.current)
    }
  }, [sync, count])

  const goToRaw = useCallback((rawTarget: number) => {
    const el = scrollerRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(rawTarget, el.children.length - 1))
    const child = el.children[clamped] as HTMLElement | undefined
    if (!child) return
    // Mandatory scroll-snap cancels programmatic smooth scrolling in Chromium, so
    // disable snapping for the duration of the animation and restore it after.
    el.style.scrollSnapType = 'none'
    el.scrollTo({ left: child.offsetLeft, behavior: 'smooth' })
    clearTimeout(snapRef.current)
    snapRef.current = setTimeout(() => {
      if (scrollerRef.current) scrollerRef.current.style.scrollSnapType = ''
    }, 700)
  }, [])

  // Dots map to a logical card — scroll to whichever copy instance is closest so
  // the movement is short and the loop stays centered.
  const goToDot = useCallback(
    (logical: number) => {
      const el = scrollerRef.current
      if (!el) return
      const candidates = [logical, count + logical, count * 2 + logical]
      let best = candidates[1]
      let min = Infinity
      for (const c of candidates) {
        const child = el.children[c] as HTMLElement | undefined
        if (!child) continue
        const distance = Math.abs(child.offsetLeft - el.scrollLeft)
        if (distance < min) {
          min = distance
          best = c
        }
      }
      goToRaw(best)
    },
    [count, goToRaw]
  )

  // Auto-advance every AUTOPLAY_MS (loops forever via the seamless track). Paused
  // on hover / focus and when the tab is backgrounded.
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      if (document.hidden) return
      goToRaw(rawRef.current + 1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, goToRaw])

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
        {loopItems.map((item, index) => (
          <div key={`slide-${index}`} className={SLIDE_WIDTH}>
            <Card {...item} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goToRaw(rawRef.current - 1)}
          aria-label="Previous case studies"
          className="flex h-6 w-6 shrink-0 items-center justify-center text-white/50 transition-colors hover:text-white"
        >
          <ChevronLeft size={24} strokeWidth={1.5} />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {items.map((item, index) => (
            <button
              key={`dot-${item.title}-${index}`}
              type="button"
              onClick={() => goToDot(index)}
              aria-label={`Go to case study ${index + 1}`}
              aria-current={index === active}
              className={cn(
                'h-4 w-4 rounded-full transition-colors',
                index === active
                  ? 'bg-white'
                  : 'bg-white/40 ring-1 ring-inset ring-white/50 hover:bg-white/55'
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goToRaw(rawRef.current + 1)}
          aria-label="Next case studies"
          className="flex h-6 w-6 shrink-0 items-center justify-center text-white/50 transition-colors hover:text-white"
        >
          <ChevronRight size={24} strokeWidth={1.5} />
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
