import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Cloud Startup Program - $100K Credits",
  description: "Launch your startup with $100,000 in TiDB Cloud credits. Scale without limits, no upfront costs, and get enterprise support from day one.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/tidb-test/' },
  openGraph: {
    title: "TiDB Cloud Startup Program - $100K Credits",
    description: "Launch your startup with $100,000 in TiDB Cloud credits. Scale without limits, no upfront costs, and get enterprise support from day one.",
    url: 'https://www.pingcap.com/tidb-test/',
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
  path: "/tidb-test/",
  title: "TiDB Cloud Startup Program - $100K Credits",
  description: "Launch your startup with $100,000 in TiDB Cloud credits. Scale without limits, no upfront costs, and get enterprise support from day one.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Launch Fast. Scale without Limits. Get <span class=\"text-gradient-violet\">$100,000</span> in TiDB Cloud Credits.", path: "/tidb-test/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Cloud Startup Program - $100K Credits",
  "meta": {
    "title": "TiDB Cloud Startup Program - $100K Credits",
    "description": "Launch your startup with $100,000 in TiDB Cloud credits. Scale without limits, no upfront costs, and get enterprise support from day one.",
    "canonical": "/tidb-test/"
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
      "type": "featureHighlights",
      "props": {
        "eyebrow": "Startup Program Benefits",
        "title": "Everything You Need to Scale",
        "subtitle": "Get the resources and support to build your next billion-dollar company",
        "items": [
          {
            "variant": "violet",
            "title": "$100,000 in Credits",
            "description": "Use TiDB Cloud free for up to 2 years. No credit card required to start.",
            "cta": {
              "text": "View Pricing",
              "href": "/tidbcloud/pricing/"
            },
            "icon": "DollarSign"
          },
          {
            "variant": "blue",
            "title": "Serverless Scalability",
            "description": "Auto-scale from zero to millions of transactions per second without managing infrastructure.",
            "cta": {
              "text": "Learn More",
              "href": "/tidbcloud/serverless/"
            },
            "icon": "Rocket"
          },
          {
            "variant": "teal",
            "title": "Enterprise Support",
            "description": "Get priority support, technical guidance, and mentorship from PingCAP engineers.",
            "cta": {
              "text": "Explore Support",
              "href": "/support/"
            },
            "icon": "Shield"
          },
          {
            "variant": "red",
            "title": "No Upfront Costs",
            "description": "Focus on building your product, not managing databases. Scale as you grow.",
            "cta": {
              "text": "Get Started",
              "href": "/tidbcloud/trial/"
            },
            "icon": "Zap"
          }
        ],
        "columns": 2
      },
      "style": {
        "background": "none",
        "spacing": "section"
      }
    },
    {
      "id": "stats",
      "type": "stats",
      "props": {
        "title": "Trusted by Startups Worldwide",
        "subtitle": "Join the fastest-growing startups building on TiDB",
        "items": [
          {
            "icon": "Users",
            "value": "500+",
            "label": "Active Startups",
            "description": "In the TiDB Cloud Startup Program"
          },
          {
            "icon": "TrendingUp",
            "value": "10x",
            "label": "Average Growth",
            "description": "Typical user base expansion in first year"
          },
          {
            "icon": "Globe",
            "value": "50+",
            "label": "Countries",
            "description": "Where our startup partners operate"
          },
          {
            "icon": "Award",
            "value": "99.99%",
            "label": "SLA",
            "description": "Enterprise-grade availability guarantee"
          }
        ],
        "columns": 4
      },
      "style": {
        "background": "inverse",
        "spacing": "section"
      }
    },
    {
      "id": "features",
      "type": "featureGrid",
      "props": {
        "eyebrow": "Built for Startups",
        "title": "Everything You Need to Succeed",
        "subtitle": "From development to production, TiDB Cloud supports your entire journey",
        "items": [
          {
            "icon": "Database",
            "title": "Horizontal Scalability",
            "description": "Scale out seamlessly as your user base grows. No resharding, no downtime.",
            "cta": {
              "text": "Learn Architecture",
              "href": "/tidb/architecture/"
            }
          },
          {
            "icon": "Lock",
            "title": "Enterprise Security",
            "description": "HIPAA, SOC 2, and ISO 27001 compliant. Built-in encryption and access controls.",
            "cta": {
              "text": "Security Details",
              "href": "/security/"
            }
          },
          {
            "icon": "Cloud",
            "title": "Multi-Cloud Deployment",
            "description": "Deploy on AWS, Google Cloud, or Azure. Choose the regions that fit your needs.",
            "cta": {
              "text": "View Regions",
              "href": "/tidbcloud/regions/"
            }
          },
          {
            "icon": "Code2",
            "title": "Developer-Friendly",
            "description": "MySQL-compatible SQL, comprehensive SDKs, and extensive documentation to accelerate development.",
            "cta": {
              "text": "View Docs",
              "href": "https://docs.pingcap.com/tidbcloud"
            }
          },
          {
            "icon": "BarChart2",
            "title": "Real-Time Analytics",
            "description": "Analyze your data with HTAP capabilities. No ETL pipeline needed.",
            "cta": {
              "text": "Explore HTAP",
              "href": "/tidb/htap/"
            }
          },
          {
            "icon": "Gauge",
            "title": "High Performance",
            "description": "Millisecond latency and consistent throughput at any scale. Built for modern applications.",
            "cta": {
              "text": "Performance Benchmarks",
              "href": "/benchmarks/"
            }
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
      "id": "testimonials",
      "type": "testimonials",
      "props": {
        "title": "Success Stories from Our Startups",
        "items": [
          {
            "quote": "TiDB Cloud allowed us to scale from thousands to millions of users without worrying about database infrastructure. The $100K credits gave us the runway we needed.",
            "author": "Sarah Chen, CTO",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          },
          {
            "quote": "The enterprise support team helped us optimize queries and architect our database for high throughput. Worth far more than the credit value.",
            "author": "Michael Rodriguez, Founder",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          },
          {
            "quote": "No upfront costs, instant scalability, and MySQL compatibility meant we could focus 100% on product development instead of database management.",
            "author": "Emma Thompson, Product Lead",
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
      "id": "faq",
      "type": "faq",
      "props": {
        "title": "Frequently Asked Questions",
        "items": [
          {
            "q": "Who is eligible for the TiDB Cloud Startup Program?",
            "a": "We welcome early-stage startups, pre-seed through Series B, that are building innovative products. Your company should be less than 5 years old and have fewer than 100 employees. We also consider non-profit organizations and academic institutions on a case-by-case basis."
          },
          {
            "q": "How do I use my $100,000 in credits?",
            "a": "Credits can be used for any TiDB Cloud service, including Dedicated Tier, Serverless Tier, and premium support. Credits are valid for up to 2 years from activation and cover compute, storage, and data transfer costs."
          },
          {
            "q": "What happens when my credits run out?",
            "a": "You have full control over your TiDB Cloud resources. You can continue running your cluster at standard pay-as-you-go rates, delete resources, or upgrade to a paid plan. There's no automatic charge—you decide when and how to proceed."
          },
          {
            "q": "Can I get additional support beyond the startup program?",
            "a": "Yes. Startup program members receive priority support as part of the program. You can also upgrade to Professional or Enterprise support plans if you need more comprehensive SLAs or dedicated resources."
          },
          {
            "q": "How long does the application process take?",
            "a": "Most applications are reviewed within 2-3 business days. We'll notify you via email with your approval status and instructions for activating your credits."
          },
          {
            "q": "Can I use TiDB Cloud Startup Program credits with other discounts or promotions?",
            "a": "Startup program credits cannot be combined with other promotional offers. However, you can use them alongside standard volume discounts that apply to all customers."
          },
          {
            "q": "Is there a limit to how much I can use TiDB Cloud during the program?",
            "a": "No limits on usage—scale as fast as you need. Your credits will cover your entire bill up to $100,000. We encourage startups to build and scale aggressively."
          },
          {
            "q": "What if my startup is acquired or pivots?",
            "a": "Contact us immediately. We'll work with you on the best path forward based on your situation. Acquired companies may transition to standard commercial terms."
          }
        ]
      },
      "style": {
        "background": "none",
        "spacing": "section"
      }
    },
    {
      "id": "final-cta",
      "type": "cta",
      "props": {
        "title": "Ready to Launch Your Startup on TiDB?",
        "subtitle": "Apply now and get $100,000 in credits to build the next generation of scalable applications.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Apply for Startup Program",
          "href": "/tidbcloud/trial/"
        },
        "secondaryCta": {
          "text": "Schedule a Demo",
          "href": "/contact/"
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
