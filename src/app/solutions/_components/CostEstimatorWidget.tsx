'use client'

import { useEffect } from 'react'
import Script from 'next/script'

/**
 * Embeds PingCAP's official TiDB Cloud Essential cost-estimation widget,
 * the same build the live WordPress page loads. It mounts into
 * `#cost-estimation-widget` and owns all pricing logic (RU derivation,
 * per-region price tables), so no pricing math is reimplemented here.
 *
 * Stable (non-hashed) CDN URLs are used on purpose so the embed tracks the
 * product team's current widget rather than pinning to one content hash.
 *
 * CSP: checked on www.pingcap.com in Nov 2026. The proxy-layer policy is only
 * `base-uri 'self'; object-src 'none'; frame-ancestors 'self'`, with no
 * `script-src`/`default-src`, so this script is not blocked. The live
 * WordPress version of this page loads the same widget under that policy. If a
 * `script-src` is ever added at the proxy, it must include
 * `https://static.pingcap.com`.
 */
const WIDGET_CSS = 'https://static.pingcap.com/cost-estimation/widget.css'
const WIDGET_JS = 'https://static.pingcap.com/cost-estimation/widget.js'

export function CostEstimatorWidget() {
  useEffect(() => {
    if (document.querySelector(`link[href="${WIDGET_CSS}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = WIDGET_CSS
    document.head.appendChild(link)
  }, [])

  return (
    <>
      <div
        id="cost-estimation-widget"
        className="cost-estimation-widget"
        data-custom-url="https://www.pingcap.com/try-tidb-cloud-essential-with-free-credits/"
        data-disabled-secondary-button=""
      />
      <Script src={WIDGET_JS} strategy="afterInteractive" />
    </>
  )
}
