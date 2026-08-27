'use client'

// The 8-step agent loop as an auto-advancing horizontal strip (PLAN.md
// Decision 14: show the loop, don't narrate it). Full-bleed past the page
// container; one card expanded at a time, the rest collapsed to slivers.
// Advances on a timer — only while in view, paused on hover, disabled under
// prefers-reduced-motion — and any sliver activates on click. Below lg the
// strip falls back to a compact numbered list.
// Prototype variants this won against: branch prototype/fs-loop-section.
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRightLeft,
  Files,
  FlaskConical,
  FolderTree,
  GitBranch,
  Layers,
  Pencil,
  Search,
  type LucideIcon,
} from 'lucide-react'

interface LoopStep {
  n: string
  title: string
  line: string
  mech: string
  icon: LucideIcon
  final?: boolean
}

const STEPS: LoopStep[] = [
  {
    n: '01',
    // title-case-ignore
    title: 'Enter the repository',
    line: 'Tree and metadata arrive first; content loads on access.',
    mech: 'metadata-first · lazy hydration',
    icon: FolderTree,
  },
  {
    n: '02',
    title: 'Search',
    line: 'Content grep and filename find, with build noise kept out.',
    mech: 'fs search-file-content · fs find-files · ignore policy',
    icon: Search,
  },
  {
    n: '03',
    // title-case-ignore
    title: 'Read context',
    line: 'Handler, config, test and failing log arrive as one batch.',
    mech: 'inline small files · batch read',
    icon: Files,
  },
  {
    n: '04',
    // title-case-ignore
    title: 'Edit files',
    line: 'Writes land locally first; a journal keeps them recoverable.',
    mech: 'local-first write · journal · async writeback',
    icon: Pencil,
  },
  {
    n: '05',
    // title-case-ignore
    title: 'Build and test',
    line: 'Rebuildables stay local. Results, logs and patches persist.',
    mech: 'build profile · local-only overlay',
    icon: FlaskConical,
  },
  {
    n: '06',
    // title-case-ignore
    title: 'Save Git state',
    line: 'Baseline, dirty overlay and new objects — modelled separately.',
    mech: 'ti fs-git · clean tree · dirty overlay · object pack',
    icon: GitBranch,
  },
  {
    n: '07',
    title: 'Checkpoint',
    line: 'Layer commands are in the CLI — not yet a preview guarantee.',
    mech: 'fs create-layer · create-layer-checkpoint · rollback-layer — preview, not guaranteed',
    icon: Layers,
  },
  {
    n: '08',
    // title-case-ignore
    title: 'Hand off',
    line: 'The next runtime opens the same workspace. Same token, no mount required.',
    mech: 'filesystem token · one namespace · fs read-file, mountless',
    icon: ArrowRightLeft,
    final: true,
  },
]

const INTERVAL_MS = 4000

export function LoopStrip({ showMechanisms = true }: { showMechanisms?: boolean }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [cycle, setCycle] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.3,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const autoRunning = inView && !paused && !reduced

  useEffect(() => {
    if (!autoRunning) return
    const id = setInterval(() => setActive((a) => (a + 1) % STEPS.length), INTERVAL_MS)
    return () => clearInterval(id)
  }, [autoRunning, cycle])

  const select = (index: number) => {
    setActive(index)
    setCycle((c) => c + 1)
  }

  return (
    <div ref={containerRef}>
      {/* Breakout strip — escapes the container padding via negative margins
          (not 100vw, which is wider than the layout viewport when a scrollbar
          is present and would force a horizontal scrollbar). Fixed card sizes;
          justify-between feeds leftover width into the gaps. */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="hidden overflow-hidden lg:block"
      >
        <div className="flex items-stretch justify-between gap-2">
          {STEPS.map((step, index) => {
            const isActive = index === active
            const Icon = step.icon
            return (
              <button
                key={step.n}
                type="button"
                onClick={() => select(index)}
                aria-expanded={isActive}
                aria-label={`Step ${step.n}: ${step.title}`}
                className={`relative h-[300px] overflow-hidden rounded-xl border text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-red-primary ${
                  isActive
                    ? 'border-brand-red-primary bg-brand-red-primary/[0.06]'
                    : 'border-border-primary bg-white/[0.03] hover:border-carbon-600'
                }`}
                style={{
                  flex: isActive ? '0 0 clamp(460px, 44vw, 620px)' : '0 0 68px',
                  transition: 'flex-basis 600ms ease-in-out',
                }}
              >
                {/* Auto-advance progress — whole-card fill, slightly brighter
                    than the card's red tint, behind the content layers */}
                {isActive && autoRunning && (
                  <span
                    key={`${cycle}-${active}`}
                    className="ti-fill absolute inset-y-0 left-0 w-full bg-gradient-to-r from-brand-red-primary/[0.04] to-brand-red-primary/[0.18]"
                    style={{ animationDuration: `${INTERVAL_MS}ms` }}
                  />
                )}
                {/* Collapsed sliver */}
                <div
                  className="absolute inset-0 flex flex-col items-center gap-4 py-5"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: `opacity 250ms ease-in-out ${isActive ? '0ms' : '250ms'}`,
                  }}
                >
                  <span className="font-mono text-xs text-carbon-700">{step.n}</span>
                  <span className="font-mono text-[11px] tracking-[0.05em] text-carbon-600 [writing-mode:vertical-rl]">
                    {step.title}
                  </span>
                </div>
                {/* Expanded card — fixed content width so text doesn't reflow mid-transition */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-7"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: `opacity 250ms ease-in-out ${isActive ? '250ms' : '0ms'}`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`font-mono text-sm ${step.final ? 'text-brand-red-light' : 'text-brand-red-primary'}`}
                    >
                      {step.n} / 08
                    </span>
                    <Icon strokeWidth={1.5} className="h-6 w-6 text-carbon-400" />
                  </div>
                  <div className="w-[400px] max-w-full">
                    <h4 className="mb-3 text-h3-lg font-bold text-white">{step.title}</h4>
                    <p
                      className={
                        showMechanisms
                          ? 'mb-4 text-body-lg text-carbon-400'
                          : 'text-body-lg text-carbon-400'
                      }
                    >
                      {step.line}
                    </p>
                    {showMechanisms && (
                      <p className="font-mono text-[10px] tracking-[0.04em] text-carbon-700">
                        {step.mech}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Compact list below lg */}
      <div className="grid lg:hidden">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className={`grid grid-cols-[40px_1fr] items-baseline gap-3 border-t py-4 ${
              step.final
                ? 'border-t-brand-red-primary bg-brand-red-primary/5 pr-3'
                : 'border-t-border-primary'
            }`}
          >
            <span
              className={`font-mono text-xs ${step.final ? 'text-brand-red-primary' : 'text-carbon-700'}`}
            >
              {step.n}
            </span>
            <div>
              <p className="text-body-md font-medium text-white">{step.title}</p>
              <p className="text-body-sm text-carbon-400">{step.line}</p>
              {showMechanisms && (
                <p className="mt-1 font-mono text-[10px] tracking-[0.04em] text-carbon-700">
                  {step.mech}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
