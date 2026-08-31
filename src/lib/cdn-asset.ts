/**
 * Resolve a local /public asset path to its production URL.
 *
 * next/image gets this rewrite for free via `cdn-image-loader.ts`, but assets
 * rendered by raw tags — e.g. `<video><source src>` — do not: their src is sent
 * verbatim. In production the app is served through the CDN (assetPrefix set),
 * where `public/` is mirrored under CDN_BASE, so a local `/videos/x.mp4` must be
 * rewritten to the CDN or it 404s against the page host. In dev the CDN env var
 * is unset and `public/` is served locally, so the path is returned unchanged.
 *
 * CDN_BASE mirrors the constant in `cdn-image-loader.ts`; keep them in sync.
 */
const CDN_BASE = 'https://static.pingcap.com/launchpad'

export function cdnAsset(path: string): string {
  if (/^https?:\/\//.test(path)) return path // already absolute
  return process.env.NEXT_PUBLIC_ASSET_PREFIX ? `${CDN_BASE}${path}` : path
}
