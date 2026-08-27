'use client'

import { useEffect, useRef, useState } from 'react'

// Connector lines in draw order — the three drops from the runtimes, the shared
// bus, then the drop into the workspace. Drawn top-to-bottom on first reveal so
// the sequence mirrors the data flow the diagram is arguing.
const CONNECTORS = [
  { x1: 140, y1: 82, x2: 140, y2: 104 },
  { x1: 450, y1: 82, x2: 450, y2: 104 },
  { x1: 760, y1: 82, x2: 760, y2: 104 },
  { x1: 140, y1: 104, x2: 760, y2: 104 },
  { x1: 450, y1: 104, x2: 450, y2: 136 },
]

export function DataPlaneDiagram() {
  const ref = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setReduced(true)
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const lineStyle = (index: number, length: number): React.CSSProperties =>
    reduced
      ? { opacity: visible ? 1 : 0, transition: 'opacity 200ms ease-out' }
      : {
          strokeDasharray: length,
          strokeDashoffset: visible ? 0 : length,
          transition: `stroke-dashoffset 500ms ease-out ${index * 80}ms`,
        }

  const bandStyle: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transition: reduced ? 'opacity 200ms ease-out' : 'opacity 400ms ease-out 500ms',
  }

  return (
    <svg
      ref={ref}
      viewBox="0 0 900 224"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-16 block h-auto w-full"
      role="img"
      aria-label="Three ephemeral runtimes above mount one durable workspace below"
    >
      <text x="0" y="12" fontSize="10" letterSpacing="0.6" className="font-mono fill-carbon-700">
        EXECUTION — EPHEMERAL
      </text>
      <rect
        x="0"
        y="28"
        width="280"
        height="54"
        rx="9"
        strokeDasharray="3,3"
        className="fill-white/[0.04] stroke-carbon-800"
      />
      <text x="18" y="50" fontSize="10" className="font-mono fill-carbon-400">
        SANDBOX A
      </text>
      <text x="18" y="69" fontSize="12" className="font-sans font-medium fill-white">
        clones, edits, builds
      </text>
      <text
        x="262"
        y="50"
        textAnchor="end"
        fontSize="9.5"
        className="font-mono fill-brand-red-primary"
      >
        ends
      </text>
      <rect
        x="310"
        y="28"
        width="280"
        height="54"
        rx="9"
        strokeDasharray="3,3"
        className="fill-white/[0.04] stroke-carbon-800"
      />
      <text x="328" y="50" fontSize="10" className="font-mono fill-carbon-400">
        SANDBOX B
      </text>
      <text x="328" y="69" fontSize="12" className="font-sans font-medium fill-white">
        continues the task
      </text>
      <text
        x="572"
        y="50"
        textAnchor="end"
        fontSize="9.5"
        className="font-mono fill-brand-red-primary"
      >
        ends
      </text>
      <rect
        x="620"
        y="28"
        width="280"
        height="54"
        rx="9"
        strokeDasharray="3,3"
        className="fill-white/[0.04] stroke-carbon-800"
      />
      <text x="638" y="50" fontSize="10" className="font-mono fill-carbon-400">
        CI JOB / REVIEWER
      </text>
      <text x="638" y="69" fontSize="12" className="font-sans font-medium fill-white">
        reads without mounting
      </text>
      {CONNECTORS.map((line, index) => (
        <line
          key={`${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          strokeWidth="1"
          className="stroke-carbon-800"
          style={lineStyle(index, Math.hypot(line.x2 - line.x1, line.y2 - line.y1))}
        />
      ))}
      <text x="0" y="128" fontSize="10" letterSpacing="0.6" className="font-mono fill-carbon-700">
        STATE — DURABLE
      </text>
      <g style={bandStyle}>
        <text x="462" y="122" fontSize="9" className="font-mono fill-carbon-700">
          same filesystem token
        </text>
        <rect
          x="0"
          y="136"
          width="900"
          height="80"
          rx="11"
          strokeWidth="1.5"
          className="fill-brand-red-primary/[0.07] stroke-brand-red-primary"
        />
        <text
          x="450"
          y="168"
          textAnchor="middle"
          fontSize="15"
          className="font-sans font-bold fill-white"
        >
          TiDB Cloud Filesystem — one workspace
        </text>
        <text
          x="450"
          y="192"
          textAnchor="middle"
          fontSize="10"
          className="font-mono fill-carbon-400"
        >
          source tree · git state · uncommitted work · test output · artifacts
        </text>
      </g>
    </svg>
  )
}
