import type { LinkProps } from 'next/link'
import Link from 'next/link'
import clsx from 'clsx'
import type { Route } from 'next'

interface MyLinkProps extends LinkProps<Route<string> | URL> {
  className?: string
  var?: 'button'
}

export const MyLink: React.FC<MyLinkProps> = (props) => {
  return (
    <Link
      {...props}
      className={clsx(
        {
          'rounded-md bg-blue-lagoon-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-lagoon-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-lagoon-500':
            props.var === 'button',
        },
        props.className
      )}
    />
  )
}
