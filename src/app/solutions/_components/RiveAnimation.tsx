'use client'

import { useEffect, useRef, useState } from 'react'
import { Alignment, Fit, Layout, RuntimeLoader, useRive } from '@rive-app/react-canvas'
import { cdnAsset } from '@/lib/cdn-asset'

/**
 * Plays a Rive (.riv) animation, configured like the live WordPress pages:
 * starts once ~30% of it is on screen, autoplays, no state machine,
 * fit "contain" centered.
 *
 * The Rive runtime needs a WASM file. By default it downloads it from unpkg
 * (falling back to jsdelivr); we self-host it instead so the page doesn't depend
 * on a third-party CDN at runtime. The copy in public/ must match the installed
 * @rive-app/canvas version exactly. @rive-app/react-canvas is pinned in
 * package.json for that reason. When upgrading it, copy the new
 * node_modules/@rive-app/canvas/rive.wasm to public/rive/<version>/ and update
 * RIVE_CANVAS_VERSION.
 */
const RIVE_CANVAS_VERSION = '2.52.0'

if (typeof window !== 'undefined') {
  RuntimeLoader.setWasmUrl(cdnAsset(`/rive/${RIVE_CANVAS_VERSION}/rive.wasm`))
}

const LAYOUT = new Layout({ fit: Fit.Contain, alignment: Alignment.Center })

function RivePlayer({ src, label }: { src: string; label: string }) {
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const { RiveComponent } = useRive({ src, autoplay: !reducedMotion, layout: LAYOUT })
  return <RiveComponent className="h-full w-full" role="img" aria-label={label} />
}

export function RiveAnimation({
  src,
  label,
  className,
}: {
  src: string
  /** Accessible description of the animation. */
  label: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The wrapper reserves the animation's space up front, so nothing shifts when it loads.
  return (
    <div ref={ref} className={className}>
      {inView && <RivePlayer src={src} label={label} />}
    </div>
  )
}
