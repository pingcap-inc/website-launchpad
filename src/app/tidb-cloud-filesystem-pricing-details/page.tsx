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

// Pooled operation SKUs removed 2026-10-16 at the pricing owner's direction:
// reads and writes are one flat rate each. The two storage lines remain; how
// usage is placed between them is not stated on the page until confirmed.

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
  'At a limit, your existing files stay readable and the file system stops accepting new writes. The TiDB Cloud console shows a warning. With a card on file, usage beyond the free-tier allowance is billed as overage on your monthly invoice.'

// ── Source of truth ──────────────────────────────────────────────────────────
// "TiDB Cloud Filesystem Pricing Public Preview" (Feishu), v9 2026-09-22, with
// the two pooled operation SKUs removed at the pricing owner's direction on
// 2026-10-16. Pricing is being revised with finance; the page shows the current
// rates only, and its worked examples are removed until the new rates are final.
// The source doc has changed content WITHOUT bumping its version before, so
// re-derive every figure against the doc itself, not its version string. The
// `Discountable` column is internal and is not reproduced anywhere on this page.
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
  'gcp-us-east1',
]

// Rows carry the source doc's own Description where it helps the reader; the
// read and write rows carry none, at the pricing owner's direction. Prices are
// in REGIONS order.
const RATES = [
  {
    meter: 'Read operations, per 1,000 requests',
    note: '',
    prices: ['$0.04', '$0.04', '$0.04', '$0.04', '$0.04'],
  },
  {
    meter: 'Write operations, per 1,000 requests',
    note: '',
    prices: ['$0.50', '$0.50', '$0.50', '$0.50', '$0.50'],
  },
  {
    meter: 'Storage — Performance, per GB-mo',
    note: 'Smaller files, stored in TiDB for fast access',
    prices: ['$0.30', '$0.30', '$0.36', '$0.32', '$0.30'],
  },
  {
    meter: 'Storage — Pooled, per GB-mo',
    note: 'Larger files, stored in cloud object storage',
    prices: ['$0.025', '$0.025', '$0.027', '$0.019', '$0.022'],
  },
  {
    meter: 'Internet egress, per GB',
    note: 'Data transfer out to the internet',
    prices: ['$0.09', '$0.09', '$0.12', '$0.08', '$0.12'],
  },
]

// Verified live on docs.pingcap.com 2026-09-21.
// Agreed 2026-09-24 as the single Filesystem quickstart entrance, so this page
// and the product page send readers to the same place.
const DOCS_QUICKSTART = 'https://docs.pingcap.com/tidbcloud-filesystem/filesystem-quick-start/'
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
  'TiDB Cloud Filesystem pricing for reads, writes, storage and egress, with a monthly free-tier allowance per organization. View rates and limits.'
// Shares the product page's social card. Lives in `public/` and is mirrored to
// the CDN by the deploy workflow (`public/` -> s3://uploads-pingcap-com/launchpad/),
// so the absolute URL is the CDN one — crawlers fetch it directly, and it only
// resolves once this branch is deployed.
const OG_IMAGE =
  'https://static.pingcap.com/launchpad/images/social/tidb-cloud-filesystem-social.png'

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
  'TiDB Cloud Filesystem does not support a configurable spending limit. The monthly free-tier allowance reduces your charges; it is not a maximum monthly bill.'
const FAQ_ITEMS = [
  {
    q: 'Does each file system get its own free-tier allowance?',
    a: 'No. The monthly free-tier allowance is shared by all file system usage in your organization, across regions. Creating another file system does not add another allowance.',
  },
  {
    q: 'Does the free-tier allowance raise the no-card storage limit?',
    a: 'No. The no-card storage cap is a separate limit of 2 GB per file system and does not change with the allowance. Accounts with a card on file are exempt from the listed no-card limits.',
  },
  { q: 'Can I set a monthly spending limit?', a: SPENDING_LIMIT_ANSWER },
  {
    q: 'What happens when a file system reaches a limit?',
    a: 'It stops accepting writes, and existing files stay readable. The TiDB Cloud console shows a warning, and write requests are rejected once the limit is in force. With a card on file, usage beyond the free-tier allowance is billed as overage on your monthly invoice rather than blocked.',
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
            Pay as you go for reads, writes, storage and egress, with a monthly free-tier allowance.
            No tiered plans.
          </p>
          {/* A pricing page is a common first landing point, and a reader who does
              not yet know what the product is had no route to it from here. The
              product page is the parent of this one in the breadcrumb and shares
              its schema @id; it belongs in the hero, not only in a footnote
              eight headings down. */}
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
            {/* 2026-10-15: pricing and the SKU list are being revised (two pooled
                operation SKUs are expected to be removed). The page stays up with
                the current rates rather than being taken down, because the product
                page links here and these are the rates in effect today. No
                effective date or advance-notice commitment is stated, because
                neither has been confirmed. */}
            <p id="preview-pricing-notice" className="mb-3 text-h3-sm font-bold">
              Public preview pricing is being updated
            </p>
            <p>
              The rates on this page are the current public preview rates. Updated pricing will be
              published on this page.{' '}
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
            subtitle="Every organization gets a monthly free-tier allowance for Filesystem, shared across all its file systems and regions."
            className="mb-8"
            h2Size="md"
          />
          <div className="grid gap-10 lg:grid-cols-1">
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">What Can I Use Without a Card?</h3>
              <p className="mb-4 text-body-lg text-text-primary/70">
                You can start without a credit card, with one file system per region. Each
                filesystem can hold up to 2,000 files and 2 GB in total; each file can be up to 500
                MB.
              </p>
              <p className="mb-4 text-body-lg text-text-primary/70">
                The free-tier allowance covers usage charges; it does not increase these limits.
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
                The free-tier allowance reduces your charges; it is not a maximum monthly bill, and
                there is no configurable spending limit. See{' '}
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
                  multiply by the rate.
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
                  Multiply the GB you keep for the month by the rate. Billing is monthly and
                  prorated by the hour.
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
                  Multiply the GB transferred out by the rate. Use the amount transferred out, not
                  the total amount you have stored.
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Example Monthly Bills removed 2026-10-15 while pricing is revised. Both
            examples were built mostly from the two pooled operation SKUs that are
            expected to be dropped, so they would be the first thing on the page to
            go stale. Restore from git history once the new rates are final, and
            re-derive every line. */}

        <SectionWrapper id="rates" style={{ background: 'gray' }}>
          <SectionHeader
            title="Rates and How Billing Works"
            subtitle="Use the rate for each category of your usage, then add those charges together. All five billing items are listed below, for every region where Filesystem is priced."
            className="mb-8"
            h2Size="md"
          />
          {/* Lead with the uniformity. A reader scanning five columns of numbers
              should be told first which ones they do not need to compare. */}
          <p className="mb-6 max-w-[760px] text-body-lg text-text-primary/70">
            Read and write operations cost the same in every region — $0.04 and $0.50 per 1,000
            requests. Storage and egress differ by region. Storage is placed automatically by file
            size. You don&rsquo;t choose between the two storage types.
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
                      {rate.note && (
                        <span className="block text-body-sm text-text-primary/60">{rate.note}</span>
                      )}
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
            All prices in USD. Billed monthly, prorated by the hour. Regions are added gradually —{' '}
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
              <h3 className="mb-3 text-h3-lg font-bold">Without a Credit Card on File</h3>
              <ul className="space-y-2 text-body-lg text-carbon-300">
                <li>One file system per region</li>
                <li>2,000 files per file system</li>
                <li>2 GB of storage per file system</li>
                <li>500 MB maximum for a single file</li>
              </ul>
              {AT_THE_LIMIT && <p className="mt-4 text-body-lg text-carbon-300">{AT_THE_LIMIT}</p>}
              <p className="mt-4 text-body-lg text-carbon-300">
                Accounts with a card on file are exempt from these limits.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-h3-lg font-bold">Your Free-Tier Allowance and Spending</h3>
              <p className="text-body-lg text-carbon-300">{SPENDING_LIMIT_ANSWER}</p>
              {/* Removed 2026-09-24 at the owner's direction: a sentence saying
                  multi-region use "can also produce charges" without saying what
                  the charge is. SEO review flagged it as unclear, and nothing
                  published explains it further. See also the note in Start Free. */}
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
              title="Start with Your Monthly Free-Tier Allowance"
              subtitle="Create a file system and try it with your organization's monthly free-tier allowance."
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
