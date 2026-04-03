import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB AI Solutions Hub - Vector Search & Agentic AI",
  description: "Unified data platform for production AI. Enable vector search, RAG, and stateful autonomous agents with live data and real-time scale.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/ai/' },
  openGraph: {
    title: "TiDB AI Solutions Hub - Vector Search & Agentic AI",
    description: "Unified data platform for production AI. Enable vector search, RAG, and stateful autonomous agents with live data and real-time scale.",
    url: 'https://www.pingcap.com/ai/',
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
  path: "/ai/",
  title: "TiDB AI Solutions Hub - Vector Search & Agentic AI",
  description: "Unified data platform for production AI. Enable vector search, RAG, and stateful autonomous agents with live data and real-time scale.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "The Database for <span class=\"text-gradient-violet\">Production AI</span>", path: "/ai/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB AI Solutions Hub - Vector Search & Agentic AI",
  "meta": {
    "title": "TiDB AI Solutions Hub - Vector Search & Agentic AI",
    "description": "Unified data platform for production AI. Enable vector search, RAG, and stateful autonomous agents with live data and real-time scale.",
    "canonical": "/ai/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "",
        "headline": "The Database for <span class=\"text-gradient-violet\">Production AI</span>",
        "subheadline": "From grounded retrieval to stateful agents, TiDB unifies the foundation for production AI applications with live data, consistent state, and real-time scale",
        "primaryCta": {
          "text": "Explore Vector Search & RAG",
          "href": "/ai/vector-search/"
        },
        "secondaryCta": {
          "text": "Build Agentic AI Systems",
          "href": "/ai/agentic-ai/"
        },
        "heroImage": {
          "image": {
            "url": "https://static.pingcap.com/images/f54533cc-1000011158.svg"
          },
          "alt": "hero image",
          "width": 500,
          "height": 400
        },
        "backgroundImage": {
          "image": {
            "url": "https://static.pingcap.com/images/a047832d-banner-ai.svg",
            "width": 1440,
            "height": 1037
          },
          "alt": ""
        }
      },
      "style": {
        "background": "gradient-dark-top",
        "spacing": "hero"
      }
    },
    {
      "id": "why-tidb-ai",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "Why TiDB for AI",
        "title": "The Unified Data Platform for AI-Native Systems",
        "subtitle": "A single architecture that brings transactional, analytical, and AI workloads together—enabling retrieval, stateful agents, and reasoning without fragmented systems.",
        "items": [
          {
            "variant": "violet",
            "title": "Precise Retrieval with Continuously Current Context",
            "description": "Enable semantic search and RAG experiences that reflect the latest state of your data—without stale indexes or delayed pipelines.",
            "cta": {
              "text": "Learn More",
              "href": "https://www.pingcap.com/article/enhancing-rag-with-tidb-for-superior-data-retrieval/"
            },
            "icon": "Search"
          },
          {
            "variant": "blue",
            "title": "Durable State for Autonomous and Multi-Step Reasoning Agents",
            "description": "Persist conversations, tool interactions, and workflow progress with consistency designed for long-running and concurrent AI behavior.",
            "cta": {
              "text": "Learn More",
              "href": "https://www.pingcap.com/compare/best-database-for-ai-agents/"
            },
            "icon": "Database"
          },
          {
            "variant": "teal",
            "title": "One Backend. Every AI Workload",
            "description": "No sync issues. No operational drag. Just a unified OLTP + OLAP + Vector engine that keeps up with your AI in real time.",
            "cta": {
              "text": "Learn How Dify Solved This",
              "href": "https://www.pingcap.com/case-study/dify-consolidates-massive-database-containers-into-one-unified-system-with-tidb/"
            },
            "icon": "Brain"
          },
          {
            "variant": "red",
            "title": "Distributed Architecture That Scales with AI Demand",
            "description": "Support growth across users, agents, sessions, and environments with built-in concurrency, isolation, and horizontal expansion.",
            "cta": {
              "text": "Learn More",
              "href": "https://docs.pingcap.com/tidb/stable/tidb-architecture/"
            },
            "icon": "Layers"
          }
        ],
        "columns": 2
      },
      "style": {
        "background": "none",
        "spacing": "lg"
      }
    },
    {
      "id": "subpages-overview",
      "type": "featureCard",
      "props": {
        "eyebrow": "Where TiDB Powers Modern AI",
        "title": "Choose Your AI Architecture",
        "subtitle": "From retrieval-driven experiences to autonomous agent systems, TiDB supports the architectures teams rely on to rapidly build and operate AI at scale.",
        "items": [
          {
            "icon": "Search",
            "title": "Vector Search, Retrieval, and RAG",
            "description": "Build accurate, context-aware AI experiences using semantic search, hybrid queries, and continuously fresh data.",
            "href": "/ai/vector-search/"
          },
          {
            "icon": "Bot",
            "title": "Stateful Agents and Autonomous Workflows",
            "description": "Build agents that maintain memory, coordinate tools, and operate reliably across complex, multi-step processes.",
            "href": "/ai/agentic-ai/"
          }
        ],
        "columns": 2
      },
      "style": {
        "background": "none",
        "spacing": "lg"
      }
    },
    {
      "id": "trusted-scale",
      "type": "testimonials",
      "props": {
        "title": "Proven in Real-World AI Deployments",
        "items": [
          {
            "quote": "TiDB lets us run AI features on live data without rebuilding our stack.",
            "author": "Enterprise AI Team",
            "href": "https://www.pingcap.com/case-study/dify-consolidates-massive-database-containers-into-one-unified-system-with-tidb/",
            "cta": "Read the story",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          },
          {
            "quote": "TiDB’s elastic architecture enabled us to migrate in two weeks, supporting users and massive ‘Context Engineering’ workloads for viral success.",
            "author": "Engineering Leader",
            "href": "https://www.pingcap.com/case-study/manus-agentic-ai-database-tidb/",
            "cta": "Read the story",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/f003549b-manus.png",
                "width": 512,
                "height": 141
              },
              "alt": ""
            }
          },
          {
            "quote": "TiDB’s unified architecture enabled AI agents to access complete, real-time user context for autonomous marketing decisions.",
            "author": "Head of Engineering",
            "href": "https://www.pingcap.com/case-study/rengage-autonomous-marketing-tidb/",
            "cta": "Ready the story",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/86f45063-rengage.png",
                "width": 1225,
                "height": 282
              },
              "alt": ""
            }
          }
        ]
      },
      "style": {
        "background": "gradient-dark-bottom",
        "spacing": "lg"
      }
    },
    {
      "id": "get-started",
      "type": "cta",
      "props": {
        "title": "Start Building with TiDB",
        "subtitle": "Deploy AI on a trusted data platform in minutes. Start building AI with TiDB for free, or connect with our team to design systems tailored to your application.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Get Started with TiDB",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Talk to an AI Expert",
          "href": "https://www.pingcap.com/demo/#meeting"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "lg"
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
