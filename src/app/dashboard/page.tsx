import { TodoTable } from '@/modules/todos/todos-table'

export type Todo = {
  id: number
  userId: number
  title: string
  completed: boolean
}

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const todos = await res.json()
  return (
    <div>
      <TodoTable data={todos} />
    </div>
  )
}
