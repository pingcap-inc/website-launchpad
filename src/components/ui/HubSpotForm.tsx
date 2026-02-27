'use client'

import { useEffect, useId, useState } from 'react'
import { cn } from '@/lib/utils'

const DEFAULT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID ?? '4466002'
const DEFAULT_REGION = process.env.NEXT_PUBLIC_HUBSPOT_REGION ?? 'na1'
const SCRIPT_SRC = 'https://js.hsforms.net/forms/v2.js'

type HubSpotWindow = Window & {
  hbspt?: {
    forms: {
      create: (options: {
        region: string
        portalId: string
        formId: string
        target: string
        css?: string
        sfdcCampaignId?: string
        onFormSubmit?: () => void
        onFormReady?: () => void
      }) => void
    }
  }
}

interface HubSpotFormProps {
  formId: string
  portalId?: string
  region?: string
  sfdcCampaignId?: string
  onFormSubmit?: () => void
  className?: string
  loadingText?: string
  errorText?: string
}

function bindEnterSubmit(containerId: string) {
  const container = document.getElementById(containerId)
  if (!container) return
  const form = container.querySelector<HTMLFormElement>('form')
  const emailInput = form?.querySelector<HTMLInputElement>('input[type="email"]')
  if (!form || !emailInput || emailInput.dataset.enterSubmitBound === 'true') return
  emailInput.dataset.enterSubmitBound = 'true'
  emailInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    form.requestSubmit()
  })
}

export function HubSpotForm({
  formId,
  portalId = DEFAULT_PORTAL_ID,
  region = DEFAULT_REGION,
  sfdcCampaignId,
  onFormSubmit,
  className,
  loadingText = 'Loading form...',
  errorText = 'Unable to load form. Please try refreshing the page.',
}: HubSpotFormProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const uid = useId()
  const containerId = `hubspot-form-${uid.replace(/:/g, '')}`

  useEffect(() => {
    setStatus('loading')
    let cancelled = false
    let retryTimer: ReturnType<typeof setTimeout> | null = null
    let readyTimeout: ReturnType<typeof setTimeout> | null = null

    const markReady = () => {
      if (cancelled) return
      if (readyTimeout) clearTimeout(readyTimeout)
      bindEnterSubmit(containerId)
      setStatus('ready')
    }

    const markError = () => {
      if (cancelled) return
      if (readyTimeout) clearTimeout(readyTimeout)
      setStatus('error')
    }

    const renderForm = (attempt = 0) => {
      if (cancelled) return
      const hsWindow = window as HubSpotWindow
      if (!hsWindow.hbspt?.forms) {
        if (attempt < 2) {
          retryTimer = setTimeout(() => renderForm(attempt + 1), 350)
        } else {
          markError()
        }
        return
      }

      const container = document.getElementById(containerId)
      if (!container) { markError(); return }

      container.innerHTML = ''
      hsWindow.hbspt.forms.create({
        region,
        portalId,
        formId,
        target: `#${containerId}`,
        css: '',
        ...(sfdcCampaignId ? { sfdcCampaignId } : {}),
        ...(onFormSubmit ? { onFormSubmit } : {}),
        onFormReady: markReady,
      })

      // Fallback: if onFormReady never fires (wrong form ID, network issue),
      // transition to error after 10 seconds so the page doesn't hang.
      readyTimeout = setTimeout(() => {
        if (!cancelled) setStatus('error')
      }, 10_000)
    }

    const hsWindow = window as HubSpotWindow
    if (hsWindow.hbspt?.forms) {
      renderForm()
      return () => {
        cancelled = true
        if (retryTimer) clearTimeout(retryTimer)
        if (readyTimeout) clearTimeout(readyTimeout)
      }
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-hs-form-script="true"]')
    let script = existingScript

    // If a previous script tag exists but never initialized `window.hbspt`,
    // replace it once to recover from a partial/failed load state.
    if (script && !hsWindow.hbspt) {
      script.remove()
      script = null
    }

    script = script ?? document.createElement('script')
    if (!existingScript || !document.head.contains(script)) {
      script.src = SCRIPT_SRC
      script.async = true
      script.defer = true
      script.dataset.hsFormScript = 'true'
    }

    const onScriptLoad = () => renderForm()
    script.addEventListener('load', onScriptLoad)
    script.addEventListener('error', markError)
    if (!document.head.contains(script)) document.head.appendChild(script)

    return () => {
      cancelled = true
      if (retryTimer) clearTimeout(retryTimer)
      if (readyTimeout) clearTimeout(readyTimeout)
      script.removeEventListener('load', onScriptLoad)
      script.removeEventListener('error', markError)
    }
  }, [containerId, formId, portalId, region, sfdcCampaignId, onFormSubmit])

  return (
    <div className={cn(className ?? 'hs-form')}>
      <div id={containerId} />
      {status === 'loading' && <p className="text-body-md text-carbon-400 text-center">{loadingText}</p>}
      {status === 'error' && <p className="text-body-sm text-brand-red-light">{errorText}</p>}
    </div>
  )
}
