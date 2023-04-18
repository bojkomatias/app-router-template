'use client'

import { useToast } from '@/hooks/use-toast'
import { Button } from '@/ui/button'
import { Table } from '@/ui/tan-stack-table'
import { ToastAction } from '@/ui/toasts/toast'
import { type ColumnDef } from '@tanstack/react-table'
import { Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'

type User = {
  id: number
  name: string
  username: string
  email: string
  address: any
  phone: string
  website: string
  company: any
}

export function UserTable({ data }: { data: User[] }) {
  const { toast } = useToast()
  const deleteTodo = useCallback(
    (row: User) => {
      toast({
        title: row.name,
        description: 'Item deleted!',

        action: (
          <ToastAction asChild altText="Goto schedule to undo">
            <Button
              variant={'outline'}
              onClick={() =>
                toast({
                  title: 'Action undone',
                  description: 'Successfully reverted the operation',
                })
              }
            >
              Undo
            </Button>
          </ToastAction>
        ),
      })
    },
    [toast]
  )

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
        enableHiding: false,
        cell: ({ row }) => (
          <Link href={`dashboard/${row.getValue('id')}`}>
            {row.getValue('name')}
          </Link>
        ),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        enableHiding: false,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'website',
        header: 'Website',
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        isPlaceholder: true,
        enableHiding: false,
        cell: ({ row }) => (
          <span>
            <Button variant={'ghost'} size={'sm'}>
              <Edit2 />
            </Button>
            <Button
              variant={'ghost'}
              size={'sm'}
              onClick={() => {
                deleteTodo(row.original)
              }}
            >
              <Trash2 />
            </Button>
          </span>
        ),
      },
    ],
    []
  )

  return (
    <div>
      <Table
        data={data}
        columns={columns}
        initialVisible={{ website: false }}
      />
    </div>
  )
}
