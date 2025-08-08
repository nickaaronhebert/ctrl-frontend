import PendingBadge from "@/components/TransmissionBadge/pending";
import QueuedBadge from "@/components/TransmissionBadge/queued";
import SuccessBadge from "@/components/TransmissionBadge/success";
import { PROVIDER_STATUS } from "@/types/global/commonTypes";

import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export type Provider = {
  name: string;
  email: string;
  npi: string;
  status: string;
};

export function organizationProviderColumns(): ColumnDef<Provider>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",

      cell: ({ row }) => {
        return <p className="text-xs font-medium">{row.getValue("name")}</p>;
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const providerStatus = row.getValue("status");

        return (
          <>
            {providerStatus === PROVIDER_STATUS.INVITED ? (
              <PendingBadge title="Invited" />
            ) : providerStatus === PROVIDER_STATUS.INVITATION_ACCEPTED ? (
              <QueuedBadge title="Invitation Accepted" />
            ) : (
              <SuccessBadge title="Medical Credentials Submitted" />
            )}
          </>
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
