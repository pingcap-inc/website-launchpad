import { Header, Footer, JsonLd } from '@/components'
import { SolutionTemplate, faqForSchema } from '../_components/SolutionTemplate'
import type { SolutionPageData } from '../_components/types'
import { solutionMetadata, solutionSchema } from '../_components/meta'

// ─── Page content (all copy lives here) ──────────────────────────────────────

const PATH = '/solutions/e-commerce/'
const TITLE = 'Scalable eCommerce Database | TiDB Distributed SQL'
const DESCRIPTION =
  'Power your eCommerce platform with TiDB—scalable, real-time, and highly available. Handle transactions and analytics effortlessly in one unified database.'

const PAGE: SolutionPageData = {
  hero: {
    headline: 'Scalable eCommerce Database for Modern Retail Agility',
    subheadline:
      'Unlock the full potential of your eCommerce platform with TiDB. Deliver seamless and personalized shopping experiences with a powerful yet flexible database solution.',
    primaryCta: { text: 'Book a Demo', href: '#demo' },
    secondaryCta: {
      text: 'Read the Shopee Story',
      href: 'https://www.pingcap.com/case-study/choosing-right-database-for-your-applications/',
    },
    backgroundImage: 'https://static.pingcap.com/files/2024/10/03045044/Header-image-eCommerce.svg',
  },

  logos: {
    title: 'The Trusted Data Serving Layer for 1000s of Customers Globally',
    logos: [
      { name: 'Rakuten', src: 'https://static.pingcap.com/files/2024/10/24192541/Rakuten.svg' },
      { name: 'Delhivery', src: 'https://static.pingcap.com/files/2024/10/03045359/Delhivery.svg' },
      { name: 'anteraja', src: 'https://static.pingcap.com/files/2024/10/03045503/anteraja.svg' },
      {
        name: 'ninjavan-logo',
        src: 'https://static.pingcap.com/files/2024/10/03045538/ninjavan-logo.png',
      },
      { name: 'ZTO', src: 'https://static.pingcap.com/files/2024/10/03045601/ZTO.svg' },
      {
        name: 'Pinterest',
        src: 'https://static.pingcap.com/files/2024/10/24192712/P-Pinterest-Lockup-Red-RGB.svg',
      },
      {
        name: 'Flipkart',
        src: 'https://static.pingcap.com/files/2024/10/17071419/Flipkart-1-1.png',
      },
      { name: 'zhihu', src: 'https://static.pingcap.com/files/2024/10/17083220/zhihu3.png' },
    ],
  },

  // Card titles are derived from the source paragraph and need review; bodies are the live sentences.
  problem: {
    title: 'Why Modern E-commerce Needs a Distributed, Scalable Database',
    cards: [
      {
        icon: { lucide: 'ShoppingCart' },
        title: 'Unpredictable Demand',
        body: 'Traditional monolithic databases struggle to keep up with unpredictable demand, growing catalogs, dynamic pricing, and rapid fulfillment needs.',
      },
      {
        icon: { lucide: 'Gauge' },
        title: 'Flash Sales and Seasonal Surges',
        body: 'As eCommerce grows more global and promotion-driven, teams need a database that scales without downtime and maintains consistent performance even during flash sales or seasonal surges.',
      },
      {
        icon: { lucide: 'Activity' },
        title: 'Trade-Offs Between Speed and Insight',
        body: 'TiDB eliminates the trade-offs between operational speed and analytical insight.',
      },
    ],
  },

  solution: {
    title: 'Unified HTAP Database for Transactions and Analytics',
    paragraphs: [
      'TiDB’s distributed SQL architecture delivers the elasticity, reliability, and real-time processing required to power modern retail platforms at scale.',
    ],
    cards: [
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/10/03050021/analytics.svg',
          alt: 'analytics',
        },
        title: 'Run Analytics Without Impacting Transactions',
        body: 'Get instant visibility into orders, inventory, user behavior, or campaign performance without replicas, ETL pipelines, or delays.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/10/03050041/combine.svg',
          alt: 'combine',
        },
        title: 'Combine OLTP + OLAP for Instant Insights',
        body: 'Query fresh data directly from your eCommerce platform to drive recommendations, merchandising decisions, and smarter automation.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/10/17015541/High-Availability-Illustration.svg',
          alt: 'High Availability Illustration',
        },
        title: 'Built-In High Availability and Fault Tolerance',
        body: 'TiDB ensures data consistency and high availability across all nodes, providing accurate and reliable data for critical eCommerce operations, reducing downtime, and safeguarding revenue.',
      },
    ],
  },

  workloads: {
    eyebrow: 'Relevant workloads',
    title: 'Real-Time Performance for Always-On Online Transactions',
    paragraphs: [
      'Revolutionize your eCommerce platform with a hybrid architecture that ensures optimal performance and scalability.',
    ],
    cards: [
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/10/17014502/Loyalty-program.svg',
          alt: 'Loyalty program',
        },
        tag: 'Loyalty Programs',
        title: 'Engage Customers with Real-Time Reward Management',
        body: 'Drive customer engagement with real-time reward and point updates. Provide instant rewards and personalized offers while maintaining a seamless user experience.',
        links: [
          {
            text: 'Download White Paper',
            href: 'https://static.pingcap.com/files/2024/10/17014619/Maximizing_rewards_programs_with_TiDB.pdf',
          },
        ],
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/10/17014718/Shipping.svg',
          alt: 'Shipping',
        },
        tag: 'Shipping',
        title: 'Optimize Logistics and Inventory Management',
        body: 'Real-time data consistency ensures smooth operations from order fulfillment to delivery. Track deliveries, maintain inventory, and manage warehouses with TiDB’s hybrid architecture.',
        links: [
          {
            text: 'Download White Paper',
            href: 'https://static.pingcap.com/files/2024/10/23001315/Optimizing_supply_chain_logistics_with_TiDB.pdf',
          },
        ],
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/10/17014759/Personalization.svg',
          alt: 'Personalization',
        },
        tag: 'Personalization',
        title: 'Offer Tailored Shopping Experiences',
        body: 'Engage customers with personalized offers to drive conversions and improve satisfaction. TiDB’s low-latency analytics power product recommendations, dynamic pricing, and custom content based on real-time engagement. Add vector search to match shoppers to products by meaning, not just keywords, and filter results by live stock, price, and order history in the same SQL query.',
        links: [
          {
            text: 'Download White Paper',
            href: 'https://static.pingcap.com/files/2024/10/23001434/Delivering_personalized_shopping_experiences_with_TiDB.pdf',
          },
          {
            text: 'Explore Semantic Search on TiDB',
            href: 'https://www.pingcap.com/ai/vector-search/',
          },
        ],
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/10/17014821/Real-time-fraud-detection.svg',
          alt: 'Real-time fraud detection',
        },
        tag: 'Real-time Fraud Detection',
        title: 'Prevent Fraudulent Activities',
        body: 'Leverage real-time transaction analysis to safeguard customer data and minimize chargebacks, enhancing trust and security. TiDB’s hybrid architecture helps detect and prevent fraudulent activities instantly.',
        links: [
          {
            text: 'Download White Paper',
            href: 'https://static.pingcap.com/files/2024/10/23001123/Implementing-Real-Timefraud_detection_with_TiDB.pdf',
          },
        ],
      },
    ],
  },

  proof: {
    title: 'Proven Success in E-commerce Innovation',
    paragraphs: [
      'Discover how leading eCommerce companies have harnessed the power of TiDB to enable real-time personalization and insights, optimize inventory and logistics, and handle high-volume traffic.',
    ],
    cases: [
      {
        logo: {
          src: 'https://static.pingcap.com/files/2024/10/24192541/Rakuten.svg',
          alt: 'Rakuten',
        },
        title: 'Enhanced eCommerce',
        description: 'Streamlined operations and reduced latency for improved user experiences.',
        // Source: "Maintained an average response time of 17 ms for the reference API."
        stat: { value: '17 ms', label: 'average response time for the reference API' },
        href: 'https://www.pingcap.com/blog/revolutionizing-loyalty-programs-rakuten-distributed-sql/',
      },
      {
        logo: {
          src: 'https://static.pingcap.com/files/2024/10/17071419/Flipkart-1-1.png',
          alt: 'Flipkart',
        },
        title: 'MySQL Modernization',
        description: 'Enhanced database scalability and resilience for eCommerce operations.',
        // No TiDB outcome figure published by this blog post; stat left out.
        href: 'https://www.pingcap.com/blog/why-flipkart-chose-tidb-to-replace-its-large-mysql-fleet/',
      },
      {
        logo: { src: 'https://static.pingcap.com/files/2024/10/17083220/zhihu3.png', alt: 'zhihu' },
        title: 'Big Data Performance',
        description: 'Significant query acceleration and storage efficiency improvements.',
        // Source: "the latency for ordinary getContentSummary requests dropped from several minutes to less than 10 ms."
        stat: {
          value: 'less than 10 ms',
          label: 'latency for ordinary getContentSummary requests',
        },
        href: 'https://www.pingcap.com/case-study/boosting-big-data-performance-by-combining-tidb-with-hive-and-hdfs/',
      },
    ],
    cta: { text: 'See how leaders scale with TiDB', href: '/customers/' },
  },

  // FAQ answers reuse sentences cut when sections were merged. All entries need content review.
  // Em dashes in moved sentences were replaced with commas (listed in the PR).
  faq: {
    items: [
      {
        q: 'Can I run real-time analytics without slowing down checkout?',
        a: 'With native Hybrid Transactional and Analytical Processing (HTAP), you can run real-time dashboards, cohort analysis, and personalized ranking systems without impacting front-line user experience.',
      },
      {
        q: 'How does TiDB handle peak sales events?',
        a: 'TiDB’s distributed architecture supports effortless horizontal scaling, essential during peak sales events. Scale out on commodity hardware or in the cloud to manage costs and maintain performance seamlessly.',
      },
      {
        q: 'Can TiDB replace several specialized databases?',
        a: 'Replace multiple specialized systems with a single, cloud-native engine that balances scale, cost efficiency, and operational simplicity.',
      },
      {
        q: 'Does TiDB support dynamic pricing and live inventory updates?',
        a: 'TiDB enables real-time analytics directly on transactional data, supporting dynamic pricing, personalization, and immediate inventory updates, key for enhancing the customer experience.',
      },
    ],
  },

  resources: {
    title: 'Resources to Fuel Your TiDB Journey',
    items: [
      {
        type: 'Case Study',
        title: 'Real-time HTAP',
        description: 'Seamless scalability and real-time analytics transformation.',
        href: 'https://www.pingcap.com/blog/delhiverys-data-marts-migration-journey-from-oltp-to-htap/',
        cta: 'Read More',
      },
      {
        type: 'Case Study',
        title: 'Next-gen Data Storage',
        description:
          'Enhanced scalability and operational efficiency for worldwide user engagement.',
        href: 'https://www.pingcap.com/blog/how-data-engineering-powers-pinterest-global-platform/',
        cta: 'Read More',
      },
      {
        type: 'White Paper',
        title: 'Real-Time Reward Management',
        href: 'https://static.pingcap.com/files/2024/10/17014619/Maximizing_rewards_programs_with_TiDB.pdf',
        cta: 'Download White Paper',
      },
      {
        type: 'White Paper',
        title: 'Tailored Shopping Experiences',
        href: 'https://static.pingcap.com/files/2024/10/23001434/Delivering_personalized_shopping_experiences_with_TiDB.pdf',
        cta: 'Download White Paper',
      },
    ],
  },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export const metadata = solutionMetadata(PATH, TITLE, DESCRIPTION)
const schema = solutionSchema(PATH, TITLE, DESCRIPTION, 'eCommerce', faqForSchema(PAGE.faq))

export default function ECommercePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="pt-[62px] lg:pt-20">
        <SolutionTemplate data={PAGE} />
      </main>
      <Footer />
    </>
  )
}
