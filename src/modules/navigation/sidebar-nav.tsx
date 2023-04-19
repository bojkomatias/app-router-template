import { cn } from '@/lib/utils'
import type { SidebarNav } from '@/types'
import { buttonVariants } from '@/ui/button'
import MatchPath from '@/ui/match-path'
import Link from 'next/link'
// import { usePathname } from 'next/navigation'

export function SidebarNav({ items }: { items: SidebarNav }) {
  // const path = usePathname()
  return (
    <nav className="hidden lg:sticky lg:top-16 lg:z-50 lg:flex lg:w-60 lg:flex-col">
      {items.map((item) => (
        <Link key={item.href} href={item.href}>
          <MatchPath
            href={item.href}
            className={cn(buttonVariants(), 'w-full justify-start')}
            pathClass="bg-gray-100 dark:bg-gray-800"
          >
            {item.icon ? <item.icon /> : null}
            <span>{item.title}</span>
          </MatchPath>
        </Link>
      ))}
    </nav>
  )
}
