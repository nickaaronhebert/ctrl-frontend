import { webhookLogsColumns } from "@/components/data-table/columns/webhook/logsColumn";
import { useMemo } from "react";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTable } from "@/components/data-table/data-table";
import type { WebhookEventResponse } from "@/types/responses/IEventLog";

interface LogsProps {
  response?: WebhookEventResponse;
}

export default function Logs({ response }: LogsProps) {
  const columns = useMemo(() => webhookLogsColumns(), []);
  const { table } = useDataTable({
    data: response?.data || [],
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
