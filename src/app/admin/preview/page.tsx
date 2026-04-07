'use client'

import { useState, useEffect } from 'react'
import type { PageDSL } from '@/lib/dsl-schema'
import { DslPageRenderer } from '@/lib/dsl-renderer'
import { normalizeDSL } from '@/lib/dsl-utils'

export default function PreviewPage() {
  const [dsl, setDsl] = useState<PageDSL | null>(null)

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

  if (!dsl) return <div style={{ padding: 32, color: '#888' }}>Loading…</div>
  return <DslPageRenderer dsl={dsl} withChrome />
}
