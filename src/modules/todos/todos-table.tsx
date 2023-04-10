'use client'

import { Input } from '@/ui/input'
import type {
  ColumnDef,
  FilterFn,
  Row,
  SortingState,
} from '@tanstack/react-table'
import { getFilteredRowModel } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp, MoreVertical } from 'lucide-react'
import React from 'react'
import { rankItem } from '@tanstack/match-sorter-utils'
import { useVirtual } from 'react-virtual'
import { Badge } from '@/ui/badge'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import Link from 'next/link'

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

type Todo = { id: number; userId: number; title: string; completed: boolean }

export function TodoTable({ data }: any) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnVisibility, setColumnVisibility] = React.useState({})

  const columns = React.useMemo<ColumnDef<Todo>[]>(
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
          <Badge color={getValue() ? '' : 'text-yellow-600/60 bg-yellow-50'}>
            {getValue() ? 'true' : 'false'}
          </Badge>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  })
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer
  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0

  return (
    <div className="mx-auto mt-24 max-w-7xl">
      <DebouncedInput
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        className="mx-auto my-12 max-w-5xl"
        placeholder="Search all columns..."
      />

      <div
        ref={tableContainerRef}
        className=" border: inline-block h-[70vh] min-w-full overflow-auto rounded-lg border align-middle dark:border-slate-800"
      >
        <table className="min-w-full table-fixed">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      className="sticky top-0 z-10 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold shadow backdrop-blur backdrop-filter dark:border-slate-700 dark:bg-slate-800 sm:pl-6 lg:pl-8"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-end gap-2'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ChevronUp className="h-4 w-4" />,
                            desc: <ChevronDown className="h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  )
                })}
                <th className="sr-only sticky top-0 z-10 bg-opacity-75 py-3.5 pl-4 pr-3 backdrop-blur backdrop-filter dark:border-slate-700 dark:bg-slate-800 sm:pl-6 lg:pl-8">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 rounded-full p-1"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Toggle Cols</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {table.getAllLeafColumns().map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            checked={column.getIsVisible()}
                            onClick={column.getToggleVisibilityHandler()}
                            className="capitalize"
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        )
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<Todo>
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6 lg:pl-8"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-bold sm:pl-6 lg:pl-8">
                    <Link href="#">Edit</Link>
                  </td>
                </tr>
              )
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
    </div>
  )
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 300,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
