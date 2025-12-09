import { CreateOrganizationCredentialsModal } from "@/components/common/CreateOrganizationCredentialsModal/CreateOrganizationCredentialsModal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ConnectedOrganization } from "@/types/responses/IConnectedOrganization";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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
      accessorKey: "email",
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
      accessorKey: "invoiceFrequency",
      header: "Billing Cycle",
      cell: ({ row }) => {
        // const { organization } = row.original;
        const invoiceFrequency = row.original?.invoiceFrequency;
        return (
          <>
            <span className="text-sm font-medium px-3 py-1 rounded-sm bg-[#E5F3FC]">
              {invoiceFrequency ? invoiceFrequency.toUpperCase() : "N/A"}
            </span>
          </>
        );
      },
    },

    {
      accessorKey: "status",
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
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        const org = row.original.organization;
        return (
          <Link
            to={`/pharmacy/organizations/active/${row.original.organization.id}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
            state={{
              organization: org,
            }}
          >
            View
          </Link>
        );
      },
    },
  ];
}
