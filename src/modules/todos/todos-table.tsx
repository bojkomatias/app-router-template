'use client'

import type { Todo } from '@/app/dashboard/page'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import { Table } from '@/ui/tan-stack-table'
import { ToastAction } from '@/ui/toasts/toast'
import { type ColumnDef } from '@tanstack/react-table'
import { Cross, Edit2, FileWarning, Trash2 } from 'lucide-react'
import { useCallback, useMemo } from 'react'

export function TodoTable({ data }: { data: Todo[] }) {
  const { toast } = useToast()
  const deleteTodo = useCallback(
    (row: Todo) => {
      toast({
        title: row.title,
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

  const columns = useMemo<ColumnDef<Todo>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'userId',
        header: 'User ID',
      },
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'completed',
        header: 'Status',
        cell: ({ getValue }) => (
          <Badge color={getValue() ? '' : 'text-yellow-600 bg-yellow-500/5'}>
            {getValue() ? 'true' : 'false'}
          </Badge>
        ),
      },
      {
        accessorKey: 'actions',
        header: (props) => (props.header.isPlaceholder = true),
        enableHiding: false,
        cell: ({ row }) => (
          <span>
            <Button variant={'ghost'}>
              <Edit2 />
            </Button>
            <Button
              variant={'ghost'}
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
      <Table data={data} columns={columns} />
    </div>
  )
}
