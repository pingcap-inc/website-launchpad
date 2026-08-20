import * as React from 'react'
import { FormSection } from '@/components/sections/FormSection'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

// The form body is a HubSpot embed: it loads an external script and fetches the
// form definition at runtime, so the field area stays empty in an offline static
// capture. The section header around it is real and is what these cells show.

/** Contact form section with its heading — the usual bottom-of-page placement. */
export const WithHeading = () => (
  <SectionWrapper style={{ background: 'primary', spacing: 'section' }}>
    <FormSection
      title="Talk to Us"
      subtitle="Tell us about your workload and we'll get back within one business day."
      portalId="4466002"
      formId="8d439c40-4e6b-4192-a99b-a2c619ad4146"
      region="na1"
    />
  </SectionWrapper>
)

// No heading-less cell: with the embed unavailable there is nothing left to
// render, so it captures blank rather than demonstrating anything.
