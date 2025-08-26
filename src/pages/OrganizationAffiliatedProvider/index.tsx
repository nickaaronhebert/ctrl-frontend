import { organizationProviderColumns } from "@/components/data-table/columns/affiliated-providers";
import { DataTable } from "@/components/data-table/data-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { useViewAffiliateProvidersQuery } from "@/redux/services/provider";

export default function OrganizationAffiliatedProvider() {
  const { data, isLoading, isError } = useViewAffiliateProvidersQuery({});
  console.log("data", data);
  const columns = useMemo(() => organizationProviderColumns(), []);
  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className=" lg:p-3.5">
        <h1 className="text-2xl font-bold">Affiliated Providers</h1>
        <h6 className="font-normal text-sm text text-slate">
          Manage affiliated healthcare providers and their credentials
        </h6>
      </div>

      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014] p-4">
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

        {!isLoading && !isError && <DataTable table={table} />}
      </div>
    </>
  );
}
