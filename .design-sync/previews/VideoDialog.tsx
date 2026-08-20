import * as React from 'react'
import { PlayCircle } from 'lucide-react'
import { VideoDialog } from '@/components/ui/VideoDialog'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

// Only the trigger is previewed. Opening the dialog mounts a YouTube iframe
// with autoplay, which cannot render in an offline static capture — and the
// trigger is the component's whole visible surface on a page anyway.

/** Button trigger — the usual placement beside a hero CTA. */
export const ButtonTrigger = () => (
  <VideoDialog videoId="YU6jdrRc2cc" title="TiDB Cloud in 90 seconds">
    <SecondaryButton>Watch the Demo</SecondaryButton>
  </VideoDialog>
)

/** Thumbnail trigger — a poster image with a play affordance. */
export const ThumbnailTrigger = () => (
  <VideoDialog
    videoUrl="https://www.youtube.com/watch?v=YU6jdrRc2cc"
    title="TiDB Cloud in 90 seconds"
    description="A short product tour of TiDB Cloud Serverless."
  >
    <button
      type="button"
      className="group relative flex w-80 items-center justify-center overflow-hidden rounded-2xl border border-border-primary bg-carbon"
    >
      <img
        src="https://static.pingcap.com/images/62ca27ae-context-aware.svg"
        alt=""
        className="h-40 w-full object-cover opacity-70"
      />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <PlayCircle strokeWidth={1.5} className="h-12 w-12 text-text-inverse" />
        <span className="text-body-sm text-text-inverse">TiDB Cloud in 90 seconds</span>
      </span>
    </button>
  </VideoDialog>
)
