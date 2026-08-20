// Stands in for next/image inside the design bundle.
//
// The real next/image routes every src through Next's optimizer endpoint
// (/_next/image?url=…), which does not exist outside a running Next server —
// so every image in every design would 404. This renders a plain <img> against
// the original URL (these are absolute static.pingcap.com CDN URLs), which is
// what actually resolves in the design environment.
//
// Prop-compatible with next/image, and internal to the bundle: no design-system
// component re-exports Image, so nothing the design agent writes is affected.
import * as React from 'react'

type StaticSrc = { src: string; width?: number; height?: number }

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | StaticSrc
  alt: string
  width?: number | string
  height?: number | string
  /** Next's absolute-fill mode — reproduced with CSS. */
  fill?: boolean
  priority?: boolean
  quality?: number
  placeholder?: string
  blurDataURL?: string
  unoptimized?: boolean
  loader?: unknown
}

export default function Image({
  src,
  fill,
  priority: _priority,
  quality: _quality,
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  unoptimized: _unoptimized,
  loader: _loader,
  style,
  ...rest
}: ImageProps) {
  const url = typeof src === 'string' ? src : src?.src
  const fillStyle: React.CSSProperties = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
    : {}
  return <img src={url} style={{ ...fillStyle, ...style }} {...rest} />
}
