import { Button } from "@/components/ui/button";
import { WebHookLogDetails } from "@/pages/Organization/Webhook/Configured/Details/LogDetail/Details";
import type { WebhookEvent } from "@/types/responses/IEventLog";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

// export interface EventLog {
//   _id: string;
//   eventId: string;

//   direction: "outbound" | "inbound";

//   eventType: string;
//   subEventType: string;

//   webhookStatus: "success" | "failed";

//   transmission: {
//     _id: string;
//     transmissionId: string;
//   };

//   webhook: {
//     _id: string;
//     name: string;
//   };

//   pharmacy: {
//     _id: string;
//     name: string;
//   };

//   requestPayload: {
//     transmission: string;
//     status: string | null;
//     trackingUrl: string;
//   };

//   createdAt: string; // ISO string
//   updatedAt: string; // ISO string
//   __v: number;
// }

export function eventLogColumns(): ColumnDef<WebhookEvent>[] {
  return [
    {
      accessorKey: "eventId",
      header: "Event Id",

      cell: ({ row }) => {
        return (
          <p className="text-[14px] font-medium">
            {row.getValue("eventId") ?? "-"}
          </p>
        );
      },
    },
    {
      id: "transmissionId",
      header: "Transmission",
      accessorFn: (row) => row.transmission?.transmissionId ?? "-",
      cell: ({ getValue }) => {
        console.log("row transmiion");
        return (
          <p className="text-[14px] font-medium text-primary underline underline-offset-2">
            {getValue<string>()}
          </p>
        );
      },
    },
    {
      accessorKey: "webhookStatus",
      header: "Status",

      cell: ({ row }) => {
        const webHookStatus = row.getValue("webhookStatus");
        return (
          <div>
            <p className="text-[14px] font-medium">
              {webHookStatus === "success" ? (
                <span className="w-[46px] h-[24px] rounded-[5px] border border-[#E6FAF5] p-[6px] gap-[4px] bg-[#E6FAF5] text-[#21BB72]">
                  success
                </span>
              ) : (
                <span className="w-[46px] h-[24px] rounded-[5px] border border-[#FFE9E9] p-[6px] gap-[4px] bg-[#FFE9E9] text-[#E31010]">
                  failed
                </span>
              )}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "direction",
      header: "Direction",

      cell: ({ row }) => {
        return (
          <div>
            <p className="text-[14px] font-medium">
              {row.getValue("direction")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "subEventType",
      header: "Type",

      cell: ({ row }) => {
        return (
          <div>
            <p className="text-[14px] font-medium">
              {row.getValue("subEventType")}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.original.createdAt
        ).toLocaleDateString("en-US");
        return <p className="text-sm">{formattedDate}</p>;
      },
    },
    {
      accessorKey: "_id",
      header: "Action",
      cell: ({ row }) => {
        const [openEventLog, setOpenEventLog] = useState<boolean>(false);

        return (
          <>
            <Button
              onClick={() => setOpenEventLog(true)}
              className="flex justify-center bg-transparent hover:bg-transparent cursor-pointer items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
            >
              View
            </Button>

            {openEventLog && (
              <WebHookLogDetails
                data={row.original}
                open={openEventLog}
                onOpenChange={setOpenEventLog}
              />
            )}
          </>
        );
      },
    },
  ];
}
