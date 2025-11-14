import type { Provider } from "@/types/global/commonTypes";

import type { ColumnDef } from "@tanstack/react-table";

type ProviderBasicInfo = Pick<Provider, "firstName" | "lastName" | "npi">;

export function pharmacyProviderColumns(): ColumnDef<ProviderBasicInfo>[] {
  return [
    {
      accessorKey: "firstName",
      header: "Name",
      cell: ({ row }) => {
        const firstName = row.original.firstName || "";
        const lastName = row.original.lastName || "";
        return (
          <p className="text-xs font-medium">
            {`${firstName} ${lastName}`.trim()}
          </p>
        );
      },
    },

    {
      accessorKey: "npi",
      header: "NPI",

      cell: ({ row }) => {
        return <p className="text-xs font-medium">{row.getValue("npi")}</p>;
      },
    },
  ];
}
