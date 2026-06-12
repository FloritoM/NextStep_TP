"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { AuditLog } from '../lib/definitions'
import * as React from 'react'
import {
    Column,
    ColumnDef,
    PaginationState,
    SortingState,
    Table,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'

export default function AuditLogs({ logs }: { logs: AuditLog[] }) {

    const columns = React.useMemo<ColumnDef<AuditLog>[]>(
        () => [
            {
                accessorKey: 'userId',
                cell: (info) => info.getValue(),
                header: () => 'Usuario ID',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'action',
                cell: (info) => info.getValue(),
                header: () => 'Acción',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'entity',
                cell: (info) => info.getValue(),
                header: () => 'Entidad',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'entityId',
                cell: (info) => info.getValue(),
                header: () => 'Entidad ID',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'createdAt',
                header: 'Fecha',
                cell: (info) => {
                    const date = new Date(info.getValue() as string)
                    return date.toLocaleString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                    })
                },
                footer: (props) => props.column.id,
            },
        ],
        [],
    )

    const [data, setData] = React.useState(() => [...logs])

    return (
        <>
            <MyTable
                {...{
                    data,
                    columns,
                }}
            />
        </>
    )
}

function MyTable({
    data,
    columns,
}: {
    data: AuditLog[]
    columns: ColumnDef<AuditLog>[]
}) {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = React.useState<SortingState>([])
    const table = useReactTable({
        columns,
        data,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
            pagination,
            sorting,
        },
    })

    return (
        <div className="mt-20 text-white">
            <table className="mx-auto rounded-xl border border-gray-700">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th key={header.id} colSpan={header.colSpan} className='border border-gray-700 bg-gray-800/50 py-3 px-4'>
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                            {{
                                                asc: <FontAwesomeIcon icon={faSortUp} />,
                                                desc: <FontAwesomeIcon icon={faSortDown} />,
                                            }[header.column.getIsSorted() as string] ?? null}
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} table={table} />
                                                </div>
                                            ) : null}
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <tr key={row.id} >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id} className='border border-gray-700 bg-gray-800/50 py-3 pl-5'>
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
            <div className="mt-6 flex items-center gap-2 justify-center">
                <button
                    className='rounded border border-gray-700 bg-gray-800/50'
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className='rounded border border-gray-700 bg-gray-800/50'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className='rounded border border-gray-700 bg-gray-800/50'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className='rounded border border-gray-700 bg-gray-800/50'
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
                <span className="flex items-center gap-1">
                    <div>Página</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} de{' '}
                        {table.getPageCount().toLocaleString()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Página:
                    <input
                        type="number"
                        min="1"
                        max={table.getPageCount()}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize} className='text-black'>
                            Mostrar {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className='text-center mt-2'>
                Mostrando {table.getRowModel().rows.length.toLocaleString()} de{' '}
                {table.getRowCount().toLocaleString()} filas
            </div>
        </div>
    )
}

function Filter<TData, TValue>({
    column,
    table,
}: {
    column: Column<TData, TValue>
    table: Table<TData>
}) {
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id)

    const columnFilterValue = column.getFilterValue()

    return typeof firstValue === 'number' ? (
        <div className="flex space-x-2 pt-2" onClick={(e) => e.stopPropagation()}>
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[0] ?? ''}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [
                        e.target.value,
                        old?.[1],
                    ])
                }
                placeholder={`Min`}
                className="w-24 border border-gray-700 rounded text-white font-normal"
            />
            <input
                type="number"
                value={(columnFilterValue as [number, number])?.[1] ?? ''}
                onChange={(e) =>
                    column.setFilterValue((old: [number, number]) => [
                        old?.[0],
                        e.target.value,
                    ])
                }
                placeholder={`Max`}
                className="w-24 border border-gray-700 rounded font-normal"
            />
        </div>
    ) : (
        <div className='pt-2'>
            <input
                onChange={(e) => column.setFilterValue(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                placeholder={`Buscar...`}
                type="text"
                value={(columnFilterValue ?? '') as string}
                className="w-36 border border-gray-700 rounded font-normal"
            />
        </div>
    )
}