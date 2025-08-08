// import { DataTable } from "@/components/data-table/data-table";

import {
  organizationProviderColumns,
  type Provider,
} from "@/components/data-table/columns/affiliated-providers";
import { DataTable } from "@/components/data-table/data-table";
import { PROVIDER_STATUS } from "@/types/global/commonTypes";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

export const provider: Provider[] = [
  {
    name: "john doe",
    email: "john_smith@yopmail.com",
    npi: "1234567890",
    status: PROVIDER_STATUS.INVITED,
  },

  {
    name: "jamie johnson",
    email: "jamie@yopmail.com",
    npi: "0987654321",
    status: PROVIDER_STATUS.INVITATION_ACCEPTED,
  },

  {
    name: "david johnson",
    email: "david@yopmail.com",
    npi: "0987000021",
    status: PROVIDER_STATUS.INVITATION_ACCEPTED,
  },

  {
    name: "mitchell johnson",
    email: "mitchell@yopmail.com",
    npi: "098765432134",
    status: PROVIDER_STATUS.MED_SUBMITTED,
  },
];

export default function OrganizationAffiliatedProvider() {
  const data = provider;
  const columns = useMemo(() => organizationProviderColumns(), []);
  const table = useReactTable({
    data,
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

      <div className="mt-3.5 bg-white shadow-[0px_2px_40px_0px_#00000014]">
        <DataTable table={table} />
      </div>
    </>
  );
}
