import * as React from "react";
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
// import { DataTablePagination } from "./data-table-pagination";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>;

  /**
   * The floating bar to render at the bottom of the table on row selection.
   * @default null
   * @type React.ReactNode | null
   * @example floatingBar={<TasksTableFloatingBar table={table} />}
   */
  floatingBar?: React.ReactNode | null;
  showPagination?: boolean;
  headerClass?: boolean;
}

export function DataTable<TData>({
  table,
  // floatingBar = null,
  // children,
  className,
  // showPagination,
  headerClass = false,
}: // ...props
DataTableProps<TData>) {
  return (
    <>
      {/* // ? below div and scroll area is commented */}
      {/* <ScrollArea className="h-[75vh] rounded-none border w-full overflow-x-auto"> */}
      <ScrollArea className="h-[620px] rounded-md">
        <Table className={cn("", className)}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-lavender  ">
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "text-black font-medium text-sm h-10",
                        index === 0 && headerClass ? "rounded-tl-2xl" : "",
                        index === headerGroup?.headers?.length - 1 &&
                          headerClass
                          ? "rounded-tr-2xl"
                          : ""
                      )}
                      // className="text-black font-medium text-sm h-10 "
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-background">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3 text-sm">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-[66vh] text-center"
                >
                  <div className="flex flex-col items-center justify-center h-full gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-muted-foreground/70"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-18-9V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25V7.5m-9 4.5l3-3m0 0l3 3m-3-3v12"
                      />
                    </svg>
                    <p className="text-lg font-medium">No matching records</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
      {/* <ScrollBar orientation="horizontal" /> */}
      {/* </ScrollArea> */}
    </>
  );
}
