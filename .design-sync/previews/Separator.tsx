import * as React from 'react'
import { Separator } from '@/components/ui/separator'

/** Horizontal rule between stacked content blocks — the common use. */
export const BetweenSections = () => (
  <div className="max-w-2xl">
    <p className="text-h3-sm text-text-inverse">Serverless</p>
    <p className="mt-2 text-body-md text-carbon-300">
      Scales to zero between bursts and bills only for what a workload consumes.
    </p>
    <Separator className="my-6" />
    <p className="text-h3-sm text-text-inverse">Dedicated</p>
    <p className="mt-2 text-body-md text-carbon-300">
      Reserved capacity with predictable throughput for steady production traffic.
    </p>
  </div>
)

/** Vertical orientation — divides inline items such as a meta row. */
export const VerticalInline = () => (
  <div className="flex h-6 items-center gap-4 text-body-sm text-carbon-300">
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Pricing</span>
    <Separator orientation="vertical" />
    <span>Support</span>
  </div>
)
