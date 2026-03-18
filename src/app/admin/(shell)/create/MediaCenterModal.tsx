'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Upload, X, Check, Loader2, Tag, Image as ImageIcon, Plus } from 'lucide-react'
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

interface MediaCenterModalProps {
  open: boolean
  onClose: () => void
  onSelect: (img: ImageRef) => void
  currentUrl?: string
  initialTab?: 'library' | 'upload'
  /** When provided, pre-load this file into the upload zone (not auto-uploaded) */
  initialFile?: File
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
  initialFile,
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

  // Pending file — shown in upload zone but not yet uploaded
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [pendingPreview, setPendingPreview] = useState<string | null>(null)

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
      if (pendingPreview) URL.revokeObjectURL(pendingPreview)
      setPendingFile(null)
      setPendingPreview(null)
      setTagInput('')
      setUploadError('')
      setEditingMetaUrl(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (open && initialFile) {
      setPending(initialFile)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialFile])

  const setPending = (file: File) => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview)
    setPendingFile(file)
    setPendingPreview(URL.createObjectURL(file))
  }

  const clearPending = () => {
    if (pendingPreview) URL.revokeObjectURL(pendingPreview)
    setPendingFile(null)
    setPendingPreview(null)
  }

  const handleUpload = async () => {
    if (!pendingFile) return
    if (pendingFile.size > 5 * 1024 * 1024) {
      setUploadError('File must be under 5 MB')
      return
    }
    setUploading(true)
    setUploadError('')
    try {
      const formData = new FormData()
      formData.append('file', pendingFile)
      formData.append('source', 'media')
      if (!hideTags) formData.append('tags', tagInput)
      else if (defaultTag) formData.append('tags', defaultTag)
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: formData })
      const data = (await res.json()) as { path?: string; error?: string }
      if (!res.ok || data.error) throw new Error(data.error ?? 'Upload failed')
      await fetchImages()
      setSelectedUrl(data.path!)
      clearPending()
      setTab('library')
      setTagInput('')
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) setPending(file)
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

  const handleConfirmSelect = () => {
    if (!selectedUrl) return
    const img = images.find((i) => i.url === selectedUrl)
    const result: ImageRef = {
      url: selectedUrl,
      ...(img?.alt ? { alt: img.alt } : {}),
      ...(img?.width ? { width: img.width } : {}),
      ...(img?.height ? { height: img.height } : {}),
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
                            {editingTagsUrl === img.url ? (
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
                            )}

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
            <div className="space-y-4 max-w-md mx-auto">
              {/* File picker */}
              {pendingFile ? (
                <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 flex items-center justify-center h-40">
                    {pendingPreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={pendingPreview}
                        alt=""
                        className="max-h-full max-w-full object-contain p-3"
                      />
                    ) : (
                      <ImageIcon size={40} strokeWidth={1} className="text-gray-300" />
                    )}
                  </div>
                  <div className="px-4 py-3 bg-white flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-body-sm font-bold text-gray-700 truncate">
                        {pendingFile.name}
                      </p>
                      <p className="text-label text-gray-400">
                        {(pendingFile.size / 1024).toFixed(0)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={clearPending}
                      className="text-label text-gray-400 hover:text-red-500 transition-colors shrink-0"
                    >
                      Change
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDrop={handleDrop}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragging(true)
                  }}
                  onDragLeave={() => setIsDragging(false)}
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
                      Drop image here or click to browse
                    </span>
                    <span className="text-label">PNG, JPG, SVG, WebP · max 5 MB</span>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) setPending(f)
                      e.target.value = ''
                    }}
                  />
                </div>
              )}

              {uploadError && <p className="text-red-500 text-label">{uploadError}</p>}

              {/* Tags input — hidden when hideTags */}
              {!hideTags && (
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
              )}

              {/* Upload button */}
              <button
                type="button"
                disabled={!pendingFile || uploading}
                onClick={handleUpload}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-900 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-body-sm font-bold rounded-lg transition-colors"
              >
                {uploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Uploading…
                  </>
                ) : (
                  <>
                    <Upload size={14} /> Upload to Media Library
                  </>
                )}
              </button>
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
