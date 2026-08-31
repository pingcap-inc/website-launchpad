// Stands in for next/navigation inside the design bundle.
//
// These hooks throw outside a Next router. Components use them for analytics
// and active-nav state, both of which are inert in a static preview, so the
// stubs return neutral values rather than wiring up a fake router.
const noop = () => {}

export function usePathname(): string {
  return '/'
}

export function useSearchParams(): URLSearchParams {
  return new URLSearchParams()
}

export function useParams(): Record<string, string> {
  return {}
}

export function useRouter() {
  return { push: noop, replace: noop, back: noop, forward: noop, refresh: noop, prefetch: noop }
}

export function redirect(_url: string): void {}
export function notFound(): void {}
