import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export interface Medication {
  id: string;
  drugName: string;
  variants: string[];
  category: string;
  availablePharmacies: number;
}

export function medicationLibraryColumns(): ColumnDef<Medication>[] {
  return [
    {
      accessorKey: "drugName",
      header: "Medication",
      cell: ({ row }) => (
        <p className="text-sm font-medium">{row.getValue("drugName")}</p>
      ),
    },
    {
      accessorKey: "variants",
      header: "Variants",
      cell: ({ row }) => {
        const variants: string[] = row.getValue("variants");
        return (
          <div className="flex flex-wrap gap-2">
            {variants.map((v, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs border rounded-md bg-gray-50"
              >
                {v}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        const categoryColor =
          category === "Type 2 Diabetes"
            ? "bg-blue-100 text-blue-700"
            : "bg-pink-100 text-pink-700";
        return (
          <span
            className={`px-2 py-1 text-xs rounded-md font-medium ${categoryColor}`}
          >
            {category}
          </span>
        );
      },
    },
    {
      accessorKey: "availablePharmacies",
      header: "Available Pharmacies",
      cell: ({ row }) => (
        <p className="text-sm">
          {row.getValue("availablePharmacies")} Pharmacies
        </p>
      ),
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => (
        <Link
          to={`/medications/${row.getValue("id")}`}
          className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground"
        >
          View
        </Link>
      ),
    },
  ];
}
