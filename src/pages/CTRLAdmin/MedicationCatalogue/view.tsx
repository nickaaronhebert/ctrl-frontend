import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useMemo } from "react";
import { Search } from "lucide-react";
import { useGetMedicationCatalogueQuery } from "@/redux/services/medication";
import { Link, useSearchParams } from "react-router-dom";
import {
  medicationLibraryColumns,
  type Medication,
} from "@/components/data-table/columns/medication-library";
import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";

const ViewMedicationCatalogue = () => {
  const columns = useMemo(
    () => medicationLibraryColumns({ entity: "CtrlAdmin" }),
    []
  );
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const drugName = searchParams.get("drugName") ?? "";

  const { data: medicationData, meta } = useGetMedicationCatalogueQuery(
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

  const filterFields: DataTableFilterField<Medication>[] = [
    {
      label: "Name",
      value: "drugName",
      placeholder: "Search By Medication Name or Category",
    },
  ];

  const { table } = useDataTable({
    data: medicationData || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });

  return (
    <>
      <div className="lg:p-3.5">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-bold">Medication Library</h1>
            <h6 className="font-normal text-sm text text-slate">
              Browse standardized medication definitions
            </h6>
          </div>

          <div className="flex gap-3 items-center">
            <DataTableToolbar
              table={table}
              filterFields={filterFields}
              searchIcon={<Search className="w-5 h-5" />}
              className=" h-full"
            />

            <Link
              to={"/admin/create-medication"}
              className="flex items-center rounded-[50px] px-[20px] py-[5px] min-h-[40px]  text-white  font-semibold text-[12px] bg-primary  "
            >
              Create Medication
            </Link>
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

export default ViewMedicationCatalogue;
