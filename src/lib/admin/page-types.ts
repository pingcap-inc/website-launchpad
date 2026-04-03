export type PageTypeOption = {
  value: 'general' | 'event' | 'listicle' | 'playbook' | 'compare'
  label: string
  importEligible: boolean
}

export type PageType = PageTypeOption['value']

export const PAGE_TYPE_OPTIONS: PageTypeOption[] = [
  // 'Product Page',
  // 'Solution Page',
  // 'Landing Page',
  // 'Glossary Page',
  { value: 'general', label: 'General Page', importEligible: true },
  { value: 'event', label: 'Event Page', importEligible: false },
  { value: 'listicle', label: 'Listicle Page', importEligible: true },
  { value: 'playbook', label: 'Playbook Page', importEligible: true },
  { value: 'compare', label: 'Compare Page', importEligible: true },
]

export const PAGE_TYPES = PAGE_TYPE_OPTIONS.map((option) => option.value)

export const PAGE_TYPE_LABELS: Record<string, string> = Object.fromEntries(
  PAGE_TYPE_OPTIONS.map((option) => [option.value, option.label])
)

export const IMPORT_PAGE_TYPES = PAGE_TYPE_OPTIONS.filter((option) => option.importEligible).map(
  (option) => option.value
)

export type ImportPageType = (typeof IMPORT_PAGE_TYPES)[number]
