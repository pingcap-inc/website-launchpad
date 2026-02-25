'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView, type PageType } from '@/lib/gtm'

interface RouteTrackerProps {
  /** Default page_type when not specified at page level. */
  pageType?: PageType
}

/**
 * RouteTracker
 *
 * Fires a GTM page_view event on every route change.
 * Next.js App Router does not trigger GTM page_view automatically
 * on client-side navigation — this component fills that gap.
 *
 * Add once to src/app/layout.tsx inside <body>:
 *   <RouteTracker />
 *
 * For page-specific page_type, wrap individual pages in a layout
 * that passes the correct type down, or use trackPageView() directly
 * inside the page component.
 */
export function RouteTracker({ pageType = 'other' }: RouteTrackerProps) {
  const pathname = usePathname()

  useEffect(() => {
    trackPageView({
      page_type: pageType,
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname, pageType])

  return null
}
