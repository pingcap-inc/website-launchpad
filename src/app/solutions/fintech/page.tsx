import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'Scalable Databases for Fintech Apps | TiDB by PingCAP',
  description:
    'Discover TiDB’s cloud-native, distributed SQL database for fintech apps—real-time, reliable, and infinitely scalable for payments, fraud detection, and more.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/solutions/fintech/' },
  openGraph: {
    title: 'Scalable Databases for Fintech Apps | TiDB by PingCAP',
    description:
      'Discover TiDB’s cloud-native, distributed SQL database for fintech apps—real-time, reliable, and infinitely scalable for payments, fraud detection, and more.',
    url: 'https://www.pingcap.com/solutions/fintech/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/10/17080100/Fintech-social-scaled.jpeg',
        width: 2560,
        height: 1280,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/10/17080100/Fintech-social-scaled.jpeg'],
  },
}

const schema = buildPageSchema({
  path: '/solutions/fintech/',
  title: 'Scalable Databases for Fintech Apps | TiDB by PingCAP',
  description:
    'Discover TiDB’s cloud-native, distributed SQL database for fintech apps—real-time, reliable, and infinitely scalable for payments, fraud detection, and more.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Fintech', path: '/solutions/fintech/' },
  ],
})

const dsl: PageDSL = {
  pageName: 'Scalable Databases for Fintech Apps | TiDB',
  meta: {
    title: 'Scalable Databases for Fintech Apps | TiDB by PingCAP',
    description:
      'Discover TiDB’s cloud-native, distributed SQL database for fintech apps—real-time, reliable, and infinitely scalable for payments, fraud detection, and more.',
    canonical: '/solutions/fintech/',
    breadcrumbName: 'Fintech',
    ogImage: {
      url: 'https://static.pingcap.com/files/2024/10/17080100/Fintech-social-scaled.jpeg',
      width: 2560,
      height: 1280,
    },
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'Fintech',
        headline:
          'Reliable Data Platform to Drive <span class="text-gradient-violet">Fintech Innovation</span>',
        subheadline:
          'Accelerate innovation and lead the future of fintech with TiDB’s cloud-native, distributed SQL database built for resilience, real-time insight, and seamless scalability.',
        primaryCta: {
          text: 'Get Datasheet',
          href: 'https://static.pingcap.com/files/2025/12/01193453/TiDB_Fintech_One-Pager_new.pdf',
        },
        secondaryCta: {
          text: 'Book a Demo',
          href: '#demo',
        },
        heroImage: {
          image: {
            url: 'https://static.pingcap.com/images/f54533cc-1000011158.svg',
          },
          alt: 'hero image',
          width: 500,
          height: 400,
        },
      },
      style: {
        spacing: 'hero',
        backgroundImage: {
          image: {
            url: 'https://static.pingcap.com/files/2024/10/01193329/Header-image-Fintech.svg',
            alt: 'Fintech payment and currency illustration',
            width: 1440,
            height: 664,
          },
        },
      },
    },
    {
      id: 'workloads',
      type: 'featureGrid',
      props: {
        eyebrow: 'Relevant Workloads',
        title: 'Built for Fintech’s Critical Workloads',
        subtitle:
          'TiDB supports the most demanding fintech applications with unparalleled efficiency and scalability. From payments and trading to fraud detection and digital assets, TiDB delivers fast transactions, global scale, and strong security and consistency.',
        items: [
          {
            icon: {
              url: 'https://static.pingcap.com/files/2024/10/17001522/Payments.svg',
              alt: 'Payments',
              width: 151,
              height: 151,
            },
            title: 'Powering Modern Payment Processing Systems',
            description:
              'Deliver instant, reliable transactions on a globally scalable foundation. TiDB’s distributed SQL architecture ensures high availability, low latency, and ACID consistency even during traffic surges or cross-border settlements.',
            cta: {
              text: 'Download White Paper',
              href: 'https://static.pingcap.com/files/2024/10/23001020/Revolutionizing_payments_with_TiDB.pdf',
            },
            layout: 'vertical',
          },
          {
            icon: {
              url: 'https://static.pingcap.com/files/2024/10/17001605/Trade-exchanges.svg',
              alt: 'Trade exchanges',
              width: 151,
              height: 151,
            },
            title: 'Distributed SQL for Trading and Transaction Platforms',
            description:
              'Maintain precision and performance when markets move fast. TiDB scales linearly and supports complex, high-volume operations with guaranteed consistency and millisecond response, powering both live trading and post-trade reporting.',
            cta: {
              text: 'Download White Paper',
              href: 'https://static.pingcap.com/files/2024/10/17004140/Scaling_cryptocurrency_exchanges_with_TiDB_whitepaper.pdf',
            },
            layout: 'vertical',
          },
          {
            icon: {
              url: 'https://static.pingcap.com/files/2024/10/17001707/Web3-infrastructure.svg',
              alt: 'Web3 infrastructure',
              width: 151,
              height: 151,
            },
            title: 'Cloud-Native Database for Web3 and Digital Assets',
            description:
              'Support the next wave of financial innovation with a resilient, cloud-native data layer. TiDB keeps Web3 wallets, exchanges, and blockchain-backed transactions fast, auditable, and always on, with the security and compliance standards modern fintech demands.',
            cta: {
              text: 'Download White Paper',
              href: 'https://static.pingcap.com/files/2024/10/17004258/Web3_data_infrastructure_whitepaper.pdf',
            },
            layout: 'vertical',
          },
          {
            icon: {
              url: 'https://static.pingcap.com/files/2024/10/17001731/Fraud-detection.svg',
              alt: 'Fraud detection',
              width: 151,
              height: 151,
            },
            title: 'Real-Time Fraud Detection and Analytics',
            description:
              'Stay ahead of fraud with real-time insight and instant action. TiDB enables continuous monitoring across user profiles, transactions, and behavioral patterns by combining analytics and consistency to detect anomalies early, reduce false positives, and keep every interaction secure and compliant.',
            cta: {
              text: 'Download White Paper',
              href: 'https://static.pingcap.com/files/2024/10/23001123/Implementing-Real-Timefraud_detection_with_TiDB.pdf',
            },
            layout: 'vertical',
          },
        ],
        columns: 2,
        iconSize: 48,
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'adoption-steps',
      type: 'featureCard',
      props: {
        title: 'How TiDB Simplifies Fintech Adoption',
        items: [
          {
            icon: {
              url: 'https://static.pingcap.com/files/2025/11/17180917/step-1.svg',
              alt: 'Connect Data Sources icon',
              width: 40,
              height: 40,
            },
            label: 'Step 1',
            title: 'Connect Data Sources',
            description: 'Connect payment gateways, ledgers, or event streams.',
            borderColor: 'violet',
          },
          {
            icon: {
              url: 'https://static.pingcap.com/files/2025/11/17180918/step-2.svg',
              alt: 'Deploy TiDB Cloud icon',
              width: 40,
              height: 40,
            },
            label: 'Step 2',
            title: 'Deploy TiDB Cloud',
            description: 'Launch a fully managed, scalable cluster in minutes.',
            borderColor: 'violet',
          },
          {
            icon: {
              url: 'https://static.pingcap.com/files/2025/11/17180920/step-3.svg',
              alt: 'Migrate or Stream Data icon',
              width: 40,
              height: 40,
            },
            label: 'Step 3',
            title: 'Migrate or Stream Data',
            description: 'Move workloads without downtime or disruption.',
            borderColor: 'violet',
          },
          {
            icon: {
              url: 'https://static.pingcap.com/files/2025/11/17180921/step-4.svg',
              alt: 'Analyze in Real Time icon',
              width: 40,
              height: 40,
            },
            label: 'Step 4',
            title: 'Analyze in Real Time',
            description: 'Run analytics and risk detection on live data.',
            borderColor: 'violet',
          },
          {
            icon: {
              url: 'https://static.pingcap.com/files/2025/11/17180922/step-5.svg',
              alt: 'Scale and Govern Securely icon',
              width: 40,
              height: 40,
            },
            label: 'Step 5',
            title: 'Scale and Govern Securely',
            description: 'Expand seamlessly while meeting security and compliance standards.',
            borderColor: 'violet',
          },
        ],
        columns: 3,
        borderStyle: 'color',
      },
      style: {
        background: 'gradient-dark-top',
        spacing: 'section',
      },
    },
    {
      id: 'key-capabilities',
      type: 'featureMedia',
      props: {
        eyebrow: 'Key Capabilities',
        title: 'Why Fintech Leaders Choose TiDB',
        items: [
          {
            title: 'Horizontal Scalability and High Availability Architecture',
            description:
              'Scale effortlessly as your transaction volume increases while keeping operations uninterrupted. TiDB’s distributed SQL architecture delivers both elastic scalability and enterprise-grade reliability, with up to 99.99% availability proven in production across mission-critical financial systems.',
            image: {
              image: {
                url: 'https://static.pingcap.com/files/2024/10/17001926/Unparalleled-Scalability-Illus.svg',
              },
              alt: 'Horizontal scalability illustration',
              width: 600,
              height: 480,
            },
          },
          {
            title: 'Real-Time Data Processing and Analytics',
            description:
              'Access live transactional data for instant insights into risk, performance, and customer behavior. TiDB’s hybrid transactional and analytical processing (HTAP) engine eliminates ETL delays, giving your teams accurate insight in milliseconds.',
            image: {
              image: {
                url: 'https://static.pingcap.com/files/2024/10/17002019/Reliable-Operations-Illustration.svg',
              },
              alt: 'Real-time insights illustration',
              width: 600,
              height: 480,
            },
          },
          {
            title: 'Always-On Reliability for Financial Data Infrastructure',
            description:
              'Keep every service running and every transaction consistent, even during maintenance or upgrades. With automatic failover and strong consistency, TiDB helps fintech teams maintain trust, compliance, and business continuity at global scale.',
            image: {
              image: {
                url: 'https://static.pingcap.com/files/2024/10/17002114/Robust-Security-Illustration-1.svg',
              },
              alt: 'High availability and reliability illustration',
              width: 600,
              height: 480,
            },
          },
        ],
        startPosition: 'right',
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'customer-stories',
      type: 'caseStudyCards',
      props: {
        eyebrow: 'Customer Stories',
        title: 'Proven Results with Fintech Innovators',
        items: [
          {
            badge: '',
            logo: {
              image: {
                url: 'https://static.pingcap.com/files/2024/10/17003046/PLAID-logo.png',
              },
              alt: 'Plaid',
              width: 351,
              height: 132,
            },
            title: 'Multi-Tenant MySQL',
            description: '99.99% uptime and increased developer velocity.',
            stats: [
              {
                value: '99.99%',
                label: 'Uptime',
              },
            ],
            href: 'https://www.pingcap.com/blog/accelerating-distributed-sql-adoption-plaid-amazon-aurora-migration/',
            cta: 'Read More',
          },
          {
            badge: '',
            logo: {
              image: {
                url: 'https://static.pingcap.com/files/2024/10/17002515/elestyle.png',
              },
              alt: 'ELESTYLE',
              width: 641,
              height: 146,
            },
            title: 'Cloud Scalability',
            description: 'Enhanced data handling and instant analytics for multi-payment services.',
            stats: [
              {
                value: 'Instant',
                label: 'Analytics for multi-payment services',
              },
            ],
            href: 'https://www.pingcap.com/case-study/elestyle-tidb-cloud-for-scalability-and-real-time-reporting/',
            cta: 'Read More',
          },
          {
            badge: '',
            logo: {
              image: {
                url: 'https://static.pingcap.com/files/2024/12/03004537/SBPS-logo-white.png',
              },
              alt: 'SB Payment Service',
              width: 733,
              height: 100,
            },
            title: 'Zero-Downtime Scaling',
            description:
              'Ensuring seamless performance and reliability for the growing payment systems.',
            stats: [
              {
                value: 'Zero',
                label: 'Downtime while scaling',
              },
            ],
            href: 'https://www.pingcap.com/case-study/sb-payment-service-adopts-distributed-sql-for-zero-downtime-scaling/',
            cta: 'Read More',
          },
          {
            badge: '',
            logo: {
              image: {
                url: 'https://static.pingcap.com/files/2024/10/24191914/Top-10-global-bank.png',
              },
              alt: 'Top 10 global bank',
              width: 2855,
              height: 312,
            },
            title: 'Anti-Money Laundering',
            description: 'Managing billions of transactions and millions of live queries.',
            stats: [
              {
                value: 'Billions',
                label: 'Of transactions managed',
              },
            ],
            href: 'https://www.pingcap.com/case-study/htap-databases-in-anti-money-laundering-scenarios/',
            cta: 'Read More',
          },
          {
            badge: '',
            logo: {
              image: {
                url: 'https://static.pingcap.com/files/2024/10/07234638/chainbase.svg',
              },
              alt: 'Chainbase',
              width: 268,
              height: 32,
            },
            title: 'Web3 Data Infrastructure',
            description:
              'Slashed Web3 infra costs by 50% with efficient, scalable database solutions.',
            stats: [
              {
                value: '50%',
                label: 'Lower Web3 infrastructure costs',
              },
            ],
            href: 'https://www.pingcap.com/case-study/chainbase-reduced-web3-infra-costs-50-with-tidb/',
            cta: 'Read More',
          },
        ],
      },
      style: {
        background: 'gradient-dark-bottom',
        spacing: 'section',
      },
    },
    {
      id: 'resources',
      type: 'featureHighlights',
      props: {
        title: 'Resources to Fuel Your TiDB Journey',
        items: [
          {
            variant: 'red',
            title: 'Modernizing MySQL',
            description: 'Dynamic scaling on reads and writes while providing strong consistency.',
            cta: {
              text: 'Read',
              href: 'https://www.pingcap.com/blog/why-distributed-sql-databases-elevate-modern-app-dev/',
            },
            icon: 'Database',
          },
          {
            variant: 'violet',
            title: 'Hands-On Labs',
            description: 'Dive in and master TiDB’s unique capabilities through hands-on practice.',
            cta: {
              text: 'Explore',
              href: 'https://labs.tidb.io/?utm_source=website_en&utm_medium=direct',
            },
            icon: 'Terminal',
          },
          {
            variant: 'blue',
            title: 'Blogs',
            description:
              'Stay updated with the latest insights, tips, and industry trends from experts in database technologies.',
            cta: {
              text: 'Learn',
              href: 'https://www.pingcap.com/blog/',
            },
            icon: 'Lightbulb',
          },
          {
            variant: 'teal',
            title: 'Community',
            description:
              'Become part of the TiDB community and connect with other like-minded users and developers.',
            cta: {
              text: 'Join',
              href: 'https://discord.com/invite/vYU9h56kAX',
            },
            icon: 'Users',
          },
        ],
        columns: 4,
      },
      style: {
        background: 'primary',
        spacing: 'section',
      },
    },
    {
      id: 'cta-final',
      type: 'cta',
      props: {
        title: 'Get Up & Running with Your First TiDB Cluster in Minutes',
        image: {
          image: {
            url: 'https://static.pingcap.com/files/2024/10/07235318/cta-1-1.svg',
          },
          alt: '',
          width: 278,
          height: 256,
        },
        primaryCta: {
          text: 'Start for Free',
          href: 'https://tidbcloud.com/free-trial/',
        },
        secondaryCta: {
          text: 'View Interactive Demos',
          href: 'https://www.pingcap.com/demo/',
        },
      },
      style: {
        background: 'brand-violet',
        spacing: 'section',
      },
    },
    {
      id: 'demo',
      type: 'form',
      props: {
        title: 'See TiDB in Action',
        subtitle:
          'Book a 30-minute meeting. Please enter your information in the form and we’ll contact you shortly.',
        portalId: '4466002',
        formId: '066e9d00-f659-43b2-8fa5-71fb88dfab59',
      },
      style: {
        background: 'primary',
        spacing: 'section',
        anchorId: 'demo',
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
