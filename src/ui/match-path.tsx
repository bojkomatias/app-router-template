'use client'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'
type MatchPathProps = {
  children: React.ReactNode
  href: string
  className: string
  pathClass: string
}
/** Helper function to match certain Path and show it visually, without having to make everything Client Component (since the children will probably be server) */
export default function MatchPath({
  href,
  children,
  className,
  pathClass,
}: MatchPathProps) {
  const path = usePathname()
  return (
    <span className={cn(className, path === href ? pathClass : '')}>
      {children}
    </span>
  )
}
