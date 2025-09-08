// import type { PatientDetails } from "@/types/responses/patient";
import type { OrganizationInvoices } from "@/types/responses/IViewOrganizationInvoices";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function organizationInvoicesColumns(): ColumnDef<OrganizationInvoices>[] {
  return [
    {
      accessorKey: "transmissionCode", // just for sorting/filtering on firstName
      header: "Transmission ID",
      cell: ({ row }) => {
        const { transmissionCode } = row.original; // 👈 no accessor needed
        return (
          <>
            <p className="text-xs font-medium">{transmissionCode}</p>
          </>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: "Date",

      cell: ({ row }) => {
        const { createdAt } = row.original;
        const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        return <p className="text-xs font-medium">{formattedDate}</p>;
      },
    },

    {
      accessorKey: "totalAmount",
      header: "Amount",

      cell: ({ row }) => {
        const { totalAmount } = row.original;

        return (
          <>
            <p className="text-xs font-normal">{`$${totalAmount}`}</p>
          </>
        );
      },
    },

    {
      accessorKey: "pharmacy",
      header: "Pharmacy",

      cell: ({ row }) => {
        const { pharmacy } = row.original;

        return (
          <>
            <p className="text-xs font-semibold">{pharmacy.name}</p>
            <p className="text-xs font-medium text-slate-foreground">
              {pharmacy.phoneNumber}
            </p>
          </>
        );
      },
    },

    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            to={`#`}
            // to={`/org/transactions/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
