const CDN_BASE = 'https://static.pingcap.com/launchpad'

export function resolveCdnUrl(src: string): string {
  if (!process.env.NEXT_PUBLIC_ASSET_PREFIX) return src
  if (src.startsWith('http') || src.startsWith('data:')) return src
  if (!src.startsWith('/')) return src
  return `${CDN_BASE}${src}`
}
