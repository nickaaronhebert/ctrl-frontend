import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useDataTable } from "@/hooks/use-data-table";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { dummyInvoices } from "@/constants";
import { invoiceColumns } from "@/components/data-table/columns/invoiceTransactions";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { AffiliateAdminDialog } from "@/components/common/AffiliateAdminDialog/AffiliateAdminDialog";
import type { DateRange } from "react-day-picker";
import { DateFilterDialog } from "@/components/common/DateRangeDialog/DateRangeDialog";
import { useGetPharmacyInvoicesQuery } from "@/redux/services/pharmacy";

export default function PharmacyInvoices() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const columns = useMemo(() => invoiceColumns(), []);
  const [openAffiliateDialog, setOpenAffiliateDialog] =
    useState<boolean>(false);
  const [selectedAffiliates, setSelectedAffiliates] = useState<string[]>([]);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const { data } = useGetPharmacyInvoicesQuery(
    {
      page,
      perPage,
      startDate: dateRange?.from?.toISOString(),
      endDate: dateRange?.to?.toISOString(),
    },
    {
      // Use the selectFromResult method to omit pharmacy and organization fields
      selectFromResult: (result) => ({
        data:
          result?.data?.data?.map((invoice) => {
            const { pharmacy, organization, ...rest } = invoice;
            return rest;
          }) ?? [],
        isLoading: result.isLoading,
        isError: result.isError,
      }),
    }
  );

  const { table } = useDataTable({
    data: data || [],
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
            <div className="flex gap-3 items-center ">
              {/* <Button
                onClick={() => setOpenAffiliateDialog(true)}
                className="w-[132px] h-[44px] rounded-[6px] border border-card-border p-[15px] text-black cursor-pointer bg-white hover:bg-white flex items-center justify-between"
              >
                <span>All Affiliates</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button> */}

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
      {openAffiliateDialog && (
        <AffiliateAdminDialog
          open={openAffiliateDialog}
          onOpenChange={setOpenAffiliateDialog}
          affiliates={dummyInvoices.map((invoice) => invoice.affiliate)}
          selectedAffiliates={selectedAffiliates}
          onSelectedAffiliatesChange={setSelectedAffiliates}
        />
      )}

      {/* Date Filter Dialog */}
      {openDatePicker && (
        <DateFilterDialog
          open={openDatePicker}
          onOpenChange={setOpenDatePicker}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      )}
      {/* <div className="flex justify-between items-center px-4 bg-strength">
        <div>
          <p>Total Amount (All Time)</p>
          <span>$29,354.00</span>
        </div>
        <Button className="bg-black min-w-[110px] min-h-[40px] rounded-[50px] text-white px-[20px] py-[5px] hover:bg-black">
          Get Excel Report
        </Button>
      </div> */}
    </div>
  );
}
