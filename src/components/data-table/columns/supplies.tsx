import AddSupply from "@/components/common/AddSupply/AddSupply";
import { Button } from "@/components/ui/button";
import { toSupplyFormValues } from "@/lib/utils";
import type { Supply } from "@/types/responses/supplies";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export function suppliesColumns(): ColumnDef<Supply>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const { name } = row.original;
        return <p className="text-sm font-medium">{name}</p>;
      },
    },

    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => {
        const { sku } = row.original;
        return <p className="text-sm font-medium">{sku}</p>;
      },
    },

    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const { price } = row.original;
        return <p className="text-sm font-medium">${price}</p>;
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        const [openShippingModal, setOpenShippingModal] =
          useState<boolean>(false);

        return (
          <>
            <Button
              onClick={() => setOpenShippingModal(true)}
              className="flex justify-center items-center py-1 bg-transparent hover:bg-transparent cursor-pointer px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
            >
              Modify
            </Button>
            <AddSupply
              open={openShippingModal}
              onOpenChange={setOpenShippingModal}
              supplyItemToEdit={toSupplyFormValues(row.original)}
              isEditing={true}
            />
          </>
        );
      },
    },
  ];
}
