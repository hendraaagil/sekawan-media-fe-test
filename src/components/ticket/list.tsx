import clsx from 'clsx'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { format, formatDistance } from 'date-fns'

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Bars3CenterLeftIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/solid'
import { Icon } from '@tremor/react'

import { ticketListQuery } from '@/queries/ticket'
import { Ticket } from '@/interfaces/ticket'
import { Heading, PriorityChip } from '@/components/ui'

const columns: ColumnDef<Ticket>[] = [
  {
    header: 'Ticket Details',
    size: 450,
    footer: (props) => props.column.id,
    accessorFn: (row) => row.title,
    cell: (props) => {
      const { pictureUrl, customerName, title, updatedAt } = props.row.original

      return (
        <div className="flex">
          <img
            src={pictureUrl}
            alt={`${customerName}'s picture`}
            className="h-12 w-12 rounded-full"
          />
          <div className="ml-4">
            <p className="font-bold">{title}</p>
            <p className="text-sm text-tremor-content-subtle">
              Updated{' '}
              {formatDistance(new Date(updatedAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    header: 'Customer Name',
    size: 200,
    footer: (props) => props.column.id,
    accessorFn: (row) => row.customerName,
    cell: (props) => {
      const { customerName } = props.row.original
      return <strong>{customerName}</strong>
    },
  },
  {
    header: 'Date',
    footer: (props) => props.column.id,
    accessorFn: (row) => row.createdAt,
    cell: (props) => {
      const { createdAt } = props.row.original
      return (
        <div>
          <p className="font-bold">{format(new Date(createdAt), 'PP')}</p>
          <p className="text-sm text-tremor-content-subtle">
            {format(new Date(createdAt), 'p')}
          </p>
        </div>
      )
    },
  },
  {
    header: 'Priority',
    footer: (props) => props.column.id,
    accessorFn: (row) => row.priority,
    cell: (props) => {
      const { priority } = props.row.original
      return <PriorityChip priority={priority} />
    },
  },
  {
    header: 'Actions',
    size: 50,
    footer: (props) => props.column.id,
    cell: () => (
      <Icon
        icon={EllipsisVerticalIcon}
        tooltip="Actions"
        color="gray"
        size="lg"
        className="cursor-pointer"
      />
    ),
  },
]

export const TicketList = () => {
  const { data: tickets } = useQuery(ticketListQuery())
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: tickets || [],
    columns: columns,
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Options
    debugAll: process.env.NODE_ENV === 'development',
  })

  return (
    <div className="rounded-tremor-default bg-white shadow-tremor-card">
      <div className="p-8">
        <Heading size="h3">All Tickets</Heading>
      </div>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const isSorted = header.column.getIsSorted()

                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={clsx(
                      'py-2 text-start text-tremor-content-subtle first:pl-8 last:pr-8',
                      {
                        'transition-colors hover:bg-gray-100': canSort,
                      },
                    )}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={clsx('flex items-center', {
                          'cursor-pointer select-none': canSort,
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {{
                          asc: <BarsArrowUpIcon className="h-6 w-6" />,
                          desc: <BarsArrowDownIcon className="h-6 w-6" />,
                        }[isSorted as string] ?? null}
                        {!isSorted && canSort && (
                          <Bars3CenterLeftIcon className="h-6 w-6" />
                        )}
                        <span className="ml-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="border-y">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="py-4 first:pl-8 last:pr-8"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-end gap-2 p-4">
        <div className="flex items-center">
          <span className="text-sm text-tremor-content-subtle">
            Rows per page:
          </span>
          <select
            className="text-sm text-tremor-content-subtle"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <span className="flex items-center gap-1 text-sm text-tremor-content-subtle">
          <div>| Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1 text-sm text-tremor-content-subtle">
          | Go to page:
          <input
            min={1}
            max={table.getPageCount()}
            type="number"
            value={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="w-12 rounded border p-1"
          />{' '}
          |
        </span>

        <button
          className="rounded border p-1 text-tremor-content-subtle hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-tremor-content-subtle disabled:bg-opacity-25"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          className="rounded border p-1 text-tremor-content-subtle hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-opacity-25"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}