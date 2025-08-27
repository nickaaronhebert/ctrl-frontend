import PendingBadge from "@/components/TransmissionBadge/pending";
import SuccessBadge from "@/components/TransmissionBadge/success";
import type { AffiliatedProviders } from "@/types/responses/provider";

import type { ColumnDef } from "@tanstack/react-table";

export function organizationProviderColumns(): ColumnDef<AffiliatedProviders>[] {
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
  ];
}
