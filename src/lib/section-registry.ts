import type {
  AgendaProps,
  ComparisonTableProps,
  CodeBlockProps,
  CtaProps,
  FeatureCardProps,
  FeatureGridProps,
  FeatureHighlightsProps,
  FeatureMediaProps,
  FeatureTabsProps,
  FaqProps,
  FormProps,
  HeroProps,
  LogoCloudProps,
  RichTextBlockProps,
  SectionDefinition,
  SectionPropsMap,
  SectionStyle,
  SectionType,
  SpeakersProps,
  StatsProps,
  TableOfContentsProps,
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
      options: Array<{ label: string; value: string | number }>
      noEmptyOption?: boolean
      valueType?: 'string' | 'number'
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
  borderStyle: 'gray',
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

const defaultFeatureMediaProps: FeatureMediaProps = {
  title: '',
  startPosition: 'right',
  items: [
    {
      title: '',
      description: '',
      image: { image: { url: '' } },
    },
  ],
}

const defaultLogoCloudProps: LogoCloudProps = {
  title: '',
  logos: [
    {
      image: { url: 'https://static.pingcap.com/images/dfc5d763-catalyst-logo-white.svg' },
      name: 'catalyst',
    },
  ],
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

const defaultAgendaProps: AgendaProps = {
  title: 'Agenda',
  items: [{ time: '', title: '', description: '' }],
}

const defaultSpeakersProps: SpeakersProps = {
  title: 'Speakers',
  items: [{ name: '', title: '', company: '', bio: '' }],
}

const defaultComparisonTableProps: ComparisonTableProps = {
  title: '',
  ourProduct: 'TiDB',
  competitor: '',
  rows: [{ feature: '', ours: true, theirs: false }],
}

const defaultCodeBlockProps: CodeBlockProps = {
  title: '',
  filename: '',
  language: 'bash',
  code: '',
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
        noEmptyOption: true,
        valueType: 'number',
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
        noEmptyOption: true,
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
        newItem: () => ({ title: '', description: '', layout: 'vertical' }),
        fields: [
          { type: 'icon', key: 'icon', label: 'Icon' },
          { type: 'text', key: 'title', label: 'Title' },
          { type: 'textarea', key: 'description', label: 'Description', rows: 2 },
          { type: 'cta', key: 'cta', label: 'CTA' },
          {
            type: 'select',
            key: 'layout',
            label: 'Layout Override',
            noEmptyOption: true,
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
        noEmptyOption: true,
        valueType: 'number',
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
        type: 'select',
        key: 'borderStyle',
        label: 'Border Style',
        options: [
          { label: 'Gray', value: 'gray' },
          { label: 'Color', value: 'color' },
        ],
      },
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
        noEmptyOption: true,
        valueType: 'number',
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
            fields: [
              { type: 'image', key: 'image', label: 'Image' },
              { type: 'number', key: 'width', label: 'Width' },
              { type: 'number', key: 'height', label: 'Height' },
            ],
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
        noEmptyOption: true,
        valueType: 'number',
        options: [
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
        ],
      },
      { type: 'cta', key: 'viewMore', label: 'View More' },
    ],
  },
  featureMedia: {
    type: 'featureMedia',
    label: 'Feature Media',
    description: 'Alternating text + image rows (zigzag layout)',
    defaultProps: defaultFeatureMediaProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      {
        type: 'select',
        key: 'startPosition',
        label: 'First image position',
        options: [
          { label: 'Right', value: 'right' },
          { label: 'Left', value: 'left' },
        ],
      },
      {
        type: 'array',
        key: 'items',
        label: 'Items',
        itemLabel: 'Item',
        newItem: () => ({
          title: '',
          description: '',
          image: { image: { url: '' } },
        }),
        fields: [
          { type: 'text', key: 'title', label: 'Title' },
          { type: 'textarea', key: 'description', label: 'Description', rows: 3 },
          {
            type: 'object',
            key: 'image',
            label: 'Image',
            fields: [
              { type: 'image', key: 'image', label: 'Image' },
              { type: 'number', key: 'width', label: 'Width' },
              { type: 'number', key: 'height', label: 'Height' },
            ],
          },
        ],
      },
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
  agenda: {
    type: 'agenda',
    label: 'Agenda',
    description: 'Event schedule — numbered or time-tagged session list',
    defaultProps: defaultAgendaProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      {
        type: 'array',
        key: 'items',
        label: 'Sessions',
        itemLabel: 'Session',
        newItem: () => ({ time: '', title: '', description: '' }),
        fields: [
          { type: 'text', key: 'time', label: 'Time (e.g. 09:00 – 09:30)' },
          { type: 'text', key: 'title', label: 'Session title' },
          { type: 'textarea', key: 'description', label: 'Description', rows: 2 },
        ],
      },
    ],
  },
  speakers: {
    type: 'speakers',
    label: 'Speakers',
    description: 'Event speaker profiles with photo and bio',
    defaultProps: defaultSpeakersProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      {
        type: 'array',
        key: 'items',
        label: 'Speakers',
        itemLabel: 'Speaker',
        newItem: () => ({ name: '', title: '', company: '', bio: '' }),
        fields: [
          { type: 'text', key: 'name', label: 'Name' },
          { type: 'text', key: 'title', label: 'Job title' },
          { type: 'text', key: 'company', label: 'Company' },
          { type: 'textarea', key: 'bio', label: 'Bio', rows: 3 },
          { type: 'image', key: 'image', label: 'Photo' },
        ],
      },
    ],
  },
  comparisonTable: {
    type: 'comparisonTable',
    label: 'Comparison Table',
    description: 'Side-by-side product comparison table',
    defaultProps: defaultComparisonTableProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'eyebrow', label: 'Eyebrow' },
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'textarea', key: 'subtitle', label: 'Subtitle', rows: 2 },
      { type: 'text', key: 'ourProduct', label: 'Our Product Name' },
      { type: 'text', key: 'competitor', label: 'Competitor Name' },
      {
        type: 'array',
        key: 'rows',
        label: 'Comparison Rows',
        itemLabel: 'Row',
        newItem: () => ({ feature: '', ours: true, theirs: false }),
        fields: [
          { type: 'text', key: 'feature', label: 'Feature' },
          { type: 'text', key: 'ours', label: 'Ours (text or true/false)' },
          { type: 'text', key: 'theirs', label: 'Theirs (text or true/false)' },
        ],
      },
      { type: 'cta', key: 'cta', label: 'CTA' },
    ],
  },
  richTextBlock: {
    type: 'richTextBlock',
    label: 'Rich Text Block',
    description: 'Markdown content block for long-form text',
    defaultProps: { content: '' } as RichTextBlockProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [{ type: 'textarea', key: 'content', label: 'Content (Markdown)', rows: 10 }],
  },
  tableOfContents: {
    type: 'tableOfContents',
    label: 'Table of Contents',
    description: 'Sticky sidebar navigation for long-form pages',
    defaultProps: { items: [{ id: '', label: '' }], sticky: true } as TableOfContentsProps,
    defaultStyle: { background: 'primary', spacing: 'none' },
    fields: [
      { type: 'toggle', key: 'sticky', label: 'Sticky on desktop' },
      {
        type: 'array',
        key: 'items',
        label: 'Items',
        itemLabel: 'Item',
        newItem: () => ({ id: '', label: '', level: 1 }),
        fields: [
          { type: 'text', key: 'id', label: 'Anchor ID' },
          { type: 'text', key: 'label', label: 'Label' },
          {
            type: 'select',
            key: 'level',
            label: 'Level',
            options: [
              { label: 'Level 1', value: 1 },
              { label: 'Level 2', value: 2 },
            ],
          },
        ],
      },
    ],
  },
  codeBlock: {
    type: 'codeBlock',
    label: 'Code Block',
    description: 'Standalone code snippet with optional metadata',
    defaultProps: defaultCodeBlockProps,
    defaultStyle: { background: 'primary', spacing: 'section' },
    fields: [
      { type: 'text', key: 'title', label: 'Title' },
      { type: 'text', key: 'filename', label: 'Filename' },
      { type: 'text', key: 'language', label: 'Language' },
      { type: 'textarea', key: 'code', label: 'Code', rows: 10 },
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
