'use client'

import { cn } from '@/lib/utils'
import { PrimaryButton, Tabs } from '@/components'

type TabItem = { title: string; description: string }

const tabColors = [
  { active: 'text-text-inverse', icon: 'text-brand-teal-medium' },
  { active: 'text-text-inverse', icon: 'text-brand-blue-medium' },
  { active: 'text-text-inverse', icon: 'text-brand-violet-medium' },
  { active: 'text-text-inverse', icon: 'text-brand-mango' },
  { active: 'text-text-inverse', icon: 'text-brand-red-primary' },
]

const tabs: { label: string; items: TabItem[] }[] = [
  {
    label: 'Free',
    items: [
      {
        title: 'Personal Website Hosting',
        description: 'Create websites or blogs using WordPress or Joomla.',
      },
      {
        title: 'RAG Agent Prototyping',
        description: 'Develop RAG agents with your own knowledge base.',
      },
      {
        title: 'Minecraft Server',
        description:
          'Run a personal Minecraft server, where you can play on with your friends all day.',
      },
    ],
  },
  {
    label: '$5–$10',
    items: [
      {
        title: 'Start small businesses',
        description: 'Power online stores, community forums, or customer feedback systems.',
      },
      {
        title: 'Data API Backends',
        description: 'Host small databases for managing small-scale workloads like API backend.',
      },
    ],
  },
  {
    label: '$10–$100',
    items: [
      {
        title: 'Scale startups',
        description:
          'Deploy SaaS applications, analytics dashboards, or e-commerce platforms with thousands of users and continuous read/write operations.',
      },
    ],
  },
  {
    label: '$100–$300',
    items: [
      {
        title: 'Data-heavy applications',
        description:
          'Scale applications with distributed databases, handle enterprise-level systems, or power data-heavy industries like fintech or healthcare.',
      },
    ],
  },
  {
    label: '$300–$2,000',
    items: [
      {
        title: 'Power large-scale enterprises',
        description: 'Handle millions of users with high performance and reliability requirements.',
      },
      {
        title: 'Run mission-critical systems',
        description: 'Support complex applications like fintech, gaming, or healthcare solutions.',
      },
    ],
  },
]

function CubeIllustration() {
  const colors = {
    bg: '#000000', // bg-bg-primary
    lineNeutral: '#F4DCB3', // brand-mango-200
    lineBlue: '#509DEA', // brand-blue-light
    lineTeal: '#50DBD9', // brand-teal-light
    lineViolet: '#C76FF2', // brand-violet-light
    lineLilac: '#CBD1D7', // carbon-200
    cubeTop: '#B9E7F2', // token-adjacent highlight top
    cubeLeft: '#0F5353', // brand-teal-dark
    cubeRight: '#2C80CE', // brand-blue-medium
    cubeEdge: '#FFFFFF', // text-text-inverse
  }

  const wireCubes = [
    { x: 100, y: 140, c: colors.lineNeutral },
    { x: 180, y: 96, c: colors.lineTeal },
    { x: 260, y: 140, c: colors.lineNeutral },
    { x: 340, y: 96, c: colors.lineNeutral },
    { x: 420, y: 140, c: colors.lineNeutral },
    { x: 60, y: 210, c: colors.lineBlue },
    { x: 140, y: 166, c: colors.lineBlue },
    { x: 220, y: 210, c: colors.lineNeutral },
    { x: 300, y: 166, c: colors.lineTeal },
    { x: 380, y: 210, c: colors.lineNeutral },
    { x: 140, y: 238, c: colors.lineLilac },
    { x: 220, y: 282, c: colors.lineNeutral },
    { x: 300, y: 238, c: colors.lineTeal },
    { x: 380, y: 282, c: colors.lineViolet },
  ]

  const dashedCubes = [
    { x: 70, y: 34 },
    { x: 485, y: 274 },
  ]

  const cubeFace = (x: number, y: number, stroke: string) => (
    <g key={`${x}-${y}`} stroke={stroke} strokeWidth="2" fill="none">
      <path d={`M${x} ${y} l50 -29 l50 29 l-50 29 z`} />
      <path d={`M${x} ${y} l0 70 l50 29 l0 -70 z`} />
      <path d={`M${x + 100} ${y} l0 70 l-50 29 l0 -70 z`} />
    </g>
  )

  return (
    <svg
      viewBox="0 0 620 620"
      className="w-full h-auto"
      role="img"
      aria-label="Credit tier illustration"
    >
      <rect width="620" height="620" fill={colors.bg} />

      {wireCubes.map((cube) => cubeFace(cube.x, cube.y, cube.c))}

      {dashedCubes.map((cube) => (
        <g
          key={`d-${cube.x}-${cube.y}`}
          stroke={colors.lineNeutral}
          strokeWidth="2"
          fill="none"
          strokeDasharray="12 10"
        >
          <path d={`M${cube.x} ${cube.y} l50 -29 l50 29 l-50 29 z`} />
          <path d={`M${cube.x} ${cube.y} l0 70 l50 29 l0 -70 z`} />
          <path d={`M${cube.x + 100} ${cube.y} l0 70 l-50 29 l0 -70 z`} />
        </g>
      ))}

      {/* highlighted focal cube */}
      <g transform="translate(220 414)">
        <polygon points="100,0 200,58 100,116 0,58" fill={colors.cubeTop} />
        <polygon points="0,58 100,116 100,232 0,174" fill={colors.cubeLeft} />
        <polygon points="200,58 100,116 100,232 200,174" fill={colors.cubeRight} />
        <path
          d="M100 0 L200 58 L100 116 L0 58 Z"
          fill="none"
          stroke={colors.cubeEdge}
          strokeWidth="3"
        />
        <path
          d="M0 58 L0 174 L100 232 L100 116 Z"
          fill="none"
          stroke={colors.cubeEdge}
          strokeWidth="3"
        />
        <path
          d="M200 58 L200 174 L100 232 L100 116 Z"
          fill="none"
          stroke={colors.cubeEdge}
          strokeWidth="3"
        />
      </g>
    </svg>
  )
}
function CreditTabPanel({
  index,
  ctaHref,
  className,
  style,
}: {
  index: number
  ctaHref: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      className={cn('grid grid-cols-1 lg:grid-cols-12 gap-8 items-start', className)}
      style={style}
    >
      <div className="lg:col-span-5">
        <CubeIllustration />
      </div>

      <div className="lg:col-span-7">
        <ul className="space-y-4 mb-10">
          {tabs[index].items.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="text-carbon-200 mt-1.5 text-body-md">•</span>
              <p className="text-body-lg text-carbon-300 leading-relaxed">
                <span className={cn('font-bold text-text-inverse', tabColors[index].icon)}>
                  {item.title}
                </span>
                : {item.description}
              </p>
            </li>
          ))}
        </ul>

        <PrimaryButton href={ctaHref}>Claim your credits now</PrimaryButton>
        <p className="mt-4 text-body-md text-carbon-700 italic">
          *The scenarios above are for reference only. The actual bill will be based on real usage.
        </p>
      </div>
    </div>
  )
}

export function CreditTabs({ ctaHref }: { ctaHref: string }) {
  const tabsData = tabs.map((tab, index) => ({
    id: tab.label,
    label: tab.label,
    content: <CreditTabPanel index={index} ctaHref={ctaHref} />,
  }))

  return (
    <div className="space-y-8">
      <Tabs tabs={tabsData} defaultActiveTab={tabsData[0].id} autoSwitch />
    </div>
  )
}
