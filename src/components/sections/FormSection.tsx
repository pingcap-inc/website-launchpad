import Image from 'next/image'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LazyHubSpotForm } from '@/components/ui/LazyHubSpotForm'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

/**
 * Optional left-hand column shown beside the form (e.g. "Tour TiDB Cloud").
 * When omitted, FormSection renders exactly as before: header left, form right.
 */
export interface FormSectionDemo {
  title: string
  body?: string
  bullets?: string[]
  cta: { text: string; href: string }
  /** Decorative illustration pinned to the bottom of the column. */
  image?: { src: string; width: number; height: number }
}

export interface FormSectionProps {
  title?: string
  subtitle?: string
  portalId: string
  formId: string
  region?: string
  /** Left column content. Switches to the centered-header, two-card layout. */
  demo?: FormSectionDemo
  /** Heading above the form, used with `demo`. */
  formTitle?: string
  /** Text under `formTitle`, used with `demo`. */
  formSubtitle?: string
  className?: string
}

export function FormSection({
  title,
  subtitle,
  portalId,
  formId,
  region,
  demo,
  formTitle,
  formSubtitle,
  className,
}: FormSectionProps) {
  if (demo) {
    return (
      <div className={cn('space-y-12', className)}>
        {(title || subtitle) && (
          <SectionHeader title={title ?? ''} subtitle={subtitle} align="center" />
        )}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-6 border border-carbon-800 p-8">
            <h3 className="text-h3-lg md:text-h3-xl font-bold leading-normal m-0">{demo.title}</h3>
            {demo.body && (
              <p className="text-body-md leading-relaxed text-secondary m-0">{demo.body}</p>
            )}
            {demo.bullets && demo.bullets.length > 0 && (
              <ul className="list-disc space-y-2 pl-5 text-body-md text-secondary">
                {demo.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            <div>
              <PrimaryButton href={demo.cta.href}>{demo.cta.text}</PrimaryButton>
            </div>
            {demo.image && (
              <Image
                src={demo.image.src}
                alt=""
                width={demo.image.width}
                height={demo.image.height}
                className="mt-auto h-auto w-full max-w-[465px] self-center"
              />
            )}
          </div>
          <div className="flex flex-col gap-4 border border-carbon-800 p-8">
            {formTitle && (
              <h3 className="text-h3-lg md:text-h3-xl font-bold leading-normal m-0">{formTitle}</h3>
            )}
            {formSubtitle && (
              <p className="text-body-md leading-relaxed text-secondary m-0">{formSubtitle}</p>
            )}
            <LazyHubSpotForm portalId={portalId} formId={formId} region={region} className="mt-4" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 md:gap-8', className)}>
      {(title || subtitle) && (
        <SectionHeader title={title ?? ''} subtitle={subtitle} className="mb-8" />
      )}
      <LazyHubSpotForm portalId={portalId} formId={formId} region={region} className="mt-4" />
    </div>
  )
}
