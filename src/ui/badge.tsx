import React from 'react'

export const Badge: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <span className="rounded-full bg-blue-lagoon-500/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-lagoon-400 ring-1 ring-inset ring-blue-lagoon-500/20">
      {props.children}
    </span>
  )
}
