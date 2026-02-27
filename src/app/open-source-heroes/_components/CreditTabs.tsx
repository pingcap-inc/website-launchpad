'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const tabs = [
  {
    label: 'Free',
    items: [
      'Personal Website Hosting',
      'RAG Agent Prototyping',
      'Minecraft Server',
    ],
  },
  {
    label: '$5–$10',
    items: [
      'Small business management systems',
      'Small-scale Data API backends',
    ],
  },
  {
    label: '$10–$100',
    items: [
      'Startup-level SaaS applications',
      'Analytics dashboards',
      'E-commerce platforms',
    ],
  },
  {
    label: '$100–$300',
    items: [
      'Data-intensive applications',
      'Enterprise-grade systems',
    ],
  },
  {
    label: '$300–$2,000',
    items: [
      'Large-scale enterprise systems',
      'Mission-critical business applications',
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
      <ul className="space-y-4">
        {tabs[active].items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-body-md text-carbon-300 leading-relaxed">
            <span className="text-brand-red-primary font-medium mt-0.5 shrink-0">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
