import { organizationActivityColumns } from "@/components/data-table/columns/activity-logs";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { useViewAllAuditLogsQuery } from "@/redux/services/audit";
import type {
  EntityType,
  IActivityLogData,
} from "@/types/responses/IViewAllActivityLogs";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function ActivityLogs() {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const entityType = searchParams.get("entityType") ?? undefined;
  const { data: activityData, meta } = useViewAllAuditLogsQuery(
    { page, perPage, q: "", type: entityType as EntityType },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const columns = useMemo(() => organizationActivityColumns(), []);
  const filterFields: DataTableFilterField<IActivityLogData>[] = [
    {
      label: "Activity Type",
      value: "entityType",
      options: [
        { label: "Prescription", value: "Prescription" },
        { label: "Order", value: "Order" },
        { label: "Transmission", value: "Transmission" },
        { label: "Access Control", value: "Access Control" },
        {
          label: "Product Variant",
          value: "ProductVariant",
        },
        { label: "Invitation", value: "Invitation" },
        {
          label: "Provider Group Invitation",
          value: "Provider Group Invitation",
        },
        {
          label: "Payment",
          value: "Payment",
        },
      ],
    },
  ];

  const { table } = useDataTable({
    data: activityData || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center w-full">
          <div>
            <h6 className="text-2xl font-semibold">Activity Log</h6>
            <p className="text-sm font-normal text-[#3E4D61]">
              Track retry attempts, errors, and delivery statuses
            </p>
          </div>

          <div className="flex gap-3.5 items-center">
            <p className="text-sm font-medium">Filter by activity type:</p>
            <DataTableToolbar
              table={table}
              filterFields={filterFields}
              className="mb-2"
            />
          </div>
        </div>

        <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
          <DataTable table={table} />
          <DataTablePagination table={table} />
        </div>
      </div>
    </>
  );
}
