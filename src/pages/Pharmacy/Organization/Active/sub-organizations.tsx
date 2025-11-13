import { pharmacysubOrganizationColumns } from "@/components/data-table/columns/pharmacy-sub-organizations";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useDataTable } from "@/hooks/use-data-table";
import { useViewAllSubOrganizationQuery } from "@/redux/services/admin";

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface OrgProps {
  organization: string;
}

export default function ViewPharmacySubOrganization({
  organization,
}: OrgProps) {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "100", 10);
  const { data: subOrgData, meta } = useViewAllSubOrganizationQuery(
    { page, perPage, q: "", parentOrganization: organization },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const columns = useMemo(() => pharmacysubOrganizationColumns(), []);

  const { table } = useDataTable({
    data: subOrgData || [],
    columns,
    pageCount: meta?.pageCount ?? -1,
  });
  return (
    <div className="p-5">
      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] pb-[12px]">
        <DataTable table={table} />
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
