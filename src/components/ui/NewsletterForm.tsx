'use client'

import { useState } from 'react'

const PORTAL_ID = '4466002'
const FORM_ID = 'd74dfb7c-a14a-4f8d-ab28-eba7a00e7900'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [{ objectTypeId: '0-1', name: 'email', value: email }],
            context: { pageUri: window.location.href, pageName: document.title },
          }),
        }
      )
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="text-body-sm text-text-inverse py-3">
        Thank you for subscribing!
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="border border-carbon-800 flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email*"
          required
          disabled={status === 'loading'}
          className="flex-1 bg-transparent px-4 py-3 text-body-md text-text-inverse placeholder:text-carbon-500 outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 text-body-sm text-text-inverse border-l border-carbon-800 hover:text-carbon-400 transition-colors duration-150 disabled:opacity-50 shrink-0"
        >
          {status === 'loading' ? '···' : 'Subscribe'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-body-sm text-brand-red-light">Something went wrong. Please try again.</p>
      )}
      <p className="text-body-sm text-carbon-400 leading-relaxed">
        Sign up to receive periodic updates and feature releases to your email.
      </p>
    </form>
  )
}
