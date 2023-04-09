'use client'
import { Button } from '@/ui/button'
import { signIn, signOut } from 'next-auth/react'
import type { ReactNode } from 'react'

export const SignIn = () => (
  <Button onClick={() => signIn('github')}>Log In</Button>
)

export const SingOut = ({ children }: { children: ReactNode }) => (
  <button onClick={() => signOut()} style={{ all: 'unset', width: '100%' }}>
    {children}
  </button>
)
