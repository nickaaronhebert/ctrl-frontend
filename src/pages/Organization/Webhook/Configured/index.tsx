// import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { webhookColumns } from "@/components/data-table/columns/webhook";
import { DataTable } from "@/components/data-table/data-table";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useSearchParams } from "react-router-dom";
import { useGetAllWebhookQuery } from "@/redux/services/webhook";

export type WebhookColumns = {
  name: string;
  targetUrl: string;
  authType: string;
  events: number;
  status: string;
  lastTriggered: string;
};

export default function ConfiguredWebhooks() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);

  const { data, meta } = useGetAllWebhookQuery(
    { page, perPage },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );
  const columns = useMemo(() => webhookColumns(), []);
  const { table } = useDataTable({
    data: data || [],
    columns,
    // filterFields,
    pageCount: meta?.pageCount ?? -1,
  });
  return (
    <div className="p-2.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
      <div className=" ">
        <DataTable table={table} headerClass={false} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
