import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useDataTable } from "@/hooks/use-data-table";
import { useMemo, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { invoiceColumns } from "@/components/data-table/columns/invoiceTransactions";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { DateFilterDialog } from "@/components/common/DateRangeDialog/DateRangeDialog";
// import { useGetPharmacyInvoicesQuery } from "@/redux/services/pharmacy";
import { invoiceMainColumns } from "@/components/data-table/columns/invoices-main";
import { dummyInvoices } from "@/constants";
import OrganizationDialog from "@/components/common/organizationDialog/OrganizationDialog";

export default function PharmacyInvoices() {
  // const [searchParams] = useSearchParams();
  // const page = parseInt(searchParams.get("page") || "1", 10);
  // const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const columns = useMemo(() => invoiceMainColumns(), []);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [value, setValue] = useState("");

  // const { data } = useGetPharmacyInvoicesQuery(
  //   {
  //     page,
  //     perPage,
  //     startDate: dateRange?.from?.toISOString(),
  //     endDate: dateRange?.to?.toISOString(),
  //   },
  //   {
  //     selectFromResult: (result) => ({
  //       data:
  //         result?.data?.data?.map((invoice) => {
  //           const { pharmacy, organization, ...rest } = invoice;
  //           return rest;
  //         }) ?? [],
  //       isLoading: result.isLoading,
  //       isError: result.isError,
  //     }),
  //   }
  // );

  const { table } = useDataTable({
    data: dummyInvoices || [],
    columns,
    pageCount: -1,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <div className=" lg:p-3.5 flex-grow">
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-2xl font-bold">Invoices</h1>
            <h6 className="font-normal text-sm text text-slate">
              View all transactions history
            </h6>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <OrganizationDialog value={value} setValue={setValue} />
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
        <div className="mt-3.5 ">
          <div className=" bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
            <DataTable table={table} />
            <DataTablePagination table={table} />
          </div>
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
