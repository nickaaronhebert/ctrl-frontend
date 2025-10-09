import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ConnectedOrganization } from "@/types/responses/IConnectedOrganization";
import type { ColumnDef } from "@tanstack/react-table";

export function activeOrganizationColumns(): ColumnDef<ConnectedOrganization>[] {
  return [
    {
      accessorKey: "organization", // just for sorting/filtering on firstName
      header: "Organization Name",
      cell: ({ row }) => {
        const { organization } = row.original;
        return (
          <>
            <p className="text-sm font-medium">{organization.name}</p>
          </>
        );
      },
    },

    {
      accessorKey: "email", // just for sorting/filtering on firstName
      header: "Email",
      cell: ({ row }) => {
        const { organization } = row.original;
        return (
          <>
            <p className="text-sm font-medium">{organization.email}</p>
          </>
        );
      },
    },

    {
      accessorKey: "status", // just for sorting/filtering on firstName
      header: "Status",
      cell: ({ row }) => {
        const { status } = row.original;
        return (
          <>
            <Badge className={cn("p-1.5 capitalize")}>{status}</Badge>
          </>
        );
      },
    },
  ];
}
