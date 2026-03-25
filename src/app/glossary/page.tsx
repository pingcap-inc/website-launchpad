import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Header, Footer, HeroSection, CtaSection, JsonLd } from '@/components'
import { buildPageSchema, glossaryIndexSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Database & TiDB Glossary — Key Terms Explained | PingCAP',
  description:
    'Definitions of key database, distributed systems, and cloud-native terms used across TiDB products and documentation. From HTAP to TiKV.',
  keywords: [
    'database glossary',
    'HTAP definition',
    'distributed database terms',
    'NewSQL glossary',
    'TiDB terms',
  ],
  openGraph: {
    title: 'Database & TiDB Glossary — Key Terms Explained',
    description:
      'Definitions of key database, distributed systems, and cloud-native terms used across TiDB products and documentation.',
    url: 'https://www.pingcap.com/glossary/',
    siteName: 'PingCAP',
    images: [{ url: 'https://www.pingcap.com/og/glossary.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Database & TiDB Glossary',
    description: 'Key database and distributed systems terms explained.',
    images: ['https://www.pingcap.com/og/glossary.png'],
    creator: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.pingcap.com/glossary/',
    languages: {
      en: 'https://www.pingcap.com/glossary/',
      'x-default': 'https://www.pingcap.com/glossary/',
    },
  },
}

// ─── Glossary data ────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

const terms = [
  // Core Database Terms
  {
    category: 'Core Database Terms',
    items: [
      {
        term: 'HTAP',
        fullName: 'Hybrid Transactional and Analytical Processing',
        definition: (
          <>
            A database architecture that handles both transactional (OLTP) and analytical (OLAP)
            workloads on the same system simultaneously. HTAP eliminates the need for separate
            databases and ETL pipelines, enabling real-time analytics on live transactional data.
            TiDB is purpose-built for HTAP workloads — learn how{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://www.pingcap.com/blog/how-tidb-htap-makes-truly-hybrid-workloads-possible/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TiDB&apos;s HTAP architecture works in practice
            </a>
            .
          </>
        ),
      },
      {
        term: 'OLTP',
        fullName: 'Online Transactional Processing',
        definition:
          'A class of database workloads characterized by high-frequency, short-duration transactions — inserts, updates, and deletes. OLTP systems prioritize low latency and high concurrency. Examples include e-commerce order processing and banking transactions.',
      },
      {
        term: 'OLAP',
        fullName: 'Online Analytical Processing',
        definition: (
          <>
            A class of database workloads involving complex queries over large datasets for business
            intelligence and reporting. OLAP queries typically scan many rows and perform
            aggregations. Traditionally handled by separate data warehouses, but TiDB&apos;s
            columnar storage engine (TiFlash) brings OLAP capabilities to the same cluster — read
            how{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://www.pingcap.com/blog/how-tidb-htap-makes-truly-hybrid-workloads-possible/"
              target="_blank"
              rel="noopener noreferrer"
            >
              an HTAP database handles both at the same time
            </a>
            .
          </>
        ),
      },
      {
        term: 'NewSQL',
        fullName: 'NewSQL',
        definition:
          'Modern relational databases that deliver SQL and ACID transactions with improved horizontal scalability and availability compared to traditional RDBMS. “NewSQL” is outcome-focused and not inherently cloud-native by design, even though many deployments run in cloud environments.',
      },
      {
        term: 'Distributed SQL',
        fullName: 'Distributed SQL Database',
        definition: (
          <>
            A cloud-native SQL database that operates as one logical system while automatically
            partitioning, replicating, and routing data and queries across nodes for scale and fault
            tolerance. TiDB is a distributed SQL database, providing MySQL compatibility with
            transparent distribution and resilience. See{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://www.pingcap.com/blog/why-distributed-sql-databases-elevate-modern-app-dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              why distributed SQL databases elevate modern application development
            </a>{' '}
            — covering architecture, partitioning, and ACID at scale.
          </>
        ),
      },
    ],
  },
  // TiDB-Specific Terms
  {
    category: 'TiDB-Specific Terms',
    items: [
      {
        term: 'TiKV',
        fullName: 'Ti Key-Value Store',
        definition: (
          <>
            The distributed transactional key-value storage engine that powers TiDB. TiKV stores
            data across multiple nodes using the Raft consensus algorithm for strong consistency.
            For a deep dive into TiKV&apos;s internals, see the{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://docs.pingcap.com/tidb/stable/tikv-overview"
              target="_blank"
              rel="noopener noreferrer"
            >
              TiKV overview in TiDB Docs
            </a>
            . It is also available as a standalone CNCF graduated project for teams that need a
            distributed key-value store without the SQL layer.
          </>
        ),
      },
      {
        term: 'TiFlash',
        fullName: 'TiFlash Columnar Storage',
        definition: (
          <>
            TiDB&apos;s columnar storage extension that enables real-time OLAP queries. TiFlash
            maintains a columnar replica of TiKV data asynchronously, allowing analytical queries to
            run on column-oriented storage for significantly better performance — without impacting
            transactional workloads on TiKV. See the{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://docs.pingcap.com/tidb/stable/tiflash-overview"
              target="_blank"
              rel="noopener noreferrer"
            >
              TiFlash overview
            </a>{' '}
            for deployment and configuration details.
          </>
        ),
      },
      {
        term: 'PD',
        fullName: 'Placement Driver',
        definition: (
          <>
            The metadata management component of a TiDB cluster. PD is a central component of the{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://docs.pingcap.com/tidb/stable/tidb-architecture"
              target="_blank"
              rel="noopener noreferrer"
            >
              TiDB architecture
            </a>
            , responsible for storing cluster topology, allocating transaction IDs (timestamps), and
            orchestrating data placement and load balancing across TiKV nodes. It uses etcd
            internally for distributed consensus.
          </>
        ),
      },
      {
        term: 'Raft',
        fullName: 'Raft Consensus Algorithm',
        definition: (
          <>
            A distributed consensus algorithm used by TiKV to ensure data consistency across
            replicas. Raft elects a leader node for each data region, and all writes must be
            acknowledged by a majority of replicas before committing — providing strong consistency
            guarantees even in the event of node failures. For an in-depth look at how Raft is
            implemented inside TiKV, see{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://www.pingcap.com/blog/building-a-large-scale-distributed-storage-system-based-on-raft/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Building a Large-scale Distributed Storage System Based on Raft
            </a>
            .
          </>
        ),
      },
    ],
  },
  // Cloud & Infrastructure Terms
  {
    category: 'Cloud & Infrastructure Terms',
    items: [
      {
        term: 'Horizontal Scaling',
        fullName: 'Horizontal Scaling (Scale-Out)',
        definition: (
          <>
            Adding more nodes to a distributed system to increase capacity, as opposed to vertical
            scaling (adding more resources to a single node). TiDB{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://www.pingcap.com/horizontal-scaling-vs-vertical-scaling/"
              target="_blank"
              rel="noopener noreferrer"
            >
              scales horizontally
            </a>{' '}
            — you add TiKV nodes to increase storage and throughput, and TiDB nodes to increase
            query concurrency, without downtime.
          </>
        ),
      },
      {
        term: 'Multi-Tenancy',
        fullName: 'Multi-Tenancy',
        definition: (
          <>
            An architecture where a single database cluster serves multiple tenants (customers or
            teams) with isolated resources and data. TiDB Cloud supports{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://www.pingcap.com/blog/multi-tenant-architecture-enhancing-database-scalability-tidb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              multi-tenancy
            </a>{' '}
            through resource groups and access controls, enabling shared infrastructure with
            tenant-level isolation.
          </>
        ),
      },
      {
        term: 'Elastic Scaling',
        fullName: 'Elastic Scaling',
        definition:
          'The ability to automatically scale database resources up or down in response to workload changes. TiDB Cloud provides elastic scaling — clusters expand to handle traffic spikes and contract during off-peak hours, reducing cost without manual intervention.',
      },
      {
        term: 'ACID',
        fullName: 'Atomicity, Consistency, Isolation, Durability',
        definition: (
          <>
            The four properties that guarantee reliable database transactions. TiDB provides full
            ACID compliance at the distributed level — a transaction either commits across all nodes
            or rolls back entirely, even in multi-region deployments. See how{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://www.pingcap.com/blog/acid-at-scale-why-mysql-needs-distributed-sql-alternative/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ACID scales in a distributed SQL database
            </a>{' '}
            — and why it matters beyond single-node MySQL.
          </>
        ),
      },
    ],
  },
]

const schema = buildPageSchema({
  path: '/glossary/',
  title: 'Database & TiDB Glossary — Key Terms Explained | PingCAP',
  description:
    'Definitions of key database, distributed systems, and cloud-native terms used across TiDB products and documentation.',
  pageType: 'CollectionPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Glossary', path: '/glossary/' },
  ],
  image: 'https://www.pingcap.com/og/glossary.png',
  extraSchemas: [
    glossaryIndexSchema({ termCount: terms.reduce((acc, c) => acc + c.items.length, 0) }),
  ],
})

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        {/* Hero */}
        <HeroSection
          eyebrow="GLOSSARY"
          headline="Database Terms, Defined"
          subheadline="Clear definitions of distributed database, cloud-native, and TiDB-specific terminology — written for engineers, not marketers."
          layout="centered"
        />

        {/* Term sections */}
        {terms.map((category) => (
          <section
            key={category.category}
            className="py-section-sm lg:pb-section bg-bg-primary"
            aria-labelledby={`section-${category.category.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
              {/* Category heading */}
              <h2
                id={`section-${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="font-mono text-eyebrow text-carbon-400 mb-12"
              >
                {category.category.toUpperCase()}
              </h2>

              {/* Terms */}
              <div className="flex flex-col gap-0 divide-y divide-border-subtle/20">
                {category.items.map((item) => (
                  <article
                    key={item.term}
                    className="py-10 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12"
                  >
                    {/* Term + full name */}
                    <div className="md:col-span-1">
                      <h3
                        id={slugify(item.term)}
                        className="text-h3-lg font-bold text-text-inverse mb-1"
                      >
                        {item.term}
                      </h3>
                      {item.fullName !== item.term && (
                        <p className="text-body-sm text-text-inverse/40 font-mono">
                          {item.fullName}
                        </p>
                      )}
                    </div>

                    {/* Definition */}
                    <div className="md:col-span-3">
                      <p className="text-body-md text-text-inverse/75 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <CtaSection
          title="Ready to Put These Concepts Into Practice?"
          subtitle="TiDB Cloud brings HTAP, elastic scaling, and MySQL compatibility to a fully managed service."
          primaryCta={{ text: 'Start for Free', href: 'https://tidbcloud.com/free-trial/' }}
          secondaryCta={{ text: 'Read the Docs', href: 'https://docs.pingcap.com/' }}
          background="red"
        />
      </main>
      <Footer />
    </>
  )
}
