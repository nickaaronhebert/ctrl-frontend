import type { ColumnDef } from "@tanstack/react-table";
import { type InvoiceRow } from "@/types/global/commonTypes";
import { Link } from "react-router-dom";

export function invoiceColumns(): ColumnDef<InvoiceRow>[] {
  return [
    {
      accessorKey: "transmissionId",
      header: "Transmission ID",
      cell: ({ row }) => (
        <p className="text-sm font-medium">{row.getValue("transmissionId")}</p>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date")).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        );
        return <p className="text-sm">{date}</p>;
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = Number(row.getValue("amount")) || 0;
        return <p className="text-sm font-medium">${amount.toFixed(2)}</p>;
      },
    },
    {
      accessorKey: "affiliate",
      header: "Affiliate",
      cell: ({ row }) => {
        const affiliate = row.getValue("affiliate") as InvoiceRow["affiliate"];
        return (
          <div className="flex flex-col">
            <p className="text-sm font-medium">{affiliate.name}</p>
            <p className="text-xs text-gray-500">{affiliate.id}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "transmissionId",
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <Link
          to={`/org/invoices/${row.getValue("transmissionId")}`}
          className="py-1 px-4 rounded-full border border-primary text-sm font-medium"
        >
          View
        </Link>
      ),
    },
  ];
}
