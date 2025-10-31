import { CreateOrganizationCredentialsModal } from "@/components/common/CreateOrganizationCredentialsModal/CreateOrganizationCredentialsModal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ConnectedOrganization } from "@/types/responses/IConnectedOrganization";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";
import { useState } from "react";

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
        const { status, isAffiliationActive } = row.original;
        const [openCredentialsForm, setOpenCredentialsForm] = useState(false);
        useState(false);
        return (
          <>
            <div className="flex gap-4 items-center">
              <Badge className={cn("p-1.5 capitalize")}>{status}</Badge>
              {status === "accepted" && isAffiliationActive && (
                <SquarePen
                  onClick={() => setOpenCredentialsForm(true)}
                  color="grey"
                  className="cursor-pointer"
                  size={20}
                />
              )}
            </div>
            {openCredentialsForm && (
              <CreateOrganizationCredentialsModal
                open={openCredentialsForm}
                setOpen={setOpenCredentialsForm}
                id={row.original.organization.id}
                invitation={row.original.invitation}
                update={true}
              />
            )}
          </>
        );
      },
    },
  ];
}
