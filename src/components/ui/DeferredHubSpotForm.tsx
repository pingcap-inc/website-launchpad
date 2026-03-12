'use client'

import { useEffect, useRef, useState } from 'react'
import { LazyHubSpotForm } from './LazyHubSpotForm'
import type { HubSpotFormProps } from './HubSpotForm'

interface DeferredHubSpotFormProps extends HubSpotFormProps {
  rootMargin?: string
}

export function DeferredHubSpotForm({
  rootMargin = '200px 0px',
  ...props
}: DeferredHubSpotFormProps) {
  const [shouldMount, setShouldMount] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (shouldMount) return
    const node = containerRef.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setShouldMount(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setShouldMount(true)
        observer.disconnect()
      },
      { rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, shouldMount])

  const mountNow = () => setShouldMount(true)

  return (
    <div
      ref={containerRef}
      onMouseEnter={mountNow}
      onFocusCapture={mountNow}
      onTouchStart={mountNow}
      style={!shouldMount && props.minHeight ? { minHeight: props.minHeight } : undefined}
    >
      {shouldMount ? <LazyHubSpotForm {...props} /> : null}
    </div>
  )
}
