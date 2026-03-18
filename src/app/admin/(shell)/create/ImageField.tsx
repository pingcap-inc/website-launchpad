'use client'

import { useState } from 'react'
import { Upload, FolderOpen } from 'lucide-react'

import type { ImageRef } from '@/lib/dsl-schema'
import { MediaCenterModal } from './MediaCenterModal'

interface ImageFieldProps {
  value?: ImageRef
  onChange: (value?: ImageRef) => void
  slug?: string
  label?: string
  /** Compact mode hides the label and shows minimal UI (used inside IconPicker) */
  compact?: boolean
  /** Default tag applied to uploads and pre-selected in library filter */
  defaultTag?: string
}

export function ImageField({
  value,
  onChange,
  slug: _slug,
  label = 'Image',
  compact = false,
  defaultTag,
}: ImageFieldProps) {
  const [mediaCenterOpen, setMediaCenterOpen] = useState(false)
  const [initialTab, setInitialTab] = useState<'library' | 'upload'>('library')
  const [initialFile, setInitialFile] = useState<File | undefined>()
  const [isDragging, setIsDragging] = useState(false)

  const openUpload = (file?: File) => {
    setInitialTab('upload')
    setInitialFile(file)
    setMediaCenterOpen(true)
  }

  const openLibrary = () => {
    setInitialTab('library')
    setInitialFile(undefined)
    setMediaCenterOpen(true)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) openUpload(file)
  }

  return (
    <div className="space-y-2">
      {!compact && label && (
        <label className="block text-body-sm font-bold text-gray-700">{label}</label>
      )}

      {/* Preview */}
      {value?.url && (
        <div className="relative w-full h-24 border border-gray-200 rounded overflow-hidden bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.url} alt="" className="w-full h-full object-contain p-2" />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute top-1 right-1 bg-white border border-gray-200 rounded px-1.5 text-label text-gray-500 hover:text-red-600 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Unified upload + library zone */}
      <div
        className={`flex rounded border transition-colors ${
          isDragging ? 'border-gray-400 bg-gray-50' : 'border-dashed border-gray-300'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {/* Left: upload via media library */}
        <div
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-l"
          onClick={() => openUpload()}
        >
          <Upload size={13} className="text-gray-400 shrink-0" />
          <span className="text-body-sm text-gray-400 whitespace-nowrap">Upload</span>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-200 my-2" />

        {/* Right: media library */}
        <button
          type="button"
          onClick={openLibrary}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-body-sm text-blue-600 hover:bg-blue-50 transition-colors rounded-r"
        >
          <FolderOpen size={13} className="shrink-0" />
          <span className="whitespace-nowrap">Media Library</span>
        </button>
      </div>

      {/* Media Center Modal */}
      <MediaCenterModal
        open={mediaCenterOpen}
        onClose={() => setMediaCenterOpen(false)}
        onSelect={(img) => onChange(img)}
        currentUrl={value?.url}
        initialTab={initialTab}
        initialFile={initialFile}
        hideTags
        defaultTag={defaultTag}
      />
    </div>
  )
}
