// tracked-columns.tsx

import { type ColumnDef } from "@tanstack/react-table";
import type { TrackedTransmission } from "./tracking";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge/StatusBadge";
import { useState } from "react";
// import { FulfillmentTrackingDialog } from "@/components/common/FulfillmentTrackingDialog/FulfillmentTrackingDialog";
// import { exampleFulfillmentData } from "@/constants";

export function trackedTransmissionColumns(): ColumnDef<TrackedTransmission>[] {
  return [
    {
      accessorKey: "transmissionId",
      header: "Transmission ID",
      cell: ({ row }) => (
        <span className="text-[13px] font-medium">
          {row.getValue("transmissionId")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return <StatusBadge status={row.original.status} />;
      },
    },
    {
      id: "pharmacy",
      header: "Pharmacy",
      cell: ({ row }) => {
        const { pharmacy } = row.original;
        return (
          <div className="flex flex-col">
            <span className="text-[13px] font-medium">{pharmacy.name}</span>
            <span className="text-[12px] text-muted-foreground">
              {pharmacy.id}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "trackingNumber",
      header: "Carrier Tracking #",
      cell: ({ row }) => (
        <span className="text-[13px]">{row.getValue("trackingNumber")}</span>
      ),
    },
    {
      accessorKey: "trackedOn",
      header: "Last Updated",
      cell: ({ row }) => (
        <span className="text-[13px]">{row.getValue("trackedOn")}</span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: () => {
        const [open, setOpen] = useState(false);
        return (
          <>
            <Button
              variant={"outline"}
              onClick={() => setOpen(!open)}
              className="rounded-[50px] px-8 bg-transparent cursor-pointer"
            >
              View
            </Button>
            {/* <FulfillmentTrackingDialog
              open={open}
              onOpenChange={setOpen}
              data={exampleFulfillmentData}
            /> */}
          </>
        );
      },
    },
  ];
}
