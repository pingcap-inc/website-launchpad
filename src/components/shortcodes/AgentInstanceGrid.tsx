import { cn } from '@/lib/utils'

/**
 * AgentInstanceGrid — static waffle chart for the About Us page.
 *
 * 1,000 squares stand for the database instances on TiDB Cloud Starter.
 * 99% of them (990) are violet: created by AI agents. 10 are gray: created by
 * people. Mirrors the "Created by agents. 99%" slide from Max Liu's TiDB SCaiLE
 * 2026 keynote. Deliberately static (no animation).
 *
 * Shortcode: [agent-instance-grid]
 */

const COLS = 50
const ROWS = 20
const TOTAL = COLS * ROWS // 1,000
const HUMAN_COUNT = 10 // 1%

// Deterministic pseudo-random so server and client render identically.
function seeded(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

// Spread the human squares across the grid instead of clustering them.
const HUMAN_CELLS = new Set(
  Array.from({ length: HUMAN_COUNT }, (_, k) => {
    const band = Math.floor(TOTAL / HUMAN_COUNT)
    return k * band + Math.floor(seeded(k + 1) * band)
  })
)

const AGENT_SHADES = ['bg-brand-violet-medium', 'bg-brand-violet-light', 'bg-brand-violet-light/80']

export function AgentInstanceGrid({ className }: { className?: string }) {
  return (
    <figure
      className={cn('m-0 w-full', className)}
      role="img"
      aria-label="Waffle chart of 1,000 squares: 990 violet squares for databases created by AI agents and 10 gray squares for databases created by people."
    >
      <div className="mb-6 flex items-end justify-between gap-6">
        <p className="m-0 text-body-md text-text-secondary max-w-[260px]">
          Who created the databases on TiDB Cloud Starter in the last six months
        </p>
        <p className="m-0 font-bold leading-none text-[56px] md:text-[72px] text-gradient-violet">
          99%
        </p>
      </div>

      <div className="grid grid-cols-[repeat(50,minmax(0,1fr))] gap-[2px]" aria-hidden="true">
        {Array.from({ length: TOTAL }, (_, i) => {
          const isHuman = HUMAN_CELLS.has(i)
          const shade = AGENT_SHADES[Math.floor(seeded(i + 100) * AGENT_SHADES.length)]
          return (
            <span
              key={i}
              className={cn('block aspect-square rounded-[1px]', isHuman ? 'bg-carbon-700' : shade)}
            />
          )
        })}
      </div>

      <figcaption className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-text-secondary">
        <span className="inline-flex items-center gap-2">
          <span className="block h-3 w-3 rounded-[1px] bg-brand-violet-medium" aria-hidden="true" />
          Created by an AI agent
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="block h-3 w-3 rounded-[1px] bg-carbon-700" aria-hidden="true" />
          Created by a person
        </span>
        <span>1,000 squares, 10 started by people</span>
      </figcaption>
    </figure>
  )
}
