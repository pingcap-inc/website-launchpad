import type {
  AgendaProps,
  ComparisonTableProps,
  CtaProps,
  FeatureCardItem,
  FeatureCardProps,
  FeatureGridItem,
  FeatureGridProps,
  FeatureHighlightItem,
  FeatureHighlightsProps,
  FeatureMediaItemDSL,
  FeatureMediaProps,
  FeatureTab,
  FeatureTabsProps,
  FaqProps,
  FormProps,
  HeroImage,
  HeroProps,
  IconValue,
  ImageRef,
  Logo,
  LogoCloudProps,
  PageDSL,
  PageMeta,
  SectionDefinition,
  SectionPropsMap,
  SectionStyle,
  SectionType,
  SpeakersProps,
  StatsItem,
  StatsProps,
  Testimonial,
  TestimonialsProps,
} from './dsl-schema'
import type { PageType } from '@/lib/admin/page-types'
import { schemaMap } from './section-registry'

export type LegacySectionNode = {
  type: SectionType
  style?: SectionStyle
  id?: string
  [key: string]: unknown
}

export type LegacyPageDSL = {
  pageName?: string
  meta: PageMeta
  sections: LegacySectionNode[]
}

export type PageDSLInput = PageDSL | LegacyPageDSL

function isSectionDefinition(section: unknown): section is SectionDefinition {
  return Boolean(section && typeof section === 'object' && 'props' in section)
}

function isImageRef(value: unknown): value is ImageRef {
  return Boolean(
    value &&
    typeof value === 'object' &&
    'url' in value &&
    typeof (value as { url?: unknown }).url === 'string'
  )
}

function normalizeImageRef(value: unknown): ImageRef | undefined {
  if (!value) return undefined
  if (isImageRef(value)) return value
  if (typeof value === 'string') return { url: value }
  if (typeof value === 'object') {
    const v = value as { src?: unknown; url?: unknown; assetId?: unknown }
    if (typeof v.url === 'string') return { url: v.url, assetId: v.assetId as string | undefined }
    if (typeof v.src === 'string') return { url: v.src, assetId: v.assetId as string | undefined }
  }
  return undefined
}

function isImageRefWithUrl(value: unknown): value is ImageRef {
  return isImageRef(value) && typeof value.url === 'string' && value.url.length > 0
}

function isImageContainerWithImage(value: unknown): value is { image: ImageRef } {
  return (
    !!value &&
    typeof value === 'object' &&
    'image' in (value as object) &&
    isImageRefWithUrl((value as { image?: unknown }).image)
  )
}

function fillMissingImages(
  target: Record<string, unknown>,
  defaults: Record<string, unknown>
): void {
  for (const key of Object.keys(defaults)) {
    const defVal = defaults[key]
    const tgtVal = target[key]

    if (!defVal || typeof defVal !== 'object') continue

    if (isImageRefWithUrl(defVal)) {
      if (!isImageRefWithUrl(tgtVal)) target[key] = defVal
      continue
    }

    if (isImageContainerWithImage(defVal)) {
      if (!isImageContainerWithImage(tgtVal)) target[key] = defVal
      continue
    }

    if (Array.isArray(defVal)) {
      if (Array.isArray(tgtVal) && defVal[0] && typeof defVal[0] === 'object') {
        for (const item of tgtVal) {
          if (item && typeof item === 'object') {
            fillMissingImages(item as Record<string, unknown>, defVal[0] as Record<string, unknown>)
          }
        }
      }
      continue
    }

    if (tgtVal && typeof tgtVal === 'object' && !Array.isArray(tgtVal)) {
      fillMissingImages(tgtVal as Record<string, unknown>, defVal as Record<string, unknown>)
    }
  }
}

function applyDefaultImages(type: SectionType, props: Record<string, unknown>): void {
  const defaults = schemaMap[type]?.defaultProps as Record<string, unknown> | undefined
  if (!defaults) return
  fillMissingImages(props, defaults)
}

function normalizeIconValue(value: unknown): IconValue | undefined {
  if (!value) return undefined
  if (typeof value === 'string') {
    if (value.startsWith('/') || value.startsWith('http')) return { url: value }
    return value as IconValue
  }
  if (isImageRef(value)) return value
  return undefined
}

function normalizeHeroImage(value: unknown): HeroImage | undefined {
  if (!value || typeof value !== 'object') return undefined
  const v = value as {
    image?: unknown
    src?: unknown
    alt?: unknown
    width?: unknown
    height?: unknown
    align?: unknown
    priority?: unknown
  }
  const image = normalizeImageRef(v.image ?? v.src)
  if (!image) return undefined
  return {
    image,
    alt: typeof v.alt === 'string' ? v.alt : undefined,
    width: typeof v.width === 'number' ? v.width : undefined,
    height: typeof v.height === 'number' ? v.height : undefined,
    align: v.align === 'center' || v.align === 'right' ? v.align : undefined,
    priority: typeof v.priority === 'boolean' ? v.priority : undefined,
  }
}

function normalizeSectionStyle(style?: SectionStyle): SectionStyle | undefined {
  if (!style) return undefined
  const v = style as SectionStyle & {
    backgroundImage?: { image?: unknown; src?: unknown; url?: unknown }
  }
  const image = normalizeImageRef(
    v.backgroundImage?.image ?? v.backgroundImage?.src ?? v.backgroundImage?.url
  )
  const backgroundImage = image ? { image } : undefined

  const background = v.background || undefined
  const spacing = v.spacing || undefined
  const className = v.className || undefined
  const backgroundImageOpacityClassName =
    typeof v.backgroundImageOpacityClassName === 'string'
      ? v.backgroundImageOpacityClassName
      : undefined
  const backgroundImageOverlayClassName =
    typeof v.backgroundImageOverlayClassName === 'string'
      ? v.backgroundImageOverlayClassName
      : undefined

  const removePaddingTop = typeof v.removePaddingTop === 'boolean' ? v.removePaddingTop : undefined
  const removePaddingBottom =
    typeof v.removePaddingBottom === 'boolean' ? v.removePaddingBottom : undefined

  return {
    background,
    spacing,
    removePaddingTop,
    removePaddingBottom,
    className,
    backgroundImageOpacityClassName,
    backgroundImageOverlayClassName,
    backgroundImage,
  }
}

function normalizeStatsItem(value: unknown): StatsItem | null {
  if (!value || typeof value !== 'object') return null
  const v = value as StatsItem
  return {
    icon: normalizeIconValue(v.icon),
    value: v.value ?? '',
    label: v.label ?? '',
    description: v.description,
  }
}

function normalizeFeatureGridItem(value: unknown): FeatureGridItem | null {
  if (!value || typeof value !== 'object') return null
  const v = value as FeatureGridItem
  return {
    icon: normalizeIconValue(v.icon),
    title: v.title ?? '',
    description: v.description ?? '',
    cta: v.cta,
    layout: v.layout,
  }
}

function normalizeFeatureCardItem(value: unknown): FeatureCardItem | null {
  if (!value || typeof value !== 'object') return null
  const v = value as FeatureCardItem
  return {
    icon: normalizeIconValue(v.icon),
    title: v.title ?? '',
    description: v.description ?? '',
    borderColor: typeof v.borderColor === 'string' ? v.borderColor : undefined,
    href: v.href,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeFeatureTab(value: unknown): FeatureTab | null {
  if (!value || typeof value !== 'object') return null
  const v = value as FeatureTab & { image?: { src?: unknown; image?: unknown } }
  return {
    id: v.id ?? '',
    label: v.label ?? '',
    description: v.description,
    bullets: Array.isArray(v.bullets) ? (v.bullets as string[]) : undefined,
    primaryCta: v.primaryCta,
    secondaryCta: v.secondaryCta,
    content: typeof v.content === 'string' ? v.content : undefined,
    image: {
      image: normalizeImageRef(v.image?.image ?? v.image?.src ?? (v as any).image) ?? { url: '' },
      alt: v.image?.alt ?? (v as any).alt,
      width: v.image?.width ?? (v as any).width,
      height: v.image?.height ?? (v as any).height,
    },
  }
}

function normalizeFeatureHighlightItem(value: unknown): FeatureHighlightItem | null {
  if (!value || typeof value !== 'object') return null
  const v = value as FeatureHighlightItem
  return {
    variant: v.variant ?? 'red',
    title: v.title ?? '',
    description: v.description ?? '',
    cta: v.cta ?? { text: '', href: '' },
    icon: normalizeIconValue(v.icon),
  }
}

function normalizeLogo(value: unknown): Logo | null {
  if (!value || typeof value !== 'object') return null
  const v = value as Logo & { src?: unknown }
  const image = normalizeImageRef(v.image ?? (v as any).src)
  if (!image) return null
  return {
    name: v.name ?? '',
    image,
    href: v.href,
    width: v.width,
    height: v.height,
  }
}

function normalizeTestimonial(value: unknown): Testimonial | null {
  if (!value || typeof value !== 'object') return null
  const v = value as Testimonial & { logo?: { src?: unknown; image?: unknown } }
  const logoImage = normalizeImageRef(v.logo?.image ?? v.logo?.src)
  return {
    quote: v.quote ?? '',
    author: v.author ?? '',
    href: v.href,
    cta: v.cta,
    logo: logoImage
      ? {
          image: logoImage,
          alt: v.logo?.alt,
          size: v.logo?.size,
        }
      : undefined,
  }
}

function normalizeHeroProps(value: unknown): HeroProps {
  const v = (value ?? {}) as HeroProps & {
    heroImage?: unknown
  }
  return {
    layout: v.layout,
    eyebrow: v.eyebrow,
    headline: v.headline ?? '',
    subheadline: v.subheadline,
    primaryCta: v.primaryCta,
    secondaryCta: v.secondaryCta,
    heroImage: normalizeHeroImage(v.heroImage),
    heroForm: v.heroForm,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeStatsProps(value: unknown): StatsProps {
  const v = (value ?? {}) as StatsProps
  const items = Array.isArray(v.items) ? v.items.map(normalizeStatsItem).filter(Boolean) : []
  return {
    eyebrow: v.eyebrow,
    title: v.title,
    subtitle: v.subtitle,
    items: items as StatsItem[],
    columns: v.columns,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeFeatureGridProps(value: unknown): FeatureGridProps {
  const v = (value ?? {}) as FeatureGridProps
  const items = Array.isArray(v.items) ? v.items.map(normalizeFeatureGridItem).filter(Boolean) : []
  return {
    eyebrow: v.eyebrow,
    title: v.title ?? '',
    subtitle: v.subtitle,
    items: items as FeatureGridItem[],
    columns: v.columns,
    viewMore: v.viewMore,
    itemLayout: v.itemLayout,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeFeatureCardProps(value: unknown): FeatureCardProps {
  const v = (value ?? {}) as FeatureCardProps
  const items = Array.isArray(v.items) ? v.items.map(normalizeFeatureCardItem).filter(Boolean) : []
  return {
    eyebrow: v.eyebrow,
    title: v.title ?? '',
    subtitle: v.subtitle,
    items: items as FeatureCardItem[],
    columns: v.columns,
    borderStyle: v.borderStyle,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeFeatureTabsProps(value: unknown): FeatureTabsProps {
  const v = (value ?? {}) as FeatureTabsProps
  const tabs = Array.isArray(v.tabs) ? v.tabs.map(normalizeFeatureTab).filter(Boolean) : []
  return {
    eyebrow: v.eyebrow,
    title: v.title ?? '',
    subtitle: v.subtitle,
    tabs: tabs as FeatureTab[],
    autoSwitch: v.autoSwitch,
    autoSwitchInterval: v.autoSwitchInterval,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeFeatureHighlightsProps(value: unknown): FeatureHighlightsProps {
  const v = (value ?? {}) as FeatureHighlightsProps
  const items = Array.isArray(v.items)
    ? v.items.map(normalizeFeatureHighlightItem).filter(Boolean)
    : []
  return {
    eyebrow: v.eyebrow,
    title: v.title ?? '',
    subtitle: v.subtitle,
    items: items as FeatureHighlightItem[],
    columns: v.columns,
    viewMore: v.viewMore,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeFeatureMediaItem(raw: unknown): FeatureMediaItemDSL | null {
  if (!raw || typeof raw !== 'object') return null
  const v = raw as FeatureMediaItemDSL & { image?: { src?: unknown; image?: unknown } }
  return {
    title: typeof v.title === 'string' ? v.title : '',
    description: typeof v.description === 'string' ? v.description : '',
    image: {
      image: normalizeImageRef(v.image?.image ?? v.image?.src ?? (v as any).image) ?? { url: '' },
      alt: v.image?.alt ?? (v as any).alt,
      width: v.image?.width ?? (v as any).width,
      height: v.image?.height ?? (v as any).height,
    },
    imagePosition:
      v.imagePosition === 'left' || v.imagePosition === 'right' ? v.imagePosition : undefined,
  }
}

function normalizeFeatureMediaProps(value: unknown): FeatureMediaProps {
  const v = (value ?? {}) as FeatureMediaProps
  const items = Array.isArray(v.items) ? v.items.map(normalizeFeatureMediaItem).filter(Boolean) : []
  return {
    eyebrow: v.eyebrow,
    title: v.title,
    subtitle: v.subtitle,
    items: items as FeatureMediaItemDSL[],
    startPosition:
      v.startPosition === 'left' || v.startPosition === 'right' ? v.startPosition : undefined,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeLogoCloudProps(value: unknown): LogoCloudProps {
  const v = (value ?? {}) as LogoCloudProps
  const logos = Array.isArray(v.logos) ? v.logos.map(normalizeLogo).filter(Boolean) : []
  return {
    eyebrow: v.eyebrow,
    title: v.title,
    subtitle: v.subtitle,
    logos: logos as Logo[],
    variant: v.variant,
    align: v.align,
    autoScroll: v.autoScroll,
    scrollSpeedSeconds: v.scrollSpeedSeconds,
    scrollContentMaxWidth:
      typeof v.scrollContentMaxWidth === 'number' ? v.scrollContentMaxWidth : undefined,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeTestimonialsProps(value: unknown): TestimonialsProps {
  const v = (value ?? {}) as TestimonialsProps
  const items = Array.isArray(v.items) ? v.items.map(normalizeTestimonial).filter(Boolean) : []
  return {
    eyebrow: v.eyebrow,
    title: v.title ?? '',
    items: items as Testimonial[],
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeFaqProps(value: unknown): FaqProps {
  const v = (value ?? {}) as FaqProps
  return {
    title: v.title,
    items: Array.isArray(v.items) ? v.items : [],
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeCtaProps(value: unknown): CtaProps {
  const v = (value ?? {}) as CtaProps & { image?: { src?: unknown; image?: unknown } }
  const image = normalizeImageRef((v.image as any)?.image ?? (v.image as any)?.src)
  return {
    title: v.title ?? '',
    subtitle: v.subtitle,
    image: image
      ? {
          image,
          alt: (v.image as any)?.alt,
          width: (v.image as any)?.width,
          height: (v.image as any)?.height,
        }
      : undefined,
    primaryCta: v.primaryCta ?? { text: '', href: '' },
    secondaryCta: v.secondaryCta,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeFormProps(value: unknown): FormProps {
  const v = (value ?? {}) as FormProps
  return {
    title: v.title,
    subtitle: v.subtitle,
    portalId: v.portalId ?? '',
    formId: v.formId ?? '',
    region: v.region,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeAgendaProps(value: unknown): AgendaProps {
  const v = (value ?? {}) as AgendaProps
  return {
    eyebrow: v.eyebrow,
    title: v.title ?? '',
    subtitle: v.subtitle,
    items: Array.isArray(v.items) ? v.items : [],
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeSpeakersProps(value: unknown): SpeakersProps {
  const v = (value ?? {}) as SpeakersProps
  return {
    eyebrow: v.eyebrow,
    title: v.title ?? '',
    items: Array.isArray(v.items) ? v.items : [],
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeComparisonTableProps(value: unknown): ComparisonTableProps {
  const v = (value ?? {}) as ComparisonTableProps
  return {
    eyebrow: v.eyebrow,
    title: v.title ?? '',
    subtitle: v.subtitle,
    ourProduct: v.ourProduct ?? '',
    competitor: v.competitor ?? '',
    rows: Array.isArray(v.rows) ? v.rows : [],
    cta: v.cta,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeRichTextBlockProps(value: unknown): SectionPropsMap['richTextBlock'] {
  const v = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
  return {
    content: typeof v.content === 'string' ? v.content : '',
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeCodeBlockProps(value: unknown): SectionPropsMap['codeBlock'] {
  const v = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
  return {
    title: typeof v.title === 'string' ? v.title : undefined,
    filename: typeof v.filename === 'string' ? v.filename : undefined,
    language: typeof v.language === 'string' ? v.language : undefined,
    code: typeof v.code === 'string' ? v.code : '',
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizeTableOfContentsProps(value: unknown): SectionPropsMap['tableOfContents'] {
  const v = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>
  return {
    items: Array.isArray(v.items)
      ? v.items.map((item: unknown) => {
          const i = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>
          return {
            id: typeof i.id === 'string' ? i.id : '',
            label: typeof i.label === 'string' ? i.label : '',
            level: i.level === 2 ? 2 : 1,
          }
        })
      : [],
    sticky: v.sticky !== false,
    className: typeof v.className === 'string' ? v.className : undefined,
  }
}

function normalizePropsByType(type: SectionType, value: unknown): SectionPropsMap[SectionType] {
  switch (type) {
    case 'hero':
      return normalizeHeroProps(value)
    case 'stats':
      return normalizeStatsProps(value)
    case 'featureGrid':
      return normalizeFeatureGridProps(value)
    case 'featureCard':
      return normalizeFeatureCardProps(value)
    case 'featureTabs':
      return normalizeFeatureTabsProps(value)
    case 'featureHighlights':
      return normalizeFeatureHighlightsProps(value)
    case 'featureMedia':
      return normalizeFeatureMediaProps(value)
    case 'logoCloud':
      return normalizeLogoCloudProps(value)
    case 'testimonials':
      return normalizeTestimonialsProps(value)
    case 'faq':
      return normalizeFaqProps(value)
    case 'cta':
      return normalizeCtaProps(value)
    case 'form':
      return normalizeFormProps(value)
    case 'agenda':
      return normalizeAgendaProps(value)
    case 'speakers':
      return normalizeSpeakersProps(value)
    case 'comparisonTable':
      return normalizeComparisonTableProps(value)
    case 'richTextBlock':
      return normalizeRichTextBlockProps(value)
    case 'codeBlock':
      return normalizeCodeBlockProps(value)
    case 'tableOfContents':
      return normalizeTableOfContentsProps(value)
  }
}

function normalizeLegacySection(section: LegacySectionNode, index: number): SectionDefinition {
  const { type, style, id: sectionId, ...rest } = section
  const legacyProps = rest as Record<string, unknown>
  applyDefaultImages(type, legacyProps)
  return {
    id: sectionId ?? `${type}-${index + 1}`,
    type,
    props: normalizePropsByType(type, legacyProps),
    style: normalizeSectionStyle(style),
  }
}

export function normalizeSection(section: SectionDefinition | LegacySectionNode, index: number) {
  if (isSectionDefinition(section)) {
    const props = (
      section.props && typeof section.props === 'object' ? section.props : {}
    ) as Record<string, unknown>
    applyDefaultImages(section.type, props)
    return {
      id: section.id ?? `${section.type}-${index + 1}`,
      type: section.type,
      props: normalizePropsByType(section.type, props),
      style: normalizeSectionStyle(section.style),
    }
  }
  return normalizeLegacySection(section, index)
}

export function normalizeDSL(dsl: PageDSLInput): PageDSL {
  return {
    pageName: dsl.pageName ?? dsl.meta?.title ?? '',
    meta: dsl.meta,
    sections: dsl.sections.map((section, index) => normalizeSection(section, index)),
  }
}

export function enforceLongFormMaxWidth(dsl: PageDSL, pageType?: PageType) {
  const normalizedType = pageType?.toLowerCase()
  if (!normalizedType || !['listicle', 'playbook', 'compare'].includes(normalizedType)) return
  for (const section of dsl.sections) {
    if (section.type === 'richTextBlock') {
      section.style = {
        ...(section.style ?? {}),
        removePaddingTop: true,
        removePaddingBottom: true,
      }
    }
    if (section.type === 'faq') {
      section.style = {
        ...(section.style ?? {}),
        spacing: 'md',
        className: [section.style?.className, 'faq-longform'].filter(Boolean).join(' '),
      }
    }
  }
}

function getMonthYear() {
  return new Date().toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

const LONG_FORM_DEFAULT_AUTHOR = 'PingCAP Editorial Team'

export function ensureLongFormLastUpdated(dsl: PageDSL, pageType?: PageType) {
  const normalizedType = pageType?.toLowerCase()
  if (!normalizedType || !['listicle', 'playbook', 'compare'].includes(normalizedType)) return
  const introSection = dsl.sections.find((section) => section.type === 'richTextBlock')
  if (!introSection) return
  const props = introSection.props as { content?: string }
  const content = props.content ?? ''
  if (/last\s+updated/i.test(content)) return
  const updatedLine = `*Last updated: ${getMonthYear()} · By ${LONG_FORM_DEFAULT_AUTHOR}.*`
  const divider = '---'
  props.content = content.trim()
    ? `${updatedLine}\n\n${divider}\n\n${content.trim()}`
    : `${updatedLine}\n\n${divider}`
}

export function ensureLongFormHero(dsl: PageDSL, pageType?: PageType) {
  const normalizedType = pageType?.toLowerCase()
  if (!normalizedType || !['listicle', 'playbook', 'compare'].includes(normalizedType)) return

  const headline = dsl.pageName ?? dsl.meta?.title ?? 'Untitled'

  const heroIndex = dsl.sections.findIndex((section) => section.type === 'hero')
  if (heroIndex !== -1) {
    const hero = dsl.sections[heroIndex]
    const heroProps = hero.props as { subheadline?: string }
    hero.props = heroProps as SectionDefinition['props']
    return
  }

  dsl.sections.unshift({
    id: 'hero-1',
    type: 'hero',
    props: {
      layout: 'centered',
      headline,
    },
    style: { background: 'primary', spacing: 'section' },
  })
}
