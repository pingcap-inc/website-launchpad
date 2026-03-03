'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/** Splits e.g. "$2,000+" into { prefix: "$", target: 2000, suffix: "+", hasComma: true } */
function parseValue(value: string) {
  const m = value.match(/^([^0-9]*)([0-9,]+)([^0-9]*)$/)
  if (!m) return null
  return {
    prefix: m[1],
    target: parseInt(m[2].replace(/,/g, ''), 10),
    suffix: m[3],
    hasComma: m[2].includes(','),
  }
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = parseValue(value)
  const [display, setDisplay] = useState(parsed ? `${parsed.prefix}0${parsed.suffix}` : value)
  const ref = useRef<HTMLSpanElement>(null)
  const done = useRef(false)
  // stable ref so the effect closure stays lint-clean with empty deps
  const parsedRef = useRef(parsed)

  useEffect(() => {
    const p = parsedRef.current
    if (!p) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return
        done.current = true
        io.disconnect()

        const DURATION = 1400
        const startTime = performance.now()

        const tick = (now: number) => {
          const t = Math.min((now - startTime) / DURATION, 1)
          const eased = 1 - Math.pow(1 - t, 3) // cubic ease-out
          const n = Math.round(eased * p.target)
          const fmt = p.hasComma ? n.toLocaleString('en-US') : String(n)
          setDisplay(`${p.prefix}${fmt}${p.suffix}`)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={cn(className)}>
      {display}
    </span>
  )
}
