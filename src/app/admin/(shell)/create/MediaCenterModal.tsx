'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Upload, X, Check, Loader2, Tag, Image as ImageIcon, Plus, AlertCircle } from 'lucide-react'
import type { ImageRef } from '@/lib/dsl-schema'

interface MediaImage {
  url: string
  name: string
  tags: string[]
  alt: string
  width?: number
  height?: number
  size: number
  uploadedAt: string
}

function deriveAltFromImageName(name: string) {
  return name
    .replace(/^[0-9a-f]{8}-/i, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
}

interface MediaCenterModalProps {
  open: boolean
  onClose: () => void
  onSelect: (img: ImageRef) => void
  currentUrl?: string
  initialTab?: 'library' | 'upload'
  /** When provided, pre-load these files into the upload zone (not auto-uploaded) */
  initialFiles?: File[]
  /** Hide the tags input in the upload tab (used when uploading from section fields) */
  hideTags?: boolean
  /** Default tag: pre-selects this tag in library filter and auto-tags uploads */
  defaultTag?: string
}

export function MediaCenterModal({
  open,
  onClose,
  onSelect,
  currentUrl,
  initialTab = 'library',
  initialFiles,
  hideTags = false,
  defaultTag,
}: MediaCenterModalProps) {
  const [tab, setTab] = useState<'library' | 'upload'>(initialTab)
  const [images, setImages] = useState<MediaImage[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState(currentUrl ?? '')

  // Upload state
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Pending files — shown in upload zone but not yet uploaded
  type PendingStatus = 'queued' | 'uploading' | 'done' | 'error'
  interface PendingItem {
    id: string
    file: File
    preview: string
    status: PendingStatus
    error?: string
    uploadedUrl?: string
  }
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([])

  // Tag editing
  const [editingTagsUrl, setEditingTagsUrl] = useState<string | null>(null)
  const [editTagInput, setEditTagInput] = useState('')

  // Inline meta editing in library
  const [editingMetaUrl, setEditingMetaUrl] = useState<string | null>(null)
  const [metaAlt, setMetaAlt] = useState('')
  const [metaWidth, setMetaWidth] = useState('')
  const [metaHeight, setMetaHeight] = useState('')
  const [savingMeta, setSavingMeta] = useState(false)

  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/media-index')
      const data = (await res.json()) as { images?: MediaImage[] }
      setImages(data.images ?? [])
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setTab(initialTab)
      setSelectedUrl(currentUrl ?? '')
      fetchImages()
    }
    if (!open) {
      pendingItems.forEach((item) => URL.revokeObjectURL(item.preview))
      setPendingItems([])
      setTagInput('')
      setUploadError('')
      setEditingMetaUrl(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (open && initialFiles && initialFiles.length > 0) {
      addFiles(initialFiles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialFiles])

  const addFiles = (files: File[]) => {
    if (files.length === 0) return
    const newItems: PendingItem[] = files.map((file) => ({
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file,
      preview: URL.createObjectURL(file),
      status: 'queued',
    }))
    setPendingItems((prev) => [...prev, ...newItems])
    setUploadError('')
  }

  const removeItem = (id: string) => {
    setPendingItems((prev) => {
      const target = prev.find((it) => it.id === id)
      if (target) URL.revokeObjectURL(target.preview)
      return prev.filter((it) => it.id !== id)
    })
  }

  const clearAllPending = () => {
    pendingItems.forEach((item) => URL.revokeObjectURL(item.preview))
    setPendingItems([])
  }

  const handleUpload = async () => {
    const queued = pendingItems.filter((it) => it.status === 'queued' || it.status === 'error')
    if (queued.length === 0) return
    setUploading(true)
    setUploadError('')

    const tagsValue = !hideTags ? tagInput : (defaultTag ?? '')
    const tagsList = tagsValue
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    const hasTags = tagsList.length > 0

    // Pre-validate sizes synchronously, then commit a pure state update.
    // (Side effects inside a setState reducer don't run in time for the
    // following `Promise.all`, and may also run twice under React strict mode.)
    const MAX_SIZE = 5 * 1024 * 1024
    const ready = queued.filter((it) => it.file.size <= MAX_SIZE)
    const oversizedIds = new Set(queued.filter((it) => it.file.size > MAX_SIZE).map((it) => it.id))
    const readyIds = new Set(ready.map((it) => it.id))
    setPendingItems((prev) =>
      prev.map((it) => {
        if (oversizedIds.has(it.id)) {
          return { ...it, status: 'error', error: 'File must be under 5 MB' }
        }
        if (readyIds.has(it.id)) {
          return { ...it, status: 'uploading', error: undefined }
        }
        return it
      })
    )

    if (ready.length === 0) {
      setUploading(false)
      return
    }

    // Upload all files in parallel — much faster than the previous sequential loop.
    // Tags are skipped during the upload and batch-applied below in a single
    // tags.json read-modify-write to avoid race conditions on the shared file.
    const results = await Promise.all(
      ready.map(async (item) => {
        try {
          const formData = new FormData()
          formData.append('file', item.file)
          formData.append('source', 'media')
          if (hasTags) {
            formData.append('tags', tagsValue)
            formData.append('skipTagsUpdate', '1')
          }
          const res = await fetch('/api/admin/upload-image', { method: 'POST', body: formData })
          const data = (await res.json()) as { path?: string; error?: string }
          if (!res.ok || data.error || !data.path) throw new Error(data.error ?? 'Upload failed')
          return { id: item.id, ok: true as const, url: data.path }
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Upload failed'
          return { id: item.id, ok: false as const, error: msg }
        }
      })
    )

    // Apply per-file status updates from the results
    setPendingItems((prev) =>
      prev.map((it) => {
        const r = results.find((x) => x.id === it.id)
        if (!r) return it
        return r.ok
          ? { ...it, status: 'done', uploadedUrl: r.url }
          : { ...it, status: 'error', error: r.error }
      })
    )

    // One batch tag update for all successful uploads
    const successUrls = results.filter((r) => r.ok).map((r) => r.url)
    if (hasTags && successUrls.length > 0) {
      try {
        await fetch('/api/admin/media-index', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tagEntries: successUrls.map((url) => ({ url, tags: tagsList })),
          }),
        })
      } catch {
        // tags are best-effort; uploads themselves already succeeded
      }
    }

    const firstSuccessUrl = successUrls[0]
    const anyError = results.some((r) => !r.ok)

    setUploading(false)

    if (firstSuccessUrl) {
      await fetchImages()
      setSelectedUrl(firstSuccessUrl)
      setTagInput('')
      if (!anyError) {
        clearAllPending()
        setTab('library')
      }
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'))
    if (files.length > 0) addFiles(files)
  }

  const handleUpdateTags = async (url: string, newTags: string[]) => {
    await fetch('/api/admin/media-index', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, tags: newTags }),
    })
    setImages((prev) => prev.map((img) => (img.url === url ? { ...img, tags: newTags } : img)))
    setEditingTagsUrl(null)
  }

  const openMetaEdit = (img: MediaImage) => {
    setEditingMetaUrl(img.url)
    // Alt: strip 8-char hash prefix (e.g. "712552a8-dify.png" → "dify"), then strip extension
    const nameWithoutHash = img.name.replace(/^[0-9a-f]{8}-/i, '')
    const baseName = nameWithoutHash.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
    setMetaAlt(img.alt || baseName)
    // Width/height: use stored values, or measure from natural image dimensions
    if (img.width) {
      setMetaWidth(String(img.width))
      setMetaHeight(img.height ? String(img.height) : '')
    } else {
      setMetaWidth('')
      setMetaHeight('')
      const el = new window.Image()
      el.onload = () => {
        setMetaWidth(String(el.naturalWidth))
        setMetaHeight(String(el.naturalHeight))
      }
      el.src = img.url
    }
  }

  const handleSaveMeta = async (url: string) => {
    setSavingMeta(true)
    const payload: Record<string, unknown> = { url, alt: metaAlt }
    if (metaWidth) payload.width = Number(metaWidth)
    else payload.width = null
    if (metaHeight) payload.height = Number(metaHeight)
    else payload.height = null
    await fetch('/api/admin/media-index', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setImages((prev) =>
      prev.map((img) =>
        img.url === url
          ? {
              ...img,
              alt: metaAlt,
              width: metaWidth ? Number(metaWidth) : undefined,
              height: metaHeight ? Number(metaHeight) : undefined,
            }
          : img
      )
    )
    setSavingMeta(false)
    setEditingMetaUrl(null)
  }

  const handleConfirmSelect = async () => {
    if (!selectedUrl) return
    const img = images.find((i) => i.url === selectedUrl)
    let width = img?.width
    let height = img?.height
    const normalizedAlt = (img?.alt ?? '').trim() || (img ? deriveAltFromImageName(img.name) : '')

    if (!width || !height) {
      await new Promise<void>((resolve) => {
        const el = new window.Image()
        el.onload = () => {
          width = el.naturalWidth || width
          height = el.naturalHeight || height
          resolve()
        }
        el.onerror = () => resolve()
        el.src = selectedUrl
      })
    }

    const result: ImageRef = {
      url: selectedUrl,
      ...(normalizedAlt ? { alt: normalizedAlt } : {}),
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
    }
    onSelect(result)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-body-lg font-bold text-gray-900">Media Library</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-5">
          {(['library', 'upload'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-body-sm font-bold capitalize border-b-2 transition-colors ${
                tab === t
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'library' ? (
                <span className="flex items-center gap-1.5">
                  <ImageIcon size={14} /> Library
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Upload size={14} /> Upload New
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* ── Library Tab ── */}
          {tab === 'library' && (
            <div className="space-y-4">
              {/* Image grid */}
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : images.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <ImageIcon size={40} strokeWidth={1} className="mb-3" />
                  <p className="text-body-sm font-bold">No images yet</p>
                  <p className="text-label mt-1">
                    Switch to &quot;Upload New&quot; to add your first image
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {images.map((img) => (
                    <div
                      key={img.url}
                      className={`group relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedUrl === img.url
                          ? 'border-gray-900 shadow-md'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      onClick={() => {
                        setSelectedUrl(img.url)
                        setEditingMetaUrl(null)
                      }}
                    >
                      <div className="aspect-square bg-gray-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.alt || img.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      {/* Selected overlay */}
                      {selectedUrl === img.url && (
                        <div className="absolute top-1.5 right-1.5 bg-gray-900 rounded-full p-0.5">
                          <Check size={12} className="text-white" />
                        </div>
                      )}

                      {/* Info bar */}
                      <div className="px-2 py-1.5 bg-white border-t border-gray-100">
                        <p className="text-label text-gray-600 truncate" title={img.name}>
                          {img.name}
                        </p>

                        {/* Meta edit panel — shown when this image is selected */}
                        {selectedUrl === img.url && editingMetaUrl === img.url ? (
                          <div className="mt-1.5 space-y-1" onClick={(e) => e.stopPropagation()}>
                            <input
                              autoFocus
                              type="text"
                              value={metaAlt}
                              onChange={(e) => setMetaAlt(e.target.value)}
                              placeholder="Alt text"
                              className="w-full text-label border border-gray-300 rounded px-1.5 py-0.5 focus:outline-none focus:border-gray-500"
                            />
                            <div className="flex gap-1">
                              <input
                                type="number"
                                value={metaWidth}
                                onChange={(e) => setMetaWidth(e.target.value)}
                                placeholder="Width"
                                className="flex-1 text-label border border-gray-300 rounded px-1.5 py-0.5 focus:outline-none focus:border-gray-500 min-w-0"
                              />
                              <input
                                type="number"
                                value={metaHeight}
                                onChange={(e) => setMetaHeight(e.target.value)}
                                placeholder="Height"
                                className="flex-1 text-label border border-gray-300 rounded px-1.5 py-0.5 focus:outline-none focus:border-gray-500 min-w-0"
                              />
                            </div>
                            <div className="flex gap-1">
                              <button
                                type="button"
                                disabled={savingMeta}
                                onClick={() => handleSaveMeta(img.url)}
                                className="flex-1 text-label bg-gray-900 text-white rounded px-2 py-0.5 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                              >
                                {savingMeta ? '…' : 'Save'}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingMetaUrl(null)}
                                className="text-label text-gray-400 hover:text-gray-600 px-1"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Tags row */}
                            {/* {editingTagsUrl === img.url ? (
                              <div className="flex gap-1 mt-1" onClick={(e) => e.stopPropagation()}>
                                <input
                                  autoFocus
                                  type="text"
                                  value={editTagInput}
                                  onChange={(e) => setEditTagInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleUpdateTags(
                                        img.url,
                                        editTagInput
                                          .split(',')
                                          .map((t) => t.trim())
                                          .filter(Boolean)
                                      )
                                    }
                                    if (e.key === 'Escape') setEditingTagsUrl(null)
                                  }}
                                  placeholder="tag1, tag2"
                                  className="flex-1 text-label border border-gray-300 rounded px-1.5 py-0.5 focus:outline-none focus:border-gray-500"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateTags(
                                      img.url,
                                      editTagInput
                                        .split(',')
                                        .map((t) => t.trim())
                                        .filter(Boolean)
                                    )
                                  }
                                  className="text-label text-green-600 font-bold px-1"
                                >
                                  ✓
                                </button>
                              </div>
                            ) : (
                              <div
                                className="flex gap-1 flex-wrap mt-1 items-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {img.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-block px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-label"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                <button
                                  type="button"
                                  title="Edit tags"
                                  onClick={() => {
                                    setEditingTagsUrl(img.url)
                                    setEditTagInput(img.tags.join(', '))
                                  }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
                                >
                                  <Tag size={11} />
                                </button>
                              </div>
                            )} */}

                            {/* Properties summary + edit button */}
                            {selectedUrl === img.url && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  openMetaEdit(img)
                                }}
                                className="mt-1 text-label text-gray-400 hover:text-gray-700 transition-colors"
                              >
                                {img.alt || img.width || img.height
                                  ? `${img.alt ? img.alt.slice(0, 15) : '—'} · ${img.width ?? '?'}×${img.height ?? '?'}`
                                  : '+ alt / size'}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Upload Tab ── */}
          {tab === 'upload' && (
            <div
              className="space-y-4 max-w-md mx-auto"
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={(e) => {
                if (e.currentTarget.contains(e.relatedTarget as Node | null)) return
                setIsDragging(false)
              }}
            >
              {/* File picker */}
              {pendingItems.length > 0 ? (
                <div
                  className={`space-y-2 rounded-lg border-2 border-dashed p-2 transition-colors ${
                    isDragging ? 'border-gray-500 bg-gray-50' : 'border-transparent'
                  }`}
                >
                  <ul className="space-y-2">
                    {pendingItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 border border-gray-200 rounded-lg p-2 bg-white"
                      >
                        <div className="w-14 h-14 shrink-0 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.preview}
                            alt=""
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-body-sm font-bold text-gray-700 truncate"
                            title={item.file.name}
                          >
                            {item.file.name}
                          </p>
                          <p className="text-label text-gray-400">
                            {(item.file.size / 1024).toFixed(0)} KB
                            {item.status === 'error' && item.error && (
                              <span className="text-red-500"> · {item.error}</span>
                            )}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-1.5">
                          {item.status === 'uploading' && (
                            <Loader2 size={16} className="animate-spin text-gray-500" />
                          )}
                          {item.status === 'done' && (
                            <span className="text-green-600 inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-50">
                              <Check size={12} />
                            </span>
                          )}
                          {item.status === 'error' && (
                            <span className="text-red-500 inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-50">
                              <AlertCircle size={12} />
                            </span>
                          )}
                          {item.status !== 'uploading' && item.status !== 'done' && (
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              disabled={uploading}
                              className="text-label text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40"
                              title="Remove"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="inline-flex items-center gap-1.5 text-body-sm text-gray-600 hover:text-gray-900 disabled:opacity-40 transition-colors"
                    >
                      <Plus size={13} /> Add more files
                    </button>
                    <button
                      type="button"
                      onClick={clearAllPending}
                      disabled={uploading}
                      className="text-label text-gray-400 hover:text-red-500 disabled:opacity-40 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? [])
                      if (files.length > 0) addFiles(files)
                      e.target.value = ''
                    }}
                  />
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? 'border-gray-600 bg-gray-50'
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Upload size={28} />
                    <span className="text-body-sm font-bold text-gray-600">
                      Drop images here or click to browse
                    </span>
                    <span className="text-label">
                      PNG, JPG, SVG, WebP · max 5 MB each · multiple allowed
                    </span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? [])
                      if (files.length > 0) addFiles(files)
                      e.target.value = ''
                    }}
                  />
                </div>
              )}

              {uploadError && <p className="text-red-500 text-label">{uploadError}</p>}

              {/* Tags input — hidden when hideTags */}
              {/* {!hideTags && (
                <div>
                  <label className="block text-body-sm font-bold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Tag size={13} /> Tags{' '}
                      <span className="font-normal text-gray-400">(optional, comma-separated)</span>
                    </span>
                  </label>
                  <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 bg-white focus-within:border-gray-400 transition-colors">
                    <Plus size={13} className="text-gray-400 shrink-0" />
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && pendingFile) handleUpload()
                      }}
                      placeholder="hero, product, logo"
                      className="flex-1 text-body-sm text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-300"
                    />
                  </div>
                </div>
              )} */}

              {/* Upload button */}
              {(() => {
                const queuedCount = pendingItems.filter(
                  (it) => it.status === 'queued' || it.status === 'error'
                ).length
                return (
                  <button
                    type="button"
                    disabled={queuedCount === 0 || uploading}
                    onClick={handleUpload}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-body-sm font-bold rounded-lg transition-colors"
                  >
                    {uploading ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Uploading…
                      </>
                    ) : (
                      <>
                        <Upload size={14} /> Upload {queuedCount > 0 ? `${queuedCount} ` : ''}
                        {queuedCount === 1 ? 'file' : 'files'} to Media Library
                      </>
                    )}
                  </button>
                )
              })()}
            </div>
          )}
        </div>

        {/* Footer */}
        {tab === 'library' && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50">
            <p className="text-label text-gray-500">
              {images.length} image{images.length !== 1 ? 's' : ''}
              {selectedUrl && ' · 1 selected'}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-body-sm text-gray-600 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSelect}
                disabled={!selectedUrl}
                className="px-4 py-2 text-body-sm font-bold text-white bg-gray-900 rounded-lg hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Use Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
