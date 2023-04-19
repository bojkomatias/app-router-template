import type { LucideIcon } from 'lucide-react'

type NavItem = {
  title: string
  href: string
  disabled?: true
  external?: true
  icon?: LucideIcon
}

export type MainNav = NavItem[]

export type SidebarNav = NavItem[]

export type SiteConfig = {
  name: string
  description: string
  url: string
  icon: LucideIcon
  ogImage: string
}
