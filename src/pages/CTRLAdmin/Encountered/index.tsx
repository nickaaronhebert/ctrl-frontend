import { Link } from "react-router-dom";
import {
  encounterProductColumns,
  type EncounterProduct,
} from "@/components/data-table/columns/encounter";
import { DataTable } from "@/components/data-table/data-table";
import { useMemo } from "react";
import { useGetEncounteredProductsQuery } from "@/redux/services/encounter";
import { useSearchParams } from "react-router-dom";
import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const Encountered = () => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const name = searchParams.get("name") ?? "";
  const { data, isLoading, isError } = useGetEncounteredProductsQuery({
    page,
    perPage,
    q: name,
  });
  const columns = useMemo(() => encounterProductColumns(), []);
  const filterFields: DataTableFilterField<EncounterProduct>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Search by name",
    },
  ];

  const { table } = useDataTable({
    data: data?.data || [],
    columns,
    filterFields,
    pageCount: data?.meta?.pageCount ?? -1,
  });

  return (
    <>
      <div className=" bg-[#EFE8F5] py-3 px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mt-1">Encountered Products</h1>
        </div>
        <div className="flex gap-3.5 items-center">
          <DataTableToolbar
            table={table}
            filterFields={filterFields}
            className="mb-0"
          />

          <Link
            to={"/admin/add-product"}
            className="flex items-center rounded-[50px] px-[20px] py-[5px] min-h-[40px]  text-white  font-semibold text-[12px] bg-primary "
          >
            Add Product
          </Link>
        </div>
      </div>

      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] rounded-2xl ">
        {isLoading && (
          <div className="flex justify-center items-center h-[30vh]">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && !isError && (
          <div>
            <DataTable table={table} headerClass={true} />
            <div className="py-2 px-3">
              <DataTablePagination table={table} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Encountered;
