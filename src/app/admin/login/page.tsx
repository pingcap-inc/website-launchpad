import type { Metadata } from 'next'
import Image from 'next/image'
import { signIn } from '@/auth'

export const metadata: Metadata = {
  title: 'Sign in · AI Website Platform',
  robots: { index: false, follow: false },
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <span className="mb-5 inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3">
            <Image
              src="https://static.pingcap.com/files/2026/02/12215103/logo-TiDB.svg"
              alt="TiDB"
              width={96}
              height={40}
              className="block h-7 w-auto"
              priority
            />
          </span>
          <h1 className="text-xl font-bold text-gray-900">AI Website Platform Admin</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            Use your <span className="font-medium text-gray-700">@pingcap.com</span> Google account
            to continue.
          </p>
        </div>

        <form
          action={async () => {
            'use server'
            await signIn('google', { redirectTo: callbackUrl || '/admin' })
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <GoogleIcon />
            Sign in with Google
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Access is limited to PingCAP team members.
        </p>
      </div>
    </main>
  )
}
