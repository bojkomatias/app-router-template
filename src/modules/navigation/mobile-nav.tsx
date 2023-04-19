import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Button } from '@/ui/button'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import type { MainNav } from '@/types'

export function MobileNav({ items }: { items: MainNav }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
        >
          <siteConfig.icon />
          <span className="font-bold">Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={24}
        className="w-[300px] overflow-scroll"
      >
        <DropdownMenuLabel>
          <Link href={'/'} className="flex items-center">
            <siteConfig.icon className="mr-2 h-4 w-4" /> {siteConfig.name}
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items?.map(
          (item, index) =>
            item.href && (
              <DropdownMenuItem key={index} asChild>
                <Link href={item.href}>{item.title}</Link>
              </DropdownMenuItem>
            )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
