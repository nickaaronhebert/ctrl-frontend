// import CreateShippingDialog from "@/components/common/CreateShippingDialog/CreateShippingDialog";
import { Button } from "@/components/ui/button";
import type { Shipping } from "@/types/responses/IShippingResponse";
import type { ColumnDef } from "@tanstack/react-table";
// import { useState } from "react";

interface ShippingColumnProps {
  onEdit: (profileId: string) => void;
}

export function shippingColumn({
  onEdit,
}: ShippingColumnProps): ColumnDef<Shipping>[] {
  return [
    {
      accessorKey: "name",
      header: "Service Name",
      cell: ({ row }) => {
        console.log("row original", row.original);
        const value = row.getValue<string>("name");

        return (
          <div className="flex gap-2 items-center">
            <p className="text-[14px] font-medium ">
              {value ? value.charAt(0).toUpperCase() + value.slice(1) : "-"}
            </p>
            {row.original.isDefault && (
              <span className="px-[6px] py-[4px] bg-[#E6FAF5] rounded-[3px] text-[#1AA061] font-semibold leading-[12px]">
                DEFAULT
              </span>
            )}
          </div>
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
      cell: ({ row }) => {
        const id = row.getValue<string>("id");
        return (
          <>
            <Button
              onClick={() => onEdit(id)}
              className="flex justify-center items-center py-1 bg-transparent hover:bg-transparent cursor-pointer px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground"
            >
              Modify
            </Button>
          </>
        );
      },
    },
  ];
}
