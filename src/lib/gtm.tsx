/**
 * GTM dataLayer Utilities
 *
 * Ensures Next.js pages fire identical GTM events as WordPress pages.
 * Same event names, same property names — required for cross-stack analytics parity.
 *
 * Setup:
 *   1. Add GTM script to src/app/layout.tsx (see GTMScript component below)
 *   2. Use pushEvent() for all custom tracking calls (from gtm.client.ts)
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

const SHOULD_LOAD_GTM = process.env.VERCEL_ENV === 'production'

// ─── GTM Script component ─────────────────────────────────────────────────────
// Add to src/app/layout.tsx inside <head> and after <body> opening tag

export function GTMScript() {
  if (!SHOULD_LOAD_GTM || GTM_IDS.length === 0) return null
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
  if (!SHOULD_LOAD_GTM || GTM_IDS.length === 0) return null
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
