import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import React from 'react'

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  var?: 'primary' | 'white'
}

export const Button: React.FC<ButtonsProps> = (props) => {
  return (
    <button
      {...props}
      className={clsx({
        'rounded-md bg-blue-lagoon-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-lagoon-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-lagoon-400':
          props.var === 'primary',
        'rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white':
          props.var === 'white',
      })}
    />
  )
}
