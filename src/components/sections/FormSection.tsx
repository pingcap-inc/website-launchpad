import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LazyHubSpotForm } from '@/components/ui/LazyHubSpotForm'

export interface FormSectionProps {
  title?: string
  subtitle?: string
  portalId: string
  formId: string
  region?: string
  className?: string
}

export function FormSection({
  title,
  subtitle,
  portalId,
  formId,
  region,
  className,
}: FormSectionProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 md:gap-8', className)}>
      {(title || subtitle) && (
        <SectionHeader title={title ?? ''} subtitle={subtitle} className="mb-8" />
      )}
      <LazyHubSpotForm portalId={portalId} formId={formId} region={region} />
    </div>
  )
}
