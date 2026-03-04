import type { Metadata } from 'next'
import {
  Header,
  HeroSection,
  Footer,
  JsonLd,
  SecondaryButton,
  ColorCard,
  SectionHeader,
  FeaturesGrid,
  CtaSection,
} from '@/components'
import { buildPageSchema } from '@/lib/schema'
import {
  HandshakeIcon,
  AwardIcon,
  CodeTIcon,
  BriefcaseIcon,
  CommentsTIcon,
  AppWindowIcon,
} from '@/components/ui/pingcap-icons'

// ─── Constants ────────────────────────────────────────────────────────────────

const OG_IMAGE = 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'
const TITLE = 'About PingCAP – Mission, Values & Company Story | TiDB'
const DESCRIPTION =
  'PingCAP was founded in 2015 to build TiDB, an open-source distributed SQL database. Learn about our mission, values, and the team behind TiDB.'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: 'https://www.pingcap.com/about-us/',
    siteName: 'TiDB',
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/about-us/' },
}

// ─── Schema ───────────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const values = [
  {
    icon: <HandshakeIcon size={32} />,
    title: 'Customer Success',
    description:
      'We exist to help our customers succeed. Every decision is measured by the value it delivers to the engineers and organizations building on TiDB.',
  },
  {
    icon: <AwardIcon size={32} />,
    title: 'Deliver Results with Excellence',
    description:
      'We hold ourselves to high standards — shipping with care, reviewing with rigor, and taking pride in systems that are reliable, performant, and well-crafted.',
  },
  {
    icon: <CodeTIcon size={32} />,
    title: 'Be Open',
    description:
      'Open source is at our core — in our code, our processes, and our communication. Transparency builds trust across our community, customers, and teammates.',
  },
  {
    icon: <BriefcaseIcon size={32} />,
    title: 'Be an Owner',
    description:
      'We take responsibility for outcomes, not just tasks. Ownership means acting with initiative, following through, and holding each other accountable.',
  },
  {
    icon: <CommentsTIcon size={32} />,
    title: 'Respect and Empower People',
    description:
      'We build an inclusive team where every voice counts. We invest in growth and create space for everyone to do their best work.',
  },
  {
    icon: <AppWindowIcon size={32} />,
    title: 'Think Big, Think Long, and Think Different',
    description:
      'Distributed databases are a long game. We plan with ambition, stay curious, and challenge assumptions to find better paths forward.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <div className="pt-[62px] lg:pt-20">
        {/* ── 1. Hero ─────────────────────────────────────────────────────── */}
        <HeroSection
          centered
          autoGenerateBackgroundImage
          headline="Empowering Engineers to Build at Scale"
          subheadline="Our mission is to empower engineers and enable business value with speed, scale, and agility."
          primaryCta={{ text: 'Book a Demo', href: 'https://www.pingcap.com/contact-us/' }}
          secondaryCta={{ text: 'Start for Free', href: 'https://tidbcloud.com/free-trial/' }}
        />

        {/* ── 2. Our History ──────────────────────────────────────────────── */}
        <section className="py-section-sm lg:py-section bg-bg-primary">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div>
                <p className="font-mono text-eyebrow text-carbon-400 mb-6">Our History</p>
                <h2 className="text-h2-mb lg:text-h2-sm font-bold text-text-inverse mb-6 leading-tight">
                  Built by Engineers, for Engineers
                </h2>
                <p className="text-body-lg text-carbon-300 mb-6 leading-relaxed">
                  In 2015, three infrastructure engineers founded PingCAP after repeatedly hitting
                  the ceiling of traditional relational databases — the scalability limits,
                  operational complexity, and inability to handle the data volumes modern
                  applications demand.
                </p>
                <p className="text-body-lg text-carbon-300 mb-6 leading-relaxed">
                  Their answer was <strong className="text-text-inverse font-bold">TiDB</strong>: an
                  open-source, MySQL-compatible distributed SQL database built to scale horizontally
                  without requiring application re-architecture. TiDB brings transactional and
                  analytical processing together in a single system.
                </p>
                <p className="text-body-lg text-carbon-300 mb-8 leading-relaxed">
                  At its foundation runs{' '}
                  <strong className="text-text-inverse font-bold">TiKV</strong>, a cloud-native
                  distributed key-value store. TiKV is a graduated project of the Cloud Native
                  Computing Foundation (CNCF), joining Kubernetes and Prometheus as
                  community-governed infrastructure.
                </p>
                <SecondaryButton href="https://www.pingcap.com/tidb/">Explore TiDB</SecondaryButton>
              </div>

              {/* Visual panel */}
              <div className="order-last lg:order-last">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-red-bg p-6">
                    <p className="font-mono text-eyebrow text-carbon-400 mb-2">Founded</p>
                    <p className="text-h2-mb font-bold text-text-inverse">2015</p>
                  </div>
                  <div className="bg-brand-blue-bg p-6">
                    <p className="font-mono text-eyebrow text-carbon-400 mb-2">CNCF</p>
                    <p className="text-h3-lg font-bold text-text-inverse">Graduated</p>
                    <p className="text-body-sm text-carbon-300 mt-1">TiKV Project</p>
                  </div>
                  <div className="bg-brand-violet-bg p-6 col-span-2">
                    <p className="font-mono text-eyebrow text-carbon-400 mb-2">Database Type</p>
                    <p className="text-h3-lg font-bold text-text-inverse">Distributed SQL</p>
                    <p className="text-body-sm text-carbon-300 mt-2">
                      Open-source · MySQL-compatible · HTAP
                    </p>
                  </div>
                  <div className="bg-brand-teal-bg p-6 col-span-2">
                    <p className="font-mono text-eyebrow text-carbon-400 mb-2">Scale</p>
                    <p className="text-h3-lg font-bold text-text-inverse">Gigabytes → Petabytes</p>
                    <p className="text-body-sm text-carbon-300 mt-2">No re-architecture required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Company Values ───────────────────────────────────────────── */}
        <FeaturesGrid
          label="Our Values"
          title="The Principles That Guide Our Work"
          subtitle="Six principles define how we build products, support customers, and work together as a team."
          features={values}
          columns={3}
          className="bg-gradient-dark-top"
        />

        {/* ── 4. Join Our Team ────────────────────────────────────────────── */}
        <section className="py-section-sm lg:py-section bg-bg-primary">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Visual panel */}
              <div className="relative order-last lg:order-first">
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-brand-teal-bg p-6">
                    <p className="font-mono text-eyebrow text-carbon-400 mb-2">Open Roles</p>
                    <p className="text-h3-lg font-bold text-text-inverse">
                      Engineering · Product · GTM
                    </p>
                  </div>
                  <div className="bg-border-primary h-px w-full" />
                  <div className="grid grid-cols-3 gap-4">
                    {['San Francisco', 'Tokyo', 'Singapore'].map((city) => (
                      <div key={city} className="bg-brand-blue-bg p-4">
                        <p className="text-body-sm font-bold text-text-inverse">{city}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-body-sm text-carbon-300">
                    A globally distributed team across four continents — remote-first and built
                    around output, not office hours.
                  </p>
                </div>
              </div>

              {/* Text */}
              <div>
                <p className="font-mono text-eyebrow text-carbon-400 mb-6">Careers</p>
                <h2 className="text-h2-mb lg:text-h2-sm font-bold text-text-inverse mb-6 leading-tight">
                  Join the Team Behind TiDB
                </h2>
                <p className="text-body-lg text-carbon-300 mb-8 leading-relaxed">
                  We&apos;re a globally distributed team of engineers who believe in the power of
                  open source to solve hard infrastructure problems. If you&apos;re passionate about
                  distributed systems, databases, and software that runs at scale — we want to hear
                  from you.
                </p>
                <SecondaryButton href="https://www.pingcap.com/careers/">
                  Explore Job Openings
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Customers Love TiDB ──────────────────────────────────────── */}
        <section className="py-section-sm lg:py-section bg-gradient-dark-bottom">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <SectionHeader
              label="Social Proof"
              title="Customers Love TiDB"
              subtitle="Recognized by engineers worldwide on the industry's most trusted database review platforms."
              h2Size="md"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorCard
                variant="red"
                title="Gartner Peer Insights"
                description="TiDB is recognized on Gartner Peer Insights for Cloud Database Management Systems — validated by verified enterprise reviews from engineers running production workloads."
                cta={{
                  text: 'Read Reviews',
                  href: 'https://www.gartner.com/reviews/market/cloud-database-management-systems/vendor/pingcap',
                }}
              />
              <ColorCard
                variant="blue"
                title="G2 High Performer"
                description="Rated by the developer community on G2, TiDB earns recognition for scalability, MySQL compatibility, and operational simplicity at petabyte scale."
                cta={{
                  text: 'See on G2',
                  href: 'https://www.g2.com/products/tidb/reviews',
                }}
              />
            </div>
          </div>
        </section>

        {/* ── 6. CTA ──────────────────────────────────────────────────────── */}
        <CtaSection
          title="Transform your database infrastructure with TiDB."
          subtitle="Open-source, MySQL-compatible, and built to scale from gigabytes to petabytes."
          primaryCta={{ text: 'Book a Demo', href: 'https://www.pingcap.com/contact-us/' }}
          secondaryCta={{ text: 'Start for Free', href: 'https://tidbcloud.com/free-trial/' }}
          background="red"
        />
      </div>

      <Footer />
    </>
  )
}
