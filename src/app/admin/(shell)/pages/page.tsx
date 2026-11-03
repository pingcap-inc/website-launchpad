import { auth } from '@/auth'
import { canDeletePages } from '@/lib/admin-permissions'
import PagesClient from './PagesClient'

export default async function PagesPage() {
  // Local `pnpm dev` has no login gate, so keep Delete available there.
  const isLocalDev = process.env.NODE_ENV === 'development' && !process.env.VERCEL_ENV
  const session = isLocalDev ? null : await auth()

  return <PagesClient canDelete={isLocalDev || canDeletePages(session?.user?.email)} />
}
