import { ctrlPharmacyColumns } from "@/components/data-table/columns/pharmacy";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { useViewAllPharmaciesQuery } from "@/redux/services/admin";
import type { CtrlPharmacy } from "@/types/responses/IViewAllPharmacies";

import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function PharmacyList() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const name = searchParams.get("name") ?? "";
  const { data: pharmacyData, meta } = useViewAllPharmaciesQuery(
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

  const columns = useMemo(() => ctrlPharmacyColumns(), []);
  const filterFields: DataTableFilterField<CtrlPharmacy>[] = [
    {
      label: "Name",
      value: "name",
      placeholder: "Search By Pharmacy Name",
    },
  ];
  const { table } = useDataTable({
    data: pharmacyData || [],
    columns,
    filterFields,
    pageCount: meta?.pageCount ?? -1,
  });
  return (
    <div className="p-5">
      <div className="flex justify-between items-center w-full">
        <div>
          <h6 className="text-2xl font-semibold">Pharmacies</h6>
          {/* <p className="text-sm font-normal text-[#3E4D61]">
            Manage patient information, orders, medical history, and
            prescriptions
          </p> */}
        </div>

        <div className="flex gap-3.5 items-center">
          <DataTableToolbar
            table={table}
            filterFields={filterFields}
            className="mb-2"
          />

          <Link
            to={"/admin/create-pharmacy"}
            className="flex items-center rounded-[50px] px-[20px] py-[5px] min-h-[40px]  text-white  font-semibold text-[12px] bg-primary  "
            // onClick={() => navigate("/org/create-order")}
          >
            Create Pharmacy
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
