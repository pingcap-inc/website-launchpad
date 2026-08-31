import * as React from 'react'
import { MessagesSquare } from 'lucide-react'
import { GhostButton } from '@/components/ui/GhostButton'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

/** The header's sign-in affordance — transparent pill, white label. */
export const Default = () => <GhostButton href="https://tidbcloud.com/signin">Sign In</GhostButton>

/** How it actually ships: ghost + primary as the header's right-hand cluster. */
export const InHeaderCluster = () => (
  <div className="flex flex-wrap items-center gap-4">
    <GhostButton href="https://tidbcloud.com/signin">Sign In</GhostButton>
    <PrimaryButton href="https://tidbcloud.com/free-trial/">Start for Free</PrimaryButton>
  </div>
)

/** The built-in `gap-2` leaves room for a leading Lucide icon. */
export const WithIcon = () => (
  <GhostButton href="/contact-us/">
    <MessagesSquare strokeWidth={1.5} className="h-5 w-5" />
    Contact Sales
  </GhostButton>
)
