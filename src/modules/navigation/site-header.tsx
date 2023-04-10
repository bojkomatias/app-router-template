import Link from 'next/link'
import { MainNav } from './main-nav'
import { buttonVariants } from '@/ui/button'
import { Icons } from '@/ui/icons'
import { UserDropdown } from '../auth/user-dropdown'

export const siteConfig = {
  name: 'Next.js',
  description:
    'Beautifully designed components built with Radix UI and Tailwind CSS.',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
  ],
  links: {
    github: 'https://github.com/bojkomatias',
  },
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-500/20 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-3 sm:justify-between sm:space-x-0">
        {/* @ts-expect-error */}
        <MainNav name={siteConfig.name} items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                  className: 'text-slate-700 dark:text-slate-400',
                })}
              >
                <Icons.gitHub />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            {/* @ts-expect-error */}
            <UserDropdown />
          </nav>
        </div>
      </div>
    </header>
  )
}
