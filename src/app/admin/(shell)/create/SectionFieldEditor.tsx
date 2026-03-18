'use client'

import type { ReactNode } from 'react'
import { Trash2, Plus } from 'lucide-react'
import type { SectionNode } from '@/lib/dsl-schema'
import type { FieldSchema } from '@/lib/section-registry'
import { schemaMap } from '@/lib/section-registry'
import { IconPicker } from './IconPicker'
import { ImageField } from './ImageField'

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
            {field.fields.map((child) => (
              <div key={child.key}>
                {renderField({
                  field: { ...child, key: `${field.key}.${child.key}` },
                  value,
                  onChange,
                  slug,
                })}
              </div>
            ))}
          </div>
        </FieldRow>
      )
    }
    default:
      return null
  }
}

interface SectionFieldEditorProps {
  node: SectionNode
  onChange: (updated: SectionNode) => void
  slug?: string
}

export function SectionFieldEditor({ node, onChange, slug }: SectionFieldEditorProps) {
  const schema = schemaMap[node.type]

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
  )
}
