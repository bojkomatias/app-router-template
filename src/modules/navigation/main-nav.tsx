import Link from 'next/link'
import type { MainNav } from '@/types'
import { siteConfig } from '@/config/site'
import { MobileNav } from './mobile-nav'
import { buttonVariants } from '@/ui/button'

export function MainNav({ items }: { items: MainNav }) {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={'/'} className="group hidden items-center space-x-2 md:flex">
        <siteConfig.icon className="h-6 w-6 group-hover:stroke-brand-600" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="hidden gap-3 md:flex">
        {items?.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={item.href}
                className={buttonVariants({ variant: 'link' })}
              >
                {item.title}
              </Link>
            )
        )}
      </nav>
      <MobileNav items={items} />
    </div>
  )
}
