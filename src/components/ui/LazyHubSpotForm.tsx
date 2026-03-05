'use client'

import dynamic from 'next/dynamic'
import type { HubSpotFormProps } from './HubSpotForm'

const HubSpotForm = dynamic(() => import('./HubSpotForm').then((mod) => mod.HubSpotForm), {
  ssr: false,
})

export function LazyHubSpotForm(props: HubSpotFormProps) {
  return <HubSpotForm {...props} />
}
