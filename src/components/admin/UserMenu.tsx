import { LogOut } from 'lucide-react'
import { signOut } from '@/auth'

/**
 * Signed-in account block for the admin sidebar footer: shows the Google user and
 * a full-width sign-out button, stacked vertically to fit the narrow sidebar.
 * Rendered on the server (from the shell layout) so it reads the session directly.
 * Returns null when there is no session (e.g. local dev, where login is bypassed).
 */
export function UserMenu({ email, name }: { email?: string | null; name?: string | null }) {
  if (!email) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="min-w-0 leading-tight">
        {name ? (
          <p className="truncate text-sm font-medium text-gray-900">{name}</p>
        ) : null}
        <p className="truncate text-xs text-gray-500" title={email}>
          {email}
        </p>
      </div>
      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/admin' })
        }}
      >
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          <span>Sign out</span>
        </button>
      </form>
    </div>
  )
}
