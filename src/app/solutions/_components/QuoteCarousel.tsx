'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Horizontal testimonial carousel, matching the live "We Build with TiDB" block:
 * bordered cards (quote mark, quote, avatar, name, role) that loop, with dots.
 */

export interface QuoteItem {
  quote: string
  /** As shown on live, including any leading "@". */
  name: string
  role: string
}

/**
 * Live cycles violet → blue → teal per card: the quote mark takes the color and
 * the avatar is a person illustration in that color's palette (SVGs copied from live).
 */
const CARD_THEMES = [
  { quote: 'text-brand-violet-medium', avatar: '/images/solutions/quote-avatar-violet.svg' },
  { quote: 'text-brand-blue-medium', avatar: '/images/solutions/quote-avatar-blue.svg' },
  { quote: 'text-brand-teal-light', avatar: '/images/solutions/quote-avatar-teal.svg' },
]

/** The live page's curly double-quote glyph (its "general-comma" symbol). */
function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 58 45" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M57.6373 32.8398C57.6373 32.4732 57.6907 32.076 57.6907 31.74C57.6979 29.7397 57.2297 27.7664 56.3246 25.9826C55.4195 24.1988 54.1036 22.6556 52.4851 21.4802C50.8666 20.3047 48.992 19.5307 47.0157 19.2219C45.0394 18.913 43.018 19.0782 41.1181 19.7039C43.3634 14.0753 49.6412 6.53741 53.307 3.15415L50.4049 0C41.6451 7.32404 32.4958 19.0929 32.3965 31.6331L32.3965 31.8317C32.3965 32.2822 32.3965 32.7328 32.45 33.1758C32.7993 36.2621 34.2728 39.1118 36.5893 41.1809C38.9059 43.2501 41.9032 44.3938 45.0092 44.3938C48.1153 44.3938 51.1126 43.2501 53.4291 41.1809C55.7457 39.1118 57.2192 36.2621 57.5685 33.1758L57.6525 33.1758C57.6831 33.0536 57.6525 32.9467 57.6373 32.8398Z"
      />
      <path
        fill="currentColor"
        d="M25.2408 32.8397C25.2408 32.4732 25.2942 32.076 25.2942 31.74C25.3014 29.7397 24.8332 27.7664 23.9281 25.9826C23.0231 24.1988 21.7071 22.6556 20.0886 21.4801C18.4701 20.3047 16.5955 19.5307 14.6192 19.2218C12.6429 18.913 10.6215 19.0782 8.72163 19.7039C10.9669 14.0753 17.2065 6.5374 20.9411 3.15415L18.0237 0C9.25623 7.32403 0.0992863 19.0929 0 31.6331L0 31.8316C0 32.2822 0 32.7328 0.061103 33.1758C0.410429 36.2621 1.88397 39.1118 4.2005 41.1809C6.51703 43.2501 9.51434 44.3938 12.6204 44.3938C15.7265 44.3938 18.7238 43.2501 21.0403 41.1809C23.3568 39.1118 24.8304 36.2621 25.1797 33.1758L25.2637 33.1758C25.2866 33.0536 25.2561 32.9467 25.2408 32.8397Z"
      />
    </svg>
  )
}

const AUTOPLAY_MS = 8000
const GAP_PX = 24

export function QuoteCarousel({ items }: { items: QuoteItem[] }) {
  const n = items.length
  // Render the list twice so the track never runs out; snap back after the last slide.
  const loop = [...items, ...items]
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [step, setStep] = useState(0)
  const firstCard = useRef<HTMLDivElement>(null)
  const paused = useRef(false)

  const measure = useCallback(() => {
    if (firstCard.current) setStep(firstCard.current.offsetWidth + GAP_PX)
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!paused.current) {
        setAnimate(true)
        setIndex((i) => i + 1)
      }
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [])

  // After sliding onto the duplicate of slide 0, jump back to the real one without animation.
  useEffect(() => {
    if (index < n) return
    const t = setTimeout(() => {
      setAnimate(false)
      setIndex((i) => i - n)
    }, 520)
    return () => clearTimeout(t)
  }, [index, n])

  return (
    <div
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-roledescription="carousel"
    >
      <div className="overflow-hidden">
        <div
          className={cn('flex', animate && 'transition-transform duration-500 ease-out')}
          style={{ gap: GAP_PX, transform: `translateX(-${index * step}px)` }}
        >
          {loop.map((item, i) => {
            const theme = CARD_THEMES[(i % n) % CARD_THEMES.length]
            return (
              <div
                key={`${item.name}-${i}`}
                ref={i === 0 ? firstCard : undefined}
                aria-hidden={i % n !== index % n}
                className="flex min-h-[348px] w-[300px] shrink-0 flex-col border border-carbon-900 p-6 sm:w-[361px]"
              >
                <QuoteMark className={cn('h-[29px] w-[29px]', theme.quote)} />
                <p className="m-0 mt-6 flex-1 text-body-md leading-relaxed text-text-secondary">
                  {item.quote}
                </p>
                <div className="mt-6 flex items-center gap-5">
                  <Image
                    src={theme.avatar}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0"
                  />
                  <span className="flex flex-col">
                    <span className="text-body-md text-white">{item.name}</span>
                    <span className="text-body-md font-light text-carbon-700">{item.role}</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-10 flex justify-center gap-3">
        {items.map((item, i) => (
          <button
            key={item.name}
            type="button"
            onClick={() => {
              setAnimate(true)
              setIndex(i)
            }}
            aria-label={`Show quote from ${item.name}`}
            aria-current={i === index % n}
            className={cn(
              'h-2 w-2 rounded-full transition-colors',
              i === index % n ? 'bg-white' : 'bg-carbon-900 hover:bg-carbon-700'
            )}
          />
        ))}
      </div>
    </div>
  )
}
