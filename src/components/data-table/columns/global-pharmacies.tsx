import PharmacyConnectDialog from "@/components/dialog/connect";
import { Button } from "@/components/ui/button";
import type { TransmissionsStats } from "@/types/responses/IViewOrgPharmaciesTranmissions";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export function globalPharmaciesTransmissionColumns(): ColumnDef<TransmissionsStats>[] {
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
      accessorKey: "phoneNumber", // just for sorting/filtering on firstName
      header: "Contact Info",
      cell: ({ row }) => {
        const { phoneNumber, address } = row.original;
        return (
          <>
            <p className="text-sm font-medium">{phoneNumber}</p>
            <p className="text-sm text-[#3E4D61] font-medium">
              {`${address?.address1 ? address?.address1 : ""} ${
                address?.address2 ? address?.address2 : ""
              } ${address?.city ? address?.city : ""} ${
                address?.state ? address?.city : ""
              }`}{" "}
            </p>
          </>
        );
      },
    },

    {
      accessorKey: "allowedStates", // just for sorting/filtering on firstName
      header: "Available States",
      cell: ({ row }) => {
        const states: string[] = row.getValue("allowedStates");
        if (!states || states.length === 0) {
          return (
            <p className="text-xs font-medium text-gray-500">No statess</p>
          );
        }
        const displayedStates = states.slice(0, 4);
        const remainingCount = states.length - 4;

        return (
          <div className="  ">
            <div className="flex flex-wrap gap-2">
              {displayedStates.map((state, index) => (
                <div
                  key={index}
                  className=" py-1.5 px-2 bg-[#E5F3FC] rounded-[8px]"
                >
                  <div className="font-medium text-black text-sm mb-1">
                    {state}
                  </div>
                </div>
              ))}
            </div>

            {remainingCount > 0 && (
              <div className="mt-3  ">
                <div className="text-blue-600 text-sm font-medium underline underline-offset-2">
                  +{remainingCount} state{remainingCount > 1 ? "s" : ""}
                </div>
              </div>
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "id", // just for sorting/filtering on firstName
      header: "Action",
      cell: ({ row }) => {
        const { id } = row.original;
        const [openPharmacyConnectDialog, setOpenPharmacyConnectDialog] =
          useState(false);
        return (
          <>
            <Button
              onClick={() => setOpenPharmacyConnectDialog(true)}
              variant={"transparent"}
              size={"lg"}
              className="min-w-24 rounded-[18px]"
            >
              Connect
            </Button>
            <PharmacyConnectDialog
              id={id}
              open={openPharmacyConnectDialog}
              setOpen={setOpenPharmacyConnectDialog}
            />
          </>
        );
      },
    },
  ];
}
