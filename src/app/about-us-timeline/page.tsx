import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { JsonLd } from '@/components/ui/JsonLd'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { TimelineSection, type TimelineItem } from '@/components/sections/TimelineSection'
import { AgentInstanceGrid } from '@/components/shortcodes/AgentInstanceGrid'
import { PageRenderer } from '@/lib/page-renderer'
import { buildPageSchema } from '@/lib/schema'
import type { PageDSL } from '@/lib/dsl-schema'

/**
 * REVIEW VERSION of /about-us/ with a timeline layout.
 * noindex and kept out of the sitemap. If approved, this layout replaces
 * /about-us/ and this route is deleted.
 */

const TITLE = 'About Us | How Three Engineers Built TiDB and PingCAP'
const DESCRIPTION =
  'PingCAP started in 2015 when three infrastructure engineers built the database they wished they had, in the open. This is the story of TiDB.'
const SOCIAL_IMAGE = 'https://static.pingcap.com/files/2026/10/08015109/tidb-social-image.png'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.pingcap.com/about-us/' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.pingcap.com/about-us/',
    siteName: 'TiDB',
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', site: '@PingCAP', images: [SOCIAL_IMAGE] },
}

const schema = buildPageSchema({
  path: '/about-us/',
  title: TITLE,
  description: DESCRIPTION,
  pageType: 'AboutPage',
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about-us/' },
  ],
})

const META: PageDSL['meta'] = { title: TITLE, description: DESCRIPTION, canonical: '/about-us/' }

const heroDsl: PageDSL = {
  meta: META,
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
        primaryCta: { text: 'Explore Job Openings', href: 'https://www.pingcap.com/careers/' },
        secondaryCta: { text: 'Try TiDB', href: 'https://tidbcloud.com/free-trial/' },
      },
      style: { spacing: 'hero' },
    },
  ],
}

const closingDsl: PageDSL = {
  // Empty pageName stops PageRenderer adding a fallback H1 for hero-less DSL.
  pageName: '',
  meta: META,
  sections: [
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
      style: { background: 'gray', spacing: 'section' },
    },
    {
      id: 'cta',
      type: 'cta',
      props: {
        title: 'Come Build with Us',
        subtitle:
          "We're engineers and builders who love open source and hard problems. We're headquartered in Sunnyvale, California, and work with customers around the world.",
        primaryCta: { text: 'Explore Job Openings', href: 'https://www.pingcap.com/careers/' },
        secondaryCta: { text: 'Start for Free', href: 'https://tidbcloud.com/free-trial/' },
      },
      style: { background: 'brand-violet', spacing: 'section' },
    },
  ],
}

const CUSTOMER_LOGOS = [
  {
    name: 'Atlassian',
    src: 'https://static.pingcap.com/images/efcf8f2a-atlassian_logo_inverse_rgb_2x.png',
    width: 592,
    height: 96,
  },
  { name: 'Pinterest', src: '/images/logos/pinterest-logo-white.svg', width: 80, height: 30 },
  { name: 'Plaid', src: '/images/logos/plaid-logo-white.svg', width: 80, height: 30 },
  { name: 'Flipkart', src: '/images/logos/flipkart-logo-white.svg', width: 78, height: 21 },
]

const timeline: TimelineItem[] = [
  {
    marker: '2015',
    title: 'It Started with a Frustration',
    body: (
      <>
        <p>
          Three infrastructure engineers were tired of how databases were managed at large internet
          companies. Every time an application grew, managing, scaling, and maintaining the database
          took far more effort than it should have.
        </p>
        <p>
          They couldn&apos;t find a database that grew without that pain, so they started building
          one and named the company PingCAP. Max Liu, one of the three, still leads it as CEO.{' '}
          <a href="https://youtu.be/g0OikEsHPV4">Watch him talk about the architecture</a>.
        </p>
      </>
    ),
    media: (
      <Image
        src="https://static.pingcap.com/files/2024/05/12232917/Max-The-Rise-of-HTAP-New-1.png"
        alt="Max Liu, co-founder and CEO of PingCAP, speaking on stage"
        width={1200}
        height={675}
        className="h-auto w-full rounded-sm"
      />
    ),
  },
  {
    marker: 'From the first commit',
    title: 'Open from Day One',
    body: (
      <p>
        TiDB was open source from the start, and it still is. Hundreds of contributors around the
        world help build it, and TiKV, the storage engine underneath TiDB, became a graduated
        project of the Cloud Native Computing Foundation.
      </p>
    ),
    media: (
      <blockquote className="m-0 border-l-2 border-brand-violet-light pl-6">
        <p className="m-0 text-body-xl leading-snug text-text-inverse">
          &ldquo;Open source is our gene. It&apos;s our DNA. It has been open for us since day one.
          As an engineer, I love open source.&rdquo;
        </p>
        <footer className="mt-4 text-body-sm text-carbon-400">Max Liu, co-founder and CEO</footer>
      </blockquote>
    ),
  },
  {
    marker: 'Along the way',
    title: 'Built Alongside the People Who Run It',
    body: (
      <p>
        The hardest problems we&apos;ve worked on came from customers who wouldn&apos;t accept a
        limit. Atlassian runs Jira and Confluence for tens of millions of people on systems that can
        never go down. Pinterest, Plaid, Flipkart, and many others pushed TiDB further than we would
        have on our own.
      </p>
    ),
    media: (
      <ul className="m-0 grid list-none grid-cols-2 items-center gap-x-10 gap-y-8 p-0 sm:grid-cols-4">
        {CUSTOMER_LOGOS.map((logo) => (
          <li key={logo.name} className="flex items-center">
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={logo.width}
              height={logo.height}
              className="h-6 w-auto opacity-80"
            />
          </li>
        ))}
      </ul>
    ),
  },
  {
    marker: '2025',
    title: 'TiDB X',
    body: (
      <p>
        We introduced TiDB X, a new architecture that puts object storage at the backbone of TiDB.
        Today it powers every new TiDB Cloud cluster by default.
      </p>
    ),
  },
  {
    marker: '2026',
    title: 'A New Kind of User',
    body: (
      <>
        <p>
          Most new databases on TiDB Cloud weren&apos;t started by a person. They were started by AI
          agents building apps for someone.
        </p>
        <p>
          It&apos;s the same problem we started with: the database shouldn&apos;t hold the work
          back. Behind every agent is still a person who needs that work to be there tomorrow.
        </p>
      </>
    ),
    media: <AgentInstanceGrid />,
  },
  {
    marker: 'End of 2026',
    title: "What's Next",
    body: (
      <p>
        We plan to open source the core of TiDB X, so the next version of TiDB is built the same way
        the first one was: in the open.
      </p>
    ),
  },
]

export default function AboutUsTimelinePage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />
      <main className="bg-bg-primary pt-[62px] text-text-inverse lg:pt-20">
        <PageRenderer dsl={heroDsl} />
        <SectionWrapper style={{ spacing: 'section' }}>
          <TimelineSection
            eyebrow="Our Story"
            title="Built in the Open Since 2015"
            items={timeline}
          />
        </SectionWrapper>
        <PageRenderer dsl={closingDsl} />
      </main>
      <Footer />
    </>
  )
}
