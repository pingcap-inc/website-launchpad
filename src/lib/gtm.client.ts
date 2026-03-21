'use client'

import type {
  CTAClickEvent,
  FormSubmitEvent,
  GTMEvent,
  PageType,
  PageViewEvent,
} from '@/lib/gtm-types'

// ─── Core push utility ────────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: GTMEvent[]
  }
}

export function pushEvent(event: GTMEvent): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(event)
}

// ─── Typed event helpers ──────────────────────────────────────────────────────

export function trackPageView(options: Omit<PageViewEvent, 'event'>): void {
  pushEvent({ event: 'page_view', ...options })
}

export function trackCTAClick(options: Omit<CTAClickEvent, 'event'>): void {
  pushEvent({ event: 'cta_click', ...options })
}

export function trackFormSubmit(options: Omit<FormSubmitEvent, 'event'>): void {
  pushEvent({ event: 'form_submit', ...options })
}

export type { PageType }
