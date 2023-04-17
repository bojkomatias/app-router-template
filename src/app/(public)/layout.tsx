import { publicConfig } from '@/config/public'
import { UserDropdown } from '@/modules/auth/user-dropdown'
import { MainNav } from '@/modules/navigation/main-nav'

type PublicLayoutProps = { children: React.ReactNode }

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div>
      <header className="container sticky top-0 z-10 mx-auto flex h-16 items-center justify-between px-2 backdrop-blur">
        <MainNav items={publicConfig} />
        {/* @ts-expect-error */}
        <UserDropdown />
      </header>
      {children}
    </div>
  )
}
