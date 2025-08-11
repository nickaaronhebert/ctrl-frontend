// import { DataTable } from "@/components/data-table/data-table";

import { organizationProviderColumns } from "@/components/data-table/columns/affiliated-providers";
import { DataTable } from "@/components/data-table/data-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { useViewAffiliateProvidersQuery } from "@/redux/services/provider";

// export const provider: Provider[] = [
//   {
//     name: "john doe",
//     email: "john_smith@yopmail.com",
//     npi: "1234567890",
//     status: PROVIDER_STATUS.INVITED,
//   },

//   {
//     name: "jamie johnson",
//     email: "jamie@yopmail.com",
//     npi: "0987654321",
//     status: PROVIDER_STATUS.INVITATION_ACCEPTED,
//   },

//   {
//     name: "david johnson",
//     email: "david@yopmail.com",
//     npi: "0987000021",
//     status: PROVIDER_STATUS.INVITATION_ACCEPTED,
//   },

//   {
//     name: "mitchell johnson",
//     email: "mitchell@yopmail.com",
//     npi: "098765432134",
//     status: PROVIDER_STATUS.MED_SUBMITTED,
//   },
// ];

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
