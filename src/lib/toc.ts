import { PageDSL, SectionDefinition } from '@/lib/dsl-schema'
import type { PageType } from '@/lib/admin/page-types'

type TocItem = { id: string; label: string; level?: 1 | 2 }

const LONG_FORM_PAGE_TYPES = new Set(['listicle', 'playbook', 'compare'])

const headingRegex = /^(#{2,4})\s+(.+)$/

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function extractHeadingItems(content: string): TocItem[] {
  const items: TocItem[] = []
  const seen = new Set<string>()
  for (const line of content.split('\n')) {
    const match = line.match(headingRegex)
    if (!match) continue
    const level = match[1].length
    const label = match[2].trim()
    if (!label) continue
    const id = slugifyHeading(label)
    if (!id || seen.has(id)) continue
    items.push({ id, label, level: level === 2 ? 1 : 2 })
    seen.add(id)
  }
  return items
}

function collectTocItems(sections: SectionDefinition[]): TocItem[] {
  const items: TocItem[] = []
  const seen = new Set<string>()
  for (const section of sections) {
    if (section.type === 'richTextBlock') {
      const content = (section.props as { content?: string }).content ?? ''
      const headingItems = extractHeadingItems(content)
      for (const item of headingItems) {
        if (seen.has(item.id)) continue
        items.push(item)
        seen.add(item.id)
      }
    }
    if (section.type === 'faq') {
      const title = (section.props as { title?: string }).title?.trim() || 'FAQ'
      const id = section.id
      if (!seen.has(id)) {
        items.push({ id, label: title, level: 1 })
        seen.add(id)
      }
    }
  }
  return items
}

function normalizePageType(pageType?: PageType) {
  return pageType?.toLowerCase() as PageType | undefined
}

function createUniqueTocId(sections: SectionDefinition[], base = 'tableOfContents-1') {
  const existing = new Set(sections.map((section) => section.id))
  if (!existing.has(base)) return base
  let i = 2
  while (existing.has(`tableOfContents-${i}`)) i += 1
  return `tableOfContents-${i}`
}

export function addTableOfContentsForLongForm(dsl: PageDSL, pageType?: PageType): PageDSL {
  const normalizedType = normalizePageType(pageType)
  if (!normalizedType || !LONG_FORM_PAGE_TYPES.has(normalizedType)) return dsl

  const sections = dsl.sections
  const tocItems = collectTocItems(sections)
  if (tocItems.length === 0) return dsl

  const tocIndex = sections.findIndex((section) => section.type === 'tableOfContents')
  const heroIndex = sections.findIndex((section) => section.type === 'hero')
  const desiredIndex = heroIndex === -1 ? 0 : heroIndex + 1

  if (tocIndex !== -1) {
    const tocSection = sections[tocIndex]
    tocSection.props = {
      ...(tocSection.props as unknown as Record<string, unknown>),
      items: tocItems,
      sticky: (tocSection.props as { sticky?: boolean }).sticky ?? true,
    }
    if (tocIndex !== desiredIndex) {
      sections.splice(tocIndex, 1)
      sections.splice(desiredIndex, 0, tocSection)
    }
    return dsl
  }

  const tocSection: SectionDefinition<'tableOfContents'> = {
    id: createUniqueTocId(sections),
    type: 'tableOfContents',
    props: { items: tocItems, sticky: true },
  }
  sections.splice(desiredIndex, 0, tocSection)
  return dsl
}
