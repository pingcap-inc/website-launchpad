'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/**
 * Third-party review badges (Gartner Peer Insights + G2), rendered as two purple
 * cards side by side. Assets are first-party SVGs served from static.pingcap.com.
 *
 * The Gartner card also mounts the live Gartner Peer Insights rating line widget
 * beneath the badge, matching the reference design (badge + "4.x ★ N Ratings" bar).
 *
 * SVGs are used via a plain <img> on purpose: next/image blocks SVG unless
 * `dangerouslyAllowSVG` is set (it is not), and these are absolute CDN URLs that
 * need no asset-prefix rewrite.
 */

const GARTNER_BADGE_SRC =
  'https://static.pingcap.com/files/2025/08/17205455/Gartner-peer-insights-2025.svg'
const GARTNER_REVIEWS_HREF =
  'https://www.gartner.com/reviews/market/cloud-database-management-systems'
const GARTNER_SCRIPT_SRC = 'https://www.gartner.com/reviews/public/Widget/js/widget.js'
const GARTNER_WIDGET_ID = 'NGU0MTQzNTAtYTk3Yi00MDYwLTgwMTYtZmY1N2UxZGFiY2Ix'

const G2_BADGE_SRC = 'https://static.pingcap.com/files/2025/04/24004056/G2.svg'
const G2_REVIEWS_HREF = 'https://www.g2.com/products/tidb/reviews'

declare global {
  interface Window {
    GartnerPI_Widget?: (options: Record<string, unknown>) => void
  }
}

function GartnerRatingWidget({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    const render = () => {
      const container = containerRef.current
      if (cancelled || !container || typeof window.GartnerPI_Widget !== 'function') return
      container.innerHTML = ''
      window.GartnerPI_Widget({
        size: 'line',
        theme: 'light',
        sourcingLink: '',
        widget_id: GARTNER_WIDGET_ID,
        version: '2',
        container,
      })
    }

    if (typeof window.GartnerPI_Widget === 'function') {
      render()
      return () => {
        cancelled = true
      }
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${GARTNER_SCRIPT_SRC}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = GARTNER_SCRIPT_SRC
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', render)

    return () => {
      cancelled = true
      script?.removeEventListener('load', render)
    }
  }, [])

  // The Gartner "line" widget renders at its own fixed width, wider than the
  // card. Center it and keep any overflow inside a scroll region so it never
  // pushes the card/page wider on small screens.
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <div ref={containerRef} className="mx-auto w-max" />
    </div>
  )
}

const cardClass = 'flex flex-col items-center justify-center gap-6 bg-brand-violet-bg px-6 py-10'

export function ReviewBadges({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto w-full', className)}>
      <div className="grid grid-cols-1 gap-4 lg:gap-8 sm:grid-cols-2">
        {/* Gartner Peer Insights — badge + live rating line */}
        <div className={cardClass}>
          <a
            href={GARTNER_REVIEWS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TiDB — Gartner Peer Insights Customers’ Choice for Cloud Database Management Systems"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GARTNER_BADGE_SRC}
              alt="TiDB — Gartner Peer Insights Customers’ Choice for Cloud Database Management Systems"
              width={192}
              height={162}
              loading="lazy"
              className="h-auto max-w-full"
            />
          </a>
          <GartnerRatingWidget />
        </div>

        {/* G2 — linked badge */}
        <a
          href={G2_REVIEWS_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read TiDB reviews on G2"
          className={cardClass}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={G2_BADGE_SRC}
            alt="Read TiDB reviews on G2"
            width={300}
            height={150}
            loading="lazy"
            className="h-auto max-w-full"
          />
        </a>
      </div>
    </div>
  )
}
