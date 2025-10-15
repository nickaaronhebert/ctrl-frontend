import { ctrlSubOrganizationColumns } from "@/components/data-table/columns/sub-organization";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { useViewAllSubOrganizationQuery } from "@/redux/services/admin";
import type { SubOrganization } from "@/types/responses/IGetAllSuborganization";

import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function ViewSubOrganization() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const name = searchParams.get("name") ?? "";
  const { data: subOrgData, meta } = useViewAllSubOrganizationQuery(
    { page, perPage, q: name },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const columns = useMemo(() => ctrlSubOrganizationColumns(), []);
  const filterFields: DataTableFilterField<SubOrganization>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Search By Sub-Organization Name",
    },
  ];
  const { table } = useDataTable({
    data: subOrgData || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });
  return (
    <div className="p-5">
      <div className="flex justify-between items-center w-full">
        <div>
          <h6 className="text-2xl font-semibold">Sub-organizations</h6>
        </div>

        <div className="flex gap-3.5 items-center">
          <DataTableToolbar
            table={table}
            filterFields={filterFields}
            className="mb-2"
          />

          <Link
            to={"/org/create-suborganization"}
            className="flex items-center rounded-[50px] px-[20px] py-[5px] mb-1 min-h-[40px]  text-white  font-semibold text-[12px] bg-primary-foreground  "
            // onClick={() => navigate("/org/create-suborganization")}
          >
            Create Sub-Org
          </Link>
        </div>
      </div>

      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
        <DataTable table={table} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
