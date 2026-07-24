import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Agent Memory: Persistent Context for AI Agents | TiDB",
  description: "Give AI agents memory that lasts. TiDB Cloud unifies persistent agent memory, vector search, and per-agent isolation in one distributed SQL engine.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/solutions/ai-agent-memory/' },
  openGraph: {
    title: "TiDB Agent Memory: Persistent Context for AI Agents | TiDB",
    description: "Give AI agents memory that lasts. TiDB Cloud unifies persistent agent memory, vector search, and per-agent isolation in one distributed SQL engine.",
    url: 'https://www.pingcap.com/solutions/ai-agent-memory/',
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
  path: "/solutions/ai-agent-memory/",
  title: "TiDB Agent Memory: Persistent Context for AI Agents | TiDB",
  description: "Give AI agents memory that lasts. TiDB Cloud unifies persistent agent memory, vector search, and per-agent isolation in one distributed SQL engine.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "TiDB Agent Memory: Persistent Context for AI Agents", path: "/solutions/ai-agent-memory/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Agent Memory: Persistent Context for AI Agents | TiDB",
  "meta": {
    "title": "TiDB Agent Memory: Persistent Context for AI Agents | TiDB",
    "description": "Give AI agents memory that lasts. TiDB Cloud unifies persistent agent memory, vector search, and per-agent isolation in one distributed SQL engine.",
    "canonical": "/solutions/ai-agent-memory/"
  },
  "sections": [
    {
      "id": "hero-01",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "Memory for AI Agents",
        "headline": "TiDB Agent Memory: Persistent Context for AI Agents",
        "subheadline": "TiDB Cloud stores every agent’s memory in one durable, queryable database with per-agent isolation. One engine replaces the vector store, cache, and session store.",
        "primaryCta": {
          "text": "Start Free on TiDB Cloud",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "",
          "href": ""
        },
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
        "spacing": "hero",
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/images/9ae4143a-hero-lattice-bg.png",
            "alt": "hero lattice bg",
            "width": 1920,
            "height": 1080
          }
        }
      }
    },
    {
      "id": "columns-1782897376614",
      "type": "columns",
      "props": {
        "eyebrow": "The Context Problem",
        "title": "Why Agents Need Memory That Lasts",
        "subtitle": "AI agent memory helps agents retain, retrieve, and update useful context across interactions. Context is what an agent needs to know; memory is how it keeps that context over time. Short-term memory supports the current task or conversation. Persistent memory preserves important context across sessions, workflows, tools, and approved scopes. In production, memory spans more than conversation history. Agents also depend on preferences, prior decisions, task history, and tool results. Without a durable memory layer, agents repeat work, lose preferences, forget previous decisions, and cannot reliably resume tasks they already started.",
        "titleFullWidth": true,
        "layout": "split",
        "mediaType": "shortcode",
        "shortCode": "[agent-memory-timeline]"
      },
      "style": {
        "background": "inverse",
        "spacing": "section"
      }
    },
    {
      "id": "problem-01",
      "type": "featureMedia",
      "props": {
        "eyebrow": "The Challenge",
        "title": "Why Traditional Agent Architectures Break Down",
        "subtitle": "Most agent platforms don’t break because of bad engineering. They break because memory and context were never designed to live in the same place.",
        "items": [
          {
            "title": "Memory Fragments Across Disconnected Systems",
            "description": "Many agent stacks use one system for semantic search, another for session state, and another for long-lived context. This increases latency, complicates debugging, and turns context persistence into an application problem.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/624ba90e-fragment-reveal.mp4",
                "alt": "fragment reveal",
                "width": 1326,
                "height": 772
              },
              "alt": "fragment reveal",
              "width": 1326,
              "height": 772
            }
          },
          {
            "title": "Execution Environments Reset",
            "description": "When temporary sessions end, agents lose conversation history and task progress unless stored durably. Persistent memory allows agents to resume work exactly where they left off.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/9d28be2a-execution-reset.mp4",
                "alt": "execution reset",
                "width": 1324,
                "height": 624
              },
              "alt": "execution reset",
              "width": 1324,
              "height": 624
            }
          },
          {
            "title": "Per-Agent Isolation Gets Expensive",
            "description": "Dedicated infrastructure improves isolation but is costly. TiDB Cloud provides per-agent isolation with hard data boundaries while sharing underlying infrastructure efficiently.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/5c5c71d9-isolation-cost.mp4",
                "alt": "isolation cost",
                "width": 1324,
                "height": 526
              },
              "alt": "isolation cost",
              "width": 1324,
              "height": 526
            }
          }
        ],
        "startPosition": "left"
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "columns-1782897431316",
      "type": "columns",
      "props": {
        "eyebrow": "Unified Infrastructure",
        "title": "One Engine for Agent Memory, Retrieval, and Analytics",
        "subtitle": "TiDB Cloud provides a single foundation for agent memory, retrieval, and continuity.",
        "titleFullWidth": true,
        "layout": "single",
        "mediaType": "image",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/6eab39b0-one-engine-e.mp4",
            "alt": "one engine e",
            "width": 1920,
            "height": 1720
          },
          "alt": "one engine e",
          "width": 1000,
          "height": 1720
        },
        "shortCode": "[agent-memory-timeline]"
      },
      "style": {
        "background": "primary",
        "spacing": "section",
        "removePaddingBottom": true
      }
    },
    {
      "id": "solution-01",
      "type": "featureGrid",
      "props": {
        "eyebrow": "",
        "title": "",
        "subtitle": "",
        "items": [
          {
            "icon": "Database",
            "title": "Persistent, Queryable Memory",
            "description": "Agents write conversation turns, preferences, facts, and decisions to TiDB Cloud. That memory persists across sessions, stays queryable, and can be accessed by other agents in the same workflow. TiDB keeps concurrent reads and writes consistent without locking, so many agents can work against shared memory safely.",
            "cta": {
              "text": "Explore TiDB Cloud",
              "href": "https://www.pingcap.com/tidb/cloud/"
            }
          },
          {
            "icon": "Shield",
            "title": "Per-Agent Isolation",
            "description": "TiDB Cloud's distributed architecture separates logical isolation from physical infrastructure. Each agent gets its own database with hard data boundaries, while the underlying compute and storage are shared across the cluster.",
            "cta": {
              "text": "View Architecture",
              "href": "https://docs.pingcap.com/"
            }
          },
          {
            "icon": "Search",
            "title": "Unified Query Layer for Memory and Analytics",
            "description": "A support agent should not need three systems to look up a user’s account tier, prior tickets, and semantic matches from past conversations. On TiDB Cloud, that runs in one query.\n\nA coding agent pulling repository metadata and task history follows the same pattern. TiFlash handles analytical queries on live data without a separate pipeline, so fresh operational insights do not require moving data elsewhere",
            "cta": {
              "text": "See Vector Search",
              "href": "https://www.pingcap.com/tidb/cloud/"
            }
          }
        ],
        "columns": 3
      },
      "style": {
        "background": "primary",
        "spacing": "lg",
        "removePaddingTop": true
      }
    },
    {
      "id": "architecture-01",
      "type": "featureMedia",
      "props": {
        "eyebrow": "Architecture",
        "title": "How TiDB Supports AI Agent Memory",
        "subtitle": "The section above covers what agents get. This is how TiDB delivers it: the components behind transactional writes, semantic retrieval, and analytical visibility in one architecture.\n",
        "items": [
          {
            "title": "Agent Integration Layer",
            "description": "TiDB Cloud works with common AI application patterns, including PyTiDB, MCP-based architectures, LangChain, LlamaIndex, and MySQL-compatible tools.\n\nMySQL compatibility matters because many teams already have drivers, ORMs, migration scripts, and operational practices built around SQL. Moving agent memory into TiDB Cloud does not require abandoning that ecosystem. The open source [mem9](https://github.com/mem9-ai/mem9) SDK provides the memory API layer for agent frameworks.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/2aeed35a-rapid_productivity_illustration_2_.svg",
                "alt": "rapid productivity illustration 2",
                "width": 500,
                "height": 448
              },
              "alt": "rapid productivity illustration 2",
              "width": 450,
              "height": 448
            }
          },
          {
            "title": "SQL, Vector Search, and Structured Memory",
            "description": "The TiDB SQL layer provides transactions, vector search, and access to structured memory through one interface.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/853056b9-rapid_productivity_illustration-1.svg",
                "alt": "rapid productivity illustration 1",
                "width": 500,
                "height": 448
              },
              "alt": "rapid productivity illustration 1",
              "width": 500,
              "height": 448
            }
          },
          {
            "title": "Storage and Consistency Model",
            "description": "TiKV stores transactional data across the cluster. TiFlash replicates from TiKV and runs real-time analytical queries on live data. PD coordinates placement and scheduling. Raft consensus and multi-version concurrency control (MVCC) maintain consistency and isolation as many agents read and write memory at once.\n\nThe result: memory, retrieval, and operational context share one durable database boundary instead of relying on synchronization between separate systems.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/4bbb32b4-rapid_productivity_illustration_3_.svg",
                "alt": "rapid productivity illustration 3",
                "width": 500,
                "height": 448
              },
              "alt": "rapid productivity illustration 3",
              "width": 500,
              "height": 448
            }
          }
        ],
        "startPosition": "left"
      },
      "style": {
        "background": "gradient-dark-top",
        "spacing": "section"
      }
    },
    {
      "id": "use-cases-01",
      "type": "featureCard",
      "props": {
        "eyebrow": "Real-World Applications",
        "title": "Use Cases for AI Agent Memory",
        "subtitle": "From support bots to coding assistants, unified state powers reliable agents.",
        "items": [
          {
            "icon": "MessageSquare",
            "title": "Customer Support Agents With Conversation History",
            "description": "Support agents need persistent memory for previous interactions, account preferences, open issues, and resolution patterns. With an agent memory database, support workflows carry context across conversations instead of asking users to repeat themselves.\n\nIn multi-agent support workflows, a triage agent and a resolution agent can share context through TiDB Cloud while keeping their data boundaries intact.",
            "borderColor": "border-blue-500"
          },
          {
            "icon": "Code2",
            "title": "Code Generation Agents With Project Context",
            "description": "Coding agents need memory for repository structure, dependencies, and prior decisions. Persistent project context lets agents continue earlier work instead of starting from a blank prompt. In multi-agent coding workflows, a planning agent and an implementation agent can share repository context without sharing write access.",
            "borderColor": "border-violet-500"
          },
          {
            "icon": "Building",
            "title": "Enterprise AI Platforms With Tenant Isolation",
            "description": "Enterprise AI products need context persistence, security boundaries, and predictable scaling. TiDB Cloud supports per-agent isolation and agent memory scaling for platforms serving many customers, teams, and workloads from a shared foundation.",
            "borderColor": "border-teal-500"
          }
        ],
        "columns": 3,
        "borderStyle": "color"
      },
      "style": {
        "background": "gradient-dark-top",
        "spacing": "section"
      }
    },
    {
      "id": "caseStudyCards-1782472692660",
      "type": "caseStudyCards",
      "props": {
        "title": "Proven AI Agent Results",
        "items": [
          {
            "badge": "Agentic AI",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/68b65a2a-20260525-230213.png",
                "alt": "20260525 230213",
                "width": 1511,
                "height": 512
              },
              "alt": "20260525 230213",
              "width": 1511,
              "height": 512
            },
            "title": "Millions of Agent-Created Databases, Provisioned in Under a Second",
            "description": "Kimi's K2.6 agent builds and hosts full-stack web applications for millions of users, provisioning an isolated database per site instantly, powered by TiDB Cloud's multi-tenant architecture.",
            "stats": [
              {
                "value": "<1s",
                "label": "Database provisioning per site"
              },
              {
                "value": "10M+",
                "label": "Tenants supported"
              }
            ],
            "href": "https://www.pingcap.com/case-study/kimi-2-6-agent-hosting-platform-tidb-cloud/",
            "cta": "Read the story"
          },
          {
            "badge": "Agentic AI",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/ac3136ec-plaud-logo-white.png",
                "alt": "plaud logo white",
                "width": 11500,
                "height": 4260
              },
              "alt": "plaud logo white",
              "width": 11500,
              "height": 4260
            },
            "title": "From Two Data Stores to One Unified Database",
            "description": "Plaud migrated from MySQL + Amazon S3 to TiDB Cloud, eliminating S3 retrieval latency and unlocking online DDL for 2M+ users across 170 countries.",
            "stats": [
              {
                "value": "10x",
                "label": "OPS improvement under peak load"
              },
              {
                "value": "13",
                "label": "TiDB Cloud clusters in production"
              }
            ],
            "href": "https://www.pingcap.com/case-study/how-plaud-eliminated-s3-latency-limitless-scale/",
            "cta": "Read the story"
          },
          {
            "badge": "Agentic AI",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/0fc78057-manus.svg",
                "alt": "manus",
                "width": 165,
                "height": 48
              },
              "alt": "manus",
              "width": 165,
              "height": 48
            },
            "title": "From Viral Launch to 1M+ Database Tenants",
            "description": "Migrated to TiDB Cloud in two weeks to support explosive growth. TiDB now powers context persistence behind Manus's agent swarms and full-stack app generation.",
            "stats": [
              {
                "value": "2 wks",
                "label": "Migration time"
              },
              {
                "value": "1M+",
                "label": "DB tenants"
              }
            ],
            "href": "https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/",
            "cta": "Read the story"
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "cta-01",
      "type": "cta",
      "props": {
        "title": "Get Started With TiDB for AI Agent Memory",
        "subtitle": "From prototypes to production, build agents that remember.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Start Free on TiDB Cloud",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Contact Sales",
          "href": "https://www.pingcap.com/contact-us/"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "section"
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
