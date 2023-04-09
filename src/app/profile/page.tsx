import { ProfileForm } from '@/modules/auth/profile-form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()
  if (!session) return redirect('/')
  return (
    <div>
      This is a private Page
      <pre>{JSON.stringify(session.user, ['name', 'email'], 2)}</pre>
      <ProfileForm />
    </div>
  )
}
