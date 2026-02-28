'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type TabItem = { title: string; description: string }

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

export function CreditTabs() {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-8">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2 text-body-sm font-medium transition-colors',
              active === i
                ? 'bg-white text-text-primary'
                : 'border border-carbon-700 text-carbon-400 hover:border-carbon-500 hover:text-carbon-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ul className="space-y-5">
        {tabs[active].items.map((item) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="text-brand-red-primary font-medium mt-0.5 shrink-0">→</span>
            <div>
              <p className="text-body-md text-text-inverse font-medium mb-1">{item.title}</p>
              <p className="text-body-sm text-carbon-400 leading-relaxed">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
