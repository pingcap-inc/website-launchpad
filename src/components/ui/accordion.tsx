'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Minus, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-border-primary', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-center gap-4 py-6 text-body-2xl font-medium text-current transition-colors duration-150 ease-in-out',
        className
      )}
      {...props}
    >
      <span className="flex h-6 w-6 items-center justify-center text-current">
        <Plus className="h-5 w-5 group-data-[state=open]:hidden" />
        <Minus className="hidden h-5 w-5 group-data-[state=open]:block" />
      </span>
      <span className="flex-1 text-left">{children}</span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  // `forceMount` keeps collapsed panels in the server-rendered HTML. Without it
  // Radix renders `isOpen && children`, so closed answers never reach the markup
  // and crawlers that don't execute JS (and can't click) only ever see the one
  // panel opened by `defaultValue`.
  //
  // The open/close animation lives in `.accordion-panel` (globals.css) rather
  // than Radix's height keyframes, which `forceMount` breaks — see the comment
  // there. The inner wrapper is the grid row; padding stays on the child so it
  // collapses with the row instead of holding the panel open.
  <AccordionPrimitive.Content ref={ref} forceMount className="accordion-panel" {...props}>
    <div>
      <div className={cn('pb-6 pl-10 text-body-md text-secondary leading-relaxed', className)}>
        {children}
      </div>
    </div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
