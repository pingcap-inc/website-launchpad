import type { Metadata } from 'next'
import Image from 'next/image'
import {
  HeroSection,
  CtaSection,
  Footer,
  HubSpotForm,
  Header,
  PrimaryButton,
  SectionHeader,
  TestimonialsSection,
  FeatureGridSection,
} from '@/components'

const HERO_FORM_ID = '8d439c40-4e6b-4192-a99b-a2c619ad4146'

export const metadata: Metadata = {
  title: 'TiDB Cloud Startup Program',
  description:
    'Accelerate your startup with TiDB Cloud. Apply for up to $50,000 in cloud credits and dedicated support.',
  alternates: {
    canonical: 'https://www.pingcap.com/tidb-cloud-startup-program/',
  },
  openGraph: {
    title: 'TiDB Cloud Startup Program',
    description:
      'Empowering startups to scale with confidence. Apply for up to $50,000 in free TiDB Cloud credits and dedicated support.',
    url: 'https://www.pingcap.com/tidb-cloud-startup-program/',
    siteName: 'PingCAP',
    images: [
      {
        url: 'https://static.pingcap.com/files/2025/04/17112450/tidb-cloud-startup-program-promo-right.webp',
        width: 1030,
        height: 1024,
      },
    ],
    type: 'website',
  },
}

const proofCards = [
  {
    quote:
      'We migrated to TiDB Cloud in just two weeks. It let us scale our agentic AI platform seamlessly-without needing to re-architect our system.',
    author: 'Ziming Miao / VP of Engineering, Manus',
    href: 'https://www.youtube.com/watch?v=vW8z71N9shI',
    cta: 'Watch the Video',
    logo: { src: '/images/tidb-cloud-startup-program/manus.png', alt: 'Manus' },
  },
  {
    quote:
      'Consolidating on TiDB Cloud cut our operational overhead by 90% and infrastructure costs by 100%. It just works.',
    author: 'Yan Zhang / Engineering Team, Dify.AI',
    href: '/customers/stories/',
    cta: 'Read the Story',
    logo: { src: '/images/tidb-cloud-startup-program/Dify.png', alt: 'Dify' },
  },
  {
    quote:
      'TiDB Cloud powers our real-time marketing engine. We get instant analytics on transactional data without complex pipelines.',
    author: 'Shujun Liu / CTO, Rengage',
    href: '/customers/stories/',
    cta: 'Read the Story',
    logo: { src: '/images/tidb-cloud-startup-program/Rengage.png', alt: 'Rengage' },
  },
]

const valueCards = [
  {
    title: 'Unify Your Workloads',
    body: 'One database for transactions, analytics, and vectors. Ship features faster without maintaining multiple different systems.',
    image: (
      <Image
        src="https://static.pingcap.com/files/2025/09/03234615/data.svg"
        alt="Unify Your Workloads"
      />
    ),
    alt: 'Unify Your Workloads',
  },
  {
    title: 'Pay Only For Usage',
    body: 'No more paying for idle servers. Your costs align perfectly with your growth, making your burn rate predictable.',
    image: (
      <Image
        src="https://static.pingcap.com/files/2025/09/03234615/cost.svg"
        alt="Pay Only For Usage"
      />
    ),
    alt: 'Pay Only For Usage',
  },
  {
    title: 'Scale For Modern Apps',
    body: 'Handle sudden traffic spikes or complex AI workloads instantly. Scale from your first user to your millionth without re-architecting.',
    image: (
      <Image
        src="https://static.pingcap.com/files/2026/01/20234056/Frame-4.svg"
        alt="Scale For Modern Apps"
      />
    ),
    alt: 'Scale For Modern Apps',
  },
  {
    title: 'Bring Your Stack',
    body: 'Works seamlessly with your current ecosystem, from modern frameworks to legacy drivers. Drop it in with zero friction.',
    image: (
      <Image
        src="https://static.pingcap.com/files/2026/01/21011757/bring-your-stack-1.svg"
        alt="Bring Your Stack"
      />
    ),
    alt: 'Bring Your Stack',
  },
]

export default function StartupProgramPage() {
  return (
    <>
      <Header />
      <main className="pt-[62px] lg:pt-20 bg-bg-primary text-text-inverse">
        <HeroSection
          eyebrow="TiDB Cloud Startup Program"
          headline="Launch Fast. Scale without Limits. Get $100,000 in TiDB Cloud Credits"
          subheadline="Apply now and start building with the distributed SQL database that grows with you - from MVP to millions of users."
          rightSlot={
            <div id="hero-form">
              <HubSpotForm formId={HERO_FORM_ID} />
            </div>
          }
        />

        <TestimonialsSection
          title="Trusted by Builders from MVP to Scale"
          testimonials={proofCards}
        />

        <section className="max-w-container mx-auto px-4 md:px-8 lg:px-16 py-section-sm lg:py-section">
          <SectionHeader align="center" h2Size="sm" title="About The Program" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-carbon-800 p-6 lg:p-8 space-y-6">
              <div>
                <h2 className="text-h3-lg mb-4">Who is this for?</h2>
                <ul className="space-y-3 text-body-md text-carbon-300 leading-relaxed">
                  <li>• Seed to Series B startups building data-intensive products.</li>
                  <li>• Founded within 36 months from the application date.</li>
                  <li>• Less than $10M in annual revenue.</li>
                  <li>
                    • Experiencing or expecting rapid growth and don’t want your database to become
                    a bottleneck.
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-body-md text-carbon-300 mb-3 leading-relaxed">
                  Investors &amp; Incubators: We offer a dedicated track for your portfolio’s
                  application. Please use the form above, and we will contact you shortly.
                </p>
              </div>
            </div>
            <div className="border border-carbon-800 p-6 lg:p-8 space-y-6">
              <div>
                <h3 className="text-h3-sm mb-3">What do you get?</h3>
                <ul className="space-y-3 text-body-md text-carbon-300 leading-relaxed">
                  <li>• Financial Support: Up to $100,000 in TiDB Cloud credits.</li>
                  <li>
                    • Technical Support: Direct access to professional engineers for onboarding,
                    scaling, and optimization.
                  </li>
                  <li>
                    • Growth Support: Co-marketing opportunities through blogs, community showcases,
                    events, and more.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <CtaSection
          title="Quick Apply"
          subtitle="Apply in less than 3 minutes. Our team reviews applications daily and typically responds within 5 business days."
          primaryCta={{ text: 'Apply Now', href: '#hero-form' }}
          background="red"
        />

        <FeatureGridSection
          title="Start Simple. Never Outgrow"
          features={valueCards.map((card) => ({
            title: card.title,
            description: card.body,
            icon: card.image,
          }))}
        />
      </main>
      <Footer />
    </>
  )
}
