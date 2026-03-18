'use client'

import { PageRenderer } from './page-renderer'
import type { PageDSLInput } from './dsl-utils'

interface DslPageRendererProps {
  dsl: PageDSLInput
  /** Wrap in a scaling container for admin preview mode */
  preview?: boolean
  /** Include Header + Footer chrome (mirrors the published page) */
  withChrome?: boolean
}

export function DslPageRenderer({
  dsl,
  preview = false,
  withChrome = false,
}: DslPageRendererProps) {
  const content = <PageRenderer dsl={dsl} withChrome={withChrome} />

  if (!preview) return content

  return (
    <div className="relative overflow-hidden" style={{ paddingBottom: '56.25%' /* 16:9 aspect */ }}>
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: '1440px',
          transform: 'scale(var(--preview-scale, 0.45))',
        }}
      >
        {content}
      </div>
    </div>
  )
}
