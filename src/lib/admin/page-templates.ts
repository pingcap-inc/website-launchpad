import type { PageType } from '@/lib/admin/page-types'

export type PageTemplate = {
  id: string
  label: string
  description: string
  tags: string[]
  prompt: string
  pageType?: PageType
}

export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: 'campaign-landing',
    label: 'Campaign landing page',
    description: 'Promote a specific product, feature, or offer with a focused CTA',
    tags: ['Hero', 'Benefits', 'CTA', 'Social proof'],
    prompt: `Create a campaign landing page for PingCAP.

Page goal: [describe the campaign goal, e.g. drive sign-ups for TiDB Cloud free trial]
Key value proposition: [1-2 sentences on what makes this offer compelling]
Target audience: [who this campaign is targeting]
Primary CTA: [what the visitor should do, e.g. "Start free trial"]
Secondary CTA (optional): [e.g. "Talk to sales"]
Social proof to include: [customer logos, stats, testimonials if any]`,
  },
  {
    id: 'event-signup',
    label: 'Event signup page',
    description:
      'Meetup, webinar, or conference page — hero banner, agenda, speakers, HubSpot form',
    tags: ['Hero + HubSpot form', 'Agenda', 'Speakers', 'CTA'],
    pageType: 'event',
    prompt: `Create an event signup page for PingCAP. Follow this exact section structure.

---

PAGE TYPE: Event Page
LAYOUT: Two-column for hero (left: event info, right: HubSpot registration form)

---

## Hero section
Dark background banner with:
- Event label / series name (small text above headline): [e.g. "Lessons from TiDB & Engie"]
- Main headline (large, bold): [e.g. "Scaling the AI-Native Future on a Modern Database"]
- Optional abstract geometric graphic on right side of banner

## Event meta (left column, below hero headline)
- Date: [e.g. 30 April, 2026]
- Time: [e.g. 5:00 PM – 8:00 PM CET]
- Location: [e.g. Comet Meetings, Paris (La Défense)] — make venue name a link if URL available
- Format: [Online / In-person / Hybrid]

## HubSpot registration form (right column, sticky sidebar)
Component: HubspotForm
Props:
  portalId: "[your HubSpot portal ID]"
  formId: "[your HubSpot form ID for this event]"
  region: "na1"
Title above form: "Register to save a seat!"

---

## Event description (full width, below hero)
3 paragraphs:
1. [What this event is, who is co-hosting, and the main theme]
2. [What attendees will experience or discover]
3. [Why this matters — the broader context or urgency]

---

## What's on the Agenda?
Bullet list. Each item: **Bold title:** followed by one sentence description.

- **[Agenda item 1 title]:** [description]
- **[Agenda item 2 title]:** [description]
- **[Add more as needed]**

---

## Who is This Event For?
Two sub-sections:

Sub-section A — "If you're [audience description], you belong here:"
- [audience type 1]
- [audience type 2]
- [audience type 3]

Sub-section B — "By the end of this event, you'll leave with clarity on:"
- [takeaway 1]
- [takeaway 2]
- [takeaway 3]

---

## Speakers
Repeat for each speaker:

Speaker name & title: [Full Name, Job Title, Company]
Company link: [company URL if applicable]
Photo: [image URL or placeholder]
Bio: [3–5 sentences]

---

## SEO
Page title: [Event Name] | TiDB
Meta description: [1–2 sentence summary]
URL slug: /event/[event-slug]/

Generate EXACTLY these sections in this order:
1. type: "hero" with heroForm: {portalId: "[portalId]", formId: "[formId]", region: "na1"}
   background: dark, layout: "split" or "centered"
   If the user has not provided a HubSpot portalId or formId,
   set heroForm: null and generate a plain "hero" without a form instead.
2. type: "agenda" — session schedule
3. type: "speakers" — speaker profiles
4. type: "cta" — final registration CTA
Do NOT add any sections beyond the 4 listed above.`,
  },
  {
    id: 'program-announcement',
    label: 'Program announcement',
    description: 'Launch a new program, partnership, or initiative',
    tags: ['Program overview', 'Benefits', 'Eligibility', 'Apply CTA'],
    prompt: `Create a program announcement page for PingCAP.

Program name: [name of the program]
Program description: [what the program is and who it's for]
Key benefits for participants: [list 3-5 benefits]
Eligibility requirements: [who qualifies]
Application or enrollment process: [how to join]
Timeline: [key dates, e.g. application deadline, program start]
Primary CTA: [e.g. "Apply now" or "Learn more"]`,
  },
  {
    id: 'battle-card',
    label: 'Battle card / competitor comparison',
    description: 'Compare TiDB against a specific competitor for sales enablement',
    tags: ['Hero', 'Key differentiators', 'Comparison table', 'CTA'],
    prompt: `Create a battle card comparison page for PingCAP.

Competitor: [competitor product or company name]
TiDB product being compared: [e.g. TiDB Cloud, TiDB self-managed]
Target reader: [e.g. sales team, prospects evaluating options]
Top 3 reasons to choose TiDB over this competitor:
1. [reason 1]
2. [reason 2]
3. [reason 3]
Key comparison dimensions: [e.g. scalability, cost, MySQL compatibility, HTAP]
Known competitor weaknesses to highlight: [optional]
Primary CTA: [e.g. "See a live demo" or "Start free trial"]

Generate EXACTLY these sections in this order:
1. type: "hero" — headline positioning TiDB vs [competitor]
2. type: "featureHighlights" — top 3 reasons to choose TiDB (key differentiators)
3. type: "comparisonTable" — ourProduct: "TiDB", competitor: "[competitor name]",
   rows covering: scalability, MySQL compatibility, HTAP, operational complexity, cost, support
4. type: "cta" — demo or trial CTA
Do NOT add any sections beyond the 4 listed above.`,
  },
  {
    id: 'listicle',
    label: 'Listicle / ranked list',
    description:
      'SEO listicle for "Top N / Best X" topics with auto-generated table of contents and numbered entries.',
    tags: ['Table of contents', 'Numbered list', 'Rich text', 'CTA'],
    pageType: 'listicle',
    prompt: `Create a listicle page for PingCAP.

Topic: [what is being ranked or listed, e.g. "Top 10 Distributed Databases for 2026"]
Target keyword: [primary SEO keyword]
Number of items: [e.g. 10]
Each item should include: name, brief description, key strengths, and any relevant TiDB comparison points.
Include a FAQ section with 4-6 common questions.
Generate EXACTLY these sections: richTextBlock (intro), richTextBlock (main), faq, cta.`,
  },
  {
    id: 'playbook',
    label: 'Playbook / step-by-step guide',
    description:
      'How-to playbook with steps, code blocks, and callouts; optimized for AEO featured snippets.',
    tags: ['Steps', 'Code block', 'Callout', 'CTA'],
    pageType: 'playbook',
    prompt: `Create a playbook/step-by-step guide for PingCAP.

Topic: [what the guide covers, e.g. "How to Migrate from MySQL to TiDB"]
Target audience: [who this guide is for]
Number of steps: [e.g. 5-7]
Each step should include: clear action title, detailed instructions, tips or warnings.
Include a FAQ section with 4-6 common questions.
Generate EXACTLY these sections: richTextBlock (intro), richTextBlock (steps), faq, cta.`,
  },
  {
    id: 'compare',
    label: 'Comparison / vs page',
    description:
      'Public SEO comparison page with a feature matrix table and objective product tradeoffs.',
    tags: ['Detailed analysis', 'Feature matrix', 'Rich text', 'CTA'],
    pageType: 'compare',
    prompt: `Create a detailed comparison page for PingCAP.

Products: [e.g. TiDB vs CockroachDB]
Target keyword: [e.g. "tidb vs cockroachdb"]
Comparison dimensions: [e.g. compatibility, scaling, HTAP, pricing, operations]
Target audience: [e.g. platform engineers evaluating distributed SQL options]
Include: detailed analysis per dimension, pros/cons, FAQ. If a comparison table exists in source material, summarize it in the intro text instead of using a table section.
Generate EXACTLY these sections: richTextBlock (intro), richTextBlock (detailed analysis per dimension), faq, cta.`,
  },
]
