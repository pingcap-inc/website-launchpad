import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema, faqSchema, softwareApplicationSchema } from '@/lib/schema'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { FaqSection } from '@/components/sections/FaqSection'
import { CtaSection } from '@/components/sections/CtaSection'

// ── Launch gates ─────────────────────────────────────────────────────────────
// Two answers are missing from the pricing source doc. Rather than guess at
// them, each is a constant that gates its own block: nothing renders until the
// answer exists, so no invented commitment can ship by accident. Same pattern
// as KIMI_STORY_URL on the Filesystem landing page.

// What decides whether an operation or a byte is Pooled or Performance — user
// choice, file size, access pattern, or something else. The two differ by 12x
// on storage and 100x on operations, and this is the only unfamiliar term on
// the page. Asked 2026-09-21, unanswered. Until it is set, the rate card still
// lists both rows (they are published prices) but the page does not pretend to
// explain them.
const POOLED_EXPLAINER: string | null = null

// What happens when the monthly credit is exhausted, or a no-card cap is
// reached: stop, throttle, failed writes, or billing begins. Asked 2026-09-21.
const AT_THE_LIMIT: string | null = null

// ── Source of truth ──────────────────────────────────────────────────────────
// "TiDB Cloud Filesystem Pricing Public Preview" v8 (2026-09-19), as it read on
// 2026-09-21 — the free-tier quantities were corrected that day without a
// version bump, so the re-derivation date matters as much as the version. All
// seven free-tier lines were recomputed against this rate card and reconcile to
// $4.99 against the $5.00 credit. Do not edit these numbers without redoing
// that check. The source doc's `Discountable` column is internal and is not
// reproduced anywhere on this page.
const RATES = [
  {
    meter: 'Read operations, per 1,000 requests',
    note: 'Against TiDB Cloud Filesystem endpoints',
    price: '$0.04',
  },
  {
    meter: 'Write operations, per 1,000 requests',
    note: 'Against TiDB Cloud Filesystem endpoints',
    price: '$0.50',
  },
  {
    meter: 'Pooled file read operations, per 1,000 requests',
    note: 'Against object storage',
    price: '$0.0004',
  },
  {
    meter: 'Pooled file write operations, per 1,000 requests',
    note: 'Against object storage',
    price: '$0.005',
  },
  { meter: 'Storage — Performance', note: 'Underlying database storage', price: '$0.30 / GB-mo' },
  { meter: 'Storage — Pooled', note: 'Underlying object storage', price: '$0.025 / GB-mo' },
  { meter: 'Internet egress', note: 'Data transfer out to the internet', price: '$0.09 / GB' },
]

// Illustrative usage, deliberately not expressed as "one agent, N runs a day":
// we have no measured mapping from agents or runs to reads and writes, and
// implying one would invite a reader to trust a number we have not earned.
// Every example shows gross, credit applied, and net.
const EXAMPLES = [
  {
    name: 'A light month',
    lines: [
      ['2,000 writes', '$1.00'],
      ['50,000 reads', '$2.00'],
      ['1 GB stored', '$0.30'],
      ['1 GB egress', '$0.09'],
    ],
    gross: '$3.39',
    credit: '−$3.39',
    net: '$0',
  },
  {
    name: 'A steady month',
    lines: [
      ['30,000 writes', '$15.00'],
      ['300,000 reads', '$12.00'],
      ['5 GB stored', '$1.50'],
      ['2 GB egress', '$0.18'],
    ],
    gross: '$28.68',
    credit: '−$5.00',
    net: '$23.68',
  },
  {
    name: 'A heavy month',
    lines: [
      ['150,000 writes', '$75.00'],
      ['2,000,000 reads', '$80.00'],
      ['25 GB stored', '$7.50'],
      ['10 GB egress', '$0.90'],
    ],
    gross: '$163.40',
    credit: '−$5.00',
    net: '$158.40',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Do I need a credit card to start?',
    a: 'No. Every organization gets $5.00 of service credit each month without one. Organizations without a card on file are limited to one filesystem per region, 2,000 files and 2 GB of storage per filesystem, and 500 MB for any single file.',
  },
  {
    q: 'Is the free credit per filesystem or per organization?',
    a: 'Per organization, and it renews monthly. The $5.00 amount is the same regardless of region or SKU.',
  },
  {
    q: 'Which regions are priced?',
    a: 'Prices on this page are for <code>aws-us-east-1</code>. Other regions are adjusted proportionally and are added gradually.',
  },
  {
    q: 'Will these prices change?',
    a: 'They apply to the public preview and may change at general availability. This page states the version and date the figures were taken from.',
  },
]

// Verified live on docs.pingcap.com 2026-09-21. The Filesystem landing page
// still routes its doc links through a Cloudflare preview build because these
// paths used to 404; that workaround now looks removable, but it is that page's
// call, so this one just uses the canonical host.
const DOCS_QUICKSTART = 'https://docs.pingcap.com/ai/ti-quick-start/'

// The product entity lives on the Filesystem product page. This page describes
// its pricing, so its SoftwareApplication node points back at that URL instead
// of at this one — otherwise the two pages assert two different entities with
// the same name, and an answer engine has to guess which record to cite.
const PRODUCT_URL = 'https://www.pingcap.com/tidb/tidb-cloud-filesystems/'

// Schema.org acceptedAnswer.text is plain text. The visible FAQ renders these
// through the rich-text pipeline, where <code> is wanted; the structured data
// must not carry the markup, or the tag itself gets quoted back by anything
// reading the answer.
function plainText(value: string): string {
  return value.replace(/<[^>]+>/g, '')
}

const PATH = '/tidb-cloud-filesystem-pricing-details/'
const CANONICAL = `https://www.pingcap.com${PATH}`
const TITLE = 'TiDB Cloud Filesystem Pricing Details'
const DESCRIPTION =
  'TiDB Cloud Filesystem pricing for reads, writes, storage and egress, with $5 of service credit per organization each month. View rates and limits.'
const OG_IMAGE = 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: 'TiDB',
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: [OG_IMAGE],
  },
}

const schema = buildPageSchema({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  aboutId: `${PRODUCT_URL}#software`,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'TiDB Cloud Filesystem', path: '/tidb/tidb-cloud-filesystems/' },
    { name: 'Pricing Details', path: PATH },
  ],
  extraSchemas: [
    {
      ...softwareApplicationSchema({
        name: 'TiDB Cloud Filesystem',
        description: DESCRIPTION,
        url: PRODUCT_URL,
        // Explicitly null. The helper otherwise defaults the Offer price to '0',
        // which would assert in structured data that the product is free. It is
        // pay-as-you-go with a free credit, which is not the same claim.
        price: null,
      }),
      '@id': `${PRODUCT_URL}#software`,
    },
    faqSchema(FAQ_ITEMS.map((item) => ({ question: item.q, answer: plainText(item.a) }))),
  ],
})

export default function FilesystemPricingDetailsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main className="bg-bg-primary pt-[62px] lg:pt-20">
        {/* 00 Hero, notice, and direct navigation.
            The sub-nav is not decoration. Putting the rate card third is only
            defensible if a reader reaches it in one click. */}
        <SectionWrapper style={{ background: 'primary', spacing: 'md' }}>
          <div className="mb-4">
            <Badge variant="secondary">Public Preview</Badge>
          </div>
          {/* The product name belongs at headline scale, not shrunk to an eyebrow
              above it. The three sibling pricing pages are titled
              "TiDB Cloud <Product> Pricing Details" outright, and a reader
              arriving from one of them should see the same shape. */}
          <h1 className="mb-6 max-w-[900px] text-pretty text-h1-mb font-bold leading-tight tracking-[-0.025em] md:text-h1">
            TiDB Cloud Filesystem Pricing Details
          </h1>
          <p className="mb-6 max-w-[620px] text-pretty text-body-2xl text-carbon-400">
            Pay as you go for reads, writes, storage and egress, with a monthly free credit. No
            tiered plans.
          </p>
          <p className="mb-6 max-w-[620px] text-body-md text-carbon-400">
            Prices shown are for <code className="font-mono">aws-us-east-1</code>. Additional
            regions will be added over time.
          </p>
          <a
            href="#rates"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-carbon-800 px-4 py-2 text-body-sm text-carbon-200 transition-colors hover:border-carbon-400 hover:text-text-inverse"
          >
            Jump to the rate card
          </a>
        </SectionWrapper>

        {/* Match the Lake pricing page's preview notice. Its Price Protection
            Plan is not established for Filesystem in the pricing source yet.
            Lake's Contact us href has no query parameters. */}
        <SectionWrapper style={{ background: 'inverse', spacing: 'sm' }}>
          <aside
            aria-labelledby="preview-pricing-notice"
            className="mx-auto max-w-[760px] bg-brand-blue-pale px-4 py-3 text-body-md leading-6 text-text-primary"
          >
            <p id="preview-pricing-notice" className="mb-3 text-h3-sm font-bold">
              Public preview pricing
            </p>
            <p>
              The prices on this page apply to the public preview and may change at GA.{' '}
              <a
                href="https://www.pingcap.com/contact-us/"
                className="underline underline-offset-2 hover:no-underline"
              >
                Contact us
              </a>{' '}
              for details.
            </p>
          </aside>
        </SectionWrapper>

        {/* 01 Start free — leads because an evaluator is deciding whether to
            start, not whether to buy. */}
        <SectionWrapper id="start-free" style={{ background: 'gray' }}>
          <SectionHeader
            title="Start Free"
            subtitle="Every organization gets $5.00 of service credit each month. The amount is the same regardless of region or SKU."
            h2Size="md"
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              {/* Each row is the whole credit spent on that one meter. Saying so
                  in body copy is deliberate: as an aside it reads as three
                  allowances a reader can have at once. */}
              <h3 className="mb-3 text-h3-lg font-bold">
                What That Covers, If You Spent It All on One Thing
              </h3>
              <p className="mb-5 text-body-lg text-text-primary/70">
                Each row shows a separate calculation using the full $5 credit on one meter,
                assuming that credit is available to this usage — one of these, not all three.
              </p>
              <dl className="divide-y divide-carbon-300 border-y border-carbon-300">
                {[
                  ['Performance storage', 'about 16 GB for a month'],
                  ['Read operations (non-pooled)', '125,000 requests'],
                  ['Write operations (non-pooled)', '10,000 requests'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-6 py-3 text-body-lg">
                    <dt>{label}</dt>
                    <dd className="text-right font-mono">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">Without a Card on File</h3>
              <ul className="mb-5 space-y-2 text-body-lg">
                <li>One free filesystem per region</li>
                <li>2,000 files and 2 GB per free filesystem</li>
                <li>500 MB maximum for a single file</li>
              </ul>
              {/* Cost and eligibility are different tests and the page has to
                  keep them apart. 16 GB costs less than the credit, and is also
                  not runnable without a card. Both are true; together, silently,
                  they mislead. */}
              <p className="text-body-lg text-text-primary/70">
                These are separate from cost. Storage that the credit covers can still exceed what a
                filesystem without a card is allowed to hold, so check both.
              </p>
              {AT_THE_LIMIT && <p className="mt-5 text-body-lg">{AT_THE_LIMIT}</p>}
            </div>
          </div>
        </SectionWrapper>

        {/* 02 What a month actually costs — the section no sibling pricing page
            has, and the largest comprehension gain available. */}
        <SectionWrapper id="monthly-cost" style={{ background: 'primary' }}>
          <SectionHeader
            title="What a Month Actually Costs"
            subtitle="Illustrative monthly usage at the rates below. Each example shows the cost before credit, credit applied, and the remaining cost. These are not measured workloads."
            h2Size="md"
          />
          <p className="mb-6 max-w-[760px] text-body-sm text-carbon-400">
            Assumes non-pooled read and write requests, Performance storage held for a full month,
            and no Pooled usage, at the listed <code>aws-us-east-1</code> rates. Net amounts assume
            the organization&rsquo;s full $5 monthly credit is available to these charges. No-card
            filesystem limits still apply.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {EXAMPLES.map((example) => (
              <div key={example.name} className="rounded-lg border border-carbon-800 p-6">
                <h3 className="mb-4 text-h3-sm font-bold">{example.name}</h3>
                <dl className="mb-5 space-y-1 font-mono text-[13px] text-carbon-400">
                  {example.lines.map(([usage, cost]) => (
                    <div key={usage} className="flex justify-between gap-3">
                      <dt>{usage}</dt>
                      <dd>{cost}</dd>
                    </div>
                  ))}
                </dl>
                <dl className="space-y-1 border-t border-carbon-800 pt-4 font-mono text-[13px] text-carbon-400">
                  <div className="flex justify-between">
                    <dt>gross</dt>
                    <dd>{example.gross}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>credit</dt>
                    <dd>{example.credit}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-h3-lg font-bold">
                  {example.net}
                  <span className="ml-2 font-mono text-[13px] font-normal text-carbon-400">
                    net
                  </span>
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* 03 Rates and how billing works — the definitions and the rate card
            merged, so a reader does not bounce between a word and its price. */}
        <SectionWrapper id="rates" style={{ background: 'gray' }}>
          <SectionHeader
            title="Rates and How Billing Works"
            subtitle="Rates for read and write requests, storage and internet egress."
            h2Size="md"
          />
          <dl className="mb-12 divide-y divide-carbon-300 border-y border-carbon-300">
            {[
              [
                'Writes',
                'File write requests to TiDB Cloud Filesystem endpoints, priced per 1,000 requests.',
              ],
              [
                'Reads',
                'File read requests to TiDB Cloud Filesystem endpoints, priced per 1,000 requests.',
              ],
              ['Storage', 'What the workspace holds, per GB per month.'],
              ['Egress', 'Data leaving to the public internet.'],
            ].map(([term, definition]) => (
              <div key={term} className="grid gap-2 py-4 md:grid-cols-[180px_1fr] md:gap-6">
                <dt className="font-bold">{term}</dt>
                <dd className="text-text-primary/70">{definition}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mb-5 text-h3-lg font-bold">The Rate Card</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-body-sm sm:text-body-lg">
              <thead>
                <tr className="border-b border-carbon-400 text-left">
                  <th className="py-3 font-bold">Meter</th>
                  <th className="w-[44%] py-3 text-right font-bold">Price</th>
                </tr>
              </thead>
              <tbody>
                {RATES.map((rate) => (
                  <tr key={rate.meter} className="border-b border-carbon-300">
                    <td className="py-3 pr-3 sm:pr-6">
                      {rate.meter}
                      <span className="block text-body-sm text-text-primary/60">{rate.note}</span>
                    </td>
                    <td className="py-3 align-top text-right font-mono">{rate.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-body-sm text-text-primary/60">
            All prices in USD. Billed monthly, prorated by the hour. Shown for{' '}
            <code>aws-us-east-1</code>; other regions are adjusted proportionally.
          </p>

          {POOLED_EXPLAINER && (
            <>
              <h3 className="mb-3 mt-12 text-h3-lg font-bold">Performance and Pooled</h3>
              <p className="max-w-[720px] text-body-lg text-text-primary/70">{POOLED_EXPLAINER}</p>
            </>
          )}
          {/* Until POOLED_EXPLAINER is answered, the table's own notes are all the
              page says about Pooled. That is deliberate: a reader — or anything
              summarising this page — can otherwise read the 100x cheaper Pooled
              rows as an option to choose, which is a recommendation we cannot
              stand behind while the assignment rule is unknown. */}
        </SectionWrapper>

        {/* 04 Cost and Limitations — the family's own heading, so a reader
            arriving from a sibling pricing page finds what they expect. The
            conclusions a starter needs are already answered above; this is
            where the detail lives, not where it is first disclosed. */}
        <SectionWrapper id="limitations" style={{ background: 'primary' }}>
          <SectionHeader
            title="Cost and Limitations"
            subtitle="What is bounded, and what is still moving."
            h2Size="md"
          />
          <ul className="max-w-[760px] space-y-4 text-body-lg text-carbon-300">
            <li>Prices apply to the public preview and may change at general availability.</li>
            <li>
              One region is priced today. Others are adjusted proportionally and added gradually.
            </li>
            <li>
              The $5 monthly service credit is applied per organization. The amount is the same
              regardless of region or SKU.
            </li>
            <li>
              No-card accounts are limited to one filesystem per region, 2,000 files and 2 GB per
              filesystem, and 500 MB for any single file. Credit-card accounts are exempt from these
              limits.
            </li>
          </ul>
        </SectionWrapper>

        {/* 05 FAQ — sits immediately before the closing CTA, per the section
            contract. FAQPage structured data is emitted once, from the page
            schema graph above, not by this component. */}
        <SectionWrapper id="faq" style={{ background: 'gray' }}>
          <FaqSection title="Frequently Asked Questions" items={FAQ_ITEMS} />
        </SectionWrapper>

        <section className="bg-brand-red-bg py-16 text-white">
          <div className="contain">
            <CtaSection
              title="Start with the Credit, Not with a Card"
              subtitle="Create a filesystem and try it with your organization’s $5 monthly service credit. Review the rates and no-card limits above, then follow the quickstart."
              primaryCta={{
                text: 'Read the quickstart',
                href: DOCS_QUICKSTART,
              }}
              secondaryCta={{
                text: 'Talk to us',
                href: 'https://www.pingcap.com/contact-us/',
              }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
