import type { ReactNode } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  /** Short marker shown on the spine, e.g. "2015" or "Today" */
  marker: string
  /** H3 for the stop (Title Case) */
  title: string
  /** One or two short paragraphs. Strings render as <p>; pass a node for links. */
  body: ReactNode
  /** Optional visual shown beside the text on desktop, below it on mobile */
  media?: ReactNode
}

export interface TimelineSectionProps {
  eyebrow?: string
  title?: string
  subtitle?: string
  items: TimelineItem[]
  className?: string
}

/**
 * TimelineSection — a vertical story timeline.
 *
 * A thin spine runs down the left edge. Each stop has a marker dot, a mono
 * marker label, an H3, short body copy, and an optional visual. Static, no
 * animation. Built for narrative pages (About Us), not feature lists: keep it
 * to roughly 4–7 stops with one or two sentences each.
 */
export function TimelineSection({
  eyebrow,
  title,
  subtitle,
  items,
  className,
}: TimelineSectionProps) {
  return (
    <div className={cn('min-w-0 space-y-12 lg:space-y-16', className)}>
      {(eyebrow || title || subtitle) && (
        <div className="max-w-3xl">
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        </div>
      )}

      <ol className="relative m-0 list-none border-l border-border-primary p-0">
        {items.map((item, i) => (
          <li
            key={`${item.marker}-${i}`}
            className={cn('relative pl-8 md:pl-12', i < items.length - 1 && 'pb-16 lg:pb-24')}
          >
            {/* Marker dot sits on the spine */}
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-1 block h-[13px] w-[13px] rounded-full border-2 border-brand-violet-light bg-bg-primary"
            />

            <div
              className={cn(
                'grid grid-cols-1 gap-8',
                item.media && 'lg:grid-cols-12 lg:items-start lg:gap-12'
              )}
            >
              <div className={cn('min-w-0 max-w-2xl', item.media && 'lg:col-span-5')}>
                <p className="m-0 font-mono text-eyebrow text-brand-violet-light">{item.marker}</p>
                <h3 className="mb-0 mt-3 text-h3-sm font-bold leading-tight text-text-inverse md:text-h3-lg">
                  {item.title}
                </h3>
                <div className="mt-4 space-y-4 text-body-md text-carbon-300 [&_a]:text-text-inverse [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0">
                  {typeof item.body === 'string' ? <p>{item.body}</p> : item.body}
                </div>
              </div>

              {item.media ? <div className="min-w-0 lg:col-span-7">{item.media}</div> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
