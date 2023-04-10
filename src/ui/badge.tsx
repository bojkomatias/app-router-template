import { cn } from '@/lib/utils'
import React from 'react'

export const Badge: React.FC<{
  children: React.ReactNode
  color?: string // has to be text-color + bg-color
}> = (props) => {
  return (
    <span
      className={cn(
        'rounded-full bg-blue-lagoon-50 px-3 py-1 text-sm font-semibold leading-6 text-blue-lagoon-600/80 ring-1 ring-inset ring-current',
        props.color
      )}
    >
      {props.children}
    </span>
  )
}
