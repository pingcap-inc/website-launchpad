import type { Metadata } from 'next'
import { JsonLd } from '@/components/ui/JsonLd'
import { buildPageSchema } from '@/lib/schema'
import { PageRenderer } from '@/lib/page-renderer'
import type { PageDSL } from '@/lib/dsl-schema'

const TITLE = 'TiDB Startup Program at Slush 2026 | Stage Invitation'
const DESCRIPTION =
  'How founders in the TiDB Startup Program can take part in the stage invitation at our Slush 2026 side event, and the full promotion terms.'
const PATH = '/programs/startup-program-slush-2026/'

// Time-boxed promotion terms, reached by direct link from the invitation email.
// Deliberately kept out of search: it should not outrank the Startup Program page,
// and it stops being accurate once the window closes.
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

const OVERVIEW = `## What this is

PingCAP is sponsoring a side event at Slush 2026 in Helsinki. We are keeping part of it for
founders in the TiDB Startup Program: two or three founders will each have about twenty minutes
on stage to talk about what they have built.

**[TBD — side event name, date, venue and how attendees get in.]**

## How to take part

Reply to the invitation email to confirm. There is no entry form and nothing to pay.

From the day you confirm, we look at how your usage on TiDB Cloud grows, up to 10 November 2026.
What counts is the distance you cover after you confirm, not where you start.

**The last day to opt in is 10 October 2026.**

## Who can take part

Founders in the TiDB Startup Program. The program is free to join, and joining takes a few
minutes: [Apply to the TiDB Startup Program](https://www.pingcap.com/tidb-ai-startup-program/).

## How founders are chosen

We weigh usage growth alongside how well the story will land with a Slush audience. The highest
number does not by itself win a slot. The full terms are below.`

const TERMS = `## Promotion Terms

This is a skill- and merit-based competition, not a game of chance, prize draw, or lottery. No
entry fee or purchase is required, and no such requirement applies at any stage.

- **Organiser:** PingCAP, Inc. ("PingCAP"), sponsor of the Slush 2026 side event.
- **Eligibility:** Open to active participants of the TiDB Startup Program (and anyone who joins
  the TiDB Startup Program by invitation during the confirmation window) who reply to confirm
  participation before 10 October 2026. PingCAP may verify eligibility at its discretion.
- **How it works:** From the date a participant confirms, PingCAP will observe that participant's
  TiDB Cloud usage growth through 10 November 2026. Selection of the 2–3 founders invited to
  present is made solely by PingCAP, based on a combination of usage growth and the overall
  strength and relevance of the founder's growth story. Achieving the highest usage growth does
  not by itself guarantee selection, and PingCAP's decision is final and not subject to appeal or
  correspondence.
- **No guarantee / no compensation:** Confirming participation does not entitle a founder to a
  stage slot, compensation, or reimbursement of any kind. Travel, accommodation, and related costs
  to attend Slush in Helsinki are the participant's own responsibility; PingCAP may, at its
  discretion, offer an alternative way to share a founder's story if travel is not feasible.
- **Changes and cancellation:** PingCAP may amend, suspend, or cancel this promotion, or adjust
  the number of stage slots or the evaluation period, at any time for legitimate operational
  reasons, and will notify confirmed participants of any material change.
- **Data processing:** By confirming participation, you agree that PingCAP will monitor and
  process usage data associated with your TiDB Cloud account, together with your name and contact
  details, for the purpose of running this promotion and selecting participants. This data will be
  handled in accordance with PingCAP's
  [Privacy Policy](https://www.pingcap.com/privacy-policy/) and retained only for as long as
  needed for this purpose. You may contact legal@pingcap.com with questions about this processing
  or to exercise your data protection rights.
- **No purchase necessary:** Participation and eligibility do not require any purchase or paid
  usage of TiDB Cloud; existing Startup Program credits may be used.`

const dsl: PageDSL = {
  pageName: TITLE,
  meta: {
    title: TITLE,
    description: DESCRIPTION,
    canonical: PATH,
  },
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        layout: 'centered',
        eyebrow: 'TiDB Startup Program',
        headline: 'An hour of our Slush 2026 side event, for founders in the program',
        subheadline:
          'Two or three founders will present on stage. This page explains how to take part and the terms that apply.',
      },
    },
    {
      id: 'overview',
      type: 'richTextBlock',
      props: {
        content: OVERVIEW,
      },
      style: {
        spacing: 'md',
      },
    },
    {
      id: 'terms',
      type: 'richTextBlock',
      props: {
        content: TERMS,
      },
      style: {
        spacing: 'md',
      },
    },
    {
      id: 'cta',
      type: 'cta',
      props: {
        title: 'Not in the TiDB Startup Program yet?',
        subtitle: 'Joining is free and takes a few minutes. Apply before 10 October 2026.',
        primaryCta: {
          text: 'Apply to the Startup Program',
          href: 'https://www.pingcap.com/tidb-ai-startup-program/',
        },
      },
      style: {
        background: 'brand-violet',
        spacing: 'md',
      },
    },
  ],
}

export default function StartupProgramSlush2026Page() {
  return (
    <>
      <JsonLd data={schema} />
      <PageRenderer dsl={dsl} withChrome />
    </>
  )
}
