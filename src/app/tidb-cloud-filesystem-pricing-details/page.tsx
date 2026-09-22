import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema, softwareApplicationSchema } from '@/lib/schema'
import { Header } from '@/components/ui/Header'
import { Footer } from '@/components/ui/Footer'
import { Badge } from '@/components/ui/badge'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SectionHeader } from '@/components/ui/SectionHeader'
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
// throttle, failed writes, or billing continues — and whether a spending limit
// can be set at all. "Not supported" is an acceptable answer; silence is not,
// because it is what someone decides on before pointing an agent at a metered
// service. Asked 2026-09-21, followed up 2026-09-22.
const AT_THE_LIMIT: string | null = null

// ── Source of truth ──────────────────────────────────────────────────────────
// "TiDB Cloud Filesystem Pricing Public Preview" v8 (2026-09-19), as it read on
// 2026-09-21 — the free-tier quantities were corrected that day without a
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

// Two examples, not three: one the credit covers and one it does not. A third
// only repeats the same arithmetic at a larger scale. Labelled by outcome
// rather than by workload size — "light" and "steady" implied a typicality we
// have never measured, and a reader cannot tell which bracket their agents are
// in from a request count.
const EXAMPLES = [
  {
    name: 'Example 1',
    outcome: 'within the credit',
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
    outcome: 'above the credit',
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

// No FAQPage node. The four questions this page carried answered what the body
// already answers, and one of them had gone stale against the copy — a second
// store of the same facts is a second thing to keep true. The AEO checklist
// scores FAQ presence, so this trades a little of that score for not shipping
// duplicated, drift-prone copy. Recorded deliberately rather than padded back
// up to three questions.
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
          {/* Regional context here is a deliberate exception to this round's
              de-duplication: it was asked for directly and the reader needs to
              know which region the numbers are for before reading any of them. */}
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

        {/* 01 Start free — leads because an evaluator is deciding whether to
            start, not whether to buy. It carries the cost warning, because the
            moment someone decides to try is the moment they need it. */}
        <SectionWrapper id="start-free" style={{ background: 'gray' }}>
          <SectionHeader
            title="Start Free"
            subtitle="Every organization gets $5.00 of service credit each month. It is one credit for the whole organization's Filesystem usage, shared across SKUs and regions, and it renews monthly."
            h2Size="md"
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">No Card Required to Start</h3>
              <p className="mb-5 text-body-lg text-text-primary/70">
                You can create a filesystem and use the credit without a card on file. Accounts
                without one are capped on filesystems, files and storage — the full list is under{' '}
                <a href="#limitations" className="underline underline-offset-2 hover:no-underline">
                  Cost and Limitations
                </a>
                .
              </p>
              <a
                href={DOCS_QUICKSTART}
                className="inline-flex text-body-lg underline underline-offset-4 hover:no-underline"
              >
                Read the quickstart
              </a>
            </div>
            <div>
              {/* Confirmed by the pricing owner, 2026-09-22: a no-card account
                  can still incur charges, and the source doc says the same of
                  filesystems in more than one region. The amounts were described
                  as small, which is not quantified anywhere, so that is not
                  repeated here as a promise. */}
              <h3 className="mb-3 text-h3-lg font-bold">Free to Start Is Not Free of Charges</h3>
              <p className="text-body-lg text-text-primary/70">
                The caps limit capacity, not spending. Usage beyond the monthly credit is charged,
                and creating filesystems in more than one region can produce charges even without a
                card on file.
              </p>
              {AT_THE_LIMIT && <p className="mt-5 text-body-lg">{AT_THE_LIMIT}</p>}
            </div>
          </div>
        </SectionWrapper>

        {/* 02 Worked examples — the section no sibling pricing page has. Two,
            not three: one the credit covers and one it does not. */}
        <SectionWrapper id="monthly-cost" style={{ background: 'primary' }}>
          <SectionHeader
            title="Example Monthly Costs"
            subtitle="Two illustrative calculations at the rates below — one inside the monthly credit and one above it. The usage figures are chosen to show the arithmetic, not to describe a typical workload."
            h2Size="md"
          />
          <p className="mb-6 max-w-[760px] text-body-sm text-carbon-400">
            Both assume non-pooled requests, <code>aws-us-east-1</code> rates, and that the
            organization&rsquo;s full $5 credit is available to these charges.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {EXAMPLES.map((example) => (
              <div key={example.name} className="rounded-lg border border-carbon-800 p-6">
                <h3 className="mb-1 text-h3-sm font-bold">{example.name}</h3>
                <p className="mb-4 text-body-sm text-carbon-400">{example.outcome}</p>
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

        {/* 03 Rate card. The separate definitions list is gone: each row carries
            its own unit and description, so a reader gets the meaning and the
            price on one line instead of reading a glossary and then a table. */}
        <SectionWrapper id="rates" style={{ background: 'gray' }}>
          <SectionHeader title="Rates" h2Size="md" />
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

          {POOLED_EXPLAINER && (
            <>
              <h3 className="mb-3 mt-12 text-h3-lg font-bold">Performance and Pooled</h3>
              <p className="max-w-[720px] text-body-lg text-text-primary/70">{POOLED_EXPLAINER}</p>
            </>
          )}
          {/* Until POOLED_EXPLAINER is answered, the row descriptions are all the
              page says about Pooled. They answer what each meter is measured
              against, not which one a given account pays — so nothing here tells
              a reader, or anything summarising this page, to choose the 100x
              cheaper rows. */}
        </SectionWrapper>

        {/* 04 Cost and Limitations — the family's heading. Everything here is
            the full statement of a limit or a charge boundary; the preview,
            region and credit facts live where they are first needed instead of
            being repeated as a list. */}
        <SectionWrapper id="limitations" style={{ background: 'primary' }}>
          <SectionHeader title="Cost and Limitations" h2Size="md" />
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
              <h3 className="mb-3 text-h3-lg font-bold">What You Can Be Charged for</h3>
              <p className="text-body-lg text-carbon-300">
                The limits above bound capacity. They are not a spending cap. Usage beyond the $5.00
                monthly credit is charged at the rates above, and filesystems in more than one
                region can produce charges even on an account without a card.
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

        <section className="bg-brand-red-bg py-16 text-white">
          <div className="contain">
            <CtaSection
              title="Start with the Credit, Not with a Card"
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
