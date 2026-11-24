import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema, withFaqFromDSL } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'Lovable AI App Builder: Post-Launch Scaling Guide | TiDB',
  description:
    'Learn what to do after shipping your Lovable AI app: get launch-ready, understand data storage, spot scaling signals, and know when to migrate to TiDB.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.pingcap.com/playbook/lovable-ai-app-builder-post-launch-guide/',
  },
  openGraph: {
    title: 'Lovable AI App Builder: Post-Launch Scaling Guide | TiDB',
    description:
      'Learn what to do after shipping your Lovable AI app: get launch-ready, understand data storage, spot scaling signals, and know when to migrate to TiDB.',
    url: 'https://www.pingcap.com/playbook/lovable-ai-app-builder-post-launch-guide/',
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
  path: '/playbook/lovable-ai-app-builder-post-launch-guide/',
  title: 'Lovable AI App Builder: Post-Launch Scaling Guide | TiDB',
  description:
    'Learn what to do after shipping your Lovable AI app: get launch-ready, understand data storage, spot scaling signals, and know when to migrate to TiDB.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'Lovable AI App Builder: What to Do After You Ship',
      path: '/playbook/lovable-ai-app-builder-post-launch-guide/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'Lovable AI App Builder: What to Do After You Ship',
  meta: {
    title: 'Lovable AI App Builder: Post-Launch Scaling Guide | TiDB',
    description:
      'Learn what to do after shipping your Lovable AI app: get launch-ready, understand data storage, spot scaling signals, and know when to migrate to TiDB.',
    canonical: '/playbook/lovable-ai-app-builder-post-launch-guide/',
    createdBy: 'a.hire@pingcap.com',
    createdAt: '2026-11-23T22:24:18.328Z',
    modifiedBy: 'a.hire@pingcap.com',
    modifiedAt: '2026-11-23T22:25:16.766Z',
  },
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      props: {
        layout: 'image-right',
        headline: 'Lovable AI App Builder: What to Do After You Ship',
        heroImage: {
          image: {
            url: 'https://static.pingcap.com/images/1cf8147d-hero-var-g-growth-chart-large_2x.png',
            alt: 'hero var g growth chart large 2x',
            width: 1040,
            height: 1040,
          },
          alt: 'hero var g growth chart large 2x',
          width: 1040,
          height: 1040,
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
            id: 'jump-to-a-section',
            label: 'Jump to a Section',
            level: 1,
          },
          {
            id: 'what-is-the-lovable-ai-app-builder-and-where-does-it-fit',
            label: 'What Is the Lovable AI App Builder, and Where Does It Fit?',
            level: 1,
          },
          {
            id: 'why-lovable-is-gaining-traction-with-ai-app-builders',
            label: 'Why Lovable Is Gaining Traction with AI App Builders',
            level: 2,
          },
          {
            id: 'from-generated-app-to-growing-product',
            label: 'From Generated App to Growing Product',
            level: 2,
          },
          {
            id: 'how-do-lovable-apps-handle-persistent-data-and-backend-state',
            label: 'How Do Lovable Apps Handle Persistent Data and Backend State?',
            level: 1,
          },
          {
            id: 'lovable-supabase-integration-and-the-default-backend-path',
            label: 'Lovable Supabase Integration and the Default Backend Path',
            level: 2,
          },
          {
            id: 'getting-your-lovable-app-launch-ready',
            label: 'Getting Your Lovable App Launch-Ready',
            level: 1,
          },
          {
            id: 'when-your-growing-app-is-ready-to-evaluate-a-distributed-database',
            label: 'When Your Growing App Is Ready to Evaluate a Distributed Database',
            level: 1,
          },
          {
            id: 'an-illustrative-growth-path',
            label: 'An Illustrative Growth Path',
            level: 2,
          },
          {
            id: 'why-choose-tidb-for-a-lovable-ai-app-builder-backend',
            label: 'Why Choose TiDB for a Lovable AI App Builder Backend?',
            level: 1,
          },
          {
            id: 'mysql-compatibility-for-ai-generated-code-and-familiar-tooling',
            label: 'MySQL Compatibility for AI-Generated Code and Familiar Tooling',
            level: 2,
          },
          {
            id: 'distributed-sql-without-manual-sharding',
            label: 'Distributed SQL Without Manual Sharding',
            level: 2,
          },
          {
            id: 'htap-and-vector-friendly-growth-paths-for-future-ai-features',
            label: 'HTAP and Vector-Friendly Growth Paths for Future AI Features',
            level: 2,
          },
          {
            id: 'moving-a-lovable-app-to-tidb-a-guide-for-engineering-teams',
            label: 'Moving a Lovable App to TiDB: A Guide for Engineering Teams',
            level: 1,
          },
          {
            id: 'step-1-define-the-core-entities-your-app-must-persist',
            label: 'Step 1: Define the Core Entities Your App Must Persist',
            level: 2,
          },
          {
            id: 'step-2-connect-the-generated-app-to-tidb-cloud-starter',
            label: 'Step 2: Connect the Generated App to TiDB Cloud Starter',
            level: 2,
          },
          {
            id: 'step-3-move-data-access-server-side-and-migrate',
            label: 'Step 3: Move Data Access Server-Side and Migrate',
            level: 2,
          },
          {
            id: 'which-backend-decisions-matter-most-for-ai-generated-apps',
            label: 'Which Backend Decisions Matter Most for AI-Generated Apps?',
            level: 1,
          },
          {
            id: 'connection-limits-once-queries-move-server-side',
            label: 'Connection Limits Once Queries Move Server-Side',
            level: 2,
          },
          {
            id: 'schema-changes-observability-and-long-term-maintainability',
            label: 'Schema Changes, Observability, and Long-Term Maintainability',
            level: 2,
          },
          {
            id: 'how-tidb-fits-the-next-phase-of-ai-app-development',
            label: 'How TiDB Fits the Next Phase of AI App Development',
            level: 1,
          },
          {
            id: 'from-persistent-crud-to-agent-memory-and-retrieval-workflows',
            label: 'From Persistent CRUD to Agent Memory and Retrieval Workflows',
            level: 2,
          },
          {
            id: 'when-to-start-with-tidb-cloud-starter-and-when-to-grow-beyond-it',
            label: 'When to Start with TiDB Cloud Starter and When to Grow Beyond It',
            level: 2,
          },
          {
            id: 'how-tidb-supports-builders-from-launch-to-scale',
            label: 'How TiDB Supports Builders from Launch to Scale',
            level: 1,
          },
          {
            id: 'faq',
            label: 'Lovable AI App Builder FAQs',
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
          "**Updated November 2026 | Author: [Akshata Hire](https://www.pingcap.com/blog/author/akshata/) (Product Marketing Lead) | Reviewed by: Bernard Kavanagh (Principal Solutions Architect)**\n\nYou turned an idea into a working app with Lovable, possibly in a single afternoon. What you do in the weeks after you ship decides whether that app is ready for its first paying customers, and whether it keeps up when more of them arrive.\n\nThe Lovable AI app builder is a prompt-based platform that generates full-stack web apps: a React and TypeScript front end plus a backend with a database, authentication, storage, and hosting. Lovable Cloud, its built-in backend, is a strong place to run an early product, and Lovable Cloud or Supabase can support production applications.\n\nThis playbook covers what comes next: getting your app launch-ready, understanding how it stores data, recognizing when your data layer needs to scale further, and, for engineering teams, how to move that layer to [TiDB](https://www.pingcap.com/what-is-tidb/) when the time comes.\n\n## Jump to a Section\n- [What Is the Lovable AI App Builder, and Where Does It Fit?](#what-is-the-lovable-ai-app-builder-and-where-does-it-fit)\n- [How Do Lovable Apps Handle Persistent Data and Backend State?](#how-do-lovable-apps-handle-persistent-data-and-backend-state)\n- [Getting Your Lovable App Launch-Ready](#getting-your-lovable-app-launch-ready)\n- [When Your Growing App Is Ready to Evaluate a Distributed Database](#when-your-growing-app-is-ready-to-evaluate-a-distributed-database)\n- [Why Choose TiDB for a Lovable AI App Builder Backend?](#why-choose-tidb-for-a-lovable-ai-app-builder-backend)\n- [Moving a Lovable App to TiDB: A Guide for Engineering Teams](#moving-a-lovable-app-to-tidb-a-guide-for-engineering-teams)\n- [Which Backend Decisions Matter Most for AI-Generated Apps?](#which-backend-decisions-matter-most-for-ai-generated-apps)\n- [How TiDB Fits the Next Phase of AI App Development](#how-tidb-fits-the-next-phase-of-ai-app-development)\n- [How TiDB Supports Builders from Launch to Scale](#how-tidb-supports-builders-from-launch-to-scale)\n- [Lovable AI App Builder FAQs](#lovable-ai-app-builder-faqs)\n\n## What Is the Lovable AI App Builder, and Where Does It Fit?\n\nLovable turns a plain-language prompt into a working web app, then keeps editing that app through chat. It sits between code-first AI tools and visual no-code builders: you get real code you can export, and you write little of it yourself.\n\nEach project includes a front end, a built-in backend, and publishing to a lovable.app subdomain, or to a custom domain on paid plans. Code syncs two ways with GitHub. Typical uses are MVPs, internal tools, dashboards, SaaS products, and early AI products. Code-first tools such as Cursor assume you already own a codebase, and visual builders such as Bubble keep logic inside a proprietary editor. Lovable generates a standard React project you can keep building on or hand to engineers later.\n\n### Why Lovable Is Gaining Traction with AI App Builders\n\nSpeed to a usable product is the main draw. A founder or product team can describe a workflow, get screens wired to real tables, and share a live URL the same day. As of November 2026, Lovable’s pricing page lists a free plan that needs no credit card, a Pro plan at $25 per month with 100 monthly credits, and a Business plan at $50 per month with 100 monthly credits plus SSO and role-based access. Building, hosting, and running the built-in backend all draw from the same credit balance, according to [Lovable’s documentation](https://docs.lovable.dev/integrations/cloud).\n\n### From Generated App to Growing Product\n\nLovable gives you the app. The decisions that come with growth, such as how your schema evolves and how the data layer handles more customers, are ones you make over time. You do not need all of them on day one, and this guide covers them in the order they usually come up.\n\nTiDB builds in this space too. Our open-source [AI agent full-stack app builder](https://www.pingcap.com/blog/ai-agent-that-builds-full-stack-apps/) starter kit shows how a Lovable-style agent can provision a database for each project, version schema changes, and deploy a full-stack app.\n\n## How Do Lovable Apps Handle Persistent Data and Backend State?\n\nBy default, Lovable apps store data in Lovable Cloud, a built-in backend that runs on Supabase’s open-source foundation with a managed PostgreSQL database, auth, storage, and edge functions. Persistent state is what turns a demo into an application people return to: their data survives a refresh, a redeploy, and a schema change.\n\nThe generated React code reads and writes data through the Supabase client library (supabase-js), which sends requests over HTTPS to Supabase’s API layer rather than opening database connections from the browser. Row-level security policies decide who can read and write each row. [Lovable’s Supabase docs](https://docs.lovable.dev/integrations/supabase) state there is no one-click migration between backends, so it pays to decide how data will persist before you build many features on top of it.\n\n### Lovable Supabase Integration and the Default Backend Path\n\n[Lovable Cloud](https://docs.lovable.dev/features/cloud) is on by default and managed inside the Lovable editor, with an isolated database for each project. The Supabase integration instead connects a Supabase project you own. Both run Postgres and both let Lovable design tables from chat. The difference is ownership: your own Supabase project gives you the account, billing, and direct database access, while Lovable Cloud usage draws on Lovable credits.\n\n## Getting Your Lovable App Launch-Ready\n\nBefore you invite paying customers, run four checks. None of them requires changing your backend:\n- **Store important state in tables.** Drafts or chat history kept in React state or `localStorage` disappear when a user switches devices.\n- **Give each entity one home.** Building one prompt at a time can store the same entity twice under different names. Consolidate before real data accumulates.\n- **Test your access rules.** Disabled row-level security or overly permissive policies can expose data. Test that users can read and modify only the records they are authorized to access.\n- **Index the queries users run most.** A filter that is instant on 500 rows can take seconds on 5M.\n\nThese checks pay off whichever database you run later. A clear data model is also what makes any future migration manageable.\n\n## When Your Growing App Is Ready to Evaluate a Distributed Database\n\nPostgres runs many production apps well, and Supabase lets you add compute and read replicas as traffic grows. Writes, though, still go through one primary database. The signals that it is time to evaluate a distributed SQL database like TiDB tend to appear together:\n- Write traffic keeps the primary busy even after you scale up its compute.\n- Dashboards and reports compete with the app for the database, so analytics move to replicas or a separate warehouse.\n- One or two tables, such as chat history or events, grow large enough that the team starts planning to partition or shard them in application code.\n\nIf none of these apply yet, your current backend is doing its job.\n\n### An Illustrative Growth Path\n\nTake a project tracker built in Lovable. In month one it stores users and projects. By month six it has chat history per user, usage analytics per workspace, and semantic search over notes.\n\nOn Postgres, pgvector keeps embeddings in the same database, so search rarely forces a change. The pressure points are write volume on the chat history table and analytics running against live data. On TiDB, both stay in one cluster: the table spreads across nodes as it grows, and workspace analytics run on a TiFlash columnar replica instead of a warehouse export. For tenant-heavy designs, see [multi-tenant SaaS database solutions](https://www.pingcap.com/solutions/saas/).\n\n## Why Choose TiDB for a Lovable AI App Builder Backend?\n\nA backend for a growing AI-generated app should accept the code AI assistants already write, enforce ACID transactions, and scale writes without a rewrite. TiDB is a distributed SQL database with a MySQL-compatible interface that meets those needs and leaves room for analytics and AI features. The case for TiDB grows when write volume, tenant count, and analytics on live data grow together.\n\n| Requirement | Default backend pattern (Lovable Cloud / Supabase) | TiDB-backed application |\n|---|---|---|\n| Persistence | ACID PostgreSQL database with persistent storage | ACID distributed SQL on Raft-replicated storage |\n| Scale | One primary for writes, plus more compute and read replicas | Key-range Regions rebalanced across nodes automatically |\n| Data access | supabase-js over HTTPS from the browser and edge functions | Server-side functions using the HTTPS serverless driver (beta) or a MySQL driver |\n| Schema changes | SQL migrations generated by Lovable and saved in the project’s code | Online DDL that does not block reads and writes |\n| Analytics | Queries on a replica or an export to a warehouse | TiFlash columnar replicas on live data |\n| Multi-tenant growth | Isolation through row-level security policies | Tenant filters in server-side queries, with Starter scaling capacity automatically |\n*Table 1: Default Lovable backend pattern compared with a TiDB-backed application.*\n\n### MySQL Compatibility for AI-Generated Code and Familiar Tooling\n\nTiDB speaks the MySQL wire protocol, so Prisma, Drizzle, Sequelize, and SQLAlchemy connect with their MySQL dialects. Coding assistants produce MySQL-compatible code reliably, and your team keeps its clients and migration tools. MySQL-compatible TiDB does not support stored procedures, stored functions, or triggers, so that logic belongs in application code. For teams whose generated code is Postgres-first, PostgreSQL-compatible TiDB Cloud Starter is available for evaluation in public preview.\n\n### Distributed SQL Without Manual Sharding\n\nTiDB splits tables into key-range Regions on TiKV nodes, and PD (Placement Driver) moves them as load shifts. Application code never picks a shard. Distributed transactions use two-phase commit with strong consistency, so a multi-row write commits everywhere or nowhere. The one modeling rule is to avoid monotonically increasing keys on write-heavy tables, which `AUTO_RANDOM` handles.\n\n### HTAP and Vector-Friendly Growth Paths for Future AI Features\n\nHTAP (hybrid transactional/analytical processing) means running transactions and analytics on the same data. TiFlash, a columnar engine in the same cluster, replicates from TiKV automatically: `ALTER TABLE chat_messages SET TIFLASH REPLICA 1;` is enough to start. It targets real-time, lightweight OLAP, not the deep historical analytics you would run in Snowflake or BigQuery. TiDB also supports a `VECTOR` column type, so embeddings sit next to the rows they describe. Compare options in [best vector database for AI agents](https://www.pingcap.com/compare/best-vector-database/).\n\n## Moving a Lovable App to TiDB: A Guide for Engineering Teams\n\nThis section is for developers ready to move the data layer. Plan it as an engineering project: it changes every data call in the app, not just a connection string. The steps assume the project is synced to GitHub and deployed on Vercel with serverless functions for API logic.\n\nLovable’s generated code calls Supabase from the browser and uses PostgreSQL. PostgreSQL-compatible TiDB Cloud Starter is available for evaluation in public preview and accepts standard PostgreSQL drivers, ORMs, and connection strings. Because it is still in preview, this guide uses the generally available MySQL-compatible Starter. On either option, browser calls through the Supabase client move into server-side functions, and you can keep Supabase Auth for sign-in or switch to a provider such as Clerk or Auth.js.\n\nThese steps cover application tables and queries. Authentication, uploaded files, realtime subscriptions, and edge functions need separate decisions: keep the existing services or migrate them explicitly. Before switching production traffic, plan a final data sync or a brief write pause so records created after the export are not lost. Verify sign-in, access permissions, and any file or realtime features your app uses against the new setup.\n\n### Step 1: Define the Core Entities Your App Must Persist\n\nList what the app must remember across sessions and devices: usually users, a tenant or workspace, the core business objects, and activity such as chat messages. Write that model as SQL in your repository:\n\n```sql\nCREATE TABLE workspaces (\n  id BIGINT AUTO_RANDOM PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  created_at DATETIME DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE chat_messages (\n  id BIGINT AUTO_RANDOM PRIMARY KEY,\n  workspace_id BIGINT NOT NULL,\n  user_id VARCHAR(64) NOT NULL,\n  role ENUM('user', 'assistant', 'tool') NOT NULL,\n  content TEXT NOT NULL,\n  tool_output JSON,\n  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\n  KEY idx_ws_user_time (workspace_id, user_id, created_at)\n);\n```\n\n`AUTO_RANDOM` primary keys spread inserts across storage nodes instead of creating a write hotspot. Every tenant-scoped table carries `workspace_id`, so each query can filter by tenant from the first release. `DATETIME` avoids the year-2038 upper limit of `TIMESTAMP`; store values in UTC.\n\n### Step 2: Connect the Generated App to TiDB Cloud Starter\n\nTiDB Cloud Starter is the fully managed, auto-scaling tier of TiDB Cloud, free to start within a monthly usage quota. To connect it:\n1. Create a TiDB Cloud Starter cluster in the TiDB Cloud console.\n2. In the cluster’s **Connect** dialog, generate a password and copy the connection string.\n3. Save it as `DATABASE_URL` in Vercel environment variables. Never use a `VITE_` variable, because Vite exposes those to the browser.\n4. Run `npm install @tidbcloud/serverless` and add an API function like the one below.\n\n```typescript\n// api/messages.ts: illustrative Vercel function\n// requireUser() stands in for your auth provider's session check\nimport { connect } from '@tidbcloud/serverless';\nimport { requireUser } from '../lib/auth';\n\nconst conn = connect({ url: process.env.DATABASE_URL });\n\nexport async function GET(request: Request) {\n  const user = await requireUser(request);\n  const rows = await conn.execute(\n    'SELECT id, role, content, created_at FROM chat_messages ' +\n    'WHERE workspace_id = ? AND user_id = ? ORDER BY created_at DESC LIMIT 50',\n    [user.workspaceId, user.id]\n  );\n  return Response.json(rows);\n}\n```\n\nThe [TiDB Cloud serverless driver](https://docs.pingcap.com/tidbcloud/serverless-driver) is in beta and connects over HTTPS instead of TCP, which suits Vercel Functions, Edge Functions, and Cloudflare Workers. Prisma (through `@tidbcloud/prisma-adapter`) and Drizzle both support it, and `mysql2` works from Node.js functions with TLS. For quotas and setup, see [TiDB Cloud Starter for AI apps](https://www.pingcap.com/tidb-cloud-starter/).\n\n### Step 3: Move Data Access Server-Side and Migrate\n\nWork one feature at a time, keeping the Lovable version live until each path passes its tests. If you are evaluating PostgreSQL-compatible TiDB Cloud Starter, most of the type translation in item 2 goes away, because it supports common PostgreSQL types including arrays, JSON, and `TIMESTAMPTZ`. Check its documented compatibility differences before you rely on that.\n\n1. Move each `supabase.from('table')` call into a server function that runs a parameterized query, and point the React component at that endpoint.\n2. Translate Postgres types: `jsonb` to `JSON`, `uuid` to `CHAR(36)`, arrays to `JSON` or a join table, and `timestamptz` to `DATETIME` stored in UTC.\n3. Replace row-level security with explicit tenant and user filters in server code.\n4. Export existing data from Lovable Cloud and load it through TiDB Cloud’s data import.\n5. Test sign-up, a write followed by a read on a second device, concurrent edits, and a migration on a staging cluster.\n\nKeep schema changes as migrations in version control rather than in chat:\n\n```bash\nnpx prisma migrate dev --name init   # development cluster\nnpx prisma migrate deploy            # CI, against production\n```\n\n## Which Backend Decisions Matter Most for AI-Generated Apps?\n\nAI-generated apps benefit from explicit decisions on how functions connect, how schema evolves, where authorization lives, and how you audit behavior, because the generator made each choice for you. Auditability is the one teams discover last. If a user reports a wrong assistant answer from last Tuesday, and each turn and tool output is a row in `chat_messages`, one SQL query reconstructs the session. If it lived in browser state, it is gone.\n\n### Connection Limits Once Queries Move Server-Side\n\nOn the default path, supabase-js sends requests over HTTPS, so the browser never holds database connections. That changes when you move queries into your own serverless functions. Each function instance that opens a TCP connection counts against the database’s limit, and a burst of invocations can exhaust it. The TiDB Cloud serverless driver sends each query as an HTTPS request with no connection to hold open. If you use a TCP driver such as `mysql2` instead, create the client outside the handler and cap the pool size.\n\n### Schema Changes, Observability, and Long-Term Maintainability\n\nTiDB runs DDL online, so adding a column or index does not block the table. TiDB Cloud also records slow queries and statement statistics, which surfaces unindexed filters before users do. For a related pattern, see this [agent database for website builders](https://www.pingcap.com/blog/agent-database-kimi-k2-6/).\n\n:::card tone=light\n\n**About this walkthrough:** Steps assume a Lovable project synced to GitHub, Vercel hosting with Node.js functions, and a TiDB Cloud Starter cluster. Code samples are illustrative, based on the documented APIs of `@tidbcloud/serverless` and Prisma. Test migrations on staging first. Technical review: Bernard Kavanagh, Principal Solutions Architect, PingCAP.\n\n:::\n\n## How TiDB Fits the Next Phase of AI App Development\n\nMost Lovable apps start as CRUD. The next phase adds analytics on live data, retrieval over documents, and agent memory across sessions. TiDB supports each in the same cluster, so AI features do not force a database swap. As more of an app’s work is done by AI agents, the database’s role changes too; see [what makes a database for AI agents different](https://www.pingcap.com/blog/what-makes-a-database-for-ai-agents-different/).\n\n### From Persistent CRUD to Agent Memory and Retrieval Workflows\n\nAgent memory is a data modeling pattern teams build on TiDB Cloud. Session history sits in a messages table and durable user facts sit in a table with an embedding column, inside one ACID boundary with operational data. A retrieval query can filter by `workspace_id`, rank by `VEC_COSINE_DISTANCE`, and join to project records in one SQL statement.\n\n### When to Start with TiDB Cloud Starter and When to Grow Beyond It\n\nStart on TiDB Cloud Starter for an MVP or unpredictable traffic. Move to TiDB Cloud Essential, currently in public preview and billed on storage plus RCUs that represent provisioned compute capacity, or to TiDB Cloud Dedicated for isolated infrastructure. The project tracker could launch on Starter, add TiFlash analytics in month four and vector search in month six, then move to Essential when enterprise tenants sign, on the same schema.\n\n## How TiDB Supports Builders from Launch to Scale\n\nShipping an app with Lovable is the hard first step: an idea is now a product people can use. Lovable Cloud is a good home for that product while it finds its customers. TiDB becomes worth evaluating when growing write traffic or analytics on live data stretch the existing database, and its distributed SQL architecture lets the data layer scale without application-managed shards. To see how TiDB supports AI workloads more broadly, explore the [AI data infrastructure platform](https://www.pingcap.com/ai/).\n\nIf your Lovable app is becoming a startup, the [TiDB AI Startup Program](https://www.pingcap.com/tidb-ai-startup-program/) offers qualifying pre-seed to Series B startups up to $100,000 in TiDB Cloud credits, a dedicated architecture assessment, and direct support from TiDB engineers.\n\n**About the author:** Akshata Hire is Product Marketing Lead at PingCAP, the company that builds TiDB. [One sentence on relevant technical credentials.] Lovable details come from Lovable’s public documentation and pricing as of November 2026. TiDB details come from TiDB Cloud documentation and were reviewed by PingCAP engineering.",
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
      id: 'cta-intro-1',
      type: 'cta',
      props: {
        title: '',
        subtitle:
          'Building a startup on your Lovable app? Get up to $100,000 in TiDB Cloud credits and direct support from TiDB engineers.',
        primaryCta: {
          text: 'Apply to the TiDB AI Startup Program',
          href: 'https://www.pingcap.com/tidb-ai-startup-program/',
        },
      },
      style: {
        background: 'brand-violet',
        spacing: 'sm',
        backgroundImage: {
          image: {
            url: 'https://static.pingcap.com/files/2025/06/22092103/1000011430.png',
          },
        },
      },
    },
    {
      id: 'faq',
      type: 'faq',
      props: {
        title: 'Lovable AI App Builder FAQs',
        items: [
          {
            q: 'Is Lovable Good for Production Apps?',
            a: '- Yes, for many apps. Lovable Cloud and Supabase can support production applications.\n- Before launch, define your data model, test access rules, and index common queries.\n- Keep migrations in version control once a team starts working on the code.',
          },
          {
            q: 'Does Lovable Use Supabase for the Backend?',
            a: '- Lovable Cloud, the default backend, runs on Supabase’s open-source foundation with managed PostgreSQL.\n- You can connect a Supabase project you own instead.\n- Teams evaluate other backends when write volume or analytics on live data outgrow one primary database.',
          },
          {
            q: 'What Database Should I Use with a Lovable App?',
            a: '- Start with the built-in Lovable Cloud database; it is the fastest path to launch.\n- When write traffic needs to scale beyond one primary, evaluate a database that scales without manual sharding.\n- TiDB Cloud Starter offers MySQL-compatible distributed SQL with a free quota, plus PostgreSQL-compatible TiDB Cloud Starter, available for evaluation in public preview.',
          },
          {
            q: 'Can I Connect a Lovable App to TiDB?',
            a: '- Yes. Sync to GitHub, create a TiDB Cloud Starter cluster, and store the connection string server-side.\n- Query from serverless functions with `@tidbcloud/serverless`, Prisma, Drizzle, or `mysql2`.\n- Plan it as an engineering project: Supabase client calls move into server-side code. PostgreSQL-compatible TiDB Cloud Starter, available for evaluation in public preview, reduces SQL translation for Postgres-generated schemas.',
          },
          {
            q: 'What Are the Biggest Limitations of Lovable for Serious Apps?',
            a: '- Building, hosting, and backend usage share one credit balance, so plan for both as the app grows.\n- Complex business logic benefits from code review on top of prompting.\n- Generated access rules need a manual review before launch.\n- There is no one-click migration between backends, so data decisions are best made early.',
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
