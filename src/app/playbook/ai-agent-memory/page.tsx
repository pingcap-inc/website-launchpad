import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'AI Agent Memory Architecture Guide - TiDB',
  description:
    'Learn how ai agent memory works across working, short-term, and long-term memory, plus the architecture choices behind retrieval and state.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/playbook/ai-agent-memory/' },
  openGraph: {
    title: 'AI Agent Memory Architecture Guide - TiDB',
    description:
      'Learn how ai agent memory works across working, short-term, and long-term memory, plus the architecture choices behind retrieval and state.',
    url: 'https://www.pingcap.com/playbook/ai-agent-memory/',
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
  path: '/playbook/ai-agent-memory/',
  title: 'AI Agent Memory Architecture Guide - TiDB',
  description:
    'Learn how ai agent memory works across working, short-term, and long-term memory, plus the architecture choices behind retrieval and state.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'AI Agent Memory Architecture: How to Store Long-Term Memory, State, and Retrieval Data',
      path: '/playbook/ai-agent-memory/',
    },
  ],
})

const dsl: PageDSL = {
  pageName:
    'AI Agent Memory Architecture: How to Store Long-Term Memory, State, and Retrieval Data',
  meta: {
    title: 'AI Agent Memory Architecture Guide - TiDB',
    description:
      'Learn how ai agent memory works across working, short-term, and long-term memory, plus the architecture choices behind retrieval and state.',
    canonical: '/playbook/ai-agent-memory/',
  },
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      props: {
        layout: 'image-right',
        headline:
          'AI Agent Memory Architecture: How to Store Long-Term Memory, State, and Retrieval Data',
        heroImage: {
          image: {
            url: 'https://static.pingcap.com/images/f54533cc-1000011158.svg',
          },
          alt: 'hero image',
          width: 400,
          height: 400,
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
            id: 'what-is-ai-agent-memory-and-why-does-it-matter',
            label: 'What is AI Agent Memory, and Why Does It Matter?',
            level: 1,
          },
          {
            id: 'why-stateless-agents-hit-a-ceiling-fast',
            label: 'Why Stateless Agents Hit a Ceiling Fast',
            level: 2,
          },
          {
            id: 'which-memory-types-belong-in-an-agent-memory-architecture',
            label: 'Which Memory Types Belong in an Agent Memory Architecture?',
            level: 1,
          },
          {
            id: 'working-memory-for-the-current-task',
            label: 'Working Memory for the Current Task',
            level: 2,
          },
          {
            id: 'short-term-and-long-term-memory-across-sessions',
            label: 'Short-Term and Long-Term Memory Across Sessions',
            level: 2,
          },
          {
            id: 'procedural-memory-and-learned-tool-use',
            label: 'Procedural Memory and Learned Tool Use',
            level: 2,
          },
          {
            id: 'what-is-the-difference-between-memory-types-and-memory-architecture',
            label: 'What is the Difference Between Memory Types and Memory Architecture?',
            level: 1,
          },
          {
            id: 'memory-content-vs-memory-system-design',
            label: 'Memory Content vs. Memory System Design',
            level: 2,
          },
          {
            id: 'why-storage-alone-is-not-a-memory-architecture',
            label: 'Why Storage Alone is Not a Memory Architecture',
            level: 2,
          },
          {
            id: 'steps-for-designing-an-agent-memory-architecture',
            label: 'Steps for Designing an Agent Memory Architecture',
            level: 1,
          },
          {
            id: 'step-1-separate-live-context-from-durable-memory',
            label: 'Step 1: Separate Live Context From Durable Memory',
            level: 2,
          },
          {
            id: 'step-2-decide-what-gets-written-summarized-and-promoted',
            label: 'Step 2: Decide What Gets Written, Summarized, and Promoted',
            level: 2,
          },
          {
            id: 'step-3-build-retrieval-rules-for-state-facts-and-history',
            label: 'Step 3: Build Retrieval Rules for State, Facts, and History',
            level: 2,
          },
          {
            id: 'how-should-ai-agent-memory-store-state-long-term-memory-and-retrieval-data',
            label: 'How Should AI Agent Memory Store State, Long-Term Memory, and Retrieval Data?',
            level: 1,
          },
          {
            id: 'state-data-that-must-stay-precise-and-current',
            label: 'State Data That Must Stay Precise and Current',
            level: 2,
          },
          {
            id: 'long-term-memory-that-should-persist-and-evolve',
            label: 'Long-Term Memory That Should Persist and Evolve',
            level: 2,
          },
          {
            id: 'retrieval-data-that-supports-semantic-recall',
            label: 'Retrieval Data That Supports Semantic Recall',
            level: 2,
          },
          {
            id: 'why-rag-and-llm-memory-are-not-the-same-thing',
            label: 'Why RAG and LLM Memory Are Not the Same Thing',
            level: 1,
          },
          {
            id: 'static-knowledge-vs-learned-history',
            label: 'Static Knowledge vs. Learned History',
            level: 2,
          },
          {
            id: 'why-similarity-search-alone-is-not-enough',
            label: 'Why Similarity Search Alone is Not Enough',
            level: 2,
          },
          {
            id: 'what-building-without-tidb-looks-like-for-agent-memory-systems',
            label: 'What Building Without TiDB Looks Like for Agent Memory Systems',
            level: 1,
          },
          {
            id: 'the-multi-store-memory-stack-most-teams-end-up-stitching-together',
            label: 'The Multi-Store Memory Stack Most Teams End Up Stitching Together',
            level: 2,
          },
          {
            id: 'the-simpler-path-with-tidb-for-state-and-memory-consolidation',
            label: 'The Simpler Path With TiDB for State and Memory Consolidation',
            level: 2,
          },
          {
            id: 'why-tidb-fits-production-grade-ai-agent-memory-architecture',
            label: 'Why TiDB Fits Production-Grade AI Agent Memory Architecture',
            level: 1,
          },
          {
            id: 'one-memory-substrate-for-relational-state-and-semantic-retrieval',
            label: 'One Memory Substrate for Relational State and Semantic Retrieval',
            level: 2,
          },
          {
            id: 'distributed-sql-vector-search-and-operational-reliability',
            label: 'Distributed SQL, Vector Search, and Operational Reliability',
            level: 2,
          },
          {
            id: 'how-tidb-supports-the-next-phase-of-agentic-ai-systems',
            label: 'How TiDB Supports the Next Phase of Agentic AI Systems',
            level: 1,
          },
          {
            id: 'faq',
            label: 'AI Agent Memory FAQs',
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
          '**Updated August 2026 | Author: Brian Foster (Content Director) | Reviewed by: Bernard Kavanagh (Principal Solutions Architect)**\n\nAI agent memory is the system that stores, retrieves, and updates information across interactions so an agent stops behaving like a stateless tool. It captures what happened, decides what is worth keeping, and recalls the right context at the right moment, turning each session into something the agent can build on.\n\nThis playbook is for software architects, ML platform engineers, and backend teams designing production agents. It explains the memory types the field has converged on, the difference between memory content and memory architecture, and a practical design loop for building a memory system that survives contact with real users.\n\n## What is AI Agent Memory, and Why Does It Matter?\n\nA large language model is stateless by design. Every request starts from zero: the model knows only what fits in the current context window, and when the session ends, everything evaporates. AI agent memory is the layer that changes this. It persists information between runs, so the agent can recognize a returning user, recall previous decisions, and refine its behavior over time.\n\nThe product stakes are direct. With memory, an assistant stops re-asking for the same preferences, a coding agent remembers the conventions of the repository it worked on last week, and a support agent picks up a ticket where the last session left off. Personalization, continuity, and lower repeated prompting all trace back to the same capability: the agent accumulates context instead of renting it one window at a time.\n\nMemory is not just a bigger prompt window. A longer context helps within a session, but it does nothing across sessions, and it degrades as irrelevant history piles up. Memory is a system: it decides what to store, how to organize it, and when to recall it, independent of any single model call.\n\n### Why Stateless Agents Hit a Ceiling Fast\n\nStateless agents work in demos because demos are single sessions. In production, the ceiling appears quickly: users return, tasks span days, and workflows depend on decisions made in previous runs. Teams first compensate by stuffing history into the prompt, which raises token costs and buries the relevant context in noise. The fix is not a larger window; it is a memory architecture.',
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
          'Build agent memory on a database with SQL, vector search, and elastic scale in one engine.',
        primaryCta: {
          text: 'Start Free on TiDB Cloud',
          href: 'https://www.pingcap.com/tidb/cloud/',
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
      id: 'pre-1',
      type: 'richTextBlock',
      props: {
        content:
          '## Which Memory Types Belong in an Agent Memory Architecture?\n\nThe field has settled on a working taxonomy, and it is worth using the shared labels because frameworks, research, and vendor documentation all lean on them.\n\n| Memory Type | What It Stores | Retention Window | Retrieval Method |\n|---|---|---|---|\n| Working memory | The active task context: current goal, recent turns, in-flight tool results | Single run or task | Held directly in the context window |\n| Short-term memory | Session history: recent conversation, intermediate outputs | Hours to a session\'s end | Recency-based lookup, sliding windows |\n| Long-term memory | Durable knowledge: user preferences, extracted facts, summaries | Weeks to indefinite | Semantic search plus metadata filters |\n| Procedural memory | Learned behaviors: successful tool sequences, workflow patterns, style rules | Indefinite, refined over time | Rule and pattern lookup at planning time |\n*Table 1: The core memory types in an agent memory architecture, with retention and retrieval characteristics.*\n\nTwo more labels appear constantly in long-term memory design. Semantic memory holds general facts the agent has learned: "this customer runs on Kubernetes," "the billing service owns invoices." Episodic memory holds records of specific events and is usually timestamped: "on July 2, the deployment failed and we rolled back." Both are forms of long-term memory; they differ in whether the agent recalls a fact or an experience. Production systems usually need both, stored with enough structure to tell them apart, a distinction covered in more depth in our guide to [AI memory architecture layers](https://www.pingcap.com/blog/how-to-build-an-ai-memory-architecture-that-actually-remembers/).\n\n### Working Memory for the Current Task\n\nWorking memory is the context window itself: the goal, the recent exchange, and the tool outputs the agent needs right now. It is fast, cheap to read, and completely disposable. The design question is not how to persist it but how to keep it small, which means everything else needs somewhere durable to live.\n\n### Short-Term and Long-Term Memory Across Sessions\n\nShort-term memory bridges a session: what was said ten minutes ago, what the last tool call returned. Long-term memory bridges sessions: who this user is, what was decided last month, what the agent has learned about the domain. The boundary between them is a promotion decision, and it is one of the most consequential choices in the architecture.\n\n### Procedural Memory and Learned Tool Use\n\nProcedural memory captures how the agent should act: tool sequences that worked, formats a user prefers, guardrails learned from failures. It is the least discussed type and often the most valuable, because it compounds. An agent that remembers which approach solved a class of problem stops rediscovering it in every session.\n\n## What is the Difference Between Memory Types and Memory Architecture?\n\nMemory types describe content categories. Memory architecture describes the system that stores, retrieves, and governs that content: where each type lives, when writes happen, how recall is triggered, and what happens when memories go stale or conflict. The taxonomy tells you what to remember; the architecture determines whether remembering actually works in production.\n\nThe confusion between the two is common, and it usually takes one specific form: teams equate a vector store with a memory system. A vector store is a storage and retrieval component. It answers "what stored text is similar to this query?" It does not decide what gets written, how memories are summarized or deduplicated, which tenant can see which records, or how a stale preference gets corrected when the user changes their mind. Those are architecture decisions, and they exist whether or not anyone makes them deliberately.\n\nArchitecture choices also determine the properties users feel. Latency depends on how many stores a recall path touches. Relevance depends on retrieval policy, not just embedding quality. Governance depends on whether memory carries tenant scope and provenance. Durability depends on where writes land and what guarantees that system makes.\n\n### Memory Content vs. Memory System Design\n\nA useful test: if you can name the memory type but cannot say when it is written, where it lives, and what triggers its recall, you have a taxonomy, not an architecture.\n\n### Why Storage Alone is Not a Memory Architecture\n\nEvery storage engine persists data. A memory architecture adds the control loop around persistence: capture policy, summarization, promotion, retrieval rules, and expiry. Buying storage without designing the loop produces a growing pile of embeddings that nobody trusts.\n\n## Steps for Designing an Agent Memory Architecture\n\nProduction memory is best designed as a loop with three phases: write, manage, and read. What gets captured, how it is filtered and organized, and how it is recalled. Treating memory as this operational lifecycle, rather than as a store you fill, is the single biggest mindset shift between prototype memory and production memory. The steps below walk through the loop in design order.\n\n### Step 1: Separate Live Context From Durable Memory\n\nStart by drawing the line between what the agent holds in its context window and what must survive the session. Live context is assembled fresh for every request; durable memory is the source it is assembled from. The rule that keeps the design honest: anything in the prompt should be reconstructable from durable storage. If losing the window loses information permanently, that information was in the wrong place.\n\nThis step also defines the state boundary. Operational state such as task status, tool call records, and tenant metadata is not "memory" in the cognitive sense, but it lives in the same loop and often the same database. Treat it as a first-class category from the start rather than discovering it during an incident.\n\n### Step 2: Decide What Gets Written, Summarized, and Promoted\n\nRaw capture is easy; the write policy is the hard part. Writing everything produces noise that degrades retrieval. Writing too little produces an agent that forgets what mattered. Production systems converge on a tiered policy: capture raw events cheaply in short-term storage, then run explicit promotion, where summaries, extracted facts, and confirmed preferences move into long-term memory with provenance attached.\n\nSummarization is the workhorse here. A week of support conversations compresses into a handful of durable facts: the customer\'s environment, the open issues, the commitments made. Each promoted memory should carry metadata: where it came from, when it was written, which tenant owns it, and a confidence signal so later conflicts can be resolved. Deduplication and conflict handling belong in this phase too; when a user changes a preference, the new memory must supersede the old one rather than sit beside it.\n\n### Step 3: Build Retrieval Rules for State, Facts, and History\n\nReads are where architecture earns its keep. Different memory categories want different retrieval paths, and a production read policy combines them. State is an exact lookup: task 4132\'s status is a query, not a similarity search. Facts and preferences retrieve by identity plus filters: this user, this project, currently valid. Episodic history retrieves semantically: find past incidents similar to the one unfolding now, then rank by recency and confidence.\n\nA concrete example makes the loop visible. Consider a customer support agent. During a session, working memory holds the live ticket. Every tool call and resolution writes to short-term storage. Overnight, a managed pass summarizes the session: the customer\'s plan tier, the root cause found, the workaround promised. Next week, when the same customer opens a new ticket, the read path pulls exact state (open tickets, plan tier), filtered facts (their environment), and semantically similar past episodes, and assembles a compact context that makes the agent look like it never left.\n\nDesign the loop first and the storage second. Teams that pick databases before defining write, manage, and read policies end up with infrastructure shaped by vendor defaults instead of by the agent\'s actual behavior. And revisit the loop as the agent evolves: retrieval rules that worked at one hundred memories per user behave differently at ten thousand, and stale or conflicting records that were rare early on become the dominant failure mode at scale.\n\n## How Should AI Agent Memory Store State, Long-Term Memory, and Retrieval Data?\n\nThe loop produces three data categories with different storage requirements, and the architecture question is how to house all three without sprawl. The payloads themselves are ordinary and concrete: tool outputs and their results, user preferences, task summaries, extracted facts, and the scaffolding that makes them trustworthy, meaning timestamps, provenance, tenant scope, and confidence metadata. What differs is not exoticism but access pattern, and access pattern is what should drive the storage design.\n\n### State Data That Must Stay Precise and Current\n\nOperational state includes task status, tool call history, tenant metadata, and workflow checkpoints. This data must be exact, current, and transactional: an agent that reads a stale task status acts on the wrong world. It belongs in a database with ACID guarantees and strong consistency, queried by key and filter rather than by similarity. The design of this layer is its own discipline, covered in our piece on [agent state layer architecture](https://www.pingcap.com/blog/ai-agent-harness-state-layer/).\n\n### Long-Term Memory That Should Persist and Evolve\n\nDurable memory artifacts include task summaries, extracted facts, user preferences, and procedural rules. Typical payloads carry the content plus its scaffolding: timestamps, provenance, tenant scope, and confidence metadata. This category evolves: memories get superseded, merged, and expired. That lifecycle is far easier to operate when memory rows are ordinary database records that support updates, joins, and audits rather than opaque entries in a specialized store.\n\n### Retrieval Data That Supports Semantic Recall\n\nEmbeddings and indexes make long-term memory searchable by meaning. The critical property is that retrieval data stays consistent with the memory it describes: when a fact is superseded, its embedding must not keep surfacing the old version. Keeping vectors in the same engine as the source records, updated in the same transaction, removes the synchronization problem entirely. Teams need more than one storage shape here, but more shapes should not mean more disconnected systems.\n\n## Why RAG and LLM Memory Are Not the Same Thing\n\nRetrieval-augmented generation (RAG) and agent memory both retrieve context, which is why they get conflated. The difference is what they retrieve from. RAG queries a knowledge base: documentation, policies, product content that exists independently of any user or session. Memory queries accumulated experience: what this agent learned, decided, and observed across its own history with specific users and tasks.\n\nThe two are complementary in production. RAG answers "what does the documentation say about rate limits?" Memory answers "what did we already try on this customer\'s rate limit issue, and what did they tell us about their setup?" A production agent typically runs both, against different corpora, with different write patterns: the knowledge base updates through content pipelines, while memory updates continuously through the agent\'s own write, manage, read loop.\n\n### Static Knowledge vs. Learned History\n\nKnowledge is shared and slow-moving; memory is scoped and accumulative. That scoping is why memory carries governance requirements RAG rarely faces: tenant isolation, per-user privacy, and correction workflows when a stored memory turns out to be wrong.\n\n### Why Similarity Search Alone is Not Enough\n\nMemory retrieval is a policy, not a nearest-neighbor call. Production recall filters by tenant and validity, ranks by recency and confidence, and distinguishes facts from episodes. Similarity search finds candidates; the retrieval policy decides what the agent is actually allowed and advised to see. In enterprise and multi-tenant environments, that policy layer is the difference between a memory system and a data leak.',
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
      id: 'cta-intro-2',
      type: 'cta',
      props: {
        title: '',
        subtitle: 'See how teams consolidate agent state, memory, and retrieval onto one engine.',
        primaryCta: {
          text: 'Read the Consolidation Playbook',
          href: 'https://www.pingcap.com/blog/database-consolidation-for-ai-agents/',
        },
      },
      style: {
        background: 'brand-violet',
        spacing: 'sm',
        backgroundImage: {
          image: {
            url: 'https://static.pingcap.com/files/2025/06/22184957/1000011432.png',
          },
        },
      },
    },
    {
      id: 'pre-2',
      type: 'richTextBlock',
      props: {
        content:
          "## What Building Without TiDB Looks Like for Agent Memory Systems\n\nConsider a coding copilot that grows up the hard way. It starts with prompt-stuffed history. Memory quality forces a vector store for semantic recall. Task state needs transactions, so a relational database joins. Session caching lands in a key-value store. Now the write path fans out to three systems, the read path must reconcile them, and consistency logic that no one planned becomes custom application code.\n\nThe operational bill follows. Each store has its own backup story, its own failure modes, and its own tenant isolation model, so governance work multiplies by the number of services. When a user asks to delete their data, the request must succeed in every store or the system is out of compliance. When memory and state disagree, engineers debug a distributed system instead of querying one.\n\n### The Multi-Store Memory Stack Most Teams End Up Stitching Together\n\nNone of the individual choices were wrong; each solved the problem in front of the team. The accumulated result is a memory stack where the hardest engineering effort goes into keeping stores synchronized rather than making the agent smarter. The pattern and its exit paths are detailed in our guide to [database consolidation for AI agents](https://www.pingcap.com/blog/database-consolidation-for-ai-agents/).\n\n### The Simpler Path With TiDB for State and Memory Consolidation\n\nThe consolidated alternative keeps transactional state, long-term memory rows, and vector indexes in one distributed SQL engine. Writes to memory and its embeddings commit together. Reads combine exact filters and semantic ranking in one query. Tenant isolation is one model enforced in one place, and deleting a user's data is a transaction rather than a campaign.\n\n## Why TiDB Fits Production-Grade AI Agent Memory Architecture\n\nThe category argument comes first: production memory needs durable state, expressive querying, semantic retrieval, and as few moving parts as the workload allows. A memory substrate that provides all four lets the team spend its effort on write and read policy, which is where memory quality actually comes from.\n\nTiDB operationalizes that substrate. It is a distributed SQL database, MySQL protocol compatible, with vector search built into the engine. Memory rows live as ordinary SQL records carrying tenant scope, provenance, timestamps, and confidence metadata; embeddings sit beside them; and a single query can filter by tenant and validity, join against task state, and rank by vector similarity. The practical patterns are covered in our guide to how to [build agent memory on TiDB](https://www.pingcap.com/blog/agent-memory-database-tidb/).\n\n| Memory Requirement | Fragmented Stack Approach | TiDB-Centered Approach |\n|---|---|---|\n| Exact operational state | Separate relational store with custom sync | Native distributed ACID transactions |\n| Long-term memory records | Document or KV store, weak update semantics | SQL rows with updates, joins, and audits |\n| Semantic recall | Standalone vector store drifting from source data | Vector indexes updated with the source rows |\n| Retrieval policy | Filters reimplemented across systems | SQL filters plus vector ranking in one query |\n| Tenant isolation | Per-store isolation models | One isolation model across state and memory |\n| Deletion and compliance | Multi-system deletion campaigns | Transactional deletes across memory and vectors |\n*Table 2: How core memory requirements resolve in a fragmented stack versus a TiDB-centered architecture.*\n\n### One Memory Substrate for Relational State and Semantic Retrieval\n\nThe consequential property is co-location: the facts, the state, and the vectors that make them searchable share one consistency domain. Superseding a memory updates its embedding in the same transaction, so retrieval never surfaces a version of the truth the system already rejected.\n\nThe claim is checkable. A minimal memory table carries the content, its governance scaffolding, and its embedding in one row:\n\n```sql\nCREATE TABLE agent_memories (\n  id          BIGINT PRIMARY KEY AUTO_RANDOM,\n  tenant_id   VARCHAR(64) NOT NULL,\n  user_id     VARCHAR(64) NOT NULL,\n  kind        ENUM('fact','episode','preference') NOT NULL,\n  content     TEXT NOT NULL,\n  embedding   VECTOR(1536) NOT NULL,\n  source      VARCHAR(255),\n  confidence  FLOAT,\n  valid       BOOLEAN DEFAULT TRUE,\n  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Filter by tenant and validity, join task state, rank semantically\nSELECT m.content, m.kind, m.confidence, t.status\nFROM agent_memories m\nJOIN agent_tasks t ON t.user_id = m.user_id AND t.status = 'open'\nWHERE m.tenant_id = ? AND m.valid = TRUE\nORDER BY VEC_COSINE_DISTANCE(m.embedding, ?)\nLIMIT 5;\n```\n\nThe snippet is illustrative rather than a tutorial, but it demonstrates the architectural point: retrieval policy, tenant isolation, task state, and semantic ranking compose in one statement instead of across three systems.\n\n### Distributed SQL, Vector Search, and Operational Reliability\n\nMemory workloads grow with users and sessions, and they grow unevenly. TiDB scales horizontally by adding nodes, and its serverless deployment absorbs bursty agent traffic while scaling to zero when idle. Production evidence is clear: Manus runs more than one million database tenants on TiDB, the kind of scale multi-tenant agent memory eventually demands.\n\n## How TiDB Supports the Next Phase of Agentic AI Systems\n\nThe next phase of agentic systems is defined less by model capability than by continuity: agents that remember users across months, coordinate multi-session workflows, and operate under real governance. Those properties are memory architecture properties, and they reward teams that design the write, manage, read loop early and place it on a substrate built for both precise state and semantic recall.\n\nFor teams moving from prototypes to governed, multi-session, multi-tenant agents, TiDB provides one foundation for the whole loop. Explore our [vector search and agentic AI solutions](https://www.pingcap.com/ai/) to evaluate the architecture against your own agent workloads, or compare options in our breakdown of the [best database for AI agent memory](https://www.pingcap.com/compare/best-database-for-ai-agents/).\n\n*Brian Foster is a Global Content Director at TiDB. With over 20 years of experience in technical content, publishing, and editorial leadership, he specializes in storytelling and content creation in the categories of distributed SQL, cloud infrastructure, and software development.*\n\n*Last updated: August 14, 2026.*\n\n*This playbook draws on PingCAP's internal research, published TiDB customer case studies, current agent framework documentation, and analysis of production memory architectures. Product capabilities referenced reflect TiDB Cloud as of August 2026; confirm current details in the TiDB Cloud documentation.*",
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
        title: 'AI Agent Memory FAQs',
        items: [
          {
            q: 'What is AI Agent Memory in Simple Terms?',
            a: 'AI agent memory is the system that lets an agent store, organize, and recall information across interactions. Unlike a prompt window, which resets every session, memory persists what matters: preferences, facts, decisions, and history, so the agent improves with use.',
          },
          {
            q: 'What is the Best Architecture for Long-Term Agent Memory?',
            a: 'There is no single best; the strongest designs are tiered. Capture events in short-term storage, promote summaries and confirmed facts into durable memory with provenance, and retrieve through policies that combine exact filters with semantic ranking. Weigh the tradeoffs by workload: retrieval latency, governance needs, and how much history the agent must carry.',
          },
          {
            q: 'Is a Vector Database Enough for LLM Memory?',
            a: 'Vector retrieval solves semantic recall, one piece of the problem. Memory also needs exact state, metadata filters, tenant isolation, and transactional updates when facts change. A vector store alone approximates; production memory systems pair semantic search with a database that keeps state precise.',
          },
          {
            q: 'How Should Agents Store Memory Across Sessions?',
            a: 'Persist raw session events cheaply, then summarize and promote what deserves to last: user preferences, extracted facts, task outcomes. Scope every durable memory to its user and tenant, attach provenance and timestamps, and expire or supersede records when they go stale.',
          },
          {
            q: 'Why Do Production AI Agents Need a Database for Memory?',
            a: 'Prompt-only memory fails at production requirements: it cannot guarantee durability, isolate tenants, audit what the agent knows, or update a fact reliably. A database provides the persistence, consistency, and retrieval quality that multi-user, multi-session agents depend on.\n\n:::cta bg="https://static.pingcap.com/files/2025/06/22211020/1000011435.png"\nDesign your agent\'s memory loop on one engine: SQL state, vector recall, elastic scale.\n[Explore TiDB for Agentic AI](https://www.pingcap.com/ai/)\n:::',
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
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
