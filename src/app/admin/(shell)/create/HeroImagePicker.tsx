'use client'

import { ImageField } from './ImageField'
import type { ImageRef } from '@/lib/dsl-schema'

// 22 preset hero illustrations from public/images/hero/r/
const PRESET_COUNT = 22
const PRESETS = Array.from({ length: PRESET_COUNT }, (_, i) => ({
  label: `Graphic-${i + 1}`,
  image: { url: `/images/hero/r/Graphic-${i + 1}-Dk.png` } as ImageRef,
}))

interface HeroImagePickerProps {
  value?: ImageRef
  onChange: (value?: ImageRef) => void
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
          {PRESETS.map(({ label, image }) => {
            const selected = value?.url === image.url
            return (
              <button
                key={image.url}
                type="button"
                title={label}
                onClick={() => onChange(image)}
                className={[
                  'border-2 rounded overflow-hidden transition-all aspect-video bg-gray-900',
                  selected
                    ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-1'
                    : 'border-transparent hover:border-gray-400',
                ].join(' ')}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.url} alt={label} className="w-full h-full object-cover" />
              </button>
            )
          })}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3">
        <ImageField
          value={value && !PRESETS.some((p) => p.image.url === value.url) ? value : undefined}
          onChange={onChange}
          slug={slug}
          label="Custom image"
        />
      </div>
    </div>
  )
}
