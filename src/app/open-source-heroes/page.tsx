import type { Metadata } from 'next'
import { Navbar, Footer, HeroSection, CtaSection, SectionHeader, PrimaryButton } from '@/components'
import { CreditTabs } from './_components/CreditTabs'

const CLAIM_URL = 'https://ossinsight.io/open-source-heroes/'

export const metadata: Metadata = {
  title: 'Open Source Heroes — Claim FREE TiDB Cloud Serverless Credits',
  description:
    'TiDB loves open source. Claim up to $2,000 in TiDB Cloud Serverless credits based on your open source contributions. Link your GitHub and start building.',
  keywords: ['opensource', 'database', 'cloud', 'developer', 'tidb serverless', 'credits'],
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
    description: 'Claim up to $2,000 in TiDB Cloud Serverless credits based on your open source contributions.',
    creator: '@PingCAP',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pingcap.com/open-source-heroes/' },
}

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
  {
    title: 'Link your GitHub',
    description: 'Sign in with your GitHub account. We calculate your credits based on your public open source contributions.',
  },
  {
    title: 'Claim your Credits',
    description: 'Connect your TiDB Cloud account and claim up to $2,000 in Serverless credits — instantly applied.',
  },
  {
    title: 'Start Building',
    description: 'Deploy your first cluster in seconds. Scale from a weekend project to a production system without changing a line.',
  },
]

const capabilities = [
  {
    title: 'Scalable by Default',
    description: 'Start small, grow big. TiDB Cloud Serverless scales automatically — no manual sharding or replication setup required.',
  },
  {
    title: 'Vector Search Built In',
    description: 'Store, index, and search vector embeddings alongside your relational data. Build RAG and AI apps without extra infrastructure.',
  },
  {
    title: 'MySQL Compatible',
    description: 'Drop-in replacement for MySQL. Use your existing drivers, ORMs, and queries — zero migration friction.',
  },
  {
    title: 'Pay Only For Usage',
    description: 'The free tier is genuinely free. Beyond that, pay only for what you consume — no idle charges, no reserved capacity.',
  },
]

const reviews = [
  {
    tag: 'Logistics',
    content:
      'We handle real-time shipment tracking for hundreds of thousands of parcels. TiDB Cloud is more scalable than anything we used before — and the ops overhead dropped to near zero.',
    author: 'Chen Wei',
    role: 'Senior Backend Engineer',
  },
  {
    tag: 'FinTech',
    content:
      'Moving to TiDB Cloud cut our infrastructure costs significantly while giving us the consistency guarantees our compliance team requires. Fully managed is the only way to go.',
    author: 'Priya Sharma',
    role: 'Platform Lead',
  },
  {
    tag: 'Web3',
    content:
      "On-chain data volumes are brutal. TiDB handles our indexing workloads while keeping query latency low. It just works — and that's rare.",
    author: 'Marcus Ortega',
    role: 'Infrastructure Engineer',
  },
  {
    tag: 'AI App',
    content:
      'We built our RAG pipeline on TiDB Cloud. Having vector search and relational queries in one place eliminated an entire layer of our stack.',
    author: 'Yuki Tanaka',
    role: 'ML Engineer',
  },
  {
    tag: 'Internet',
    content:
      'Automatic scaling during traffic spikes saved us multiple times during product launches. Easy to reason about, easy to operate.',
    author: 'Sofia Eriksson',
    role: 'Site Reliability Engineer',
  },
  {
    tag: 'SaaS',
    content:
      "The simplicity of TiDB Cloud let our three-person team move fast. We didn't need a dedicated DBA — the platform handled everything.",
    author: 'James Liu',
    role: 'Co-founder & CTO',
  },
  {
    tag: 'Gaming',
    content:
      'Player data, leaderboards, and game state — all in one database. TiDB Cloud handles our HTAP workload without breaking a sweat.',
    author: 'Anya Kowalski',
    role: 'Game Backend Engineer',
  },
  {
    tag: 'E-commerce',
    content:
      'Black Friday traffic used to terrify us. Now TiDB Cloud scales automatically and costs stay predictable. No more emergency war rooms.',
    author: 'Diego Ramírez',
    role: 'Head of Engineering',
  },
  {
    tag: 'Data Platform',
    content:
      'Consolidating OLTP and OLAP on a single platform removed two pipeline hops and made our data freshness story much simpler.',
    author: 'Lin Fang',
    role: 'Data Platform Engineer',
  },
]

const faqs = [
  {
    q: 'Why does TiDB invest in the open source community?',
    a: 'TiDB is an open-source project at its core. The community of contributors, users, and builders has shaped TiDB into what it is today. This program is our way of giving back — recognizing developers who create value for others and helping them build the next generation of applications.',
  },
  {
    q: 'How do I claim my credits?',
    a: 'Click "Claim Your Credits Now" and sign in with your GitHub account. We automatically calculate your eligible credit amount based on your public open source contributions. Once verified, connect your TiDB Cloud account and the credits are applied instantly.',
  },
  {
    q: 'I ran into a problem claiming my credits. How do I get help?',
    a: 'Reach out to the team directly at ossinsight@pingcap.com and we will get you sorted. Please include your GitHub username and a brief description of the issue.',
  },
]

const legalSections = [
  {
    title: 'General Terms',
    content:
      'This program is operated by PingCAP. By participating, you agree to these terms and PingCAP\'s privacy policy. PingCAP reserves the right to modify or terminate this program at any time.',
  },
  {
    title: 'Who Can Participate',
    content:
      'Open source contributors with a public GitHub account. Your organization must have been founded within 36 months and have less than $10M in annual revenue. The program is not available in sanctioned regions.',
  },
  {
    title: 'Rewards',
    content:
      'Credits are valid for 12 months from the date of issuance, are non-transferable, non-refundable, and cannot be exchanged for cash. Credits apply to TiDB Cloud Serverless usage only. Application deadline: October 1, 2025.',
  },
  {
    title: 'Privacy',
    content:
      'We collect your GitHub username and public contribution data to determine eligibility. Your data is handled in accordance with the PingCAP Privacy Policy at https://www.pingcap.com/privacy-policy/.',
  },
  {
    title: 'No Guarantees',
    content:
      'Credits are awarded at PingCAP\'s sole discretion. Submitting a request does not guarantee receipt of credits.',
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OpenSourceHeroesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[62px] lg:pt-20 bg-bg-primary text-text-inverse">

        {/* ── 1. Hero ── */}
        <HeroSection
          eyebrow="Sponsored by TiDB"
          headline="Fuel Your Next Big Idea: TiDB Cloud Serverless Credits for Open Source Heroes"
          subheadline="TiDB loves open source. Claim up to $2,000 in free TiDB Cloud Serverless credits — calculated automatically from your GitHub contributions."
          primaryCta={{ text: 'Claim Your Credits Now', href: CLAIM_URL }}
        />

        {/* ── 2. How It Works ── */}
        <section className="py-section-sm lg:py-section bg-bg-primary">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <SectionHeader title="How It Works" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <div key={step.title} className="border border-carbon-800 p-6 lg:p-8">
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

            {/* Part A — capabilities */}
            <SectionHeader
              title="With TiDB Cloud Serverless, you can:"
              align="left"
              h2Size="sm"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {capabilities.map((cap) => (
                <div key={cap.title} className="border border-carbon-800 p-6">
                  <h3 className="text-h3-sm font-bold text-text-inverse mb-3">{cap.title}</h3>
                  <p className="text-body-md text-carbon-300 leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mb-20">
              <PrimaryButton href={CLAIM_URL}>Claim Your Credits Now</PrimaryButton>
            </div>

            {/* Part B — credit tiers */}
            <SectionHeader
              title="With TiDB Cloud Serverless credits, you can:"
              align="left"
              h2Size="sm"
            />
            <CreditTabs />
          </div>
        </section>

        {/* ── 4. Reviews ── */}
        <section className="py-section-sm lg:py-section bg-bg-primary border-t border-carbon-800">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16">
            <SectionHeader title="We Build with TiDB" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review) => (
                <article
                  key={review.author}
                  className="border border-carbon-800 p-5 flex flex-col"
                >
                  <span className="font-mono text-eyebrow text-carbon-500 mb-4">{review.tag}</span>
                  <p className="text-body-md text-carbon-300 leading-relaxed mb-6 flex-1">
                    &ldquo;{review.content}&rdquo;
                  </p>
                  <div>
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
            <p className="font-mono text-eyebrow text-carbon-400 mb-16">TiDB ❤️ Open Source</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {[
                { value: `${GITHUB_STATS.stars}+`, label: 'GitHub Stars' },
                { value: `${GITHUB_STATS.prs}+`, label: 'Pull Requests' },
                { value: GITHUB_STATS.contributors, label: 'Contributors' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-mono text-h2-mb font-bold text-text-inverse mb-2">{value}</p>
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
        <section className="py-section-sm lg:py-section bg-bg-primary border-t border-carbon-800">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-16 max-w-3xl">
            <SectionHeader title="FAQ" align="left" h2Size="sm" />
            <div className="divide-y divide-carbon-800">
              {faqs.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none text-body-lg font-medium text-text-inverse">
                    {faq.q}
                    <span className="shrink-0 font-mono text-carbon-500 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-body-md text-carbon-300 leading-relaxed pb-6">{faq.a}</p>
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
                <span className="font-mono group-open:rotate-90 transition-transform inline-block">▶</span>
                Legal Terms &amp; Conditions
              </summary>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {legalSections.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-body-sm font-medium text-carbon-400 mb-2">{section.title}</h4>
                    <p className="text-body-sm text-carbon-600 leading-relaxed">{section.content}</p>
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
