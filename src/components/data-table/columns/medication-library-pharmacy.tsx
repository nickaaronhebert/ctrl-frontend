import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { Pharmacy } from "./medication-library";

export function pharmacyColumns(): ColumnDef<Pharmacy>[] {
  return [
    {
      accessorKey: "name",
      header: "Pharmacy Details",
      cell: ({ row }) => {
        const pharmacy = row.original;
        return (
          <div className="flex flex-col">
            <p className="font-medium">{pharmacy.name}</p>
            <p className="text-xs text-muted-foreground">{pharmacy.phone}</p>
            <p className="text-xs text-muted-foreground">
              {`${pharmacy.address}, ${pharmacy.city}, ${pharmacy.state} ${pharmacy.zip}`}
            </p>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "variants",
      header: "Available Variants & Pricing",
      cell: ({ row }) => {
        const variants = row.original.variants;
        return (
          <div className="flex flex-wrap gap-4">
            {variants.map((variant) => (
              <div
                key={variant.strength}
                className="flex items-start gap-10 px-[10px] py-[6px] rounded-[4px] min-w-[100px] bg-queued-secondary"
              >
                <div>
                  <p className="text-sm font-semibold">{variant.strength}</p>
                  <p className="text-xs text-muted-foreground">
                    {variant.container}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    ${variant.price.toFixed(2)}
                  </p>
                  <Badge
                    variant="outline"
                    className={
                      variant.stockStatus === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : variant.stockStatus === "Limited"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {variant.stockStatus}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        );
      },
      enableSorting: false,
    },
  ];
}
