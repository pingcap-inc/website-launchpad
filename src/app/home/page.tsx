import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB: Database for Agentic AI at Scale",
  description: "TiDB adapts in real time to agentic AI demands. One database for every agent, workload, and scale—without overprovisioning or breaking SLAs.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/agentic-ai/' },
  openGraph: {
    title: "TiDB: Database for Agentic AI at Scale",
    description: "TiDB adapts in real time to agentic AI demands. One database for every agent, workload, and scale—without overprovisioning or breaking SLAs.",
    url: 'https://www.pingcap.com/agentic-ai/',
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
  path: "/agentic-ai/",
  title: "TiDB: Database for Agentic AI at Scale",
  description: "TiDB adapts in real time to agentic AI demands. One database for every agent, workload, and scale—without overprovisioning or breaking SLAs.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Where Agents Scale <span class=\"text-gradient-violet\">Without Compromise</span>", path: "/agentic-ai/" },
  ],
})

const dsl: PageDSL = {
  "meta": {
    "title": "TiDB: Database for Agentic AI at Scale",
    "description": "TiDB adapts in real time to agentic AI demands. One database for every agent, workload, and scale—without overprovisioning or breaking SLAs.",
    "canonical": "/agentic-ai/"
  },
  "sections": [
    {
      "id": "hero-agentic-ai",
      "type": "hero",
      "props": {
        "layout": "image-right",
        "eyebrow": "",
        "headline": "Where Agents Scale <span class=\"text-gradient-violet\">Without Compromise</span>",
        "subheadline": "One database for every agent, every workload, every scale. TiDB X adapts in real time to agentic AI demands — without overprovisioning, without breaking SLAs, without stitching together a fragile stack.",
        "primaryCta": {
          "text": "Start Free Trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "View Demo",
          "href": "https://pingcap.com/demo/"
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
            "url": "https://download.pingcap.com/images/hero-agentic-ai-bg.png"
          },
          "opacityClassName": "opacity-10",
          "overlayClassName": "bg-gradient-to-b from-transparent to-slate-950"
        }
      },
      "style": {
        "background": "none",
        "spacing": "hero"
      }
    },
    {
      "id": "stats-agentic",
      "type": "stats",
      "props": {
        "title": "Built for Agentic AI Workloads",
        "subtitle": "The database layer agents depend on",
        "items": [
          {
            "icon": "Zap",
            "value": "100x",
            "label": "Faster Scaling",
            "description": "Auto-scale in milliseconds to handle agent spikes"
          },
          {
            "icon": "Database",
            "value": "99.99%",
            "label": "Uptime SLA",
            "description": "Mission-critical reliability for production agents"
          },
          {
            "icon": "Shield",
            "value": "$0",
            "label": "Overprovisioning",
            "description": "Pay only for what agents actually use"
          },
          {
            "icon": "Globe",
            "value": "1M+",
            "label": "Queries/sec",
            "description": "Handle millions of concurrent agent requests"
          }
        ],
        "columns": 4
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "features-key-benefits",
      "type": "featureGrid",
      "props": {
        "eyebrow": "Why Agents Choose TiDB",
        "title": "Built for Agentic AI at Scale",
        "subtitle": "Every feature designed for the demands of autonomous systems",
        "items": [
          {
            "icon": "Cpu",
            "title": "Dynamic Resource Allocation",
            "description": "TiDB X automatically scales compute and storage based on real-time agent demand. No manual intervention, no wasted capacity.",
            "cta": {
              "text": "Learn More",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            }
          },
          {
            "icon": "RefreshCw",
            "title": "Real-Time Consistency",
            "description": "ACID transactions ensure agents see consistent data even during rapid state changes and concurrent operations.",
            "cta": {
              "text": "Learn More",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            }
          },
          {
            "icon": "Layers",
            "title": "Multi-Workload Engine",
            "description": "Handle OLTP agent requests, analytical tasks, and vector operations in a single database. No ETL pipeline friction.",
            "cta": {
              "text": "Learn More",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            }
          },
          {
            "icon": "Lock",
            "title": "Enterprise Security",
            "description": "Role-based access control, encryption at rest and in transit, and compliance certifications for regulated AI deployments.",
            "cta": {
              "text": "Learn More",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            }
          },
          {
            "icon": "Activity",
            "title": "Observability & Debugging",
            "description": "Built-in monitoring, slow query logs, and execution insights to track agent behavior and optimize performance.",
            "cta": {
              "text": "Learn More",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            }
          },
          {
            "icon": "Cloud",
            "title": "Seamless Cloud Deployment",
            "description": "Deploy on AWS, GCP, or Azure. Multi-region replication, automatic backups, and disaster recovery built-in.",
            "cta": {
              "text": "Learn More",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            }
          }
        ],
        "columns": 3
      },
      "style": {
        "background": "inverse",
        "spacing": "section"
      }
    },
    {
      "id": "product-features",
      "type": "featureTabs",
      "props": {
        "eyebrow": "Product Capabilities",
        "title": "Everything Agents Need, Built-In",
        "subtitle": "One platform. No separate tools. No integration nightmares.",
        "tabs": [
          {
            "id": "scalability",
            "label": "Elastic Scalability",
            "description": "Agents don't follow predictable patterns. TiDB scales horizontally in seconds, handling traffic spikes without degradation.",
            "bullets": [
              "Automatic sharding across nodes",
              "Zero-downtime scaling",
              "Sub-second query latency at scale",
              "Petabyte-scale data capacity"
            ],
            "primaryCta": {
              "text": "Explore Scalability",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            },
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/4d89028b-data.svg"
              },
              "alt": ""
            }
          },
          {
            "id": "consistency",
            "label": "Strong Consistency",
            "description": "Agent coordination requires guaranteed consistency. TiDB ensures every agent sees the same data, every time, with ACID guarantees.",
            "bullets": [
              "Serializable isolation level",
              "Distributed ACID transactions",
              "No stale reads",
              "Automatic conflict resolution"
            ],
            "primaryCta": {
              "text": "Learn About Transactions",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            },
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
            "id": "unified",
            "label": "Unified Analytics",
            "description": "Agents generate massive amounts of operational and analytical data. Analyze everything in real-time without moving data.",
            "bullets": [
              "OLTP and OLAP in one database",
              "Real-time aggregations",
              "Vector search capabilities",
              "Automatic columnar storage"
            ],
            "primaryCta": {
              "text": "Explore Analytics",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            },
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
            "id": "resilience",
            "label": "High Availability",
            "description": "Agents don't tolerate downtime. TiDB provides automatic failover, multi-region redundancy, and recovery that's measured in seconds.",
            "bullets": [
              "99.99% uptime SLA",
              "Automatic node failover",
              "Multi-region replication",
              "Point-in-time recovery"
            ],
            "primaryCta": {
              "text": "View Reliability Info",
              "href": "https://docs.pingcap.com/tidbcloud/tidb-cloud-intro/"
            },
            "image": {
              "image": {
                "url": "https://static.pingcap.com/images/fd14d65a-graphic-1.svg"
              },
              "alt": "tab image",
              "width": 1200,
              "height": 800
            }
          }
        ],
        "autoSwitch": true,
        "autoSwitchInterval": 8000
      },
      "style": {
        "background": "primary",
        "spacing": "section"
      }
    },
    {
      "id": "use-cases",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "Use Cases",
        "title": "Agents Across Every Industry",
        "subtitle": "From autonomous trading to customer service, TiDB powers the next generation of AI systems",
        "items": [
          {
            "variant": "violet",
            "title": "Autonomous Agents",
            "description": "Multi-step reasoning, tool orchestration, and state management in a single consistent database",
            "cta": {
              "text": "View Case Study",
              "href": "https://pingcap.com/case-studies/"
            },
            "icon": "Rocket"
          },
          {
            "variant": "blue",
            "title": "AI-Powered Search",
            "description": "Vector embeddings, semantic search, and hybrid queries with sub-100ms latency at scale",
            "cta": {
              "text": "View Case Study",
              "href": "https://pingcap.com/case-studies/"
            },
            "icon": "Brain"
          },
          {
            "variant": "teal",
            "title": "Real-Time Analytics",
            "description": "Live agent performance dashboards and behavioral analytics without data movement or delay",
            "cta": {
              "text": "View Case Study",
              "href": "https://pingcap.com/case-studies/"
            },
            "icon": "BarChart"
          },
          {
            "variant": "red",
            "title": "Autonomous Commerce",
            "description": "Dynamic pricing, inventory management, and transaction processing for AI-driven retail systems",
            "cta": {
              "text": "View Case Study",
              "href": "https://pingcap.com/case-studies/"
            },
            "icon": "Shield"
          }
        ],
        "columns": 2,
        "viewMore": {
          "text": "Explore All Use Cases",
          "href": "https://pingcap.com/use-cases/"
        }
      },
      "style": {
        "background": "gradient-dark-top",
        "spacing": "section"
      }
    },
    {
      "id": "testimonials-agents",
      "type": "testimonials",
      "props": {
        "title": "Trusted by Leaders Building Agentic AI",
        "items": [
          {
            "quote": "TiDB's elastic scaling is critical for our autonomous trading platform. It handles our unpredictable agent traffic without any manual intervention.",
            "author": "Chief Technology Officer, Global Fintech",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          },
          {
            "quote": "We needed a database that could keep up with our multi-agent AI system. TiDB's consistency guarantees ensure all agents work with the same ground truth.",
            "author": "Engineering Lead, Enterprise Software",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          },
          {
            "quote": "Moving to TiDB cut our infrastructure costs by 60% while improving query performance. The unified OLTP+OLAP model is a game-changer for agent telemetry.",
            "author": "VP Engineering, Cloud Platform",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          }
        ]
      },
      "style": {
        "background": "gradient-dark-top",
        "spacing": "section"
      }
    },
    {
      "id": "cta-final",
      "type": "cta",
      "props": {
        "title": "Ready to Scale Your Agentic AI?",
        "subtitle": "Join companies building the next generation of autonomous systems on TiDB.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Start Your Free Trial",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Schedule a Demo",
          "href": "https://pingcap.com/contact-us/"
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
