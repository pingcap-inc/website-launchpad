'use client'

import { useState, useEffect } from 'react'
import type { PageDSL } from '@/lib/dsl-schema'
import { DslPageRenderer } from '@/lib/dsl-renderer'

export default function PreviewPage() {
  const [dsl, setDsl] = useState<PageDSL | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('admin-preview-dsl')
    if (stored) {
      try {
        setDsl(JSON.parse(stored))
      } catch {}
    }
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
  return <DslPageRenderer dsl={dsl} />
}
