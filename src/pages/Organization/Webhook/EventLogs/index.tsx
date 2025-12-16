import { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useSearchParams } from "react-router-dom";
import {
  useGetAllWebhookQuery,
  useGetEventLogsQuery,
} from "@/redux/services/webhook";
import { eventLogColumns } from "@/components/data-table/columns/webhook/event-logs";
import type { WebhookEvent } from "@/types/responses/IEventLog";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import type { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DateFilterDialog } from "@/components/common/DateRangeDialog/DateRangeDialog";
import { toEndOfDayUTC, toStartOfDayUTC } from "@/lib/utils";
import WebhookListDialog from "@/components/common/WebhookListDialog/WebhookListDialog";
import DirectionDialog from "@/components/common/DirectionDialog/DirectionDialog";
import WebhookStatusDialog from "@/components/common/WebhookStatusDialog/WebhookStatusDialog";

export type WebhookColumns = {
  name: string;
  targetUrl: string;
  authType: string;
  events: number;
  status: string;
  lastTriggered: string;
};

export default function EventLogs() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const [value, setValue] = useState<string>("");
  const [direction, setDirection] = useState<"inbound" | "outbound" | "">("");
  const [status, setStatus] = useState<"success" | "failed" | "">("");
  const eventId = searchParams.get("eventId") ?? "";
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { data, meta } = useGetEventLogsQuery(
    {
      page,
      perPage,
      q: eventId,
      startDate: dateRange?.from ? toStartOfDayUTC(dateRange.from) : undefined,
      endDate: dateRange?.to ? toEndOfDayUTC(dateRange.to) : undefined,
      webhook: value,
      direction: direction,
      webhookStatus: status,
    },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const { data: webhookData } = useGetAllWebhookQuery(
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

  const columns = useMemo(() => eventLogColumns(), []);

  const filterFields: DataTableFilterField<WebhookEvent>[] = [
    {
      label: "Name",
      value: "eventId",
      placeholder: "Search By Transmission ID",
    },
  ];

  const { table } = useDataTable({
    data: data || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });
  return (
    <div className="p-2.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
      <div>
        <div className="flex gap-2 items-center">
          <DataTableToolbar
            table={table}
            filterFields={filterFields}
            className="mb-2"
          />
          <WebhookStatusDialog
            value={status}
            setValue={setStatus}
            placeholder="Webhook Status"
          />
          <Button
            onClick={() => setOpenDatePicker(true)}
            className="w-[150px] h-[45px] rounded-[6px] border mb-2 border-card-border cursor-pointer p-[15px] text-black bg-white hover:bg-white flex items-center justify-between"
          >
            <span>All Dates</span>
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <WebhookListDialog
            value={value}
            setValue={setValue}
            data={webhookData}
            placeholder="All Webhooks"
          />
          <DirectionDialog
            value={direction}
            setValue={setDirection}
            placeholder="Directions"
          />
        </div>
        <DataTable table={table} headerClass={false} />
        <DataTablePagination table={table} />
      </div>

      {openDatePicker && (
        <DateFilterDialog
          open={openDatePicker}
          onOpenChange={setOpenDatePicker}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      )}
    </div>
  );
}
