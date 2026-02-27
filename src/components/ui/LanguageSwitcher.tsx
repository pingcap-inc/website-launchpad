'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown } from 'lucide-react'

const languages = [
  { label: 'English', href: '/', external: false },
  { label: '日本語', href: 'https://pingcap.co.jp/', external: true },
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
    if (lang.external) {
      window.open(lang.href, '_blank', 'noopener,noreferrer')
    } else {
      window.location.href = lang.href
    }
  }

  return (
    <div ref={ref} className="relative mt-16">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 text-body-md text-text-inverse hover:text-carbon-400 transition-colors duration-150"
      >
        <Globe size={16} className="shrink-0" />
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
              key={lang.href}
              type="button"
              onClick={() => select(lang)}
              className={`w-full text-left px-3 py-2 text-body-sm transition-colors duration-150 ${
                lang.href === current.href
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
