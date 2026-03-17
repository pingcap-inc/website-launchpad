'use client'

import { Trash2, Plus } from 'lucide-react'
import type {
  SectionNode,
  HeroNode,
  StatsNode,
  FeatureGridNode,
  FeatureCardNode,
  FaqNode,
  CtaNode,
  TestimonialsNode,
  LogoCloudNode,
  FormNode,
  FeatureTabsNode,
  StatsItem,
  FeatureGridItem,
  FeatureCardItem,
  FaqItem,
  Testimonial,
  Logo,
  FeatureTab,
} from '@/lib/dsl-schema'
import { IconPicker } from './IconPicker'
import { HeroImagePicker } from './HeroImagePicker'
import { ImageField } from './ImageField'

// ── Shared primitives ────────────────────────────────────────────────────────

function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="block text-label font-bold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  )
}

const input =
  'w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300'
const textarea = `${input} resize-none`

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={input}
    />
  )
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={textarea}
    />
  )
}

function CtaFields({
  prefix,
  text,
  href,
  onText,
  onHref,
}: {
  prefix?: string
  text: string
  href: string
  onText: (v: string) => void
  onHref: (v: string) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <TextInput value={text} onChange={onText} placeholder={`${prefix ?? 'CTA'} label`} />
      <TextInput value={href} onChange={onHref} placeholder="href" />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ArrayItemsEditor<T extends Record<string, any>>({
  items,
  onUpdate,
  renderItem,
  onAdd,
  addLabel = '+ Add item',
}: {
  items: T[]
  onUpdate: (next: T[]) => void
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => React.ReactNode
  onAdd: () => T
  addLabel?: string
}) {
  const update = (i: number, patch: Partial<T>) => {
    const next = [...items]
    next[i] = { ...next[i], ...patch }
    onUpdate(next)
  }
  const remove = (i: number) => onUpdate(items.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-gray-100 rounded p-2 space-y-1.5 bg-gray-50 relative group"
        >
          {renderItem(item, i, (patch) => update(i, patch))}
          <button
            type="button"
            onClick={() => remove(i)}
            className="absolute top-1.5 right-1.5 text-gray-300 hover:text-red-500 transition-colors"
          >
            <Trash2 size={12} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onUpdate([...items, onAdd()])}
        className="flex items-center gap-1.5 text-body-sm text-gray-400 hover:text-gray-700 transition-colors"
      >
        <Plus size={13} /> {addLabel}
      </button>
    </div>
  )
}

// ── Section editors ──────────────────────────────────────────────────────────

function HeroEditor({
  node,
  onChange,
  slug,
}: {
  node: HeroNode
  onChange: (n: SectionNode) => void
  slug?: string
}) {
  const up = (patch: Partial<HeroNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Layout">
        <select
          value={node.layout ?? 'image-right'}
          onChange={(e) => up({ layout: e.target.value as HeroNode['layout'] })}
          className={input}
        >
          <option value="image-right">Image Right</option>
          <option value="split">Split (form)</option>
          <option value="centered">Centered</option>
        </select>
      </FieldRow>
      <FieldRow label="Eyebrow">
        <TextInput
          value={node.eyebrow ?? ''}
          onChange={(v) => up({ eyebrow: v })}
          placeholder="Optional eyebrow text"
        />
      </FieldRow>
      <FieldRow label="Headline">
        <TextArea value={node.headline} onChange={(v) => up({ headline: v })} rows={2} />
      </FieldRow>
      <FieldRow label="Subheadline">
        <TextArea
          value={node.subheadline ?? ''}
          onChange={(v) => up({ subheadline: v })}
          rows={2}
        />
      </FieldRow>
      <FieldRow label="Primary CTA">
        <CtaFields
          text={node.primaryCta?.text ?? ''}
          href={node.primaryCta?.href ?? ''}
          onText={(v) =>
            up({ primaryCta: { ...node.primaryCta, text: v, href: node.primaryCta?.href ?? '' } })
          }
          onHref={(v) =>
            up({ primaryCta: { ...node.primaryCta, href: v, text: node.primaryCta?.text ?? '' } })
          }
        />
      </FieldRow>
      <FieldRow label="Secondary CTA">
        <CtaFields
          text={node.secondaryCta?.text ?? ''}
          href={node.secondaryCta?.href ?? ''}
          onText={(v) =>
            up({
              secondaryCta: { ...node.secondaryCta, text: v, href: node.secondaryCta?.href ?? '' },
            })
          }
          onHref={(v) =>
            up({
              secondaryCta: { ...node.secondaryCta, href: v, text: node.secondaryCta?.text ?? '' },
            })
          }
        />
      </FieldRow>
      {(node.layout === 'image-right' || !node.layout) && (
        <HeroImagePicker
          value={node.heroImage?.src}
          onChange={(src) =>
            up({
              heroImage: {
                ...node.heroImage,
                src,
                width: node.heroImage?.width ?? 800,
                height: node.heroImage?.height ?? 500,
              },
            })
          }
          slug={slug}
        />
      )}
    </div>
  )
}

function StatsEditor({
  node,
  onChange,
  slug,
}: {
  node: StatsNode
  onChange: (n: SectionNode) => void
  slug?: string
}) {
  const up = (patch: Partial<StatsNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Title">
        <TextInput value={node.title ?? ''} onChange={(v) => up({ title: v })} />
      </FieldRow>
      <FieldRow label="Items">
        <ArrayItemsEditor
          items={node.items}
          onUpdate={(items) => up({ items })}
          onAdd={(): StatsItem => ({ value: '', label: '' })}
          addLabel="+ Add stat"
          renderItem={(item, _, update) => (
            <>
              <div className="grid grid-cols-2 gap-1.5">
                <TextInput
                  value={item.value}
                  onChange={(v) => update({ value: v })}
                  placeholder="e.g. 99.99%"
                />
                <TextInput
                  value={item.label}
                  onChange={(v) => update({ label: v })}
                  placeholder="Label"
                />
              </div>
              <TextInput
                value={item.description ?? ''}
                onChange={(v) => update({ description: v })}
                placeholder="Optional description"
              />
              <IconPicker value={item.icon} onChange={(v) => update({ icon: v })} slug={slug} />
            </>
          )}
        />
      </FieldRow>
    </div>
  )
}

function FeatureGridItemsEditor({
  items,
  onUpdate,
  slug,
}: {
  items: FeatureGridNode['items']
  onUpdate: (items: FeatureGridNode['items']) => void
  slug?: string
}) {
  return (
    <ArrayItemsEditor
      items={items}
      onUpdate={onUpdate}
      onAdd={(): FeatureGridItem => ({ title: '', description: '' })}
      addLabel="+ Add feature"
      renderItem={(item, _, update) => (
        <>
          <TextInput
            value={item.title}
            onChange={(v) => update({ title: v })}
            placeholder="Feature title"
          />
          <TextArea
            value={item.description}
            onChange={(v) => update({ description: v })}
            placeholder="Description"
            rows={2}
          />
          <div className="grid grid-cols-2 gap-2">
            <TextInput
              value={item.cta?.text ?? ''}
              onChange={(v) => {
                const nextHref = item.cta?.href ?? ''
                update(v || nextHref ? { cta: { text: v, href: nextHref } } : { cta: undefined })
              }}
              placeholder="CTA text (optional)"
            />
            <TextInput
              value={item.cta?.href ?? ''}
              onChange={(v) => {
                const nextText = item.cta?.text ?? ''
                update(v || nextText ? { cta: { text: nextText, href: v } } : { cta: undefined })
              }}
              placeholder="CTA href (optional)"
            />
          </div>
          <IconPicker value={item.icon} onChange={(v) => update({ icon: v })} slug={slug} />
        </>
      )}
    />
  )
}

function FeatureCardItemsEditor({
  items,
  onUpdate,
  slug,
}: {
  items: FeatureCardNode['items']
  onUpdate: (items: FeatureCardNode['items']) => void
  slug?: string
}) {
  return (
    <ArrayItemsEditor
      items={items}
      onUpdate={onUpdate}
      onAdd={(): FeatureCardItem => ({ title: '', description: '' })}
      addLabel="+ Add item"
      renderItem={(item, _, update) => (
        <>
          <TextInput
            value={item.title}
            onChange={(v) => update({ title: v })}
            placeholder="Item title"
          />
          <TextArea
            value={item.description}
            onChange={(v) => update({ description: v })}
            placeholder="Description"
            rows={2}
          />
          <TextInput
            value={item.href ?? ''}
            onChange={(v) => update({ href: v })}
            placeholder="Optional link href"
          />
          <IconPicker value={item.icon} onChange={(v) => update({ icon: v })} slug={slug} />
        </>
      )}
    />
  )
}

function FeatureGridEditor({
  node,
  onChange,
  slug,
}: {
  node: FeatureGridNode
  onChange: (n: SectionNode) => void
  slug?: string
}) {
  const up = (patch: Partial<FeatureGridNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Title">
        <TextInput value={node.title} onChange={(v) => up({ title: v })} />
      </FieldRow>
      <FieldRow label="Subtitle">
        <TextArea value={node.subtitle ?? ''} onChange={(v) => up({ subtitle: v })} rows={2} />
      </FieldRow>
      <FieldRow label="Columns">
        <select
          value={node.columns ?? 3}
          onChange={(e) => up({ columns: Number(e.target.value) as 2 | 3 | 4 })}
          className={input}
        >
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </FieldRow>
      <FieldRow label="Features">
        <FeatureGridItemsEditor
          items={node.items}
          onUpdate={(items) => up({ items })}
          slug={slug}
        />
      </FieldRow>
    </div>
  )
}

function FeatureCardEditor({
  node,
  onChange,
  slug,
}: {
  node: FeatureCardNode
  onChange: (n: SectionNode) => void
  slug?: string
}) {
  const up = (patch: Partial<FeatureCardNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Title">
        <TextInput value={node.title} onChange={(v) => up({ title: v })} />
      </FieldRow>
      <FieldRow label="Subtitle">
        <TextArea value={node.subtitle ?? ''} onChange={(v) => up({ subtitle: v })} rows={2} />
      </FieldRow>
      <FieldRow label="Columns">
        <select
          value={node.columns ?? 2}
          onChange={(e) => up({ columns: Number(e.target.value) as 2 | 3 | 4 })}
          className={input}
        >
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </FieldRow>
      <FieldRow label="Items">
        <FeatureCardItemsEditor
          items={node.items}
          onUpdate={(items) => up({ items })}
          slug={slug}
        />
      </FieldRow>
    </div>
  )
}

function FaqEditor({ node, onChange }: { node: FaqNode; onChange: (n: SectionNode) => void }) {
  const up = (patch: Partial<FaqNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Title">
        <TextInput value={node.title ?? ''} onChange={(v) => up({ title: v })} placeholder="FAQ" />
      </FieldRow>
      <FieldRow label="Questions">
        <ArrayItemsEditor
          items={node.items}
          onUpdate={(items) => up({ items })}
          onAdd={(): FaqItem => ({ q: '', a: '' })}
          addLabel="+ Add question"
          renderItem={(item, _, update) => (
            <>
              <TextInput value={item.q} onChange={(v) => update({ q: v })} placeholder="Question" />
              <TextArea
                value={item.a}
                onChange={(v) => update({ a: v })}
                placeholder="Answer"
                rows={3}
              />
            </>
          )}
        />
      </FieldRow>
    </div>
  )
}

function CtaEditor({ node, onChange }: { node: CtaNode; onChange: (n: SectionNode) => void }) {
  const up = (patch: Partial<CtaNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Title">
        <TextInput value={node.title} onChange={(v) => up({ title: v })} />
      </FieldRow>
      <FieldRow label="Subtitle">
        <TextArea value={node.subtitle ?? ''} onChange={(v) => up({ subtitle: v })} rows={2} />
      </FieldRow>
      <FieldRow label="Background">
        <select
          value={node.background ?? 'red'}
          onChange={(e) => up({ background: e.target.value as CtaNode['background'] })}
          className={input}
        >
          <option value="red">Red</option>
          <option value="violet">Violet</option>
          <option value="blue">Blue</option>
          <option value="teal">Teal</option>
        </select>
      </FieldRow>
      <FieldRow label="Primary CTA">
        <CtaFields
          text={node.primaryCta.text}
          href={node.primaryCta.href}
          onText={(v) => up({ primaryCta: { ...node.primaryCta, text: v } })}
          onHref={(v) => up({ primaryCta: { ...node.primaryCta, href: v } })}
        />
      </FieldRow>
      <FieldRow label="Secondary CTA">
        <CtaFields
          text={node.secondaryCta?.text ?? ''}
          href={node.secondaryCta?.href ?? ''}
          onText={(v) =>
            up({
              secondaryCta: { ...node.secondaryCta, text: v, href: node.secondaryCta?.href ?? '' },
            })
          }
          onHref={(v) =>
            up({
              secondaryCta: { ...node.secondaryCta, href: v, text: node.secondaryCta?.text ?? '' },
            })
          }
        />
      </FieldRow>
    </div>
  )
}

function TestimonialsEditor({
  node,
  onChange,
  slug,
}: {
  node: TestimonialsNode
  onChange: (n: SectionNode) => void
  slug?: string
}) {
  const up = (patch: Partial<TestimonialsNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Title">
        <TextInput value={node.title} onChange={(v) => up({ title: v })} />
      </FieldRow>
      <FieldRow label="Testimonials">
        <ArrayItemsEditor
          items={node.items}
          onUpdate={(items) => up({ items })}
          onAdd={(): Testimonial => ({ quote: '', author: '' })}
          addLabel="+ Add testimonial"
          renderItem={(item, _, update) => (
            <>
              <TextArea
                value={item.quote}
                onChange={(v) => update({ quote: v })}
                placeholder="Quote"
                rows={3}
              />
              <TextInput
                value={item.author}
                onChange={(v) => update({ author: v })}
                placeholder="Author, Company"
              />
              <TextInput
                value={item.href ?? ''}
                onChange={(v) => update({ href: v })}
                placeholder="Optional link"
              />
              <ImageField
                value={item.logo?.src}
                onChange={(src) =>
                  update({ logo: { ...item.logo, src, alt: item.logo?.alt ?? '' } })
                }
                slug={slug}
                label="Logo"
                compact
              />
            </>
          )}
        />
      </FieldRow>
    </div>
  )
}

function LogoCloudEditor({
  node,
  onChange,
  slug,
}: {
  node: LogoCloudNode
  onChange: (n: SectionNode) => void
  slug?: string
}) {
  const up = (patch: Partial<LogoCloudNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Title">
        <TextInput value={node.title ?? ''} onChange={(v) => up({ title: v })} />
      </FieldRow>
      <FieldRow label="Logos">
        <ArrayItemsEditor
          items={node.logos}
          onUpdate={(logos) => up({ logos })}
          onAdd={(): Logo => ({ name: '', src: '' })}
          addLabel="+ Add logo"
          renderItem={(item, _, update) => (
            <>
              <TextInput
                value={item.name}
                onChange={(v) => update({ name: v })}
                placeholder="Company name"
              />
              <ImageField
                value={item.src}
                onChange={(src) => update({ src })}
                slug={slug}
                label="Logo image"
                compact
              />
              <TextInput
                value={item.href ?? ''}
                onChange={(v) => update({ href: v })}
                placeholder="Optional link"
              />
            </>
          )}
        />
      </FieldRow>
    </div>
  )
}

function FormEditor({ node, onChange }: { node: FormNode; onChange: (n: SectionNode) => void }) {
  const up = (patch: Partial<FormNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Title">
        <TextInput value={node.title ?? ''} onChange={(v) => up({ title: v })} />
      </FieldRow>
      <FieldRow label="Subtitle">
        <TextArea value={node.subtitle ?? ''} onChange={(v) => up({ subtitle: v })} rows={2} />
      </FieldRow>
      <FieldRow label="Portal ID">
        <TextInput
          value={node.portalId}
          onChange={(v) => up({ portalId: v })}
          placeholder="HubSpot Portal ID"
        />
      </FieldRow>
      <FieldRow label="Form ID">
        <TextInput
          value={node.formId}
          onChange={(v) => up({ formId: v })}
          placeholder="HubSpot Form ID"
        />
      </FieldRow>
    </div>
  )
}

function FeatureTabsEditor({
  node,
  onChange,
  slug,
}: {
  node: FeatureTabsNode
  onChange: (n: SectionNode) => void
  slug?: string
}) {
  const up = (patch: Partial<FeatureTabsNode>) => onChange({ ...node, ...patch })
  return (
    <div className="space-y-3">
      <FieldRow label="Title">
        <TextInput value={node.title} onChange={(v) => up({ title: v })} />
      </FieldRow>
      <FieldRow label="Tabs">
        <ArrayItemsEditor
          items={node.tabs}
          onUpdate={(tabs) => up({ tabs })}
          onAdd={(): FeatureTab => ({
            id: `tab-${Date.now()}`,
            label: '',
            image: { src: '', alt: '', width: 1200, height: 800 },
          })}
          addLabel="+ Add tab"
          renderItem={(item, _, update) => (
            <>
              <TextInput
                value={item.label}
                onChange={(v) => update({ label: v })}
                placeholder="Tab label"
              />
              <TextArea
                value={item.description ?? ''}
                onChange={(v) => update({ description: v })}
                placeholder="Description"
                rows={2}
              />
              <ImageField
                value={item.image.src}
                onChange={(src) => update({ image: { ...item.image, src } })}
                slug={slug}
                label="Tab image"
                compact
              />
            </>
          )}
        />
      </FieldRow>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────

interface SectionFieldEditorProps {
  node: SectionNode
  onChange: (updated: SectionNode) => void
  slug?: string
}

export function SectionFieldEditor({ node, onChange, slug }: SectionFieldEditorProps) {
  switch (node.type) {
    case 'hero':
      return <HeroEditor node={node} onChange={onChange} slug={slug} />
    case 'stats':
      return <StatsEditor node={node} onChange={onChange} slug={slug} />
    case 'featureGrid':
      return <FeatureGridEditor node={node} onChange={onChange} slug={slug} />
    case 'featureCard':
      return <FeatureCardEditor node={node} onChange={onChange} slug={slug} />
    case 'faq':
      return <FaqEditor node={node} onChange={onChange} />
    case 'cta':
      return <CtaEditor node={node} onChange={onChange} />
    case 'testimonials':
      return <TestimonialsEditor node={node} onChange={onChange} slug={slug} />
    case 'logoCloud':
      return <LogoCloudEditor node={node} onChange={onChange} slug={slug} />
    case 'form':
      return <FormEditor node={node} onChange={onChange} />
    case 'featureTabs':
      return <FeatureTabsEditor node={node} onChange={onChange} slug={slug} />
    default:
      return <p className="text-body-sm text-gray-400">No editor for this section type.</p>
  }
}
