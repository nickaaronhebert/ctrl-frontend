import { webhookLogsColumns } from "@/components/data-table/columns/webhook/logsColumn";
import { useMemo } from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTable } from "@/components/data-table/data-table";

export type WebhookLogs = {
  eventId: string;
  tranmissionId: string;
  status: number;
  organization: string;
  type: string;
  response: string;
  createdAt: string;
  id: string;
};

const mockData: WebhookLogs[] = [
  {
    eventId: "evt_001",
    tranmissionId: "tx_001",
    status: 200,
    organization: "OrgA",
    type: "user.created",
    response: "OK",
    createdAt: "2025-01-10T10:15:30Z",
    id: "log_001",
  },
  {
    eventId: "evt_002",
    tranmissionId: "tx_002",
    status: 500,
    organization: "OrgB",
    type: "payment.failed",
    response: "Internal Server Error",
    createdAt: "2025-01-12T08:22:19Z",
    id: "log_002",
  },
  {
    eventId: "evt_003",
    tranmissionId: "tx_003",
    status: 201,
    organization: "OrgC",
    type: "invoice.generated",
    response: "Created",
    createdAt: "2025-01-14T14:40:10Z",
    id: "log_003",
  },
  {
    eventId: "evt_004",
    tranmissionId: "tx_004",
    status: 400,
    organization: "OrgA",
    type: "user.updated",
    response: "Bad Request",
    createdAt: "2025-01-16T09:05:44Z",
    id: "log_004",
  },
  {
    eventId: "evt_005",
    tranmissionId: "tx_005",
    status: 200,
    organization: "OrgD",
    type: "order.created",
    response: "Success",
    createdAt: "2025-01-18T18:30:20Z",
    id: "log_005",
  },
  {
    eventId: "evt_006",
    tranmissionId: "tx_006",
    status: 403,
    organization: "OrgB",
    type: "auth.denied",
    response: "Forbidden",
    createdAt: "2025-01-19T20:11:02Z",
    id: "log_006",
  },
  {
    eventId: "evt_007",
    tranmissionId: "tx_007",
    status: 202,
    organization: "OrgE",
    type: "webhook.retry",
    response: "Accepted",
    createdAt: "2025-01-20T13:17:59Z",
    id: "log_007",
  },
  {
    eventId: "evt_008",
    tranmissionId: "tx_008",
    status: 410,
    organization: "OrgC",
    type: "resource.deleted",
    response: "Gone",
    createdAt: "2025-01-21T11:05:33Z",
    id: "log_008",
  },
  {
    eventId: "evt_009",
    tranmissionId: "tx_009",
    status: 204,
    organization: "OrgA",
    type: "settings.updated",
    response: "No Content",
    createdAt: "2025-01-22T07:45:12Z",
    id: "log_009",
  },
  {
    eventId: "evt_010",
    tranmissionId: "tx_010",
    status: 500,
    organization: "OrgF",
    type: "webhook.failed",
    response: "Server Error",
    createdAt: "2025-01-23T16:00:05Z",
    id: "log_010",
  },
];

export default function Logs() {
  const columns = useMemo(() => webhookLogsColumns(), []);
  const { table } = useDataTable({
    data: mockData || [],
    columns,
    // filterFields,
    pageCount: 1,
  });

  return (
    <div className="mt-7">
      <div className="">
        <DataTable table={table} headerClass={false} className="p-2" />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
