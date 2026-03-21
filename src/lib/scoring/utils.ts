import type { PageDSL, SectionDefinition } from '@/lib/dsl-schema'

export function hasCTA(dsl: PageDSL): boolean {
  for (const section of dsl.sections) {
    const props = section.props as Record<string, any>
    if (props.primaryCta?.text || props.primaryCta?.href) return true
    if (props.secondaryCta?.text || props.secondaryCta?.href) return true

    if (Array.isArray(props.items)) {
      for (const item of props.items) {
        if (item?.cta?.text || item?.cta?.href) return true
        if (item?.primaryCta?.text || item?.primaryCta?.href) return true
        if (item?.secondaryCta?.text || item?.secondaryCta?.href) return true
      }
    }

    if (Array.isArray(props.tabs)) {
      for (const tab of props.tabs) {
        if (tab?.primaryCta?.text || tab?.primaryCta?.href) return true
        if (tab?.secondaryCta?.text || tab?.secondaryCta?.href) return true
      }
    }
  }

  return false
}

function stringifyText(value: unknown): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(stringifyText).join(' ')
  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>)
      .map(stringifyText)
      .join(' ')
  }
  return ''
}

export function extractTextLength(section: SectionDefinition): number {
  const props = section.props as unknown as Record<string, unknown>
  const text = stringifyText(props)
  return text.replace(/\s+/g, ' ').trim().length
}
