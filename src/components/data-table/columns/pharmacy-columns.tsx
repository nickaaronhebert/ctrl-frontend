import { type ColumnDef } from "@tanstack/react-table";

type PharmacyVariantRow = {
  productVariant: {
    strength: string;
    quantityType: string;
    containerQuantity: number;
  };
  price: number;
  inStock: boolean;
};

export function pharmacyVariantColumns(): ColumnDef<PharmacyVariantRow>[] {
  return [
    {
      accessorKey: "productVariant.strength",
      header: "Variants",
      cell: ({ row }) => {
        const value = row.original.productVariant?.strength;
        return <span className="font-medium">{value}</span>;
      },
    },
    {
      accessorKey: "price",
      header: "Pricing",
      cell: ({ row }) => {
        const value = row.original.price;
        return <span>${value}</span>;
      },
    },
    {
      accessorKey: "inStock",
      header: "Availability",
      cell: ({ row }) => {
        const inStock = row.original.inStock;
        const label = inStock ? "Stock" : "Out of Stock";
        const colorClass = inStock
          ? "text-green-600 font-medium"
          : "text-red-500 font-medium";

        return <span className={colorClass}>{label}</span>;
      },
    },
  ];
}
