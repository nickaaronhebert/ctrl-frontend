// import { organizationPatientColumns } from "@/components/data-table/columns/patient";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
// import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

import { organizationInvoicesColumns } from "@/components/data-table/columns/org-invoices";
import { useGetOrganizationInvoicesQuery } from "@/redux/services/stripe";

import {
  useDataTable,
  //   type DataTableFilterField,
} from "@/hooks/use-data-table";
// import { useGetPatientDetailsQuery } from "@/redux/services/patientApi";
// import type { PatientDetails } from "@/types/responses/patient";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function Invoices() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);

  const { data: invoicesData, meta } = useGetOrganizationInvoicesQuery(
    { page, perPage, q: "" },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const columns = useMemo(() => organizationInvoicesColumns(), []);
  //   const filterFields: DataTableFilterField<PatientDetails>[] = [
  //     {
  //       label: "Name",
  //       value: "firstName",
  //       placeholder: "Search By Patient Name",
  //     },
  //   ];
  const { table } = useDataTable({
    data: invoicesData || [],
    columns,
    //   filterFields,
    pageCount: meta?.pageCount ?? -1,
  });
  return (
    <div className="p-5">
      <div className="flex justify-between items-center w-full">
        <div>
          <h6 className="text-2xl font-semibold">Invoices</h6>
          <p className="text-sm font-normal text-[#3E4D61]">
            View all transactions history
          </p>
        </div>

        {/* <div className="flex gap-3.5 items-center">
          <DataTableToolbar
            table={table}
            filterFields={filterFields}
            className="mb-2"
          />

          <Link
            to={"/org/create-patient"}
            className="flex items-center rounded-[50px] px-[20px] py-[5px] min-h-[40px]  text-white  font-semibold text-[12px] bg-primary-foreground  "
            // onClick={() => navigate("/org/create-order")}
          >
            Create Patient
          </Link>
        </div> */}
      </div>

      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px] rounded-2xl">
        <DataTable table={table} />
        <div className="">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
