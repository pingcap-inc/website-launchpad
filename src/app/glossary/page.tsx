import type { Metadata } from 'next'
import { Navbar, Footer, HeroSection, CtaSection, JsonLd } from '@/components'
import { buildPageSchema, glossaryIndexSchema } from '@/lib/schema'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Database & TiDB Glossary — Key Terms Explained | PingCAP',
  description: 'Definitions of key database, distributed systems, and cloud-native terms used across TiDB products and documentation. From HTAP to TiKV.',
  keywords: ['database glossary', 'HTAP definition', 'distributed database terms', 'NewSQL glossary', 'TiDB terms'],
  openGraph: {
    title: 'Database & TiDB Glossary — Key Terms Explained',
    description: 'Definitions of key database, distributed systems, and cloud-native terms used across TiDB products and documentation.',
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
      'en': 'https://www.pingcap.com/glossary/',
      'ja': 'https://www.pingcap.com/ja/glossary/',
      'x-default': 'https://www.pingcap.com/glossary/',
    },
  },
}

// ─── Glossary data ────────────────────────────────────────────────────────────

const terms = [
  // Core Database Terms
  {
    category: 'Core Database Terms',
    items: [
      {
        term: 'HTAP',
        fullName: 'Hybrid Transactional and Analytical Processing',
        definition:
          'A database architecture that handles both transactional (OLTP) and analytical (OLAP) workloads on the same system simultaneously. HTAP eliminates the need for separate databases and ETL pipelines, enabling real-time analytics on live transactional data. TiDB is purpose-built for HTAP workloads.',
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
        definition:
          'A class of database workloads involving complex queries over large datasets for business intelligence and reporting. OLAP queries typically scan many rows and perform aggregations. Traditionally handled by separate data warehouses, but TiDB\'s columnar storage engine (TiFlash) brings OLAP capabilities to the same cluster.',
      },
      {
        term: 'NewSQL',
        fullName: 'NewSQL',
        definition:
          'A category of modern relational databases designed to provide the scalability of NoSQL systems while maintaining the ACID guarantees and SQL interface of traditional RDBMS. TiDB is a NewSQL database — it scales horizontally like NoSQL but remains fully MySQL-compatible.',
      },
      {
        term: 'Distributed SQL',
        fullName: 'Distributed SQL Database',
        definition:
          'A SQL database that distributes data and query processing across multiple nodes for horizontal scalability and fault tolerance. Unlike sharded MySQL, a distributed SQL database handles data distribution transparently — applications interact with a standard SQL interface while the database manages partitioning, replication, and routing internally.',
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
        definition:
          'The distributed transactional key-value storage engine that powers TiDB. TiKV stores data across multiple nodes using the Raft consensus algorithm for strong consistency. It is also available as a standalone CNCF graduated project for teams that need a distributed key-value store without the SQL layer.',
      },
      {
        term: 'TiFlash',
        fullName: 'TiFlash Columnar Storage',
        definition:
          'TiDB\'s columnar storage extension that enables real-time OLAP queries. TiFlash maintains a columnar replica of TiKV data asynchronously, allowing analytical queries to run on column-oriented storage for significantly better performance — without impacting transactional workloads on TiKV.',
      },
      {
        term: 'PD',
        fullName: 'Placement Driver',
        definition:
          'The metadata management component of a TiDB cluster. PD is responsible for storing cluster topology, allocating transaction IDs (timestamps), and orchestrating data placement and load balancing across TiKV nodes. It uses etcd internally for distributed consensus.',
      },
      {
        term: 'Raft',
        fullName: 'Raft Consensus Algorithm',
        definition:
          'A distributed consensus algorithm used by TiKV to ensure data consistency across replicas. Raft elects a leader node for each data region, and all writes must be acknowledged by a majority of replicas before committing — providing strong consistency guarantees even in the event of node failures.',
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
        definition:
          'Adding more nodes to a distributed system to increase capacity, as opposed to vertical scaling (adding more resources to a single node). TiDB scales horizontally — you add TiKV nodes to increase storage and throughput, and TiDB nodes to increase query concurrency, without downtime.',
      },
      {
        term: 'Multi-Tenancy',
        fullName: 'Multi-Tenancy',
        definition:
          'An architecture where a single database cluster serves multiple tenants (customers or teams) with isolated resources and data. TiDB Cloud supports multi-tenancy through resource groups and access controls, enabling shared infrastructure with tenant-level isolation.',
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
        definition:
          'The four properties that guarantee reliable database transactions. TiDB provides full ACID compliance at the distributed level — a transaction either commits across all nodes or rolls back entirely, even in multi-region deployments.',
      },
    ],
  },
]

const schema = buildPageSchema({
  path: '/glossary/',
  title: 'Database & TiDB Glossary — Key Terms Explained | PingCAP',
  description: 'Definitions of key database, distributed systems, and cloud-native terms used across TiDB products and documentation.',
  pageType: 'CollectionPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Glossary', path: '/glossary/' },
  ],
  image: 'https://www.pingcap.com/og/glossary.png',
  extraSchemas: [glossaryIndexSchema({ termCount: terms.reduce((acc, c) => acc + c.items.length, 0) })],
})

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GlossaryPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Navbar />
      <main className="pt-[62px] lg:pt-20">

        {/* Hero */}
        <HeroSection
          eyebrow="GLOSSARY"
          headline="Database Terms, Defined"
          subheadline="Clear definitions of distributed database, cloud-native, and TiDB-specific terminology — written for engineers, not marketers."
        />

        {/* Term sections */}
        {terms.map((category) => (
          <section
            key={category.category}
            className="py-section md:py-section-sm bg-bg-primary"
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
                      <h3 className="text-h3-lg font-bold text-text-inverse mb-1">
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
          primaryCta={{ text: 'Start for Free', href: '/signup/' }}
          secondaryCta={{ text: 'Read the Docs', href: '/docs/' }}
          background="red"
        />

      </main>
      <Footer />
    </>
  )
}
