'use client'

import { useState, useEffect } from 'react'
import type { PageDSL } from '@/lib/dsl-schema'
import { DslPageRenderer } from '@/lib/dsl-renderer'
import { normalizeDSL } from '@/lib/dsl-utils'

type PreviewFocusTarget = {
  sectionId: string
  imageUrl: string
}

export default function PreviewPage() {
  const [dsl, setDsl] = useState<PageDSL | null>(null)
  const [pendingFocus, setPendingFocus] = useState<PreviewFocusTarget | null>(null)

  // Initial load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('admin-preview-dsl')
    if (stored) {
      try {
        setDsl(normalizeDSL(JSON.parse(stored) as PageDSL))
      } catch {}
    }
  }, [])

  // Signal parent that iframe is ready to receive postMessage updates
  useEffect(() => {
    window.parent?.postMessage({ type: 'preview-ready' }, '*')
  }, [])

  // Real-time DSL updates from parent (no iframe reload needed)
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'preview-dsl') {
        try {
          setDsl(normalizeDSL(e.data.dsl as PageDSL))
        } catch {}
      }
      if (e.data?.type === 'preview-focus') {
        setPendingFocus(e.data.target as PreviewFocusTarget)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  // Report rendered height to parent so iframe can auto-size
  useEffect(() => {
    if (!dsl) return
    const report = () =>
      window.parent?.postMessage(
        { type: 'preview-height', height: document.body.scrollHeight },
        '*'
      )
    report()
    const t = setTimeout(report, 600) // wait for images/fonts to settle
    return () => clearTimeout(t)
  }, [dsl])

  useEffect(() => {
    if (!dsl || !pendingFocus) return

    const applyFocus = () => {
      const section = document.getElementById(pendingFocus.sectionId)
      if (!section) return false

      const images = Array.from(section.querySelectorAll('img'))
      const image =
        images.find((img) => {
          const src = img.getAttribute('src') ?? ''
          return src === pendingFocus.imageUrl || img.currentSrc === pendingFocus.imageUrl
        }) ?? section

      document
        .querySelectorAll('.preview-focus-ring')
        .forEach((node) => node.classList.remove('preview-focus-ring'))

      image.classList.add('preview-focus-ring')
      window.parent?.postMessage(
        {
          type: 'preview-scroll-to',
          top: image.getBoundingClientRect().top + window.scrollY,
        },
        '*'
      )

      window.setTimeout(() => {
        image.classList.remove('preview-focus-ring')
      }, 2400)

      setPendingFocus(null)
      return true
    }

    const frame = window.requestAnimationFrame(() => {
      if (applyFocus()) return
      window.setTimeout(() => {
        applyFocus()
      }, 250)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [dsl, pendingFocus])

  if (!dsl) return <div style={{ padding: 32, color: '#888' }}>Loading…</div>
  return (
    <>
      <style>{`
        .preview-focus-ring {
          outline: 3px solid rgba(80, 157, 234, 0.95);
          outline-offset: 6px;
          box-shadow: 0 0 0 14px rgba(80, 157, 234, 0.18);
          transition: box-shadow 160ms ease, outline-offset 160ms ease;
        }
      `}</style>
      <DslPageRenderer dsl={dsl} withChrome />
    </>
  )
}
