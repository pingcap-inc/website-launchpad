import * as React from 'react'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'

export const Default = () => <PrimaryButton href="/tidb-cloud/">Start Free Trial</PrimaryButton>

/** The canonical hero pairing — primary alongside secondary. */
export const WithSecondary = () => (
  <div className="flex flex-wrap items-center gap-4">
    <PrimaryButton href="/tidb-cloud/">Start Free Trial</PrimaryButton>
    <SecondaryButton href="/developers/">Read the Docs</SecondaryButton>
  </div>
)

export const LongLabel = () => (
  <PrimaryButton href="/contact-us/">Talk to a Solutions Engineer</PrimaryButton>
)
