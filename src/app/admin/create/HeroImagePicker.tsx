'use client'

import { ImageField } from './ImageField'

// 22 preset hero illustrations from public/images/hero/r/
const PRESET_COUNT = 22
const PRESETS = Array.from({ length: PRESET_COUNT }, (_, i) => ({
  label: `Graphic-${i + 1}`,
  src: `/images/hero/r/Graphic-${i + 1}-Dk.png`,
}))

interface HeroImagePickerProps {
  value?: string
  onChange: (value: string) => void
  slug?: string
}

export function HeroImagePicker({ value, onChange, slug }: HeroImagePickerProps) {
  return (
    <div className="space-y-3">
      <label className="block text-body-sm font-bold text-gray-700">Hero Image</label>

      {/* Preset thumbnails */}
      <div>
        <p className="text-label text-gray-400 mb-1.5">Preset illustrations</p>
        <div className="grid grid-cols-4 gap-1.5 max-h-40 overflow-y-auto pr-1">
          {PRESETS.map(({ label, src }) => {
            const selected = value === src
            return (
              <button
                key={src}
                type="button"
                title={label}
                onClick={() => onChange(src)}
                className={[
                  'border-2 rounded overflow-hidden transition-all aspect-video bg-gray-900',
                  selected
                    ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-1'
                    : 'border-transparent hover:border-gray-400',
                ].join(' ')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={label} className="w-full h-full object-cover" />
              </button>
            )
          })}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <ImageField
          value={value && !PRESETS.some((p) => p.src === value) ? value : ''}
          onChange={onChange}
          slug={slug}
          label="Custom image"
        />
      </div>
    </div>
  )
}
