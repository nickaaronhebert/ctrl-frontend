import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/common/StatusBadge/StatusBadge";
import type { Invoice } from "@/types/responses/invoice";
import { format } from "date-fns";

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
      accessorKey: "organization",
      header: "Organization",
      cell: ({ row }) => {
        const org = row.getValue("organization") as {
          name: string;
          id: string;
        };
        const subOrg = row.original.subOrganization as
          | { name: string; id: string }
          | undefined;

        const displayName = subOrg?.name || org?.name;

        return (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold">{displayName}</span>
          </div>
        );
      },
    },
    {
      id: "period",
      header: "Period",
      cell: ({ row }) => {
        const start = row.original.startDate
          ? format(new Date(row.original.startDate), "MMM d, yyyy")
          : "-";
        const end = row.original.endDate
          ? format(new Date(row.original.endDate), "MMM d, yyyy")
          : "-";

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
