import * as React from 'react'
import { Tabs } from '@/components/ui/Tabs'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

function Pane({ description, bullets }: { description: string; bullets: string[] }) {
  return (
    <div className="section-root grid grid-cols-1 gap-6 lg:grid-cols-12">
      <p className="text-body-lg leading-relaxed text-text-inverse lg:col-span-5">{description}</p>
      <ul className="space-y-2 text-body-md text-secondary lg:col-span-7">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-carbon-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The default marketing configuration — auto-rotating tabs with the
 * left-to-right progress underline timed to `autoSwitchInterval`.
 */
export const AutoSwitch = () => (
  <Tabs
    autoSwitch
    autoSwitchInterval={6000}
    tabs={[
      {
        id: 'oltp',
        label: 'Transactions',
        content: (
          <Pane
            description="Serve millions of concurrent writes with strong consistency and no sharding logic."
            bullets={[
              'Distributed ACID transactions across every region',
              'Online DDL — schema changes without a maintenance window',
              'MySQL 8.0 wire compatibility',
            ]}
          />
        ),
      },
      {
        id: 'analytics',
        label: 'Analytics',
        content: (
          <Pane
            description="Run analytical queries on live data with the columnar TiFlash replica."
            bullets={[
              'No ETL pipeline between OLTP and OLAP',
              'Query routing chosen automatically by the optimizer',
              'Replica count tuned per table',
            ]}
          />
        ),
      },
      {
        id: 'ai',
        label: 'AI Workloads',
        content: (
          <Pane
            description="Store vectors beside the transactional rows they belong to."
            bullets={[
              'Native vector type with HNSW indexing',
              'Hybrid search over vectors, JSON, and SQL predicates',
              'One database for retrieval and application state',
            ]}
          />
        ),
      },
    ]}
  />
)

/**
 * `autoSwitch={false}` — click-only tabs. The active underline is static
 * full-width rather than an animated progress bar.
 */
export const StaticClickOnly = () => (
  <Tabs
    defaultActiveTab="operators"
    tabs={[
      {
        id: 'developers',
        label: 'For Developers',
        content: (
          <div className="section-root space-y-4">
            <p className="text-body-lg text-text-inverse">
              Ship on a database that speaks MySQL and scales without a rewrite.
            </p>
            <p className="text-body-md text-secondary">
              Keep your ORM, your drivers, and your migrations. Point the connection string at TiDB
              Cloud and keep going.
            </p>
            <SecondaryButton href="/developers/">Read the Docs</SecondaryButton>
          </div>
        ),
      },
      {
        id: 'operators',
        label: 'For Platform Teams',
        content: (
          <div className="section-root space-y-4">
            <p className="text-body-lg text-text-inverse">
              Elastic capacity, automated failover, and a single system to operate.
            </p>
            <p className="text-body-md text-secondary">
              Scale storage and compute independently, recover to any point in time, and audit every
              change from one control plane.
            </p>
            <SecondaryButton href="/tidb-cloud/">Explore TiDB Cloud</SecondaryButton>
          </div>
        ),
      },
    ]}
  />
)
