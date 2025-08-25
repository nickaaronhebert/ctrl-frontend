import { type ColumnDef } from "@tanstack/react-table";
import type { DataItem } from "@/types/responses/access-control";
import { Link } from "react-router-dom";

type MedicationCatalogue = {
  drugName: string;
  dosageForm: string;
  id: string;
};

type ProductVariant = {
  containerQuantity: number;
  id: string;
  medicationCatalogue: MedicationCatalogue;
  quantityType: string;
  strength: string;
};

export type DefaultPharmacy = {
  [state: string]: string;
};

type Organization = {
  id: string;
};

export type CreatedData = {
  createdAt: string;
  defaultPharmacy: DefaultPharmacy;
  id: string;
  organization: Organization;
  pharmacySelectionMethod: string;
  productVariant: ProductVariant;
  status: string;
};

export function medicationAssignmentColumns(): ColumnDef<DataItem>[] {
  return [
    {
      id: "drugName",
      header: "Drug Name",
      accessorFn: (row) =>
        row.productVariant?.medicationCatalogue?.drugName ?? "",
      cell: ({ row }) => {
        const pv = row.original.productVariant;
        return (
          <p className="font-medium text-[13px] leading-[18px] text-black">
            {pv?.medicationCatalogue?.drugName} - {pv?.strength}
          </p>
        );
      },
    },
    {
      accessorKey: "defaultPharmacy",
      header: "Assigned States",
      cell: ({ row }) => {
        const assigned = row.original.defaultPharmacy;
        return (
          <span className="text-[12px] font-semibold">
            {Object.keys(assigned).length} / 50
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const statusClasses =
          status === "active"
            ? "border border-progress bg-white p-[6px] rounded-[5px] text-progress"
            : "border border-slate bg-light-background p-[6px] rounded-[5px]";

        return (
          <span className={`${statusClasses}`}>
            {status && status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            to={`/org/access-control/medication/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            Configure
          </Link>
        );
      },
    },
  ];
}
