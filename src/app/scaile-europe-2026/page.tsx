import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'TiDB SCaiLE Europe 2026 | Stockholm, June 4',
  description:
    'Join TiDB SCaiLE Europe 2026 in Stockholm for distributed SQL innovation, AI-native architecture talks, and networking with engineering leaders.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/scaile-europe-2026/' },
  openGraph: {
    title: 'TiDB SCaiLE Europe 2026 | Stockholm, June 4',
    description:
      'Join TiDB SCaiLE Europe 2026 in Stockholm for distributed SQL innovation, AI-native architecture talks, and networking with engineering leaders.',
    url: 'https://www.pingcap.com/scaile-europe-2026/',
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
  path: '/scaile-europe-2026/',
  title: 'TiDB SCaiLE Europe 2026 | Stockholm, June 4',
  description:
    'Join TiDB SCaiLE Europe 2026 in Stockholm for distributed SQL innovation, AI-native architecture talks, and networking with engineering leaders.',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    {
      name: 'Scaling Data. <span class="text-gradient-violet">Accelerating AI.</span> Enabling You.',
      path: '/scaile-europe-2026/',
    },
  ],
})

const dsl: PageDSL = {
  pageName: 'TiDB SCaiLE Europe 2026 | Stockholm, June 4',
  meta: {
    title: 'TiDB SCaiLE Europe 2026 | Stockholm, June 4',
    description:
      'Join TiDB SCaiLE Europe 2026 in Stockholm for distributed SQL innovation, AI-native architecture talks, and networking with engineering leaders.',
    canonical: '/scaile-europe-2026/',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'TiDB SCaiLE Europe 2026',
        headline:
          'Scaling Data. <span class="text-gradient-violet">Accelerating AI.</span> Enabling You.',
        subheadline:
          'Thursday, 4 June 2026 | Epicenter Stockholm\nJoin 500+ engineering leaders, architects, and innovators for the premier European event on distributed SQL and AI-native database architecture.',
        primaryCta: {
          text: 'Register Now',
          href: '',
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
      },
    },
    {
      id: 'why-attend',
      type: 'featureHighlights',
      props: {
        eyebrow: 'What to Expect',
        title: 'Experience the Future of Cloud-Native Data Infrastructure',
        subtitle: 'Discover real-world solutions, expert insights, and powerful connections',
        items: [
          {
            variant: 'red',
            title: 'Real-World Success Stories',
            description:
              'Hear from customers and users who have harnessed the power of TiDB to drive business growth and innovation in production environments',
            cta: {
              text: '',
              href: '',
            },
            icon: 'Star',
          },
          {
            variant: 'violet',
            title: 'Expert-Led Deep Dives',
            description:
              "Explore strategies for scaling data infrastructure to meet tomorrow's demands while accelerating AI app builds and time-to-market",
            cta: {
              text: '',
              href: '',
            },
            icon: 'Brain',
          },
          {
            variant: 'blue',
            title: 'Networking Opportunities',
            description:
              'Connect with TiDB users, engineers, and peers to build relationships and learn from their experiences across distributed systems',
            cta: {
              text: '',
              href: '',
            },
            icon: 'Users',
          },
        ],
        columns: 3,
      },
      style: {
        spacing: 'lg',
      },
    },
    {
      id: 'who-should-attend',
      type: 'featureCard',
      props: {
        eyebrow: 'Who Should Attend',
        title: "Engineering Leaders Building Tomorrow's AI-Native Applications",
        subtitle:
          'TiDB SCaiLE Europe brings together the teams and decision-makers driving innovation',
        items: [
          {
            icon: 'Code2',
            title: 'Developers & Engineers',
            description: 'Building applications on distributed or cloud-native databases',
            borderColor: 'violet',
          },
          {
            icon: 'Database',
            title: 'Data & Platform Architects',
            description: 'Designing infrastructure for scale, resilience, and AI-native workloads',
            borderColor: 'blue',
          },
          {
            icon: 'Briefcase',
            title: 'Engineering Leaders',
            description:
              'Evaluating modern data strategies for next-generation database infrastructure',
            borderColor: 'teal',
          },
          {
            icon: 'Target',
            title: 'Technical Decision-Makers',
            description:
              'Exploring alternatives to legacy database infrastructure and consolidating complexity',
            borderColor: 'red',
          },
        ],
        columns: 2,
        borderStyle: 'color',
      },
      style: {
        spacing: 'lg',
      },
    },
    {
      id: 'agenda',
      type: 'agenda',
      props: {
        eyebrow: 'Event Schedule',
        title: 'TiDB SCaiLE Europe 2026 Agenda',
        subtitle: 'Announcing soon',
        items: [],
      },
      style: {
        spacing: 'lg',
      },
    },
    {
      id: 'location',
      type: 'featureCard',
      props: {
        eyebrow: 'Event Location',
        title: 'Epicenter Stockholm',
        subtitle: "A world-class venue in Sweden's tech capital",
        items: [
          {
            icon: 'Zap',
            title: 'Epicenter Stockholm',
            description: 'Malmskillnadsgatan 44a, 111 57 Stockholm, Sweden',
            borderColor: 'blue',
          },
          {
            icon: 'Globe',
            title: 'Getting There',
            description:
              "Centrally located in Stockholm's Norrmalm district with easy access by public transport and parking available",
            borderColor: 'teal',
          },
          {
            icon: 'Clock',
            title: 'Event Date & Time',
            description: 'Thursday, 4 June 2026 | 09:00–17:00 CEST',
            borderColor: 'violet',
          },
        ],
        columns: 2,
        borderStyle: 'color',
      },
      style: {
        spacing: 'lg',
      },
    },
    {
      id: 'why-tidb',
      type: 'featureGrid',
      props: {
        eyebrow: 'Why TiDB Matters',
        title: 'The Distributed SQL Platform Built for Modern Workloads',
        subtitle:
          "At the heart of TiDB SCaiLE is the belief that your data infrastructure shouldn't force you to choose between scale, reliability, and efficiency.",
        items: [
          {
            icon: 'Zap',
            title: 'Elastic Scalability',
            description: 'Grow your database horizontally without downtime or complexity',
            layout: 'vertical',
          },
          {
            icon: 'Shield',
            title: 'Built-In Resilience',
            description:
              'Multi-region replication, ACID transactions, and automatic failover out of the box',
            layout: 'vertical',
          },
          {
            icon: 'Brain',
            title: 'AI-Native Architecture',
            description:
              'HTAP capabilities enable both transactional and analytical queries on the same data',
            layout: 'vertical',
          },
          {
            icon: 'DollarSign',
            title: 'Cost Efficiency',
            description:
              'Reduce operational overhead and eliminate the need for multiple specialized databases',
            layout: 'vertical',
          },
        ],
        columns: 2,
        itemLayout: 'vertical',
      },
      style: {
        spacing: 'lg',
      },
    },
    {
      id: 'form-1774996179341',
      type: 'form',
      props: {
        title: 'Join Us at TiDB SCaiLE Europe 2026',
        subtitle:
          'Reserve your spot today and be part of the conversation shaping the future of cloud-native data infrastructure.',
        portalId: '4466002',
        formId: '33d3cad7-1aa1-4f24-bb31-d2094d906d88',
        region: 'na1',
      },
      style: {
        background: 'primary',
        spacing: 'section',
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
