import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { useMemo } from "react";
import { medicationAssignmentColumns } from "@/components/data-table/columns/access-control";
import { useGetAccessControlQuery } from "@/redux/services/access-control";
import type { DataItem } from "@/types/responses/access-control";

const AccessControl = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const drugName = searchParams.get("drugName") ?? "";
  const navigate = useNavigate();

  const { data: accessControlData, meta } = useGetAccessControlQuery(
    { page, perPage, q: drugName },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const columns = useMemo(() => medicationAssignmentColumns(), []);

  const filterFields: DataTableFilterField<DataItem>[] = [
    {
      label: "Drug Name",
      value: "drugName" as keyof DataItem,
      placeholder: "Search By Drug Name",
    },
  ];

  const { table } = useDataTable({
    data: accessControlData || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });

  return (
    <>
      <div className="lg:p-3.5">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-bold">Pharmacy Assigment</h1>
            <h6 className="font-normal text-sm text text-slate">
              Manage pharmacy assignments across all 50 US states
            </h6>
          </div>

          <div className="flex gap-5 items-center">
            <DataTableToolbar
              table={table}
              filterFields={filterFields}
              className="mb-2"
            />
            <Button
              className="px-[20px] py-[5px] min-h-[40px] hover:bg-primary-foreground cursor-pointer rounded-[50px] bg-primary-foreground text-white font-semibold text-[12px] leading-[16px] "
              onClick={() => navigate("/org/access-control/medication")}
            >
              Configure
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
        <DataTable table={table} />
        <DataTablePagination table={table} />
      </div>
    </>
  );
};

export default AccessControl;
