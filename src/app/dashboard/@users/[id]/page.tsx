import React from 'react'

export default async function Page({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`
  )
  const user = await res.json()
  return (
    <div>
      This User Form is an PARALLEL ROUTE
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
