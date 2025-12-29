// pending-columns.tsx

import { type ColumnDef } from "@tanstack/react-table";
import type { PendingTransmission } from "./tracking";

export function pendingTransmissionColumns(): ColumnDef<PendingTransmission>[] {
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
      accessorKey: "transmittedOn",
      header: "Transmitted On",
      cell: ({ row }) => (
        <span className="text-[13px]">{row.getValue("transmittedOn")}</span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: () => (
        <button className="px-4 py-1 h-[36px] rounded-[50px] border">
          Request for Track
        </button>
      ),
    },
  ];
}
