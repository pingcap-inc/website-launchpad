'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Trash2, Plus } from 'lucide-react'
import type { SectionNode } from '@/lib/dsl-schema'
import type { FieldSchema } from '@/lib/section-registry'
import { schemaMap } from '@/lib/section-registry'
import { IconPicker } from './IconPicker'
import { ImageField } from './ImageField'
import { ALLOWED_BG_BY_SECTION, ALLOWED_SPACING_BY_SECTION } from '@/lib/section-style'

// ── Shared primitives ────────────────────────────────────────────────────────

function FieldRow({ label, children }: { label: string; children: ReactNode }) {
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
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => ReactNode
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

function getPathValue(obj: Record<string, unknown>, path: string) {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') return (acc as Record<string, unknown>)[key]
    return undefined
  }, obj)
}

function setPathValue(obj: Record<string, unknown>, path: string, value: unknown) {
  const parts = path.split('.')
  const next = { ...obj }
  let cursor: Record<string, unknown> = next
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i]
    const existing = cursor[key]
    cursor[key] =
      existing && typeof existing === 'object' && !Array.isArray(existing)
        ? { ...(existing as Record<string, unknown>) }
        : {}
    cursor = cursor[key] as Record<string, unknown>
  }
  cursor[parts[parts.length - 1]] = value
  return next
}

function renderField({
  field,
  value,
  onChange,
  slug,
}: {
  field: FieldSchema
  value: Record<string, unknown>
  onChange: (next: Record<string, unknown>) => void
  slug?: string
}) {
  const fieldValue = getPathValue(value, field.key)

  switch (field.type) {
    case 'text':
      return (
        <FieldRow label={field.label}>
          <TextInput
            value={typeof fieldValue === 'string' ? fieldValue : ''}
            onChange={(v) => onChange(setPathValue(value, field.key, v))}
            placeholder={field.placeholder}
          />
        </FieldRow>
      )
    case 'textarea':
      return (
        <FieldRow label={field.label}>
          <TextArea
            value={typeof fieldValue === 'string' ? fieldValue : ''}
            onChange={(v) => onChange(setPathValue(value, field.key, v))}
            placeholder={field.placeholder}
            rows={field.rows}
          />
        </FieldRow>
      )
    case 'number':
      return (
        <FieldRow label={field.label}>
          <input
            type="number"
            value={typeof fieldValue === 'number' ? fieldValue : ''}
            onChange={(e) =>
              onChange(setPathValue(value, field.key, e.target.value ? Number(e.target.value) : ''))
            }
            className={input}
          />
        </FieldRow>
      )
    case 'select':
      return (
        <FieldRow label={field.label}>
          <select
            value={fieldValue ? String(fieldValue) : ''}
            onChange={(e) => onChange(setPathValue(value, field.key, e.target.value))}
            className={input}
          >
            <option value="">Select…</option>
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FieldRow>
      )
    case 'toggle':
      return (
        <FieldRow label={field.label}>
          <label className="flex items-center gap-2 text-body-sm text-gray-600">
            <input
              type="checkbox"
              checked={Boolean(fieldValue)}
              onChange={(e) => onChange(setPathValue(value, field.key, e.target.checked))}
            />
            {field.label}
          </label>
        </FieldRow>
      )
    case 'cta': {
      const cta = (fieldValue as { text?: string; href?: string }) ?? { text: '', href: '' }
      return (
        <FieldRow label={field.label}>
          <CtaFields
            text={cta.text ?? ''}
            href={cta.href ?? ''}
            onText={(v) => onChange(setPathValue(value, field.key, { ...cta, text: v }))}
            onHref={(v) => onChange(setPathValue(value, field.key, { ...cta, href: v }))}
          />
        </FieldRow>
      )
    }
    case 'image': {
      // If this image field is nested (e.g. "heroImage.image"), propagate
      // alt/width/height from the ImageRef to sibling fields on the parent object
      const parentPath = field.key.includes('.')
        ? field.key.split('.').slice(0, -1).join('.')
        : null
      return (
        <FieldRow label={field.label}>
          <ImageField
            value={fieldValue as any}
            onChange={(v) => {
              let next = setPathValue(value, field.key, v)
              if (parentPath) {
                next = setPathValue(next, `${parentPath}.alt`, v?.alt ?? '')
                next = setPathValue(next, `${parentPath}.width`, v?.width ?? undefined)
                next = setPathValue(next, `${parentPath}.height`, v?.height ?? undefined)
              }
              onChange(next)
            }}
            slug={slug}
            defaultTag={'defaultTag' in field ? field.defaultTag : undefined}
            compact
          />
        </FieldRow>
      )
    }
    case 'icon':
      return (
        <FieldRow label={field.label}>
          <IconPicker
            value={fieldValue as any}
            onChange={(v) => onChange(setPathValue(value, field.key, v))}
            slug={slug}
          />
        </FieldRow>
      )
    case 'stringList': {
      const items = Array.isArray(fieldValue) ? (fieldValue as string[]) : []
      return (
        <FieldRow label={field.label}>
          <ArrayItemsEditor
            items={items.map((item) => ({ value: item }))}
            onUpdate={(next) =>
              onChange(
                setPathValue(
                  value,
                  field.key,
                  next.map((entry) => entry.value)
                )
              )
            }
            onAdd={() => ({ value: field.newItem ? field.newItem() : '' })}
            addLabel={`+ Add ${field.itemLabel ?? 'item'}`}
            renderItem={(item, _index, update) => (
              <TextInput
                value={item.value}
                onChange={(v) => update({ value: v })}
                placeholder={field.itemLabel}
              />
            )}
          />
        </FieldRow>
      )
    }
    case 'array': {
      const items = Array.isArray(fieldValue) ? (fieldValue as Record<string, unknown>[]) : []
      return (
        <FieldRow label={field.label}>
          <ArrayItemsEditor
            items={items}
            onUpdate={(next) => onChange(setPathValue(value, field.key, next))}
            onAdd={() => field.newItem()}
            addLabel={`+ Add ${field.itemLabel ?? 'item'}`}
            renderItem={(item, _index, update) => (
              <div className="space-y-2">
                {field.fields.map((child) => (
                  <div key={child.key}>
                    {renderField({
                      field: child,
                      value: item,
                      onChange: (nextItem) => update(nextItem as any),
                      slug,
                    })}
                  </div>
                ))}
              </div>
            )}
          />
        </FieldRow>
      )
    }
    case 'object': {
      const obj = (fieldValue as Record<string, unknown>) ?? {}
      return (
        <FieldRow label={field.label ?? field.key}>
          <div className="space-y-2">
            {(() => {
              const nodes: ReactNode[] = []
              for (let i = 0; i < field.fields.length; i += 1) {
                const child = field.fields[i]
                const nextChild = field.fields[i + 1]
                if (
                  child.type === 'number' &&
                  nextChild?.type === 'number' &&
                  child.key === 'width' &&
                  nextChild.key === 'height'
                ) {
                  const widthKey = `${field.key}.${child.key}`
                  const heightKey = `${field.key}.${nextChild.key}`
                  const widthValue = getPathValue(value, widthKey)
                  const heightValue = getPathValue(value, heightKey)

                  nodes.push(
                    <div key={`${child.key}-${nextChild.key}`} className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="block text-label font-bold text-gray-600 uppercase tracking-wide">
                          {child.label}
                        </label>
                        <input
                          type="number"
                          value={typeof widthValue === 'number' ? widthValue : ''}
                          onChange={(e) =>
                            onChange(
                              setPathValue(
                                value,
                                widthKey,
                                e.target.value ? Number(e.target.value) : ''
                              )
                            )
                          }
                          className={input}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-label font-bold text-gray-600 uppercase tracking-wide">
                          {nextChild.label}
                        </label>
                        <input
                          type="number"
                          value={typeof heightValue === 'number' ? heightValue : ''}
                          onChange={(e) =>
                            onChange(
                              setPathValue(
                                value,
                                heightKey,
                                e.target.value ? Number(e.target.value) : ''
                              )
                            )
                          }
                          className={input}
                        />
                      </div>
                    </div>
                  )
                  i += 1
                  continue
                }

                nodes.push(
                  <div key={child.key}>
                    {renderField({
                      field: { ...child, key: `${field.key}.${child.key}` },
                      value,
                      onChange,
                      slug,
                    })}
                  </div>
                )
              }
              return nodes
            })()}
          </div>
        </FieldRow>
      )
    }
    default:
      return null
  }
}

const SECTION_BACKGROUND_OPTIONS = [
  { label: 'Primary', value: 'primary' },
  { label: 'Inverse', value: 'inverse' },
  { label: 'Gradient Dark Top', value: 'gradient-dark-top' },
  { label: 'Gradient Dark Bottom', value: 'gradient-dark-bottom' },
  { label: 'Brand Red', value: 'brand-red' },
  { label: 'Brand Violet', value: 'brand-violet' },
  { label: 'Brand Blue', value: 'brand-blue' },
  { label: 'Brand Teal', value: 'brand-teal' },
  { label: 'None', value: 'none' },
]

const SECTION_SPACING_OPTIONS = [
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Section', value: 'section' },
  { label: 'Hero', value: 'hero' },
]

const BG_IMAGE_OPACITY_OPTIONS = [
  { label: 'None', value: '' },
  { label: 'Opacity 90%', value: 'opacity-90' },
  { label: 'Opacity 80%', value: 'opacity-80' },
  { label: 'Opacity 70%', value: 'opacity-70' },
  { label: 'Opacity 60%', value: 'opacity-60' },
  { label: 'Opacity 50%', value: 'opacity-50' },
  { label: 'Opacity 40%', value: 'opacity-40' },
  { label: 'Opacity 30%', value: 'opacity-30' },
  { label: 'Opacity 20%', value: 'opacity-20' },
]

const BG_IMAGE_OVERLAY_OPTIONS = [
  { label: 'None', value: '' },
  { label: 'Black 20%', value: 'bg-black/20' },
  { label: 'Black 30%', value: 'bg-black/30' },
  { label: 'Black 40%', value: 'bg-black/40' },
  { label: 'Black 50%', value: 'bg-black/50' },
  { label: 'Black 60%', value: 'bg-black/60' },
  {
    label: 'Dark Gradient Top',
    value: 'bg-gradient-to-b from-black/60 via-black/30 to-transparent',
  },
  {
    label: 'Dark Gradient Bottom',
    value: 'bg-gradient-to-t from-black/60 via-black/30 to-transparent',
  },
]

interface SectionFieldEditorProps {
  node: SectionNode
  onChange: (updated: SectionNode) => void
  slug?: string
}

export function SectionFieldEditor({ node, onChange, slug }: SectionFieldEditorProps) {
  const schema = schemaMap[node.type]
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content')
  const allowedBackgrounds = ALLOWED_BG_BY_SECTION[node.type] ?? new Set()
  const backgroundOptions = SECTION_BACKGROUND_OPTIONS.filter((option) =>
    allowedBackgrounds.has(option.value as any)
  )
  const allowedSpacing = ALLOWED_SPACING_BY_SECTION[node.type] ?? new Set()
  const spacingOptions = SECTION_SPACING_OPTIONS.filter((option) =>
    allowedSpacing.has(option.value as any)
  )
  const defaultSpacing = node.type === 'hero' ? 'hero' : node.type === 'cta' ? 'md' : 'section'
  const resolvedSpacing = node.style?.spacing ?? defaultSpacing

  useEffect(() => {
    if (node.type !== 'cta') return
    if (!node.style?.spacing) {
      onChange({ ...node, style: { ...node.style, spacing: 'md' } })
    }
  }, [node, onChange])

  if (!schema) {
    return <p className="text-body-sm text-gray-400">No editor for this section type.</p>
  }

  function handleChange(next: Record<string, unknown>) {
    let updated = next
    if (node.type === 'hero') {
      const prevFormId = (node.props as Record<string, any>)?.heroForm?.formId ?? ''
      const nextFormId = (next as Record<string, any>)?.heroForm?.formId ?? ''
      if (nextFormId && !prevFormId) {
        updated = { ...next, layout: 'split' }
      } else if (!nextFormId && prevFormId) {
        updated = { ...next, layout: 'image-right' }
      }
    }
    onChange({ ...node, props: updated as any })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`px-2.5 py-1 text-body-sm rounded border transition-colors ${
            activeTab === 'content'
              ? 'bg-white border-gray-300 text-gray-800'
              : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700'
          }`}
        >
          Content
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`px-2.5 py-1 text-body-sm rounded border transition-colors ${
            activeTab === 'style'
              ? 'bg-white border-gray-300 text-gray-800'
              : 'bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700'
          }`}
        >
          Style
        </button>
      </div>

      {activeTab === 'content' ? (
        <div className="space-y-3">
          {schema.fields.map((field) => {
            if (field.showWhen && !field.showWhen(node.props as unknown as Record<string, unknown>))
              return null
            return (
              <div key={field.key}>
                {renderField({
                  field,
                  value: node.props as any,
                  onChange: handleChange,
                  slug,
                })}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-2">
          <FieldRow label="Background">
            <select
              value={node.style?.background ?? 'primary'}
              onChange={(e) =>
                onChange({
                  ...node,
                  style: { ...node.style, background: e.target.value as any },
                })
              }
              className={input}
            >
              {backgroundOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FieldRow>

          <FieldRow label="Spacing">
            <select
              value={resolvedSpacing}
              onChange={(e) =>
                onChange({
                  ...node,
                  style: { ...node.style, spacing: e.target.value as any },
                })
              }
              className={input}
            >
              {spacingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FieldRow>

          <FieldRow label="Background Image">
            <ImageField
              value={node.style?.backgroundImage?.image as any}
              onChange={(v) =>
                onChange({
                  ...node,
                  style: {
                    ...node.style,
                    backgroundImage: v ? { image: v } : undefined,
                  },
                })
              }
              slug={slug}
              compact
            />
          </FieldRow>

          <FieldRow label="Background Image Effects">
            <div className="grid grid-cols-2 gap-2">
              <select
                value={node.style?.backgroundImageOpacityClassName ?? ''}
                onChange={(e) =>
                  onChange({
                    ...node,
                    style: {
                      ...node.style,
                      backgroundImageOpacityClassName: e.target.value || undefined,
                    },
                  })
                }
                className={input}
              >
                {BG_IMAGE_OPACITY_OPTIONS.map((option) => (
                  <option key={option.value || option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={node.style?.backgroundImageOverlayClassName ?? ''}
                onChange={(e) =>
                  onChange({
                    ...node,
                    style: {
                      ...node.style,
                      backgroundImageOverlayClassName: e.target.value || undefined,
                    },
                  })
                }
                className={input}
              >
                {BG_IMAGE_OVERLAY_OPTIONS.map((option) => (
                  <option key={option.value || option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </FieldRow>

          <FieldRow label="Extra Class Name">
            <TextInput
              value={node.style?.className ?? ''}
              onChange={(v) =>
                onChange({ ...node, style: { ...node.style, className: v || undefined } })
              }
              placeholder="Additional section classes"
            />
          </FieldRow>

          {node.type !== 'hero' && (
            <FieldRow label="Remove Padding">
              <div className="flex items-center gap-4 text-body-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(node.style?.removePaddingTop)}
                    onChange={(e) =>
                      onChange({
                        ...node,
                        style: { ...node.style, removePaddingTop: e.target.checked || undefined },
                      })
                    }
                  />
                  Top
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(node.style?.removePaddingBottom)}
                    onChange={(e) =>
                      onChange({
                        ...node,
                        style: {
                          ...node.style,
                          removePaddingBottom: e.target.checked || undefined,
                        },
                      })
                    }
                  />
                  Bottom
                </label>
              </div>
            </FieldRow>
          )}
        </div>
      )}
    </div>
  )
}
