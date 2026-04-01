import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Cloud Startup Program | $100K Credits",
  description: "Launch your startup with $100,000 in TiDB Cloud credits. Get serverless scalability, enterprise support, and no upfront costs. Apply now.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/startup-program-test/' },
  openGraph: {
    title: "TiDB Cloud Startup Program | $100K Credits",
    description: "Launch your startup with $100,000 in TiDB Cloud credits. Get serverless scalability, enterprise support, and no upfront costs. Apply now.",
    url: 'https://www.pingcap.com/startup-program-test/',
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
  path: "/startup-program-test/",
  title: "TiDB Cloud Startup Program | $100K Credits",
  description: "Launch your startup with $100,000 in TiDB Cloud credits. Get serverless scalability, enterprise support, and no upfront costs. Apply now.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "Launch Fast. Scale without Limits. Get <span class=\"text-gradient-violet\">$100,000</span> in TiDB Cloud Credits.", path: "/startup-program-test/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Cloud Startup Program | $100K Credits",
  "meta": {
    "title": "TiDB Cloud Startup Program | $100K Credits",
    "description": "Launch your startup with $100,000 in TiDB Cloud credits. Get serverless scalability, enterprise support, and no upfront costs. Apply now.",
    "canonical": "/startup-program-test/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "split",
        "eyebrow": "Startup Program",
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
        "spacing": "hero"
      }
    },
    {
      "id": "benefits",
      "type": "featureCard",
      "props": {
        "eyebrow": "Program Benefits",
        "title": "Everything you need to scale",
        "subtitle": "Get the full stack of resources designed for high-growth startups",
        "items": [
          {
            "icon": "DollarSign",
            "title": "$100,000 in Cloud Credits",
            "description": "Twelve months of free TiDB Cloud usage to build and scale without worrying about costs."
          },
          {
            "icon": "Zap",
            "title": "Serverless Scalability",
            "description": "Auto-scaling architecture that grows with your user base. Pay only for what you use."
          },
          {
            "icon": "Lock",
            "title": "Enterprise Support",
            "description": "Priority technical support and dedicated account management from the TiDB team."
          },
          {
            "icon": "Cloud",
            "title": "No Upfront Cost",
            "description": "Zero setup fees or long-term commitments. Start building immediately with flexible terms."
          },
          {
            "icon": "Globe",
            "title": "Global Infrastructure",
            "description": "Deploy across multiple regions with built-in high availability and disaster recovery."
          },
          {
            "icon": "Shield",
            "title": "Security & Compliance",
            "description": "Enterprise-grade encryption, ACID transactions, and compliance-ready features out of the box."
          }
        ],
        "columns": 3,
        "borderStyle": "color"
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "highlights",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "Why Choose TiDB",
        "title": "Built for startup growth",
        "subtitle": "TiDB powers companies from day one to unicorn status",
        "items": [
          {
            "variant": "violet",
            "title": "HTAP for Real-Time Insights",
            "description": "Combine transactional and analytical queries on the same database. No ETL complexity, just instant insights.",
            "cta": {
              "text": "Learn more",
              "href": "https://docs.pingcap.com/"
            },
            "icon": "Brain"
          },
          {
            "variant": "blue",
            "title": "MySQL Compatible",
            "description": "Drop-in replacement for MySQL. Migrate your existing database in hours, not months.",
            "cta": {
              "text": "Migration guide",
              "href": "https://docs.pingcap.com/"
            },
            "icon": "Database"
          },
          {
            "variant": "teal",
            "title": "Horizontal Scalability",
            "description": "Scale to petabytes of data without resharding. Linear performance as your data grows.",
            "cta": {
              "text": "See benchmarks",
              "href": "https://www.pingcap.com/demo/"
            },
            "icon": "Rocket"
          }
        ],
        "columns": 3
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "testimonials",
      "type": "testimonials",
      "props": {
        "eyebrow": "Startup Success Stories",
        "title": "Trusted by innovative teams",
        "items": [
          {
            "quote": "TiDB's serverless model let us launch our MVP in weeks instead of months. The $100K credits were transformative for our early growth.",
            "author": "Sarah Chen, Founder & CEO",
            "href": "https://www.pingcap.com/contact-us/",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          },
          {
            "quote": "We scaled from 100K to 10M transactions per day without touching our infrastructure. TiDB just handled it.",
            "author": "Marcus Rodriguez, CTO",
            "href": "https://www.pingcap.com/contact-us/",
            "logo": {
              "image": {
                "url": "https://static.pingcap.com/images/712552a8-dify.png"
              },
              "alt": "dify"
            }
          },
          {
            "quote": "The startup program's enterprise support was invaluable. We had technical guidance when we needed it most.",
            "author": "Priya Patel, Engineering Lead",
            "href": "https://www.pingcap.com/contact-us/",
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
        "spacing": "section"
      }
    },
    {
      "id": "requirements",
      "type": "featureGrid",
      "props": {
        "eyebrow": "Program Eligibility",
        "title": "Who can apply?",
        "subtitle": "We support startups at any stage of growth",
        "items": [
          {
            "icon": "Lightbulb",
            "title": "Innovative Companies",
            "description": "Building novel solutions that solve real problems in any industry."
          },
          {
            "icon": "Target",
            "title": "Recent Funding",
            "description": "Seed to Series B stage, or demonstrating strong growth metrics and market traction."
          },
          {
            "icon": "Users",
            "title": "Ambitious Teams",
            "description": "Committed founding teams with clear vision and execution capabilities."
          },
          {
            "icon": "Rocket",
            "title": "Tech-Forward",
            "description": "Open to cloud-native architecture and modern database technologies."
          }
        ],
        "columns": 4,
        "itemLayout": "vertical"
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "faq",
      "type": "faq",
      "props": {
        "title": "Startup Program FAQ",
        "items": [
          {
            "q": "What happens after my 12 months of credits expire?",
            "a": "You'll transition to standard TiDB Cloud pricing with the option for a continued startup discount. Our team will work with you on a sustainable path forward."
          },
          {
            "q": "Can I use the credits across multiple projects?",
            "a": "Yes. You can allocate your $100K credits across multiple TiDB Cloud organizations and projects as needed for development, staging, and production workloads."
          },
          {
            "q": "What if I exceed my credit allocation?",
            "a": "We'll notify you before any overage charges occur. You can adjust your resource allocation, pause clusters, or discuss custom terms with our team."
          },
          {
            "q": "Is there a maximum company valuation or employee count?",
            "a": "No hard limits. We focus on early-stage and growth-stage companies. If you're unsure about eligibility, reach out—we consider each application individually."
          },
          {
            "q": "Do you provide dedicated technical support?",
            "a": "Yes. All startup program members receive priority support, access to our Slack community, and direct contact with a TiDB solutions engineer."
          },
          {
            "q": "How long does the application process take?",
            "a": "Most applications are reviewed within 5-7 business days. We'll follow up with next steps or additional information if needed."
          }
        ]
      },
      "style": {
        "spacing": "section"
      }
    },
    {
      "id": "cta-final",
      "type": "cta",
      "props": {
        "title": "Ready to launch your startup?",
        "subtitle": "Join hundreds of innovative companies scaling with TiDB Cloud. Apply for the Startup Program today.",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Apply Now",
          "href": "https://tidbcloud.com/free-trial/"
        },
        "secondaryCta": {
          "text": "Schedule a Demo",
          "href": "https://www.pingcap.com/demo/"
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
