import { flexRender, getCoreRowModel, useReactTable, ColumnDef } from '@tanstack/react-table';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  emptyState?: ReactNode;
  className?: string;
}

export function DataTable<TData>({ data, columns, emptyState, className }: DataTableProps<TData>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('overflow-hidden rounded-3xl border border-gray-100 bg-white/60 dark:border-gray-800 dark:bg-gray-900/60', className)}
    >
      <div className="max-w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm text-gray-600 dark:divide-gray-800 dark:text-gray-200">
          <thead className="bg-gray-50/80 dark:bg-gray-900/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white/30 dark:divide-gray-800 dark:bg-transparent">
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
                  {emptyState ?? 'No data available'}
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-primary-50/50 dark:hover:bg-gray-800/80">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
