import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:hover:bg-gray-800 disabled:opacity-50 dark:focus:ring-gray-400 disabled:pointer-events-none dark:focus:ring-offset-gray-900 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 gap-3',
  {
    variants: {
      variant: {
        theme:
          'bg-brand-600 text-white hover:brand-700 dark:bg-brand-600 dark:hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/20 hover:saturate-[110%] focus:ring-brand-600 dark:focus:ring-brand-600 font-bold',
        destructive:
          'bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-600 focus:ring-red-600 dark:focus:ring-red-600',
        outline:
          'bg-transparent border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-950',
        subtle:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100',
        ghost:
          'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100 dark:hover:text-gray-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent',
        link: 'bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent hover:text-brand-700 dark:hover:text-brand-500 font-semibold',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
