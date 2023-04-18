import type { Metadata } from 'next'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/ui/button'
import { SignInWithGithub } from '@/modules/auth/sign-in-out'
import { ChevronLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function LoginPage() {
  return (
    <div className="container relative mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants(),
          'absolute left-4 top-4 md:left-8 md:top-8'
        )}
      >
        <ChevronLeft />
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
        </div>
        <SignInWithGithub />
        <p className="px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-brand-600"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
