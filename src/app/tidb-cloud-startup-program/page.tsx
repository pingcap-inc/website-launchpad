import type { Metadata } from 'next'
import Image from 'next/image'
import { HeroSection, CtaSection, Footer, HubSpotForm, Navbar, PrimaryButton, SectionHeader } from '@/components'

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
  },
  {
    quote:
      'Consolidating on TiDB Cloud cut our operational overhead by 90% and infrastructure costs by 100%. It just works.',
    author: 'Yan Zhang / Engineering Team, Dify.AI',
    href: '/customers/stories/',
    cta: 'Read the Story',
  },
  {
    quote:
      'TiDB Cloud powers our real-time marketing engine. We get instant analytics on transactional data without complex pipelines.',
    author: 'Shujun Liu / CTO, Rengage',
    href: '/customers/stories/',
    cta: 'Read the Story',
  },
]

const valueCards = [
  {
    title: 'Unify Your Workloads',
    body: 'One database for transactions, analytics, and vectors. Ship features faster without maintaining multiple different systems.',
    image: 'https://static.pingcap.com/files/2025/09/03234615/data.svg',
    alt: 'Unify Your Workloads',
  },
  {
    title: 'Pay Only For Usage',
    body: 'No more paying for idle servers. Your costs align perfectly with your growth, making your burn rate predictable.',
    image: 'https://static.pingcap.com/files/2025/09/03234542/cost.svg',
    alt: 'Pay Only For Usage',
  },
  {
    title: 'Scale For Modern Apps',
    body: 'Handle sudden traffic spikes or complex AI workloads instantly. Scale from your first user to your millionth without re-architecting.',
    image: 'https://static.pingcap.com/files/2026/01/20234056/Frame-4.svg',
    alt: 'Scale For Modern Apps',
  },
  {
    title: 'Bring Your Stack',
    body: 'Works seamlessly with your current ecosystem, from modern frameworks to legacy drivers. Drop it in with zero friction.',
    image: 'https://static.pingcap.com/files/2026/01/21011757/bring-your-stack-1.svg',
    alt: 'Bring Your Stack',
  },
]

function LinkArrow() {
  return (
    <span aria-hidden="true" className="inline-flex items-center">
      <span className="block h-px bg-current w-3 transition-[width] duration-200 group-hover:w-5" />
      <span className="inline-block w-2 h-2 border-r border-t border-current rotate-45 -ml-2" />
    </span>
  )
}

export default function StartupProgramPage() {
  return (
    <>
      <Navbar />
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

        <section className="max-w-container mx-auto px-4 md:px-8 lg:px-16 py-section-sm lg:py-section">
          <SectionHeader align="left" h2Size="sm" title="Trusted by Builders from MVP to Scale" />
          <div className="grid md:grid-cols-3 gap-4">
            {proofCards.map((card) => (
              <a
                key={card.quote}
                href={card.href}
                className="group border border-carbon-800 p-5 flex flex-col justify-between hover:border-carbon-600 transition-colors"
              >
                <p className="text-body-md text-carbon-300 leading-relaxed mb-5">“{card.quote}”</p>
                <p className="text-body-sm text-carbon-500 mb-4">{card.author}</p>
                <span className="inline-flex items-center gap-2 text-body-md text-text-inverse">
                  {card.cta}
                  <LinkArrow />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="max-w-container mx-auto px-4 md:px-8 lg:px-16 py-section-sm lg:py-section">
          <SectionHeader align="center" h2Size="sm" title="About The Program" />
          <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-carbon-800 p-6 lg:p-8 space-y-6">
            <div>
              <p className="font-mono text-eyebrow text-carbon-400 mb-4">About The Program</p>
              <ul className="space-y-3 text-body-md text-carbon-300 leading-relaxed">
                <li>• Seed to Series B startups building data-intensive products.</li>
                <li>• Founded within 36 months from the application date.</li>
                <li>• Less than $10M in annual revenue.</li>
                <li>
                  • Experiencing or expecting rapid growth and don’t want your database to become a
                  bottleneck.
                </li>
              </ul>
            </div>
            <div>
              <p className="text-body-md text-carbon-300 mb-3 leading-relaxed">
                Investors &amp; Incubators: We offer a dedicated track for your portfolio’s application.
                Please use the form above, and we will contact you shortly.
              </p>
            </div>
            </div>
            <div className="border border-carbon-800 p-6 lg:p-8 space-y-6">
            <div>
              <h3 className="text-h3-sm mb-3">What do you get?</h3>
              <ul className="space-y-3 text-body-md text-carbon-300 leading-relaxed">
                <li>• Financial Support: Up to $100,000 in TiDB Cloud credits.</li>
                <li>
                  • Technical Support: Direct access to professional engineers for onboarding, scaling,
                  and optimization.
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

        <section className="max-w-container mx-auto px-4 md:px-8 lg:px-16 py-section-sm lg:py-section">
          <SectionHeader align="left" h2Size="sm" title="Start Simple. Never Outgrow" />
          <div className="grid md:grid-cols-2 gap-4">
            {valueCards.map((card) => (
              <article key={card.title} className="border border-carbon-800 p-6 lg:p-8">
                <div className="mb-6">
                  <Image src={card.image} alt={card.alt} width={64} height={64} className="w-14 h-14" />
                </div>
                <h3 className="text-h3-sm mb-3">{card.title}</h3>
                <p className="text-body-md text-carbon-300 leading-relaxed">{card.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
