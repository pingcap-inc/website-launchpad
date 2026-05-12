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
      {
        term: 'Quorum',
        fullName: 'Quorum (Distributed Consensus)',
        definition:
          "The minimum number of replica nodes that must agree before a write is considered committed in a distributed database. TiDB's storage engine, TiKV, uses the Raft consensus protocol: a write must be acknowledged by a majority of replicas in a Raft group before it is durable. This ensures strong consistency even when individual nodes fail.",
      },
      {
        term: 'Replication',
        fullName: 'Data Replication',
        definition:
          'The process of maintaining multiple synchronized copies of data across nodes. In TiDB, TiKV automatically replicates each data Region to a configurable number of replicas (default: three) using the Raft consensus algorithm. Replication is the mechanism that delivers both fault tolerance and high availability.',
      },
      {
        term: 'Sharding',
        fullName: 'Data Sharding',
        definition:
          'The practice of splitting a dataset into smaller chunks (shards or partitions) distributed across multiple nodes. TiDB performs sharding transparently — data is divided into Regions (fixed-size key-range chunks) and automatically distributed across TiKV nodes. Applications do not need to implement sharding logic or choose partition keys.',
      },
      {
        term: 'Strong Consistency',
        fullName: 'Strong Consistency (Linearizability)',
        definition:
          'A consistency model guaranteeing that once a write is committed, all subsequent reads reflect that write — regardless of which node serves the request. TiDB is strongly consistent by default. All reads see the latest committed state, eliminating the stale-read anomalies common in eventually consistent systems.',
      },
      {
        term: 'Eventual Consistency',
        fullName: 'Eventual Consistency',
        definition:
          'A weaker consistency model where replicas are allowed to diverge temporarily, converging to the same state only after sufficient time has passed with no new writes. Many NoSQL databases default to eventual consistency to maximize write throughput. TiDB does not use eventual consistency for primary reads — it provides strong consistency guarantees across the distributed cluster.',
      },
      {
        term: 'CAP Theorem',
        fullName: 'CAP Theorem (Consistency, Availability, Partition Tolerance)',
        definition:
          'A theoretical framework stating that a distributed system can fully guarantee at most two of three properties simultaneously: Consistency (every read returns the latest write), Availability (every request receives a response), and Partition Tolerance (the system continues operating despite network splits). TiDB prioritizes Consistency and Partition Tolerance (CP), ensuring strong consistency even in the event of network partitions, with availability maintained through automatic failover.',
      },
      {
        term: 'Serializable Isolation',
        fullName: 'Serializable Isolation',
        definition:
          'The strictest standard transaction isolation level, guaranteeing that the outcome of concurrent transactions is identical to some serial (one-at-a-time) execution. TiDB supports Snapshot Isolation and Repeatable Read by default, and provides Serializable behavior through its pessimistic locking mode — preventing anomalies such as write skew and phantom reads.',
      },
      {
        term: 'Two-Phase Commit (2PC)',
        fullName: 'Two-Phase Commit',
        definition:
          "A distributed protocol that ensures all participants in a distributed transaction either commit or abort together. TiDB uses a modified 2PC protocol coordinated by PD (Placement Driver) to implement distributed ACID transactions across TiKV nodes. The prepare phase locks resources across nodes; the commit phase releases them atomically.",
      },
      {
        term: 'Consensus Algorithm',
        fullName: 'Distributed Consensus Algorithm',
        definition: (
          <>
            A protocol that enables nodes in a distributed system to agree on a single value or
            state, even in the presence of failures. TiDB&apos;s storage layer (TiKV) uses the{' '}
            <strong>Raft</strong> consensus algorithm, which elects a leader per Region and requires
            a quorum of replicas to acknowledge each write before committing.
          </>
        ),
      },
      {
        term: 'Write-Ahead Log (WAL)',
        fullName: 'Write-Ahead Log',
        definition:
          'A durability mechanism in which changes are written to a sequential log before being applied to the main data store. If the node crashes mid-write, the WAL allows the database to replay or roll back incomplete operations during recovery. TiKV uses RocksDB as its storage engine, which maintains a WAL for crash recovery and durability.',
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
      {
        term: 'Region',
        fullName: 'TiDB Region',
        definition:
          'The fundamental unit of data distribution in TiDB. A Region is a contiguous key-range chunk of approximately 96 MB, stored and replicated as a Raft group across TiKV nodes. PD tracks all Regions and orchestrates their placement and load balancing across the cluster. When a Region grows beyond the size threshold, it splits automatically.',
      },
      {
        term: 'TiCDC',
        fullName: 'TiDB Change Data Capture',
        definition:
          "TiDB's real-time change data capture and replication tool. TiCDC reads the change log from TiKV and streams row-level changes to downstream systems — including Kafka, MySQL, and object storage — with low latency. It is used for event-driven architectures, data synchronization, and feeding analytics pipelines without ETL batch jobs.",
      },
      {
        term: 'TiDB Operator',
        fullName: 'TiDB Operator (Kubernetes)',
        definition:
          'The official Kubernetes operator for deploying and managing TiDB clusters on Kubernetes. TiDB Operator automates provisioning, scaling, upgrades, backup, and failover for TiDB components (TiDB, TiKV, PD, TiFlash) on any Kubernetes-compatible platform. It is a production-grade tool maintained by PingCAP and widely used in cloud-native deployments.',
      },
      {
        term: 'Hot Spot',
        fullName: 'Hot Spot (Write/Read Hot Spot)',
        definition: (
          <>
            A condition where a disproportionate volume of read or write traffic concentrates on a
            small number of TiKV nodes or Regions, degrading performance. Hot spots commonly occur
            when applications use monotonically increasing keys (e.g., auto-increment IDs) as
            primary keys, causing all new writes to target the same Region. TiDB provides{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://docs.pingcap.com/tidb/stable/troubleshoot-hot-spot-issues/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SHARD_ROW_ID_BITS and AUTO_RANDOM
            </a>{' '}
            to distribute write load evenly.
          </>
        ),
      },
      {
        term: 'Placement Rules',
        fullName: 'TiDB Placement Rules',
        definition:
          "A TiDB feature that controls where data is stored across nodes, availability zones, and regions by specifying constraints on Raft replica placement. Placement rules enable data locality — for example, requiring certain tables to be stored only in specific geographic regions to satisfy data residency regulations. This is TiDB's mechanism for multi-region data control, distinct from geo-partitioning approaches.",
      },
      {
        term: 'Resource Control (RU)',
        fullName: 'Resource Control / Resource Units (RU)',
        definition: (
          <>
            TiDB&apos;s workload isolation feature, allowing administrators to define Resource
            Groups with guaranteed and burstable quotas expressed in Request Units (RUs). RUs
            abstract CPU, I/O, and memory consumption into a single metric, enabling fair sharing of
            cluster resources across different applications or tenants.{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://docs.pingcap.com/tidb/stable/tidb-resource-control-ru-groups/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more in the TiDB docs.
            </a>
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
      {
        term: 'High Availability (HA)',
        fullName: 'High Availability',
        definition:
          'A system property ensuring that a database remains accessible even when individual components fail. TiDB achieves high availability through Raft-based multi-replica storage: when a TiKV node fails, the Raft group automatically elects a new leader from surviving replicas, and PD rebalances data — typically within seconds and without data loss.',
      },
      {
        term: 'RPO / RTO',
        fullName: 'Recovery Point Objective / Recovery Time Objective',
        definition: (
          <>
            Two metrics used to characterize database disaster recovery posture. <strong>RPO</strong>{' '}
            is the maximum acceptable data loss (measured in time) after a failure.{' '}
            <strong>RTO</strong> is the maximum acceptable time to restore service. TiDB is designed
            for near-zero RPO and low RTO through synchronous Raft replication — committed data is
            never lost across a replica majority failure.
          </>
        ),
      },
      {
        term: 'Multi-Region Deployment',
        fullName: 'Multi-Region Deployment',
        definition:
          "Running a database cluster across multiple geographic regions to reduce latency for global users and survive regional failures. TiDB supports multi-region deployments through placement rules and Raft-based replication across availability zones. Note: TiDB's active-active multi-region support across regions is an upcoming capability — current multi-region deployments use placement rules for data locality within a cluster.",
      },
      {
        term: 'Availability Zone (AZ)',
        fullName: 'Availability Zone',
        definition:
          'A physically isolated data center (or subset of a data center) within a cloud region, with independent power, networking, and cooling. Distributing TiKV replicas across availability zones ensures that a single-AZ failure does not cause data loss or downtime. TiDB recommends placing Raft replicas across at least three AZs for production clusters.',
      },
      {
        term: 'Cloud-Native Database',
        fullName: 'Cloud-Native Database',
        definition:
          "A database designed from the ground up to run on cloud infrastructure, taking advantage of elastic compute, managed storage, container orchestration, and pay-as-you-go pricing. Cloud-native databases separate storage from compute, support auto-scaling, and are typically deployed via containers or managed services. TiDB Cloud is PingCAP's fully managed cloud-native offering, available on AWS and Google Cloud.",
      },
      {
        term: 'Compute-Storage Separation',
        fullName: 'Compute-Storage Separation (Disaggregated Architecture)',
        definition:
          'An architecture in which the query-processing layer (compute) and the data-persistence layer (storage) scale independently. This contrasts with shared-nothing architectures where compute and storage are bundled per node. TiDB Cloud Starter uses a disaggregated storage model, allowing compute and storage to scale independently and enabling cost-efficient elastic scaling for variable workloads.',
      },
      {
        term: 'Change Data Capture (CDC)',
        fullName: 'Change Data Capture',
        definition: (
          <>
            A technique for tracking and streaming row-level changes (inserts, updates, deletes)
            from a database to downstream consumers in real time. CDC enables event-driven
            architectures, real-time data synchronization, and analytics on live operational data
            without full table scans or batch ETL jobs. TiDB&apos;s CDC tool is{' '}
            <a
              className="underline decoration-text-inverse/30 hover:decoration-text-inverse/60 transition-colors"
              href="https://docs.pingcap.com/tidb/stable/ticdc-overview/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TiCDC
            </a>
            .
          </>
        ),
      },
      {
        term: 'ETL',
        fullName: 'Extract, Transform, Load',
        definition:
          'A data integration pattern in which data is extracted from a source system, transformed into a target format, and loaded into a destination (typically a data warehouse). ETL pipelines introduce latency and operational complexity. HTAP databases like TiDB reduce the need for ETL by allowing analytical queries to run directly on live transactional data via TiFlash, the columnar storage extension.',
      },
      {
        term: 'Vector Database',
        fullName: 'Vector Database',
        definition:
          'A database optimized for storing, indexing, and querying high-dimensional vector embeddings — numerical representations of unstructured data such as text, images, or audio generated by machine learning models. Vector databases power similarity search, semantic search, and retrieval-augmented generation (RAG) in AI applications. TiDB supports vector search natively, enabling teams to combine structured SQL queries with vector similarity search in a single database without managing a separate vector store.',
      },
      {
        term: 'RAG',
        fullName: 'Retrieval-Augmented Generation',
        definition:
          "An AI architecture pattern that improves large language model (LLM) output by retrieving relevant context from an external knowledge base before generating a response. The retrieved context — often sourced via vector similarity search — grounds the LLM in factual, up-to-date information. TiDB's vector search capability makes it a natural fit for RAG pipelines that need both structured data queries and semantic retrieval in one system.",
      },
      {
        term: 'Serverless Database',
        fullName: 'Serverless Database',
        definition:
          "A database deployment model in which the cloud provider automatically provisions, scales, and manages infrastructure in response to workload. Users pay only for the resources consumed rather than provisioning fixed capacity. TiDB Cloud Starter is PingCAP's serverless-style tier, offering automatic scaling and consumption-based pricing for development and variable workloads.",
      },
    ],
  },
  // Consistency & Transaction Terms
  {
    category: 'Consistency & Transaction Terms',
    items: [
      {
        term: 'Snapshot Isolation',
        fullName: 'Snapshot Isolation (SI)',
        definition:
          'A transaction isolation level where each transaction reads from a consistent snapshot of the database taken at the start of the transaction, rather than being affected by concurrent writes. Snapshot isolation prevents dirty reads and non-repeatable reads while allowing high concurrency. TiDB uses Multi-Version Concurrency Control (MVCC) to implement snapshot isolation.',
      },
      {
        term: 'MVCC',
        fullName: 'Multi-Version Concurrency Control',
        definition:
          'A concurrency control mechanism that maintains multiple versions of each row to allow readers and writers to operate simultaneously without blocking each other. Readers access a consistent snapshot without locking rows; writers create new versions rather than overwriting existing ones. TiDB and TiKV use MVCC as the foundation for both snapshot isolation and non-blocking reads.',
      },
      {
        term: 'Pessimistic Locking',
        fullName: 'Pessimistic Locking',
        definition:
          'A concurrency control strategy that acquires locks on rows at the start of a transaction — before the actual write — to prevent conflicts. Pessimistic locking is suitable for high-contention workloads where conflicts are frequent. TiDB supports pessimistic transactions as the default mode, matching the behavior of MySQL and making application migration straightforward.',
      },
      {
        term: 'Optimistic Locking',
        fullName: 'Optimistic Locking',
        definition:
          'A concurrency control strategy that defers conflict detection to commit time, assuming conflicts are rare. If another transaction has modified the same data since the current transaction read it, the commit fails and the application must retry. TiDB also supports optimistic transactions, which can outperform pessimistic locking in low-contention, read-heavy workloads.',
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
        <section className="bg-bg-primary py-10 md:py-0">
          <HeroSection
            eyebrow="GLOSSARY"
            headline="Database Terms, Defined"
            subheadline="Clear definitions of distributed database, cloud-native, and TiDB-specific terminology — written for engineers, not marketers."
            layout="centered"
          />
        </section>

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
        <section className="py-section-sm lg:py-section-md bg-brand-red-bg">
          <CtaSection
            title="Ready to Put These Concepts Into Practice?"
            subtitle="TiDB Cloud brings HTAP, elastic scaling, and MySQL compatibility to a fully managed service."
            primaryCta={{ text: 'Start for Free', href: 'https://tidbcloud.com/free-trial/' }}
            secondaryCta={{ text: 'Read the Docs', href: 'https://docs.pingcap.com/' }}
            image={{
              image: {
                url: 'https://static.pingcap.com/files/2025/04/27224533/CTA-cube-red-mini.svg',
              },
              alt: 'CTA cube',
              width: 278,
              height: 256,
            }}
          />
        </section>
      </main>

      <Footer />
    </>
  )
}
