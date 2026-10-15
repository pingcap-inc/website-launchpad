import { AdminShell } from '@/components/admin/AdminShell'
import { UserMenu } from '@/components/admin/UserMenu'
import { auth } from '@/auth'

export default async function ShellLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const userSlot = session?.user ? (
    <UserMenu email={session.user.email} name={session.user.name} />
  ) : null

  return <AdminShell userSlot={userSlot}>{children}</AdminShell>
}
