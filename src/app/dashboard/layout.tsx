import { dashboardConfig } from '@/config/dashboard'
import { UserDropdown } from '@/modules/auth/user-dropdown'
import { MainNav } from '@/modules/navigation/main-nav'
import { SidebarNav } from '@/modules/navigation/sidebar-nav'
import { Button } from '@/ui/button'
import { Plus } from 'lucide-react'

type DashboardLayoutProps = {
  children: React.ReactNode
  users: React.ReactNode
}

export default function DashboardLayout({
  children,
  users,
}: DashboardLayoutProps) {
  return (
    <div>
      <header className="container sticky top-0 z-10 mx-auto flex h-16 items-center justify-between px-2 backdrop-blur">
        <MainNav items={dashboardConfig.mainNav} />
        {/* @ts-expect-error */}
        <UserDropdown />
      </header>

      <SidebarNav items={dashboardConfig.sidebarNav} />
      <div className="fixed left-80 right-20 top-20 flex justify-between">
        <h2 className="text-3xl font-bold">Users Panel</h2>
        <Button variant={'theme'}>
          <Plus className="stroke-white" /> User
        </Button>
      </div>
      <div className="ml-60 flex">
        <aside className="w-full">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </aside>
        <main className="">
          <div className="px-4 sm:px-6 lg:px-8">{users}</div>
        </main>
      </div>
    </div>
  )
}
