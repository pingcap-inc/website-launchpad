import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema, withFaqFromDSL } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'Move a Lovable AI App to Production with TiDB | TiDB',
  description:
    'Step-by-step guide to scaling Lovable AI app builder prototypes into production apps. Learn when to migrate from Supabase to TiDB for horizontal write scaling.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.pingcap.com/playbook/moving-lovable-ai-app-to-production-with-tidb/',
  },
  openGraph: {
    title: 'Move a Lovable AI App to Production with TiDB | TiDB',
    description:
      'Step-by-step guide to scaling Lovable AI app builder prototypes into production apps. Learn when to migrate from Supabase to TiDB for horizontal write scaling.',
    url: 'https://www.pingcap.com/playbook/moving-lovable-ai-app-to-production-with-tidb/',
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
  path: '/playbook/moving-lovable-ai-app-to-production-with-tidb/',
  title: 'Move a Lovable AI App to Production with TiDB | TiDB',
  description:
    'Step-by-step guide to scaling Lovable AI app builder prototypes into production apps. Learn when to migrate from Supabase to TiDB for horizontal write scaling.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'How to Turn a Lovable AI App Builder Prototype into a Production App',
      path: '/playbook/moving-lovable-ai-app-to-production-with-tidb/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'How to Turn a Lovable AI App Builder Prototype into a Production App',
  meta: {
    title: 'Move a Lovable AI App to Production with TiDB | TiDB',
    description:
      'Step-by-step guide to scaling Lovable AI app builder prototypes into production apps. Learn when to migrate from Supabase to TiDB for horizontal write scaling.',
    canonical: '/playbook/moving-lovable-ai-app-to-production-with-tidb/',
    createdBy: 'a.hire@pingcap.com',
    createdAt: '2026-11-17T22:34:06.839Z',
    modifiedBy: 'a.hire@pingcap.com',
    modifiedAt: '2026-11-17T22:38:30.209Z',
  },
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      props: {
        layout: 'image-right',
        headline: 'How to Turn a Lovable AI App Builder Prototype into a Production App',
        heroImage: {
          image: {
            url: 'https://static.pingcap.com/images/dd0669e1-clip_path_group.png',
            alt: 'clip path group',
            width: 720,
            height: 664,
          },
          alt: 'clip path group',
          width: 720,
          height: 664,
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
            id: 'where-lovable-stops-and-backend-architecture-starts',
            label: 'Where Lovable Stops and Backend Architecture Starts',
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
            id: 'the-app-state-patterns-that-break-first',
            label: 'The App State Patterns That Break First',
            level: 2,
          },
          {
            id: 'playbook-for-moving-a-lovable-app-to-tidb',
            label: 'Playbook for Moving a Lovable App to TiDB',
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
            id: 'step-3-replace-fragile-demo-state-with-real-queries-and-migrations',
            label: 'Step 3: Replace Fragile Demo State with Real Queries and Migrations',
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
            id: 'what-building-without-tidb-looks-like-as-your-app-grows',
            label: 'What Building Without TiDB Looks Like as Your App Grows',
            level: 1,
          },
          {
            id: 'prototype-shortcuts-that-become-production-bottlenecks',
            label: 'Prototype Shortcuts That Become Production Bottlenecks',
            level: 2,
          },
          {
            id: 'the-cleaner-path-with-tidb-from-mvp-to-scale',
            label: 'The Cleaner Path with TiDB from MVP to Scale',
            level: 2,
          },
          {
            id: 'which-backend-decisions-matter-most-for-ai-generated-apps',
            label: 'Which Backend Decisions Matter Most for AI-Generated Apps?',
            level: 1,
          },
          {
            id: 'connection-limits-and-serverless-runtime-constraints',
            label: 'Connection Limits and Serverless Runtime Constraints',
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
            id: 'how-tidb-helps-ai-app-builders-ship-with-less-rework',
            label: 'How TiDB Helps AI App Builders Ship with Less Rework',
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
          "**Updated November 2026 | Author: Akshata Hire, Product Marketing Lead | Reviewed by: Bernard Kavanagh, Principal Solutions Architect**\n\nA Lovable app can go from prompt to working demo in an afternoon. Before launching to real users, review its data model, access rules, and performance under expected traffic. Lovable Cloud or Supabase can support production applications. With Supabase’s PostgreSQL backend, you can increase database compute and add replicas to handle more reads, but writes still go through one primary database. TiDB becomes worth evaluating when you need to spread write traffic across multiple database nodes without building sharding into your application.\n\nThe Lovable AI app builder is a prompt-based platform that generates full-stack web apps: a React and TypeScript front end plus a backend with a database, authentication, storage, and hosting. Lovable is fast at producing working software. Whether that software is ready for production depends on how it handles persistent data, app state, and backend workflows.\n\nThis playbook is for architects and builders deciding whether to stay on Lovable’s default backend or move the data layer to [TiDB](https://www.pingcap.com/what-is-tidb/) for scalable, MySQL-compatible SQL. It includes a step-by-step move to TiDB Cloud Starter and the backend decisions that matter as the app grows.\n\n## Jump to a Section\n- [What Is the Lovable AI App Builder, and Where Does It Fit?](#what-is-the-lovable-ai-app-builder-and-where-does-it-fit)\n- [How Do Lovable Apps Handle Persistent Data and Backend State?](#how-do-lovable-apps-handle-persistent-data-and-backend-state)\n- [Playbook for Moving a Lovable App to TiDB](#playbook-for-moving-a-lovable-app-to-tidb)\n- [Why Choose TiDB for a Lovable AI App Builder Backend?](#why-choose-tidb-for-a-lovable-ai-app-builder-backend)\n- [What Building Without TiDB Looks Like as Your App Grows](#what-building-without-tidb-looks-like-as-your-app-grows)\n- [Which Backend Decisions Matter Most for AI-Generated Apps?](#which-backend-decisions-matter-most-for-ai-generated-apps)\n- [How TiDB Fits the Next Phase of AI App Development](#how-tidb-fits-the-next-phase-of-ai-app-development)\n- [How TiDB Helps AI App Builders Ship with Less Rework](#how-tidb-helps-ai-app-builders-ship-with-less-rework)\n- [Lovable AI App Builder FAQs](#lovable-ai-app-builder-faqs)\n\n## What Is the Lovable AI App Builder, and Where Does It Fit?\n\nLovable turns a plain-language prompt into a working web app, then keeps editing that app through chat. It sits between code-first AI tools and visual no-code builders: you get real code you can export, and you write little of it yourself.\n\nEach project includes a front end, a built-in backend, and publishing to a lovable.app subdomain, or to a custom domain on paid plans. Code syncs two ways with GitHub. Typical uses are MVPs, internal tools, dashboards, SaaS prototypes, and early AI products. Code-first tools such as Cursor assume you already own a codebase, and visual builders such as Bubble keep logic inside a proprietary editor. Lovable generates a standard React project you can later hand to engineers.\n\n### Why Lovable Is Gaining Traction with AI App Builders\n\nSpeed to a usable artifact is the main draw. A product team can describe a workflow, get screens wired to real tables, and share a live URL the same day. As of November 2026, Lovable’s pricing page lists a free plan that needs no credit card, a Pro plan at $25 per month with 100 monthly credits, and a Business plan at $50 per month with 100 monthly credits plus SSO and role-based access. Building, hosting, and running the built-in backend all draw from the same credit balance, according to [Lovable’s documentation](https://docs.lovable.dev/integrations/cloud).\n\n### Where Lovable Stops and Backend Architecture Starts\n\nLovable generates the backend you ask for at the moment. It does not plan for the schema you will need in six months or the query load your largest customer will create. Those decisions land on your team once users expect their data to be there tomorrow, on another device, after the next deploy.\n\n## How Do Lovable Apps Handle Persistent Data and Backend State?\n\nBy default, Lovable apps store data in Lovable Cloud, a built-in backend that runs on Supabase’s open-source foundation with a managed PostgreSQL database, auth, storage, and edge functions. Persistent state is the line between a demo and a usable application. Until data survives a refresh, a redeploy, and a schema change, the app is a prototype.\n\nA typical Lovable app runs a React UI in the browser, an auth service that issues sessions, edge functions plus direct browser calls through the Supabase client library, a Postgres database guarded by row-level security policies, and Lovable hosting. [Lovable’s Supabase docs](https://docs.lovable.dev/integrations/supabase) state there is no one-click migration between backends, so decide how data will persist before you build features on top of it.\n\n### Lovable Supabase Integration and the Default Backend Path\n\n[Lovable Cloud](https://docs.lovable.dev/features/cloud) is on by default and managed inside the Lovable editor, with an isolated database for each project. The Supabase integration instead connects a Supabase project you own. Both run Postgres and both let Lovable design tables from chat. The difference is ownership: your own Supabase project gives you the account, billing, and direct database access, while Lovable Cloud usage draws on Lovable credits.\n\n### The App State Patterns That Break First\n\nGenerated apps tend to fail in the same places once real usage arrives:\n- **State held in the browser.** Drafts or chat history kept in React state or `localStorage` vanish on another device.\n- **Tables designed one prompt at a time.** The same entity ends up stored twice under different names.\n- **Misconfigured access rules.** Disabled row-level security or overly permissive policies can expose data. Test that users can read and modify only the records they are authorized to access.\n- **Unindexed queries.** A filter that is instant on 500 rows can take seconds on 5M.\n\nFor how an agent that writes full-stack code approaches data design, see this [AI agent full-stack app builder](https://www.pingcap.com/blog/ai-agent-that-builds-full-stack-apps/) walkthrough.\n\n## Playbook for Moving a Lovable App to TiDB\n\nMoving a Lovable or Bolt-generated app to TiDB takes three steps: define the data your app must keep, connect a server-side data layer to TiDB Cloud Starter, and replace generated data calls with tested queries and migrations. The steps assume the project is synced to GitHub and deployed on Vercel with serverless functions for API logic.\n\nKnow the main cost up front. Lovable’s generated code calls Supabase from the browser and uses PostgreSQL. PostgreSQL-compatible TiDB Cloud Starter is available for evaluation in public preview and accepts standard PostgreSQL drivers, ORMs, and connection strings. Because it is still in preview, this playbook uses the generally available MySQL-compatible Starter for the production path. On either option, browser calls through the Supabase client move into server-side functions, and you can keep Supabase Auth for sign-in or switch to a provider such as Clerk or Auth.js.\n\nThese steps cover moving application tables and queries to TiDB. Authentication, uploaded files, realtime subscriptions, and edge functions need separate decisions: keep the existing services or migrate them explicitly. Before switching production traffic, plan a final data sync or a brief write pause so records created after the export are not lost. Verify sign-in, access permissions, and any file or realtime features your app uses against the new setup.\n\n### Step 1: Define the Core Entities Your App Must Persist\n\nList what the app must remember across sessions and devices: usually users, a tenant or workspace, the core business objects, and activity such as chat messages. Write that model as SQL in your repository:\n\n```sql\nCREATE TABLE workspaces (\n  id BIGINT AUTO_RANDOM PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE chat_messages (\n  id BIGINT AUTO_RANDOM PRIMARY KEY,\n  workspace_id BIGINT NOT NULL,\n  user_id VARCHAR(64) NOT NULL,\n  role ENUM('user', 'assistant', 'tool') NOT NULL,\n  content TEXT NOT NULL,\n  tool_output JSON,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  KEY idx_ws_user_time (workspace_id, user_id, created_at)\n);\n```\n\n`AUTO_RANDOM` primary keys spread inserts across storage nodes instead of creating a write hotspot. Every tenant-scoped table carries `workspace_id`, so each query can filter by tenant from the first release.\n\n### Step 2: Connect the Generated App to TiDB Cloud Starter\n\nTiDB Cloud Starter is the fully managed, auto-scaling tier of TiDB Cloud, free to start within a monthly usage quota. To connect it:\n1. Create a TiDB Cloud Starter cluster in the TiDB Cloud console.\n2. In the cluster’s **Connect** dialog, generate a password and copy the connection string.\n3. Save it as `DATABASE_URL` in Vercel environment variables. Never use a `VITE_` variable, because Vite exposes those to the browser.\n4. Run `npm install @tidbcloud/serverless` and add an API function like the one below.\n\n```typescript\n// api/messages.ts: illustrative Vercel function\n// requireUser() stands in for your auth provider's session check\nimport { connect } from '@tidbcloud/serverless';\nimport { requireUser } from '../lib/auth';\n\nconst conn = connect({ url: process.env.DATABASE_URL });\n\nexport async function GET(request: Request) {\n  const user = await requireUser(request);\n  const rows = await conn.execute(\n    'SELECT id, role, content, created_at FROM chat_messages ' +\n    'WHERE workspace_id = ? AND user_id = ? ORDER BY created_at DESC LIMIT 50',\n    [user.workspaceId, user.id]\n  );\n  return Response.json(rows);\n}\n```\n\nThe [TiDB Cloud serverless driver](https://docs.pingcap.com/tidbcloud/serverless-driver) is in beta and connects over HTTPS instead of TCP, which suits Vercel Functions, Edge Functions, and Cloudflare Workers. Prisma (through `@tidbcloud/prisma-adapter`) and Drizzle both support it, and `mysql2` works from Node.js functions with TLS. For quotas and setup, see [TiDB Cloud Starter for AI apps](https://www.pingcap.com/tidb-cloud-starter/).\n\n### Step 3: Replace Fragile Demo State with Real Queries and Migrations\n\nWork one feature at a time, keeping the Lovable version live until each path passes its tests. If you are evaluating PostgreSQL-compatible TiDB Cloud Starter, most of the type translation in item 2 goes away, because it supports common PostgreSQL types including arrays, JSON, and `TIMESTAMPTZ`. Check its documented compatibility differences before you rely on that.\n\n1. Move each `supabase.from('table')` call into a server function that runs a parameterized query, and point the React component at that endpoint.\n2. Translate Postgres types: `jsonb` to `JSON`, `uuid` to `CHAR(36)`, arrays to `JSON` or a join table, and `timestamptz` to `TIMESTAMP` in UTC.\n3. Replace row-level security with explicit tenant and user filters in server code.\n4. Export existing data from Lovable Cloud and load it through TiDB Cloud’s data import.\n5. Test sign-up, a write followed by a read on a second device, concurrent edits, and a migration on a staging cluster.\n\nKeep schema changes as migrations in version control rather than in chat:\n\n```bash\nnpx prisma migrate dev --name init   # development cluster\nnpx prisma migrate deploy            # CI, against production\n```\n\n## Why Choose TiDB for a Lovable AI App Builder Backend?\n\nA production backend for an AI-generated app should accept the code AI assistants already write, enforce ACID transactions, and scale without a rewrite. TiDB is a distributed SQL database with a MySQL-compatible interface that meets those needs and leaves room for analytics and AI features. Postgres serves many production apps well on a single primary. The case for TiDB grows when write volume, tenant count, and analytics on live data grow together.\n\n| Requirement | Default prototype backend pattern (Lovable Cloud / Supabase) | TiDB-backed application |\n|---|---|---|\n| Persistence | ACID PostgreSQL database with persistent storage | ACID distributed SQL on Raft-replicated storage |\n| Scale | Single primary, resized vertically, plus read replicas | Key-range Regions rebalanced across nodes automatically |\n| Serverless connections | TCP connections through a pooler | HTTPS serverless driver with no pool to exhaust |\n| Schema changes | SQL migrations generated by Lovable and saved in the project’s code | Online DDL that does not block reads and writes |\n| Analytics | Queries on a replica or an export to a warehouse | TiFlash columnar replicas on live data |\n| Multi-tenant growth | Isolation through row-level security policies | Tenant-scoped tables in one cluster, with Starter scaling capacity automatically as tenants grow |\n*Table 1: Default Lovable backend pattern compared with a TiDB-backed application.*\n\n### MySQL Compatibility for AI-Generated Code and Familiar Tooling\n\nTiDB speaks the MySQL wire protocol, so Prisma, Drizzle, Sequelize, and SQLAlchemy connect with their MySQL dialects. Coding assistants produce MySQL-compatible code reliably, and your team keeps its clients and migration tools. MySQL-compatible TiDB does not support stored procedures, stored functions, or triggers, so that logic belongs in application code. For teams whose generated code is Postgres-first, PostgreSQL-compatible TiDB Cloud Starter is available for evaluation in public preview.\n\n### Distributed SQL Without Manual Sharding\n\nTiDB splits tables into key-range Regions on TiKV nodes, and PD (Placement Driver) moves them as load shifts. Application code never picks a shard. Distributed transactions use two-phase commits with strong consistency, so a multi-row write commits everywhere or nowhere. The one modeling rule is to avoid monotonically increasing keys on write-heavy tables, which `AUTO_RANDOM` handles.\n\n### HTAP and Vector-Friendly Growth Paths for Future AI Features\n\nHTAP (hybrid transactional/analytical processing) means running transactions and analytics on the same data. TiFlash, a columnar engine in the same cluster, replicates from TiKV automatically: `ALTER TABLE chat_messages SET TIFLASH REPLICA 1;` is enough to start. It targets real-time, lightweight OLAP, not the deep historical analytics you would run in Snowflake or BigQuery. TiDB also supports a `VECTOR` column type, so embeddings sit next to the rows they describe. Compare options in [best vector database for AI agents](https://www.pingcap.com/compare/best-vector-database/).\n\n## What Building Without TiDB Looks Like as Your App Grows\n\nWithout a database that scales horizontally, growth becomes a series of backend projects that each make sense alone and add up to more services to run. Take an illustrative project tracker built in Lovable. In month one it stores users and projects. By month six it has chat history per user, usage analytics per workspace, and semantic search over notes.\n\n### Prototype Shortcuts That Become Production Bottlenecks\n\nOn the default path, dashboards move to a read replica to protect writes. Serverless spikes force connection pooler tuning. Analytics outgrow the replica and need an export job to a warehouse. Eventually someone proposes partitioning the chat history table by hand. Postgres with pgvector handles embeddings well at moderate scale, so search is rarely the first problem. The cost is the sum of the fixes.\n\n### The Cleaner Path with TiDB from MVP to Scale\n\nOn TiDB, the same six months are schema changes inside one cluster. Chat history is an indexed table, workspace analytics run on a TiFlash replica, and search is a vector column on the notes table. For tenant-heavy designs, see [multi-tenant SaaS database solutions](https://www.pingcap.com/solutions/saas/).\n\n## Which Backend Decisions Matter Most for AI-Generated Apps?\n\nAI-generated apps need explicit decisions on how serverless functions connect, how schema evolves, where authorization lives, and how you audit behavior, because the generator made each choice silently. Auditability is the one teams discover last. If a user reports a wrong assistant answer from last Tuesday, and each turn and tool output is a row in `chat_messages`, one SQL query reconstructs the session. If it lived in browser state, it is gone.\n\n### Connection Limits and Serverless Runtime Constraints\n\nEach serverless instance that opens its own TCP connection counts against the database limit. PostgreSQL’s default `max_connections` is 100, and a burst of invocations can exhaust it. Supabase ships a connection pooler for this reason. The TiDB Cloud serverless driver sends each query as an HTTPS request with no connection to hold open.\n\n### Schema Changes, Observability, and Long-Term Maintainability\n\nTiDB runs DDL online, so adding a column or index does not block the table. TiDB Cloud also records slow queries and statement statistics, which surfaces unindexed filters before users do. For a related pattern, see this [agent database for website builders](https://www.pingcap.com/blog/agent-database-kimi-k2-6/).\n\n:::card tone=light\n\n**About this walkthrough:** Steps assume a Lovable project synced to GitHub, Vercel hosting with Node.js functions, and a TiDB Cloud Starter cluster. Code samples are illustrative, based on the documented APIs of `@tidbcloud/serverless` and Prisma. Test migrations on staging first. Technical review: Bernard Kavanagh, Principal Solutions Architect, PingCAP.\n\n:::\n\n## How TiDB Fits the Next Phase of AI App Development\n\nMost Lovable apps start as CRUD. The next phase adds analytics on live data, retrieval over documents, and agent memory across sessions. TiDB supports each in the same cluster, so AI features do not force a database swap.\n\n### From Persistent CRUD to Agent Memory and Retrieval Workflows\n\nAgent memory is a data modeling pattern teams build on TiDB Cloud. Session history sits in a messages table and durable user facts sit in a table with an embedding column, inside one ACID boundary with operational data. A retrieval query can filter by `workspace_id`, rank by `VEC_COSINE_DISTANCE`, and join to project records in one SQL statement.\n\n### When to Start with TiDB Cloud Starter and When to Grow Beyond It\n\nStart on TiDB Cloud Starter for an MVP or unpredictable traffic. Move to TiDB Cloud Essential, currently in public preview and billed on storage plus RCUs that represent provisioned compute capacity, or to TiDB Cloud Dedicated for isolated infrastructure. The project tracker could launch on Starter, add TiFlash analytics in month four and vector search in month six, then move to Essential when enterprise tenants sign, on the same schema.\n\n## How TiDB Helps AI App Builders Ship with Less Rework\n\nLovable gets an app in front of users quickly. TiDB becomes worth evaluating when growing write traffic or analytics on live data stretches the existing database. Its distributed SQL architecture lets the data layer scale without introducing application-managed shards. If you are evaluating database options for AI-generated apps, see how TiDB works as an [AI data infrastructure platform](https://www.pingcap.com/ai/).",
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
        title: 'Lovable AI App Builder FAQs',
        items: [
          {
            q: 'Is Lovable Good for Production Apps?',
            a: '- Strong for MVPs, internal tools, and early SaaS products.\n- Production readiness depends on a defined data model, server-side authorization, and migrations in version control.\n- Review generated access rules before real users depend on the app.',
          },
          {
            q: 'Does Lovable Use Supabase for the Backend?',
            a: '- Lovable Cloud, the default backend, runs on Supabase’s open-source foundation with managed PostgreSQL.\n- You can connect a Supabase project you own instead.\n- Teams switch backends when they need horizontal scale or MySQL compatibility.',
          },
          {
            q: 'What Database Should I Use with a Lovable App?',
            a: '- For a prototype, the built-in Lovable Cloud database is fastest.\n- For multi-tenant growth or heavy writes, pick a database that scales without manual sharding.\n- TiDB Cloud Starter offers MySQL-compatible distributed SQL with a free quota, plus PostgreSQL-compatible TiDB Cloud Starter, available for evaluation in public preview.',
          },
          {
            q: 'Can I Connect a Lovable App to TiDB?',
            a: '- Yes. Sync to GitHub, create a TiDB Cloud Starter cluster, and store the connection string server-side.\n- Query from serverless functions with `@tidbcloud/serverless`, Prisma, Drizzle, or `mysql2`.\n- Expect to move Supabase client calls into server-side code. PostgreSQL-compatible TiDB Cloud Starter, available for evaluation in public preview, reduces SQL translation for Postgres-generated schemas.',
          },
          {
            q: 'What Are the Biggest Limitations of Lovable for Serious Apps?',
            a: '- Building, hosting, and backend usage share one credit balance.\n- Complex business logic is harder to get right through prompts than code review.\n- Generated security rules need a manual review.\n- No one-click migration between backends.',
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
