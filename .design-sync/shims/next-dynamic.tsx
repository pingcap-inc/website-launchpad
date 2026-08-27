// Stands in for next/dynamic inside the design bundle.
//
// next/dynamic depends on Next's loadable machinery. React.lazy + Suspense is
// the equivalent primitive and resolves in the browser, so dynamically-loaded
// children (e.g. the HubSpot form) still render in preview cards.
import * as React from 'react'

type Loaded<P> = React.ComponentType<P> | { default: React.ComponentType<P> }

export default function dynamic<P extends object>(
  loader: () => Promise<Loaded<P>>,
  opts?: { loading?: React.ComponentType<Record<string, unknown>>; ssr?: boolean }
): React.ComponentType<P> {
  const Lazy = React.lazy(async () => {
    const mod = (await loader()) as { default?: React.ComponentType<P> } & React.ComponentType<P>
    return { default: mod?.default ?? mod }
  })
  const Loading = opts?.loading

  return function DynamicShim(props: P) {
    return (
      <React.Suspense fallback={Loading ? <Loading /> : null}>
        <Lazy {...(props as P & React.JSX.IntrinsicAttributes)} />
      </React.Suspense>
    )
  }
}
