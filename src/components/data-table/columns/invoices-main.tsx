import { type ColumnDef } from "@tanstack/react-table";
import { type Invoice } from "@/types/global/commonTypes";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/common/StatusBadge/StatusBadge";

export function invoiceMainColumns(): ColumnDef<Invoice>[] {
  return [
    {
      accessorKey: "id",
      header: "Invoice ID",
      cell: ({ row }) => (
        <p className="text-xs font-medium">{row.getValue("id")}</p>
      ),
    },
    {
      accessorKey: "organization",
      header: "Organization",
      cell: ({ row }) => {
        const org = row.getValue("organization") as Invoice["organization"];
        return (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold">{org.name}</span>
            <span className="text-gray-400 ">{org.code}</span>
          </div>
        );
      },
    },
    {
      id: "period",
      header: "Period",
      cell: ({ row }) => {
        const start = new Date(row.original.periodStart).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric" }
        );
        const end = new Date(row.original.periodEnd).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric", year: "numeric" }
        );
        return <p className="text-xs font-medium">{`${start} – ${end}`}</p>;
      },
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
      cell: ({ row }) => {
        const amount = Number(row.getValue("totalAmount")) || 0;
        return (
          <p className="text-xs font-medium">${amount.toLocaleString()}</p>
        );
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
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            to={`/pharmacy/invoices/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground"
          >
            View
          </Link>
        );
      },
    },
  ];
}
