// import { organizationPatientColumns } from "@/components/data-table/columns/patient";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

// import { useViewOrgPharmaciesTransmissionsQuery } from "@/redux/services/transmission";
import { useMemo } from "react";

import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";

import { useSearchParams } from "react-router-dom";
// import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// import PharmacyConnectDialog from "@/components/dialog/connect";
import { useGetConnectedOrganizationQuery } from "@/redux/services/pharmacy";
import { activeOrganizationColumns } from "@/components/data-table/columns/active-organization";
import type { ConnectedOrganization } from "@/types/responses/IConnectedOrganization";

export default function ConnectedOrganization() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const name = searchParams.get("organization") ?? "";
  const { data, meta } = useGetConnectedOrganizationQuery(
    {
      page,
      perPage,
      q: name,
      status: "accepted",
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

  const columns = useMemo(() => activeOrganizationColumns(), []);
  const filterFields: DataTableFilterField<ConnectedOrganization>[] = [
    {
      label: "Name",
      value: "organization",
      placeholder: "Search By Organization Name",
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
          Organizations with approved partnerships
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
