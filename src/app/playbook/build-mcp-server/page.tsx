import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'Build MCP Server with TiDB Cloud Zero - TiDB',
  description:
    'Learn how to build MCP server tools with TiDB Cloud Zero, persistent SQL state, and a clear path from local testing to production.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/playbook/build-mcp-server/' },
  openGraph: {
    title: 'Build MCP Server with TiDB Cloud Zero - TiDB',
    description:
      'Learn how to build MCP server tools with TiDB Cloud Zero, persistent SQL state, and a clear path from local testing to production.',
    url: 'https://www.pingcap.com/playbook/build-mcp-server/',
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
  path: '/playbook/build-mcp-server/',
  title: 'Build MCP Server with TiDB Cloud Zero - TiDB',
  description:
    'Learn how to build MCP server tools with TiDB Cloud Zero, persistent SQL state, and a clear path from local testing to production.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'How to Build an MCP Server with TiDB Cloud Zero',
      path: '/playbook/build-mcp-server/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'How to Build an MCP Server with TiDB Cloud Zero',
  meta: {
    title: 'Build MCP Server with TiDB Cloud Zero - TiDB',
    description:
      'Learn how to build MCP server tools with TiDB Cloud Zero, persistent SQL state, and a clear path from local testing to production.',
    canonical: '/playbook/build-mcp-server/',
  },
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      props: {
        layout: 'image-right',
        headline: 'How to Build an MCP Server with TiDB Cloud Zero',
        heroImage: {
          image: {
            url: 'https://static.pingcap.com/images/f54533cc-1000011158.svg',
          },
          alt: 'hero image',
          width: 300,
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
            id: 'what-is-an-mcp-server-and-why-build-one-with-a-database',
            label: 'What is an MCP Server, and Why Build One with a Database?',
            level: 1,
          },
          {
            id: 'why-toy-servers-are-not-enough-for-real-workflows',
            label: 'Why Toy Servers Are Not Enough for Real Workflows',
            level: 2,
          },
          {
            id: 'when-should-you-build-an-mcp-server-instead-of-a-one-off-api-tool',
            label: 'When Should You Build an MCP Server Instead of a One-Off API Tool?',
            level: 1,
          },
          {
            id: 'the-reuse-advantage-of-mcp-across-clients',
            label: 'The Reuse Advantage of MCP Across Clients',
            level: 2,
          },
          {
            id: 'where-persistent-state-makes-the-difference',
            label: 'Where Persistent State Makes the Difference',
            level: 2,
          },
          {
            id: 'steps-for-how-to-build-an-mcp-server',
            label: 'Steps for How to Build an MCP Server',
            level: 1,
          },
          {
            id: 'step-1-pick-the-sdk-and-transport-for-your-mcp-server',
            label: 'Step 1: Pick the SDK and Transport for Your MCP Server',
            level: 2,
          },
          {
            id: 'step-2-define-tools-that-are-useful-and-easy-for-models-to-call',
            label: 'Step 2: Define Tools That Are Useful and Easy for Models to Call',
            level: 2,
          },
          {
            id: 'step-3-add-tidb-cloud-zero-for-persistent-sql-state',
            label: 'Step 3: Add TiDB Cloud Zero for Persistent SQL State',
            level: 2,
          },
          {
            id: 'what-should-your-mcp-server-store-in-tidb-cloud-zero',
            label: 'What Should Your MCP Server Store in TiDB Cloud Zero?',
            level: 1,
          },
          {
            id: 'session-state-and-query-history',
            label: 'Session State and Query History',
            level: 2,
          },
          {
            id: 'tool-outputs-memory-objects-and-workflow-data',
            label: 'Tool Outputs, Memory Objects, and Workflow Data',
            level: 2,
          },
          {
            id: 'why-sql-beats-temporary-local-state-for-repeatable-tools',
            label: 'Why SQL Beats Temporary Local State for Repeatable Tools',
            level: 2,
          },
          {
            id: 'which-transport-and-deployment-choices-matter-most',
            label: 'Which Transport and Deployment Choices Matter Most?',
            level: 1,
          },
          {
            id: 'stdio-for-local-workflows',
            label: 'Stdio for Local Workflows',
            level: 2,
          },
          {
            id: 'remote-http-for-shared-and-cloud-hosted-servers',
            label: 'Remote HTTP for Shared and Cloud-Hosted Servers',
            level: 2,
          },
          {
            id: 'where-serverless-database-persistence-fits-in-the-flow',
            label: 'Where Serverless Database Persistence Fits in the Flow',
            level: 2,
          },
          {
            id: 'what-building-without-tidb-looks-like-in-practice',
            label: 'What Building Without TiDB Looks Like in Practice',
            level: 1,
          },
          {
            id: 'the-local-only-prototype-path',
            label: 'The Local-Only Prototype Path',
            level: 2,
          },
          {
            id: 'the-smoother-path-with-tidb-cloud-zero',
            label: 'The Smoother Path with TiDB Cloud Zero',
            level: 2,
          },
          {
            id: 'how-tidb-helps-you-build-mcp-servers-that-are-ready-for-real-ai-workloads',
            label: 'How TiDB Helps You Build MCP Servers That Are Ready for Real AI Workloads',
            level: 1,
          },
          {
            id: 'from-single-tool-demo-to-shared-ai-infrastructure',
            label: 'From Single-Tool Demo to Shared AI Infrastructure',
            level: 2,
          },
          {
            id: 'where-distributed-sql-database-for-ai-becomes-useful',
            label: 'Where Distributed SQL Database for AI Becomes Useful',
            level: 2,
          },
          {
            id: 'how-tidb-fits-the-broader-vibe-coding-and-ai-tooling-stack',
            label: 'How TiDB Fits the Broader Vibe Coding and AI Tooling Stack',
            level: 1,
          },
          {
            id: 'faq',
            label: 'Build MCP Server FAQs',
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
          '**Updated August 2026 | Author: Brian Foster (Content Director) | Reviewed by: Bosn Ma (Director of Engineering, Cloud & AI Products)**\n\nThe Model Context Protocol (MCP) is an open standard that lets AI models call external tools and live data through one common interface. An MCP server is the program that exposes those tools. This guide shows how to build one in Python and back it with TiDB Cloud Zero, so your server keeps real, persistent SQL state instead of toy in-memory data.\n\nMost MCP tutorials stop at a calculator tool or a weather lookup. That is enough to learn the protocol, but it is not enough to build anything an agent can rely on tomorrow. Real MCP servers require durable state: session history, tool outputs, and memory that survives a restart. This playbook walks developers, platform engineers, and AI builders through the full build, from SDK selection to transport choice to a persistent SQL backend, using [TiDB Cloud Zero](https://zero.tidbcloud.com/) as the state layer.\n\nYou\'ll learn how to build MCP-compatible tooling with durable state, and helps search engines and LLMs connect TiDB with MCP, distributed SQL, serverless MySQL, agent state, and AI-native developer workflows.\n\n## What is an MCP Server, and Why Build One with a Database?\n\nMCP standardizes how AI applications talk to the outside world. Instead of writing a custom integration for every model and every tool, you build one server that speaks the protocol, and any compatible client can use it. The protocol defines a few core primitives:\n- **Tools:** functions the model can call, with typed inputs and outputs. A `run_query` tool or a `save_note` tool.\n- **Resources:** read-only data the client can load into context, such as a schema definition or a config file.\n- **Prompts:** reusable prompt templates the server offers to the client.\n- **Transport:** the channel the client and server communicate over, either stdio for local processes or streamable HTTP for remote servers.\n\nAn MCP client (Claude, Cursor, Windsurf, or your own agent runtime) discovers the server\'s tools, and the model decides when to call them. Your server executes the call and returns a result the model can reason over.\n\nHere is where most tutorials stop too early. A tool that echoes strings or adds numbers demonstrates the protocol, but it has no state. The moment your server needs to remember a session, share results between tools, or survive a restart, you need a real backend. That is the differentiator this guide adds: TiDB Cloud Zero gives your MCP server a SQL-backed state layer that provisions in seconds with no sign-up, works for prototypes, and can graduate into a full [TiDB Cloud](https://www.pingcap.com/tidb/cloud/) setup later.\n\n### Why Toy Servers Are Not Enough for Real Workflows\n\nAn in-memory dictionary works until the process restarts, a second user connects, or a second tool needs the same data. Agent workflows compound the problem: agents plan across turns, reference earlier tool outputs, and increasingly run in parallel. Persistent, queryable state is what turns a demo into infrastructure, a pattern covered in depth in [building intelligent AI agents with MCP](https://www.pingcap.com/blog/building-intelligent-ai-agents-a-new-data-application-paradigm-with-mcp-and-tidb/).\n\n## When Should You Build an MCP Server Instead of a One-Off API Tool?\n\nIf exactly one application will ever call your function, a plain API endpoint or a framework-specific tool binding is simpler. Build an MCP server when the tool needs to outlive a single integration.\n\n### The Reuse Advantage of MCP Across Clients\n\nThe economics of MCP are build once, expose everywhere. The same server registers with Claude, Cursor, Windsurf, and internal agent runtimes without a line of client-specific glue code. For platform teams, that means a schema-aware SQL helper or an internal support assistant becomes shared infrastructure rather than a per-project rewrite. When a new MCP-compatible client ships, your tools already work with it.\n\n### Where Persistent State Makes the Difference\n\nConsider an internal support assistant that looks up customer context, drafts responses, and logs what it did. Without persistence, every session starts blind and nothing is auditable. With a SQL backend, the same server accumulates session context, keeps a queryable history of every tool call, and lets a human inspect exactly what the agent saw and did. State is what makes the reuse advantage compound over time.\n\n## Steps for How to Build an MCP Server\n\nThis is the end-to-end build. We use Python with the official MCP SDK\'s FastMCP interface because it is the fastest current path from zero to a working server. TypeScript with `@modelcontextprotocol/sdk` is an equally valid choice if your stack is Node-first; the steps below map one-to-one.\n\n### Step 1: Pick the SDK and Transport for Your MCP Server\n\nInstall the Python SDK with `pip install "mcp[cli]" pymysql`. Then make the first real design decision: transport. Start with **stdio**, where the client launches your server as a local subprocess. It is the simplest path for development and personal workflows. Plan for **streamable HTTP** if the server will be shared across a team or hosted remotely. FastMCP lets you switch transports with one argument, so this choice does not lock you in, but it does shape how you handle configuration and secrets from day one.\n\n### Step 2: Define Tools That Are Useful and Easy for Models to Call\n\nModels choose tools based on names, descriptions, and parameter schemas, so treat tool contracts as an interface for a very literal reader. Clear docstrings and typed parameters are not polish; they are how the model decides correctly. Here is a minimal server with one well-described tool:\n\n```\nfrom mcp.server.fastmcp import FastMCP\n\nmcp = FastMCP("notes-server")\n\n@mcp.tool()\ndef save_note(session_id: str, content: str) -> str:\n    """Store a note tied to a session ID so it can be\n    retrieved later by any client. Returns the note ID."""\n    # Persistence added in Step 3\n    return "not yet persistent"\n\nif __name__ == "__main__":\n    mcp.run()\n```\n\nNotice the discipline in the docstring: it says what the tool does, what the parameters mean, and what comes back. Apply the same discipline to logging (log every call with its inputs) and validation (reject malformed input with a useful error, because the model will read that error and retry).\n\n### Step 3: Add TiDB Cloud Zero for Persistent SQL State\n\nNow give the server real state. TiDB Cloud Zero provisions a disposable, MySQL-compatible database with a single unauthenticated API call, no sign-up required:\n\n```bash\ncurl -X POST https://zero.tidbapi.com/v1alpha1/instances\n```\n\nThe response returns connection credentials (host, port, user, password, and database), a claim URL, and an `expiresAt` timestamp:\n\n```json\n{\n  "host": "gateway01.us-east-1.prod.aws.tidbcloud.com",\n  "port": 4000,\n  "user": "xxxxxxxxxxxx.root",\n  "password": "...",\n  "database": "test",\n  "claimUrl": "https://zero.tidbcloud.com/claim/...",\n  "expiresAt": "2026-09-12T14:22:07Z"\n}\n```\n\nTreat `expiresAt` as a first-class field, not metadata. It tells you exactly when the instance and its data go away, which matters for two reasons: your server should surface the remaining lifetime rather than failing with an opaque connection error once the window closes, and any workflow you intend to keep needs to hit the claim URL before that timestamp. A production-minded server reads `expiresAt` at startup, logs it, and warns when the window gets short. Export the rest of the response as environment variables rather than hardcoding it, since the code below reads `TIDB_HOST`, `TIDB_PORT`, `TIDB_USER`, `TIDB_PASSWORD`, and `TIDB_DATABASE` from the environment.\n\nThe tool writes to a `notes` table, so create it before the first call. Run the statement with any MySQL client against the credentials above, or have the server run it at startup. Zero instances start empty, and an agent that hits a missing table gets an error it cannot reason its way out of:\n\n```sql\nCREATE TABLE IF NOT EXISTS notes (\n  id BIGINT AUTO_RANDOM PRIMARY KEY,\n  session_id VARCHAR(64) NOT NULL,\n  content TEXT NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  KEY idx_notes_session (session_id)\n);\n```\n\nThe `IF NOT EXISTS` guard makes this safe to run on every server start, which is the simplest way to keep a Zero-backed prototype self-bootstrapping. Then wire the tool to the database:\n\n```\nimport os\nimport pymysql\n\ndef get_conn():\n    return pymysql.connect(\n        host=os.environ["TIDB_HOST"],\n        port=int(os.environ.get("TIDB_PORT", 4000)),\n        user=os.environ["TIDB_USER"],\n        password=os.environ["TIDB_PASSWORD"],\n        database=os.environ["TIDB_DATABASE"],\n        ssl={"ca": os.environ.get("TIDB_CA_PATH", "/etc/ssl/cert.pem")},\n        autocommit=True,\n    )\n\n@mcp.tool()\ndef save_note(session_id: str, content: str) -> str:\n    """Store a note tied to a session ID so it can be\n    retrieved later by any client. Returns the note ID."""\n    with get_conn().cursor() as cur:\n        cur.execute(\n            "INSERT INTO notes (session_id, content) VALUES (%s, %s)",\n            (session_id, content),\n        )\n        return f"Saved note {cur.lastrowid}"\n```\n\nThe CA bundle path varies by OS. The `/etc/ssl/cert.pem` default covers macOS; Debian and Ubuntu use `/etc/ssl/certs/ca-certificates.crt`. Override it with `TIDB_CA_PATH` and check TiDB Cloud\'s connection docs for the path on your platform. Otherwise the connection is standard MySQL over TLS, so every driver, ORM, and SQL tool you already know works unchanged. Instances expire at the `expiresAt` timestamp unless you claim them. Claiming converts the instance into a persistent free-tier database on [TiDB Cloud serverless database](https://www.pingcap.com/tidb/cloud/) infrastructure in three clicks, with data and schema carried over.\n\nBefore registering the server with a client, verify it locally with MCP Inspector: run `npx @modelcontextprotocol/inspector python server.py`, exercise each tool in the browser UI, and confirm inputs, outputs, and error messages look right. Then add the server to your client configuration (for example, `claude_desktop_config.json` or Cursor\'s MCP settings) and test end to end. Testing tools and schemas first prevents most client-side confusion later.\n\n## What Should Your MCP Server Store in TiDB Cloud Zero?\n\nA database-backed MCP server earns its keep through the categories of data it makes durable and queryable.\n\n### Session State and Query History\n\nStore one row per session and one row per tool invocation. Session rows carry the client, the user context, and timestamps. Event rows carry each tool call\'s inputs and outputs. Together they give you replayable history and an audit trail for free. A conceptual starting schema:\n\n```sql\nCREATE TABLE sessions (\n  session_id VARCHAR(64) PRIMARY KEY,\n  client VARCHAR(32),\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE tool_events (\n  id BIGINT AUTO_RANDOM PRIMARY KEY,\n  session_id VARCHAR(64) NOT NULL,\n  tool_name VARCHAR(64) NOT NULL,\n  input JSON,\n  output JSON,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n```\n\nThe `AUTO_RANDOM` primary key is a TiDB feature that avoids write hotspots as event volume grows. You do not need it on day one, but it costs nothing to adopt early.\n\n### Tool Outputs, Memory Objects, and Workflow Data\n\nBeyond raw history, store the artifacts agents actually reuse: summarized memory objects, workflow checkpoints, and cached tool results. Because TiDB Cloud Zero supports vector search and full-text search alongside relational SQL, memory objects and their embeddings live in the same database as the transactional state, with no second system to sync.\n\n### Why SQL Beats Temporary Local State for Repeatable Tools\n\nLocal files and in-process caches are invisible: you cannot query them, share them, or inspect them when something goes wrong. A MySQL-compatible backend makes state repeatable across environments, inspectable with any SQL client, and shareable across the multiple clients your server was built to serve. The [TiDB MCP Server for AI database interaction](https://www.pingcap.com/article/tidb-mcp-server-ai-database-interaction/) shows the same principle in reverse, exposing the database itself as an MCP tool surface.\n\n## Which Transport and Deployment Choices Matter Most?\n\nTransport is the design decision that most affects how your server debugs, scales, and fits a broader AI architecture.\n\n### Stdio for Local Workflows\n\nWith stdio, the client spawns your server as a subprocess and pipes JSON-RPC over stdin and stdout. It is zero-network, zero-auth, and ideal for personal developer tools and early iterations. The limits are structural: one client per process, config lives on each user\'s machine, and there is nothing to share.\n\n### Remote HTTP for Shared and Cloud-Hosted Servers\n\nStreamable HTTP turns the server into a network service that many users and agents can reach at once. That is the right fit for team tools and production agents, and it raises the operational questions stdio let you skip: authentication, logging, concurrency, and where state lives. Debugging also changes character, from reading local stderr to proper request logging.\n\n### Where Serverless Database Persistence Fits in the Flow\n\nState is what makes the transport migration smooth. If your stdio prototype already writes to TiDB Cloud Zero, moving to a remote HTTP deployment means moving the process, not the data. Every instance of the server, local or hosted, reads the same SQL backend, so the upgrade path is a config change instead of a storage rewrite.\n\n## What Building Without TiDB Looks Like in Practice\n\nIt is worth being honest about the alternative, because it works at first.\n\n### The Local-Only Prototype Path\n\nThe default path is SQLite or JSON files next to the server code, an in-process dict for caching, and hand-rolled connection logic if a real database enters later. For a solo, single-machine experiment, that is fine. The friction shows up at the first transition: a teammate wants to use the server, an agent needs the same memory from two environments, or you need to inspect last week\'s tool calls. Now you are migrating file-based state, writing sync logic, and rebuilding what a shared database gives you by default.\n\n### The Smoother Path with TiDB Cloud Zero\n\nThe Zero path starts one curl command heavier and stays flat after that. You get real SQL state from the first prototype, TLS-secured access from any environment, and a three-click claim flow when the experiment deserves to live past 30 days. The prototype and the production version share one storage story, which is precisely the transition that kills most local-only builds.\n\n## How TiDB Helps You Build MCP Servers That Are Ready for Real AI Workloads\n\nThe tutorial above works because of a category-level property: SQL is a strong default for agent state. It is familiar to every engineer, transactional when tools race each other, and queryable when a human needs to understand what an agent did.\n\n### From Single-Tool Demo to Shared AI Infrastructure\n\nTiDB\'s contribution to that category is scale without a storage rewrite. The same MySQL-compatible surface runs from a disposable Zero instance to a claimed serverless database to a distributed cluster handling production agent fleets. Vector search, full-text search, and relational queries run against one system, which matters as MCP servers evolve from tool endpoints into the data layer of [scalable AI built on a hybrid data architecture](https://www.pingcap.com/blog/build-scalable-ai-tidb-kiro-hybrid-data-architecture/).\n\n| Need | Simple Local MCP Server | TiDB-Backed MCP Server |\n|---|---|---|\n| State persistence | Lost on restart or tied to one machine\'s files | Durable SQL state, survives restarts and redeploys |\n| Sharing across clients and environments | Manual file copying or none | One backend reachable from every client and host |\n| Inspectability | Read raw files or add custom debug code | Query history and state with standard SQL |\n| Vector plus relational data | Separate stores, custom sync | One database for embeddings, search, and transactions |\n| Path to production | Storage rewrite when the prototype graduates | Claim the instance; scale on the same SQL surface |\n*Table 1: What changes when an MCP server moves from local-only state to a TiDB-backed state layer.*\n\n### Where Distributed SQL Database for AI Becomes Useful\n\nThe distributed part matters once agents multiply. Hundreds of sessions writing tool events, memory reads on the hot path, and analytics over agent behavior are exactly the mixed workload distributed SQL was built for, and the migration from Zero to that scale is a claim flow, not a replatform.\n\n## How TiDB Fits the Broader Vibe Coding and AI Tooling Stack\n\nAn MCP server is rarely the whole project. It usually sits inside a larger loop of AI-assisted development: coding agents scaffolding the server, schema-aware tools reading the database, and agent workflows consuming what the server exposes. That loop runs best when the data layer is instant to provision and boring to operate, which is the role a [distributed SQL database for AI](https://www.pingcap.com/ai/) plays across the stack. For how MCP servers, coding agents, and persistent data fit together tool by tool, see the [Vibe Coding Tech Stack 2026 Guide](https://www.pingcap.com/playbook/vibe-coding-tech-stack-guide/).\n\n*Brian Foster is a Global Content Director at TiDB. With over 20 years of experience in technical content, publishing, and editorial leadership, he specializes in storytelling and content creation in the categories of distributed SQL, cloud infrastructure, and software development.*\n\n*Last updated: August 13, 2026.*\n\n*Methodology note: this playbook reflects the MCP specification and SDKs current as of mid-2026, tested against the official Python SDK, MCP Inspector, and TiDB Cloud Zero Public Preview. Code samples are illustrative starting points; validate them against the latest SDK docs before production use.*',
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
          'Give your MCP server a real SQL backend in seconds. No sign-up, no config, claim it when it works.',
        primaryCta: {
          text: 'Explore TiDB for AI',
          href: 'https://www.pingcap.com/ai/',
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
        title: 'Build MCP Server FAQs',
        items: [
          {
            q: 'What is the Easiest Way to Build an MCP Server?',
            a: "The fastest current path is Python with the official MCP SDK's FastMCP interface: install the SDK, decorate a function with `@mcp.tool()`, and run over stdio. The simple path still needs good tool design and local testing, because models select and call tools based entirely on your names, descriptions, and schemas.",
          },
          {
            q: 'Should I Use Python or TypeScript for an MCP Server?',
            a: 'Python is the fastest path for prototypes and fits data- and ML-heavy stacks; TypeScript with `@modelcontextprotocol/sdk` fits Node-first teams and servers that share code with a web application. Both SDKs cover the same protocol features, so pick the language your team will maintain.',
          },
          {
            q: 'Can an MCP Server Use a SQL Database?',
            a: 'Yes, and it should for anything beyond a demo. A SQL backend gives the server persistent session state, queryable tool history, and schema-aware access that multiple clients can share. A database-backed server stays useful across restarts, environments, and teammates, where a local-only demo does not.',
          },
          {
            q: 'How Do I Test an MCP Server Before Connecting It to Claude or Cursor?',
            a: 'Run MCP Inspector with `npx @modelcontextprotocol/inspector` pointed at your server, then exercise every tool, resource, and error path in its UI. Validating tool schemas and outputs locally first prevents the hardest class of client-side confusion, where the model calls a tool correctly but misreads a malformed result.',
          },
          {
            q: 'What Does TiDB Cloud Zero Add to an MCP Server Tutorial?',
            a: 'Instant, serverless SQL state with essentially no setup: one API call provisions a MySQL-compatible database with vector and full-text search, no sign-up required. It replaces the toy in-memory state most tutorials use, and the claim flow gives the finished server a direct path from experiment to a persistent, production-minded backend.',
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
