import { Header, Footer, JsonLd } from '@/components'
import { SolutionTemplate, faqForSchema } from '../_components/SolutionTemplate'
import type { SolutionPageData } from '../_components/types'
import { solutionMetadata, solutionSchema } from '../_components/meta'

// ─── Page content (all copy lives here) ──────────────────────────────────────

const PATH = '/solutions/saas/'
const TITLE = 'Database for SaaS Applications | TiDB'
const DESCRIPTION =
  'Discover TiDB, the database for SaaS applications that scales effortlessly, cuts costs, and powers real-time analytics. Book your demo today.'

/**
 * Replaces the former "Customer 360" card.
 * PENDING: product marketing may add "real-time view" and/or "RAG". Edit here only.
 */
const AI_CONTEXT_CARD_BODY =
  'Build assistants and semantic search around tenant and account data. Store embeddings alongside relational data, then combine similarity search and SQL filters to retrieve relevant application context.'

const PAGE: SolutionPageData = {
  hero: {
    headline: 'The Database for SaaS Applications That Scales With You',
    subheadline:
      'SaaS platform companies grow fast and their databases need to grow faster. TiDB gives you elasticity, reliability, and performance to power multi-tenant SaaS at any scale without downtime, data silos, or escalating costs.',
    primaryCta: { text: 'Book a Demo', href: '#demo' },
    secondaryCta: {
      text: 'Get the SaaS Whitepaper',
      href: 'https://www.pingcap.com/ebook-whitepaper/scaling-saas-platforms-real-world-strategies-high-growth-resilience/',
    },
    backgroundImage: 'https://static.pingcap.com/files/2024/11/01200805/Header-image-SaaS-3.svg',
  },

  logos: {
    // Heading reused from the e-commerce and operational intelligence logo bars.
    title: 'The Trusted Data Serving Layer for 1000s of Customers Globally',
    logos: [
      { name: 'Catalyst', src: 'https://static.pingcap.com/files/2024/11/10225931/Catalyst.svg' },
      { name: 'PLAID', src: 'https://static.pingcap.com/files/2024/10/17003046/PLAID-logo.png' },
      { name: 'conga', src: 'https://static.pingcap.com/files/2024/11/27201923/conga.svg' },
      { name: 'Streak', src: 'https://static.pingcap.com/files/2024/11/26202123/Streak-1.svg' },
      { name: 'Bolt', src: 'https://static.pingcap.com/files/2024/11/26202058/Bolt.svg' },
      { name: 'LINE', src: 'https://static.pingcap.com/files/2024/11/26202011/LINE.png' },
    ],
  },

  problem: {
    title: 'The Hidden Complexity of Multi-Tenant SaaS at Scale',
    paragraphs: [
      'As SaaS platforms grow, the real bottleneck isn’t data volume; it’s managing tenants, isolation, performance, and cost in a shared system. These challenges reveal a simple truth: Legacy architectures weren’t designed for high-density, elastic multi-tenancy.',
    ],
    cards: [
      {
        icon: { lucide: 'Activity' },
        title: 'Noisy Neighbors & Performance Drift',
        body: 'Shared systems create unpredictable latency as tenants compete for resources.',
      },
      {
        icon: { lucide: 'GitBranch' },
        title: 'Sharding Becomes Operational Debt',
        body: 'Manual sharding and routing layers become brittle as schemas evolve and data needs to rebalance.',
      },
      {
        icon: { lucide: 'Layers' },
        title: 'Metadata & Connection Explosion',
        body: 'Database-per-tenant models drive runaway metadata growth, connection storms, and schema fragility at scale.',
      },
    ],
  },

  solution: {
    title: 'Meet TiDB Cloud: Purpose-Built for SaaS Growth',
    cards: [
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/29000348/Scale-with-Ease.svg',
          alt: 'Scale with Ease',
        },
        title: 'Effortless Scaling',
        body: 'Scale compute and storage independently to handle unpredictable multi-tenant spikes—no downtime, no re-sharding. Manage millions of connections with low latency for seamless user experiences.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/29000402/Build-on-Trust.svg',
          alt: 'Build on Trust',
        },
        title: 'Enterprise-Grade Reliability',
        body: 'Achieve zero-downtime maintenance with automated failovers. Centralized metadata management and proactive monitoring enhance service reliability.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/29000418/Enhance-Operational-Flexibility.svg',
          alt: 'Enhance Operational Flexibility',
        },
        title: 'Cost-Effective Multi-Tenancy',
        body: 'Reduce infrastructure costs by up to 50% while ensuring predictable performance with resource isolation. Support millions of schemas without performance degradation.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/29000435/Simplify-Development.svg',
          alt: 'Simplify Development',
        },
        title: 'Real-Time Insights',
        body: 'Run transactional and analytical workloads simultaneously without ETL. Deliver instant dashboards and advanced analytics for actionable customer insights.',
      },
    ],
  },

  workloads: {
    eyebrow: 'Relevant Workloads',
    title: 'Tailored for Critical SaaS Workloads',
    paragraphs: [
      'Efficiently handle diverse and demanding SaaS workloads with capabilities tailored for scalability, multi-tenancy, and rapid updates. These foundational elements ensure customer satisfaction and drive operational agility as you scale.',
    ],
    cards: [
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/29000138/multi-tenant.svg',
          alt: 'multi-tenant',
        },
        title: 'Multi-Tenant Management',
        body: 'Efficient data isolation and management for serving multiple customers from a single platform.',
      },
      {
        // PLACEHOLDER icon: kept from the former Customer 360 card.
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/29000153/Customer-360.svg',
          alt: 'Customer 360',
        },
        title: 'Customer Context for AI Features',
        body: AI_CONTEXT_CARD_BODY,
        links: [
          {
            text: 'Explore AI Application Patterns',
            href: 'https://www.pingcap.com/developers/build-ai-apps/',
          },
        ],
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/29000227/Real-time-Analytics.svg',
          alt: 'Real-time Analytics',
        },
        title: 'Real-time Analytics',
        body: 'Enable a way to gather customers’ business insights from up-to-the-minute data analysis with the power of TiFlash, the analytics engine within TiDB.',
      },
      {
        icon: {
          src: 'https://static.pingcap.com/files/2024/11/29000207/Metadata.svg',
          alt: 'Metadata',
        },
        title: 'Metadata Management',
        body: 'Ensure seamless user experiences and swift system responses through efficient metadata management with TiDB.',
      },
    ],
  },

  proof: {
    title: 'Customer Proof: SaaS Leaders Scaling With TiDB',
    paragraphs: [
      'Join innovative SaaS companies that have modernized their data infrastructure with TiDB.',
    ],
    // The page links video stories, not case-study pages, so these replace case cards (see PR).
    videos: [
      {
        url: 'https://youtu.be/HXJrzE_PeD4',
        thumbnail: 'https://static.pingcap.com/files/2025/02/10195215/Catalyst-customer-story.jpg',
        quote:
          '"TiDB definitely outshines some of the other databases we looked at when it comes to performance and costs."',
        name: 'Sha Ma',
        role: 'Former CTO',
      },
      {
        url: 'https://youtu.be/o6eetnpi-3Q',
        thumbnail: 'https://static.pingcap.com/files/2024/10/10195300/Plaid-customer-story.jpg',
        quote:
          '"With TiDB, we can now perform upgrades with zero downtime and large table schema migrations."',
        name: 'Zander Hill',
        role: 'Experienced Data Reliability Engineer',
      },
      {
        url: 'https://www.youtube.com/watch?v=ohGY7hm9T80',
        thumbnail: 'https://static.pingcap.com/files/2026/01/06202609/Conga-Video-Cover.jpg',
        quote:
          '"TiDB stands out primarily for its ability to handle transactional and analytical workloads with exceptional performance."',
        name: 'Andy Buttaro',
        role: 'Platform Services Architect',
      },
    ],
  },

  // FAQ answers reuse sentences cut when sections were merged. All entries need content review.
  faq: {
    items: [
      {
        q: 'Why do growing SaaS platforms outgrow traditional databases?',
        a: 'Every successful SaaS platform eventually hits the same wall – data growth outpaces the database. Sudden customer surges, query spikes, and feature expansion can quickly overwhelm traditional databases designed for simpler, single-tenant applications.',
      },
      {
        q: 'How does TiDB keep performance predictable across tenants?',
        a: 'Consistent performance and tenant isolation in distributed SQL architecture.',
      },
      {
        q: 'Can I change schemas without downtime?',
        a: 'Online schema changes and distributed DDL without downtime or risk.',
      },
      {
        q: 'What happens to metadata and connections as tenant count grows?',
        a: 'Horizontally scalable metadata and efficient multi-tenant connection handling.',
      },
      {
        q: 'Does TiDB work for a mix of shared and siloed tenants?',
        a: 'Mixing shared and siloed tenants becomes unsustainable as compliance, load, and regional demands grow. Elastic compute and storage separation with global consistency for multi-tenant SaaS workloads.',
      },
    ],
  },

  resources: {
    title: 'SaaS-Specific Resources to Fuel Your TiDB Journey',
    items: [
      {
        type: 'Datasheet',
        title: 'Scaling Multi-Tenant SaaS Platforms',
        href: 'https://static.pingcap.com/files/2026/01/07002405/Scaling-Multi-Tenant-SaaS-Platforms_one-pager.pdf',
        cta: 'Get Datasheet',
      },
      {
        type: 'White Paper',
        title: 'Scaling SaaS Platforms',
        href: 'https://www.pingcap.com/ebook-whitepaper/scaling-saas-platforms-real-world-strategies-high-growth-resilience/',
        cta: 'Get the SaaS Whitepaper',
      },
      {
        type: 'Blog',
        title: 'Modernizing SaaS Platform',
        description: 'Learn how distributed SQL delivers multi-tenancy at scale.',
        href: '/blog/unlocking-modern-saas-platforms-how-distributed-sql-delivers-multi-tenancy-scale/',
        cta: 'Read',
      },
      {
        type: 'Case Study',
        title: 'Catalyst Rearchitects Core SaaS Platform with TiDB',
        href: 'https://www.pingcap.com/case-study/catalyst-rearchitects-core-saas-platform-tidb-60x-faster-performance/',
        cta: 'Read More',
      },
    ],
  },
}

// ─── Page ────────────────────────────────────────────────────────────────────

export const metadata = solutionMetadata(PATH, TITLE, DESCRIPTION)
const schema = solutionSchema(PATH, TITLE, DESCRIPTION, 'SaaS', faqForSchema(PAGE.faq))

export default function SaasPage() {
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
