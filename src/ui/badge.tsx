import { cn } from '@/lib/utils'
import React from 'react'

export const Badge: React.FC<{
  children: React.ReactNode
  color?: string // has to be text-color + bg-color
}> = (props) => {
  return (
    <span
      className={cn(
        'rounded-full bg-blue-lagoon-500/5 px-3 py-1 text-xs font-semibold uppercase text-blue-lagoon-600 ring-1 ring-current',
        props.color
      )}
    >
      {props.children}
    </span>
  )
}
