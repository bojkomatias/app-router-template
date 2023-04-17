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
import { ChevronDown, ChevronUp, ToggleLeft } from 'lucide-react'
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
  initialVisible,
}: {
  data: object[]
  columns: ColumnDef<any, any>[]
  initialVisible: {}
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnVisibility, setColumnVisibility] = React.useState(initialVisible)

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
    <div>
      <div className="m-2 flex max-w-3xl items-center gap-3">
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
          placeholder="Search all columns..."
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <ToggleLeft className="h-6 w-6" />
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
                  className={'capitalize'}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        ref={tableContainerRef}
        className="inline-block max-h-[80svh] min-w-full overflow-auto rounded-lg border bg-white align-middle dark:border-gray-800 dark:bg-gray-950/50"
      >
        <table className="min-w-full table-fixed">
          <thead className="sticky top-0 bg-gray-100 text-sm font-semibold dark:bg-gray-800">
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
                        className="py-4 pl-4 pr-3 text-sm font-medium last:ml-auto last:w-16 last:whitespace-nowrap sm:pl-6 lg:pl-8"
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
