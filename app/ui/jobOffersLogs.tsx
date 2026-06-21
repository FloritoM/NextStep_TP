"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { JobOfferLog } from '@/app/lib/definitions'
import ActionIcon from '@/app/ui/ActionIcon'
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

export default function JobOffersLogs({ jobOffers, token }: { jobOffers: JobOfferLog[], token: string }) {

    const columns = React.useMemo<ColumnDef<JobOfferLog>[]>(
        () => [
            {
                accessorKey: 'title',
                cell: (info) => info.getValue(),
                header: () => 'Título',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'description',
                cell: (info) => info.getValue(),
                header: () => 'Descripción',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'recruiterId',
                cell: (info) => info.getValue(),
                header: () => 'Reclutador ID',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'seniorityId',
                cell: (info) => info.getValue(),
                header: () => 'Seniority ID',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'isActive',
                cell: (info) => (info.getValue() ? 'Activa' : 'Inactiva'),
                header: () => 'Estado',
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'createdAt',
                header: 'Creada',
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
                        timeZone: 'America/Argentina/Buenos_Aires',
                    })
                },
                footer: (props) => props.column.id,
            },
            {
                accessorKey: 'updatedAt',
                header: 'Actualizada',
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
                        timeZone: 'America/Argentina/Buenos_Aires',
                    })
                },
                footer: (props) => props.column.id,
            },
            {
                id: 'action',
                accessorKey: 'isActive',
                header: () => 'Acción',
                cell: (info) => (
                    <ActionIcon
                        isActive={info.getValue() as boolean}
                        entityId={info.row.original.id}
                        onToggle={async (id) => {
                            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-offers/${id}`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                                body: JSON.stringify({ isActive: !info.getValue() })
                            });
                            setData(prev => prev.map(offer =>
                                offer.id === id ? { ...offer, isActive: !info.getValue() as boolean } : offer
                            ));
                        }}
                    />
                ),
            },
        ],
        [],
    )

    const [data, setData] = React.useState(() => [...jobOffers])

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
    data: JobOfferLog[]
    columns: ColumnDef<JobOfferLog>[]
}) {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
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
            <div className="overflow-x-auto">
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
                                                asc: <FontAwesomeIcon icon={faSortUp} className='text-amber-600' />,
                                                desc: <FontAwesomeIcon icon={faSortDown} className='text-amber-600' />,
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
                                        <td key={cell.id} className='border border-gray-700 bg-gray-800/50 py-3 text-center'>
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
            </table></div>
            <div className="mt-6 flex items-center gap-2 justify-center">
                <button
                    className='rounded border border-gray-700 bg-gray-800/50 cursor-pointer'
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className='rounded border border-gray-700 bg-gray-800/50 cursor-pointer'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>
                <button
                    className='rounded border border-gray-700 bg-gray-800/50 cursor-pointer'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className='rounded border border-gray-700 bg-gray-800/50 cursor-pointer'
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

    return (
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