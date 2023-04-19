import { Cloud, LogOut, User } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Button, buttonVariants } from '@/ui/button'
import { getServerSession } from 'next-auth'
import { SingOut } from './sign-in-out'
import Link from 'next/link'
import { dashboardConfig } from '@/config/dashboard'

export async function UserDropdown() {
  const session = await getServerSession()
  if (!session)
    return (
      <Link href={'/login'} className={buttonVariants({ variant: 'subtle' })}>
        Log In
      </Link>
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="h-fit w-fit rounded-full p-0">
          <Avatar>
            <AvatarImage src={session.user.image} alt={session.user.email} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <div className="font-bold">{session.user.name}</div>
          <span className="font-thin text-gray-600 dark:text-gray-300">
            {session.user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {dashboardConfig.sidebarNav.map((item) => (
            <Link key={item.href} href={item.href}>
              <DropdownMenuItem>
                {item.icon ? <item.icon /> : null}
                <span>{item.title}</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SingOut>
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </SingOut>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
