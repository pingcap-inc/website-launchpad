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
// Answers the pricing source does not contain. Each gates its own block, so
// nothing renders until the answer exists and no invented commitment can ship
// by accident. Same pattern as KIMI_STORY_URL on the Filesystem landing page.
// Do not fill these in from inference — they are product behaviour, not copy.

// What decides whether usage is Pooled or Performance: user choice, file size,
// access pattern, or something else. They differ by 12x on storage and 100x on
// operations. The rate card still lists both, because those are published
// prices, but the page does not tell anyone how to choose. Asked 2026-09-21.
const POOLED_EXPLAINER: string | null = null

// What happens when the monthly credit is exhausted or a cap is reached: stop,
// throttle, failed writes, continued reads, and notifications remain unanswered.
// Spending-limit support was answered separately on 2026-09-22: not supported.
// Do not infer alert availability or operational behaviour from that answer.
const AT_THE_LIMIT: string | null = null

// ── Source of truth ──────────────────────────────────────────────────────────
// "TiDB Cloud Filesystem Pricing Public Preview" v8 (2026-09-19), as it read on
// 2026-09-22 (body revision 1489) — the quantities were corrected on Sep 21 without a
// version bump, so the re-derivation date matters as much as the version. All
// seven free-tier lines were recomputed against this rate card and reconcile to
// $4.99 against the $5.00 credit. Do not edit these numbers without redoing
// that check. The source doc's `Discountable` column is internal and is not
// reproduced anywhere on this page.
//
// Each row carries the source doc's own Description. Those descriptions say
// what a meter is measured against; they do not say what assigns usage to
// Pooled or Performance, which is POOLED_EXPLAINER above.
const RATES = [
  {
    meter: 'Read operations, per 1,000 requests',
    note: 'File read requests against TiDB Cloud Filesystem endpoints',
    price: '$0.04',
  },
  {
    meter: 'Write operations, per 1,000 requests',
    note: 'File write requests against TiDB Cloud Filesystem endpoints',
    price: '$0.50',
  },
  {
    meter: 'Pooled file read operations, per 1,000 requests',
    note: 'File read requests against object storage',
    price: '$0.0004',
  },
  {
    meter: 'Pooled file write operations, per 1,000 requests',
    note: 'File write requests against object storage',
    price: '$0.005',
  },
  {
    meter: 'Storage — Performance',
    note: 'Underlying database storage, per GB per month',
    price: '$0.30 / GB-mo',
  },
  {
    meter: 'Storage — Pooled',
    note: 'Underlying object storage, per GB per month',
    price: '$0.025 / GB-mo',
  },
  { meter: 'Internet egress', note: 'Data transfer out to the internet', price: '$0.09 / GB' },
]

// Illustrative inputs, not measured workloads or recommended workload tiers.
// Two complete bills plus a shared-credit variation explain different decisions.
const EXAMPLES = [
  {
    name: 'Example 1',
    outcome: 'The credit covers this usage',
    explanation:
      'The usage adds up to $3.39. Applying $3.39 of the available credit leaves $0 to pay for this usage.',
    eligibility:
      'The 1 GB stored is below the 2 GB no-card storage cap. File-count and single-file limits still apply.',
    lines: [
      ['2,000 write requests', '$1.00'],
      ['50,000 read requests', '$2.00'],
      ['1 GB Performance storage', '$0.30'],
      ['1 GB egress', '$0.09'],
    ],
    gross: '$3.39',
    credit: '−$3.39',
    net: '$0',
  },
  {
    name: 'Example 2',
    outcome: 'The usage exceeds the credit',
    explanation:
      'The usage adds up to $28.68. Subtract the full $5 credit to get $23.68 to pay for this usage.',
    eligibility:
      'Keeping 5 GB in one filesystem exceeds the no-card storage cap and requires a card on file.',
    lines: [
      ['30,000 write requests', '$15.00'],
      ['300,000 read requests', '$12.00'],
      ['5 GB Performance storage', '$1.50'],
      ['2 GB egress', '$0.18'],
    ],
    gross: '$28.68',
    credit: '−$5.00',
    net: '$23.68',
  },
]

// Verified live on docs.pingcap.com 2026-09-21.
const DOCS_QUICKSTART = 'https://docs.pingcap.com/ai/ti-quick-start/'
const CONTACT_US = 'https://www.pingcap.com/contact-us/'

// The product entity lives on the Filesystem product page. This page describes
// its pricing, so its SoftwareApplication node points back at that URL instead
// of at this one — otherwise the two pages assert two different entities with
// the same name, and an answer engine has to guess which record to cite.
const PRODUCT_URL = 'https://www.pingcap.com/tidb/tidb-cloud-filesystems/'

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

// Use the same plain-text answers for the visible FAQ and its schema.
const SPENDING_LIMIT_ANSWER =
  'TiDB Cloud Filesystem does not support a configurable spending limit. The $5 monthly credit reduces your charges; it is not a maximum monthly bill.'
const FAQ_ITEMS = [
  {
    q: 'Does each filesystem get its own $5 credit?',
    a: 'No. The $5 monthly credit is shared by all Filesystem usage in your organization, across billing items and regions. Creating another filesystem does not add another $5 credit.',
  },
  {
    q: 'If the credit covers 16 GB, can I store 16 GB without a card?',
    a: 'No. The credit is a dollar amount applied to charges; the no-card storage cap is a separate limit of 2 GB per filesystem. The 16 GB illustration shows a storage cost, not the capacity of a no-card filesystem. Accounts with a card on file are exempt from the listed no-card limits.',
  },
  { q: 'Can I set a monthly spending limit?', a: `No. ${SPENDING_LIMIT_ANSWER}` },
]

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
    faqSchema(FAQ_ITEMS.map(({ q, a }) => ({ question: q, answer: a }))),
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
  ],
})

export default function FilesystemPricingDetailsPage() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main className="bg-bg-primary pt-[62px] lg:pt-20">
        <SectionWrapper style={{ background: 'primary', spacing: 'md' }}>
          <div className="mb-4">
            <Badge variant="secondary">Public Preview</Badge>
          </div>
          <h1 className="mb-6 max-w-[900px] text-pretty text-h1-mb font-bold leading-tight tracking-[-0.025em] md:text-h1">
            TiDB Cloud Filesystem Pricing Details
          </h1>
          <p className="mb-6 max-w-[620px] text-pretty text-body-2xl text-carbon-400">
            Pay as you go for reads, writes, storage and egress, with a monthly free credit. No
            tiered plans.
          </p>
          {/* Keep the applicable pricing region visible before any figures. */}
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
              <a href={CONTACT_US} className="underline underline-offset-2 hover:no-underline">
                Contact us
              </a>{' '}
              for details.
            </p>
          </aside>
        </SectionWrapper>

        <SectionWrapper id="start-free" style={{ background: 'gray' }}>
          <SectionHeader
            title="Start Free"
            subtitle="Every organization gets $5.00 of Filesystem service credit each month. This credit is a dollar amount deducted from your usage charges, shared across all your filesystems, billing items and regions."
            className="mb-8"
            h2Size="md"
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">What Can $5 Cover?</h3>
              <p className="mb-5 text-body-lg text-text-primary/70">
                To put the credit in perspective, here are three separate ways to use it at the
                listed rates. Each assumes the full credit is available and no other usage:
              </p>
              <dl className="divide-y divide-carbon-300 border-y border-carbon-300">
                {[
                  ['125,000 read requests', '$5.00', 'At the non-pooled read rate'],
                  ['10,000 write requests', '$5.00', 'At the non-pooled write rate'],
                  ['16 GB of Performance storage', '$4.80', 'Stored for a full month'],
                ].map(([usage, cost, note]) => (
                  <div key={usage} className="flex items-start justify-between gap-4 py-4">
                    <dt className="text-body-lg">
                      {usage}
                      <span className="mt-1 block text-body-sm text-text-primary/70">{note}</span>
                    </dt>
                    <dd className="shrink-0 font-mono text-body-md">{cost}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-body-md text-text-primary/70">
                These are alternatives, not three included allowances. If you use reads, writes,
                storage and egress together, their combined charges draw on the same $5. The monthly
                examples below show that calculation.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">What Can I Use Without a Card?</h3>
              <p className="mb-4 text-body-lg text-text-primary/70">
                You can start without a credit card, with one filesystem per region. Each filesystem
                can hold up to 2,000 files and 2 GB in total; each file can be up to 500 MB.
              </p>
              <p className="mb-4 text-body-lg text-text-primary/70">
                The credit pays for usage; it does not increase these limits. For example, 16 GB of
                Performance storage for a full month costs $4.80, but a filesystem without a card
                can only hold 2 GB.
              </p>
              <p className="mb-5 text-body-lg text-text-primary/70">
                Using filesystems in multiple regions can still incur charges beyond the shared
                credit, even without a card. There is no configurable spending limit. See{' '}
                <a href="#limitations" className="underline underline-offset-2 hover:no-underline">
                  Cost and Limitations
                </a>{' '}
                before you start.
              </p>
              <a
                href={DOCS_QUICKSTART}
                className="inline-flex text-body-lg underline underline-offset-4 hover:no-underline"
              >
                Read the quickstart
              </a>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="understand-usage" style={{ background: 'inverse' }}>
          <SectionHeader
            title="Understand Your Usage"
            subtitle="Your cost depends on requests, the amount of data you store and data transferred out to the internet. Here is how to read those units before applying the rates."
            className="mb-8"
            h2Size="md"
          />
          <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            <div>
              <dt className="mb-3 text-h3-lg font-bold">Read and Write Requests</dt>
              <dd className="space-y-3 text-body-lg text-text-primary/70">
                <p>
                  Reads retrieve file data; writes write file data. The prices use request counts,
                  not the number of files stored or the number of agent runs.
                </p>
                <p>
                  A price per 1,000 requests means you divide the request count by 1,000, then
                  multiply by the rate. At the non-pooled read rate, 50,000 ÷ 1,000 × $0.04 = $2.00.
                </p>
              </dd>
            </div>
            <div>
              <dt className="mb-3 text-h3-lg font-bold">Storage: GB per Month</dt>
              <dd className="space-y-3 text-body-lg text-text-primary/70">
                <p>
                  Storage measures how much data you keep and for how long. GB-mo means gigabytes
                  per month; it is a storage unit, not a request count.
                </p>
                <p>
                  At the Performance rate, keeping 2 GB for a full month costs 2 × $0.30 = $0.60.
                  Billing is monthly and prorated by the hour.
                </p>
              </dd>
            </div>
            <div>
              <dt className="mb-3 text-h3-lg font-bold">Internet Egress</dt>
              <dd className="space-y-3 text-body-lg text-text-primary/70">
                <p>
                  Egress means data transferred out to the public internet, measured in GB. It is a
                  separate billing item from storage and requests.
                </p>
                <p>
                  At $0.09 per GB, 2 GB of internet egress costs $0.18. Use the amount transferred
                  out in this calculation, not the total amount you have stored.
                </p>
              </dd>
            </div>
            <div>
              <dt className="mb-3 text-h3-lg font-bold">Performance and Pooled</dt>
              <dd className="space-y-3 text-body-lg text-text-primary/70">
                <p>
                  The rate card lists two storage categories, Performance and Pooled. It also lists
                  ordinary read/write requests and separate Pooled file requests. These have
                  different rates.
                </p>
                {POOLED_EXPLAINER ? (
                  <p>{POOLED_EXPLAINER}</p>
                ) : (
                  <p>
                    Before estimating your own costs, confirm which categories apply to your usage.{' '}
                    <a
                      href={CONTACT_US}
                      className="underline underline-offset-2 hover:no-underline"
                    >
                      Contact us
                    </a>{' '}
                    for help identifying the applicable rates. The examples below use non-pooled
                    requests and Performance storage only.
                  </p>
                )}
              </dd>
            </div>
          </dl>
        </SectionWrapper>

        {/* Show complete arithmetic and then explain how shared credit changes it. */}
        <SectionWrapper id="monthly-cost" style={{ background: 'primary' }}>
          <SectionHeader
            title="Example Monthly Costs"
            subtitle="Add the charges for each billing item, then subtract the available monthly credit. These illustrative examples show both the calculation and what remains to pay."
            className="mb-8"
            h2Size="md"
          />
          <p className="mb-8 max-w-[760px] text-body-lg text-carbon-300">
            Both examples use non-pooled read/write requests, Performance storage held for a full
            month and no Pooled usage, at <code className="font-mono">aws-us-east-1</code> rates.
            Each starts with the organization&rsquo;s full $5 monthly credit available.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {EXAMPLES.map((example) => (
              <div key={example.name} className="rounded-lg border border-carbon-800 p-6">
                <h3 className="mb-1 text-h3-sm font-bold">{example.name}</h3>
                <p className="mb-4 text-body-sm text-carbon-400">{example.outcome}</p>
                <dl className="mb-5 space-y-3 text-body-md text-carbon-200">
                  {example.lines.map(([usage, cost]) => (
                    <div key={usage} className="flex justify-between gap-3">
                      <dt>{usage}</dt>
                      <dd className="shrink-0 font-mono">{cost}</dd>
                    </div>
                  ))}
                </dl>
                <dl className="space-y-2 border-t border-carbon-800 pt-4 text-body-md text-carbon-200">
                  <div className="flex justify-between">
                    <dt>Usage charges</dt>
                    <dd className="font-mono">{example.gross}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Credit applied</dt>
                    <dd className="font-mono">{example.credit}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-h3-lg font-bold">
                  {example.net}{' '}
                  <span className="ml-2 text-body-md text-carbon-300">after credit</span>
                </p>
                <p className="mt-4 text-body-md text-carbon-200">{example.explanation}</p>
                <p className="mt-3 text-body-md text-carbon-300">{example.eligibility}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-[760px] border-l-2 border-carbon-400 pl-6">
            <h3 className="mb-3 text-h3-lg font-bold">Already Used Some of Your Credit?</h3>
            <p className="text-body-lg text-carbon-300">
              If other Filesystem usage in your organization has already used $3 of this
              month&rsquo;s credit, only $2 remains. For the same $3.39 of usage in Example 1, the
              remaining amount to pay would be $3.39 − $2.00 = $1.39. A new filesystem or region
              does not create a new credit allowance.
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper id="rates" style={{ background: 'gray' }}>
          <SectionHeader
            title="Rates and How Billing Works"
            subtitle="Use the rate for each category of your usage, then add those charges together. All seven billing items are listed below."
            className="mb-8"
            h2Size="md"
          />
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-body-sm sm:text-body-lg">
              <thead>
                <tr className="border-b border-carbon-400 text-left">
                  <th className="py-3 font-bold">Meter</th>
                  <th className="w-[36%] py-3 text-right font-bold">Price</th>
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
          <p className="mt-4 max-w-[760px] text-body-sm text-text-primary/60">
            All prices in USD. Billed monthly, prorated by the hour. Shown for{' '}
            <code>aws-us-east-1</code>; other regions are adjusted proportionally.{' '}
            <a href={CONTACT_US} className="underline underline-offset-2 hover:no-underline">
              Contact us
            </a>{' '}
            for a quote in another region.
          </p>
        </SectionWrapper>

        {/* 04 Cost and Limitations — the family's heading. Everything here is
            the full statement of a limit or a charge boundary; the preview,
            region and credit facts live where they are first needed instead of
            being repeated as a list. */}
        <SectionWrapper id="limitations" style={{ background: 'primary' }}>
          <SectionHeader title="Cost and Limitations" className="mb-8" h2Size="md" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">Without a Card on File</h3>
              <ul className="space-y-2 text-body-lg text-carbon-300">
                <li>One filesystem per region</li>
                <li>2,000 files per filesystem</li>
                <li>2 GB of storage per filesystem</li>
                <li>500 MB maximum for a single file</li>
              </ul>
              <p className="mt-4 text-body-lg text-carbon-300">
                Accounts with a card on file are exempt from these limits.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">Your Credit and Spending</h3>
              <p className="text-body-lg text-carbon-300">{SPENDING_LIMIT_ANSWER}</p>
              <p className="mt-4 text-body-lg text-carbon-300">
                Using filesystems in multiple regions can produce charges beyond the shared credit
                even without a card. The file and storage limits above do not mean your bill is
                capped at $5.
              </p>
              {AT_THE_LIMIT && <p className="mt-4 text-body-lg text-carbon-300">{AT_THE_LIMIT}</p>}
              <p className="mt-4 text-body-lg text-carbon-300">
                <a href={PRODUCT_URL} className="underline underline-offset-2 hover:no-underline">
                  What TiDB Cloud Filesystem is
                </a>
              </p>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="faq" style={{ background: 'gray' }}>
          <FaqSection title="Common Pricing Questions" items={FAQ_ITEMS} />
        </SectionWrapper>

        <section className="bg-brand-red-bg py-16 text-white">
          <div className="contain">
            <CtaSection
              title="Start with Your Monthly Credit"
              subtitle="Create a filesystem and try it with your organization's $5 monthly service credit."
              primaryCta={{
                text: 'Read the quickstart',
                href: DOCS_QUICKSTART,
              }}
              secondaryCta={{
                text: 'Talk to us',
                href: CONTACT_US,
              }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
