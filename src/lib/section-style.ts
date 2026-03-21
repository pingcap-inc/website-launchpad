import type { SectionStyle, SectionType } from './dsl-schema'

const DEFAULT_ALLOWED_BG = new Set<SectionStyle['background']>([
  'primary',
  'gradient-dark-top',
  'gradient-dark-bottom',
  'inverse',
])

export const ALLOWED_BG_BY_SECTION: Record<SectionType, Set<SectionStyle['background']>> = {
  hero: new Set(['primary']),
  cta: new Set(['brand-violet', 'brand-blue', 'brand-red', 'brand-teal', 'primary']),
  testimonials: new Set(['gradient-dark-top', 'gradient-dark-bottom', 'primary']),
  stats: DEFAULT_ALLOWED_BG,
  featureGrid: DEFAULT_ALLOWED_BG,
  featureCard: DEFAULT_ALLOWED_BG,
  featureTabs: DEFAULT_ALLOWED_BG,
  featureHighlights: DEFAULT_ALLOWED_BG,
  logoCloud: DEFAULT_ALLOWED_BG,
  faq: DEFAULT_ALLOWED_BG,
  form: DEFAULT_ALLOWED_BG,
}

const DEFAULT_ALLOWED_SPACING = new Set<SectionStyle['spacing']>(['sm', 'md', 'lg', 'section'])

export const ALLOWED_SPACING_BY_SECTION: Record<SectionType, Set<SectionStyle['spacing']>> = {
  hero: new Set(['hero']),
  cta: DEFAULT_ALLOWED_SPACING,
  testimonials: DEFAULT_ALLOWED_SPACING,
  stats: DEFAULT_ALLOWED_SPACING,
  featureGrid: DEFAULT_ALLOWED_SPACING,
  featureCard: DEFAULT_ALLOWED_SPACING,
  featureTabs: DEFAULT_ALLOWED_SPACING,
  featureHighlights: DEFAULT_ALLOWED_SPACING,
  logoCloud: DEFAULT_ALLOWED_SPACING,
  faq: DEFAULT_ALLOWED_SPACING,
  form: DEFAULT_ALLOWED_SPACING,
}
