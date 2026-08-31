'use client'

import { resolveCdnUrl } from '@/lib/cdn-url'
import { cn } from '@/lib/utils'

interface ExactHeroBackgroundProps {
  className?: string
}

const DEFAULT_SRC = '/animations/agent-memory-hero-background.html'

/**
 * Renders the exact hero animation from the provided HTML export inside an
 * iframe so the motion, bloom, and scene timing match 1:1.
 */
export function ExactHeroBackground({ className }: ExactHeroBackgroundProps) {
  // Local dev keeps the /public path; the CDN build (NEXT_PUBLIC_ASSET_PREFIX set)
  // rewrites it to https://static.pingcap.com/launchpad/animations/agent-memory-hero-background.html
  const src = resolveCdnUrl(DEFAULT_SRC)
  return (
    <iframe
      aria-hidden="true"
      tabIndex={-1}
      src={src}
      className={cn('pointer-events-none h-full w-full border-0 bg-black', className)}
    />
  )
}
