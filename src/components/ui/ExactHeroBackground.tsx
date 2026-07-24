'use client'

import { cn } from '@/lib/utils'

interface ExactHeroBackgroundProps {
  className?: string
}

/**
 * Renders the exact ws7 hero animation from the provided HTML export inside an
 * iframe so the motion, bloom, and scene timing match 1:1.
 */
export function ExactHeroBackground({ className }: ExactHeroBackgroundProps) {
  return (
    <iframe
      aria-hidden="true"
      tabIndex={-1}
      src="/ws7/agent-memory-hero-background.html"
      className={cn('pointer-events-none h-full w-full border-0 bg-black', className)}
    />
  )
}
