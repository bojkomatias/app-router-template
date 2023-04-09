import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) return redirect('/')
  return (
    <div>
      This is a private Page
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
