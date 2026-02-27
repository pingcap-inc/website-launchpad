import { NextResponse } from 'next/server'

const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID ?? '4466002'
const FORM_ID = process.env.HUBSPOT_FORM_ID ?? 'd74dfb7c-a14a-4f8d-ab28-eba7a00e7900'

type SubscribeBody = {
  email?: string
  pageUri?: string
  pageName?: string
}

type HubSpotError = {
  status?: string
  message?: string
  correlationId?: string
  errors?: Array<{
    message?: string
    errorType?: string
  }>
}

function isValidEmail(value: string) {
  // Basic, permissive check to avoid sending obviously invalid payloads upstream.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(req: Request) {
  let body: SubscribeBody
  try {
    body = (await req.json()) as SubscribeBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const email = body.email?.trim().toLowerCase() ?? ''
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 })
  }

  const payload = {
    fields: [{ name: 'email', value: email }],
    context: {
      pageUri: body.pageUri,
      pageName: body.pageName,
    },
  }

  try {
    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    if (!hsRes.ok) {
      let details: unknown = null
      try {
        details = await hsRes.json()
      } catch {
        details = await hsRes.text()
      }

      const typedDetails = details as HubSpotError
      const hasCaptchaError = typedDetails?.errors?.some(
        (err) => err.errorType === 'FORM_HAS_RECAPTCHA_ENABLED'
      )

      if (hasCaptchaError) {
        return NextResponse.json(
          {
            error:
              'HubSpot form has Captcha enabled and cannot accept API submissions. Disable Captcha for this form or use a separate non-Captcha form for API subscriptions.',
            code: 'FORM_HAS_RECAPTCHA_ENABLED',
            correlationId: typedDetails?.correlationId,
            details,
          },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: 'HubSpot subscription failed.', details },
        { status: hsRes.status }
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to reach HubSpot.' }, { status: 502 })
  }
}
