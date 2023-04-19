import { UserTable } from '@/modules/users/user-table'

export type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()
  return <UserTable data={users} />
}
