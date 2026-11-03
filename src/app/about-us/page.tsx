import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

export const metadata: Metadata = {
  title: 'About Us | How Three Engineers Built TiDB and PingCAP',
  description:
    'PingCAP started in 2015 when three infrastructure engineers built the database they wished they had, in the open. This is the story of TiDB.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/about-us/' },
  openGraph: {
    title: 'About Us | How Three Engineers Built TiDB and PingCAP',
    description:
      'PingCAP started in 2015 when three infrastructure engineers built the database they wished they had, in the open. This is the story of TiDB.',
    url: 'https://www.pingcap.com/about-us/',
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png'],
  },
}

const schema = buildPageSchema({
  path: '/about-us/',
  title: 'About Us | How Three Engineers Built TiDB and PingCAP',
  description:
    'PingCAP started in 2015 when three infrastructure engineers built the database they wished they had, in the open. This is the story of TiDB.',
  pageType: 'AboutPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us/' },
  ],
})

const dsl: PageDSL = {
  pageName: 'About Us | How Three Engineers Built TiDB and PingCAP',
  meta: {
    title: 'About Us | How Three Engineers Built TiDB and PingCAP',
    description:
      'PingCAP started in 2015 when three infrastructure engineers built the database they wished they had, in the open. This is the story of TiDB.',
    canonical: '/about-us/',
    breadcrumbName: 'About Us',
    createdBy: 'a.hire@pingcap.com',
    createdAt: '2026-11-03T00:00:00.000Z',
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'About Us',
        headline: 'We Built the Database We Wished We Had',
        subheadline:
          "TiDB started in 2015 with three infrastructure engineers and a problem they couldn't stop thinking about. This is the story of what they built, who it's for, and where it's going.",
        primaryCta: {
          text: 'Explore Job Openings',
          href: 'https://www.pingcap.com/careers/',
        },
        secondaryCta: {
          text: 'Try TiDB',
          href: 'https://tidbcloud.com/free-trial/',
        },
      },
      style: {
        spacing: 'hero',
      },
    },
    {
      id: 'how-it-started',
      type: 'columns',
      props: {
        eyebrow: '2015',
        title: 'It Started with a Frustration',
        layout: 'columns',
        itemColumns: 2,
        items: [
          {
            type: 'content',
            content:
              "In 2015, three infrastructure engineers were tired of how databases were managed at large internet companies. Every time an application grew, managing, scaling, and maintaining the database took far more effort than it should have.\n\nThey looked for a database that could grow with the application without that pain. They didn't find one. So they started building it, in the open, and named the company PingCAP.\n\nThat project became TiDB. Max Liu, one of the three, still leads the company as CEO. You can [watch him talk about the architecture behind it](https://youtu.be/g0OikEsHPV4).",
          },
          {
            type: 'media',
            image: {
              image: {
                url: 'https://static.pingcap.com/files/2024/05/12232917/Max-The-Rise-of-HTAP-New-1.png',
                alt: 'Max Liu, co-founder and CEO of PingCAP, speaking on stage',
                width: 1200,
                height: 675,
              },
              alt: 'Max Liu, co-founder and CEO of PingCAP, speaking on stage',
              width: 1200,
              height: 675,
            },
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'open-from-day-one',
      type: 'columns',
      props: {
        eyebrow: 'Open Source',
        title: 'Open from Day One',
        layout: 'columns',
        itemColumns: 2,
        items: [
          {
            type: 'content',
            content:
              "Open source wasn't a decision we made later. TiDB was open from the first commit, and it still is. Hundreds of contributors around the world help build it, and TiKV, the storage engine underneath TiDB, is a graduated project of the Cloud Native Computing Foundation.\n\nWorking in the open keeps us honest. Anyone can read the code, question a design choice, or fix something we missed. By the end of 2026, we plan to open source the core of TiDB X, our newest architecture, so the next version of TiDB is built the same way the first one was.",
          },
          {
            type: 'content',
            content:
              '> "Open source is our gene. It\'s our DNA. It has been open for us since day one. As an engineer, I love open source."\n\nMax Liu, co-founder and CEO',
          },
        ],
      },
      style: {
        background: 'gray',
        spacing: 'section',
      },
    },
    {
      id: 'built-with-customers',
      type: 'columns',
      props: {
        eyebrow: 'Our Customers',
        title: 'Built Alongside the People Who Run It',
        layout: 'columns',
        itemColumns: 2,
        items: [
          {
            type: 'content',
            content:
              "The hardest problems we've worked on came from customers who wouldn't accept a limit. Atlassian runs Jira and Confluence for tens of millions of people on systems that can never go down. Pinterest, Plaid, Flipkart, and many others brought workloads their previous databases struggled to handle.\n\nEach of them pushed TiDB further than we would have on our own. Ten years in, we still build it the same way: alongside the engineers who depend on it.",
          },
          {
            type: 'content',
            content:
              '> "For our customers, this is not ephemeral data. This is their system of record. We do not tolerate any downtime."\n\nVinod Kumar, Atlassian, speaking at TiDB SCaiLE 2026',
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'whats-changing',
      type: 'columns',
      props: {
        eyebrow: 'Today',
        title: 'A New Kind of User, the Same Old Problem',
        layout: 'columns',
        itemColumns: 2,
        items: [
          {
            type: 'content',
            content:
              "This year, something changed. Most new databases on TiDB Cloud weren't started by a person. They were started by AI agents building apps for someone.\n\nIt's a new kind of user with the same old problem: the database shouldn't hold the work back. Behind every agent is still a person who needs that work to be there tomorrow. That's who we build for.",
          },
          {
            type: 'content',
            content: '> "Agents are temporary. Their work isn\'t."',
          },
        ],
      },
      style: {
        background: 'gray',
        spacing: 'section',
      },
    },
    {
      id: 'values',
      type: 'featureGrid',
      props: {
        eyebrow: 'Company Values',
        title: 'How We Work',
        columns: 3,
        items: [
          {
            icon: 'Users',
            title: 'Customer Success',
            description:
              'We listen to customers, learn how they see the problem, and turn their pain points into opportunities.',
          },
          {
            icon: 'Target',
            title: 'Deliver Results with Excellence',
            description: 'We hold a high bar and measure success by what actually ships and works.',
          },
          {
            icon: 'MessageSquare',
            title: 'Be Open',
            description:
              'We communicate transparently, stay curious, and welcome different views and challenges.',
          },
          {
            icon: 'Briefcase',
            title: 'Be an Owner',
            description:
              "We take responsibility for the whole company's outcomes and keep at problems until they are solved.",
          },
          {
            icon: 'Puzzle',
            title: 'Respect and Empower People',
            description:
              "We bring out each other's strengths, collaborate inclusively, and give feedback instead of blame.",
          },
          {
            icon: 'Lightbulb',
            title: 'Think Big, Think Long and Think Different',
            description:
              'We stay ambitious and turn breakthrough ideas into products people rely on.',
          },
        ],
      },
      style: {
        spacing: 'section',
      },
    },
    {
      id: 'cta',
      type: 'cta',
      props: {
        title: 'Come Build with Us',
        subtitle:
          "We're engineers and builders who love open source and hard problems. We're headquartered in Sunnyvale, California, and work with customers around the world.",
        primaryCta: {
          text: 'Explore Job Openings',
          href: 'https://www.pingcap.com/careers/',
        },
        secondaryCta: {
          text: 'Start for Free',
          href: 'https://tidbcloud.com/free-trial/',
        },
      },
      style: {
        background: 'brand-violet',
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
