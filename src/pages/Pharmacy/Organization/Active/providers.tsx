import { DataTable } from "@/components/data-table/data-table";
import { useMemo } from "react";
import { useViewAffiliateProvidersQuery } from "@/redux/services/provider";
import { useSearchParams } from "react-router-dom";
import { useDataTable } from "@/hooks/use-data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { pharmacyProviderColumns } from "@/components/data-table/columns/pharmacy-affiliate-providers";

interface OrgProps {
  organization: string;
}

export default function PharmacyOrgAffiliateProviders({
  organization,
}: OrgProps) {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const { data, isLoading, isError } = useViewAffiliateProvidersQuery({
    page,
    perPage,
    q: "",
    organization: organization,
  });
  const columns = useMemo(() => pharmacyProviderColumns(), []);

  const { table } = useDataTable({
    data: data?.data || [],
    columns,
    pageCount: data?.meta?.pageCount ?? -1,
  });
  return (
    <>
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
}
