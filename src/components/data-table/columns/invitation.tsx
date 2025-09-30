import { Badge } from "@/components/ui/badge";
import { convertExtendedDate } from "@/lib/utils";
import type { Invitation } from "@/types/responses/IViewInvitation";

import type { ColumnDef } from "@tanstack/react-table";

export function ctrlInvitationColumns(): ColumnDef<Invitation>[] {
  return [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const { email } = row.original;
        return <p className="text-sm font-medium">{email}</p>;
      },
    },

    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const { type } = row.original;
        return (
          <p className="text-sm font-medium">
            {type === "organization_admin_invitation"
              ? "Organization Admin"
              : type === "pharmacy_admin_invitation"
              ? "Pharmacy Admin"
              : "Provider"}
          </p>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status } = row.original;
        return <Badge variant={"outline"}>{status}</Badge>;
      },
    },

    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const { createdAt } = row.original;
        const formattedDate = convertExtendedDate(createdAt ?? "");
        return <p className="text-sm font-medium">{formattedDate}</p>;
      },
    },
  ];
}
