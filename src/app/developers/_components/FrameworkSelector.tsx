'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { DeveloperResourceCard } from './DeveloperResourceCard'

interface LabCard {
  title: string
  href: string
}

interface Framework {
  id: string
  label: string
  initials: string
  labs: LabCard[]
}

const frameworks: Framework[] = [
  {
    id: 'jdbc',
    label: 'JDBC',
    initials: 'J',
    labs: [
      { title: 'Introduction to TiDB Cloud Starter', href: 'https://www.pingcap.com/education/' },
      { title: 'Working with TiDB Cloud Using JDBC', href: 'https://www.pingcap.com/education/' },
      {
        title: 'Working with TiDB Cloud Using mysql-connector-python',
        href: 'https://www.pingcap.com/education/',
      },
    ],
  },
  {
    id: 'python',
    label: 'Python',
    initials: 'Py',
    labs: [
      {
        title: 'Connect TiDB with SQLAlchemy',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-python-sqlalchemy/',
      },
      {
        title: 'Build a Simple CRUD App with Python',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-python-mysqlclient/',
      },
      {
        title: 'Use TiDB Vector Search with Python',
        href: 'https://docs.pingcap.com/tidbcloud/vector-search-get-started-using-python/',
      },
    ],
  },
  {
    id: 'go',
    label: 'Go',
    initials: 'Go',
    labs: [
      {
        title: 'Connect TiDB with Go MySQL Driver',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-golang-sql-driver/',
      },
      {
        title: 'Build a Simple CRUD App with Go',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-golang-gorm/',
      },
      {
        title: 'Use GORM with TiDB',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-golang-gorm/',
      },
    ],
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    initials: 'JS',
    labs: [
      {
        title: 'Connect TiDB with mysql2',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-nodejs-mysql2/',
      },
      {
        title: 'Build a Simple CRUD App with Node.js',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-nodejs-mysqljs/',
      },
      {
        title: 'Use Prisma ORM with TiDB',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-nodejs-prisma/',
      },
    ],
  },
  {
    id: 'ruby',
    label: 'Ruby',
    initials: 'Rb',
    labs: [
      {
        title: 'Connect TiDB with Ruby mysql2',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-ruby-mysql2/',
      },
      {
        title: 'Build a Rails App with TiDB',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-ruby-rails/',
      },
      {
        title: 'Use Active Record with TiDB',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-ruby-rails/',
      },
    ],
  },
  {
    id: 'php',
    label: 'PHP',
    initials: 'PHP',
    labs: [
      {
        title: 'Connect TiDB with PHP mysqlnd',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-php/',
      },
      {
        title: 'Build a Laravel App with TiDB',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-php/',
      },
      {
        title: 'Use PDO with TiDB',
        href: 'https://docs.pingcap.com/tidbcloud/dev-guide-sample-application-php/',
      },
    ],
  },
]

interface FrameworkSelectorProps {
  highlightClassName?: string
}

export function FrameworkSelector({
  highlightClassName = 'text-brand-red-primary',
}: FrameworkSelectorProps) {
  const [activeId, setActiveId] = useState('jdbc')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const active = frameworks.find((f) => f.id === activeId)!
  const hovered = hoveredId ? frameworks.find((f) => f.id === hoveredId) : null
  const displayLabel = hovered?.label ?? active.label

  return (
    <div>
      {/* Subtitle */}
      <h3 className="text-h3-xl text-text-inverse mb-6">
        Connect to TiDB with{' '}
        <span className={cn(highlightClassName, 'font-semibold')}>{displayLabel}</span>
      </h3>

      {/* Framework icon row */}
      <div className="flex gap-3 mb-8">
        {frameworks.map((fw) => (
          <button
            key={fw.id}
            onClick={() => setActiveId(fw.id)}
            onMouseEnter={() => setHoveredId(fw.id)}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => setHoveredId(fw.id)}
            onBlur={() => setHoveredId(null)}
            className={cn(
              'w-20 h-20 rounded-full flex items-center justify-center text-label font-bold transition-colors duration-150 ease-in-out',
              activeId === fw.id
                ? 'bg-text-inverse text-text-primary'
                : 'bg-carbon-800 text-carbon-300 hover:bg-carbon-700'
            )}
            aria-label={fw.label}
            title={fw.label}
          >
            {fw.initials}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16">
        {active.labs.map((lab) => (
          <DeveloperResourceCard
            key={lab.title}
            item={lab}
            tagText="Hands-on Lab"
            tagClassName="bg-brand-blue-medium"
          />
        ))}
      </div>
    </div>
  )
}
