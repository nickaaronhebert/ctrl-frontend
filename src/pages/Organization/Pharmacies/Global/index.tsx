import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { useMemo } from "react";

import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";

import { useSearchParams } from "react-router-dom";
import type { TransmissionsStats } from "@/types/responses/IViewOrgPharmaciesTranmissions";

import { useViewOrgPharmaciesTransmissionsV2Query } from "@/redux/services/transmission";
import { globalPharmaciesTransmissionColumns } from "@/components/data-table/columns/global-pharmacies";

export default function GlobalOrgPharmacies() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const name = searchParams.get("name") ?? "";
  const { data, meta } = useViewOrgPharmaciesTransmissionsV2Query(
    {
      page,
      perPage,
      q: name,
      isConnected: false,
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

  const columns = useMemo(() => globalPharmaciesTransmissionColumns(), []);
  const filterFields: DataTableFilterField<TransmissionsStats>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Search By Pharmacy Name",
    },
  ];
  const { table } = useDataTable({
    data: data || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });

  return (
    <>
      <div className="pt-3 px-3.5 flex justify-between items-center">
        <p className="font-medium text-sm ">
          Manage pharmacy connections and monitor performance
        </p>

        <DataTableToolbar
          table={table}
          filterFields={filterFields}
          className="mb-2"
        />
      </div>
      <DataTable table={table} scrollClass={true} />
      <DataTablePagination table={table} />
    </>
  );
}
