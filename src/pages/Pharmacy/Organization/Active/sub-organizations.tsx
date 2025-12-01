import { pharmacysubOrganizationColumns } from "@/components/data-table/columns/pharmacy-sub-organizations";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useDataTable } from "@/hooks/use-data-table";
import { useGetOrgSubOrganizationsQuery } from "@/redux/services/admin";

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface OrgProps {
  organization: string;
  invitation: string;
  activeStatus?: string;
}

export default function ViewPharmacySubOrganization({
  organization,
  invitation,
  activeStatus,
}: OrgProps) {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const perPage = parseInt(searchParams.get("per_page") ?? "1000", 10);
  const { data: subOrgData, meta } = useGetOrgSubOrganizationsQuery(
    { page, perPage, q: "", organizationId: organization },
    {
      selectFromResult: ({ data, isLoading, isError }) => ({
        data: data?.data,
        meta: data?.meta,
        isLoading: isLoading,
        isError: isError,
      }),
    }
  );

  const filteredData = useMemo(() => {
    if (activeStatus === "sharedSubOrgs") {
      return subOrgData?.filter(
        (org) => !org.invoiceFrequency || org.invoiceFrequency === null
      );
    }
    return (
      subOrgData?.filter(
        (org) =>
          org.invoiceFrequency !== null && org.invoiceFrequency !== undefined
      ) || []
    );
  }, [subOrgData, activeStatus]);

  const columns = useMemo(
    () => pharmacysubOrganizationColumns(organization, invitation),
    [organization]
  );

  const { table } = useDataTable({
    data: filteredData || [],
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
