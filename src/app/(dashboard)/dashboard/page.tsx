import { UserTable } from '@/modules/users/user-table'
import { Button } from '@/ui/button'
import { Plus } from 'lucide-react'

export type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()
  return (
    <div>
      <div className="mx-3 my-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Users Panel</h2>
        <Button variant={'theme'}>
          <Plus className="stroke-white" /> User
        </Button>
      </div>
      <UserTable data={users} />
    </div>
  )
}
