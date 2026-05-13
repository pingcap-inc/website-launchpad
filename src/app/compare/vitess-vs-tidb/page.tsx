import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "Vitess vs TiDB: Which Scales MySQL Better? - TiDB",
  description: "Compare Vitess vs TiDB across sharding, consistency, Kubernetes, and operations. See which approach fits MySQL scale-out and distributed SQL needs.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/compare/vitess-vs-tidb/' },
  openGraph: {
    title: "Vitess vs TiDB: Which Scales MySQL Better? - TiDB",
    description: "Compare Vitess vs TiDB across sharding, consistency, Kubernetes, and operations. See which approach fits MySQL scale-out and distributed SQL needs.",
    url: 'https://www.pingcap.com/compare/vitess-vs-tidb/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
}

const schema = buildPageSchema({
  path: "/compare/vitess-vs-tidb/",
  title: "Vitess vs TiDB: Which Scales MySQL Better? - TiDB",
  description: "Compare Vitess vs TiDB across sharding, consistency, Kubernetes, and operations. See which approach fits MySQL scale-out and distributed SQL needs.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Vitess vs TiDB: How to Choose the Right Path for MySQL Scale", path: "/compare/vitess-vs-tidb/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "Vitess vs TiDB: How to Choose the Right Path for MySQL Scale",
  "meta": {
    "title": "Vitess vs TiDB: Which Scales MySQL Better? - TiDB",
    "description": "Compare Vitess vs TiDB across sharding, consistency, Kubernetes, and operations. See which approach fits MySQL scale-out and distributed SQL needs.",
    "canonical": "/compare/vitess-vs-tidb/"
  },
  "sections": [
    {
      "id": "hero-1",
      "type": "hero",
      "props": {
        "layout": "image-right",
        "headline": "Vitess vs TiDB: How to Choose the Right Path for MySQL Scale",
        "heroImage": {
          "image": {
            "url": "https://static.pingcap.com/images/f54533cc-1000011158.svg"
          },
          "alt": "hero image",
          "width": 500,
          "height": 400
        }
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "tableOfContents-1",
      "type": "tableOfContents",
      "props": {
        "items": [
          {
            "id": "intro",
            "label": "Introduction",
            "level": 1
          },
          {
            "id": "vitess-vs-tidb-at-a-glance",
            "label": "Vitess vs TiDB at a Glance",
            "level": 1
          },
          {
            "id": "key-differences",
            "label": "Key Differences",
            "level": 2
          },
          {
            "id": "what-changes-when-you-compare-mysql-sharding-to-distributed-sql",
            "label": "What Changes When You Compare MySQL Sharding to Distributed SQL",
            "level": 1
          },
          {
            "id": "vitess-as-mysql-sharding-middleware",
            "label": "Vitess as MySQL Sharding Middleware",
            "level": 2
          },
          {
            "id": "tidb-as-a-native-distributed-sql-database",
            "label": "TiDB as a Native Distributed SQL Database",
            "level": 2
          },
          {
            "id": "how-architecture-affects-long-term-complexity",
            "label": "How Architecture Affects Long-Term Complexity",
            "level": 2
          },
          {
            "id": "how-do-vitess-and-tidb-handle-consistency-and-cross-shard-queries",
            "label": "How Do Vitess and TiDB Handle Consistency and Cross-Shard Queries",
            "level": 1
          },
          {
            "id": "read-behavior-and-isolation-tradeoffs",
            "label": "Read Behavior and Isolation Tradeoffs",
            "level": 2
          },
          {
            "id": "cross-shard-query-performance",
            "label": "Cross-Shard Query Performance",
            "level": 2
          },
          {
            "id": "failure-recovery-and-availability-zone-resilience",
            "label": "Failure Recovery and Availability Zone Resilience",
            "level": 2
          },
          {
            "id": "which-platform-is-easier-to-run-on-kubernetes-and-cloud-infrastructure",
            "label": "Which Platform Is Easier to Run on Kubernetes and Cloud Infrastructure",
            "level": 1
          },
          {
            "id": "scaling-and-rebalancing",
            "label": "Scaling and Rebalancing",
            "level": 2
          },
          {
            "id": "kubernetes-operations-and-tooling",
            "label": "Kubernetes Operations and Tooling",
            "level": 2
          },
          {
            "id": "monitoring-backups-and-change-management",
            "label": "Monitoring, Backups, and Change Management",
            "level": 2
          },
          {
            "id": "where-does-tidb-pull-ahead-for-analytics-and-modern-workloads",
            "label": "Where Does TiDB Pull Ahead for Analytics and Modern Workloads",
            "level": 1
          },
          {
            "id": "real-time-analytics-without-a-separate-stack",
            "label": "Real-Time Analytics Without a Separate Stack",
            "level": 2
          },
          {
            "id": "multi-tenant-and-high-growth-application-fit",
            "label": "Multi-Tenant and High-Growth Application Fit",
            "level": 2
          },
          {
            "id": "how-should-buyers-compare-pricing-models-and-total-cost",
            "label": "How Should Buyers Compare Pricing Models and Total Cost",
            "level": 1
          },
          {
            "id": "infrastructure-and-staffing-costs",
            "label": "Infrastructure and Staffing Costs",
            "level": 2
          },
          {
            "id": "cost-of-sharding-over-time",
            "label": "Cost of Sharding Over Time",
            "level": 2
          },
          {
            "id": "checklist-when-should-you-choose-vitess-vs-tidb",
            "label": "Checklist: When Should You Choose Vitess vs TiDB",
            "level": 1
          },
          {
            "id": "choose-vitess-if",
            "label": "Choose Vitess If",
            "level": 2
          },
          {
            "id": "choose-tidb-if",
            "label": "Choose TiDB If",
            "level": 2
          },
          {
            "id": "how-tidb-helps-teams-move-beyond-mysql-sharding",
            "label": "How TiDB Helps Teams Move Beyond MySQL Sharding",
            "level": 1
          },
          {
            "id": "a-simpler-path-to-scale-and-consistency",
            "label": "A Simpler Path to Scale and Consistency",
            "level": 2
          },
          {
            "id": "ready-to-evaluate-a-better-alternative-to-mysql-sharding",
            "label": "Ready to Evaluate a Better Alternative to MySQL Sharding",
            "level": 1
          },
          {
            "id": "faq",
            "label": "FAQs: Vitess vs TiDB",
            "level": 1
          }
        ],
        "sticky": true
      }
    },
    {
      "id": "intro",
      "type": "richTextBlock",
      "props": {
        "content": "**Updated May 2026 | Author: Brian Foster (Global Content Director) | Reviewed by: Ravish Patel (Solutions Engineer)**\n\nVitess and TiDB both target teams that need to scale MySQL beyond a single primary, but they take different architectural paths. Vitess is MySQL sharding middleware that routes queries across many MySQL instances. TiDB is a native [distributed SQL database](https://www.pingcap.com/tidb/) with a MySQL-compatible wire protocol, automatic sharding, Raft-based strong consistency, and built-in HTAP analytics.\n\nThis comparison is for software architects, platform engineers, and database leaders evaluating how to scale MySQL workloads without inheriting long-term operational drag. It covers architecture, sharding model, consistency, cross-shard queries, Kubernetes operations, analytics, and pricing model.\n\n:::card tone=light\n\n**Verdict**: Choose Vitess when you have a large existing MySQL estate, deep MySQL operational expertise, and want to scale by layering sharding logic on top of vanilla MySQL. Choose TiDB when you want automatic data distribution, ACID transactions across the cluster, Raft-based zero-data-loss failover, and real-time analytics without managing a sharded MySQL fleet underneath.\n\n**Key takeaways:**\n\n- **Choose TiDB** if you want automatic sharding and rebalancing rather than designing and maintaining VSchemas, vindexes, and shard keys.\n- **Choose TiDB** if strong consistency and distributed ACID transactions across all shards are first-class requirements rather than optional add-ons.\n- **Choose TiDB** if you need real-time analytics on operational data without building ETL pipelines to a separate warehouse.\n- **Choose Vitess** if you have an established MySQL estate and want to keep MySQL as the underlying storage engine while scaling out.\n- **Choose Vitess** if your team has deep MySQL replication, backup, and tooling expertise that you want to preserve as you scale.\n\n:::\n",
        "className": "rich-text-block--raw-source"
      },
      "style": {
        "background": "none",
        "spacing": "section",
        "removePaddingTop": true,
        "removePaddingBottom": true
      }
    },
    {
      "id": "cta-intro-1",
      "type": "cta",
      "props": {
        "title": "",
        "subtitle": "See how TiDB replaces MySQL sharding with a single distributed SQL database.",
        "primaryCta": {
          "text": "Explore TiDB",
          "href": "https://www.pingcap.com/tidb/"
        },
        "secondaryCta": {
          "text": "Compare distributed SQL options",
          "href": "https://www.pingcap.com/compare/best-distributed-sql-databases/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "sm",
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/files/2025/06/22092103/1000011430.png"
          }
        }
      }
    },
    {
      "id": "pre-1",
      "type": "richTextBlock",
      "props": {
        "content": "## Vitess vs TiDB at a Glance\n\nThe core tradeoff: Vitess layers routing and shard management on top of MySQL instances. TiDB replaces that stack with a single distributed SQL database that handles sharding, replication, consistency, and analytics natively. TiDB is regularly compared against the [best distributed SQL databases](https://www.pingcap.com/compare/best-distributed-sql-databases/) when teams evaluate scale-out paths from MySQL.\n\n| Category | Vitess | TiDB | Why it matters |\n|---|---|---|---|\n| Architecture | Sharding middleware (VTGate, VTTablet) over MySQL instances | Distributed SQL: TiDB, TiKV, PD, optional TiFlash | Number of systems your team operates |\n| Sharding model | Manual VSchema, vindexes, shard keys; resharding via VReplication | Automatic Region distribution by PD; no app-level shard logic | Schema design and complexity for uneven growth |\n| Consistency | MySQL replication, async by default; per-shard primary | Raft consensus, snapshot isolation across the cluster | Stale read risk and AZ durability |\n| Cross-shard queries and transactions | Cross-shard queries with constraints; 2PC available but limited | Distributed ACID transactions and joins as default behavior | Where distributed correctness lives: app or database |\n| Analytics | No HTAP; analytics offloaded to a separate warehouse | TiFlash columnar replicas; HTAP on live OLTP data | One system vs several for OLTP plus analytics |\n| Kubernetes operations | vitess-operator across VTGate, VTTablet, MySQL, topology | TiDB Operator manages full cluster lifecycle | Day-two operational burden for platform teams |\n| High availability | MySQL replication plus VTOrc reparenting per shard | Raft failover, zero data loss, replicas span AZs | RPO and RTO during node and AZ failures |\n| Best fit | Established MySQL estates with deep MySQL expertise | Fewer moving parts; automatic sharding, distributed ACID, HTAP | Long-term operational profile of each architecture |\n*Table 1. Vitess vs TiDB across architecture, sharding, consistency, operations, analytics, and best fit.*\n\n### Key Differences\n\nTwo factors most often separate Vitess from TiDB in production. Sharding ownership: Vitess requires teams to design VSchemas, vindexes, and resharding workflows, while TiDB handles distribution automatically inside the database. Consistency and transactions: Vitess inherits MySQL's async replication with cross-shard 2PC as a limited add-on, while TiDB uses Raft consensus with distributed ACID transactions as default behavior. Together these determine how much application code is responsible for distributed correctness.\n\n## What Changes When You Compare MySQL Sharding to Distributed SQL\n\nVitess and TiDB solve the same problem from different starting points. Understanding the architectural contrast predicts how each system behaves as data, traffic, and team grow.\n\n### Vitess as MySQL Sharding Middleware\n\nVitess is a SQL middleware layer that sits in front of MySQL instances. Applications connect to VTGate, a stateless query router that parses SQL, consults a topology service for shard metadata, and routes queries to the appropriate VTTablet processes that manage each underlying MySQL instance. The actual data lives in MySQL itself, replicated using MySQL's built-in replication.\n\nVitess adds capabilities that MySQL alone does not provide: automatic shard routing, online resharding via VReplication, and connection pooling. It also requires teams to define a VSchema describing which tables are sharded, which columns are sharding keys, and which vindex functions map values to shards. The application interacts with Vitess like a single MySQL instance while the cluster operates as many MySQL instances behind the scenes.\n\n### TiDB as a Native Distributed SQL Database\n\nTiDB is a distributed SQL database designed from the start for horizontal scale. It separates compute from storage so each layer scales independently. The TiDB Server layer handles SQL parsing, optimization, and execution as stateless nodes. TiKV provides distributed transactional row storage using Raft consensus, automatically splitting data into Regions that rebalance across nodes as the cluster grows. PD (Placement Driver) manages cluster metadata, allocates timestamps for distributed transactions, and schedules data placement. TiFlash adds optional columnar replicas for real-time analytics.\n\nTiDB speaks the MySQL wire protocol, so MySQL drivers, ORMs, and most query patterns work without modification. The application connects to TiDB the same way it would connect to MySQL, but the underlying storage is a distributed system rather than a single primary with replicas.\n\n### How Architecture Affects Long-Term Complexity\n\nVitess preserves MySQL as the storage engine, which keeps backup tooling, monitoring conventions, and DBA skills intact. The tradeoff is that you operate two systems: the MySQL fleet and the Vitess control plane on top of it. Schema design, sharding decisions, and resharding events remain ongoing engineering work, and the operational surface grows with shard count.\n\nTiDB collapses the MySQL+sharding stack into a single product. Sharding is automatic, replication is built in, and analytics queries run on the same cluster via TiFlash. The tradeoff is that MySQL-specific tooling and DBA habits do not transfer directly. For teams whose long-term concern is reducing operational drag at scale, TiDB removes architectural decisions that Vitess leaves in your hands.\n\n![20260513 135822](https://static.pingcap.com/images/12ff1d31-20260513-135822.png)\n\n*Figure 1. A side-by-side architecture diagram comparing Vitess and TiDB.*\n\n## How do Vitess and TiDB Handle Consistency and Cross-Shard Queries?\n\nConsistency and cross-shard query behavior are where the architectural difference between Vitess and TiDB has the most direct impact on application code and incident response. Vitess inherits MySQL's replication and transaction model. TiDB uses Raft consensus and distributed transactions as default behavior across the cluster.\n\n### Read Behavior and Isolation Tradeoffs\n\nVitess reads inherit the MySQL replication model. Reads from a shard's primary see committed data, but replica reads can be stale because MySQL replication is asynchronous by default. Semi-synchronous replication is available but adds write latency and does not eliminate stale-read risk. Application teams typically route consistency-sensitive reads to the primary.\n\nTiDB uses MVCC with snapshot isolation as the default isolation level, and the snapshot is consistent across the entire cluster. Reads see a globally consistent view at a point in time, regardless of which TiKV node serves them, so there is no separate primary-versus-replica routing decision for application code.\n\n### Cross-Shard Query Performance\n\nVitess can plan and execute cross-shard queries through VTGate, which gathers results from shards and merges them. This works for many query patterns but has constraints. Joins that span shards may require routing hints or schema co-location. Cross-shard transactions can use 2PC mode with caveats around performance and feature support that warrant verification against current Vitess documentation before relying on them in production.\n\nTiDB pushes filters and aggregations down to TiKV and TiFlash, and joins across Regions are routine because the optimizer plans across the entire cluster. Distributed transactions across any number of Regions are a default behavior rather than an optional mode. The application sees the cluster as a single logical SQL database.\n\n### Failure Recovery and Availability Zone Resilience\n\nVitess depends on MySQL replication for durability. When a shard's primary fails, VTOrc detects the failure and reparents to a replica. Recovery time and data loss depend on whether semi-sync replication is configured and how lag is managed at the moment of failure. Spanning availability zones with Vitess requires deliberate replica placement and replication mode tuning to balance latency against durability.\n\nTiDB places Raft replicas across nodes (and typically across availability zones) by default. When a node or AZ fails, the remaining replicas elect a new leader through Raft designed to avoid data loss with no operator intervention. Cross-AZ resilience is a configuration of the cluster topology rather than a separate replication mode to manage. For a deeper technical breakdown of these patterns, including stale read scenarios and AZ outage handling in production, see the [Vitess and TiDB consistency comparison](https://www.pingcap.com/blog/comparing-vitess-tidb-cross-shard-queries-consistency-az-outages/).\n\n## Which Platform is Easier to Run on Kubernetes and Cloud Infrastructure?\n\nFor platform teams, the question is not just which system performs better in benchmarks but which one is easier to operate over years on Kubernetes. This comes down to scaling workflows, operator maturity, and how monitoring, backups, and change management fit into existing platform tooling.\n\n### Scaling and Rebalancing\n\nVitess scales by adding tablets to a keyspace and triggering resharding through VReplication when shards diverge or hot-spot. Resharding is an operator-led workflow with planning, traffic switching, and verification steps.\n\nTiDB scales by adding TiKV nodes for storage and write throughput, or TiDB Server nodes for connection capacity and query throughput. PD rebalances Regions automatically. There is no resharding step because there are no application-level shards. For platform teams, this collapses a recurring operational workflow into a single horizontal-scale action.\n\n### Kubernetes Operations and Tooling\n\nVitess on Kubernetes is operated through vitess-operator, which coordinates VTGate, VTTablet, MySQL instances, and the topology service. The operator covers core lifecycle operations but the multi-component nature of Vitess means more Kubernetes resources to reason about during incidents and upgrades. Verify current vitess-operator maturity against the latest documentation before standardizing on it for production workloads.\n\nTiDB Operator provides purpose-built lifecycle automation for the entire TiDB cluster. It supports rolling upgrades with horizontal scaling via Custom Resource modifications, automated backup to S3-compatible storage, and native Prometheus and Grafana integration. Ninja Van's [TiDB vs Vitess on Kubernetes case study](https://www.pingcap.com/case-study/choose-a-mysql-alternative-over-vitess-and-crdb-to-scale-out-our-databases-on-k8s/) documents an evaluation that compared TiDB against Vitess and CockroachDB on operator maturity, observability, and operational surface area before standardizing on TiDB.\n\n### Monitoring, Backups, and Change Management\n\nVitess exposes Prometheus metrics for VTGate and VTTablet, but observability also requires monitoring the underlying MySQL instances. Backups happen per MySQL instance and must be coordinated across shards for cluster-wide point-in-time recovery. Schema changes use Vitess's online DDL workflow or third-party tools like gh-ost or pt-online-schema-change.\n\nTiDB provides cluster-wide metrics and dashboards through its observability stack. Backups use BR (Backup and Restore), which produces a consistent snapshot across the entire cluster. Online DDL is built into TiDB and runs without blocking reads or writes, so schema changes during peak traffic require less coordination than equivalent changes on a sharded MySQL fleet.",
        "className": "rich-text-block--raw-source"
      },
      "style": {
        "background": "none",
        "spacing": "section",
        "removePaddingTop": true,
        "removePaddingBottom": true
      }
    },
    {
      "id": "cta-intro-2",
      "type": "cta",
      "props": {
        "title": "",
        "subtitle": "Stop spending engineering cycles on sharding workflows that grow with your database fleet.",
        "primaryCta": {
          "text": "Modernize MySQL workloads",
          "href": "https://www.pingcap.com/solutions/modernize-mysql-workloads/"
        },
        "secondaryCta": {
          "text": "Read the sharding playbook",
          "href": "https://www.pingcap.com/playbook-escape-mysql-sharding-pain/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "sm",
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/files/2025/06/22184957/1000011432.png"
          }
        }
      }
    },
    {
      "id": "pre-2",
      "type": "richTextBlock",
      "props": {
        "content": "## Where Does TiDB Pull Ahead for Analytics and Modern Workloads?\n\nIf your evaluation is purely about MySQL OLTP scale-out, Vitess and TiDB both meet the requirement, with different operational profiles. If your roadmap includes real-time analytics, multi-tenant growth, or AI workloads, TiDB consolidates capabilities that Vitess does not provide. Some evaluators only need MySQL scale; others need fewer systems for both transactional and analytical workloads. Pick the comparison lens that matches your roadmap.\n\n### Real-Time Analytics Without a Separate Stack\n\nVitess has no built-in HTAP capability. Analytics on data managed by Vitess typically requires offloading to a separate analytical system through change data capture or scheduled ETL. The result is a multi-system architecture: MySQL for transactions, Vitess for sharding, and a warehouse like Snowflake or ClickHouse for analytics, with pipelines connecting them.\n\nTiDB's TiFlash columnar engine runs analytical queries on live transactional data. Aggregations, scans, and reporting queries run against columnar replicas while OLTP traffic continues on TiKV with reduced resource contention and clearer workload separation. The TiDB optimizer can route a single query across both engines to get the best plan. For teams that want to reduce the number of systems they operate, this consolidation is a meaningful architectural simplification.\n\n### Multi-Tenant and High-Growth Application Fit\n\nSaaS, fintech, ecommerce, and AI-heavy applications often have multi-tenant workloads with uneven growth: some tenants stay small while others grow rapidly. Vitess handles this through resharding workflows when tenant data outgrows its shard, which means re-planning shard boundaries and migrating data. TiDB handles it through automatic Region rebalancing, with PD detecting hot Regions and redistributing them across the cluster without operator action.\n\nTiDB also supports vector data types and indexes for AI and retrieval-augmented generation workloads. For teams building AI features into existing MySQL applications, TiDB provides a single [distributed SQL database](https://www.pingcap.com/tidb/) that handles transactional, analytical, and vector workloads without separate infrastructure.\n\n## How Should Buyers Compare Pricing Models and Total Cost?\n\nBoth Vitess and TiDB are open source and free to self-manage. Direct price comparisons mislead without accounting for infrastructure, staffing, and recurring sharding work. Use the framework below to compare total cost.\n\n| Cost area | Vitess considerations | TiDB considerations | Verification source |\n|---|---|---|---|\n| Infrastructure | MySQL instances per shard plus VTGate, VTTablet, topology service | TiDB Server, TiKV, PD, optional TiFlash; replicas span AZs | Cluster topology and cloud rate cards |\n| Staffing | MySQL DBA plus Vitess expertise; ongoing VSchema and resharding work | TiDB cluster expertise; PD handles rebalancing | Internal hiring plans and training costs |\n| Resharding over time | VReplication-based resharding when shards diverge or hot-spot | Automatic Region rebalancing by PD; no resharding step | Historical resharding events on your fleet |\n| Analytics stack | Separate warehouse plus ETL pipelines | TiFlash on the same cluster; no separate warehouse for many cases | Current analytics spend and ETL hours |\n| Managed service options | PlanetScale and other Vitess-based services (verify availability) | TiDB Cloud on AWS, GCP, Azure, and Alibaba (verify deployment tier availability) | Live pricing pages at evaluation time |\n*Table 2. Cost comparison framework.*\n\n### Infrastructure and Staffing Costs\n\nVitess infrastructure includes MySQL instances per shard, replicas for HA, and the Vitess control plane. Staffing covers MySQL operational expertise plus Vitess-specific work like VSchema design and resharding. TiDB replaces the MySQL fleet with TiKV nodes and consolidates staffing under TiDB cluster expertise.\n\n### Cost of Sharding Over Time\n\nSharding is the most underestimated line item in MySQL scale-out cost. Every Vitess resharding event is a planned workflow with engineering and DBA hours, and recurs as shard count or tenant distributions shift. TiDB removes this cost because PD rebalances Regions automatically. Model cost against projected growth, not today's steady state.\n\n## Checklist: When Should You Choose Vitess vs TiDB?\n\nThe right choice depends on your existing architecture, team strengths, and long-term operational priorities. Use the recommendations below as a decision filter to map your situation to the option that fits best.\n\n### Choose Vitess If\n\nChoose Vitess when preserving MySQL as the storage engine and your existing MySQL operational tooling outweighs the benefits of a unified distributed SQL system.\n\n- You have an established MySQL estate with significant investment in MySQL-specific tooling, backup workflows, and DBA expertise that you want to preserve.\n- Your scaling pressure is primarily about partitioning a workload across shards rather than achieving distributed ACID transactions or HTAP analytics in a single system.\n- Your team has the engineering capacity to design VSchemas, manage vindexes, and operate resharding workflows as data grows.\n- You explicitly do not need cross-shard distributed transactions or strong cross-shard consistency for your workload.\n\n### Choose TiDB If\n\nChoose TiDB when you want fewer moving parts, automatic sharding, distributed ACID, and HTAP analytics in a single system rather than assembling them from MySQL plus middleware plus a warehouse.\n\n- You need horizontal write scaling without designing application-level shard logic or manually managing VSchemas and resharding events.\n- Strong consistency, distributed ACID transactions, and Raft-based failover designed to avoid data loss are first-class requirements rather than optional add-ons.\n- You need real-time analytics on operational data without building and maintaining ETL pipelines to a separate data warehouse.\n- Your team operates Kubernetes-heavy infrastructure and wants a single operator to manage the full database lifecycle including scaling, upgrades, and backups.\n- You want to challenge the assumption that staying closest to MySQL is always the lowest-risk path. Vitess preserves MySQL as the storage engine, but it adds Vitess complexity on top of MySQL complexity. The lowest-risk path on day one can become the highest-cost path over two to three years.\n\n## How TiDB Helps Teams Move Beyond MySQL Sharding\n\nMany teams start with MySQL, scale it with read replicas, and then face the sharding decision as write throughput or data volume grows. TiDB becomes relevant when the operational cost of running and resharding a sharded MySQL fleet, plus the complexity of cross-shard query handling and a separate analytics stack, outweighs the cost of migrating to a distributed SQL database.\n\n### A Simpler Path to Scale and Consistency\n\nTiDB consolidates capabilities that a sharded MySQL stack assembles from separate components. Automatic sharding eliminates VSchema design and resharding workflows. Raft-based replication provides strong consistency and zero-data-loss failover without external HA tooling. Across-the-cluster ACID transactions run as default behavior. TiFlash adds real-time analytics on the same cluster. MySQL wire-protocol compatibility means existing drivers, ORMs, and most query patterns work without modification, which makes TiDB a common choice for teams looking to [modernize MySQL workloads](https://www.pingcap.com/solutions/modernize-mysql-workloads/) without rewriting application code.\n\nNinja Van's case study, which evaluated TiDB against Vitess and CockroachDB on Kubernetes, illustrates the pattern. The team needed MySQL scale-out for a Kubernetes-heavy platform and chose TiDB based on operator maturity, cluster-wide observability, and reduced operational surface area. The migration replaced MySQL plus sharding plus separate analytics with a single distributed SQL database, an example of how teams [stop MySQL sharding pain](https://www.pingcap.com/playbook-escape-mysql-sharding-pain/) before it compounds into recurring engineering work.\n\n## Ready to Evaluate a Better Alternative to MySQL Sharding?\n\nIf your MySQL deployment is approaching the limits of vertical scaling, if your team is spending recurring engineering time on sharding workflows, or if your analytics architecture is growing more complex to maintain, TiDB is worth evaluating against your actual workload rather than on benchmarks alone. The right comparison runs your top queries by frequency and latency at realistic data volumes and measures cross-shard transaction behavior, failover recovery, and schema-change impact under load.\n\nGet started with [TiDB](https://www.pingcap.com/tidb/) and benchmark against your current MySQL or Vitess performance baselines. Teams that want guidance on migration sequencing or topology planning can also request an architecture review from PingCAP solutions engineering.\n\n*Brian Foster is Global Content Director at TiDB. He has over 20 years of experience in technology content creation and editorial leadership, with prior roles at Yugabyte, Akka, Udemy, and O'Reilly Media, where he co-chaired the O'Reilly Software Architecture Conference.*\n\n*This comparison was developed by reviewing official Vitess and TiDB documentation, public technical materials from the Vitess project and CNCF, and customer case studies.*",
        "className": "rich-text-block--raw-source"
      },
      "style": {
        "background": "none",
        "spacing": "section",
        "removePaddingTop": true,
        "removePaddingBottom": true
      }
    },
    {
      "id": "faq",
      "type": "faq",
      "props": {
        "title": "FAQs: Vitess vs TiDB",
        "items": [
          {
            "q": "Is Vitess or TiDB better for scaling MySQL?",
            "a": "It depends on whether you want to keep MySQL and add sharding middleware, or replace it with a single distributed SQL database. Choose Vitess if you have a large MySQL estate and want to scale by managing shards, VSchemas, and resharding workflows. Choose TiDB if you want automatic distribution, distributed ACID transactions, and HTAP analytics in one system."
          },
          {
            "q": "Does Vitess support cross-shard transactions?",
            "a": "Yes, Vitess offers a 2PC mode for cross-shard transactions, but support can come with practical constraints around performance and feature coverage, so you should verify the current Vitess documentation before relying on it in production. If cross-shard distributed ACID transactions are a default requirement, TiDB provides distributed transactions across the cluster without an opt-in mode."
          },
          {
            "q": "Is TiDB fully MySQL compatible?",
            "a": "TiDB is broadly MySQL-compatible at the wire protocol and common SQL syntax level, so many MySQL drivers, ORMs, and query patterns work without modification. However, it is not guaranteed to match every MySQL feature or edge case. Validate the specific MySQL behaviors you rely on (for example, certain stored procedures/functions and isolation semantics) in a focused POC."
          },
          {
            "q": "Which is easier to operate on Kubernetes, Vitess, or TiDB?",
            "a": "For most platform teams, TiDB is simpler because TiDB Operator manages the full cluster lifecycle (scaling, upgrades, backups, monitoring) as one product. Vitess on Kubernetes typically means coordinating more moving parts: VTGate, VTTablet, MySQL instances, and a topology service. Confirm vitess-operator maturity and your team's runbook readiness before standardizing."
          },
          {
            "q": "When should a team replace MySQL sharding with a distributed SQL database?",
            "a": "Consider replacing sharding when you see recurring operational drag: frequent resharding work, growing cross-shard query/transaction logic in the application, increasing HA/failover complexity, or a separate analytics stack that adds ETL maintenance and freshness tradeoffs. If two or more of these pressures are rising, a distributed SQL migration can become cheaper than running a sharded MySQL fleet long-term."
          }
        ]
      },
      "style": {
        "background": "none",
        "spacing": "section",
        "removePaddingTop": true,
        "removePaddingBottom": true
      }
    }
  ]
}

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
