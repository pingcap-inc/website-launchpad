import { resolveCdnUrl } from '@/lib/cdn-url'

interface TiDBPersistentLayerProps {
  className?: string
  /** Override the embedded animation source. Defaults to the self-contained public file. */
  src?: string
}

/**
 * "AI Persistent Storage Layer" landing-page animation (variant A, 11.0s, looping).
 *
 * The animation is a fixed 1200x675 artboard driven by imperative JS with
 * base64-embedded Moderat fonts, so it is served as a self-contained HTML file
 * from /public and framed here. The file scales itself to the iframe width and
 * falls back to a static final frame under prefers-reduced-motion.
 */
const DEFAULT_SRC = '/animations/tidb-persistent-layer-animation.html'

export function TiDBPersistentLayer({ className, src = DEFAULT_SRC }: TiDBPersistentLayerProps) {
  // In local dev this stays "/tidb-persistent-layer-animation.html" (served from
  // /public); when NEXT_PUBLIC_ASSET_PREFIX is set for the CDN build it becomes
  // https://static.pingcap.com/launchpad/tidb-persistent-layer-animation.html
  const resolvedSrc = resolveCdnUrl(src)
  return (
    <div className={className}>
      <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-2xl bg-black">
        <iframe
          src={resolvedSrc}
          title="TiDB AI Persistent Storage Layer animation"
          loading="lazy"
          scrolling="no"
          className="block w-full border-0"
          style={{ aspectRatio: '1200 / 675' }}
        />
      </div>
    </div>
  )
}
