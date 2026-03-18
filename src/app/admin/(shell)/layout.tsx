import { AdminShell } from '@/components/admin/AdminShell'

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
