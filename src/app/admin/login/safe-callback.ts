/** Where to land after sign-in when no (valid) callbackUrl was supplied. */
export const DEFAULT_ADMIN_CALLBACK = '/admin/'

/**
 * Validate a post-login `callbackUrl`. Only a same-origin, relative path inside the
 * admin (`/admin` or `/admin/...`) is accepted; absolute URLs, protocol-relative
 * `//host`, backslashes (browsers treat `/\\host` like `//host`), control characters
 * and anything outside /admin fall back to DEFAULT_ADMIN_CALLBACK.
 */
export function safeAdminCallback(value: unknown): string {
  if (typeof value !== 'string' || value.length === 0 || value.length > 2048) {
    return DEFAULT_ADMIN_CALLBACK
  }
  if (!value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u001f\u007f]/.test(value)) {
    return DEFAULT_ADMIN_CALLBACK
  }
  try {
    const base = 'http://admin.invalid'
    const url = new URL(value, base)
    if (url.origin !== base) return DEFAULT_ADMIN_CALLBACK
    if (url.pathname !== '/admin' && !url.pathname.startsWith('/admin/')) {
      return DEFAULT_ADMIN_CALLBACK
    }
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return DEFAULT_ADMIN_CALLBACK
  }
}
