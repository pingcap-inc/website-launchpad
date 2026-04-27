'use client'

import { useMemo, useState, type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

function buildEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url)

    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      return id ? buildEmbedUrl(id) : null
    }

    if (parsed.hostname.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        const id = parsed.searchParams.get('v')
        return id ? buildEmbedUrl(id) : null
      }

      if (parsed.pathname.startsWith('/embed/')) {
        const id = parsed.pathname.split('/embed/')[1]
        return id ? buildEmbedUrl(id) : null
      }
    }
  } catch {
    return null
  }

  return null
}

interface VideoDialogProps {
  /** YouTube video ID (e.g. "YU6jdrRc2cc"). Used when you have a known ID. */
  videoId?: string
  /** Full YouTube URL (youtu.be / watch?v= / embed/ supported). Used when source is user-provided. */
  videoUrl?: string
  /** Accessible title shown to screen readers and used as the iframe title. */
  title: string
  /** Optional sr-only description for the dialog. */
  description?: string
  /** The trigger element — typically a button or styled thumbnail. */
  children: ReactNode
}

export function VideoDialog({
  videoId,
  videoUrl,
  title,
  description = 'Watch the video on YouTube.',
  children,
}: VideoDialogProps) {
  const [open, setOpen] = useState(false)
  const embedUrl = useMemo(() => {
    if (videoId) return buildEmbedUrl(videoId)
    if (videoUrl) return getYouTubeEmbedUrl(videoUrl)
    return null
  }, [videoId, videoUrl])

  if (!embedUrl) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[calc(100vw-32px)] sm:w-[calc(100vw-64px)] max-w-5xl border-0 bg-transparent p-0 shadow-none [&>button]:right-0 [&>button]:top-[-42px] [&>button]:rounded-full [&>button]:bg-transparent [&>button]:text-[#00B8FF] [&>button]:opacity-100 [&>button]:hover:bg-transparent [&>button]:hover:text-[#44CCFF] [&>button_svg]:h-8 [&>button_svg]:w-8">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
          {open ? (
            <iframe
              src={embedUrl}
              title={title}
              className="aspect-video w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
