'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Five-step horizontal timeline from the live /solutions/fintech/ page
 * ("How TiDB Simplifies Fintech Adoption"): steps 1, 3 and 5 sit above a
 * horizontal line, steps 2 and 4 below it, and five coloured dots mark the line,
 * which ends in an arrow. Below `lg` it falls back to a vertical timeline.
 *
 * Positions were measured on live at 1440px: line 192px down, dots at
 * 0/20/40/60/80%, step 3 at 33.5%, step 5 at 67%.
 *
 * Animation matches live (a GSAP timeline there): once the block enters the
 * viewport, the steps fade in one after another, 1 → 5, 0.5s each. The line and
 * dots stay static. Reduced-motion users see the steps at once.
 *
 * Ported from the [fintech-adoption-steps] shortcode in the parked fintech DSL
 * work; copy now comes from the page like the other solutions sections.
 */

export interface TimelineStep {
  icon: string
  alt: string
  title: string
  body: string
}

/** Dot colours along the line, in step order. */
const DOT_CLASSES = [
  'bg-brand-red-primary',
  'bg-brand-violet-medium',
  'bg-brand-blue-medium',
  'bg-brand-teal-medium',
  'bg-brand-red-primary',
]

/** Sequential fade-in: step N starts when step N-1 has finished (0.5s each). */
const FADE_DELAYS = ['delay-0', 'delay-500', 'delay-1000', 'delay-[1500ms]', 'delay-[2000ms]']

function fadeClass(visible: boolean, stepIndex: number) {
  return cn(
    'transition-opacity duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100',
    FADE_DELAYS[stepIndex],
    visible ? 'opacity-100' : 'opacity-0'
  )
}

/** Dots are evenly spaced at 0, 20, 40, 60 and 80% of the line. */
const DOT_POSITIONS = ['left-0', 'left-[20%]', 'left-[40%]', 'left-[60%]', 'left-[80%]']

/** Desktop position of each step: top row (1, 3, 5) or bottom row (2, 4). */
const DESKTOP_POSITIONS = [
  'left-0 top-0',
  'left-[20%] top-[225px]',
  'left-[33.5%] top-0',
  'left-[60%] top-[225px]',
  'left-[67%] top-0',
]

function StepContent({ step, className }: { step: TimelineStep; className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <Image src={step.icon} alt={step.alt} width={40} height={40} className="h-10 w-10" />
      <h3 className="m-0 mt-5 text-h3-lg font-bold leading-[32px]">{step.title}</h3>
      <p className="m-0 mt-1.5 text-body-md leading-[26px] text-secondary">{step.body}</p>
    </div>
  )
}

export function StepsTimeline({
  steps,
  className,
}: {
  /** Exactly five steps; the desktop layout is positioned for five. */
  steps: TimelineStep[]
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Fires as soon as any part of the block enters the viewport ("top 100%").
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {/* Mobile / tablet: vertical timeline — a grey line down the left with a
          coloured dot level with each icon, ending in a downward arrow. */}
      <ol className="m-0 list-none p-0 pl-1.5 lg:hidden">
        {steps.map((step, i) => {
          const isFirst = i === 0
          const isLast = i === steps.length - 1
          return (
            <li
              key={step.title}
              className={cn('relative pl-8', !isLast && 'pb-12', fadeClass(visible, i))}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute bottom-0 left-0 w-px bg-carbon-700',
                  isFirst ? 'top-4' : 'top-0'
                )}
              >
                {isLast && (
                  <span className="absolute -left-[3.5px] bottom-0.5 h-0 w-0 border-x-4 border-t-8 border-x-transparent border-t-white" />
                )}
              </span>
              <span
                aria-hidden="true"
                className={cn('absolute -left-1.5 top-4 h-3 w-3 rounded-full', DOT_CLASSES[i])}
              />
              <StepContent step={step} />
            </li>
          )
        })}
      </ol>

      {/* Desktop: visual order 1 3 5 / line / 2 4; DOM order stays 1–5. */}
      <div className="relative hidden h-[365px] lg:block">
        {/* The line sits under the 192px top row; the bottom row starts 32px below it. */}
        <div aria-hidden="true" className="absolute inset-x-0 top-48 h-px bg-carbon-700">
          {DOT_CLASSES.map((dot, i) => (
            <span
              key={i}
              className={cn('absolute -top-[5px] h-3 w-3 rounded-full', dot, DOT_POSITIONS[i])}
            />
          ))}
          <span className="absolute -top-1 right-0 h-0 w-0 border-y-4 border-l-8 border-y-transparent border-l-white" />
        </div>
        <ol className="m-0 list-none p-0">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className={cn('absolute w-1/3 pr-4', DESKTOP_POSITIONS[i], fadeClass(visible, i))}
            >
              <StepContent step={step} className="pt-4" />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
