const INTERNAL_HOST = 'www.pingcap.com'

const ABSOLUTE_URL_RE = /^[a-zA-Z][a-zA-Z0-9+.-]*:/

export function isExternalHref(href?: string) {
  if (!href) return false
  if (href.startsWith('/') || href.startsWith('#')) return false
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('sms:')) {
    return false
  }

  const isProtocolRelative = href.startsWith('//')
  const isAbsolute = isProtocolRelative || ABSOLUTE_URL_RE.test(href)

  if (!isAbsolute) return false

  try {
    const url = new URL(href, `https://${INTERNAL_HOST}`)
    return url.hostname !== INTERNAL_HOST
  } catch {
    return false
  }
}

export function externalLinkProps(href?: string) {
  return isExternalHref(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}
