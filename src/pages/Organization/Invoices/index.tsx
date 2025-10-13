// import { DataTable } from "@/components/data-table/data-table";
// import { DataTablePagination } from "@/components/data-table/data-table-pagination";
// import { organizationInvoicesColumns } from "@/components/data-table/columns/org-invoices";
// import { useGetOrganizationInvoicesQuery } from "@/redux/services/stripe";

// import { useDataTable } from "@/hooks/use-data-table";
// import { useMemo } from "react";
// import { useSearchParams } from "react-router-dom";

// export default function Invoices() {
//   const [searchParams] = useSearchParams();
//   const page = parseInt(searchParams.get("page") ?? "1", 10);
//   const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);

//   const { data: invoicesData, meta } = useGetOrganizationInvoicesQuery(
//     { page, perPage, q: "" },
//     {
//       selectFromResult: ({ data, isLoading, isError }) => ({
//         data: data?.data,
//         meta: data?.meta,
//         isLoading: isLoading,
//         isError: isError,
//       }),
//     }
//   );

//   const columns = useMemo(() => organizationInvoicesColumns(), []);
//   const { table } = useDataTable({
//     data: invoicesData || [],
//     columns,
//     pageCount: meta?.pageCount ?? -1,
//   });
//   return (
//     <div className="p-5">
//       <div className="flex justify-between items-center w-full">
//         <div>
//           <h6 className="text-2xl font-semibold">Invoices</h6>
//           <p className="text-sm font-normal text-[#3E4D61]">
//             View all transactions history
//           </p>
//         </div>
//       </div>

//       <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px] rounded-2xl">
//         <DataTable table={table} />
//         <div className="">
//           <DataTablePagination table={table} />
//         </div>
//       </div>
//     </div>
//   );
// }

////////////////// v1 code above //////////////

/////////////// v2 code start ///////////////
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
// import { dummyOrgInvoices } from "@/constants";
import { useDataTable } from "@/hooks/use-data-table";
import { useMemo, useState } from "react";
import { orgInvoiceMainColumns } from "@/components/data-table/columns/org-invoices-main";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { DateFilterDialog } from "@/components/common/DateRangeDialog/DateRangeDialog";
import { useGetInvoicesQuery } from "@/redux/services/invoice";
import { useSearchParams } from "react-router-dom";

export default function Invoices() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const invoiceId = searchParams.get("invoiceId") ?? "";

  const { data: invoiceData, meta } = useGetInvoicesQuery(
    { page, perPage, q: invoiceId },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const columns = useMemo(() => orgInvoiceMainColumns(), []);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { table } = useDataTable({
    data: invoiceData || [],
    columns,
    pageCount: meta?.pageCount ?? -1,
  });
  return (
    <div className="p-5">
      <div className="flex justify-between items-center w-full">
        <div>
          <h6 className="text-2xl font-semibold">Invoices</h6>
          <p className="text-sm font-normal text-[#3E4D61]">
            Track and manage invoices across all pharmacies
          </p>
        </div>
        <div>
          <div className="flex gap-3 items-center">
            <Button
              onClick={() => setOpenDatePicker(true)}
              className="w-[113px] h-[44px] rounded-[6px] border border-card-border cursor-pointer p-[15px] text-black bg-white hover:bg-white flex items-center justify-between"
            >
              <span>All Dates</span>
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px] rounded-2xl">
        <DataTable table={table} />
        <div className="">
          <DataTablePagination table={table} />
        </div>
      </div>
      {openDatePicker && (
        <DateFilterDialog
          open={openDatePicker}
          onOpenChange={setOpenDatePicker}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      )}
    </div>
  );
}
