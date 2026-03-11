import type { Metadata } from 'next'
import { Bot, TrendingUp, Globe, Truck, ShoppingCart, Wifi } from 'lucide-react'
import {
  Header,
  Footer,
  HeroSection,
  CtaSection,
  SectionHeader,
  PrimaryButton,
  CountUp,
} from '@/components'
import { CreditTabs } from './_components/CreditTabs'

const CLAIM_URL = 'https://ossinsight.io/open-source-heroes/'

export const metadata: Metadata = {
  title: 'Open Source Heroes Claim FREE TiDB Cloud Serverless Credits!',
  description:
    'TiDB Cloud Serverless rewards your contributions with up to $1,000 in FREE credits to build modern, scalable, AI-powered applications. Power your next big idea with a powerful serverless database. Learn more & qualify!',
  keywords: ['opensource', 'database', 'cloud', 'developer', 'tidbserverless'],
  openGraph: {
    title: 'Open Source Heroes — Claim FREE TiDB Cloud Serverless Credits',
    description:
      'Fuel your next big idea with up to $2,000 in TiDB Cloud Serverless credits for open source contributors.',
    url: 'https://www.pingcap.com/open-source-heroes/',
    siteName: 'PingCAP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Source Heroes — Claim FREE TiDB Cloud Serverless Credits',
    description:
      'Claim up to $2,000 in TiDB Cloud Serverless credits based on your open source contributions.',
    creator: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/open-source-heroes/' },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
  {
    title: 'Link your Github',
    description:
      'Sign in with your GitHub account. We calculate your credits based on your public open source contributions.',
  },
  {
    title: 'Claim your Credits',
    description:
      'Connect your TiDB Cloud account and claim up to $2,000 in Serverless credits — instantly applied.',
  },
  {
    title: 'Start Building',
    description:
      'Deploy your first cluster in seconds. Scale from a weekend project to a production system without changing a line.',
  },
]

const capabilities = [
  'Build highly scalable applications with ease',
  'Leverage advanced features like vector search',
  'Enjoy seamless integration with what you use',
  'Pay only for what you use, and only beyond free credits',
]

const reviews = [
  {
    tag: 'Logistics',
    content:
      'In the following years, we will definitely migrate more clusters from MySQL to TiDB, use TiCDC to set up multi-region clusters on AWS for failover, and try TiFlash for instant analytical queries.',
    author: '@Kaustav Chakravorty',
    role: 'Senior Architect, Flipkart',
  },
  {
    tag: 'FinTech',
    content:
      "TiDB's architecture, sort of a SQL layer on top of a key value store, was more scalable and more likely to cause fewer problems down the line. With TiDB, we don't need to worry about cross-charge transactions. That's huge.",
    author: '@Henry Qin',
    role: 'Software Engineer',
  },
  {
    tag: 'Web 3',
    content:
      'The ease and comfort of getting started are paramount for us, and the fully managed operations of TiDB Cloud Serverless allow us to focus more on our core business, ensuring that our development resources are utilized where they matter most.',
    author: '@Sky Dong',
    role: 'Founding Engineer, Chaintool',
  },
  {
    tag: 'AI App',
    content:
      "We heavily utilized TiDB's serverless feature to power our backend. This allowed us to scale our backend to handle thousands of requests per second effortlessly while keeping costs low, as we only pay for what we use.",
    author: '@Eliotte',
    role: 'Hackathon AI Track Winner, Quizmefy',
  },
  {
    tag: 'E-Commerce',
    content:
      "The NO.1 benefit is simplicity. With TiDB, our applications can retain their SQL data model and the ACID guarantees. We don't have to implement any kind of sharding logic, and the database management becomes simpler too.",
    author: '@Kaustav Chakravorty',
    role: 'Senior Architect, Flipkart',
  },
  {
    tag: 'Web 3',
    content:
      "TiDB Cloud Serverless is especially beneficial for experimental or early-stage features. It's cost-effective for startups, scalable, and development-friendly.",
    author: '@Thomas Yu',
    role: 'Founder, KNN3 Networks',
  },
  {
    tag: 'AI App',
    content:
      'With TiDB Cloud Serverless, setting up a database is as easy as clicking a button. It handles analytics seamlessly, without the need for manual scaling.',
    author: '@Godwin',
    role: 'Project Owner of AI-Mon',
  },
  {
    tag: 'Internet',
    content:
      'Scale-in and scale-out in a cluster configuration is also easy, and the ecosystem is very rich, with operation monitoring tools such as Grafana being able to be installed immediately with the installation command (TiUP).',
    author: '@Kentaro Kitagawa',
    role: 'Senior DBA, LINE Corporation',
  },
  {
    tag: 'Web 3',
    content:
      "TiDB Cloud Serverless's automatic scaling capabilities allow us to swiftly scale up to meet performance demands and scale down during quieter periods for optimizing costs.",
    author: '@Yaohui Sun',
    role: 'Data Platform Lead, Chainbase',
  },
]

const faqs = [
  {
    q: 'Why would TiDB commit to the open source community?',
    a: 'TiDB believes that open source fosters innovation, collaboration, and community-driven development. By actively contributing to and supporting open-source projects, TiDB aims to create a vibrant ecosystem that benefits all participants.',
  },
  {
    q: 'How do I claim my credits?',
    a: "Once you've logged in with your GitHub Username and your credits have been calculated, you can redeem them by logging into your OssInsight or TiDB Cloud account. The credits will be automatically applied to your account. Make sure you use the same Github account for both OSSInsight SSO login and TiDB Cloud SSO login.",
  },
  {
    q: 'How can I contact support if I face issues redeeming my credits?',
    a: 'You can reach out to our support team through ossinsight@pingcap.com',
  },
]

const legalSections = [
  {
    title: 'General Terms',
    content:
      "This program is operated by PingCAP. By participating, you agree to these terms and PingCAP's privacy policy. PingCAP reserves the right to modify or terminate this program at any time.",
  },
  {
    title: 'Who Can Participate',
    content:
      'Open source contributors with a public GitHub account. Your organization must have been founded within 36 months and have less than $10M in annual revenue. The program is not available in sanctioned regions.',
  },
  {
    title: 'Rewards',
    content:
      'TiDB Cloud credits are valid for 1 year and cannot be transferred, refunded, or exchanged for cash. The cutoff date to claim the credits is October 1, 2025. PingCAP reserves the right to end the promotion earlier or extend the cutoff date.',
  },
  {
    title: 'Privacy',
    content:
      'We collect your GitHub username and public contribution data to determine eligibility. Your data is handled in accordance with the PingCAP Privacy Policy at https://www.pingcap.com/privacy-policy/.',
  },
  {
    title: 'No Guarantees',
    content:
      "Credits are awarded at PingCAP's sole discretion. Submitting a request does not guarantee receipt of credits.",
  },
  {
    title: 'Limitation of Liability',
    content:
      'To the maximum extent permitted by law, PingCAP is not liable for any indirect, incidental, or consequential damages arising from your participation in this program.',
  },
  {
    title: 'Contact Us',
    content: 'For program inquiries, contact ossinsight@pingcap.com.',
  },
]

// ─── GitHub Stats ─────────────────────────────────────────────────────────────
// Values sourced from github.com/pingcap/tidb — update periodically
const GITHUB_STATS = {
  stars: '37,200',
  prs: '14,000',
  contributors: '873',
}

const heroStats = [
  { label: 'Max Credits', value: '$2,000' },
  { label: 'Claim Time', value: '< 3 min' },
  { label: 'Contributors', value: `${GITHUB_STATS.contributors}+` },
  { label: 'Program Type', value: 'Serverless' },
]

const stepCardStyles = [
  'border-brand-red-dark/60 bg-brand-red-bg/20',
  'border-brand-violet-dark/60 bg-brand-violet-bg/20',
  'border-brand-blue-dark/60 bg-brand-blue-bg/20',
]

const statColors = ['text-brand-red-primary', 'text-brand-blue-medium', 'text-brand-teal-medium']

const statAccentLines = [
  'bg-brand-red-primary',
  'bg-brand-teal-medium',
  'bg-brand-blue-medium',
  'bg-brand-violet-medium',
]

const tagMeta: Record<string, { icon: React.ReactNode; style: string }> = {
  'AI App': {
    icon: <Bot size={13} />,
    style: 'text-brand-red-primary bg-brand-red-bg/60 border-brand-red-primary/30',
  },
  FinTech: {
    icon: <TrendingUp size={13} />,
    style: 'text-brand-blue-medium bg-brand-blue-bg/60 border-brand-blue-medium/30',
  },
  'Web 3': {
    icon: <Globe size={13} />,
    style: 'text-brand-violet-medium bg-brand-violet-bg/60 border-brand-violet-medium/30',
  },
  Logistics: {
    icon: <Truck size={13} />,
    style: 'text-brand-teal-medium bg-brand-teal-bg/60 border-brand-teal-medium/30',
  },
  'E-Commerce': {
    icon: <ShoppingCart size={13} />,
    style: 'text-brand-mango bg-[#E99100]/10 border-brand-mango/30',
  },
  Internet: { icon: <Wifi size={13} />, style: 'text-carbon-400 bg-carbon-800 border-carbon-700' },
}

function CapabilityIllustration() {
  return (
    <div className="bg-bg-primary">
      <svg
        viewBox="0 0 600 380"
        className="w-full h-auto"
        role="img"
        aria-label="Isometric capability illustration"
      >
        <rect width="600" height="380" fill="#000000" />

        {/* thin wireframe cube array */}
        <g stroke="#D9E0E7" strokeWidth="0.9" fill="none" opacity="0.72">
          <path d="M150 74 l42 -24 l42 24 l-42 24 z" />
          <path d="M150 74 l0 48 l42 24 l0 -48 z" />
          <path d="M234 74 l0 48 l-42 24 l0 -48 z" />

          <path d="M210 106 l42 -24 l42 24 l-42 24 z" />
          <path d="M210 106 l0 48 l42 24 l0 -48 z" />
          <path d="M294 106 l0 48 l-42 24 l0 -48 z" />

          <path d="M270 76 l42 -24 l42 24 l-42 24 z" />
          <path d="M270 76 l0 48 l42 24 l0 -48 z" />
          <path d="M354 76 l0 48 l-42 24 l0 -48 z" />

          <path d="M330 108 l42 -24 l42 24 l-42 24 z" />
          <path d="M330 108 l0 48 l42 24 l0 -48 z" />
          <path d="M414 108 l0 48 l-42 24 l0 -48 z" />

          <path d="M188 164 l42 -24 l42 24 l-42 24 z" />
          <path d="M188 164 l0 48 l42 24 l0 -48 z" />
          <path d="M272 164 l0 48 l-42 24 l0 -48 z" />

          <path d="M248 196 l42 -24 l42 24 l-42 24 z" />
          <path d="M248 196 l0 48 l42 24 l0 -48 z" />
          <path d="M332 196 l0 48 l-42 24 l0 -48 z" />

          <path d="M308 164 l42 -24 l42 24 l-42 24 z" />
          <path d="M308 164 l0 48 l42 24 l0 -48 z" />
          <path d="M392 164 l0 48 l-42 24 l0 -48 z" />
        </g>

        {/* single highlighted focal cube */}
        <g transform="translate(315 220)">
          <polygon points="42,0 84,24 42,48 0,24" fill="#FF4A4A" />
          <polygon points="0,24 42,48 42,96 0,72" fill="#990606" />
          <polygon points="84,24 42,48 42,96 84,72" fill="#E20F0F" />
        </g>
      </svg>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OpenSourceHeroesPage() {
  return (
    <>
      <Header />
      <main className="pt-[62px] lg:pt-20 bg-bg-primary text-text-inverse">
        {/* ── 1. Hero ── */}
        <HeroSection
          eyebrow="Open Source Heroes Program"
          headline="Fuel Your Next Big Idea: TiDB Cloud Serverless Credits for Open Source Heroes"
          subheadline="TiDB loves open-source. We contribute code, sponsor projects and deeply appreciate developers who actively contribute to the community. As a token of our appreciation, we're offering up to $2,000 in free TiDB Cloud Serverless credits to fuel open-source heroes' next big idea. Simply log in with your GitHub account to calculate and claim your credits."
          primaryCta={{ text: 'Claim Your Credits Now', href: CLAIM_URL }}
        />

        {/* ── 2. How It Works ── */}
        <section className="py-section-sm lg:py-section bg-gradient-dark-bottom">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <SectionHeader title="How it Works" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <div
                  key={step.title}
                  className={`relative overflow-hidden border p-6 lg:p-8 transition-all duration-200 ease-in-out hover:-translate-y-2 hover:shadow-card ${stepCardStyles[i]}`}
                >
                  <span className="absolute -bottom-6 right-3 font-mono text-[112px] font-bold leading-none select-none pointer-events-none text-text-inverse/[0.04]">
                    0{i + 1}
                  </span>
                  <p className="font-mono text-eyebrow text-carbon-500 mb-6">STEP {i + 1}</p>
                  <h3 className="text-h3-sm font-bold text-text-inverse mb-3">{step.title}</h3>
                  <p className="text-body-md text-carbon-300 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Introduction ── */}
        <section className="py-section-sm lg:py-section bg-bg-primary">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
              <div className="lg:col-span-7">
                {/* Part A — capabilities */}
                <SectionHeader
                  title="With TiDB Cloud Serverless, you can:"
                  align="left"
                  h2Size="sm"
                />
                <p className="text-body-lg text-carbon-300 leading-relaxed mb-8">
                  TiDB Cloud Serverless is a highly scalable, vector search built-in, and
                  cost-effective serverless database, which is dedicated to powering modern
                  applications with simple solutions.
                </p>
                <ul className="space-y-4 mb-10">
                  {capabilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-body-md text-carbon-300 leading-relaxed"
                    >
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full border border-brand-teal-medium/60 bg-brand-teal-bg/40 flex items-center justify-center text-brand-teal-medium text-[11px] font-bold leading-none">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-start">
                  <PrimaryButton href={CLAIM_URL}>Try Free</PrimaryButton>
                </div>
              </div>
              <div className="lg:col-span-5 bg-gradient-dark-top p-4 md:p-6">
                <CapabilityIllustration />
                <p className="mt-4 font-mono text-label text-carbon-500">
                  Built for open-source builders shipping production-grade apps.
                </p>
              </div>
            </div>

            {/* Part B — credit tiers */}
            <SectionHeader
              title="With TiDB Cloud Serverless credits, you can:"
              align="left"
              h2Size="sm"
            />
            <CreditTabs ctaHref={CLAIM_URL} />
          </div>
        </section>

        {/* ── 4. Reviews ── */}
        <section className="py-section-sm lg:py-section bg-gradient-dark-top border-t border-carbon-800">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <SectionHeader eyebrow="Community Stories" title="We Build with TiDB" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review) => (
                <article
                  key={review.author + review.tag}
                  className="border border-carbon-800 bg-bg-primary/80 p-5 flex flex-col transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-carbon-600"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {tagMeta[review.tag] && (
                      <span
                        className={`w-6 h-6 rounded border flex items-center justify-center shrink-0 ${tagMeta[review.tag].style}`}
                      >
                        {tagMeta[review.tag].icon}
                      </span>
                    )}
                    <span className="font-mono text-eyebrow text-carbon-500">{review.tag}</span>
                  </div>
                  <p className="text-[48px] font-bold text-brand-red-primary mb-1 leading-none select-none">
                    &ldquo;
                  </p>
                  <p className="text-body-md text-carbon-300 leading-relaxed mb-6 flex-1 -mt-1">
                    {review.content}&rdquo;
                  </p>
                  <div className="border-t border-carbon-800 pt-4 mt-auto">
                    <p className="text-body-sm text-text-inverse font-medium">{review.author}</p>
                    <p className="text-body-sm text-carbon-500">{review.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Contributions ── */}
        <section className="py-section-sm lg:py-section bg-bg-primary border-t border-carbon-800">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 text-center">
            <p className="font-mono text-eyebrow text-carbon-400 mb-6">TiDB ❤️ Open Source</p>
            <p className="text-body-lg text-carbon-300 leading-relaxed max-w-2xl mx-auto mb-16">
              We take pride in our open-source roots. With the developer community, we align our
              product, to make sure it perfectly fits modern application&rsquo;s developer&rsquo;s
              needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { value: `${GITHUB_STATS.stars}+`, label: 'GitHub Stars' },
                { value: `${GITHUB_STATS.prs}+`, label: 'Pull Requests' },
                { value: GITHUB_STATS.contributors, label: 'Contributors' },
              ].map(({ value, label }, i) => (
                <div
                  key={label}
                  className="border border-carbon-800 bg-gradient-dark-top p-6 md:p-10 relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 right-0 h-0.5 ${statAccentLines[i]}`} />
                  <p className={`text-h2-mb font-bold mb-2 ${statColors[i]}`}>
                    <CountUp value={value} />
                  </p>
                  <p className="text-body-md text-carbon-400">{label}</p>
                </div>
              ))}
            </div>
            <a
              href="https://github.com/pingcap/ossinsight"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-body-md text-text-inverse hover:text-carbon-300 transition-colors"
            >
              Discover TiDB on GitHub
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* ── 6. FAQ ── */}
        <section className="py-section-sm lg:py-section bg-gradient-dark-bottom border-t border-carbon-800">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 max-w-3xl">
            <SectionHeader title="FAQ" align="left" h2Size="sm" />
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group border border-carbon-800 px-4 md:px-6">
                  <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none text-body-lg font-medium text-text-inverse">
                    {faq.q}
                    <span className="shrink-0 font-mono text-carbon-500 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="text-body-md text-carbon-300 leading-relaxed pb-5">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. CTA ── */}
        <CtaSection
          title="Ready to Claim Your Credits?"
          subtitle="Link your GitHub, check your contribution score, and get up to $2,000 in TiDB Cloud Serverless credits — in under 3 minutes."
          primaryCta={{ text: 'Claim Your Credits Now', href: CLAIM_URL }}
          background="teal"
        />

        {/* ── 8. Legal ── */}
        <section className="py-12 bg-bg-primary border-t border-carbon-800">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <details className="group">
              <summary className="cursor-pointer list-none flex items-center gap-2 text-body-sm text-carbon-500 hover:text-carbon-300 transition-colors">
                <span className="font-mono group-open:rotate-90 transition-transform inline-block">
                  ▶
                </span>
                Legal Terms &amp; Conditions
              </summary>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {legalSections.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-body-sm font-medium text-carbon-400 mb-2">
                      {section.title}
                    </h4>
                    <p className="text-body-sm text-carbon-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
