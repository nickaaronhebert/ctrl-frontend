import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useMemo, useState } from "react";
import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { trackedTransmissions } from "@/constants";
import { trackedTransmissionColumns } from "@/components/data-table/columns/tracked-transmission";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import type { TrackedTransmission } from "@/components/data-table/columns/tracking";
import OrganizationDialog from "@/components/common/organizationDialog/OrganizationDialog";
import { useSearchParams } from "react-router-dom";
import { useGetPharmaciesByOrgQuery } from "@/redux/services/invoice";

export default function TrackedTransmissions() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  //   const name = searchParams.get("organization") ?? "";
  const [value, setValue] = useState<string>("");

  const columns = useMemo(() => trackedTransmissionColumns(), []);
  const filterFields: DataTableFilterField<TrackedTransmission>[] = [
    {
      label: "Search by transmission ID",
      value: "transmissionId",
      placeholder: "Search by transmission ID",
    },
  ];

  const { data: pharmacyData } = useGetPharmaciesByOrgQuery(
    { page, perPage },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const { table } = useDataTable({
    data: trackedTransmissions || [],
    columns,
    pageCount: -1,
  });

  return (
    <div>
      <div className="flex justify-between items-center ">
        <p className="font-semibold text-[18px] leading-[30px] text-[#000000]">
          Recent Activity
        </p>
        <div className="flex items-center gap-1">
          <DataTableToolbar table={table} filterFields={filterFields} />
          <OrganizationDialog
            value={value}
            setValue={setValue}
            data={pharmacyData}
            placeholder="All Pharmacies"
            triggerClassName="min-h-12"
          />
        </div>
      </div>
      <DataTable table={table} scrollClass={true} />
      <DataTablePagination table={table} />
    </div>
  );
}
