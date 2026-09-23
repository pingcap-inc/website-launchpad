// The four boundary scenarios that put a reader "in the right place" — each a
// small static diagram in a shared 220×104 frame. Red marks the state that has
// to survive; dashed carbon marks the runtime that doesn't.

function TimeDiagram() {
  return (
    <svg
      viewBox="0 0 220 104"
      className="block h-auto w-full"
      role="img"
      aria-label="A sandbox ends while the task is still running"
    >
      <rect
        x="6"
        y="16"
        width="118"
        height="50"
        rx="7"
        fill="none"
        strokeDasharray="3,3"
        className="stroke-carbon-800"
      />
      <text x="16" y="34" fontSize="8.5" className="font-mono fill-carbon-700">
        SANDBOX
      </text>
      <line x1="124" y1="10" x2="124" y2="72" className="stroke-carbon-800" />
      <text x="130" y="26" fontSize="8.5" className="font-mono fill-carbon-700">
        ENDS
      </text>
      <line
        x1="18"
        y1="52"
        x2="124"
        y2="52"
        strokeWidth="4"
        strokeLinecap="round"
        className="stroke-brand-red-primary"
      />
      <line
        x1="132"
        y1="52"
        x2="196"
        y2="52"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="2,7"
        opacity="0.45"
        className="stroke-brand-red-primary"
      />
      <path
        d="M198 46 L210 58 M210 46 L198 58"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.6"
        className="stroke-brand-red-primary"
      />
      <text x="18" y="88" fontSize="8.5" className="font-mono fill-carbon-700">
        TASK STILL RUNNING
      </text>
    </svg>
  )
}

function SetupDiagram() {
  return (
    <svg
      viewBox="0 0 220 104"
      className="block h-auto w-full"
      role="img"
      aria-label="Every run clones and prepares the same repository again"
    >
      <rect
        x="6"
        y="30"
        width="46"
        height="44"
        rx="6"
        className="fill-brand-red-primary/[0.12] stroke-brand-red-primary"
      />
      <text x="29" y="56" textAnchor="middle" fontSize="8.5" className="font-mono fill-white">
        REPO
      </text>
      <rect
        x="150"
        y="2"
        width="64"
        height="26"
        rx="6"
        fill="none"
        strokeDasharray="3,3"
        className="stroke-carbon-800"
      />
      <text x="182" y="20" textAnchor="middle" fontSize="8" className="font-mono fill-carbon-700">
        RUN 1
      </text>
      <path
        d="M54 52 C 100 52, 104 16, 146 16"
        fill="none"
        strokeWidth="1.6"
        opacity="0.85"
        className="stroke-brand-red-primary"
      />
      <path
        d="M141 12 L147 16 L141 20"
        fill="none"
        strokeWidth="1.6"
        className="stroke-brand-red-primary"
      />
      <rect
        x="150"
        y="38"
        width="64"
        height="26"
        rx="6"
        fill="none"
        strokeDasharray="3,3"
        className="stroke-carbon-800"
      />
      <text x="182" y="56" textAnchor="middle" fontSize="8" className="font-mono fill-carbon-700">
        RUN 2
      </text>
      <path
        d="M54 52 C 100 52, 104 52, 146 52"
        fill="none"
        strokeWidth="1.6"
        opacity="0.85"
        className="stroke-brand-red-primary"
      />
      <path
        d="M141 48 L147 52 L141 56"
        fill="none"
        strokeWidth="1.6"
        className="stroke-brand-red-primary"
      />
      <rect
        x="150"
        y="74"
        width="64"
        height="26"
        rx="6"
        fill="none"
        strokeDasharray="3,3"
        className="stroke-carbon-800"
      />
      <text x="182" y="92" textAnchor="middle" fontSize="8" className="font-mono fill-carbon-700">
        RUN 3
      </text>
      <path
        d="M54 52 C 100 52, 104 88, 146 88"
        fill="none"
        strokeWidth="1.6"
        opacity="0.85"
        className="stroke-brand-red-primary"
      />
      <path
        d="M141 84 L147 88 L141 92"
        fill="none"
        strokeWidth="1.6"
        className="stroke-brand-red-primary"
      />
    </svg>
  )
}

function ConcurrencyDiagram() {
  return (
    <svg
      viewBox="0 0 220 104"
      className="block h-auto w-full"
      role="img"
      aria-label="Three agents working on one repository at the same time"
    >
      {[
        { x: 14, label: 'AGENT 1' },
        { x: 82, label: 'AGENT 2' },
        { x: 150, label: 'AGENT 3' },
      ].map(({ x, label }) => (
        <g key={label}>
          <rect
            x={x}
            y="8"
            width="56"
            height="26"
            rx="6"
            fill="none"
            strokeDasharray="3,3"
            className="stroke-carbon-800"
          />
          <text
            x={x + 28}
            y="25"
            textAnchor="middle"
            fontSize="8"
            className="font-mono fill-carbon-700"
          >
            {label}
          </text>
          <line
            x1={x + 28}
            y1="34"
            x2={x + 28}
            y2="58"
            strokeWidth="1.6"
            className="stroke-brand-red-primary"
          />
          <path
            d={`M${x + 24} 54 L${x + 28} 60 L${x + 32} 54`}
            fill="none"
            strokeWidth="1.6"
            className="stroke-brand-red-primary"
          />
        </g>
      ))}
      <rect
        x="14"
        y="62"
        width="192"
        height="32"
        rx="7"
        strokeWidth="1.6"
        className="fill-brand-red-primary/[0.12] stroke-brand-red-primary"
      />
      <text x="110" y="82" textAnchor="middle" fontSize="8.5" className="font-mono fill-white">
        ONE WORKSPACE
      </text>
    </svg>
  )
}

function PortabilityDiagram() {
  return (
    <svg
      viewBox="0 0 220 104"
      className="block h-auto w-full"
      role="img"
      aria-label="One workspace followed across four different runtimes"
    >
      {[
        { x: 6, label: 'E2B' },
        { x: 60, label: 'MODAL' },
        { x: 114, label: 'CI' },
        { x: 168, label: 'LOCAL' },
      ].map(({ x, label }) => (
        <g key={label}>
          <rect
            x={x}
            y="14"
            width="46"
            height="30"
            rx="6"
            fill="none"
            strokeDasharray="3,3"
            className="stroke-carbon-800"
          />
          <text
            x={x + 23}
            y="33"
            textAnchor="middle"
            fontSize="7.5"
            className="font-mono fill-carbon-700"
          >
            {label}
          </text>
          <line x1={x + 23} y1="44" x2={x + 23} y2="62" className="stroke-carbon-800" />
        </g>
      ))}
      <line
        x1="14"
        y1="62"
        x2="206"
        y2="62"
        strokeWidth="4"
        strokeLinecap="round"
        className="stroke-brand-red-primary"
      />
      <text x="14" y="86" fontSize="8.5" className="font-mono fill-carbon-700">
        THE SAME WORKSPACE, FOLLOWED ACROSS
      </text>
    </svg>
  )
}

const scenarios = [
  {
    number: '01',
    label: 'TIME',
    description: 'A sandbox or ephemeral job ends before the task is done.',
    Diagram: TimeDiagram,
  },
  {
    number: '02',
    label: 'SETUP',
    description: 'Each run clones and prepares the same repository again.',
    Diagram: SetupDiagram,
  },
  {
    number: '03',
    label: 'CONCURRENCY',
    description: 'Several agents need the same repository or document set at once.',
    Diagram: ConcurrencyDiagram,
  },
  {
    number: '04',
    label: 'PORTABILITY',
    description: 'Work moves between E2B, Modal, Daytona, CI or a local tool.',
    Diagram: PortabilityDiagram,
  },
]

export function FitScenarios() {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-4">
      {scenarios.map(({ number, label, description, Diagram }) => (
        <div
          key={label}
          className="grid content-start gap-[18px] border-t border-border-primary pt-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] text-brand-red-primary">{number}</span>
            <span className="font-mono text-[10px] tracking-[0.05em] text-carbon-700">{label}</span>
          </div>
          <Diagram />
          <p className="text-body-md leading-[1.45] text-white">{description}</p>
        </div>
      ))}
    </div>
  )
}
