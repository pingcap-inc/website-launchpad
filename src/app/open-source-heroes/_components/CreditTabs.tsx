'use client'

import Image from 'next/image'
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
        title: 'Start Small Businesses',
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
        title: 'Scale Startups',
        description:
          'Deploy SaaS applications, analytics dashboards, or e-commerce platforms with thousands of users and continuous read/write operations.',
      },
    ],
  },
  {
    label: '$100–$300',
    items: [
      {
        title: 'Data-Heavy Applications',
        description:
          'Scale applications with distributed databases, handle enterprise-level systems, or power data-heavy industries like fintech or healthcare.',
      },
    ],
  },
  {
    label: '$300–$2,000',
    items: [
      {
        title: 'Power Large-Scale Enterprises',
        description: 'Handle millions of users with high performance and reliability requirements.',
      },
      {
        title: 'Run Mission-Critical Systems',
        description: 'Support complex applications like fintech, gaming, or healthcare solutions.',
      },
    ],
  },
]

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
        <Image src="/images/hero/r/Graphic-22-Dk.png" alt="digital" width={300} height={300} />
      </div>

      <div className="lg:col-span-7 h-full flex flex-col justify-between">
        <ul className="space-y-4 mb-10">
          {tabs[index].items.map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="text-carbon-200  text-body-lg">•</span>
              <p className="text-body-lg text-carbon-300 leading-relaxed">
                <span className={cn('font-bold text-text-inverse', tabColors[index].icon)}>
                  {item.title}
                </span>
                : {item.description}
              </p>
            </li>
          ))}
        </ul>

        <div>
          <PrimaryButton href={ctaHref}>Claim your credits now</PrimaryButton>
          <p className="mt-4 text-body-md text-carbon-700 italic">
            *The scenarios above are for reference only. The actual bill will be based on real
            usage.
          </p>
        </div>
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
