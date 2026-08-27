'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface SlideInProps {
  children: React.ReactNode
  direction?: 'left' | 'right' | 'up'
  delay?: number
  className?: string
  variant?: 'slide' | 'fade'
}

export function SlideIn({
  children,
  direction = 'left',
  delay = 0,
  className,
  variant = 'slide',
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Under prefers-reduced-motion the slide collapses to a plain fade —
  // gentler, not zero.
  const isFade = variant === 'fade'
  const initial = isFade
    ? 'opacity-0'
    : direction === 'left'
      ? 'opacity-0 -translate-x-16 motion-reduce:translate-x-0'
      : direction === 'right'
        ? 'opacity-0 translate-x-16 motion-reduce:translate-x-0'
        : 'opacity-0 translate-y-8 motion-reduce:translate-y-0'

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? (isFade ? 'opacity-100' : 'opacity-100 translate-x-0 translate-y-0') : initial,
        className
      )}
    >
      {children}
    </div>
  )
}
