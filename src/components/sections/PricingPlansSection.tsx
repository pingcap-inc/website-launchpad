import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { RichTextBlock } from '@/components/sections/RichTextBlock'
import { cn } from '@/lib/utils'
import type { PricingPlansProps, PricingRate } from '@/lib/dsl-schema'

const accents = {
  violet: 'text-brand-violet-light border-brand-violet-medium',
  blue: 'text-brand-blue-medium border-brand-blue-medium',
  teal: 'text-brand-teal-light border-brand-teal-medium',
}

function Rates({ rates }: { rates: PricingRate[] }) {
  return (
    <dl className="space-y-4">
      {rates.map((rate, index) => (
        <div key={index} className="flex flex-wrap justify-between gap-2">
          <dt className="text-body-sm text-carbon-400">{rate.label}</dt>
          <dd className="text-right text-body-md text-white">
            {rate.value}
            {rate.unit && <span className="block text-label text-carbon-400">{rate.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Features({ features }: { features: string[] }) {
  return (
    <ul className="space-y-3 text-body-md text-carbon-400">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <Check
            className="mt-1 h-4 w-4 shrink-0 text-brand-teal-light"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}

export function PricingPlansSection({
  intro,
  navigation,
  title,
  subtitle,
  currency,
  columns = 4,
  plans,
  notes,
  deployment,
  deploymentLink,
  footer,
  className,
}: PricingPlansProps) {
  return (
    <div className={cn('min-w-0', className)}>
      {(intro || !!navigation?.length) && (
        <div className="mb-12 text-center">
          {intro && <p className="text-body-2xl text-carbon-400">{intro}</p>}
          {!!navigation?.length && (
            <nav aria-label="Pricing sections" className="mt-5 flex flex-wrap justify-center gap-8">
              {navigation.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-body-md text-white underline underline-offset-8 focus-visible:outline focus-visible:outline-2"
                >
                  {link.text}
                </a>
              ))}
            </nav>
          )}
        </div>
      )}

      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <SectionHeader title={title} subtitle={subtitle} h2Size="sm" fullWidth />
          {deploymentLink && (
            <a
              href={deploymentLink.href}
              className="mt-4 inline-block text-body-md text-brand-teal-light underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
            >
              {deploymentLink.text}
            </a>
          )}
        </div>
        {currency && <p className="shrink-0 text-label text-carbon-400">{currency}</p>}
      </div>
      <div
        className={cn(
          'grid grid-cols-1 gap-5',
          columns === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-2 xl:grid-cols-4'
        )}
      >
        {plans.map((plan, index) => (
          <article
            key={index}
            aria-label={`${title} ${plan.name}`}
            className={cn(
              'grid min-w-0 grid-rows-[auto_auto_auto_auto_1fr_auto] border border-carbon-800 p-6 md:row-span-6 md:grid-rows-subgrid',
              accents[plan.accent ?? 'violet']
            )}
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <h3 className="text-h3-lg font-bold">{plan.name}</h3>
              {plan.statusBadge && (
                <Badge variant="violet" aria-label={`Release status: ${plan.statusBadge}`}>
                  {plan.statusBadge}
                </Badge>
              )}
            </div>
            <div className="mb-4">
              {plan.heading && (
                <h4 className="mb-3 text-h3-sm font-bold text-white">{plan.heading}</h4>
              )}
              <p className="text-body-md text-carbon-400">{plan.description}</p>
            </div>
            <div className="mb-5">
              <p className="mb-1 text-body-sm text-carbon-400">{plan.priceLabel}</p>
              <p className="flex flex-wrap items-baseline gap-1 text-white">
                <strong
                  className={cn('font-medium tracking-tight', plan.unit ? 'text-4xl' : 'text-3xl')}
                >
                  {plan.price}
                </strong>
                {plan.unit && <span className="text-body-sm text-carbon-400">{plan.unit}</span>}
              </p>
              {plan.priceNote && (
                <p className="mt-3 text-body-sm text-carbon-400">{plan.priceNote}</p>
              )}
            </div>
            <div className="mb-6">
              <PrimaryButton
                href={plan.primaryCta.href}
                className="h-auto min-h-11 w-full justify-between whitespace-normal"
              >
                <span className="sr-only">{`${title} ${plan.name}: `} </span>
                {plan.primaryCta.text}
              </PrimaryButton>
            </div>
            <div className="border-t border-carbon-800 pt-5">
              {plan.detailsLabel && (
                <p className="mb-4 text-body-sm font-bold text-white">{plan.detailsLabel}</p>
              )}
              {!!plan.rates?.length && (
                <div className="mb-5 border-b border-carbon-800 pb-5">
                  <Rates rates={plan.rates} />
                </div>
              )}
              <Features features={plan.features} />
              {plan.detailNote && (
                <p className="mt-4 text-body-sm text-carbon-400">{plan.detailNote}</p>
              )}
              {plan.overage && (
                <details className="group mt-5 border-t border-carbon-800 pt-4 text-white">
                  <summary className="cursor-pointer text-body-sm focus-visible:outline focus-visible:outline-2">
                    {plan.overage.summary}
                  </summary>
                  <div className="mt-4">
                    <Rates rates={plan.overage.rates} />
                  </div>
                  {plan.overage.note && (
                    <p className="mt-3 text-body-sm text-carbon-400">{plan.overage.note}</p>
                  )}
                </details>
              )}
            </div>
            <div className="pt-6">
              {plan.secondaryCta && (
                <SecondaryButton
                  href={plan.secondaryCta.href}
                  className="whitespace-normal text-body-sm"
                >
                  <span className="sr-only">{`${title} ${plan.name}: `} </span>
                  {plan.secondaryCta.text}
                </SecondaryButton>
              )}
            </div>
          </article>
        ))}
      </div>
      {!!notes?.length && (
        <div className="mt-6 grid gap-6 text-body-sm text-carbon-400 md:grid-cols-3">
          {notes.map((note, index) => (
            <div key={index} id={note.id}>
              <p className="mb-2 font-bold text-carbon-200">{note.label}</p>
              <p>{note.text}</p>
            </div>
          ))}
        </div>
      )}
      {deployment && (
        <aside
          id={deployment.id}
          className="mt-10 grid scroll-mt-24 gap-8 border border-brand-teal-medium bg-brand-teal-bg/30 p-6 md:grid-cols-2 md:p-8"
          aria-label={deployment.title}
        >
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="font-mono text-body-sm text-brand-teal-light">
                {deployment.label}
              </span>
              {deployment.statusBadge && <Badge variant="violet">{deployment.statusBadge}</Badge>}
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white">{deployment.title}</h3>
            <p className="text-body-lg text-carbon-200">{deployment.description}</p>
          </div>
          <div className="border-t border-brand-teal-dark pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <h4 className="mb-5 text-h3-sm font-bold text-white">{deployment.detailsTitle}</h4>
            <Features features={deployment.features} />
            <div className="mt-6">
              <PrimaryButton href={deployment.primaryCta.href}>
                {deployment.primaryCta.text}
              </PrimaryButton>
            </div>
            {deployment.secondaryCta && (
              <div className="mt-4">
                <SecondaryButton href={deployment.secondaryCta.href}>
                  {deployment.secondaryCta.text}
                </SecondaryButton>
              </div>
            )}
          </div>
        </aside>
      )}
      {footer && <RichTextBlock content={footer} className="mt-6 text-body-sm" />}
    </div>
  )
}
