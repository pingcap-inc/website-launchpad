import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: "TiDB Cloud Instance Capacity Plan | Apply for Higher-Scale Cluster Capacity",
  description: "Apply for the TiDB Cloud Instance Capacity Plan for agent and application platforms running large numbers of Starter instances and branches.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/programs/agentic-ai-instance-capacity/' },
  openGraph: {
    title: "TiDB Cloud Instance Capacity Plan | Apply for Higher-Scale Cluster Capacity",
    description: "Apply for the TiDB Cloud Instance Capacity Plan for agent and application platforms running large numbers of Starter instances and branches.",
    url: 'https://www.pingcap.com/programs/agentic-ai-instance-capacity/',
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
  path: "/programs/agentic-ai-instance-capacity/",
  title: "TiDB Cloud Instance Capacity Plan | Apply for Higher-Scale Cluster Capacity",
  description: "Apply for the TiDB Cloud Instance Capacity Plan for agent and application platforms running large numbers of Starter instances and branches.",
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: "TiDB Cloud Instance Capacity Plan", path: "/programs/agentic-ai-instance-capacity/" },
  ],
})

const dsl: PageDSL = {
  "pageName": "TiDB Cloud Instance Capacity Plan | Apply for Higher-Scale Cluster Capacity",
  "meta": {
    "title": "TiDB Cloud Instance Capacity Plan | Apply for Higher-Scale Cluster Capacity",
    "description": "Apply for the TiDB Cloud Instance Capacity Plan for agent and application platforms running large numbers of Starter instances and branches.",
    "canonical": "/programs/agentic-ai-instance-capacity/"
  },
  "sections": [
    {
      "id": "hero",
      "type": "hero",
      "props": {
        "layout": "centered",
        "headline": "TiDB Cloud Instance Capacity Plan",
        "subheadline": "Scale TiDB Cloud for every user application.\n",
        "primaryCta": {
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
      }
    },
    {
      "id": "form",
      "type": "form",
      "props": {
        "title": "Apply for the Instance Capacity Plan",
        "subtitle": "Tell us what you're building and the scale you expect. Our team will review your application and contact you about eligibility and onboarding.",
        "portalId": "4466002",
        "formId": "YOUR_FORM_ID",
        "region": "na1"
      },
      "style": {
        "anchorId": "#form"
      }
    },
    {
      "id": "who-for",
      "type": "featureGrid",
      "props": {
        "eyebrow": "Who this is for",
        "title": "Built for teams creating databases at platform scale",
        "subtitle": "The Instance Capacity Plan is designed for products that provision and manage large numbers of databases on behalf of their users. It is a strong fit for agent platforms, app builders, and multi-tenant products that need to create and operate many isolated environments at scale.",
        "items": [
          {
            "icon": "Bot",
            "title": "AI Agent Platforms",
            "description": "Generate or deploy user applications with isolated environments."
          },
          {
            "icon": "Building",
            "title": "Multi-tenant SaaS Platforms",
            "description": "Create isolated environments per customer or workspace."
          },
          {
            "icon": "LayoutGrid",
            "title": "Builder Platforms",
            "description": "Rely on high volumes of TiDB Cloud Starter instances and branches."
          }
        ],
        "columns": 3
      }
    },
    {
      "id": "what-supports",
      "type": "featureHighlights",
      "props": {
        "eyebrow": "What the plan supports",
        "title": "Designed for high-scale TiDB Cloud usage",
        "items": [
          {
            "variant": "red",
            "title": "Large Numbers of Active Starter Instances and Branches",
            "description": "The plan supports organizations that need to create and manage large numbers of active Starter instances and branches.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Database"
          },
          {
            "variant": "red",
            "title": "Cluster and Branch Growth Evaluated at Organization Level",
            "description": "Pricing and limits are reviewed with Sales and not publicly self-serve.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Gauge"
          },
          {
            "variant": "red",
            "title": "Sales-Assisted Onboarding for Higher-Capacity Organizations",
            "description": "Our team will review your application and contact you about eligibility and onboarding.",
            "cta": {
              "text": "",
              "href": ""
            },
            "icon": "Shield"
          }
        ]
      }
    },
    {
      "id": "cta",
      "type": "cta",
      "props": {
        "title": "Apply for the Instance Capacity Plan",
        "image": {
          "image": {
            "url": "https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg"
          },
          "alt": "",
          "width": 278,
          "height": 256
        },
        "primaryCta": {
          "text": "Apply",
          "href": "#form"
        }
      },
      "style": {
        "background": "brand-violet",
        "spacing": "md"
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
