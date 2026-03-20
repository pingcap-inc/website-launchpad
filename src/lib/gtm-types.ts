export type PageType =
  | 'home'
  | 'product'
  | 'landing_page'
  | 'seo_content'
  | 'blog'
  | 'glossary'
  | 'compare'
  | 'pricing'
  | 'other'

export interface PageViewEvent {
  event: 'page_view'
  page_type: PageType
  page_path: string
  page_title: string
}

export interface CTAClickEvent {
  event: 'cta_click'
  cta_text: string
  cta_location: string // e.g. 'hero' | 'cta_section' | 'navbar'
  page_path: string
}

export interface FormSubmitEvent {
  event: 'form_submit'
  form_id: string
  page_path: string
}

export type GTMEvent = PageViewEvent | CTAClickEvent | FormSubmitEvent | Record<string, unknown>
