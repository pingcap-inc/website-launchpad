'use client'

import { useState, useRef, useCallback } from 'react'
import { Loader2, Upload } from 'lucide-react'

function extractGoogleDocId(url: string): string | null {
  const match = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/)
  return match ? match[1] : null
}

export function ImportInput({ onImport }: { onImport: (text: string) => void }) {
  // Google Docs state
  const [gdocUrl, setGdocUrl] = useState('')
  const [gdocLoading, setGdocLoading] = useState(false)
  const [gdocError, setGdocError] = useState('')

  // File upload state
  const [fileError, setFileError] = useState('')
  const [fileLoading, setFileLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Paste state
  const [pastedText, setPastedText] = useState('')

  // ── Google Docs import ──────────────────────────────────────────────────────
  const handleGdocImport = async () => {
    setGdocError('')
    const docId = extractGoogleDocId(gdocUrl)
    if (!docId) {
      setGdocError('Invalid Google Docs URL.')
      return
    }
    setGdocLoading(true)
    try {
      const res = await fetch(`/api/import-gdoc?docId=${encodeURIComponent(docId)}`)
      const data = (await res.json()) as { text?: string; error?: string }
      if (!res.ok || data.error) {
        throw new Error(data.error ?? 'Failed to fetch')
      }
      onImport(data.text ?? '')
    } catch {
      setGdocError(
        "Could not access this document. Make sure it's set to 'Anyone with the link can view'."
      )
    } finally {
      setGdocLoading(false)
    }
  }

  // ── File upload ─────────────────────────────────────────────────────────────
  const handleFile = useCallback(
    async (file: File) => {
      setFileError('')
      const ext = file.name.split('.').pop()?.toLowerCase()

      if (ext === 'md') {
        const text = await file.text()
        onImport(text)
      } else if (ext === 'docx') {
        setFileLoading(true)
        try {
          const mammoth = await import('mammoth')
          const arrayBuffer = await file.arrayBuffer()
          const result = await mammoth.extractRawText({ arrayBuffer })
          onImport(result.value)
        } catch {
          setFileError('Failed to read .docx file.')
        } finally {
          setFileLoading(false)
        }
      } else {
        setFileError('Only .docx and .md files are supported.')
      }
    },
    [onImport]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragActive(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  // ── Paste ───────────────────────────────────────────────────────────────────
  const handlePasteImport = () => {
    if (pastedText.trim()) onImport(pastedText.trim())
  }

  return (
    <div className="space-y-4">
      {/* Google Docs */}
      <div>
        <p className="text-body-sm font-medium text-gray-700 mb-2">Import from Google Docs</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={gdocUrl}
            onChange={(e) => {
              setGdocUrl(e.target.value)
              setGdocError('')
            }}
            placeholder="Paste a Google Docs URL…"
            className="flex-1 border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-300"
          />
          <button
            type="button"
            onClick={handleGdocImport}
            disabled={!gdocUrl.trim() || gdocLoading}
            className="border border-gray-300 bg-white text-gray-700 font-bold text-body-sm px-3 py-1.5 rounded hover:border-gray-400 disabled:opacity-40 transition-colors flex items-center gap-1.5"
          >
            {gdocLoading ? (
              <>
                <Loader2 size={13} className="animate-spin" /> Fetching…
              </>
            ) : (
              'Import'
            )}
          </button>
        </div>
        {gdocError && <p className="text-label text-red-600 mt-1.5">{gdocError}</p>}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-gray-100" />
        <span className="text-body-sm text-gray-300">or</span>
        <div className="flex-1 border-t border-gray-100" />
      </div>

      {/* File upload */}
      <div>
        <p className="text-body-sm font-medium text-gray-700 mb-2">Upload a file</p>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center text-body-sm cursor-pointer transition-colors ${
            dragActive
              ? 'border-gray-400 bg-gray-50 text-gray-600'
              : 'border-gray-200 text-gray-400 hover:border-gray-300'
          }`}
        >
          {fileLoading ? (
            <span className="flex items-center justify-center gap-2 text-gray-400">
              <Loader2 size={14} className="animate-spin" /> Reading file…
            </span>
          ) : (
            <span className="flex flex-col items-center gap-1">
              <Upload size={18} strokeWidth={1.5} />
              Drop a .docx or .md file here, or click to browse
            </span>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx,.md"
          onChange={handleFileChange}
          className="hidden"
        />
        {fileError && <p className="text-label text-red-600 mt-1.5">{fileError}</p>}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-gray-100" />
        <span className="text-body-sm text-gray-300">or</span>
        <div className="flex-1 border-t border-gray-100" />
      </div>

      {/* Paste text */}
      <div>
        <p className="text-body-sm font-medium text-gray-700 mb-2">Paste content directly</p>
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          placeholder="Paste your existing content here…"
          className="w-full border border-gray-200 rounded px-2.5 py-1.5 text-body-sm text-gray-800 focus:outline-none focus:border-gray-400 transition-colors resize-y min-h-[200px] placeholder:text-gray-300"
        />
        <button
          type="button"
          onClick={handlePasteImport}
          disabled={!pastedText.trim()}
          className="mt-2 border border-gray-300 bg-white text-gray-700 font-bold text-body-sm px-3 py-1.5 rounded hover:border-gray-400 disabled:opacity-40 transition-colors"
        >
          Use this content →
        </button>
      </div>
    </div>
  )
}
