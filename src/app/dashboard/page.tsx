import { TodoTable } from '@/modules/todos/todos-table'

export default async function Page() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const todos = await res.json()
  return (
    <div>
      <TodoTable data={todos} />
    </div>
  )
}
