'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Hero carousel on /solutions/lower-infrastructure-costs/: "TiDB Essential vs MySQL"
 * monthly-cost cards, as on the live WordPress page (embla there; no library here).
 *
 * Figures are copied from the live page's data attributes (`data-value` for prices,
 * `data-percent` for bar widths). They are static marketing numbers for the preset
 * workload below, not computed — update them here if the live page changes.
 */

type Accent = 'red' | 'violet' | 'teal' | 'blue'

export interface CostSlide {
  workload: string
  accent: Accent
  savePercent: number
  tidb: { price: number; barPercent: number }
  mysql: { price: number; barPercent: number }
}

const ACCENT_TEXT: Record<Accent, string> = {
  red: 'text-brand-red-light',
  violet: 'text-brand-violet-light',
  teal: 'text-brand-teal-light',
  blue: 'text-brand-blue-light',
}

const ACCENT_BAR: Record<Accent, string> = {
  red: 'bg-brand-red-medium',
  violet: 'bg-brand-violet-medium',
  teal: 'bg-brand-teal-medium',
  blue: 'bg-brand-blue-medium',
}

const PRESET = '8k QPS • 500 GB storage • balanced read/write • aws-us-east-1'
const AUTOPLAY_MS = 8000

/** Counts a price up from 0 when its slide becomes active (1s ease-out, like live). */
function AnimatedPrice({
  value,
  active,
  delay,
}: {
  value: number
  active: boolean
  delay: number
}) {
  const [shown, setShown] = useState(value)
  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(value)
      return
    }
    let raf = 0
    const timer = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / 1000, 1)
        setShown(value * (1 - Math.pow(1 - t, 3)))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      setShown(0)
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [active, value, delay])
  return <span className="tabular-nums">${shown.toFixed(2)}</span>
}

function CostCard({ slide, active }: { slide: CostSlide; active: boolean }) {
  const rows = [
    { label: 'TiDB Essential', ...slide.tidb, bar: ACCENT_BAR[slide.accent] },
    { label: 'MySQL', ...slide.mysql, bar: 'bg-carbon-800' },
  ]
  return (
    <div className="flex h-full flex-col bg-carbon-900/75 px-4 py-7 sm:px-6 sm:py-9">
      <h3 className="m-0 text-center text-body-xl font-medium leading-snug text-white sm:text-h3-lg">
        Built for Modern{' '}
        <span className={cn('font-bold', ACCENT_TEXT[slide.accent])}>{slide.workload}</span>{' '}
        Workloads
        <br />
        at a Better Price
      </h3>
      <p className="m-0 mt-5 text-center text-body-sm font-medium text-text-secondary">{PRESET}</p>
      <div className="mt-7 flex flex-col gap-6 sm:gap-7 sm:px-6">
        <div className="flex items-baseline justify-between gap-2">
          <p className="m-0 text-body-xl font-medium text-white sm:text-h3-lg">
            You save: <span className={ACCENT_TEXT[slide.accent]}>{slide.savePercent}%</span>
          </p>
          <span className="text-body-sm font-medium text-text-secondary">$ per month</span>
        </div>
        {rows.map((row, i) => (
          <div key={row.label} className="flex flex-col gap-4">
            <span className="text-body-sm font-medium text-white">{row.label}</span>
            <div className="flex items-center justify-between gap-4">
              <div className="h-[19px] flex-1">
                <div
                  className={cn('h-full transition-[width] duration-1000 ease-out', row.bar)}
                  style={{ width: active ? `${row.barPercent}%` : '0%' }}
                />
              </div>
              <span className="text-body-xl font-medium text-white sm:text-h3-lg">
                <AnimatedPrice value={row.price} active={active} delay={120 * i} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CostSavingsCarousel({ slides }: { slides: CostSlide[] }) {
  const [active, setActive] = useState(0)
  const paused = useRef(false)
  const n = slides.length

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % n)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [n])

  return (
    <div
      className="w-full"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-roledescription="carousel"
      aria-label="TiDB Essential vs MySQL monthly cost"
    >
      {/* Active card centered; previous/next peek in at the sides, slightly scaled down.
          All slides share one grid cell, so the carousel is as tall as its tallest card. */}
      <div className="grid overflow-hidden py-3">
        {slides.map((slide, i) => {
          // Signed distance from the active slide, wrapped so neighbours exist on both sides.
          let offset = (i - active + n) % n
          if (offset > n / 2) offset -= n
          const visible = Math.abs(offset) <= 1
          return (
            <div
              key={slide.workload}
              className={cn(
                'col-start-1 row-start-1 mx-auto w-[82%]',
                visible ? 'transition-all duration-500 ease-out' : 'pointer-events-none opacity-0'
              )}
              style={{
                transform: `translateX(${offset * 100}%) scale(${offset === 0 ? 1 : 0.94})`,
              }}
              aria-hidden={offset !== 0}
            >
              <CostCard slide={slide} active={offset === 0} />
            </div>
          )
        })}
      </div>
      <div className="mt-6 flex justify-center gap-3">
        {slides.map((slide, i) => (
          <button
            key={slide.workload}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${slide.workload} workloads`}
            aria-current={i === active}
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              i === active ? 'w-12 bg-white' : 'w-2 bg-carbon-900 hover:bg-carbon-700'
            )}
          />
        ))}
      </div>
    </div>
  )
}
