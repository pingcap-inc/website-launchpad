import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "One Database Engine, Not Six | TiDB Consolidation",
  description: "Replace six specialized databases with one distributed SQL engine. TiDB unifies transactions, analytics, search, and vectors, cutting overhead by 90%.",
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/lp/consolidate/' },
  openGraph: {
    title: "One Database Engine, Not Six | TiDB Consolidation",
    description: "Replace six specialized databases with one distributed SQL engine. TiDB unifies transactions, analytics, search, and vectors, cutting overhead by 90%.",
    url: 'https://www.pingcap.com/lp/consolidate/',
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
  path: "/lp/consolidate/",
  title: "One Database Engine, Not Six | TiDB Consolidation",
  description: "Replace six specialized databases with one distributed SQL engine. TiDB unifies transactions, analytics, search, and vectors, cutting overhead by 90%.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "One Engine. <span class=\"text-gradient-violet animate-glow-sweep\">Not Six.</span>", path: "/lp/consolidate/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "One Database Engine, Not Six | TiDB Consolidation",
  "meta": {
    "title": "One Database Engine, Not Six | TiDB Consolidation",
    "description": "Replace six specialized databases with one distributed SQL engine. TiDB unifies transactions, analytics, search, and vectors, cutting overhead by 90%.",
    "canonical": "/lp/consolidate/",
    "unlisted": true
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "eyebrow": "Database Consolidation",
        "headline": "One Engine. <span class=\"text-gradient-violet animate-glow-sweep\">Not Six.</span>",
        "subheadline": "Your stack has six databases. It could have one. Transactions, analytics, search, and vector memory in a single distributed SQL engine. MySQL-compatible, strongly consistent, and open source.",
        "primaryCta": {
          "text": "Book a 30-Minute Architecture Review",
          "href": "https://www.pingcap.com/contact-us/"
        },
        "secondaryCta": {
          "text": "Read How Dify Did It",
          "href": "https://www.pingcap.com/case-study/dify-consolidates-massive-database-containers-into-one-unified-system-with-tidb/"
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
      "id": "proof-point",
      "type": "stats",
      "props": {
        "eyebrow": "Proven at Scale",
        "title": "Real Teams, Real Reductions",
        "items": [
          {
            "icon": "Layers",
            "value": "500K",
            "label": "Database Containers",
            "description": "Dify replaced with one TiDB instance"
          },
          {
            "icon": "Gauge",
            "value": "90%",
            "label": "Less Overhead",
            "description": "Dify's operational cost reduction after consolidation"
          },
          {
            "icon": "Table",
            "value": "3M+",
            "label": "Tables Per Cluster",
            "description": "Atlassian scaled multi-tenancy on TiDB"
          },
          {
            "icon": "Zap",
            "value": "10x",
            "label": "Latency Reduction",
            "description": "Pinterest cut P99 latency and infrastructure costs"
          }
        ],
        "columns": 4
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "three-walls",
      "type": "featureGrid",
      "props": {
        "eyebrow": "The Problem",
        "title": "Every Company That Scales Hits the Same Three Walls",
        "subtitle": "You don't have to be a hyperscaler to have this problem. Most teams are running four or more systems long before they hit a real scale problem. That's complexity without scale, and it's real at any size.",
        "items": [
          {
            "icon": "Database",
            "title": "Data Scale",
            "description": "More data than one system can serve. The workarounds are read replicas, a bigger primary, and eventually manual sharding, at which point your application has to know where its data lives."
          },
          {
            "icon": "LayoutGrid",
            "title": "Object Scale",
            "description": "Too many tables and tenants to keep track of. Model each tenant as its own tables and you end up with millions of objects. This is the wall almost nobody plans for."
          },
          {
            "icon": "Network",
            "title": "Infrastructure Sprawl",
            "description": "A separate system for every new capability: OLTP, analytics, search, vectors, cache. Plus a pipeline between every pair of them."
          }
        ],
        "columns": 3,
        "itemLayout": "vertical"
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "integration-tax",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "The Hidden Cost",
        "title": "Adding One More System Is the Expensive Answer",
        "subtitle": "Every specialized store you bolt on is another pipeline to maintain, another failure domain, and another place your data can drift out of sync. The integration tax never shows up as a line item. It shows up as the reason a feature takes three weeks instead of three days, and as two dashboards that disagree about the same number.",
        "items": [
          {
            "variant": "red",
            "title": "Another Pipeline to Maintain",
            "description": "Every connection between systems is a failure domain and a place where data can go stale.",
            "cta": {
              "text": "See How Teams Consolidate",
              "href": "https://www.pingcap.com/customers/"
            },
            "icon": "GitMerge"
          },
          {
            "variant": "violet",
            "title": "Eventual Consistency Gaps",
            "description": "The number that matters is not how many databases you run. It is how many places your data can disagree with itself.",
            "cta": {
              "text": "Read the Architecture Guide",
              "href": "https://docs.pingcap.com/tidbcloud/architecture-concepts/"
            },
            "icon": "Repeat"
          }
        ],
        "columns": 2
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "customer-proof",
      "type": "caseStudyCards",
      "props": {
        "eyebrow": "Customer Stories",
        "title": "The Teams That Got Past This Consolidated",
        "items": [
          {
            "badge": "Infrastructure Sprawl",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/ee6420d5-dify-logo-white.svg",
                "alt": "dify logo white",
                "width": 102,
                "height": 45
              },
              "alt": "dify logo white",
              "width": 102,
              "height": 45
            },
            "title": "Dify: Six Data Types, One Engine",
            "description": "Replaced nearly half a million database containers with a single TiDB Cloud instance, unifying vectors, documents, and relational data for its open-source LLM platform.",
            "stats": [
              {
                "value": "~500K",
                "label": "containers replaced"
              },
              {
                "value": "90%",
                "label": "less overhead"
              }
            ],
            "href": "https://www.pingcap.com/case-study/dify-consolidates-massive-database-containers-into-one-unified-system-with-tidb/",
            "cta": "Read the Dify story"
          },
          {
            "badge": "Object Scale",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/efcf8f2a-atlassian_logo_inverse_rgb_2x.png",
                "alt": "atlassian logo inverse rgb 2x",
                "width": 592,
                "height": 96
              },
              "alt": "atlassian logo inverse rgb 2x",
              "width": 592,
              "height": 96
            },
            "title": "Atlassian: Three Million Tables, Sixteen Clusters",
            "description": "Replaced hundreds of sharded PostgreSQL clusters with 16 global TiDB clusters to power its Forge platform, scaling to 3M+ tables and 500K concurrent connections per cluster.",
            "stats": [
              {
                "value": "3M+",
                "label": "tables per cluster"
              },
              {
                "value": "750+",
                "label": "PostgreSQL clusters replaced"
              }
            ],
            "href": "https://www.pingcap.com/blog/how-atlassian-scaled-three-million-tables-multi-tenancy-tidb/",
            "cta": "Read the story"
          },
          {
            "badge": "Data Scale",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/51545d7d-pinterest-logo.svg",
                "alt": "pinterest logo",
                "width": 181,
                "height": 50
              },
              "alt": "pinterest logo",
              "width": 181,
              "height": 50
            },
            "title": "Pinterest: Graph Service Scaled With 10x Latency Reduction",
            "description": "Modernized its graph service with TiDB, eliminating manual sharding and achieving dramatic performance gains while cutting infrastructure costs by more than half.",
            "stats": [
              {
                "value": "10x",
                "label": "P99 latency cut"
              },
              {
                "value": "50%+",
                "label": "infrastructure savings"
              }
            ],
            "href": "https://www.pingcap.com/blog/why-pinterest-modernized-graph-service-distributed-sql/",
            "cta": "Read the story"
          },
          {
            "badge": "Migration Path",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/23ea2f33-plaid-logo.png",
                "alt": "plaid logo",
                "width": 351,
                "height": 132
              },
              "alt": "plaid logo",
              "width": 351,
              "height": 132
            },
            "title": "Plaid: 100 Services Migrated From Aurora With Zero Downtime",
            "description": "A team of six engineers migrated nearly 100 services from Amazon Aurora to TiDB in under 2.5 years, reducing cutover downtime from five minutes to under 60 seconds per service.",
            "stats": [
              {
                "value": "96%",
                "label": "less maintenance"
              },
              {
                "value": "<60s",
                "label": "cutover downtime"
              }
            ],
            "href": "https://www.pingcap.com/blog/accelerating-distributed-sql-adoption-plaid-amazon-aurora-migration/",
            "cta": "Read the story"
          }
        ]
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "what-changes",
      "type": "featureMedia",
      "props": {
        "eyebrow": "The Outcome",
        "title": "What Changes When It's One Engine",
        "items": [
          {
            "title": "Scale You Don't Have to Plan For",
            "description": "20+ TB, 300K+ QPS, 10K+ writes per second, and millions of tables in a single cluster. No shard keys in your application, and no rebalance that turns into a migration.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/28e67671-tidb-block1-scale-red-black.png",
                "alt": "tidb block1 scale red black",
                "width": 1120,
                "height": 840
              },
              "alt": "tidb block1 scale red black",
              "width": 1120,
              "height": 840
            }
          },
          {
            "title": "Consistency You Don't Trade Away",
            "description": "Strict ACID transactions and real joins across the cluster, not eventual consistency reconstructed in application code.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/f77c02e6-tidb-block2-consistency-blue-black.png",
                "alt": "tidb block2 consistency blue black",
                "width": 1120,
                "height": 840
              },
              "alt": "tidb block2 consistency blue black",
              "width": 1120,
              "height": 840
            }
          },
          {
            "title": "Maintenance That Stops Being an Event",
            "description": "Automatic failover across availability zones, with schema changes and version upgrades that run online. 99.999% availability, including planned maintenance.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/98077f69-tidb-block3-maintenance-violet-black.png",
                "alt": "tidb block3 maintenance violet black",
                "width": 1120,
                "height": 840
              },
              "alt": "tidb block3 maintenance violet black",
              "width": 1120,
              "height": 840
            }
          },
          {
            "title": "MySQL Compatibility, All the Way Down",
            "description": "Full MySQL protocol and syntax, so your apps, drivers, ORMs, and your team's existing knowledge come with you.",
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/595f49a7-tidb-block4-mysql-teal-black.png",
                "alt": "tidb block4 mysql teal black",
                "width": 1120,
                "height": 840
              },
              "alt": "tidb block4 mysql teal black",
              "width": 1120,
              "height": 840
            }
          }
        ],
        "startPosition": "left",
        "spacing": "md"
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "not-always-answer",
      "type": "featureCard",
      "props": {
        "eyebrow": "Honest Trade-Offs",
        "title": "Where Consolidation Isn't the Answer",
        "subtitle": "A dedicated vector database or search engine will usually beat a converged engine at its one task. We'd rather tell you that here than have you discover it in a POC.",
        "items": [
          {
            "icon": "Scale",
            "title": "Single Workload, Single Service",
            "description": "If you own a single service and a single workload, a niche tool may genuinely be the better choice. Consolidation pays off when you own several."
          },
          {
            "icon": "Target",
            "title": "When Specialist Tools Win",
            "description": "What tips the decision is scale. Every specialized store you add is another pipeline and another consistency boundary, and past a certain point the cost of stitching them together outweighs the per-component edge."
          }
        ],
        "columns": 2,
        "borderStyle": "gray"
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "agents-wall",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "The New Ceiling",
        "title": "Agents Hit All Three Walls at Once",
        "subtitle": "Application load used to be capped by a human population, and you could see the next ceiling coming. Agents remove the cap. They don't sleep, they spawn more agents, and they create users, writes, and objects at machine speed.",
        "items": [
          {
            "variant": "teal",
            "title": "Machine-Speed Load",
            "description": "The next bottleneck might be write throughput, tenant density, connections, or metadata, and you can no longer plan for which one it will be.",
            "cta": {
              "text": "Read the Agentic AI Guide",
              "href": "https://www.pingcap.com/blog/agentic-ai-architecture/"
            },
            "icon": "Bot"
          },
          {
            "variant": "blue",
            "title": "Inconsistency Compounds",
            "description": "An agent reading stale context doesn't slow down or ask for clarification. It acts, and chains the next several decisions off that action.",
            "cta": {
              "text": "See How to Architect for Agents",
              "href": "https://www.pingcap.com/webinars/architecting-databases-for-agentic-ai-lessons-from-massive-scale-saas/"
            },
            "icon": "Brain"
          }
        ],
        "columns": 2
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "faq",
      "type": "faq",
      "props": {
        "title": "Frequently Asked Questions",
        "items": [
          {
            "q": "What is Database Consolidation?",
            "a": "Database consolidation means moving transactional, analytical, search, and vector workloads off separate specialized systems and onto a single distributed SQL engine, so there are no pipelines to keep in sync between them."
          },
          {
            "q": "Do I Still Need a Separate Vector Database?",
            "a": "Not necessarily, and it depends on what else you are running. A dedicated vector database will beat a converged engine at pure vector search. What changes the calculation is the cost of keeping a separate store in step with your operational data: another pipeline, another failure domain, and a window where the two disagree."
          },
          {
            "q": "Can We Migrate Without Downtime?",
            "a": "For MySQL-compatible workloads, usually yes, with replication-based cutover rather than a maintenance window. The work that takes time is verifying application behaviour against a distributed engine, particularly around transaction scope and anything that assumed a single primary."
          },
          {
            "q": "When is Consolidation the Wrong Choice?",
            "a": "If you run one service with one workload and no multi-tenancy, a single-node database is simpler and you should keep it. Consolidation pays off when you own several workloads, not one."
          }
        ]
      },
      "style": {
        "spacing": "lg"
      }
    },
    {
      "id": "final-cta",
      "type": "cta",
      "props": {
        "title": "Bring Us Your Architecture",
        "subtitle": "Spend thirty minutes with an engineer who has done this migration. We'll map your workloads, tell you which of the three walls you're closest to, and be straight with you about whether consolidating is worth it in your case.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Book a 30-Minute Architecture Review",
          "href": "https://www.pingcap.com/contact-us/"
        },
        "secondaryCta": {
          "text": "Read How Dify Did It",
          "href": "https://www.pingcap.com/case-study/dify-consolidates-massive-database-containers-into-one-unified-system-with-tidb/"
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
