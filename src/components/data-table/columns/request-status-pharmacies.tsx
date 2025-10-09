import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TransmissionsStats } from "@/types/responses/IViewOrgPharmaciesTranmissions";
import type { ColumnDef } from "@tanstack/react-table";

export function requestStatusPharmaciesTransmissionColumns(): ColumnDef<TransmissionsStats>[] {
  return [
    {
      accessorKey: "name", // just for sorting/filtering on firstName
      header: "Pharmacy Name",
      cell: ({ row }) => {
        const { name } = row.original;
        return (
          <>
            <p className="text-sm font-medium">{name}</p>
          </>
        );
      },
    },

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

    {
      accessorKey: "address", // just for sorting/filtering on firstName
      header: "Address",
      cell: ({ row }) => {
        const { address } = row.original;
        const formattedAddress =
          `${address?.address1 ? address?.address1 : ""} ${
            address?.address2 ? address?.address2 : ""
          } ${address?.city ? address?.city : ""} ${
            address?.state ? address?.state : ""
          }` || "-";
        return (
          <>
            <p className="text-sm  font-medium">
              {address ? formattedAddress : "-"}
              {/* {`${address?.address1 ? address?.address1 : ""} ${
                address?.address2 ? address?.address2 : ""
              } ${address?.city ? address?.city : ""} ${
                address?.state ? address?.state : ""
              }`}{" "} */}
            </p>
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
          <Badge
            className={cn(
              "capitalize p-1.5 ",
              status == "pending"
                ? "bg-[#FFF6E5] text-[#D56E01] border border-[#D56E01]"
                : status == "rejected"
                ? "bg-[#FFE9E9] text-[#E31010] border border-[#E31010]"
                : ""
            )}
          >
            {status}
          </Badge>
        );
      },
    },
  ];
}
