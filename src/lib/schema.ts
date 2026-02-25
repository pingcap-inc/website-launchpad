/**
 * buildPageSchema
 *
 * Generates a Yoast-compatible JSON-LD @graph structure.
 * Every Next.js page must use this instead of standalone schema objects,
 * so Google sees a consistent schema contract across WordPress and Next.js pages.
 *
 * Yoast @graph always includes: WebSite + Organization + WebPage + BreadcrumbList
 * Page-specific schemas (SoftwareApplication, Article, FAQPage, etc.) are appended
 * to the same graph via the `extraSchemas` param.
 *
 * Usage:
 *   import { buildPageSchema } from '@/lib/schema'
 *
 *   // In page.tsx
 *   const schema = buildPageSchema({
 *     path: '/tidb/',
 *     title: 'TiDB — Distributed SQL Database',
 *     description: 'Open-source HTAP database...',
 *     pageType: 'WebPage',
 *     breadcrumbs: [
 *       { name: 'Home', path: '/' },
 *       { name: 'TiDB', path: '/tidb/' },
 *     ],
 *     extraSchemas: [softwareApplicationSchema({ ... })],
 *   })
 */

const SITE_URL = 'https://www.pingcap.com'
const SITE_NAME = 'TiDB | SQL at Scale'
const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Breadcrumb {
  name: string
  path: string // e.g. '/tidb/' — no domain
}

export interface BuildPageSchemaOptions {
  /** Page path, e.g. '/tidb/' */
  path: string
  /** Page <title> text */
  title: string
  /** Page meta description */
  description: string
  /** Schema @type for the WebPage node. Default: 'WebPage' */
  pageType?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'ItemPage'
  /** Breadcrumb trail including Home. Always start with { name: 'Home', path: '/' } */
  breadcrumbs?: Breadcrumb[]
  /** Extra schema nodes to append to the @graph (e.g. SoftwareApplication, Article) */
  extraSchemas?: Record<string, unknown>[]
  /** ISO 8601 date string — required for Article pageType */
  datePublished?: string
  /** ISO 8601 date string — required for Article pageType */
  dateModified?: string
  /** OG image URL */
  image?: string
}

// ─── Main builder ─────────────────────────────────────────────────────────────

export function buildPageSchema({
  path,
  title,
  description,
  pageType = 'WebPage',
  breadcrumbs,
  extraSchemas = [],
  datePublished,
  dateModified,
  image,
}: BuildPageSchemaOptions): Record<string, unknown> {
  const pageUrl = `${SITE_URL}${path}`
  const pageId = `${pageUrl}#webpage`
  const breadcrumbId = `${pageUrl}#breadcrumb`

  const graph: Record<string, unknown>[] = [
    // 1. WebSite
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { '@id': ORG_ID },
    },

    // 2. Organization
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'PingCAP',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: 'https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg',
        width: 120,
        height: 50,
      },
      sameAs: [
        'https://twitter.com/PingCAP',
        'https://github.com/pingcap',
        'https://www.linkedin.com/company/pingcap',
      ],
    },

    // 3. WebPage
    {
      '@type': pageType,
      '@id': pageId,
      url: pageUrl,
      name: title,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORG_ID },
      ...(image && { image: { '@type': 'ImageObject', url: image } }),
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
      ...(breadcrumbs && breadcrumbs.length > 0 && {
        breadcrumb: { '@id': breadcrumbId },
      }),
    },
  ]

  // 4. BreadcrumbList (optional)
  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    })
  }

  // 5. Extra page-specific schemas
  graph.push(...extraSchemas)

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

// ─── Extra schema builders ────────────────────────────────────────────────────

/** SoftwareApplication — use on product pages */
export function softwareApplicationSchema(options: {
  name: string
  description: string
  url: string
  price?: string
}): Record<string, unknown> {
  return {
    '@type': 'SoftwareApplication',
    name: options.name,
    applicationCategory: 'DatabaseApplication',
    operatingSystem: 'Linux, macOS, Windows',
    description: options.description,
    url: options.url,
    offers: {
      '@type': 'Offer',
      price: options.price ?? '0',
      priceCurrency: 'USD',
    },
  }
}

/** Article — use on SEO content pages */
export function articleSchema(options: {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  image?: string
}): Record<string, unknown> {
  return {
    '@type': 'Article',
    headline: options.title,
    description: options.description,
    url: options.url,
    datePublished: options.datePublished,
    dateModified: options.dateModified,
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
    ...(options.image && { image: { '@type': 'ImageObject', url: options.image } }),
  }
}



/** FAQPage — append to any page that has FAQ content */
export function faqSchema(
  items: { question: string; answer: string }[]
): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/**
 * DefinedTerm — use for individual glossary term pages
 * e.g. /glossary/htap/
 *
 * Usage:
 *   extraSchemas: [definedTermSchema({
 *     name: 'HTAP',
 *     description: 'Hybrid Transactional and Analytical Processing...',
 *     url: '/glossary/htap/',
 *   })]
 */
export function definedTermSchema(options: {
  name: string
  description: string
  url: string
  /** The glossary index page URL. Default: /glossary/ */
  termSetUrl?: string
  /** Alternate names or abbreviations */
  alternateName?: string[]
}): Record<string, unknown> {
  return {
    '@type': 'DefinedTerm',
    name: options.name,
    description: options.description,
    url: `${SITE_URL}${options.url}`,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      '@id': `${SITE_URL}${options.termSetUrl ?? '/glossary/'}`,
      name: 'TiDB & Database Glossary',
      url: `${SITE_URL}${options.termSetUrl ?? '/glossary/'}`,
    },
    ...(options.alternateName && { alternateName: options.alternateName }),
  }
}

/**
 * DefinedTermSet — use on the glossary index page (/glossary/)
 * Lists all terms as a collection.
 *
 * Usage:
 *   extraSchemas: [glossaryIndexSchema({ termCount: 42 })]
 */
export function glossaryIndexSchema(options?: {
  termCount?: number
}): Record<string, unknown> {
  return {
    '@type': 'DefinedTermSet',
    '@id': `${SITE_URL}/glossary/`,
    name: 'TiDB & Database Glossary',
    description: 'Definitions of key database, distributed systems, and cloud-native terms used across TiDB documentation and products.',
    url: `${SITE_URL}/glossary/`,
    publisher: { '@id': ORG_ID },
    ...(options?.termCount && { numberOfItems: options.termCount }),
  }
}
