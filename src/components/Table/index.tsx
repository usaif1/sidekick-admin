import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

interface GenericTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  title?: string;
  pageSize?: number;
  onRowClick?: (rowData: T) => void;
}

function GenericTable<T extends object>({
  data,
  columns,
  title,
  pageSize = 5,
  onRowClick,
}: GenericTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<T>({
    data,
    columns,
    initialState: { pagination: { pageSize } },
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <div className="max-w-full rounded-xl mx-auto p-4 bg-card-background h-fit">
      {title && <h2 className="text-xl font-bold text-center mb-2">{title}</h2>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-4 py-1 cursor-pointer select-none text-gray-700"
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {isSorted === "asc" && <span>▲</span>}
                        {isSorted === "desc" && <span>▼</span>}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 font-bold text-gray-500"
                  style={{ height: "30vh" }}
                >
                  No data found!!
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  onClick={() => {
                    if (onRowClick && row.original) {
                      onRowClick(row.original);
                    }
                  }}
                  key={row.id}
                  className="border-b border-border-primary last:border-b-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-1 text-sm cursor-pointer"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center justify-between space-x-2">
          <button
            className="p-2 text-4xl text-icon-primary rounded disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ‹
          </button>
          <button
            className="p-2 text-4xl text-icon-primary rounded disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default GenericTable;
