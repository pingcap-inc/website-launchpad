'use client'

import { useRef, useState } from 'react'
import { Upload, Link2, Loader2 } from 'lucide-react'

interface ImageFieldProps {
  value?: string
  onChange: (value: string) => void
  slug?: string
  label?: string
  /** Compact mode hides the label and shows minimal UI (used inside IconPicker) */
  compact?: boolean
}

export function ImageField({
  value,
  onChange,
  slug,
  label = 'Image',
  compact = false,
}: ImageFieldProps) {
  const [urlInput, setUrlInput] = useState(
    value && (value.startsWith('http') || value.startsWith('/')) ? value : ''
  )
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File must be under 5 MB')
      return
    }
    setUploading(true)
    setUploadError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('slug', slug ?? 'admin')
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: formData })
      const data = (await res.json()) as { path?: string; error?: string }
      if (!res.ok || data.error) throw new Error(data.error ?? 'Upload failed')
      onChange(data.path!)
      setUrlInput(data.path!)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  const handleUrlSubmit = () => {
    const trimmed = urlInput.trim()
    if (trimmed) onChange(trimmed)
  }

  return (
    <div className={compact ? 'space-y-2' : 'space-y-2'}>
      {!compact && label && (
        <label className="block text-body-sm font-bold text-gray-700">{label}</label>
      )}

      {/* Preview */}
      {value && (
        <div className="relative w-full h-24 border border-gray-200 rounded overflow-hidden bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="w-full h-full object-contain p-2" />
          <button
            type="button"
            onClick={() => {
              onChange('')
              setUrlInput('')
            }}
            className="absolute top-1 right-1 bg-white border border-gray-200 rounded px-1.5 text-label text-gray-500 hover:text-red-600 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Upload drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border border-dashed border-gray-300 rounded px-3 py-3 text-center hover:border-gray-400 transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500 text-body-sm">
            <Loader2 size={14} className="animate-spin" /> Uploading…
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-gray-400 text-body-sm">
            <Upload size={13} />
            <span>Drop or click to upload</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml,image/webp"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleUpload(f)
          }}
        />
      </div>

      {uploadError && <p className="text-red-500 text-label">{uploadError}</p>}

      {/* URL input */}
      <div className="flex gap-1">
        <div className="flex-1 flex items-center gap-1.5 border border-gray-200 rounded px-2 py-1.5 bg-white focus-within:border-gray-400 transition-colors">
          <Link2 size={12} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUrlSubmit()
            }}
            placeholder="https://... or /images/..."
            className="flex-1 text-body-sm text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-300"
          />
        </div>
        <button
          type="button"
          onClick={handleUrlSubmit}
          disabled={!urlInput.trim()}
          className="px-2 py-1.5 border border-gray-200 rounded text-label font-bold text-gray-600 hover:border-gray-400 disabled:opacity-40 transition-colors"
        >
          Use
        </button>
      </div>
    </div>
  )
}
