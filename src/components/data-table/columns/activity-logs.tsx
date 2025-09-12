import Orders from "@/assets/icons/Orders";
import ProductVariant from "@/assets/icons/Product";

import SecondaryOverview from "@/assets/mainlayouticons/SecondaryOverview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ViewLogsDetail from "@/pages/Organization/ActivityLogs/dialog";
import type {
  Actor,
  IActivityLogData,
} from "@/types/responses/IViewAllActivityLogs";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export function organizationActivityColumns(): ColumnDef<IActivityLogData>[] {
  return [
    {
      accessorKey: "entityType",
      header: "Activity Type",

      cell: ({ row }) => {
        const entityType: string = row.getValue("entityType");
        // className={cn("rounded-[5px] h-5 w-5 flex justify-center items-center bg-[#E5F1FF] mb-1")}
        return (
          <div className="flex gap-1.5 items-center">
            <div
              className={cn(
                "rounded-[5px] h-8 w-8 flex justify-center items-center",
                entityType === "Order" ? "bg-[#FFF6E5]" : "",
                entityType === "Transmission" ? "bg-[#E5F3FC]" : "",
                entityType === "Prescription" ? "bg-[#F7F1FD]" : ""
              )}
            >
              {entityType === "Order" && (
                <Orders height={20} width={20} color="#D56E01" />
              )}
              {entityType === "Transmission" && (
                <SecondaryOverview />
                // <Transmission height={20} width={20} color="#008CE3" />
              )}

              {entityType === "Prescription" && (
                <ProductVariant height={23} width={23} color="#BD51BB" />
              )}
            </div>
            <p className="text-sm font-medium">{entityType}</p>
          </div>
        );
      },
    },

    {
      accessorKey: "actor",
      header: "Performed by",

      cell: ({ row }) => {
        const actor: Actor = row.getValue("actor");
        return (
          <div className="space-y-1">
            <p className="text-sm font-semibold">{actor.role.name}</p>
            <p className="text-sm font-medium text-[#3E4D61]">{`${actor.firstName} ${actor.lastName}`}</p>
          </div>
        );
      },
    },

    {
      accessorKey: "action",
      header: "Activity Status",

      cell: ({ row }) => {
        return (
          <p className="w-fit text-xs font-semibold bg-[#F6F8F9] border border-[#3E4D61] text-[#3E4D61] p-1.5 rounded-[5px]">
            {row.getValue("action")}
          </p>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));

        const formattedDate = date.toLocaleString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        });

        return (
          <>
            <p className="text-sm font-medium">{formattedDate}</p>
          </>
        );
      },
    },

    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        const [openLogsModal, setOpenLogsModal] = useState(false);
        return (
          <>
            <Button
              variant={"outline"}
              onClick={() => setOpenLogsModal(!openLogsModal)}
              className="rounded-[50px] bg-transparent cursor-pointer"
            >
              View
            </Button>

            <ViewLogsDetail
              id={row.getValue("id")}
              openLogsModal={openLogsModal}
              setOpenLogsModal={setOpenLogsModal}
            />
          </>
        );
      },
    },
  ];
}
