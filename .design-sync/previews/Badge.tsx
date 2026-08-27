import * as React from 'react'
import { Badge } from '@/components/ui/badge'

/** All three variants side by side — outline (default), default (red), secondary (carbon). */
export const AllVariants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge>Distributed SQL</Badge>
    <Badge variant="default">New</Badge>
    <Badge variant="secondary">Beta</Badge>
  </div>
)

/** The red `default` variant flagging a just-shipped capability next to its title. */
export const NewFeatureTag = () => (
  <div className="flex items-center gap-3">
    <h3 className="text-h3-lg text-text-inverse">Vector Search</h3>
    <Badge variant="default">New</Badge>
  </div>
)

/** Carbon `secondary` for release-status labels. */
export const StatusTags = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge variant="secondary">Public Preview</Badge>
    <Badge variant="secondary">Beta</Badge>
    <Badge variant="secondary">Deprecated</Badge>
  </div>
)

/** Outline chips as category labels — the quietest treatment. */
export const CategoryChips = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Badge variant="outline">Open Source</Badge>
    <Badge variant="outline">HTAP</Badge>
    <Badge variant="outline">MySQL Compatible</Badge>
  </div>
)
