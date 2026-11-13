import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * StackConsolidation — static "6 → 1" comparison for the About Us page.
 *
 * Six gray tiles (the systems teams stitch together as an application grows)
 * next to one violet TiDB block of the same footprint. Illustrative, not a
 * measured statistic. Companion to [agent-instance-grid]; deliberately static.
 *
 * Shortcode: [stack-consolidation]
 */

const STITCHED = ['Shard', 'Shard', 'Shard', 'Cache', 'Vectors', 'Analytics']

export function StackConsolidation({ className }: { className?: string }) {
  return (
    <figure
      className={cn('m-0 w-full', className)}
      role="img"
      aria-label="Illustration: six separate systems (three database shards, a cache, a vector store and an analytics store) replaced by one TiDB data layer."
    >
      <div className="mb-6 flex items-end justify-between gap-6">
        <p className="m-0 max-w-[260px] text-body-md text-text-secondary">
          Systems a team runs to keep up as an application grows
        </p>
        <p className="m-0 whitespace-nowrap text-[56px] font-bold leading-none text-gradient-violet md:text-[72px]">
          6 → 1
        </p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4" aria-hidden="true">
        <div className="grid grid-cols-3 gap-[6px]">
          {STITCHED.map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="flex aspect-square min-w-0 items-end overflow-hidden border border-border-primary bg-carbon-900 p-1.5 text-[9px] leading-tight text-text-secondary sm:p-2 sm:text-body-sm"
            >
              {label}
            </span>
          ))}
        </div>
        <ArrowRight className="h-6 w-6 text-carbon-600" strokeWidth={1.5} />
        <span className="flex aspect-[3/2] items-end bg-gradient-to-br from-brand-violet-medium to-brand-violet-light p-3 text-body-lg font-bold text-text-inverse md:p-4">
          TiDB
        </span>
      </div>

      <figcaption className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-text-secondary">
        <span className="inline-flex items-center gap-2">
          <span
            className="block h-3 w-3 border border-border-primary bg-carbon-900"
            aria-hidden="true"
          />
          Stitched together
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="block h-3 w-3 bg-brand-violet-medium" aria-hidden="true" />
          One data layer
        </span>
      </figcaption>
    </figure>
  )
}
