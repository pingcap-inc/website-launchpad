// Stands in for next/link inside the design bundle.
//
// The real next/link reads the App Router context, which does not exist in a
// standalone render. A plain <a> is the correct static equivalent and keeps
// hrefs clickable in preview cards.
import * as React from 'react'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string | { pathname?: string }
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  locale?: string | false
}

export default function Link({
  href,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  shallow: _shallow,
  locale: _locale,
  ...rest
}: LinkProps) {
  const url = typeof href === 'string' ? href : (href?.pathname ?? '#')
  return <a href={url} {...rest} />
}
