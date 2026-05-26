import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "Vibe Coding Tech Stack 2026 Guide for Builders",
  description: "Build faster in 2026 with a proven vibe coding tech stack. See tools, Next.js and TypeScript patterns, and why TiDB Cloud fits AI apps at scale.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/playbook/vibe-coding-tech-stack-guide/' },
  openGraph: {
    title: "Vibe Coding Tech Stack 2026 Guide for Builders",
    description: "Build faster in 2026 with a proven vibe coding tech stack. See tools, Next.js and TypeScript patterns, and why TiDB Cloud fits AI apps at scale.",
    url: 'https://www.pingcap.com/playbook/vibe-coding-tech-stack-guide/',
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
  path: "/playbook/vibe-coding-tech-stack-guide/",
  title: "Vibe Coding Tech Stack 2026 Guide for Builders",
  description: "Build faster in 2026 with a proven vibe coding tech stack. See tools, Next.js and TypeScript patterns, and why TiDB Cloud fits AI apps at scale.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "The Complete Vibe Coding Tech Stack in 2026: What You Actually Need", path: "/playbook/vibe-coding-tech-stack-guide/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "The Complete Vibe Coding Tech Stack in 2026: What You Actually Need",
  "meta": {
    "title": "Vibe Coding Tech Stack 2026 Guide for Builders",
    "description": "Build faster in 2026 with a proven vibe coding tech stack. See tools, Next.js and TypeScript patterns, and why TiDB Cloud fits AI apps at scale.",
    "canonical": "/playbook/vibe-coding-tech-stack-guide/"
  },
  "sections": [
    {
      "id": "hero-1",
      "type": "hero",
      "props": {
        "layout": "image-right",
        "headline": "The Complete Vibe Coding Tech Stack in 2026: What You Actually Need",
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
            "id": "jump-to-a-section",
            "label": "Jump to a Section",
            "level": 1
          },
          {
            "id": "what-vibe-coding-means-in-2026-and-why-the-stack-matters",
            "label": "What vibe coding means in 2026 and why the stack matters",
            "level": 1
          },
          {
            "id": "vibe-coding-definition-for-2026",
            "label": "Vibe coding definition for 2026",
            "level": 2
          },
          {
            "id": "the-new-workflow-from-prompt-to-production",
            "label": "The new workflow from prompt to production",
            "level": 2
          },
          {
            "id": "common-failure-modes-and-how-the-right-stack-prevents-them",
            "label": "Common failure modes and how the right stack prevents them",
            "level": 2
          },
          {
            "id": "the-complete-vibe-coding-stack-checklist",
            "label": "The complete vibe coding stack checklist",
            "level": 1
          },
          {
            "id": "build-layer-with-next-js-stack-and-typescript",
            "label": "Build layer with Next.js stack and TypeScript",
            "level": 2
          },
          {
            "id": "ai-coding-assistant-and-agentic-coding-setup",
            "label": "AI coding assistant and agentic coding setup",
            "level": 2
          },
          {
            "id": "deployment-layer-for-fast-previews-and-rollbacks",
            "label": "Deployment layer for fast previews and rollbacks",
            "level": 2
          },
          {
            "id": "database-layer-that-survives-vibe-coding-scale",
            "label": "Database layer that survives vibe coding scale",
            "level": 2
          },
          {
            "id": "ai-data-layer-for-vector-search-and-rag-apps",
            "label": "AI data layer for vector search and RAG apps",
            "level": 2
          },
          {
            "id": "data-movement-for-real-time-features-and-ai-freshness",
            "label": "Data movement for real-time features and AI freshness",
            "level": 2
          },
          {
            "id": "a-reference-architecture-for-vibe-coded-apps",
            "label": "A reference architecture for vibe-coded apps",
            "level": 1
          },
          {
            "id": "request-path-and-data-path-for-modern-full-stack-apps",
            "label": "Request path and data path for modern full stack apps",
            "level": 2
          },
          {
            "id": "why-htap-database-matters-for-mixed-workloads",
            "label": "Why HTAP database matters for mixed workloads",
            "level": 2
          },
          {
            "id": "when-distributed-sql-is-the-simplest-option",
            "label": "When distributed SQL is the simplest option",
            "level": 2
          },
          {
            "id": "kubernetes-deployment-patterns-that-don-t-break-velocity",
            "label": "Kubernetes deployment patterns that don't break velocity",
            "level": 2
          },
          {
            "id": "where-tidb-fits-in-the-vibe-coding-tech-stack",
            "label": "Where TiDB fits in the vibe coding tech stack",
            "level": 1
          },
          {
            "id": "tidb-cloud-for-builders-who-start-fast-and-scale-later",
            "label": "TiDB Cloud for builders who start fast and scale later",
            "level": 2
          },
          {
            "id": "distributed-sql-with-mysql-compatibility-for-ai-code-generation",
            "label": "Distributed SQL with MySQL compatibility for AI code generation",
            "level": 2
          },
          {
            "id": "htap-performance-without-redesigning-your-data-layer",
            "label": "HTAP performance without redesigning your data layer",
            "level": 2
          },
          {
            "id": "vector-search-and-embeddings-for-rag-features-in-the-same-platform",
            "label": "Vector search and embeddings for RAG features in the same platform",
            "level": 2
          },
          {
            "id": "retrieval-augmented-generation-with-langchain-on-tidb",
            "label": "Retrieval augmented generation with LangChain on TiDB",
            "level": 2
          },
          {
            "id": "cdc-patterns-to-keep-ai-context-fresh",
            "label": "CDC patterns to keep AI context fresh",
            "level": 2
          },
          {
            "id": "practical-build-recipe-you-can-copy",
            "label": "Practical build recipe you can copy",
            "level": 1
          },
          {
            "id": "step-1-scaffold-a-next-js-and-typescript-app-for-ai-first-iteration",
            "label": "Step 1: Scaffold a Next.js and TypeScript app for AI-first iteration",
            "level": 2
          },
          {
            "id": "step-2-use-an-ai-coding-assistant-safely-with-repo-rules-and-review-gates",
            "label": "Step 2: Use an AI coding assistant safely with repo rules and review gates",
            "level": 2
          },
          {
            "id": "stack",
            "label": "Stack",
            "level": 1
          },
          {
            "id": "forbidden-actions",
            "label": "Forbidden actions",
            "level": 1
          },
          {
            "id": "required-patterns",
            "label": "Required patterns",
            "level": 1
          },
          {
            "id": "step-3-add-a-database-schema-that-won-t-collapse-later",
            "label": "Step 3: Add a database schema that won't collapse later",
            "level": 2
          },
          {
            "id": "step-4-add-rag-with-embeddings-vector-search-and-langchain",
            "label": "Step 4: Add RAG with embeddings, vector search, and LangChain",
            "level": 2
          },
          {
            "id": "step-5-deploy-and-observe-then-iterate",
            "label": "Step 5: Deploy and observe, then iterate",
            "level": 2
          },
          {
            "id": "faqs-for-choosing-a-vibe-coding-tech-stack",
            "label": "FAQs for choosing a vibe coding tech stack",
            "level": 1
          },
          {
            "id": "is-vibe-coding-ready-to-ship-to-production-in-2026",
            "label": "Is vibe coding ready to ship to production in 2026",
            "level": 2
          },
          {
            "id": "do-i-need-a-vector-database-for-rag",
            "label": "Do I need a vector database for RAG",
            "level": 2
          },
          {
            "id": "why-not-start-with-a-single-node-database",
            "label": "Why not start with a single-node database",
            "level": 2
          },
          {
            "id": "what-makes-a-database-work-well-with-ai-code-generation",
            "label": "What makes a database work well with AI code generation",
            "level": 2
          },
          {
            "id": "key-takeaways-and-next-steps",
            "label": "Key takeaways and next steps",
            "level": 1
          },
          {
            "id": "the-stack-in-one-block",
            "label": "The stack in one block",
            "level": 2
          },
          {
            "id": "start-building-with-tidb-cloud",
            "label": "Start building with TiDB Cloud",
            "level": 2
          }
        ],
        "sticky": true
      }
    },
    {
      "id": "intro",
      "type": "richTextBlock",
      "props": {
        "content": "**Updated March 2026 | Author: Akshata Hire (Product Marketing Lead)**\n\nMost vibe coding experiments die in the gap between working locally and working in production. The generated code runs. The demo looks great. Then a schema migration breaks production, the database falls over under load, or the AI assistant rewrites a file it should never have touched. The problem is not the AI. The problem is the stack around it.\n\nThis guide maps the full vibe coding tech stack for 2026: from the Next.js and TypeScript project scaffold through agentic coding setup, deployment, Distributed SQL, HTAP performance, vector search with embeddings, retrieval-augmented generation (RAG) with LangChain, and change data capture (CDC) for real-time AI freshness. Each layer exists to prevent a specific failure mode.\n\nBy the end you will have a checklist, a reference architecture, and a clear picture of where TiDB Cloud fits and which systems it lets you skip.\n\n:::card tone=light\n\n**tl;dr**\n\nThis guide maps every layer of the vibe coding tech stack for 2026: Next.js and TypeScript for the build layer, AI coding agents with repo guardrails, Distributed SQL and HTAP on TiDB Cloud for the database layer, and built-in vector search with LangChain for RAG. Each layer exists to close a specific gap between local demos and apps that hold up in production.\n\n:::\n\n## Jump to a Section\n\n- [What vibe coding means in 2026 and why the stack matters](#what-vibe-coding-means-in-2026-and-why-the-stack-matters)\n- [The complete vibe coding stack checklist](#the-complete-vibe-coding-stack-checklist)\n- [A reference architecture for vibe-coded apps](#a-reference-architecture-for-vibe-coded-apps)\n- [Where TiDB fits in the vibe coding tech stack](#where-tidb-fits-in-the-vibe-coding-tech-stack)\n- [Practical build recipe you can copy](#practical-build-recipe-you-can-copy)\n- [FAQs for choosing a vibe coding tech stack](#faqs-for-choosing-a-vibe-coding-tech-stack)\n- [Key takeaways and next steps](#key-takeaways-and-next-steps)\n\n## What vibe coding means in 2026 and why the stack matters\n\nThe tools have matured enough that your choice of stack is now a bigger determinant of shipping speed than your choice of AI assistant. This section defines the discipline and the failure patterns it introduces.\n\n### Vibe coding definition for 2026\n\nVibe coding is a development style in which the programmer uses natural language prompts to an AI coding assistant, and sometimes an AI coding agent, to generate, modify, and test most of the code. The programmer sets intent, reviews output, and steers; the AI does the majority of keystrokes. It is not no-code: you still need to read the output, understand what it does, and catch the failure modes that AI code generation misses. Think of it as pair programming where your partner is extremely fast, occasionally overconfident, and has no memory between sessions.\n\n### The new workflow from prompt to production\n\nThe core loop: write a prompt, the AI generates code, you run it locally or in a preview environment, automated tests (and your eyes) check the output, you observe what broke, and you iterate. Agentic coding extends this loop by giving the AI coding agent tools, including file access, shell commands, and browser automation, so it can execute multi-step tasks without a human in the middle of every generation.\n\nThat autonomy is the source of both the speed and the risk. An AI coding agent can scaffold an entire feature in minutes. It can also quietly rename a database column, drop an index, or overwrite a config file it was never supposed to touch. The stack needs to make those mistakes visible and recoverable before they reach users.\n\n### Common failure modes and how the right stack prevents them\n\nVibe coding introduces five recurring failure patterns:\n- **Schema drift:** the AI modifies a database schema in a migration file without updating dependent queries, types, or API contracts. Catch this with TypeScript strict mode and migration linting in CI.\n- **Broken auth:** generated auth logic uses patterns the AI has seen but that do not match your provider's current SDK. Use a managed auth layer like Clerk or NextAuth.js, and treat auth as a no-touch zone for the agent.\n- **Flaky deployments:** the AI changes environment variable names or adds a dependency without updating the deployment config. Preview environments with per-branch deploys surface this before production.\n- **Data integrity gaps:** the AI writes optimistic code that assumes operations succeed. A Distributed SQL database with ACID transactions is the safety net.\n- **AI context staleness:** your RAG pipeline retrieves stale embeddings because the source data changed. Change data capture keeps the AI knowledge layer current.\n\n## The complete vibe coding stack checklist\n\nThe table below maps each layer of the stack, a recommended tool or pattern, and the specific reason it belongs in a vibe coding workflow. The full stack explanation follows each entry.\n\n| Layer | Recommended Tool / Pattern | Why It Matters |\n|---|---|---|\n| Build | Next.js + TypeScript | Type safety accelerates AI agent code generation |\n| AI Coding | Cursor / GitHub Copilot + repo rules + pingcap/agent-rules | Context-aware generation with TiDB-specific guardrails |\n| Auth | NextAuth.js or Clerk | Auth that survives rapid iteration |\n| Deployment | Vercel / Railway + preview envs + TiDB Cloud branching | Instant rollback, isolated branch databases per PR |\n| Database | TiDB Cloud (Distributed SQL) | Scales from MVP to millions of rows, MySQL compatible |\n| AI Data Layer | TiDB Cloud Vector Search + embeddings | Store and query embedding vectors in the same platform |\n| RAG Orchestration | LangChain Python on TiDB | Retrieval-augmented generation without a separate vector DB |\n| Data Movement | TiDB CDC + Kafka / Debezium | Keep AI context fresh as app data changes |\n| Observability | OpenTelemetry + Grafana | Catch schema drift and latency regressions early |\n\n*Table 1: The complete vibe coding tech stack — layer, tool, and rationale.*",
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
        "subtitle": "TiDB Cloud Serverless is free to start, MySQL-compatible from day one, and includes vector search and HTAP in the same cluster.",
        "primaryCta": {
          "text": "Try TiDB Cloud Free",
          "href": "https://www.pingcap.com/tidb/cloud/"
        },
        "secondaryCta": {
          "text": "Explore AI Features",
          "href": "https://www.pingcap.com/ai/"
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
        "content": "### Build layer with Next.js stack and TypeScript\n\nNext.js is the default build framework for vibe coding in 2026 for one practical reason: AI coding assistants have been trained on a large volume of Next.js and TypeScript code, more than most other full-stack patterns. That training data means the AI generates more correct output, more consistently, with fewer hallucinated APIs.\n\nTypeScript strict mode matters here specifically because of AI code generation. When the AI writes a function that returns the wrong shape, TypeScript catches it at compile time before the bug reaches a preview deployment. Strict null checks, no implicit any, and exhaustive type coverage are not stylistic preferences in a vibe coding project. They are error-detection infrastructure.\n\nThe conventions that help AI coding agents reason about a Next.js codebase:\n- App Router with co-located `loading.tsx` and `error.tsx` files so the agent knows where to put UI state.\n- A consistent folder layout: `/app` for routes, `/lib` for server utilities, `/components` for UI, `/types` for shared interfaces.\n- Explicit return types on every function. The agent will replicate the pattern you establish.\n\n### AI coding assistant and agentic coding setup\n\nAn AI coding assistant is only as reliable as the context it receives. Cursor, GitHub Copilot, and similar tools all support some form of repo-level rules file: `.cursorrules`, `AGENTS.md`, or a project-level system prompt. That file is the most important config in a vibe coding project.\n\nPingCAP maintains the [pingcap/agent-rules](https://github.com/pingcap/agent-rules) repository specifically for this stack. It includes pre-built Cursor and Claude skill files for TiDB-specific workflows: `tidbx-nextjs` (Next.js and TiDB patterns and query conventions) and `tidbx-prisma` (Prisma schema patterns that map correctly to TiDB Cloud, including vector column types). Dropping these into your project means your AI coding agent starts with accurate TiDB knowledge rather than extrapolating from generic MySQL examples.\n\nAlongside agent-rules, TiDB Cloud exposes a [Model Context Protocol (MCP) server](https://docs.pingcap.com/tidbcloud/dev-guide/mcp). When connected, the TiDB MCP Server gives your AI agent direct access to your cluster schema, table statistics, and query history without leaving the coding environment. The agent can inspect the actual schema before generating a migration, reducing the class of drift errors that come from the AI reasoning about a stale mental model of your database.\n\nWhat to include in your repo rules file:\n- **Forbidden actions:** never modify `/prisma/migrations` directly, never change the database URL, never delete files from `/lib/auth`.\n- **Naming conventions** and file creation patterns so generated code fits the existing structure.\n- **The technology stack declaration** so the agent does not suggest a library you are not using.\n- **The test requirement:** every new function gets a corresponding test file.\n\nKeep the codebase context clean by committing generated code in small, reviewable chunks. Large diffs from AI code generation are hard to audit and produce noisy git history that confuses future generations of the agent.\n\n### Deployment layer for fast previews and rollbacks\n\nPreview deployments are the single change that most speeds up a vibe coding workflow. Every pull request gets its own live URL, its own environment variables, and its own isolated database via [TiDB Cloud branching](https://docs.pingcap.com/tidbcloud/dev-guide/branch). TiDB Cloud branching creates a copy-on-write snapshot of your schema and data for each branch, so a PR that includes a schema migration is always tested against a migrated database state, not against a shared staging schema that other PRs are also modifying. The AI can generate a feature, you preview it in complete isolation, and you merge or discard without touching production.\n\nVercel and Railway both provide this model out of the box for Next.js. The critical configuration: tie your preview environments to your database migration workflow so that a PR that changes a schema always runs against a TiDB Cloud branch.\n\nRollback needs to be instant. If a deployment breaks production, you should be able to revert in under a minute without touching the database. Keep migrations additive (add columns, do not rename them) so that the previous code version can still run against the new schema. Kubernetes deployment enters the picture when you outgrow the managed platform model, covered in the architecture section below.\n\n### Database layer that survives vibe coding scale\n\n\"It worked on localhost\" is the most common way a vibe coding project fails. The AI generates code against a single-node SQLite or Postgres instance. Queries work. Then real traffic arrives, the connection pool saturates, a large analytical query blocks transactional writes, or the dataset grows past the point where a single machine is comfortable.\n\nA Distributed SQL database eliminates the manual sharding step. [TiDB Cloud](https://www.pingcap.com/tidb/cloud/) runs a MySQL-compatible SQL interface over a distributed storage layer. The AI-generated code that works locally also works at scale, because the dialect is the same. You do not rewrite queries. You do not change your ORM config. The database layer handles horizontal scaling transparently.\n\nRead more on [why distributed SQL fits modern app development](https://www.pingcap.com/blog/why-distributed-sql-databases-elevate-modern-app-dev/).\n\n### AI data layer for vector search and RAG apps\n\nMost vibe-coded apps in 2026 include at least one AI feature that requires more than a prompt and a completion. Retrieval-augmented generation is the standard pattern: you store your app's knowledge (documents, user history, product catalog) as embeddings (dense numeric vectors), then at query time you retrieve the most semantically relevant entries using vector search and approximate nearest neighbor (ANN) queries, and you pass those entries as context to the language model.\n\nThe common mistake is adding a standalone vector database to handle this. That introduces a second system to operate, a second connection pool to manage, and a data synchronization problem between your app database and your vector store. TiDB Cloud includes [built-in vector search](https://docs.pingcap.com/tidbcloud/dev-guide/vector-search), so embeddings live in the same database as your transactional data. The ANN index sits next to your relational tables. One connection. One system to operate.\n\nExplore [AI-ready database features for RAG and embeddings](https://www.pingcap.com/ai/) in TiDB Cloud.\n\n### Data movement for real-time features and AI freshness\n\nChange data capture (CDC) is the mechanism that streams every insert, update, and delete from your database as an ordered event log. In a vibe coding context CDC serves two functions: it powers real-time features (activity feeds, dashboards, notifications), and it keeps your AI knowledge layer fresh. TiDB implements CDC through [TiCDC](https://docs.pingcap.com/tidb/stable/ticdc-overview), which streams row-level change events to downstream systems including Kafka.\n\nWithout CDC, your RAG pipeline retrieves embeddings based on a snapshot of data from whenever the last batch indexing job ran. A document gets updated; the embedding still reflects the old version. With CDC feeding a pipeline from TiDB to your embedding job, the vector store updates within seconds of a source record changing.\n\nSee the [change data capture tutorial for real-time pipelines](https://www.pingcap.com/blog/change-data-capture-cdc-first-steps-getting-started-tidb/) to understand the setup.\n\n## A reference architecture for vibe-coded apps\n\nThe reference architecture below maps every request and every byte of data through the stack. It is designed to be extractable: drop this section into a prompt and an AI coding agent can scaffold the folder structure and config files that implement it.\n\n### Request path and data path for modern full stack apps\n\nEvery user request travels this path:\n1. Browser or mobile client sends a request to the Vercel Edge Network.\n2. Edge routing delivers static assets from CDN cache or forwards API requests to the Next.js server.\n3. Next.js API route or Server Component executes business logic, reads from or writes to TiDB Cloud.\n4. Background jobs triggered by API routes drop messages into a BullMQ or Inngest queue.\n5. Queue workers handle async operations: sending emails, triggering AI pipelines, updating analytics.\n6. CDC streams change events from TiDB to Kafka topics, which feed the embedding pipeline and any downstream analytics consumers.\n\n| Zone | Component | Role |\n|---|---|---|\n| Edge / CDN | Vercel Edge Network | Route requests, cache static assets globally |\n| App Server | Next.js API Routes + Server Components | Handle business logic, server-render UI |\n| Background | Queue (BullMQ / Inngest) | Async jobs, scheduled tasks, AI pipeline triggers |\n| Database | TiDB Cloud Serverless (Distributed SQL) | Transactional reads/writes + HTAP analytics |\n| Vector Store | TiDB Vector Search | Embedding storage and ANN queries for RAG |\n| Data Stream | TiDB CDC to Kafka | Real-time change events to downstream consumers |\n| Observability | OpenTelemetry collector | Traces, metrics, logs across every layer |\n\n*Table 2: Reference architecture zones, components, and roles.*\n\n### Why HTAP database matters for mixed workloads\n\nHTAP stands for Hybrid Transactional and Analytical Processing. A traditional app database handles transactional queries well: single-row reads and writes, indexed lookups, tight latency requirements. A traditional analytical system handles aggregations well: full-table scans, GROUP BY queries, window functions over millions of rows. You need both in any app that includes a dashboard, usage analytics, or an AI feature that needs aggregate context.\n\nThe standard answer has been to replicate data from the app database to a data warehouse. That replication lag means your analytics are always slightly stale, and you operate two systems instead of one. TiDB's HTAP architecture uses a row-oriented storage engine ([TiKV](https://docs.pingcap.com/tidb/stable/tikv-overview)) for transactional queries and a column-oriented engine ([TiFlash](https://docs.pingcap.com/tidb/stable/tiflash-overview)) for analytical queries, with automatic synchronization between them. Your vibe-coded app can run a `COUNT(*)` across ten million rows for a dashboard widget without blocking a user's write operation.\n\nRead more on [HTAP database basics for mixed app and analytics workloads](https://www.pingcap.com/blog/harnessing-the-power-of-htap-databases/).\n\n### When distributed SQL is the simplest option\n\nDistributed SQL looks like over-engineering at the start of a project. It is not. The tipping points that make a single-node database painful arrive faster than most builders expect:\n- **Multi-tenant growth:** once you have 20+ tenants, a single Postgres instance on a shared machine starts to show connection contention and query interference between tenants.\n- **Unpredictable load:** viral growth, marketing campaigns, and automated agents calling your API create traffic spikes that a single node cannot absorb without downtime.\n- **Regional needs:** users in multiple continents need low-latency reads, which requires multi-region topology that a single-node database cannot provide.\n- **Operational overhead:** the work of managing backups, failover, and scaling on a self-managed instance grows with scale. TiDB Cloud removes that work.\n\nStarting with TiDB Cloud Serverless costs effectively zero at small scale and zero migration effort later. That is a different calculus than starting with SQLite and migrating to Postgres and then migrating to a distributed system when you need it.\n\n### Kubernetes deployment patterns that don't break velocity\n\nKubernetes deployment becomes relevant when you move off managed platforms, either to reduce cost at high scale or to meet compliance requirements. The key principle for vibe coding teams: keep Kubernetes in the infrastructure layer and out of the application layer.\n\nYour Next.js app should not need to know it is running on Kubernetes. Containerize it with a simple multi-stage Dockerfile. Use a Helm chart or Kustomize overlay for environment-specific config. Gate database migrations as a Job that runs before the Deployment rollout, so a failed migration stops the deploy before bad code reaches users.\n\nTiDB Cloud removes the hardest part of Kubernetes for databases: [TiDB Operator](https://docs.pingcap.com/tidb-in-kubernetes/stable/tidb-operator-overview) manages the stateful storage layer, but TiDB Cloud handles all of that for you on the managed tier. Your Kubernetes cluster manages stateless app pods. TiDB Cloud manages the stateful database. That separation keeps your Kubernetes complexity low.",
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
        "subtitle": "Build your vibe coding stack on a database that scales with you — no migration event required.",
        "primaryCta": {
          "text": "Start with TiDB Cloud",
          "href": "https://www.pingcap.com/tidb/cloud/"
        },
        "secondaryCta": {
          "text": "Read the Distributed SQL guide",
          "href": "https://www.pingcap.com/blog/why-distributed-sql-databases-elevate-modern-app-dev/"
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
        "content": "## Where TiDB fits in the vibe coding tech stack\n\nEach subsection below maps a specific TiDB capability to a specific vibe coding workflow need.\n\n### TiDB Cloud for builders who start fast and scale later\n\nTiDB Cloud Serverless is the starting point. You connect with a standard [MySQL-compatible](https://docs.pingcap.com/tidbcloud/dev-guide/mysql-compat) driver. Your ORM (Prisma, Drizzle, TypeORM) connects without modification. The AI-generated code that targets MySQL works against [TiDB Cloud](https://www.pingcap.com/tidb/cloud/) without changes to queries, migrations, or connection strings. You ship the MVP on the free tier, and the database scales with you without a migration event.\n\nNew to TiDB? See [What is TiDB](https://www.pingcap.com/what-is-tidb/) for an overview of the architecture and the use cases it fits. A free tier is available at signup with no credit card required.\n\n### Distributed SQL with MySQL compatibility for AI code generation\n\nMySQL compatibility matters for AI code generation because MySQL is one of the most-represented database dialects in AI training corpora, alongside PostgreSQL. When you use a MySQL-compatible database like TiDB, the queries the AI generates are more likely to be correct on the first attempt. Standard MySQL drivers, ORMs (Prisma, Drizzle, TypeORM), migration tools (Prisma Migrate, Flyway), and monitoring integrations all work with TiDB without additional configuration.\n\nThat ecosystem familiarity is what makes TiDB work well with the patterns the AI has trained on. The AI understands MySQL's SQL dialect, the MySQL error format, and the MySQL wire protocol, all of which TiDB supports. Generated code, generated queries, and generated error-handling logic land closer to correct without requiring TiDB-specific prompting. Where TiDB's behavior differs from MySQL, such as around certain optimizer behaviors or distributed transaction semantics, the TiDB documentation and the `tidbx-nextjs` and `tidbx-prisma` skill files in pingcap/agent-rules cover the gap.\n\nSee [MySQL compatible database alternatives for scaling teams](https://www.pingcap.com/blog/practical-mysql-alternatives-tidb/) for a deeper comparison.\n\n### HTAP performance without redesigning your data layer\n\nThe common alternative to HTAP is building a data stack: replicate your app database to a data warehouse (Snowflake, BigQuery, Redshift), run analytics there, and build a sync pipeline to keep them in alignment. That is three systems instead of one, and three operational costs.\n\nTiDB's HTAP model lets a single TiDB Cloud cluster handle transactional writes from your Next.js app, real-time analytical queries for product dashboards, and the batch aggregations that feed AI feature context. You do not need to redesign the data layer as the product grows. You add [TiFlash](https://docs.pingcap.com/tidb/stable/tiflash-overview) replicas (the columnar engine) to the tables that need analytical acceleration, and the rest of the cluster continues serving transactional workloads without interference.\n\n### Vector search and embeddings for RAG features in the same platform\n\nTiDB Cloud includes a native vector data type and an ANN index backed by the HNSW (Hierarchical Navigable Small World) algorithm. See the [TiDB vector search docs](https://docs.pingcap.com/tidbcloud/dev-guide/vector-search) for the full reference. You define an embedding column in a standard `CREATE TABLE` statement, insert embedding vectors alongside the rest of your row data, and query with a cosine distance function.\n\nThe operational implication: your documents table, your embeddings column, and your relational metadata all live in the same database. You write one schema migration. You maintain one backup policy. Your AI feature does not require a separate operational runbook.\n\n### Retrieval augmented generation with LangChain on TiDB\n\nLangChain has a Python-based TiDB integration. The [LangChain TiDB vector store](https://python.langchain.com/docs/integrations/vectorstores/tidb_vector) uses TiDB Cloud as a vector store backend, meaning LangChain can store document embeddings in TiDB Cloud and execute ANN retrieval queries as part of a RAG chain. The workflow:\n1. Embed source documents using an embedding model (OpenAI `text-embedding-3-small` is the common choice, producing 1536-dimensional vectors by default; dimension must match the column definition).\n2. Store embeddings in TiDB using the LangChain TiDB vector store integration.\n3. At query time, embed the user's question and retrieve the top-k most similar document chunks using ANN search.\n4. Pass the retrieved chunks as context in the language model prompt.\n5. Return the grounded, context-aware completion to the user.\n\nThe same TiDB cluster that handles your transactional data handles the retrieval step. There is no cross-system join, no sync lag, and no separate API call to a vector database service.\n\n### CDC patterns to keep AI context fresh\n\nTiDB's CDC functionality uses the [TiCDC](https://docs.pingcap.com/tidb/stable/ticdc-overview) component to stream row-level change events to downstream systems. In a vibe coding architecture the primary downstream consumer is the embedding pipeline.\n\nA typical pattern: TiCDC streams changes from TiDB to a Kafka topic. An embedding worker subscribes to that topic, generates new embeddings for changed documents, and writes them back to TiDB's vector store table. The result is that your RAG pipeline always retrieves context that reflects the current state of your application data, not a stale snapshot from a batch job that ran six hours ago.\n\nCDC also powers real-time UI features (activity feeds, live dashboards, notification triggers) without polling the application database. One stream, multiple consumers.\n\n## Practical build recipe you can copy\n\nThis section is structured as a step-by-step playbook. Each step includes the configuration decisions that matter and the reason they matter for an AI-assisted workflow.\n\n### Step 1: Scaffold a Next.js and TypeScript app for AI-first iteration\n\nStart with `create-next-app` and enable TypeScript, ESLint, and the App Router. Then configure strict mode immediately, before any generated code lands in the repo.\n\n```typescript\n// tsconfig.json\n{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"noImplicitAny\": true,\n    \"strictNullChecks\": true,\n    \"noUncheckedIndexedAccess\": true\n  }\n}\n```\n\nEstablish the folder layout before you open Cursor or Copilot. The AI will replicate whatever structure it sees:\n- `/app` — Next.js App Router pages and layouts\n- `/lib` — Server-only utilities: db client, auth, external API wrappers\n- `/components` — UI components (never import server code here)\n- `/types` — Shared TypeScript interfaces and Zod schemas\n- `/prisma` or `/drizzle` — Database schema and migrations\n\n### Step 2: Use an AI coding assistant safely with repo rules and review gates\n\nCreate a `.cursorrules` file (or `AGENTS.md` for Copilot Workspace) in the project root before writing a single line of application code. For TiDB-specific patterns, copy the `tidbx-nextjs` and `tidbx-prisma` skill files from the [pingcap/agent-rules](https://github.com/pingcap/agent-rules) repository into your project. These files pre-load the agent with correct TiDB Cloud conventions, including the right Prisma type mappings, connection string format, and vector column patterns.\n\n```bash\n# .cursorrules\n\n## Stack\nNext.js 15 App Router, TypeScript 5 strict, Prisma ORM, TiDB Cloud (MySQL compatible)\n\n## Forbidden actions\n- Never modify files in /prisma/migrations/ directly\n- Never store secrets in code: use environment variables\n- Never remove TypeScript strict mode flags\n- Never call the database from /components/\n\n## Required patterns\n- Every new function gets a corresponding test in __tests__/\n- All server actions use zod schema validation on input\n- Database queries always go through /lib/db.ts\n```\n\nSet up a GitHub Actions CI workflow that runs type checking and tests on every PR. Do not merge AI-generated code that fails type checking. The agent will learn to generate passing code if you enforce the gate consistently.\n\n### Step 3: Add a database schema that won't collapse later\n\nThe schema is where the AI most often gets it wrong. It will generate schemas that work for a single tenant and fail for multiple tenants, or that use JSON columns where relational structure would be safer and more queryable.\n\nStart with a multi-tenant-ready pattern from day one, even if you have one tenant at launch. Note that Prisma does not have a native `VECTOR` type, so the embedding column uses the `Unsupported()` escape hatch. The `tidbx-prisma` skill file in pingcap/agent-rules includes this pattern so the agent generates it correctly:\n\n```typescript\n// Prisma schema (TiDB Cloud compatible)\nmodel Organization {\n  id        String   @id @default(cuid())\n  slug      String   @unique\n  createdAt DateTime @default(now())\n  users     User[]\n  documents Document[]\n}\n\nmodel Document {\n  id             String   @id @default(cuid())\n  organizationId String\n  title          String\n  content        String   @db.LongText\n  embedding      Unsupported(\"VECTOR(1536)\")?  // dimension must match embedding model output\n  updatedAt      DateTime @updatedAt\n  organization   Organization @relation(fields: [organizationId], references: [id])\n\n  @@index([organizationId])\n}\n```\n\nTiDB Cloud accepts standard Prisma migrations without modification for all standard types. The `Unsupported()` vector field requires a raw SQL migration step for the HNSW index, shown in Step 4. Run migrations in CI before the deployment step, not after. A migration failure stops the deploy.\n\n### Step 4: Add RAG with embeddings, vector search, and LangChain\n\nThe minimal RAG data model requires two things: a table to store source documents with their embeddings, and a retrieval function that returns the top-k most similar chunks for a given query embedding.\n\nIn TiDB Cloud, you add a `VECTOR` column and create an HNSW index. The dimension in `VECTOR(N)` must match the output dimension of your embedding model. OpenAI `text-embedding-3-small` produces 1536 dimensions at its default setting.\n\n```sql\n-- SQL for TiDB Cloud vector search\nALTER TABLE documents\n  ADD COLUMN embedding VECTOR(1536);\n\n-- Correct TiDB HNSW index syntax: distance function goes in the index expression\nCREATE VECTOR INDEX idx_doc_embedding\n  ON documents ((VEC_COSINE_DISTANCE(embedding)))\n  USING HNSW;\n```\n\nThe official [LangChain TiDB vector store integration](https://python.langchain.com/docs/integrations/vectorstores/tidb_vector) is Python-based. Use it from a Python embedding service or background worker that handles document ingestion and retrieval:\n\n```python\n# rag/store.py\nfrom langchain_community.vectorstores import TiDBVectorStore\nfrom langchain_openai import OpenAIEmbeddings\nimport os\n\nembeddings = OpenAIEmbeddings(model=\"text-embedding-3-small\")\n\nvector_store = TiDBVectorStore.from_existing_index(\n    embedding=embeddings,\n    table_name=\"documents\",\n    connection_string=os.environ[\"TIDB_DATABASE_URL\"],\n    distance_strategy=\"cosine\",\n)\n\ndef retrieve(query: str, k: int = 5):\n    return vector_store.similarity_search(query, k=k)\n```\n\n### Step 5: Deploy and observe, then iterate\n\nProduction readiness for a vibe-coded app is not a destination. It is an ongoing practice of observing what breaks and narrowing the feedback loop.\n\nThe deployment checklist before shipping to production:\n- Preview environment tested and approved by at least one reviewer.\n- CI passes: type check, lint, unit tests, integration tests against a migrated schema.\n- Migration applied to a TiDB Cloud branch and verified before promotion to production.\n- Environment variables validated with a startup check (fail fast if `DATABASE_URL` is missing).\n- OpenTelemetry tracing connected to a Grafana dashboard so you see latency and error rates from the first request.\n\nFor the Kubernetes deployment path: containerize the Next.js app with a multi-stage Docker build that produces a minimal image. Use a Helm chart to manage replicas, resource limits, and environment config. Keep the migration Job as a pre-deploy hook. TiDB Cloud handles the database Kubernetes layer so your cluster only manages stateless application pods.\n\n## FAQs for choosing a vibe coding tech stack\n\n### Is vibe coding ready to ship to production in 2026\n\n- Yes, with guardrails. Teams shipping production apps with AI coding assistants in 2026 treat generated code as a fast draft, not a finished product.\n- The stack is the guardrail: TypeScript strict mode, CI gates, preview environments, and a reliable database prevent the most common failure modes.\n- Agentic coding (fully autonomous agents executing multi-step tasks) requires additional oversight: repo rules, forbidden-file lists, and mandatory human review before merging.\n- The risk is proportional to the autonomy granted. A human reviewing AI-generated code before every merge is low risk. An agent with write access to production is not.\n\n### Do I need a vector database for RAG\n\n- Not if your app database supports vector search natively. A standalone vector database is only necessary when your existing database has no vector indexing capability.\n- TiDB Cloud includes built-in vector search with HNSW indexing, so you can store embeddings alongside relational data and query both in a single connection.\n- Retrieval-augmented generation requires embeddings (numeric representations of text) and a fast ANN index. Both are available in TiDB without adding a separate system.\n- The cost of a standalone vector database is not just the bill. It is the data sync complexity, the extra connection pool, and the operational runbook. Avoid it when the capability is already in your database.\n\n### Why not start with a single-node database\n\n- Single-node databases require a migration event to distribute. That migration gets harder as your dataset grows and your team grows around the current schema.\n- TiDB Cloud Serverless is free at small scale and eliminates the migration event entirely. You scale in place.\n- Distributed SQL also provides built-in high availability. A single-node Postgres instance going down takes your app down. TiDB's multi-replica architecture tolerates node failures transparently.\n- The Distributed SQL model also removes the manual work of sharding, connection pooling at scale, and cross-region replication: work that consumes engineering time that vibe coding teams do not have.\n\n### What makes a database work well with AI code generation\n\n- **MySQL compatibility:** AI coding agents generate more correct SQL and ORM code against MySQL-compatible dialects than against less common databases. MySQL is one of the most-represented database dialects in AI training corpora, and TiDB supports the MySQL wire protocol, drivers, and SQL syntax, so agents work with familiar patterns from day one.\n- **Ecosystem fit:** standard ORM tools (Prisma, Drizzle, TypeORM), migration runners, and monitoring integrations that the agent knows how to configure all work with TiDB. See the [MySQL compatibility docs](https://docs.pingcap.com/tidbcloud/dev-guide/mysql-compat) for specifics on where TiDB aligns with and differs from MySQL.\n- **Schema migration support:** the database needs to work with standard migration tools (Prisma Migrate, Flyway, Liquibase) so the AI can generate and apply schema changes without custom tooling.\n- **Operational simplicity:** a managed database like TiDB Cloud reduces the surface area of database-related prompts the AI needs to handle. Less operational complexity means more accurate generation.\n\n## Key takeaways and next steps\n\n### The stack in one block\n\nDrop this checklist into your project README or your AI agent's context file:\n\n| Layer | Tool / Pattern |\n|---|---|\n| Build layer | Next.js 15 + TypeScript 5 + ESLint strict |\n| AI coding | Cursor / Copilot with `.cursorrules` or `AGENTS.md` + pingcap/agent-rules (tidbx-nextjs, tidbx-prisma) |\n| Auth | NextAuth.js or Clerk: never hand-rolled |\n| Deployment | Vercel or Railway with preview environments + TiDB Cloud branching per PR |\n| Database | TiDB Cloud Serverless: Distributed SQL, MySQL compatible, HTAP |\n| Vector search | TiDB built-in vector search with embeddings for RAG |\n| RAG orchestration | LangChain Python TiDB integration: store, retrieve, cite |\n| Data movement | TiDB CDC to Kafka for real-time AI context freshness |\n| Observability | OpenTelemetry traces + Grafana dashboards |\n\n*Table 3: The full vibe coding stack — copy this into your README or agent context file.*\n\nFive things to remember:\n- Vibe coding is fast because the AI handles keystrokes. It fails when the stack does not catch the AI's mistakes before they reach production.\n- TypeScript strict mode and CI gates are not optional in an AI-assisted workflow. They are the error-detection layer that compensates for AI code generation's failure modes.\n- A Distributed SQL database like TiDB Cloud removes the migration event that kills traction at scale. Start correctly, scale without a rewrite.\n- HTAP means one database handles your transactional app, your analytical dashboards, and your AI feature context. That eliminates data stack sprawl.\n- Vector search in TiDB means RAG without a standalone vector database. Fewer systems, less operational overhead, fresher AI context via CDC.\n\n### Start building with TiDB Cloud\n\nIf you have worked through this stack and your next step is shipping something real, TiDB Cloud Serverless gives you the database layer without a migration event later. It is free to start, MySQL-compatible from day one, and includes vector search and HTAP in the same cluster, so the AI features you build today do not require a second system tomorrow.\n\n**Related reading:**\n- [AI-ready database features for RAG and embeddings](https://www.pingcap.com/ai/)\n- [How Bolt scaled a MySQL workload with TiDB](https://www.pingcap.com/case-study/bolt-modernizing-mysql-tidb-scale-thousands-microservices-aws/)\n- [Why distributed SQL fits modern app development](https://www.pingcap.com/blog/why-distributed-sql-databases-elevate-modern-app-dev/)\n- [HTAP database basics for mixed app and analytics workloads](https://www.pingcap.com/blog/harnessing-the-power-of-htap-databases/)\n- [Change data capture tutorial for real-time pipelines](https://www.pingcap.com/blog/change-data-capture-cdc-first-steps-getting-started-tidb/)\n- [MySQL compatible database alternatives for scaling teams](https://www.pingcap.com/blog/practical-mysql-alternatives-tidb/)",
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
      "id": "cta-intro-3",
      "type": "cta",
      "props": {
        "title": "",
        "subtitle": "TiDB Cloud Serverless is free to start and scales without a migration event. MySQL-compatible, HTAP, and vector search in one cluster.",
        "primaryCta": {
          "text": "Spin up a free TiDB Cloud Serverless cluster",
          "href": "https://www.pingcap.com/tidb/cloud/"
        },
        "secondaryCta": {
          "text": "Explore AI features on TiDB Cloud",
          "href": "https://www.pingcap.com/ai/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "sm",
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/files/2025/06/22211020/1000011435.png"
          }
        }
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
