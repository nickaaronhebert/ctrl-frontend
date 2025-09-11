import { organizationProviderColumns } from "@/components/data-table/columns/affiliated-providers";
import { DataTable } from "@/components/data-table/data-table";
import { useMemo } from "react";
import { useViewAffiliateProvidersQuery } from "@/redux/services/provider";
import { useSearchParams } from "react-router-dom";
import {
  useDataTable,
  type DataTableFilterField,
} from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import type { AffiliatedProviders } from "@/types/responses/provider";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";

export default function OrganizationAffiliatedProvider() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "10", 10);
  const providerFirstName = searchParams.get("firstName") ?? "";
  const providerNpiNumber = searchParams.get("npi") ?? "";
  const { data, isLoading, isError } = useViewAffiliateProvidersQuery({
    page,
    perPage,
    q: providerFirstName || providerNpiNumber,
  });
  const columns = useMemo(() => organizationProviderColumns(), []);
  const filterFields: DataTableFilterField<AffiliatedProviders>[] = [
    {
      label: "FirstName",
      value: "firstName",
      placeholder: "Search By Provider Name",
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
      <div className="flex justify-between items-center">
        <div className=" lg:p-3.5">
          <h1 className="text-2xl font-bold">Affiliated Providers</h1>
          <h6 className="font-normal text-sm text text-slate">
            Manage affiliated healthcare providers and their credentials
          </h6>
        </div>
        <DataTableToolbar table={table} filterFields={filterFields} />
      </div>

      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] rounded-2xl ">
        {isLoading && (
          <div className="py-6 text-center text-slate-500">
            Loading providers...
          </div>
        )}

        {/* {isError && (
          <div className="py-6 text-center text-red-500">
            {error?.data?.message ||
              "Failed to load providers. Please try again."}
          </div>
        )} */}

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
}
