/**
 * Content model for the /solutions/* standard section template.
 *
 * Every solution page is one `SolutionPageData` object rendered by <SolutionTemplate>.
 * Field names map one-to-one to the content fields /admin will need (see the PR
 * handoff note). Body strings support inline links written as `[label](url)`.
 */

export interface Link {
  text: string
  href: string
}

export interface Img {
  src: string
  alt: string
  width?: number
  height?: number
}

/** A Lucide icon by name, for cards whose live version had no image icon. */
export interface LucideIconRef {
  lucide:
    | 'Activity'
    | 'Bot'
    | 'Clock'
    | 'Database'
    | 'Gauge'
    | 'GitBranch'
    | 'Layers'
    | 'Network'
    | 'Shield'
    | 'ShoppingCart'
    | 'Zap'
}

export type CardIcon = Img | LucideIconRef

/** Shared header fields for a section: optional eyebrow, H2, intro paragraphs. */
export interface SectionIntro {
  eyebrow?: string
  title: string
  paragraphs?: string[]
}

/** §1 Hero. Headline and subheadline must match the live page exactly. */
export interface HeroData {
  headline: string
  subheadline: string
  primaryCta: Link
  secondaryCta: Link
  backgroundImage: string
}

/** §2 Logo bar: 6 to 10 customer logos. */
export interface LogoBarData {
  title: string
  logos: { name: string; src: string; href?: string }[]
}

/** §3 The problem: exactly 3 cards. */
export interface ProblemData extends SectionIntro {
  cards: { icon: CardIcon; title: string; body: string }[]
}

/** §4 How TiDB solves it: 3 or 4 capability cards. */
export interface SolutionData extends SectionIntro {
  cards: {
    icon: CardIcon
    title: string
    body?: string
    /** Sub-points (H4 + text) when the source had them, e.g. Modernize MySQL. */
    points?: { heading: string; body: string }[]
    link?: Link
  }[]
  /** Optional button under the intro (e.g. "Book a Demo"). */
  cta?: Link
}

/** §5 Workloads: 4 cards in a 2x2 grid, up to two links per card. */
export interface WorkloadsData extends SectionIntro {
  cards: { icon: CardIcon; tag?: string; title: string; body: string; links?: Link[] }[]
}

/** §6a How it works: either steps or feature tabs. */
export interface HowItWorksData extends SectionIntro {
  steps?: {
    icon: Img
    title: string
    body: string
    /** Optional list under the body, with its own lead-in label (e.g. "You’ll get"). */
    listLabel?: string
    list?: string[]
  }[]
  tabs?: {
    id: string
    label: string
    bullets: string[]
    image: Img
  }[]
}

/** §6b Comparison: tabs (two columns per tab) or a check-mark matrix. Heading optional. */
export interface ComparisonData extends Omit<SectionIntro, 'title'> {
  title?: string
  tabs?: {
    id: string
    label: string
    columns: [ComparisonColumn, ComparisonColumn]
  }[]
  matrix?: {
    columns: string[]
    rows: { label: string; image?: Img; checks: boolean[] }[]
    /** Hint shown on narrow screens where the table scrolls sideways. */
    mobileHint?: string
  }
}

export interface ComparisonColumn {
  heading: string
  headingStyle: 'label' | 'h4'
  tone: 'red' | 'blue' | 'teal'
  image: Img
  items: string[]
}

/** §7 Customer proof: 3 case cards, optional stats row, optional single quote. */
export interface ProofData extends SectionIntro {
  cases?: {
    logo?: Img
    title: string
    description: string
    /** Only a figure the linked case study publishes, word for word. Omit otherwise. */
    stat?: { value: string; label: string }
    href: string
    cta?: string
  }[]
  /** Video stories used instead of case cards where a page only links videos (SaaS). */
  videos?: { url: string; thumbnail: string; quote: string; name: string; role: string }[]
  stats?: { value: string; label: string }[]
  quote?: {
    quote: string
    name: string
    role?: string
    logo?: Img
    href?: string
    /** Rating line (e.g. Gartner Peer Insights 4.9 stars). Only when the source is cited. */
    rating?: { title: string; badge: Img; stars: Img }
  }
  cta?: Link
}

/** §8 FAQ: 4 to 6 entries. Emitted as FAQPage schema. */
export interface FaqData {
  title?: string
  items: { q: string; a: string }[]
}

/** §9 Resources: the page's own datasheet/brief, white papers, case studies, labs. */
export interface ResourcesData {
  title: string
  items: { type: string; title: string; description?: string; href: string; cta: string }[]
}

export interface SolutionPageData {
  hero: HeroData
  logos: LogoBarData
  /** Required by the template; omitted only where the page has no source copy (listed as a gap). */
  problem?: ProblemData
  solution: SolutionData
  /** Required by the template; omitted only where the page has no source copy (listed as a gap). */
  workloads?: WorkloadsData
  howItWorks?: HowItWorksData
  comparison?: ComparisonData
  proof: ProofData
  faq: FaqData
  resources: ResourcesData
}
