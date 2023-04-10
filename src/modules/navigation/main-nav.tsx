import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Button } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { getServerSession } from 'next-auth'

interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

interface MainNavProps {
  name: string
  items: NavItem[]
}

const userConfig: NavItem[] = [{ title: 'Dashboard', href: '/dashboard' }]

export async function MainNav({ name, items }: MainNavProps) {
  const session = await getServerSession()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">{name}</span>
      </Link>

      <nav className="hidden gap-6 md:flex">
        {items?.map(
          (item, index) =>
            item.href && (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  'flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white sm:text-sm',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                {item.title}
              </Link>
            )
        )}
        {session &&
          userConfig.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'flex items-center text-lg font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white sm:text-sm',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
          >
            <Icons.logo className="mr-2 h-4 w-4" />{' '}
            <span className="font-bold">Menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={24}
          className="w-[300px] overflow-scroll"
        >
          <DropdownMenuLabel>
            <Link href="/" className="flex items-center">
              <Icons.logo className="mr-2 h-4 w-4" /> {name}
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
          {session &&
            userConfig.map(
              (item, index) =>
                item.href && (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </DropdownMenuItem>
                )
            )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
