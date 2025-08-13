import { type ColumnDef } from "@tanstack/react-table";

type VariantData = {
  strength: string;
  containerQuantity: string;
  quantityType: string;
};

export function variantColumns(): ColumnDef<VariantData>[] {
  return [
    {
      accessorKey: "variant",
      header: "Variants",
      cell: ({ row }) => {
        const value = row.original.strength;
        console.log("valueeeeeeee", value);
        return <span className="font-medium">{value}</span>;
      },
    },
    {
      accessorKey: "containerQty",
      header: "Container Qty",
      cell: ({ row }) => {
        const value = row.original.containerQuantity;
        return <span>{value}</span>;
      },
    },
    {
      accessorKey: "containerQtyType",
      header: "Container Qty Type",
      cell: ({ row }) => {
        const value = row.original.quantityType;
        return <span>{value}</span>;
      },
    },
  ];
}
