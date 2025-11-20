import type { WebhookLogs } from "@/pages/Organization/Webhook/Configured/Details/LogDetail";
import { WebHookLogDetails } from "@/pages/Organization/Webhook/Configured/Details/LogDetail/Details";
import type { ColumnDef } from "@tanstack/react-table";

export function webhookLogsColumns(): ColumnDef<WebhookLogs>[] {
  return [
    {
      accessorKey: "eventId",
      header: "Event ID",

      cell: ({ row }) => {
        return (
          <p className="text-[14px] font-medium">
            {row.getValue("eventId") ?? "-"}
          </p>
        );
      },
    },
    {
      accessorKey: "tranmissionId",
      header: "Transmission",

      cell: ({ row }) => {
        return (
          <div>
            <p className="text-[14px] font-medium text-primary underline underline-offset-2">
              {row.getValue("tranmissionId") ?? "-"}
            </p>
          </div>
        );
      },
    },

    {
      accessorKey: "organization",
      header: "Organization",

      cell: ({ row }) => {
        return (
          <div>
            <p className="text-[14px] font-medium">
              {row.getValue("organization") ?? "-"}
            </p>
          </div>
        );
      },
    },

    {
      accessorKey: "type",
      header: "Type",

      cell: ({ row }) => {
        return (
          <p className="text-[14px] font-medium">
            {row.getValue("type") ?? "-"}
          </p>
        );
      },
    },

    {
      accessorKey: "response",
      header: "Response",

      cell: ({ row }) => {
        return (
          <p className="text-[14px] font-medium">
            {row.getValue("response") ?? "-"}
          </p>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.getValue("createdAt")
        ).toLocaleDateString("en-US");
        return (
          <>
            <p className="text-[14px] font-medium">{formattedDate}</p>
          </>
        );
      },
    },

    {
      accessorKey: "id",
      header: "Action",
      cell: () => {
        return <WebHookLogDetails />;
      },
    },
  ];
}
