import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

/**
 * Open state — `defaultOpen` so the dialog renders in a static capture.
 * On a page the same markup opens from its trigger.
 */
export const Open = () => (
  <Dialog defaultOpen>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Start Your Free Trial</DialogTitle>
        <DialogDescription>
          Spin up a TiDB Cloud Serverless cluster in about 30 seconds. No credit card required.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <PrimaryButton href="/tidb-cloud/">Create Cluster</PrimaryButton>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

/** Closed state — only the trigger is visible, as it first appears on a page. */
export const Trigger = () => (
  <Dialog>
    <DialogTrigger asChild>
      <PrimaryButton>Start Your Free Trial</PrimaryButton>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Start Your Free Trial</DialogTitle>
        <DialogDescription>Spin up a cluster in about 30 seconds.</DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
)
