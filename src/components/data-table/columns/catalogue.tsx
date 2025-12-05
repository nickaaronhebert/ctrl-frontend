import type { PharmacyCatalogue } from "@/types/responses/IPharmacyCatalogueResponse";

import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function pharmacyCatalogueColumns(): ColumnDef<PharmacyCatalogue>[] {
  return [
    {
      accessorKey: "name",
      header: "Catalogue Name",
      cell: ({ row }) => {
        const name = row.getValue("name") as string | null;
        const description = row.original?.description as string | null;

        const nameText = name && name.trim() ? name : "Not provided";
        const descriptionText =
          description && description.trim() ? description : "No description";

        return (
          <div className="flex flex-col">
            <p className="text-sm capitalize font-medium">
              {nameText}
              {row?.original?.name === "Standard Catalogue" && (
                <span className="bg-[#E6FAF5] py-[4px] w-[42px] ml-2 h-[16px] px-[6px] gap-[4px] rounded-[3px] text-[#1AA061] leading-[12px] font-semibold">
                  DEFAULT
                </span>
              )}
            </p>
            <p className="text-sm text-muted-foreground">{descriptionText}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "medications",
      header: "Medications",

      cell: ({ row }) => {
        return (
          <p className="text-sm font-medium">{row.getValue("medications")}</p>
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({ row }) => {
        const dateString = row.getValue("createdAt") as string;
        const formatted = new Date(dateString).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
        return <p className="text-sm font-medium">{formatted}</p>;
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            // to={`/pharmacy/medications/view-catalogue/${row.getValue("id")}`}
            to={`${
              row.original.name === "Standard Catalogue"
                ? "/pharmacy/medications/view-catalogue"
                : "/pharmacy/medications/plan-catalogues"
            }/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
