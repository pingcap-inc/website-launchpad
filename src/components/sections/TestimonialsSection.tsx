'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

interface TestimonialCard {
  quote: string
  author: string
  href?: string
  cta?: string
  logo?: {
    src: string
    alt: string
    size?: number
  }
}

interface TestimonialsSectionProps {
  eyebrow?: string
  title: string
  testimonials: TestimonialCard[]
  className?: string
}

function TestimonialCard({
  quote,
  author,
  href,
  cta,
  logo,
  size = 'lg',
}: TestimonialCard & { size?: 'lg' | 'sm' }) {
  return (
    <div
      className={cn(
        'bg-bg-surface/40 backdrop-blur-sm',
        size === 'lg' ? 'p-6 lg:p-8' : 'p-5',
        'rounded-2xl'
      )}
    >
      <div className={cn('flex gap-6', size === 'lg' ? 'items-start' : 'items-center')}>
        {logo && (
          <div
            className={cn(
              'rounded-full bg-bg-inverse flex items-center justify-center shrink-0',
              size === 'lg' ? 'w-20 h-20' : 'w-14 h-14'
            )}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.size ?? (size === 'lg' ? 64 : 44)}
              height={logo.size ?? (size === 'lg' ? 64 : 44)}
              className="object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <p
            className={cn(
              'text-text-inverse leading-relaxed',
              size === 'lg' ? 'text-body-xl' : 'text-lg'
            )}
          >
            {quote}
          </p>
          <p
            className={cn(
              'text-carbon-400',
              size === 'lg' ? 'text-body-md mt-4' : 'text-body-md mt-3'
            )}
          >
            {author}
          </p>
          {href && cta && (
            <div className="flex justify-end">
              <SecondaryButton className="mt-5" href={href}>
                {cta}
              </SecondaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function TestimonialsSection({
  eyebrow = 'Testimonials',
  title,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const [index, setIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [wrapperHeight, setWrapperHeight] = useState<number | null>(null)
  const [stepHeight, setStepHeight] = useState<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [measureWidth, setMeasureWidth] = useState<number | null>(null)
  const shouldFlip = testimonials.length > 1
  const items = useMemo(() => {
    if (!shouldFlip) return testimonials
    const first = testimonials[index]
    const second = testimonials[(index + 1) % testimonials.length]
    const third = testimonials[(index + 2) % testimonials.length]
    return [first, second, third]
  }, [index, shouldFlip, testimonials])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useLayoutEffect(() => {
    const wrapperEl = wrapperRef.current
    if (!wrapperEl) return
    const measureWidthNow = () => setMeasureWidth(wrapperEl.clientWidth)
    measureWidthNow()
    const observer = new ResizeObserver(measureWidthNow)
    observer.observe(wrapperEl)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (!shouldFlip) {
      setWrapperHeight(null)
      return
    }
    const listEl = listRef.current
    const measureEl = measureRef.current
    if (!listEl || !measureEl) return

    const measure = () => {
      const styles = window.getComputedStyle(listEl)
      const gap = parseFloat(styles.rowGap || styles.gap || '0')
      const children = Array.from(measureEl.children) as HTMLElement[]
      if (!children.length) return
      const maxHeight = Math.max(...children.map((child) => child.offsetHeight))
      setWrapperHeight(maxHeight * 2 + gap)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(measureEl)
    return () => observer.disconnect()
  }, [shouldFlip, testimonials])

  useLayoutEffect(() => {
    if (!shouldFlip) {
      setStepHeight(null)
      return
    }
    const listEl = listRef.current
    if (!listEl) return

    const measure = () => {
      const styles = window.getComputedStyle(listEl)
      const gap = parseFloat(styles.rowGap || styles.gap || '0')
      const first = listEl.children[0] as HTMLElement | undefined
      if (!first) return
      setStepHeight(first.offsetHeight + gap)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(listEl)
    return () => observer.disconnect()
  }, [shouldFlip, index])

  useEffect(() => {
    if (!shouldFlip || reducedMotion) return
    const interval = window.setInterval(() => {
      if (!stepHeight) return
      setAnimating(true)
      window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length)
        setAnimating(false)
      }, 700)
    }, 4000)
    return () => window.clearInterval(interval)
  }, [shouldFlip, reducedMotion, testimonials.length, stepHeight])

  return (
    <section className={cn('py-section-sm lg:py-section-md', className)}>
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="md:col-span-5">
            <p className="text-body-sm text-carbon-400 tracking-wide uppercase mb-4">{eyebrow}</p>
            <h2 className="text-h2-mb md:text-h2-md font-bold leading-tight text-text-inverse">
              {title}
            </h2>
          </div>
          <div className="md:col-span-7">
            <div
              ref={wrapperRef}
              className={cn('relative overflow-hidden', shouldFlip && 'mask-bottom-fade')}
              style={shouldFlip && wrapperHeight ? { height: `${wrapperHeight}px` } : undefined}
            >
              <div
                ref={listRef}
                className={cn(
                  'flex flex-col gap-6',
                  shouldFlip && animating
                    ? 'transition-transform duration-700 ease-in-out'
                    : 'transition-none'
                )}
                style={
                  shouldFlip && stepHeight
                    ? {
                        transform: animating ? `translateY(-${stepHeight}px)` : 'translateY(0)',
                      }
                    : undefined
                }
              >
                {items.map((card, itemIndex) => (
                  <div key={`${card.quote}-${itemIndex}`}>
                    <TestimonialCard {...card} size="lg" />
                  </div>
                ))}
              </div>
              {shouldFlip && (
                <div
                  ref={measureRef}
                  className="absolute left-0 top-0 -z-10 opacity-0 pointer-events-none"
                  style={measureWidth ? { width: `${measureWidth}px` } : undefined}
                >
                  {testimonials.map((card, itemIndex) => (
                    <div key={`${card.quote}-measure-${itemIndex}`} className="mb-4 last:mb-0">
                      <TestimonialCard {...card} size="lg" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
