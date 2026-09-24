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
// card, charges past the free-tier still accrue and remain payable.
//
// NOT answered, and deliberately absent below: what happens to a no-card account
// that leaves those charges unpaid. The reply described convert-or-suspend as a
// policy still being designed together, not as current behaviour, so the page
// does not state an outcome. The reply also called a billing spending *alert*
// the right instrument in principle — that is a design opinion, not a shipped
// feature, and must not be read as one.
const AT_THE_LIMIT: string | null =
  'At a limit, your existing files stay readable and the filesystem stops accepting new writes. The TiDB Cloud console shows a warning. With a card on file, usage beyond the free-tier allowance is billed as overage on your monthly invoice.'

// ── Source of truth ──────────────────────────────────────────────────────────
// "TiDB Cloud Filesystem Pricing Public Preview" v9 (2026-09-22, "Added multiple
// regions"), as it read on 2026-09-23. Note that the free-tier quantities were
// corrected on Sep 21 WITHOUT a version bump, so the re-derivation date matters
// as much as the version string. All seven free-tier lines were recomputed
// against this rate card and reconcile to $4.99 against the $5.00 allowance. Do not
// edit these numbers without redoing that check. The source doc's `Discountable`
// column is internal and is not reproduced anywhere on this page.
//
// The source publishes five regions, and they go in ONE table rather than a
// default plus a diff table or a region picker. A pricing-page visitor has not
// signed up yet, so their region is not something they pick by comparing our
// prices — it is fixed by constraints they already have (data residency, the
// cloud their app runs on, existing provider commitments) or they have no region
// in mind at all. For the second group the real pre-signup question is "do you
// support my provider at all", which a table answers at a glance and a dropdown
// hides behind a click.
//
// Read and write operations are identical in all five, and they are 88-94% of a
// request-dominated bill. Two rows repeating across five columns IS the message;
// a picker would show one region at a time and conceal it.
const REGIONS = [
  'aws-us-east-1',
  'aws-us-west-2',
  'aws-ap-southeast-1',
  'alicloud-ap-southeast-1',
  'gcp-us-east-1',
]
// The region every worked figure on this page uses.
const RATE_REGION = REGIONS[0]

// Each row carries the source doc's own Description. Those descriptions say
// what a meter is measured against; they do not say what assigns usage to
// Pooled or Performance, which is POOLED_EXPLAINER above. Prices are in REGIONS
// order.
const RATES = [
  {
    meter: 'Read operations, per 1,000 requests',
    note: 'File read requests against TiDB Cloud Filesystem endpoints',
    prices: ['$0.04', '$0.04', '$0.04', '$0.04', '$0.04'],
  },
  {
    meter: 'Write operations, per 1,000 requests',
    note: 'File write requests against TiDB Cloud Filesystem endpoints',
    prices: ['$0.50', '$0.50', '$0.50', '$0.50', '$0.50'],
  },
  {
    meter: 'Pooled file read operations, per 1,000 requests',
    note: 'File read requests against object storage',
    prices: ['$0.0004', '$0.0004', '$0.0004', '$0.0001', '$0.0004'],
  },
  {
    meter: 'Pooled file write operations, per 1,000 requests',
    note: 'File write requests against object storage',
    prices: ['$0.005', '$0.005', '$0.005', '$0.0014', '$0.005'],
  },
  {
    meter: 'Storage — Performance, per GB-mo',
    note: 'Underlying database storage',
    prices: ['$0.30', '$0.30', '$0.36', '$0.32', '$0.30'],
  },
  {
    meter: 'Storage — Pooled, per GB-mo',
    note: 'Underlying object storage',
    prices: ['$0.025', '$0.025', '$0.027', '$0.019', '$0.022'],
  },
  {
    meter: 'Internet egress, per GB',
    note: 'Data transfer out to the internet',
    prices: ['$0.09', '$0.09', '$0.12', '$0.08', '$0.12'],
  },
]

const EXAMPLES = [
  {
    name: 'Example 1: Infrequent Usage — mount from outside the TiDB Cloud provider region',
    outcome: 'The free-tier covers this usage',
    explanation:
      'The usage adds up to $4.80. Applying the free-tier allowance leaves $0 to pay for this usage.',
    eligibility:
      'The 1 GB stored is below the 2 GB no-card storage cap. File-count and single file system under one region limits still apply.',
    lines: [
      ['54,400 pooled file write requests', '$0.27'],
      ['2,720,000 pooled file read requests', '$1.09'],
      ['2,000 write requests', '$1.00'],
      ['50,000 read requests', '$2.00'],
      ['1 GB Performance storage', '$0.30'],
      ['2 GB Pooled storage', '$0.05'],
      ['1 GB egress', '$0.09'],
    ],
    gross: '$4.80',
    credit: '-$4.80',
    net: '$0',
  },
  {
    name: 'Example 2: Medium Usage - mount from inside the TiDB Cloud provider region',
    outcome: 'The usage exceeds the free-tier allowance',
    explanation:
      'The usage adds up to $7.90. Subtract the full $5 free-tier allowance to get $4.90 to pay for this usage.',
    eligibility:
      'Keeping 13 GB in one filesystem exceeds the no-card storage cap and requires a card on file.',
    lines: [
      ['90,000 pooled file write requests', '$0.45'],
      ['4,500,000 pooled file read requests', '$1.80'],
      ['3,000 write requests', '$1.50'],
      ['75,000 read requests', '$3.00'],
      ['3 GB Performance storage', '$0.90'],
      ['10 GB Pooled storage', '$0.25'],
      ['0 GB egress', '$0.0'],
    ],
    gross: '$7.90',
    credit: '-$5.00',
    net: '$4.90',
  },
]

// Verified live on docs.pingcap.com 2026-09-21.
const DOCS_QUICKSTART = 'https://docs.pingcap.com/ai/ti-quick-start/'
const CONTACT_US = 'https://www.pingcap.com/contact-us/'

// The product entity lives on the Filesystem product page. This page describes
// its pricing, so its SoftwareApplication node points back at that URL instead
// of at this one — otherwise the two pages assert two different entities with
// the same name, and an answer engine has to guess which record to cite.
const PRODUCT_URL = 'https://www.pingcap.com/tidb/tidb-cloud-filesystem/'

const PATH = '/tidb-cloud-filesystem-pricing-details/'
const CANONICAL = `https://www.pingcap.com${PATH}`
const TITLE = 'TiDB Cloud Filesystem Pricing Details'
const DESCRIPTION =
  'TiDB Cloud Filesystem pricing for reads, writes, storage and egress, with $5 of service free-tier allowance per organization each month. View rates and limits.'
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
  'TiDB Cloud Filesystem does not support a configurable spending limit. The $5 monthly free-tier allowance reduces your charges; it is not a maximum monthly bill.'
const FAQ_ITEMS = [
  {
    q: 'Does each filesystem get its own $5 free-tier allowance?',
    a: 'No. The $5 monthly free-tier allowance is shared by all Filesystem usage in your organization, across billing items and regions. Creating another filesystem does not add another $5 allowance.',
  },
  {
    q: 'If the free-tier allowance covers 16 GB, can I store 16 GB without a card?',
    a: 'No. The allowance is a dollar amount applied to charges; the no-card storage cap is a separate limit of 2 GB per filesystem. The 16 GB illustration shows a storage cost, not the capacity of a no-card filesystem. Accounts with a card on file are exempt from the listed no-card limits.',
  },
  { q: 'Can I set a monthly spending limit?', a: SPENDING_LIMIT_ANSWER },
  {
    q: 'What happens when a filesystem reaches a limit?',
    a: 'It stops accepting writes, and existing files stay readable. The TiDB Cloud console shows a warning, and write requests are rejected once the limit is in force. With a card on file, usage beyond the $5 allowance is billed as overage on your monthly invoice rather than blocked.',
  },
]

const schema = buildPageSchema({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  aboutId: `${PRODUCT_URL}#software`,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'TiDB Cloud Filesystem', path: '/tidb/tidb-cloud-filesystem/' },
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
        // pay-as-you-go with a free-tier allowance, which is not the same claim.
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
            Pay as you go for reads, writes, storage and egress, with a monthly free-tier allowance. No
            tiered plans.
          </p>
          {/* A pricing page is a common first landing point, and a reader who does
              not yet know what the product is had no route to it from here. The
              product page is the parent of this one in the breadcrumb and shares
              its schema @id; it belongs in the hero, not only in a footnote
              eight headings down. */}
          <p className="mb-6 max-w-[620px] text-body-md text-carbon-400">
            Every figure on this page is for <code className="font-mono">{RATE_REGION}</code>. All
            five priced regions are on the{' '}
            <a href="#rates" className="underline underline-offset-2 hover:no-underline">
              rate card
            </a>
            , where read and write operations cost the same in every one.
          </p>
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <a
              href="#rates"
              className="inline-flex items-center gap-2 rounded-full border border-carbon-800 px-4 py-2 text-body-sm text-carbon-200 transition-colors hover:border-carbon-400 hover:text-text-inverse"
            >
              Jump to the rate card
            </a>
            <a
              href={PRODUCT_URL}
              className="inline-flex items-center gap-2 rounded-full border border-carbon-800 px-4 py-2 text-body-sm text-carbon-200 transition-colors hover:border-carbon-400 hover:text-text-inverse"
            >
              Product overview
            </a>
          </div>
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
            subtitle="Every organization gets $5.00 of Filesystem service free-tier allowance each month. This allowance is a dollar amount deducted from your usage charges, shared across all your filesystems, billing items and regions."
            className="mb-8"
            h2Size="md"
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">What Can $5 Cover?</h3>
              <p className="mb-5 text-body-lg text-text-primary/70">
                To put the free-tier allowance in perspective, here are three separate ways to use it at the
                listed rates. Each assumes the full allowance is available and no other usage:
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
                The free-tier allowance covers usage charges; it does not increase these limits. For example, 16 GB of
                Performance storage for a full month costs $4.80, but a filesystem without a credit card
                can only hold 2 GB.
              </p>
              {/* Removed 2026-09-23 at the owner's direction: an illustration of
                  how far request volume can run past the free-tier allowance ("200,000 write
                  requests come to $100.00"). It was derived from the published
                  write rate, but Product could not confirm the underlying
                  behaviour, and an unresolved claim does not belong on a public
                  page. The two confirmed facts stay: the free-tier allowance is not a cap, and
                  there is no configurable spending limit. Restore the fuller
                  explanation only once Product answers. */}
              <p className="mb-5 text-body-lg text-text-primary/70">
                The $5 allowance reduces your charges; it is not a maximum monthly bill, and there is
                no configurable spending limit. See{' '}
                <a href="#limitations" className="underline underline-offset-2 hover:no-underline">
                  Billing and Limits
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
            {/* Silent until answered, 2026-09-23. This block used to tell the
                reader we could not say which category applied and to contact us,
                which advertised the gap without closing it. The rate card still
                lists every published meter, so nothing is hidden from a reader
                who is billed for one. Setting POOLED_EXPLAINER makes the whole
                block reappear — that is the one-line patch when Product answers. */}
            {POOLED_EXPLAINER && (
              <div>
                <h3 className="mb-3 text-h3-lg font-bold">Performance and Pooled</h3>
                <div className="space-y-3 text-body-lg text-text-primary/70">
                  <p>
                    The rate card lists two storage categories, Performance and Pooled. It also
                    lists ordinary read/write requests and separate Pooled file requests. These have
                    different rates.
                  </p>
                  <p>{POOLED_EXPLAINER}</p>
                </div>
              </div>
            )}
          </div>
        </SectionWrapper>

        {/* Show complete arithmetic and then explain how shared credit changes it. */}
        <SectionWrapper id="monthly-cost" style={{ background: 'primary' }}>
          <SectionHeader
            title="Example Monthly Bills"
            subtitle="Add the charges for each billing item, then subtract the available monthly free-tier allowance. These illustrative examples show both the calculation and what remains to pay."
            className="mb-8"
            h2Size="md"
          />
          <p className="mb-8 max-w-[760px] text-body-lg text-carbon-300">
            Both examples use non-pooled read/write requests, Performance storage held for a full
            month and no Pooled usage, at <code className="font-mono">{RATE_REGION}</code> rates.
            Because both are dominated by requests, which cost the same everywhere, the same usage
            in the most expensive listed region comes to under 3% more. Each starts with the
            organization&rsquo;s full $5 monthly free-tier allowance available.
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
                  Non-pooled requests, Performance storage, full $5 free-tier allowance available
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
                    <dt>Free-tier allowance applied</dt>
                    <dd className="font-mono">{example.credit}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-h3-lg font-bold">
                  {example.net}{' '}
                  <span className="ml-2 text-body-md text-carbon-300">after allowance</span>
                </p>
                <p className="mt-4 text-body-md text-carbon-200">{example.explanation}</p>
                <p className="mt-3 text-body-md text-carbon-300">{example.eligibility}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-[760px] border-l-2 border-carbon-400 pl-6">
            <h3 className="mb-3 text-h3-lg font-bold">Already Used Some of Your Free-tier Allowance?</h3>
            <p className="text-body-lg text-carbon-300">
              If other Filesystem usage in your organization has already used $3 of this
              month&rsquo;s allowance, only $2 remains. For the same $4.80 of usage in Example 1, the
              remaining amount to pay would be $4.80 − $2.00 = $1.39. A new filesystem or region
              does not create a new free-tier allowance.
            </p>
          </div>
        </SectionWrapper>

        <SectionWrapper id="rates" style={{ background: 'gray' }}>
          <SectionHeader
            title="Rates and How Billing Works"
            subtitle="Use the rate for each category of your usage, then add those charges together. All seven billing items are listed below, for every region where Filesystem is priced."
            className="mb-8"
            h2Size="md"
          />
          {/* Lead with the uniformity. A reader scanning five columns of numbers
              should be told first which ones they do not need to compare. */}
          <p className="mb-6 max-w-[760px] text-body-lg text-text-primary/70">
            Read and write operations cost the same in every region — $0.04 and $0.50 per 1,000
            requests — and they dominate most bills. Pooled operations, storage and egress differ by
            region.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-body-sm sm:text-body-lg">
              <thead>
                <tr className="border-b border-carbon-400 text-left">
                  <th className="min-w-[210px] py-3 font-bold">Meter</th>
                  {REGIONS.map((region) => (
                    <th key={region} className="min-w-[112px] py-3 pl-3 text-right font-bold">
                      <code className="text-body-sm">{region}</code>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RATES.map((rate) => (
                  <tr key={rate.meter} className="border-b border-carbon-300">
                    <td className="py-3 pr-3 sm:pr-6">
                      {rate.meter}
                      <span className="block text-body-sm text-text-primary/60">{rate.note}</span>
                    </td>
                    {rate.prices.map((price, i) => (
                      <td key={REGIONS[i]} className="py-3 pl-3 text-right align-top font-mono">
                        {price}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[760px] text-body-sm text-text-primary/60">
            All prices in USD. Billed monthly, prorated by the hour. Worked examples on this page
            use <code>{RATE_REGION}</code>. Regions are added gradually —{' '}
            <a href={CONTACT_US} className="underline underline-offset-2 hover:no-underline">
              contact us
            </a>{' '}
            for a quote in a region that is not listed.
          </p>
        </SectionWrapper>

        {/* 04 Billing and Limits. The sibling pricing pages call this "Cost and
            Limitations"; renamed 2026-09-23 because that stacks two constraint
            nouns, and "Limitations" reads as shortcomings where "Limits" is a
            neutral quantity. Everything here is
            the full statement of a limit or a charge boundary; the preview,
            region and credit facts live where they are first needed instead of
            being repeated as a list. */}
        <SectionWrapper id="limitations" style={{ background: 'primary' }}>
          <SectionHeader title="Billing and Limits" className="mb-8" h2Size="md" />
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
              <h3 className="mb-3 text-h3-lg font-bold">Your Free-tier Allowance and Spending</h3>
              <p className="text-body-lg text-carbon-300">{SPENDING_LIMIT_ANSWER}</p>
              {/* See the note in Start Free. The request-volume illustration was
                  removed here too; what remains is only what Product confirmed. */}
              <p className="mt-4 text-body-lg text-carbon-300">
                Using filesystems in more than one region can also produce charges, including on an
                account without a card.
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
              title="Start with Your Monthly Free-tier Allowance"
              subtitle="Create a filesystem and try it with your organization's $5 monthly service allowance."
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
