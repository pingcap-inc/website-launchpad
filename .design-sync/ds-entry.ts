// Design-system surface exposed to claude.ai/design.
//
// This is the repo barrel (src/components/index.ts) plus the shadcn-style
// primitives that CLAUDE.md's Component Quick Reference documents as part of
// the design system but that the barrel does not re-export. Keep this file in
// step with that table — anything listed here becomes a component the design
// agent can build with.
// Must stay the first import — ES evaluation order is what puts the `process`
// shim ahead of the Next.js/prismjs internals that read it at module init.
import './shims/process-global'

export * from '../src/components'

// Preview-only wrapper (cfg.provider) — not a design-system component.
export { DsCanvas } from './shims/ds-canvas'

export { Badge } from '../src/components/ui/badge'
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../src/components/ui/accordion'
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../src/components/ui/dialog'
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '../src/components/ui/tooltip'
export { Separator } from '../src/components/ui/separator'
export { VideoDialog } from '../src/components/ui/VideoDialog'
export { SlideIn } from '../src/components/ui/SlideIn'
