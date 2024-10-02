import DashboardNavbar from '@/app/components/navbar/dashboard-navbar'
import { getUserInformation } from '@/utils/supabase/server'

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  const user = await getUserInformation()
  const emailAddress = user?.user_metadata.email ?? 'n/a'
  const avatarUrl = user?.user_metadata.avatar_url

  return (
    <main>
      <DashboardNavbar emailAddress={emailAddress} avatarUrl={avatarUrl} />
      {children}
    </main>
  )
}