import { auth } from '@/auth'
import { canManagePages } from '@/lib/admin-permissions'
import { isLocalDevAuthBypass } from '@/lib/dev-auth'
import PagesClient from './PagesClient'

export default async function PagesPage() {
  // With the explicit local opt-out there is no login, so keep Delete available.
  const bypass = isLocalDevAuthBypass()
  const session = bypass ? null : await auth()

  return <PagesClient canDelete={bypass || canManagePages(session?.user?.email)} />
}
