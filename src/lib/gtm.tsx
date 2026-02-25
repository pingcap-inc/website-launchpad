/**
 * GTM dataLayer Utilities
 *
 * Ensures Next.js pages fire identical GTM events as WordPress pages.
 * Same event names, same property names — required for cross-stack analytics parity.
 *
 * Setup:
 *   1. Add GTM script to src/app/layout.tsx (see GTMScript component below)
 *   2. Use pushEvent() for all custom tracking calls
 *   3. Page view is fired automatically by GTM on route change via the
 *      'page_view' event — no manual call needed per page
 *
 * WordPress parity contract:
 *   WordPress (via GTM): { event: 'page_view', page_type: 'blog' }
 *   Next.js must fire:   { event: 'page_view', page_type: 'glossary' } — same keys
 */

// ─── GTM Config ───────────────────────────────────────────────────────────────
//
// Two GTM containers are loaded on www.pingcap.com:
//   NEXT_PUBLIC_GTM_ID_PINGCAP       — pingcap.com container (www.pingcap.com, tidbcloud.com)
//   NEXT_PUBLIC_GTM_ID_ALL_WEBSITES  — all_websites container (www.pingcap.com, tidbcloud.com, docs.pingcap.com)

const GTM_IDS = [
  process.env.NEXT_PUBLIC_GTM_ID_PINGCAP,
  process.env.NEXT_PUBLIC_GTM_ID_ALL_WEBSITES,
].filter(Boolean) as string[]

// ─── Types ────────────────────────────────────────────────────────────────────

export type PageType =
  | 'home'
  | 'product'
  | 'landing_page'
  | 'seo_content'
  | 'blog'
  | 'glossary'
  | 'compare'
  | 'pricing'
  | 'other'

export interface PageViewEvent {
  event: 'page_view'
  page_type: PageType
  page_path: string
  page_title: string
}

export interface CTAClickEvent {
  event: 'cta_click'
  cta_text: string
  cta_location: string // e.g. 'hero' | 'cta_section' | 'navbar'
  page_path: string
}

export interface FormSubmitEvent {
  event: 'form_submit'
  form_id: string
  page_path: string
}

export type GTMEvent = PageViewEvent | CTAClickEvent | FormSubmitEvent | Record<string, unknown>

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

// ─── GTM Script component ─────────────────────────────────────────────────────
// Add to src/app/layout.tsx inside <head> and after <body> opening tag

export function GTMScript() {
  if (GTM_IDS.length === 0) return null
  return (
    <>
      {GTM_IDS.map((id) => (
        <script
          key={id}
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${id}');
            `,
          }}
        />
      ))}
    </>
  )
}

export function GTMNoScript() {
  if (GTM_IDS.length === 0) return null
  return (
    <>
      {GTM_IDS.map((id) => (
        <noscript key={id}>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${id}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      ))}
    </>
  )
}
