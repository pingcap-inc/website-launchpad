'use client'

import { Play } from 'lucide-react'
import { VideoDialog } from '@/components/ui/VideoDialog'

const VIDEO_ID = 'YU6jdrRc2cc'
const VIDEO_TITLE = 'What is TiDB?'

export function HeroVideo() {
  return (
    <VideoDialog
      videoId={VIDEO_ID}
      title={VIDEO_TITLE}
      description="Watch the TiDB overview video on YouTube."
    >
      <button
        type="button"
        aria-label={`Watch: ${VIDEO_TITLE}`}
        className="group relative flex aspect-video w-full items-center justify-center overflow-hidden border border-carbon-900 bg-[#2A2A2A]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 transition-colors duration-200 ease-in-out group-hover:bg-black/20" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.12] backdrop-blur-sm transition-transform duration-200 ease-in-out group-hover:scale-105">
          <Play className="ml-1 h-10 w-10 fill-white text-white/80" strokeWidth={1.5} />
        </div>
      </button>
    </VideoDialog>
  )
}
