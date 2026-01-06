import { Button } from "@/components/ui/button";
import type { Shipping } from "@/types/responses/IShippingResponse";
import type { ColumnDef } from "@tanstack/react-table";

export function shippingColumn(): ColumnDef<Shipping>[] {
  return [
    {
      accessorKey: "name",
      header: "Service Name",

      cell: ({ row }) => {
        return (
          <p className="text-[14px] font-medium">
            {row.getValue("name") ?? "-"}
          </p>
        );
      },
    },
    {
      id: "carrier",
      header: "Carrier",
      accessorFn: (row) => row.services?.carrier ?? "-",
      cell: ({ getValue }) => {
        return (
          <p className="text-[14px] font-medium text-primary underline underline-offset-2">
            {getValue<string>()}
          </p>
        );
      },
    },
    {
      accessorKey: "carrierProductCode",
      header: "Carrier Product Code",
      accessorFn: (row) => row.services?.carrierProductCode ?? "-",
      cell: ({ getValue }) => {
        return (
          <p className="text-[14px] font-medium text-primary underline underline-offset-2">
            {getValue<string>()}
          </p>
        );
      },
    },
    {
      accessorKey: "serviceType",
      header: "Service Type",
      accessorFn: (row) => row.services?.serviceType ?? "-",
      cell: ({ getValue }) => {
        return (
          <p className="text-[14px] font-medium text-primary underline underline-offset-2">
            {getValue<string>()}
          </p>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      accessorFn: (row) => row.services?.price ?? "-",
      cell: ({ getValue }) => {
        return (
          <p className="text-[14px] font-medium text-primary underline underline-offset-2">
            {getValue<string>()}
          </p>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: () => {
        return (
          <>
            <Button
              onClick={() => console.log("Clicked")}
              className="flex justify-center items-center py-1 bg-transparent hover:bg-transparent cursor-pointer px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
            >
              Modify
            </Button>
          </>
        );
      },
    },
  ];
}
