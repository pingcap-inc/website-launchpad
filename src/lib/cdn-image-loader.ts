const CDN_BASE = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? 'https://static.pingcap.com/launchpad'

export default function cdnImageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // External URLs (e.g. https://static.pingcap.com/...) — use as-is
  if (src.startsWith('http')) {
    return `${src}?w=${width}&q=${quality ?? 75}`
  }
  // Local paths (e.g. /images/hero/Graphic.png) — serve from CDN
  return `${CDN_BASE}${src}?w=${width}&q=${quality ?? 75}`
}
