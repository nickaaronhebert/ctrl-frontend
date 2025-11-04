import OrganizationConnectActionDialog from "@/components/dialog/action";
import { Button } from "@/components/ui/button";
import type { ConnectedOrganization } from "@/types/responses/IConnectedOrganization";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export function pendingOrganizationColumns(): ColumnDef<ConnectedOrganization>[] {
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
      accessorKey: "id", // just for sorting/filtering on firstName
      header: "Action",
      cell: ({ row }) => {
        const { organization, invitation, status, isAffiliationActive } =
          row.original;
        const [openConnectionRequest, setOpenConnectionRequest] =
          useState(false);
        // const { email } = row.original;
        return (
          <>
            <Button
              variant={"transparent"}
              className="min-w-28 py-2.5"
              onClick={() => setOpenConnectionRequest(true)}
            >
              View
            </Button>
            <OrganizationConnectActionDialog
              invitationId={invitation}
              status={status}
              isAffiliationActive={isAffiliationActive!}
              open={openConnectionRequest}
              setOpen={setOpenConnectionRequest}
              id={organization.id}
              name={organization.name}
              email={organization.email}
              phoneNumber={organization.phoneNumber}
            />
            {/* <p className="text-sm font-medium">{organization.id}</p> */}
          </>
        );
      },
    },

    // {
    //   accessorKey: "status", // just for sorting/filtering on firstName
    //   header: "Status",
    //   cell: ({ row }) => {
    //     const { status } = row.original;
    //     return (
    //       <>
    //         <Badge className={cn("p-1.5 capitalize")}>{status}</Badge>
    //       </>
    //     );
    //   },
    // },

    // {
    //   accessorKey: "email", // just for sorting/filtering on firstName
    //   header: "Email",
    //   cell: ({ row }) => {
    //     const { email } = row.original;
    //     return (
    //       <>
    //         <p className="text-sm font-medium">{email}</p>
    //       </>
    //     );
    //   },
    // },
  ];
}
