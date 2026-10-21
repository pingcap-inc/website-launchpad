import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema, withFaqFromDSL } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'Best PlanetScale Alternative for MySQL - TiDB',
  description:
    'Evaluate PlanetScale vs TiDB Cloud Starter on MySQL compatibility, branching, scaling, pricing model, and SaaS app fit.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/compare/planetscale-alternatives/' },
  openGraph: {
    title: 'Best PlanetScale Alternative for MySQL - TiDB',
    description:
      'Evaluate PlanetScale vs TiDB Cloud Starter on MySQL compatibility, branching, scaling, pricing model, and SaaS app fit.',
    url: 'https://www.pingcap.com/compare/planetscale-alternatives/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png'],
  },
}

const schema = buildPageSchema({
  path: '/compare/planetscale-alternatives/',
  title: 'Best PlanetScale Alternative for MySQL - TiDB',
  description:
    'Evaluate PlanetScale vs TiDB Cloud Starter on MySQL compatibility, branching, scaling, pricing model, and SaaS app fit.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'PlanetScale vs TiDB: Which MySQL-Compatible Platform Fits Best?',
      path: '/compare/planetscale-alternatives/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'PlanetScale vs TiDB: Which MySQL-Compatible Platform Fits Best?',
  meta: {
    title: 'Best PlanetScale Alternative for MySQL - TiDB',
    description:
      'Evaluate PlanetScale vs TiDB Cloud Starter on MySQL compatibility, branching, scaling, pricing model, and SaaS app fit.',
    canonical: '/compare/planetscale-alternatives/',
    createdBy: 'brian.foster@pingcap.com',
    createdAt: '2026-10-14T14:54:53.227Z',
    modifiedBy: 'brian.foster@pingcap.com',
    modifiedAt: '2026-10-20T18:29:04.974Z',
  },
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      props: {
        layout: 'image-right',
        headline: 'PlanetScale vs TiDB: Which MySQL-Compatible Platform Fits Best?',
        heroImage: {
          image: {
            url: 'https://static.pingcap.com/images/3936d1e9-tidb-vs-planetscale-banner.png',
            alt: 'tidb vs planetscale banner',
            width: 2268,
            height: 1464,
          },
          alt: 'tidb vs planetscale banner',
          width: 1300,
          height: 600,
        },
      },
      style: {
        background: 'primary',
        spacing: 'section',
      },
    },
    {
      id: 'tableOfContents-1',
      type: 'tableOfContents',
      props: {
        items: [
          {
            id: 'intro',
            label: 'Introduction',
            level: 1,
          },
          {
            id: 'key-takeaways',
            label: 'Key Takeaways',
            level: 1,
          },
          {
            id: 'planetscale-vs-tidb-at-a-glance',
            label: 'PlanetScale vs TiDB at a Glance',
            level: 1,
          },
          {
            id: 'key-differences',
            label: 'Key Differences',
            level: 2,
          },
          {
            id: 'why-are-developers-looking-for-planetscale-alternatives',
            label: 'Why Are Developers Looking for PlanetScale Alternatives?',
            level: 1,
          },
          {
            id: 'what-about-planetscale-postgres',
            label: 'What About PlanetScale Postgres?',
            level: 1,
          },
          {
            id: 'how-do-planetscale-and-tidb-compare-on-core-capabilities',
            label: 'How Do PlanetScale and TiDB Compare on Core Capabilities?',
            level: 1,
          },
          {
            id: 'how-do-scaling-and-deployment-models-differ',
            label: 'How Do Scaling and Deployment Models Differ?',
            level: 1,
          },
          {
            id: 'who-should-choose-which',
            label: 'Who Should Choose Which',
            level: 2,
          },
          {
            id: 'how-do-analytics-and-ai-features-compare',
            label: 'How Do Analytics and AI Features Compare?',
            level: 1,
          },
          {
            id: 'how-do-support-reviews-and-pricing-compare',
            label: 'How Do Support, Reviews, and Pricing Compare?',
            level: 1,
          },
          {
            id: 'how-tidb-helps',
            label: 'How TiDB Helps',
            level: 1,
          },
          {
            id: 'when-tidb-is-the-stronger-planetscale-alternative',
            label: 'When TiDB Is the Stronger PlanetScale Alternative',
            level: 2,
          },
          {
            id: 'modernize-beyond-planetscale',
            label: 'Modernize Beyond PlanetScale',
            level: 1,
          },
          {
            id: 'faq',
            label: 'PlanetScale Alternatives FAQs',
            level: 1,
          },
        ],
        sticky: true,
      },
    },
    {
      id: 'intro',
      type: 'richTextBlock',
      props: {
        content:
          "**Updated October 14, 2026 | Author: Brian Foster (Content Director) | Reviewed by: Ravish Patel (Solutions Engineer)**\n\n## Key Takeaways\n\n:::card tone=light\n\n- PlanetScale dropped its free Hobby plan in 2024, while TiDB Cloud Starter still offers a generous free tier.\n- Start with the engine: MySQL teams should weigh Vitess-based PlanetScale against distributed SQL.\n- PlanetScale excels at schema workflow, with branches and deploy requests for zero-downtime migrations.\n- TiDB scales reads and writes without a sharding key and runs real-time analytics on live data.\n\n:::\n\nThis comparison is for software architects, backend engineers, and platform teams evaluating PlanetScale alternatives, whether because PlanetScale retired its free Hobby plan in April 2024 or because their MySQL workloads are outgrowing their current setup. The best PlanetScale alternative depends first on one question: do you need to stay on MySQL? If you can move to PostgreSQL, Neon, Supabase, and PlanetScale's own Postgres service are common choices. If you want to keep MySQL compatibility, the shortlist is much shorter. This article compares PlanetScale's Vitess-based MySQL platform with TiDB Cloud Starter (formerly TiDB Serverless), a serverless MySQL database built on distributed SQL.\n\n## PlanetScale vs TiDB at a Glance\n\n| Category | PlanetScale | TiDB Cloud Starter | Best Fit |\n|---|---|---|---|\n| Database engines | Vitess-based MySQL and PlanetScale Postgres (GA since September 2025). | MySQL-compatible distributed SQL. No Postgres option. | PlanetScale for MySQL and Postgres from one vendor. |\n| MySQL compatibility | No stored procedures, stored functions, triggers, or events. Sharded keyspaces add query limits. | No stored procedures, triggers, events, or user-defined functions. | Similar limits. Test your schema and queries on either. |\n| Free tier | None since April 2024. | 5 GiB row storage, 5 GiB columnar storage, and 50M Request Units (RUs) per month for each of the first five instances. | TiDB for prototypes and early-stage products. |\n| Branching | Development branches, deploy requests, and Data Branching with schema and data from a backup. | Data branches for isolated test copies. Online DDL for schema changes. | PlanetScale for a built-in schema review workflow. |\n| Scaling model | Provisioned clusters. Vitess sharding on a key you choose. | Autoscaling. Data split and rebalanced automatically. | TiDB to avoid designing a sharding scheme. |\n| Multi-region and HA | Base plan spans three availability zones with automatic failover. Read-only regions available. | Zonal HA. TiDB Cloud Premium (public preview) and Dedicated add cross-zone failover. | PlanetScale for cross-zone failover at its entry price. |\n| Analytics | Row-based OLTP. Analytics usually run in a separate warehouse. | HTAP: columnar replicas (TiFlash) query live data. | TiDB for analytics on operational data. |\n| AI features | Vector search (GA since 2025) and MySQL FULLTEXT indexes. | Vector and full-text search, both in public preview. Full-text in five AWS regions. | Both handle retrieval. TiDB adds columnar analytics. |\n| Pricing model | Provisioned cluster size, storage, and branches. Vitess HA from $39/month. | Free within quota, then throttled unless a spending limit is set. Billed usage starts at $0.10 per 1M RUs. | PlanetScale for steady load. TiDB for spiky or low-volume load. |\n| Ideal user | Teams invested in Vitess workflows who prefer provisioned capacity. | Teams that want a free start and a route to distributed scale and analytics. | Depends on whether workflow or long-term scale matters more. |\n*Table 1: PlanetScale vs TiDB Cloud Starter at a glance.*\n\n### Key Differences\n\nPlanetScale keeps MySQL as the storage engine and puts Vitess in front of it, so scaling out means sharding. TiDB replaces single-node storage with a distributed engine, so the application sees one logical database at any size. PlanetScale also has no free tier, while TiDB Cloud Starter does.\n\n## Why Are Developers Looking for PlanetScale Alternatives?\n\nPlanetScale's Hobby plan was a default for side projects and early SaaS apps built with Next.js and Prisma. When it was retired in April 2024, searches for PlanetScale alternatives shifted from curiosity to migration and cost planning. PlanetScale's cheapest database is now a $5 per month single-node Postgres instance, which does not help a MySQL application, and Vitess clusters start at $39 per month for three-node HA in AWS us-east-1.\n\nMost searchers are also reconsidering which engine to commit to, whether they want consumption billing or provisioned capacity, and what architecture they will need as data grows. Some will leave MySQL: Neon offers serverless Postgres with branching, Supabase bundles Postgres with auth and storage, and Turso offers SQLite-compatible databases that run embedded or in the cloud. Each of these means porting queries and migrations to a new dialect.\n\n### Key Differences\n\nPostgres and SQLite alternatives require a dialect migration. MySQL-compatible alternatives such as TiDB keep your schema, drivers, and ORM configuration largely intact.\n\n## What About PlanetScale Postgres?\n\nPlanetScale announced PlanetScale for Postgres in July 2025 and made it generally available in September 2025. It runs standard Postgres on AWS or Google Cloud, with single-node databases from $5 per month, high-availability clusters, and Metal clusters on local NVMe storage from $50 per month. Horizontal sharding for Postgres is planned through Neki, which PlanetScale is still developing, so check its status before planning around it.\n\nFor teams willing to change engines, PlanetScale Postgres is a credible option alongside Neon and Supabase. For teams on PlanetScale's Vitess MySQL, it does not remove the migration: moving to it means porting schema, queries, and ORM configuration to a new dialect. TiDB is MySQL-compatible and does not offer Postgres.\n\n### Key Differences\n\nPlanetScale Postgres suits teams that have decided to move to Postgres. TiDB suits teams that want to keep MySQL and gain horizontal scale.\n\n## How Do PlanetScale and TiDB Compare on Core Capabilities?\n\n**MySQL compatibility.** PlanetScale runs its own MySQL fork, so an unsharded database behaves much like MySQL, though it does not support stored procedures, stored functions, triggers, or events. Sharding adds further query limits. TiDB implements the MySQL protocol and most of its syntax on a distributed key-value store (TiKV), and it also excludes stored procedures, triggers, events, and user-defined functions. Because both share those exclusions, migration differences come down to sharded-query behavior and edge cases. Our guide to the [best mysql-compatible databases](https://www.pingcap.com/compare/mysql-compatible-database/) covers compatibility checks in more depth.\n\n**ACID and distributed transactions.** On PlanetScale, transactions inside one shard get standard InnoDB guarantees, while cross-shard transactions depend on the Vitess transaction mode. TiDB replicates data with Raft and commits with two-phase commit, so ACID guarantees hold wherever rows live.\n\n**Schema workflows.** This is PlanetScale's clearest advantage. Developers change schemas on a branch, open a deploy request, get review, and deploy without locking tables, with the option to revert. Data Branching can also seed a branch with data from a backup. TiDB runs schema changes as online DDL and offers data branches for testing, while teams manage migrations with tools such as Prisma Migrate or Flyway.\n\n**Serverless operations.** PlanetScale clusters are provisioned and resized as needed. TiDB Cloud Starter allocates compute per request, scales to zero when idle, and supports a monthly spending limit.\n\n### Key Differences\n\nIf your pain is risky schema changes, PlanetScale's workflow addresses it. If your pain is outgrowing a single MySQL primary, TiDB removes the need to shard.\n\n## How Do Scaling and Deployment Models Differ?\n\nPlanetScale scales MySQL through Vitess. You choose a sharding key for large tables, and PlanetScale manages resharding. A poor key leads to hot shards or queries that fan out across every shard, and capacity is provisioned ahead of load. PlanetScale's entry cluster spans three availability zones with automatic failover, and read-only regions can serve reads in other geographies.\n\nTiDB separates compute from storage. Data is split into ranges called Regions, replicated three ways, and rebalanced across nodes as load changes, with no sharding key and no application changes. Primary key design still matters: sequential `AUTO_INCREMENT` keys can create write hotspots, which TiDB's `AUTO_RANDOM` option avoids. TiDB Cloud Starter and Essential use zonal high availability, while TiDB Cloud Premium and Dedicated replicate data across availability zones.\n\nIf your team is comfortable owning shard design, PlanetScale is a sound choice. If you want to remove sharding complexity permanently, TiDB is the better match. See our [vitess vs tidb comparison](https://www.pingcap.com/compare/vitess-vs-tidb/) for a deeper breakdown.\n\n### Key Differences\n\nVitess coordinates many MySQL instances and stays closest to stock MySQL. TiDB distributes storage beneath one SQL layer and stays closest to a single-database model.\n\n### Who Should Choose Which\n\nChoose PlanetScale if you already run Vitess, your load suits provisioned capacity, and deploy requests are central to how you ship. Choose TiDB if you want to start free, expect growth that would force sharding, or want analytics on operational data.\n\n## How Do Analytics and AI Features Compare?\n\nPlanetScale focuses on relational OLTP, schema management, and query insights. Its MySQL fork supports vector search, generally available since 2025, and FULLTEXT indexes. Analytics typically run in a separate warehouse.\n\nTiDB extends the same database into analytics and AI. TiFlash columnar replicas serve analytical queries while transactions stay on row storage, and Starter's free quota includes columnar storage. Vector search and full-text search let a retrieval-augmented generation (RAG) app run semantic search, keyword search, and transactional updates against one system. On Starter, both search features are in public preview, and full-text search is available in five AWS regions. Compare more options in our roundup of [distributed sql database alternatives](https://www.pingcap.com/compare/best-distributed-sql-databases/).\n\n### Key Differences\n\nBoth platforms serve vector and keyword retrieval. TiDB also runs analytics on live data in the same database.\n\n## How Do Support, Reviews, and Pricing Compare?\n\n| Platform | G2 | Capterra | Clutch |\n|---|---|---|---|\n| PlanetScale | [4.3/5 (5 reviews)](https://www.g2.com/products/planetscale/reviews) | [4.0/5 (1 review)](https://www.capterra.com/p/237919/PlanetScale/) | No product listing found |\n| TiDB | [4.6/5 (66 reviews)](https://www.g2.com/products/tidb/reviews) | No product listing found | No product listing found |\n*Table 2: Third-party review scores for PlanetScale and TiDB, retrieved October 2026.*\n\nPingCAP was also named a Customers' Choice in the 2025 Gartner Peer Insights Voice of the Customer for Cloud Database Management Systems, rated 4.9 out of 5 across 165 reviews as of March 2025.\n\n**Pricing.** PlanetScale has no free tier. Single-node Postgres starts at $5 per month and Postgres Metal at $50 per month. For MySQL, Vitess clusters start at $39 per month for three-node HA in AWS us-east-1 with 10 GB of storage, and extra branches add cost. See [PlanetScale pricing](https://planetscale.com/pricing).\n\nTiDB Cloud Starter gives each of an organization's first five instances 5 GiB of row storage, 5 GiB of columnar storage, and 50 million RUs free per month. Without a spending limit, an instance that exhausts its quota is throttled rather than billed. With one, extra usage starts at $0.10 per million RUs and $0.20 per GiB-month of row storage, varying by region. See [TiDB Cloud Starter pricing details](https://www.pingcap.com/tidb-cloud-starter-pricing-details/) or our [serverless mysql database comparison](https://www.pingcap.com/tidb-cloud-serverless-vs-amazon-rds/).\n\n**Upgrade paths.** PlanetScale users resize or add shards. TiDB users choose by need: Essential adds provisioned capacity but stays zonal, Premium (public preview) adds cross-zone failover, and Dedicated provides multi-zone clusters on the classic TiDB architecture rather than TiDB X. Feature support, including search, differs by plan.\n\n**Support.** PlanetScale includes Standard support with its Base plan. TiDB Cloud's free Basic plan covers billing and account help, community channels, and TiDB.AI, while technical support tickets require a paid Developer plan or higher.\n\n### Key Differences\n\nPlanetScale charges for capacity and includes technical support from its entry plan. TiDB Cloud Starter charges for use and starts free, with technical support on paid plans. TiDB has the larger body of verified reviews.\n\n## How TiDB Helps\n\nTiDB fits teams that want MySQL compatibility without the scaling limits of a single MySQL primary. It combines distributed SQL, elastic scale, cross-node ACID transactions, and HTAP in one engine, and applications connect with standard MySQL drivers and ORMs such as Prisma.\n\nAI-native companies show what that looks like in production. Manus drew a waitlist of more than two million within weeks of its March 2025 launch, outgrew its single-instance database, and migrated to TiDB Cloud in two weeks. With Manus 1.5, its agents created tens of thousands of isolated TiDB Cloud clusters in parallel. Read [how Manus scaled with TiDB](https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/). Kimi, from Moonshot AI, runs the website builder in its Kimi K2.6 agent on TiDB Cloud Starter, built to host tens of millions of agent-created sites. Each agent task gets a ready database in under one second, idle databases scale to zero, and MySQL compatibility meant no query rewrites. Read [how Kimi built its platform on TiDB Cloud](https://www.pingcap.com/case-study/kimi-2-6-agent-hosting-platform-tidb-cloud/).\n\n### When TiDB Is the Stronger PlanetScale Alternative\n\n- You need a free MySQL-compatible database for prototypes or low-traffic apps.\n- You expect to outgrow a single MySQL primary and do not want to own a sharding key.\n- You want real-time analytics on operational data without extra systems.\n- You are building an AI agent or multi-tenant platform that needs many isolated databases.\n\nSee how teams run multi-tenant products on a [database for saas applications](https://www.pingcap.com/solutions/saas/).\n\n## Modernize Beyond PlanetScale\n\nPlanetScale is a workflow-first platform with strong schema tooling, provisioned capacity, and now Postgres. TiDB is a distributed SQL path: MySQL compatibility, scale without sharding, and analytics on live data, with a free tier to start. If you are leaving because of cost, or because sharding is about to become your next project, test TiDB against your own workload. Learn how to [modernize mysql workloads with tidb](https://www.pingcap.com/solutions/modernize-mysql-workloads/).\n\n*Brian Foster is Global Content Director at TiDB. He has over 20 years of experience in technology content creation and editorial leadership, with prior roles at Yugabyte, Akka, Udemy, and O'Reilly Media, where he co-chaired the O'Reilly Software Architecture Conference.*\n\n*Ravish Patel is a Solutions Engineer at PingCAP, leading technical evaluations, benchmarks, and migration proofs of concept for enterprise TiDB customers. Previously a MySQL Solutions Engineer at Oracle, Ravish specializes in distributed databases and migrations from MySQL, PostgreSQL, and Aurora.*\n\n*This comparison was developed by reviewing official PlanetScale and TiDB documentation and pricing pages, PlanetScale product announcements, TiDB customer case studies, and third-party review platforms including G2, Capterra, and Gartner Peer Insights.*",
        className: 'rich-text-block--raw-source',
      },
      style: {
        background: 'none',
        spacing: 'section',
        removePaddingTop: true,
        removePaddingBottom: true,
      },
    },
    {
      id: 'faq',
      type: 'faq',
      props: {
        title: 'PlanetScale Alternatives FAQs',
        items: [
          {
            q: 'What Is the Best PlanetScale Alternative If I Need MySQL Compatibility?',
            a: 'Options include managed MySQL such as Amazon RDS and Aurora, self-managed Vitess, and distributed SQL databases such as TiDB. Managed MySQL keeps the single-primary write limit. TiDB fits best when you want a free tier, horizontal scale without sharding, and analytics in one database.',
          },
          {
            q: 'Does PlanetScale Still Have a Free Tier?',
            a: 'No. PlanetScale retired its Hobby plan in April 2024, pushing many early-stage projects toward free MySQL-compatible options such as TiDB Cloud Starter.',
          },
          {
            q: 'Is TiDB a Drop-In PlanetScale Replacement?',
            a: "Not entirely. Most applications connect without code changes, but you should check your schema and queries against TiDB's MySQL compatibility list, replace deploy requests with your own migration workflow, and test query performance.",
          },
          {
            q: 'Is PlanetScale MySQL or PostgreSQL?',
            a: 'Both. PlanetScale runs Vitess-based MySQL and, since September 2025, a generally available Postgres service. TiDB is MySQL-compatible only, so MySQL drivers, ORMs, and most queries work without changes.',
          },
          {
            q: 'When Is PlanetScale Still the Better Choice?',
            a: 'PlanetScale remains strong for teams that rely on deploy requests to ship schema changes safely, already run Vitess-sharded data, or plan to adopt PlanetScale Postgres.\n\n:::cta bg="https://static.pingcap.com/files/2025/06/22211020/1000011435.png"\nOutgrowing a single MySQL primary? Test TiDB against your own workload and scale without sharding.\n[Modernize MySQL workloads with TiDB](https://www.pingcap.com/solutions/modernize-mysql-workloads/)\n:::',
          },
        ],
      },
      style: {
        background: 'none',
        spacing: 'section',
        removePaddingTop: true,
        removePaddingBottom: true,
      },
    },
  ],
}

export default function GeneratedPage() {
  return (
    <>
      <JsonLd data={withFaqFromDSL(schema, dsl)} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
