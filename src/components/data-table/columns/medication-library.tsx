import { type ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export interface MedicationVariant {
  variantName: string;
  strength: string;
  containerQty: number;
  containerQtyType: string;
}

export interface Medication {
  id: string;
  drugName: string;
  variants: MedicationVariant[];
  category: string;
  availablePharmacies: number;
  form: string;
  compound: string;
  instructions: string;
  administrationNotes: string;
}

export interface PharmacyVariant {
  strength: string;
  price: number;
  container: string;
  stockStatus: "In Stock" | "Limited" | "Out of Stock";
}

export interface Pharmacy {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  variants: PharmacyVariant[];
}

export function medicationLibraryColumns(): ColumnDef<Medication>[] {
  return [
    {
      accessorKey: "drugName",
      header: "Medication",
      cell: ({ row }) => (
        <p className="font-medium text-[12px] leading-[16px] text-black">
          {row.getValue("drugName")}
        </p>
      ),
    },
    {
      accessorKey: "variants",
      header: "Variants",
      cell: ({ row }) => {
        const variants: MedicationVariant[] = row.getValue("variants");
        return (
          <>
            <div className="flex  flex-wrap gap-2">
              {variants.map((v) => (
                <span
                  key={v.variantName}
                  className="px-[8px] font-semibold text-[12px] leading-[16px] text-black py-[4px] text-xs rounded-[5px] bg-light-background"
                >
                  {v?.strength}
                </span>
              ))}
            </div>
            <span className="font-medium text-[10px] leading-[12px] text-slate">
              {row.original.form}
            </span>
          </>
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
            ? "bg-strength text-queued"
            : "bg-secondary text-category-secondary";
        return (
          <span
            className={`px-[8px] py-[4px] text-[12px] rounded-[5px] font-semibold ${categoryColor}`}
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
        <p className="font-semibold text-[12px] leading-[16px] text-black">
          {row.getValue("availablePharmacies")} Pharmacies
        </p>
      ),
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => (
        <Link
          to={`/org/medications/${row.getValue("id")}`}
          className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground"
        >
          View
        </Link>
      ),
    },
  ];
}
