'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/** The animation reports its responsive height from an opaque sandbox origin. */
export function CloudLakeArchitecture({ className }: { className?: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    function receive(event: MessageEvent) {
      if (event.source !== frame?.contentWindow || event.data?.type !== 'cloud-lake-height') return
      const nextHeight = event.data.height
      if (
        typeof nextHeight === 'number' &&
        Number.isFinite(nextHeight) &&
        nextHeight >= 200 &&
        nextHeight <= 5000
      ) {
        setHeight(Math.ceil(nextHeight))
      }
    }
    function sendVisibility(visible: boolean) {
      frame?.contentWindow?.postMessage({ type: 'cloud-lake-visibility', visible }, '*')
    }
    const observer = new IntersectionObserver(([entry]) => sendVisibility(entry.isIntersecting))
    observer.observe(frame)
    window.addEventListener('message', receive)
    return () => {
      observer.disconnect()
      window.removeEventListener('message', receive)
    }
  }, [])

  return (
    <div className={cn('w-full overflow-hidden', className)}>
      <iframe
        ref={frameRef}
        src="/animations/cloud-lake-architecture.html"
        title="Animated TiDB Cloud Lake architecture and data flow"
        sandbox="allow-scripts"
        loading="lazy"
        scrolling="no"
        onLoad={() => {
          const frame = frameRef.current
          if (!frame) return
          const rect = frame.getBoundingClientRect()
          frame.contentWindow?.postMessage(
            {
              type: 'cloud-lake-visibility',
              visible: rect.bottom > 0 && rect.top < window.innerHeight,
            },
            '*'
          )
        }}
        className={cn('block w-full border-0', !height && 'h-[1800px] md:h-[1000px] xl:h-[650px]')}
        style={height ? { height } : undefined}
      />
    </div>
  )
}
