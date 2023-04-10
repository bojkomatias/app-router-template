'use client'

import { Input } from '@/ui/input'
import type { ColumnDef, FilterFn, SortingState } from '@tanstack/react-table'
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
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'

export function Table({
  data,
  columns,
}: {
  data: object[]
  columns: ColumnDef<any, any>[]
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnVisibility, setColumnVisibility] = React.useState({})

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

  let timeout: NodeJS.Timeout

  return (
    <div className="mx-auto mt-24 max-w-7xl">
      <Input
        type="text"
        defaultValue={globalFilter ?? ''}
        // Debounced to not overload the processing, tweek according to needs
        onChange={(e) => {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            setGlobalFilter(String(e.target.value))
          }, 100)
        }}
        className="mx-auto my-12 max-w-5xl"
        placeholder="Search all columns..."
      />

      <div
        ref={tableContainerRef}
        className=" border: inline-block h-[70vh] min-w-full overflow-auto rounded-lg border align-middle dark:border-slate-800"
      >
        <table className="min-w-full table-fixed">
          <thead className="sticky top-0 bg-slate-100 text-sm font-semibold dark:bg-slate-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return header.isPlaceholder ? null : (
                    <th key={header.id} className="py-3.5 pl-4 sm:pl-6 lg:pl-8">
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'flex cursor-pointer select-none items-end gap-2'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
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
                    </th>
                  )
                })}
                <th className="pr-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 rounded-full p-1"
                      >
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Toggle Cols</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {table.getAllLeafColumns().map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            disabled={!column.getCanHide()}
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
              const row = rows[virtualRow.index]
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium last:ml-auto last:w-16 sm:pl-6 lg:pl-8"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    )
                  })}
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

/** filtering function used in React Table */
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
