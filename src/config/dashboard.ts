import type { MainNav, SidebarNav } from '@/types'
import { Cog, File } from 'lucide-react'

export const dashboardConfig: { mainNav: MainNav; sidebarNav: SidebarNav } = {
  mainNav: [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    {
      title: 'Help',
      href: '/',
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: 'Posts',
      href: '/dashboard',
      icon: File,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: Cog,
    },
  ],
}
