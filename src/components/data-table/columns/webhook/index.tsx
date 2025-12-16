import type { Webhook } from "@/types/responses/IGetAllWebhook";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function webhookColumns(): ColumnDef<Webhook>[] {
  return [
    {
      accessorKey: "name",
      header: "Webhook Name",

      cell: ({ row }) => {
        return (
          <p className="text-[14px] font-medium">
            {row.getValue("name") ?? "-"}
          </p>
        );
      },
    },
    {
      accessorKey: "targetUrl",
      header: "Target URL",

      cell: ({ row }) => {
        return (
          <div>
            <p className="text-[14px] font-medium text-primary underline underline-offset-2">
              {row.getValue("targetUrl") ?? "-"}
            </p>
          </div>
        );
      },
    },

    {
      accessorKey: "authType",
      header: "Auth Type",

      cell: ({ row }) => {
        const authType =
          row.getValue("authType") === "header_auth" ? "Header" : "Basic";
        return (
          <div>
            <p className="text-[14px] font-medium">{authType}</p>
          </div>
        );
      },
    },

    // {
    //   accessorKey: "events",
    //   header: "Events",

    //   cell: ({ row }) => {
    //     return (
    //       <div>
    //         <p className="text-[14px] font-medium">
    //           {row.getValue("events") ?? "-"}
    //         </p>
    //       </div>
    //     );
    //   },
    // },

    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => {
    //     const encounterStatus: EncounterStatus = row.getValue("status");

    //     return (
    //       <>
    //         {encounterStatus === "in_review" ? (
    //           <QueuedBadge title="In Review" />
    //         ) : encounterStatus === "completed" ? (
    //           <SuccessBadge title="Completed" />
    //         ) : encounterStatus === "started" ? (
    //           <PendingBadge title="Started" />
    //         ) : encounterStatus === "cancelled" ? (
    //           <FailedBadge title="Cancelled" />
    //         ) : null}
    //       </>
    //     );
    //   },
    // },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.original.createdAt
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return <p className="text-sm">{formattedDate}</p>;
      },
    },

    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            to={`/org/webhook/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
