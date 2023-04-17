import { dashboardConfig } from '@/config/dashboard'
import { UserDropdown } from '@/modules/auth/user-dropdown'
import { MainNav } from '@/modules/navigation/main-nav'
import { SidebarNav } from '@/modules/navigation/sidebar-nav'

type DashboardLayoutProps = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <header className="container sticky top-0 z-10 mx-auto flex h-16 items-center justify-between px-2 backdrop-blur">
        <MainNav items={dashboardConfig.mainNav} />
        {/* @ts-expect-error */}
        <UserDropdown />
      </header>

      <div className="container mx-auto mt-8 grid gap-12 md:grid-cols-[10rem_1fr]">
        <aside className="hidden w-40 flex-col md:flex">
          <SidebarNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
