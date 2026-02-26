'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'

const languages = [
  { label: 'English', value: '/' },
  { label: '日本語', value: '/ja/' },
]

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(languages[0])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function select(lang: (typeof languages)[0]) {
    setCurrent(lang)
    setOpen(false)
    window.location.href = lang.value
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 text-body-sm text-text-inverse hover:text-carbon-400 transition-colors duration-150"
      >
        <Globe size={15} className="shrink-0 text-carbon-400" />
        <span>{current.label}</span>
        <ChevronDown
          size={13}
          className={`text-carbon-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full mt-1 left-0 min-w-[120px] bg-[#0a0a0a] border border-carbon-800 z-10">
          {languages.map((lang) => (
            <button
              key={lang.value}
              type="button"
              onClick={() => select(lang)}
              className={`w-full text-left px-3 py-2 text-body-sm transition-colors duration-150 ${
                lang.value === current.value
                  ? 'text-text-inverse'
                  : 'text-carbon-400 hover:text-text-inverse'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
