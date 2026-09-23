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

// Answered 2026-09-22: at a cap, writes are blocked and reads keep working; the
// console shows a warning; with a card, overage is billed monthly; without a
// card, charges past the credit still accrue and remain payable.
//
// NOT answered, and deliberately absent below: what happens to a no-card account
// that leaves those charges unpaid. The reply described convert-or-suspend as a
// policy still being designed together, not as current behaviour, so the page
// does not state an outcome. The reply also called a billing spending *alert*
// the right instrument in principle — that is a design opinion, not a shipped
// feature, and must not be read as one.
const AT_THE_LIMIT: string | null =
  'When a filesystem reaches one of these limits, it stops accepting writes and existing files stay readable. The TiDB Cloud console shows a warning, and write requests are rejected once the limit is in force. With a card on file, usage beyond the credit is billed as overage on your monthly invoice; without one, charges past the credit still accrue and remain payable.'

// ── Source of truth ──────────────────────────────────────────────────────────
// "TiDB Cloud Filesystem Pricing Public Preview" v9 (2026-09-22, "Added multiple
// regions"), as it read on 2026-09-23. Note that the free-tier quantities were
// corrected on Sep 21 WITHOUT a version bump, so the re-derivation date matters
// as much as the version string. All seven free-tier lines were recomputed
// against this rate card and reconcile to $4.99 against the $5.00 credit. Do not
// edit these numbers without redoing that check. The source doc's `Discountable`
// column is internal and is not reproduced anywhere on this page.
//
// The source now publishes five regions. Read and write operations are $0.04 and
// $0.50 per 1,000 in ALL five; only pooled operations, both storage types and
// egress vary. RATES below is aws-us-east-1; REGION_RATES carries the rest.
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
// Only the meters that differ by region. Read and write operations are uniform
// across all five and stay in RATES above rather than being repeated here.
const RATE_REGION = 'aws-us-east-1'
const OTHER_REGIONS = [
  'aws-us-west-2',
  'aws-ap-southeast-1',
  'alicloud-ap-southeast-1',
  'gcp-us-east-1',
]
const REGION_RATES = [
  {
    meter: 'Pooled file read, per 1,000 requests',
    prices: ['$0.0004', '$0.0004', '$0.0001', '$0.0004'],
  },
  {
    meter: 'Pooled file write, per 1,000 requests',
    prices: ['$0.005', '$0.005', '$0.0014', '$0.005'],
  },
  { meter: 'Storage — Performance, per GB-mo', prices: ['$0.30', '$0.36', '$0.32', '$0.30'] },
  { meter: 'Storage — Pooled, per GB-mo', prices: ['$0.025', '$0.027', '$0.019', '$0.022'] },
  { meter: 'Internet egress, per GB', prices: ['$0.09', '$0.12', '$0.08', '$0.12'] },
]

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
  'TiDB Cloud Filesystem does not support a configurable spending limit. The $5 monthly credit reduces your charges; it is not a maximum monthly bill. A hard spending cap on an infrastructure service would stop the application depending on it, so filesystems without a card on file are bounded by storage and file limits instead, which block writes when reached.'
const FAQ_ITEMS = [
  {
    q: 'Does each filesystem get its own $5 credit?',
    a: 'No. The $5 monthly credit is shared by all Filesystem usage in your organization, across billing items and regions. Creating another filesystem does not add another $5 credit.',
  },
  {
    q: 'If the credit covers 16 GB, can I store 16 GB without a card?',
    a: 'No. The credit is a dollar amount applied to charges; the no-card storage cap is a separate limit of 2 GB per filesystem. The 16 GB illustration shows a storage cost, not the capacity of a no-card filesystem. Accounts with a card on file are exempt from the listed no-card limits.',
  },
  { q: 'Can I set a monthly spending limit?', a: SPENDING_LIMIT_ANSWER },
  {
    q: 'What happens when a filesystem reaches a limit?',
    a: 'It stops accepting writes, and existing files stay readable. The TiDB Cloud console shows a warning, and write requests are rejected once the limit is in force. With a card on file, usage beyond the $5 credit is billed as overage on your monthly invoice rather than blocked.',
  },
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
          {/* Keep the applicable pricing region visible before any figures. Five
              regions are published; every figure on this page uses the one named
              here, and the rate card carries the others. */}
          <p className="mb-6 max-w-[620px] text-body-md text-carbon-400">
            Every figure on this page is for <code className="font-mono">{RATE_REGION}</code>. Four
            more regions are priced on the{' '}
            <a href="#rates" className="underline underline-offset-2 hover:no-underline">
              rate card
            </a>
            , where read and write operations cost the same in all five.
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
              {/* The caps bound capacity, not spending: nothing limits request
                  count or egress, so a single-region no-card account can pass
                  the credit on requests alone. Naming multiple regions first
                  taught the wrong rule — a reader staying in one region read it
                  as safety. The $100 figure is derived from the published write
                  rate, not from any product statement. */}
              <p className="mb-5 text-body-lg text-text-primary/70">
                Nothing limits how many requests you make. The caps above limit how much you can
                store, not what you can spend — at the listed write rate, 200,000 write requests
                come to $100.00. Using filesystems in more than one region can also produce charges.
                There is no configurable spending limit. See{' '}
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
          {/* Section headings, not a definition list: these four introduce
              definitions but are headings themselves, and as <dt> they left the
              page's densest section with no sub-structure in the outline. */}
          <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">Read and Write Requests</h3>
              <div className="space-y-3 text-body-lg text-text-primary/70">
                <p>
                  A read retrieves file data; a write stores it. The prices use request counts, not
                  the number of files you keep and not the number of agent runs.
                </p>
                <p>
                  A price per 1,000 requests means you divide the request count by 1,000, then
                  multiply by the rate. At the non-pooled read rate, 50,000 ÷ 1,000 × $0.04 = $2.00.
                </p>
                {/* Having refused the one-to-one mapping between a file action and
                    a billable request, the page owes the reader somewhere to get
                    the count. What exactly produces a request is a metering
                    question for Product; until it is documented, say so and route
                    it rather than leaving a formula with no obtainable input. */}
                <p>
                  How many requests a given workload produces is not something you can read off your
                  file count. Take it from your account&rsquo;s usage reporting, or{' '}
                  <a href={CONTACT_US} className="underline underline-offset-2 hover:no-underline">
                    contact us
                  </a>{' '}
                  to work through an estimate.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">Storage: GB Per Month</h3>
              <div className="space-y-3 text-body-lg text-text-primary/70">
                <p>
                  Storage measures how much data you keep and for how long. GB-mo means gigabytes
                  per month; it is a storage unit, not a request count.
                </p>
                <p>
                  At the Performance rate, keeping 2 GB for a full month costs 2 × $0.30 = $0.60.
                  Billing is monthly and prorated by the hour.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">Internet Egress</h3>
              <div className="space-y-3 text-body-lg text-text-primary/70">
                <p>
                  Egress means data transferred out to the public internet, measured in GB. It is a
                  separate billing item from storage and requests.
                </p>
                <p>
                  At $0.09 per GB, 2 GB of internet egress costs $0.18. Use the amount transferred
                  out in this calculation, not the total amount you have stored.
                </p>
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">Performance and Pooled</h3>
              <div className="space-y-3 text-body-lg text-text-primary/70">
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
              </div>
            </div>
          </div>
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
            month and no Pooled usage, at <code className="font-mono">{RATE_REGION}</code> rates.
            Because both are dominated by requests, which cost the same everywhere, the same usage
            in the most expensive listed region comes to under 3% more. Each starts with the
            organization&rsquo;s full $5 monthly credit available.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {EXAMPLES.map((example) => (
              <div key={example.name} className="rounded-lg border border-carbon-800 p-6">
                <h3 className="mb-1 text-h3-sm font-bold">{example.name}</h3>
                <p className="text-body-sm text-carbon-400">{example.outcome}</p>
                {/* The shared premise above is ~600px away from this card on a
                    phone. Repeat the rate category here so the numbers never
                    travel without the condition that produced them. */}
                <p className="mb-4 text-body-sm text-carbon-400">
                  Non-pooled requests, Performance storage, full $5 credit available
                </p>
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
            subtitle="Use the rate for each category of your usage, then add those charges together. All seven billing items are listed below, for aws-us-east-1."
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
            All prices in USD. Billed monthly, prorated by the hour. The rates above are for{' '}
            <code>{RATE_REGION}</code>.
          </p>

          {/* The source published four more regions on 2026-09-22. Read and write
              operations are identical in all five, so only the meters that
              actually differ are repeated here — a second full seven-row table
              per region would be four-fifths duplication. */}
          <h3 className="mt-12 mb-3 text-h3-lg font-bold">Rates in Other Regions</h3>
          <p className="mb-6 max-w-[760px] text-body-lg text-text-primary/70">
            Read and write operations cost the same in every region listed — $0.04 and $0.50 per
            1,000 requests. Pooled operations, storage and egress differ:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-body-sm sm:text-body-lg">
              <thead>
                <tr className="border-b border-carbon-400 text-left">
                  <th className="min-w-[200px] py-3 font-bold">Meter</th>
                  {OTHER_REGIONS.map((region) => (
                    <th key={region} className="min-w-[110px] py-3 pl-3 text-right font-bold">
                      <code className="text-body-sm">{region}</code>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REGION_RATES.map((row) => (
                  <tr key={row.meter} className="border-b border-carbon-300">
                    <td className="py-3 pr-3 sm:pr-6">{row.meter}</td>
                    {row.prices.map((price, i) => (
                      <td
                        key={OTHER_REGIONS[i]}
                        className="py-3 pl-3 text-right font-mono align-top"
                      >
                        {price}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[760px] text-body-sm text-text-primary/60">
            Regions are added gradually.{' '}
            <a href={CONTACT_US} className="underline underline-offset-2 hover:no-underline">
              Contact us
            </a>{' '}
            for a quote in a region that is not listed.
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
              {AT_THE_LIMIT && <p className="mt-4 text-body-lg text-carbon-300">{AT_THE_LIMIT}</p>}
              <p className="mt-4 text-body-lg text-carbon-300">
                Accounts with a card on file are exempt from these limits.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">Your Credit and Spending</h3>
              <p className="text-body-lg text-carbon-300">{SPENDING_LIMIT_ANSWER}</p>
              {/* The storage and file caps block writes, which bounds how much you
                  can STORE — not how much you can spend. Repeatedly writing the
                  same small file never approaches 2 GB or 2,000 files, so nothing
                  blocks it and every request still bills. Saying only "the caps
                  keep costs low" would leave an agent writing in a loop — the
                  product's own use case — unwarned. */}
              <p className="mt-4 text-body-lg text-carbon-300">
                The limits above cap capacity, not spending. Nothing limits how many requests you
                make within them: rewriting the same file never approaches the 2 GB or 2,000-file
                limits, so writes are never blocked and each one is still billed. At the listed
                write rate, 200,000 write requests come to $100.00. Using filesystems in more than
                one region can also produce charges, including on an account without a card.
              </p>
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
