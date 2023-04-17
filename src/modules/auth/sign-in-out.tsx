'use client'
import { Button } from '@/ui/button'
import { Github } from 'lucide-react'
import { signIn, signOut } from 'next-auth/react'
import type { ReactNode } from 'react'

export const SignInWithGithub = () => (
  <Button onClick={() => signIn('github')} className="text-base">
    Sign In with Github <Github />
  </Button>
)

export const SingOut = ({ children }: { children: ReactNode }) => (
  <button onClick={() => signOut()} style={{ all: 'unset', width: '100%' }}>
    {children}
  </button>
)
