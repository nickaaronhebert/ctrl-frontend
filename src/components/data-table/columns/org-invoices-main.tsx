import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/common/StatusBadge/StatusBadge";
import type { Invoice } from "@/types/responses/invoice";

export function orgInvoiceMainColumns(): ColumnDef<Invoice>[] {
  return [
    {
      accessorKey: "invoiceId",
      header: "Invoice ID",
      cell: ({ row }) => (
        <p className="text-xs font-medium">{row.getValue("invoiceId")}</p>
      ),
    },
    {
      accessorKey: "pharmacy",
      header: "Pharmacy",
      cell: ({ row }) => {
        const pharmacy = row.getValue("pharmacy") as {
          name: string;
          id: string;
        };
        return (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold">{pharmacy.name}</span>
          </div>
        );
      },
    },
    {
      id: "period",
      header: "Period",
      cell: ({ row }) => {
        console.log("Date Row", row.original);
        const start = new Date(row.original.startDate).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric" }
        );
        const end = new Date(row.original.endDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return <p className="text-xs font-medium">{`${start} – ${end}`}</p>;
      },
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }) => {
        const amount = Number(row.getValue("totalAmount")) || 0;
        return <p className="text-xs font-medium">${amount.toFixed(2)}</p>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status } = row.original;

        return <StatusBadge status={status} />;
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            to={`/org/transactions/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground"
          >
            View
          </Link>
        );
      },
    },
  ];
}
