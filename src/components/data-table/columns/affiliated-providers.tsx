import PendingBadge from "@/components/TransmissionBadge/pending";
import SuccessBadge from "@/components/TransmissionBadge/success";

import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export type Provider = {
  firstName: string;
  lastName: string;
  email: string;
  npi: string;
  status: string;
  isAffiliationActive: boolean;
};

export function organizationProviderColumns(): ColumnDef<Provider>[] {
  return [
    {
      accessorKey: "firstName",
      header: "Name",
      cell: ({ row }) => {
        const firstName = row.original.firstName || "";
        const lastName = row.original.lastName || "";
        return (
          <p className="text-xs font-medium">
            {`${firstName} ${lastName}`.trim()}
          </p>
        );
      },
    },

    {
      accessorKey: "npi",
      header: "NPI",

      cell: ({ row }) => {
        return <p className="text-xs font-medium">{row.getValue("npi")}</p>;
      },
    },

    {
      accessorKey: "email",
      header: "Email",

      cell: ({ row }) => {
        return <p className="text-xs font-medium">{row.getValue("email")}</p>;
      },
    },

    {
      accessorKey: "isAffiliationActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.original.isAffiliationActive;
        return isActive ? (
          <SuccessBadge title="Active" />
        ) : (
          <PendingBadge title="Inactive" />
        );
      },
    },

    {
      id: "actions",
      cell: () => {
        return (
          <Link
            to={"#"}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
