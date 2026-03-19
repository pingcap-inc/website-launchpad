import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "Semantic Search & Retrieval on TiDB",
  description: "Build accurate AI retrieval with semantic search, hybrid filtering, and RAG on TiDB—unified vector storage with SQL in one database.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-ai/search-retrieval/' },
  openGraph: {
    title: "Semantic Search & Retrieval on TiDB",
    description: "Build accurate AI retrieval with semantic search, hybrid filtering, and RAG on TiDB—unified vector storage with SQL in one database.",
    url: 'https://www.pingcap.com/tidb-ai/search-retrieval/',
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
  path: "/tidb-ai/search-retrieval/",
  title: "Semantic Search & Retrieval on TiDB",
  description: "Build accurate AI retrieval with semantic search, hybrid filtering, and RAG on TiDB—unified vector storage with SQL in one database.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Semantic Search, Hybrid Retrieval, and <span class=\"text-gradient-violet\">RAG</span>—Built on TiDB", path: "/tidb-ai/search-retrieval/" },
  ],
})

const dsl: PageDSL = {
  "meta": {
    "title": "Semantic Search & Retrieval on TiDB",
    "description": "Build accurate AI retrieval with semantic search, hybrid filtering, and RAG on TiDB—unified vector storage with SQL in one database.",
    "canonical": "/tidb-ai/search-retrieval/"
  },
  "sections": [
    {
      "id": "hero-semantic-search",
      "type": "hero",
      "props": {
        "layout": "split",
        "headline": "Semantic Search, Hybrid Retrieval, and <span class=\"text-gradient-violet\">RAG</span>—Built on TiDB",
        "subheadline": "Store embeddings, run similarity search, and filter results with SQL in one distributed database—so AI applications retrieve accurate, up-to-date context without managing separate vector stores.",
        "primaryCta": {
          "text": "Start Free Trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Get Inspired",
          "href": "/tidb-ai/"
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
        "spacing": "hero"
      }
    },
    {
      "id": "why-tidb-vector",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "Why TiDB for Vector Search & Retrieval",
        "title": "A Unified Foundation for Accurate AI Retrieval",
        "subtitle": "A unified data platform that brings semantic search, structured filtering, and live application data together—so retrieval stays accurate, consistent, and ready for real-world AI workloads.",
        "items": [
          {
            "variant": "violet",
            "title": "Semantic Search on Live Data",
            "description": "Run similarity search directly on fresh operational data instead of stale indexes or duplicated vector stores.",
            "cta": {
              "text": "Learn more",
              "href": "/tidb-ai/search-retrieval/#features"
            },
            "icon": "Search"
          },
          {
            "variant": "blue",
            "title": "Hybrid Retrieval with SQL Precision",
            "description": "Combine vector similarity with relational filters, joins, and metadata-aware queries using familiar SQL—without separate search infrastructure.",
            "cta": {
              "text": "Learn more",
              "href": "/tidb-ai/search-retrieval/#features"
            },
            "icon": "GitMerge"
          },
          {
            "variant": "teal",
            "title": "Distributed Scale for Production RAG",
            "description": "Handle growing embeddings, queries, and concurrent AI workloads with TiDB's distributed architecture and transactional consistency.",
            "cta": {
              "text": "Learn more",
              "href": "/tidb-ai/search-retrieval/#features"
            },
            "icon": "Layers"
          }
        ],
        "columns": 3
      },
      "style": {
        "background": "none",
        "spacing": "section"
      }
    },
    {
      "id": "features-vector-retrieval",
      "type": "featureTabs",
      "props": {
        "eyebrow": "Features",
        "title": "Everything You Need to Build Retrieval and RAG Apps",
        "subtitle": "TiDB integrates vector storage, hybrid querying, and scalable execution in a single system—making it straightforward to build production-ready retrieval workflows.",
        "tabs": [
          {
            "id": "native-vector",
            "label": "Native Vector Storage",
            "description": "Store embeddings alongside application data and query them using similarity search.",
            "bullets": [
              "Store high-dimensional embeddings natively",
              "Query vectors with built-in distance functions",
              "Index vectors for fast retrieval at scale"
            ],
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/fd14d65a-graphic-1.svg"
              },
              "alt": "tab image",
              "width": 1200,
              "height": 800
            }
          },
          {
            "id": "hybrid-search",
            "label": "Hybrid Search with SQL",
            "description": "Combine semantic similarity with structured predicates for precise retrieval.",
            "bullets": [
              "Filter vectors by metadata and structured fields",
              "Use JOINs across application and embedding data",
              "Execute complex WHERE clauses on vector results"
            ],
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/fd14d65a-graphic-1.svg"
              },
              "alt": "tab image",
              "width": 1200,
              "height": 800
            }
          },
          {
            "id": "rag-workflow",
            "label": "RAG-Ready Retrieval",
            "description": "Retrieve relevant context and pass it directly to an LLM.",
            "bullets": [
              "Fetch contextual data in a single query",
              "Maintain consistency between retrieval and application state",
              "Build end-to-end RAG pipelines without external tools"
            ],
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/fd14d65a-graphic-1.svg"
              },
              "alt": "tab image",
              "width": 1200,
              "height": 800
            }
          },
          {
            "id": "distributed-scale",
            "label": "Distributed Performance",
            "description": "Maintain fast retrieval as embeddings, queries, and application traffic grow, without redesigning infrastructure.",
            "bullets": [
              "Horizontal scaling for embeddings and queries",
              "Low-latency retrieval across distributed clusters",
              "Elastic scaling for variable AI workloads"
            ],
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/fd14d65a-graphic-1.svg"
              },
              "alt": "tab image",
              "width": 1200,
              "height": 800
            }
          }
        ]
      },
      "style": {
        "background": "none",
        "spacing": "section"
      }
    },
    {
      "id": "customers-logos",
      "type": "logoCloud",
      "props": {
        "title": "Trusted by Leading AI and Data Companies",
        "logos": [
          {
            "name": "Databricks",
            "image": {
              "url": "https://download.pingcap.com/images/pingcap-logo-customer-databricks.svg"
            }
          },
          {
            "name": "Shopify",
            "image": {
              "url": "https://download.pingcap.com/images/pingcap-logo-customer-shopify.svg"
            }
          },
          {
            "name": "Stripe",
            "image": {
              "url": "https://download.pingcap.com/images/pingcap-logo-customer-stripe.svg"
            }
          },
          {
            "name": "Square",
            "image": {
              "url": "https://download.pingcap.com/images/pingcap-logo-customer-square.svg"
            }
          }
        ],
        "variant": "minimal"
      },
      "style": {
        "background": "none",
        "spacing": "section"
      }
    },
    {
      "id": "resources",
      "type": "featureCard",
      "props": {
        "eyebrow": "Resources",
        "title": "Explore Vector Search & RAG on TiDB",
        "subtitle": "Get started building semantic search and RAG applications with comprehensive guides and documentation.",
        "items": [
          {
            "icon": "FileCode",
            "title": "Vector Search Tutorial",
            "description": "Step-by-step guide to implementing semantic search with TiDB.",
            "href": "/docs/tidb-cloud/vector-search-overview/"
          },
          {
            "icon": "Code2",
            "title": "RAG Application Example",
            "description": "Complete example showing how to build production RAG workflows.",
            "href": "/docs/tidb-cloud/vector-search-overview/"
          },
          {
            "icon": "Database",
            "title": "Vector Database Documentation",
            "description": "Complete API reference and best practices for vector operations.",
            "href": "/docs/tidb-cloud/vector-search-overview/"
          },
          {
            "icon": "Lightbulb",
            "title": "Use Case Playbook",
            "description": "Learn how companies use vector search and RAG for their AI products.",
            "href": "/tidb-ai/"
          }
        ],
        "columns": 4
      },
      "style": {
        "background": "none",
        "spacing": "section"
      }
    },
    {
      "id": "cta-final",
      "type": "cta",
      "props": {
        "title": "Start Building AI Retrieval on TiDB Today",
        "subtitle": "Join developers using TiDB to power semantic search and RAG applications at scale.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Start Free Trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "View Documentation",
          "href": "/docs/tidb-cloud/vector-search-overview/"
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
