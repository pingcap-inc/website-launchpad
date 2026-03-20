import type {
  CtaProps,
  FeatureCardProps,
  FeatureGridProps,
  FeatureHighlightsProps,
  FeatureTabsProps,
  FaqProps,
  FormProps,
  HeroProps,
  LogoCloudProps,
  SectionDefinition,
  SectionPropsMap,
  SectionStyle,
  SectionType,
  StatsProps,
  TestimonialsProps,
} from './dsl-schema'

type FieldBase = { showWhen?: (props: Record<string, unknown>) => boolean }

export type FieldSchema =
  | (FieldBase & {
      type: 'text' | 'textarea' | 'number'
      key: string
      label: string
      placeholder?: string
      rows?: number
    })
  | (FieldBase & {
      type: 'select'
      key: string
      label: string
      options: Array<{ label: string; value: string }>
    })
  | (FieldBase & {
      type: 'toggle'
      key: string
      label: string
    })
  | (FieldBase & {
      type: 'cta'
      key: string
      label: string
    })
  | (FieldBase & {
      type: 'image'
      key: string
      label: string
      defaultTag?: string
    })
  | (FieldBase & {
      type: 'icon'
      key: string
      label: string
    })
  | (FieldBase & {
      type: 'array'
      key: string
      label: string
      itemLabel?: string
      fields: FieldSchema[]
      newItem: () => Record<string, unknown>
    })
  | (FieldBase & {
      type: 'stringList'
      key: string
      label: string
      itemLabel?: string
      newItem?: () => string
    })
  | (FieldBase & {
      type: 'object'
      key: string
      label?: string
      fields: FieldSchema[]
    })

export interface SectionSchema<T extends SectionType = SectionType> {
  type: T
  label: string
  description: string
  defaultProps: SectionPropsMap[T]
  defaultStyle?: SectionStyle
  fields: FieldSchema[]
}

const defaultHeroProps: HeroProps = {
  layout: 'image-right',
  headline: '',
  heroImage: {
    image: { url: 'https://static.pingcap.com/images/f54533cc-1000011158.svg' },
    alt: 'hero image',
    width: 500,
    height: 400,
  },
  heroForm: {
    formId: '8d439c40-4e6b-4192-a99b-a2c619ad4146',
    portalId: '4466002',
    region: 'na1',
  },
}

const defaultStatsProps: StatsProps = {
  title: '',
  items: [{ value: '', label: '' }],
}

const defaultFeatureGridProps: FeatureGridProps = {
  title: '',
  items: [{ title: '', description: '' }],
  columns: 3,
  itemLayout: 'vertical',
}

const defaultFeatureCardProps: FeatureCardProps = {
  title: '',
  items: [{ title: '', description: '' }],
  columns: 2,
}

const defaultFeatureTabsProps: FeatureTabsProps = {
  title: '',
  tabs: [
    {
      id: 'tab-1',
      label: '',
      image: {
        image: { url: 'https://static.pingcap.com/images/fd14d65a-graphic-1.svg' },
        alt: 'tab image',
        width: 1200,
        height: 800,
      },
    },
  ],
  autoSwitch: true,
  autoSwitchInterval: 6000,
}

const defaultFeatureHighlightsProps: FeatureHighlightsProps = {
  title: '',
  items: [{ variant: 'red', title: '', description: '', cta: { text: '', href: '' } }],
  columns: 3,
}

const defaultLogoCloudProps: LogoCloudProps = {
  title: '',
  logos: [],
  variant: 'default',
  align: 'center',
  autoScroll: true,
}

const defaultTestimonialsProps: TestimonialsProps = {
  title: '',
  items: [
    {
      quote: '',
      author: '',
      logo: { image: { url: 'https://static.pingcap.com/images/712552a8-dify.png' }, alt: 'dify' },
    },
  ],
}

const defaultFaqProps: FaqProps = {
  title: '',
  items: [{ q: '', a: '' }],
}

const defaultCtaProps: CtaProps = {
  title: '',
  primaryCta: { text: '', href: '' },
  image: {
    image: { url: 'https://static.pingcap.com/images/f2890cff-cta-cube-violet-mini.svg' },
    alt: '',
    width: 278,
    height: 256,
  },
}

const defaultFormProps: FormProps = {
  title: '',
  portalId: '4466002',
  formId: '',
}

export const schemaMap: Record<SectionType, SectionSchema<any>> = {
  hero: {
    type: 'hero',
    label: 'Hero',
    description: 'Full-width hero with headline and CTAs',
    defaultProps: defaultHeroProps,
    defaultStyle: { background: 'primary', spacing: 'hero' },
    fields: [
      {
        type: 'select',
        key: 'layout',
        label: 'Layout',
        options: [
          { label: 'Image Right', value: 'image-right' },
          { label: 'Split (form)', value: 'split' },
          { label: 'Centered', value: 'centered' },
        ],
      },
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'textarea', key: 'headline', label: 'Headline', rows: 2 },
      { type: 'textarea', key: 'subheadline', label: 'Subheadline', rows: 2 },
      { type: 'cta', key: 'primaryCta', label: 'Primary CTA' },
      { type: 'cta', key: 'secondaryCta', label: 'Secondary CTA' },
      {
        type: 'object',
        key: 'heroImage',
        label: 'Hero Image',
        showWhen: (props) => props.layout === 'image-right',
        fields: [
          { type: 'image', key: 'image', label: 'Image', defaultTag: 'hero' },
          { type: 'text', key: 'alt', label: 'Alt text' },
          { type: 'number', key: 'width', label: 'Width' },
          { type: 'number', key: 'height', label: 'Height' },
          {
            type: 'select',
            key: 'align',
            label: 'Alignment',
            options: [
              { label: 'Right', value: 'right' },
              { label: 'Center', value: 'center' },
            ],
          },
        ],
      },
      {
        type: 'object',
        key: 'backgroundImage',
        label: 'Background Image',
        showWhen: (props) => props.layout === 'centered',
        fields: [{ type: 'image', key: 'image', label: 'Image' }],
      },
      {
        type: 'object',
        key: 'heroForm',
        label: 'Hero Form',
        showWhen: (props) => props.layout === 'split',
        fields: [
          { type: 'text', key: 'formId', label: 'Form ID' },
          { type: 'text', key: 'portalId', label: 'Portal ID' },
          { type: 'text', key: 'region', label: 'Region' },
        ],
      },
    ],
  },
  stats: {
    type: 'stats',
    label: 'Stats',
    description: 'Key metrics with CountUp animation',
    defaultProps: defaultStatsProps,
    defaultStyle: { background: 'gradient-dark-top', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      {
        type: 'array',
        key: 'items',
        label: 'Stats',
        itemLabel: 'Stat',
        newItem: () => ({ value: '', label: '' }),
        fields: [
          { type: 'icon', key: 'icon', label: 'Icon' },
          { type: 'text', key: 'value', label: 'Value' },
          { type: 'text', key: 'label', label: 'Label' },
          { type: 'textarea', key: 'description', label: 'Description', rows: 2 },
        ],
      },
      {
        type: 'select',
        key: 'columns',
        label: 'Columns',
        options: [
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
        ],
      },
    ],
  },
  featureGrid: {
    type: 'featureGrid',
    label: 'Feature Grid',
    description: 'Grid of features with icons',
    defaultProps: defaultFeatureGridProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      {
        type: 'select',
        key: 'itemLayout',
        label: 'Item Layout',
        options: [
          { label: 'Vertical', value: 'vertical' },
          { label: 'Horizontal', value: 'horizontal' },
        ],
      },
      {
        type: 'array',
        key: 'items',
        label: 'Features',
        itemLabel: 'Feature',
        newItem: () => ({ title: '', description: '' }),
        fields: [
          { type: 'icon', key: 'icon', label: 'Icon' },
          { type: 'text', key: 'title', label: 'Title' },
          { type: 'textarea', key: 'description', label: 'Description', rows: 2 },
          { type: 'cta', key: 'cta', label: 'CTA' },
          {
            type: 'select',
            key: 'layout',
            label: 'Layout Override',
            options: [
              { label: 'Vertical', value: 'vertical' },
              { label: 'Horizontal', value: 'horizontal' },
            ],
          },
        ],
      },
      {
        type: 'select',
        key: 'columns',
        label: 'Columns',
        options: [
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
        ],
      },
    ],
  },
  featureCard: {
    type: 'featureCard',
    label: 'Feature Cards',
    description: 'Bordered cards in a grid layout',
    defaultProps: defaultFeatureCardProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      {
        type: 'array',
        key: 'items',
        label: 'Cards',
        itemLabel: 'Card',
        newItem: () => ({ title: '', description: '' }),
        fields: [
          { type: 'icon', key: 'icon', label: 'Icon' },
          { type: 'text', key: 'title', label: 'Title' },
          { type: 'textarea', key: 'description', label: 'Description', rows: 2 },
          { type: 'text', key: 'href', label: 'Link' },
        ],
      },
      {
        type: 'select',
        key: 'columns',
        label: 'Columns',
        options: [
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
        ],
      },
    ],
  },
  featureTabs: {
    type: 'featureTabs',
    label: 'Feature Tabs',
    description: 'Tabbed feature showcase with images',
    defaultProps: defaultFeatureTabsProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      {
        type: 'array',
        key: 'tabs',
        label: 'Tabs',
        itemLabel: 'Tab',
        newItem: () => ({
          id: `tab-${Date.now()}`,
          label: '',
          image: { image: { url: '' }, alt: '', width: 1200, height: 800 },
        }),
        fields: [
          { type: 'text', key: 'id', label: 'ID' },
          { type: 'text', key: 'label', label: 'Label' },
          { type: 'textarea', key: 'description', label: 'Description', rows: 2 },
          { type: 'stringList', key: 'bullets', label: 'Bullets' },
          { type: 'cta', key: 'primaryCta', label: 'Primary CTA' },
          { type: 'cta', key: 'secondaryCta', label: 'Secondary CTA' },
          {
            type: 'object',
            key: 'image',
            label: 'Image',
            fields: [{ type: 'image', key: 'image', label: 'Image' }],
          },
        ],
      },
      { type: 'toggle', key: 'autoSwitch', label: 'Auto-switch tabs' },
      { type: 'number', key: 'autoSwitchInterval', label: 'Auto-switch interval (ms)' },
    ],
  },
  featureHighlights: {
    type: 'featureHighlights',
    label: 'Feature Highlights',
    description: 'Colored highlight cards with CTAs',
    defaultProps: defaultFeatureHighlightsProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      {
        type: 'array',
        key: 'items',
        label: 'Highlights',
        itemLabel: 'Highlight',
        newItem: () => ({
          variant: 'red',
          title: '',
          description: '',
          cta: { text: '', href: '' },
        }),
        fields: [
          {
            type: 'select',
            key: 'variant',
            label: 'Variant',
            options: [
              { label: 'Red', value: 'red' },
              { label: 'Violet', value: 'violet' },
              { label: 'Blue', value: 'blue' },
              { label: 'Teal', value: 'teal' },
            ],
          },
          { type: 'text', key: 'title', label: 'Title' },
          { type: 'textarea', key: 'description', label: 'Description', rows: 2 },
          { type: 'cta', key: 'cta', label: 'CTA' },
          { type: 'icon', key: 'icon', label: 'Icon' },
        ],
      },
      {
        type: 'select',
        key: 'columns',
        label: 'Columns',
        options: [
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
        ],
      },
      { type: 'cta', key: 'viewMore', label: 'View More' },
    ],
  },
  logoCloud: {
    type: 'logoCloud',
    label: 'Logo Cloud',
    description: 'Customer or partner logos',
    defaultProps: defaultLogoCloudProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      {
        type: 'select',
        key: 'align',
        label: 'Alignment',
        options: [
          { label: 'Center', value: 'center' },
          { label: 'Left', value: 'left' },
        ],
      },
      { type: 'toggle', key: 'autoScroll', label: 'Auto-scroll logos' },
      { type: 'number', key: 'scrollSpeedSeconds', label: 'Scroll speed (seconds)' },
      {
        type: 'number',
        key: 'scrollContentMaxWidth',
        label: 'Custom scroll max width (px)',
        showWhen: (props) => Boolean(props.autoScroll),
      },
      {
        type: 'array',
        key: 'logos',
        label: 'Logos',
        itemLabel: 'Logo',
        newItem: () => ({ name: '', image: { url: '' } }),
        fields: [
          { type: 'text', key: 'name', label: 'Company name' },
          { type: 'image', key: 'image', label: 'Logo image' },
          { type: 'text', key: 'href', label: 'Link' },
        ],
      },
    ],
  },
  testimonials: {
    type: 'testimonials',
    label: 'Testimonials',
    description: 'Customer quotes and stories',
    defaultProps: defaultTestimonialsProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      {
        type: 'array',
        key: 'items',
        label: 'Testimonials',
        itemLabel: 'Testimonial',
        newItem: () => ({ quote: '', author: '' }),
        fields: [
          { type: 'textarea', key: 'quote', label: 'Quote', rows: 2 },
          { type: 'text', key: 'author', label: 'Author' },
          { type: 'text', key: 'href', label: 'Link' },
          { type: 'text', key: 'cta', label: 'CTA' },
          {
            type: 'object',
            key: 'logo',
            label: 'Logo',
            fields: [
              { type: 'image', key: 'image', label: 'Logo image' },
              { type: 'text', key: 'alt', label: 'Alt text' },
              { type: 'number', key: 'size', label: 'Size' },
            ],
          },
        ],
      },
    ],
  },
  faq: {
    type: 'faq',
    label: 'FAQ',
    description: 'Accordion Q&A section',
    defaultProps: defaultFaqProps,
    defaultStyle: { background: 'gradient-dark-bottom', spacing: 'section' },
    fields: [
      { type: 'text', key: 'title', label: 'Title' },
      {
        type: 'array',
        key: 'items',
        label: 'Questions',
        itemLabel: 'Q&A',
        newItem: () => ({ q: '', a: '' }),
        fields: [
          { type: 'text', key: 'q', label: 'Question' },
          { type: 'textarea', key: 'a', label: 'Answer', rows: 2 },
        ],
      },
    ],
  },
  cta: {
    type: 'cta',
    label: 'CTA',
    description: 'Call-to-action banner section',
    defaultProps: defaultCtaProps,
    defaultStyle: { background: 'brand-violet', spacing: 'section' },
    fields: [
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      { type: 'cta', key: 'primaryCta', label: 'Primary CTA' },
      { type: 'cta', key: 'secondaryCta', label: 'Secondary CTA' },
      {
        type: 'object',
        key: 'image',
        label: 'Image',
        fields: [
          { type: 'image', key: 'image', label: 'Image' },
          { type: 'text', key: 'alt', label: 'Alt text' },
          { type: 'number', key: 'width', label: 'Width' },
          { type: 'number', key: 'height', label: 'Height' },
        ],
      },
    ],
  },
  form: {
    type: 'form',
    label: 'Form',
    description: 'HubSpot form embed',
    defaultProps: defaultFormProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      { type: 'text', key: 'portalId', label: 'Portal ID' },
      { type: 'text', key: 'formId', label: 'Form ID' },
      { type: 'text', key: 'region', label: 'Region' },
    ],
  },
}

export function createSection(type: SectionType): SectionDefinition {
  const schema = schemaMap[type]
  return {
    id: `${type}-${Date.now()}`,
    type,
    props: structuredClone(schema.defaultProps),
    style: schema.defaultStyle,
  }
}

export function getSectionLabel(type: SectionType) {
  return schemaMap[type]?.label ?? type
}

export function getSectionDescription(type: SectionType) {
  return schemaMap[type]?.description ?? ''
}
