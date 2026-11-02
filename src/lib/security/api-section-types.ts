import type { SectionType } from '@/lib/dsl-schema'

/**
 * Runtime list of the `SectionType` union, for validating DSL that arrives over the
 * API. Typed as `Record<SectionType, true>` so adding or removing a member of the
 * union without updating this map is a type error — the two cannot drift apart.
 */
const SECTION_TYPE_MAP: Record<SectionType, true> = {
  hero: true,
  stats: true,
  featureGrid: true,
  featureCard: true,
  caseStudyCards: true,
  featureTabs: true,
  featureHighlights: true,
  featureMedia: true,
  columns: true,
  logoCloud: true,
  testimonials: true,
  faq: true,
  cta: true,
  form: true,
  agenda: true,
  speakers: true,
  comparisonTable: true,
  richTextBlock: true,
  shortcode: true,
  tableOfContents: true,
  codeBlock: true,
}

export const SECTION_TYPES: ReadonlySet<string> = new Set(Object.keys(SECTION_TYPE_MAP))

export function isSectionType(value: unknown): value is SectionType {
  return typeof value === 'string' && SECTION_TYPES.has(value)
}

/**
 * The first section whose `type` is not a known SectionType (or that is not an
 * object at all), as `{ index, type }`; null when every section is valid.
 */
export function findInvalidSection(sections: unknown[]): { index: number; type: string } | null {
  for (let index = 0; index < sections.length; index++) {
    const section = sections[index] as { type?: unknown } | null
    if (!section || typeof section !== 'object' || !isSectionType(section.type)) {
      const type = section && typeof section === 'object' ? String(section.type) : typeof section
      return { index, type: type.slice(0, 64) }
    }
  }
  return null
}
