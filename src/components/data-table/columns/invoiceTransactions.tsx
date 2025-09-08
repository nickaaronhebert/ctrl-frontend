import type { ColumnDef } from "@tanstack/react-table";
import { type PharmacyInvoices } from "@/types/global/commonTypes";
import { Link } from "react-router-dom";

export function invoiceColumns(): ColumnDef<PharmacyInvoices>[] {
  return [
    {
      accessorKey: "transaction.transmissionCode",
      header: "Transmission ID",
      cell: ({ row }) => {
        console.log("transmissionCode", row.original);
        return (
          <p className="text-sm font-medium">
            {/* {row.getValue("transaction.transmissionCode")} */}
            {row.original.transaction.transmissionCode}
          </p>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        console.log("createdAt", row.original.createdAt);
        const date = new Date(row.getValue("createdAt")).toLocaleDateString(
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
      accessorKey: "totalAmount",
      header: "Amount",
      cell: ({ row }) => {
        console.log("amount", row.original);
        const amount = Number(row.original.transaction.totalAmount) || 0;
        return <p className="text-sm font-medium">${amount.toFixed(2)}</p>;
      },
    },
    // {
    //   accessorKey: "affiliate",
    //   header: "Affiliate",
    //   cell: ({ row }) => {
    //     const affiliate = row.getValue("affiliate") as InvoiceRow["affiliate"];
    //     return (
    //       <div className="flex flex-col">
    //         <p className="text-sm font-medium">{affiliate.firstName}</p>
    //         <p className="text-xs text-gray-500">{affiliate.id}</p>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "transmissionId",
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <Link
          to={`/org/invoices/${row.getValue("transmissionId")}`}
          className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
        >
          View
        </Link>
      ),
    },
  ];
}
