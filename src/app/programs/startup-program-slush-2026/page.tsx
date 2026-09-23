import type { Metadata } from 'next'
import { ArrowDown, CalendarDays, Globe2, Mail, Mic, TrendingUp } from 'lucide-react'
import { Footer } from '@/components/ui/Footer'
import { Header } from '@/components/ui/Header'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'

const TITLE = 'TiDB Startup Program at Slush 2026 | Invitation Terms'
const DESCRIPTION =
  'Invitation details and promotion terms for eligible EMEA founders in the TiDB Startup Program taking part in PingCAP’s Slush 2026 stage selection.'
const PATH = '/programs/startup-program-slush-2026/'
const PROGRAM_URL =
  'https://www.pingcap.com/tidb-ai-startup-program/?utm_source=email&utm_medium=email&utm_campaign=slush2026_stage_invite&utm_content=program_apply'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
  alternates: { canonical: `https://www.pingcap.com${PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `https://www.pingcap.com${PATH}`,
    siteName: 'TiDB',
    images: [
      {
        url: 'https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PingCAP',
    images: ['https://static.pingcap.com/files/2024/09/11005522/Homepage-Ad.png'],
  },
}

const schema = buildPageSchema({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'TiDB Startup Program at Slush 2026', path: PATH },
  ],
})

const KEY_FACTS = [
  {
    icon: Globe2,
    label: 'Who this is for',
    value: 'Invited founders in EMEA',
    note: 'Participation is region-limited, with EMEA founders as the priority audience.',
  },
  {
    icon: Mail,
    label: 'How to opt in',
    value: 'Reply to your invitation',
    note: 'There is no separate entry form and nothing to pay.',
  },
  {
    icon: CalendarDays,
    label: 'Reply by',
    value: '10 October 2026',
    note: 'Your measurement window begins on the day you confirm.',
  },
  {
    icon: TrendingUp,
    label: 'Growth window closes',
    value: '10 November 2026',
    note: 'We look at the progress you make after confirming, not where you start.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Be in the Program',
    body: 'This is an invitation for founders in the TiDB Startup Program. If you have not joined yet, you can apply during the confirmation window.',
  },
  {
    number: '02',
    title: 'Reply “I’m In”',
    body: 'Reply to the invitation email by 10 October. That reply records your confirmation date and starts your measurement window.',
  },
  {
    number: '03',
    title: 'Build on TiDB Cloud',
    body: 'We observe how your TiDB Cloud usage grows from confirmation through 10 November. Starting from zero does not count against you.',
  },
  {
    number: '04',
    title: 'Tell a Story Worth Sharing',
    body: 'PingCAP weighs usage growth together with the strength and relevance of your founder story when selecting the lineup.',
  },
]

const TERMS = [
  {
    title: 'Organiser',
    body: 'PingCAP, Inc. ("PingCAP"), sponsor of the Slush 2026 side event.',
  },
  {
    title: 'Eligibility',
    body: 'Open to active participants of the TiDB Startup Program (and anyone who joins the TiDB Startup Program by invitation during the confirmation window) who reply to confirm participation before 10 October 2026. PingCAP may verify eligibility at its discretion.',
  },
  {
    title: 'How It Works',
    body: 'From the date a participant confirms, PingCAP will observe that participant’s TiDB Cloud usage growth through 10 November 2026. Selection of the 2–3 founders invited to present is made solely by PingCAP, based on a combination of usage growth and the overall strength and relevance of the founder’s growth story. Achieving the highest usage growth does not by itself guarantee selection, and PingCAP’s decision is final and not subject to appeal or correspondence.',
  },
  {
    title: 'No Guarantee / No Compensation',
    body: 'Confirming participation does not entitle a founder to a stage slot, compensation, or reimbursement of any kind. Travel, accommodation, and related costs to attend Slush in Helsinki are the participant’s own responsibility; PingCAP may, at its discretion, offer an alternative way to share a founder’s story if travel is not feasible.',
  },
  {
    title: 'Changes and Cancellation',
    body: 'PingCAP may amend, suspend, or cancel this promotion, or adjust the number of stage slots or the evaluation period, at any time for legitimate operational reasons, and will notify confirmed participants of any material change.',
  },
  {
    title: 'Data Processing',
    body: 'By confirming participation, you agree that PingCAP will monitor and process usage data associated with your TiDB Cloud account, together with your name and contact details, for the purpose of running this promotion and selecting participants. This data will be handled in accordance with PingCAP’s Privacy Policy and retained only for as long as needed for this purpose. You may contact legal@pingcap.com with questions about this processing or to exercise your data protection rights.',
    privacyLink: true,
  },
  {
    title: 'No Purchase Necessary',
    body: 'Participation and eligibility do not require any purchase or paid usage of TiDB Cloud; existing Startup Program credits may be used.',
  },
]

function StageGraphic() {
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[460px] overflow-hidden border border-carbon-800 bg-carbon/40 p-6 sm:p-8 lg:mx-0">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-brand-red-primary/50" />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-carbon-700" />
      <div className="absolute inset-x-6 top-6 h-px bg-brand-red-primary sm:inset-x-8 sm:top-8" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-6 pt-5">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-carbon-400">
            Founder stage
            <Mic className="h-4 w-4 text-brand-red-primary" strokeWidth={1.5} aria-hidden="true" />
          </p>
          <p className="font-mono text-xs text-carbon-400">Helsinki · 2026</p>
        </div>
        <div>
          <p className="font-mono text-[72px] font-bold leading-none tracking-[-0.08em] text-white sm:text-[96px]">
            3
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-2 w-2 bg-brand-red-primary" />
            <p className="text-body-md text-carbon-300">Up to three founder slots</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2" aria-hidden="true">
          <span className="h-8 border border-carbon-800" />
          <span className="h-8 border border-carbon-800 bg-brand-red-primary" />
          <span className="h-8 border border-carbon-800" />
        </div>
      </div>
    </div>
  )
}

function PrivacyLinkedBody({ body }: { body: string }) {
  const marker = 'Privacy Policy'
  const [before, after] = body.split(marker)

  return (
    <>
      {before}
      <a
        href="https://www.pingcap.com/privacy-policy/"
        className="font-medium underline decoration-carbon-400 underline-offset-4 transition-colors duration-150 ease-in-out hover:decoration-brand-red-primary"
      >
        {marker}
      </a>
      {after}
    </>
  )
}

export default function StartupProgramSlush2026Page() {
  return (
    <>
      <JsonLd data={schema} />
      <Header />

      <main className="bg-white pt-[62px] text-text-primary lg:pt-20">
        <section className="relative overflow-hidden bg-bg-primary text-white">
          <div className="contain grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-24">
            <div>
              <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-carbon-300">
                <span className="h-2 w-2 bg-brand-red-primary" />
                TiDB Startup Program · Slush 2026
              </p>
              <h1 className="max-w-[760px] text-pretty text-h1-mb font-bold leading-[1.04] tracking-[-0.035em] md:text-h1">
                A Slush Stage for Founders Building on TiDB
              </h1>
              <p className="mt-6 max-w-[650px] text-pretty text-body-xl text-carbon-300 sm:text-body-2xl">
                PingCAP is inviting eligible founders in EMEA to build, grow and share what they
                have made. Up to three founders will present at our Slush 2026 side event.
              </p>
              <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href="#key-details"
                  className="group inline-flex h-11 items-center gap-3 bg-white px-5 text-base font-medium text-black transition-colors duration-200 ease-in-out hover:bg-brand-red-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Read the invitation details
                  <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
                </a>
                <SecondaryButton href={PROGRAM_URL}>Apply to the Startup Program</SecondaryButton>
              </div>
            </div>
            <StageGraphic />
          </div>
        </section>

        <section id="key-details" className="scroll-mt-24 border-b border-carbon-200 bg-white">
          <div className="contain py-16 sm:py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-red-dark">
                  The short version
                </p>
                <h2 className="max-w-[520px] text-pretty text-h2-mb font-bold leading-[1.08] tracking-[-0.025em] md:text-h2-sm">
                  What You Need to Know Before Opting in
                </h2>
                <p className="mt-5 max-w-[540px] text-pretty text-body-lg text-carbon-700">
                  This page explains the invitation and records the promotion terms. Your reply to
                  the email is what confirms participation.
                </p>
              </div>
              <div className="grid border-t border-carbon-300 sm:grid-cols-2">
                {KEY_FACTS.map(({ icon: Icon, label, value, note }, index) => (
                  <article
                    key={label}
                    className={`border-b border-carbon-300 py-7 sm:px-7 ${
                      index % 2 === 0 ? 'sm:border-r' : ''
                    }`}
                  >
                    <Icon className="mb-5 h-6 w-6 text-brand-red-primary" strokeWidth={1.5} />
                    <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-carbon-700">
                      {label}
                    </p>
                    <h3 className="text-h3-lg font-bold leading-tight">{value}</h3>
                    <p className="mt-3 text-body-md leading-7 text-carbon-800">{note}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg-gray">
          <div className="contain py-16 sm:py-20 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-red-dark">
                  Eligibility and regional scope
                </p>
                <h2 className="max-w-[520px] text-pretty text-h2-mb font-bold leading-[1.08] tracking-[-0.025em] md:text-h2-sm">
                  An Invitation for Founders in EMEA
                </h2>
              </div>
              <div className="max-w-[720px] space-y-5 text-pretty text-body-lg leading-8 text-carbon-900">
                <p>
                  This activity is invitation-only and region-limited. Founders based in EMEA are
                  the priority audience, and PingCAP may verify eligibility before confirming
                  participation.
                </p>
                <p>
                  You must be part of the TiDB Startup Program to take part. If you are not yet in
                  the program, you can apply during the confirmation window. Joining the program
                  does not reserve a stage slot; it puts an eligible founder in scope for the
                  invitation and selection process.
                </p>
                <SecondaryButton href={PROGRAM_URL} dark={false}>
                  Apply to the TiDB Startup Program
                </SecondaryButton>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 bg-white">
          <div className="contain py-16 sm:py-20 lg:py-24">
            <div className="mb-12 max-w-[760px]">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-red-dark">
                How it works
              </p>
              <h2 className="text-pretty text-h2-mb font-bold leading-[1.08] tracking-[-0.025em] md:text-h2-sm">
                Four Steps from Invitation to Stage
              </h2>
            </div>
            <ol className="grid border-t border-carbon-300 md:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, index) => (
                <li
                  key={step.number}
                  className={`border-b border-carbon-300 py-7 md:px-6 lg:min-h-[310px] lg:py-8 ${
                    index < 3 ? 'lg:border-r' : ''
                  } ${index % 2 === 0 ? 'md:border-r' : ''}`}
                >
                  <span className="font-mono text-sm text-brand-red-primary">{step.number}</span>
                  <h3 className="mt-14 text-h3-lg font-bold leading-tight lg:mt-20">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-body-md leading-7 text-carbon-800">{step.body}</p>
                </li>
              ))}
            </ol>
            <aside className="mt-8 border-l-2 border-brand-red-primary pl-5 text-body-md leading-7 text-carbon-800 sm:max-w-[820px] sm:pl-7">
              The highest usage growth does not automatically secure a slot. PingCAP makes the final
              selection by considering both measurable growth and the story’s relevance to a Slush
              audience.
            </aside>
          </div>
        </section>

        <section id="promotion-terms" className="scroll-mt-24 border-t border-carbon-200 bg-white">
          <div className="contain py-16 sm:py-20 lg:py-24">
            <div className="grid gap-12 lg:grid-cols-[280px_minmax(0,820px)] lg:gap-20">
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-red-dark">
                  Formal terms
                </p>
                <h2 className="text-h2-mb font-bold leading-[1.08] tracking-[-0.025em]">
                  Founder Stage Participation Terms
                </h2>
                <p className="mt-5 text-body-md leading-7 text-carbon-700">
                  These terms govern participation in the Slush 2026 founder stage selection.
                </p>
              </aside>

              <article>
                <div className="border-y border-carbon-300 py-7 text-body-lg leading-8 text-carbon-900 sm:py-8">
                  This is a skill- and merit-based competition, not a game of chance, prize draw, or
                  lottery. No entry fee or purchase is required, and no such requirement applies at
                  any stage.
                </div>
                <dl>
                  {TERMS.map((term, index) => (
                    <div
                      key={term.title}
                      className="grid gap-3 border-b border-carbon-300 py-7 sm:grid-cols-[190px_1fr] sm:gap-8 sm:py-8"
                    >
                      <dt className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-carbon-900">
                        <span className="mr-3 text-brand-red-primary">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {term.title}
                      </dt>
                      <dd className="text-body-md leading-7 text-carbon-900 sm:text-body-lg sm:leading-8">
                        {term.privacyLink ? <PrivacyLinkedBody body={term.body} /> : term.body}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-brand-red-bg text-white">
          <div className="contain grid gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:py-20">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-red-light">
                Not in the program yet?
              </p>
              <h2 className="max-w-[760px] text-pretty text-h2-mb font-bold leading-[1.08] tracking-[-0.025em] md:text-h2-sm">
                Apply Before the Confirmation Window Closes
              </h2>
              <p className="mt-5 max-w-[680px] text-body-lg leading-8 text-carbon-100">
                The TiDB Startup Program is free to join. Eligible founders who apply during the
                window can enter the invitation pool for this activity.
              </p>
            </div>
            <SecondaryButton href={PROGRAM_URL} className="w-fit">
              Apply to the Startup Program
            </SecondaryButton>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
