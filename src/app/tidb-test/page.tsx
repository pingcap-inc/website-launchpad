import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Cloud Startup Program | $100K Credits",
  description: "Launch your startup with $100,000 in TiDB Cloud credits. Get serverless scalability, enterprise support, and zero upfront costs. Apply now.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-cloud/startup-program/' },
  openGraph: {
    title: "TiDB Cloud Startup Program | $100K Credits",
    description: "Launch your startup with $100,000 in TiDB Cloud credits. Get serverless scalability, enterprise support, and zero upfront costs. Apply now.",
    url: 'https://www.pingcap.com/tidb-cloud/startup-program/',
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
  path: "/tidb-cloud/startup-program/",
  title: "TiDB Cloud Startup Program | $100K Credits",
  description: "Launch your startup with $100,000 in TiDB Cloud credits. Get serverless scalability, enterprise support, and zero upfront costs. Apply now.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Launch Fast. Scale without Limits. Get <span class=\"text-gradient-violet\">$100,000</span> in TiDB Cloud Credits.", path: "/tidb-cloud/startup-program/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Cloud Startup Program | $100K Credits",
  "meta": {
    "title": "TiDB Cloud Startup Program | $100K Credits",
    "description": "Launch your startup with $100,000 in TiDB Cloud credits. Get serverless scalability, enterprise support, and zero upfront costs. Apply now.",
    "canonical": "/tidb-cloud/startup-program/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "split",
        "headline": "Launch Fast. Scale without Limits. Get <span class=\"text-gradient-violet\">$100,000</span> in TiDB Cloud Credits.",
        "subheadline": "Apply now and start building with the distributed SQL database that grows with you—from MVP to millions of users.",
        "heroImage": {
          "image": {
            "url": "https://static.pingcap.com/images/f54533cc-1000011158.svg"
          },
          "alt": "hero image",
          "width": 500,
          "height": 400
        },
        "heroForm": {
          "formId": "8d439c40-4e6b-4192-a99b-a2c619ad4146",
          "portalId": "4466002",
          "region": "na1"
        }
      },
      "style": {
        "background": "gradient-dark-top",
        "spacing": "hero"
      }
    },
    {
      "id": "benefits",
      "type": "featureGrid",
      "props": {
        "eyebrow": "STARTUP PROGRAM BENEFITS",
        "title": "Everything You Need to Scale",
        "subtitle": "Get the infrastructure and support to grow without worrying about database limitations or costs.",
        "items": [
          {
            "icon": "DollarSign",
            "title": "$100K Credits",
            "description": "Up to $100,000 in TiDB Cloud credits to power your application through critical growth phases."
          },
          {
            "icon": "Cloud",
            "title": "Serverless Scalability",
            "description": "Auto-scale from hundreds to millions of users without manual intervention or downtime."
          },
          {
            "icon": "Zap",
            "title": "Zero Upfront Cost",
            "description": "Launch immediately without capital expenditure on infrastructure or database licensing."
          },
          {
            "icon": "Shield",
            "title": "Enterprise Support",
            "description": "Access dedicated support, technical guidance, and best practices from TiDB experts."
          }
        ],
        "columns": 4
      },
      "style": {
        "background": "none",
        "spacing": "lg"
      }
    },
    {
      "id": "highlights",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "WHY TIDB CLOUD",
        "title": "Built for Startup Success",
        "subtitle": "Focus on your product. Let TiDB handle the database.",
        "items": [
          {
            "variant": "violet",
            "title": "Distributed SQL",
            "description": "Horizontal scalability with ACID compliance—no sharding complexity.",
            "cta": {
              "text": "Learn More",
              "href": "/tidb/architecture/"
            },
            "icon": "Database"
          },
          {
            "variant": "blue",
            "title": "Global Distribution",
            "description": "Deploy across regions with automatic geo-replication for low latency everywhere.",
            "cta": {
              "text": "Explore Regions",
              "href": "/tidb-cloud/regions/"
            },
            "icon": "Globe"
          },
          {
            "variant": "teal",
            "title": "Millisecond Latency",
            "description": "Optimized performance for real-time analytics and high-frequency transactions.",
            "cta": {
              "text": "See Benchmarks",
              "href": "/tidb/performance/"
            },
            "icon": "Gauge"
          }
        ],
        "columns": 3
      },
      "style": {
        "background": "none",
        "spacing": "lg"
      }
    },
    {
      "id": "testimonials",
      "type": "testimonials",
      "props": {
        "title": "Trusted by Innovative Startups",
        "items": [
          {
            "quote": "TiDB allowed us to scale our user base 10x without touching our database code. The credits made it possible to launch globally from day one.",
            "author": "Sarah Chen, Co-founder & CTO",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          },
          {
            "quote": "Enterprise-grade reliability at startup pricing. The TiDB team's support was invaluable during our Series A scale-up.",
            "author": "Marcus Rodriguez, CEO",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          },
          {
            "quote": "We migrated from three different databases to TiDB. Saved us 40% on infrastructure costs while improving performance.",
            "author": "Emily Wong, VP Engineering",
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
            "q": "Who is eligible for the TiDB Cloud Startup Program?",
            "a": "Early-stage startups (seed through Series B) with innovative ideas are eligible. Companies must have raised less than $25M in total funding. Nonprofits and academic institutions may also qualify. Apply to get a personalized evaluation."
          },
          {
            "q": "How long is the $100K credit valid?",
            "a": "Credits are valid for 24 months from the program start date. This gives you two full years to build, test, and scale your application. Any unused credits expire after 24 months."
          },
          {
            "q": "Can I use the credits with any TiDB Cloud plan?",
            "a": "Yes, credits work with all TiDB Cloud offerings including Dedicated Tier and Serverless Tier. You can mix and match deployments to fit your architecture needs."
          },
          {
            "q": "What happens when my credits run out?",
            "a": "You have two options: continue on pay-as-you-go pricing with no lock-in, or discuss long-term arrangements with our sales team. Many successful startups become valued customers with custom terms."
          },
          {
            "q": "Is technical support included?",
            "a": "Yes, all program participants receive priority technical support, architectural guidance, and access to our startup success team at no additional cost."
          },
          {
            "q": "Can I apply if I'm currently using another database?",
            "a": "Absolutely. Many program participants migrate from PostgreSQL, MySQL, or other solutions. Our team provides migration support and best practices to ensure a smooth transition."
          }
        ]
      },
      "style": {
        "background": "none",
        "spacing": "lg"
      }
    },
    {
      "id": "stats",
      "type": "stats",
      "props": {
        "title": "The Program in Numbers",
        "subtitle": "Join hundreds of startups building the future on TiDB Cloud.",
        "items": [
          {
            "icon": "Users",
            "value": "500+",
            "label": "Startups",
            "description": "Active participants in the program"
          },
          {
            "value": "$50M+",
            "label": "Total Credits",
            "description": "Distributed to startups globally"
          },
          {
            "value": "99.99%",
            "label": "Uptime SLA",
            "description": "Enterprise-grade reliability"
          },
          {
            "value": "15+",
            "label": "Regions",
            "description": "Global deployment options"
          }
        ],
        "columns": 4
      },
      "style": {
        "background": "none",
        "spacing": "lg"
      }
    },
    {
      "id": "cta-final",
      "type": "cta",
      "props": {
        "title": "Ready to Launch Your Startup?",
        "subtitle": "Join hundreds of innovative companies building on TiDB Cloud. Apply now for $100,000 in credits.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Apply for the Program",
          "href": "/tidbcloud/trial/"
        },
        "secondaryCta": {
          "text": "Schedule a Demo",
          "href": "/contact/"
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
