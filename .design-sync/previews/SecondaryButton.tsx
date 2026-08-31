import * as React from 'react'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

/** Dark background (the default) — white label with the outlined arrow chip. */
export const Default = () => <SecondaryButton href="/developers/">Read the Docs</SecondaryButton>

/**
 * `dark={false}` — the light-surface variant. Shown on a white panel because
 * that is the only place it is legible; on the dark canvas it would be
 * black-on-black.
 */
export const OnLightSurface = () => (
  <div className="bg-bg-inverse px-8 py-6">
    <SecondaryButton href="/developers/" dark={false}>
      Read the Docs
    </SecondaryButton>
  </div>
)

/** Long labels stay on one line — the component sets `whitespace-nowrap`. */
export const LongLabel = () => (
  <SecondaryButton href="/tidb-cloud/serverless/">
    Explore TiDB Cloud Serverless Pricing
  </SecondaryButton>
)
