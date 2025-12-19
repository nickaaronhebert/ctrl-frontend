import UpdateEncounterDialog from "@/components/common/UpdateEncounterDialog/UpdateEncounterDialog";
import type { ColumnDef } from "@tanstack/react-table";
import { SquarePen } from "lucide-react";
import { useState } from "react";
// import { SquarePen } from "lucide-react";
// import { useState } from "react";

export interface EncounterProduct {
  id: string;
  name: string;
  description: string;
  output: "ctrl_order_approval" | "pdf_document";
  isActive: boolean;
  telegraProductVariant: string[];
  createdAt: string;
  updatedAt: string;
}

export function encounterProductColumns(): ColumnDef<EncounterProduct>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const { name } = row.original;
        return (
          <div>
            <p className="text-sm font-medium">{name}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <p className="text-sm">{row.original.description}</p>,
    },
    {
      accessorKey: "output",
      header: "Output",
      cell: ({ row }) => <p className="text-sm">{row.original.output}</p>,
    },
    {
      accessorKey: "isActive",
      header: "Active",
      cell: ({ row }) => (
        <p className="text-sm">{row.original.isActive ? "Yes" : "No"}</p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.original.createdAt
        ).toLocaleDateString("en-US");
        return <p className="text-sm">{formattedDate}</p>;
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        const [selectedProduct, setSelectedProduct] =
          useState<EncounterProduct | null>(null);
        const [open, setOpen] = useState<boolean>(false);

        const handleClick = () => {
          setSelectedProduct(row.original);
          setOpen(true);
        };

        return (
          <>
            <SquarePen
              color="#5354ac"
              onClick={handleClick}
              className="h-4 w-4 cursor-pointer hover:text-blue-500 transition-colors duration-200"
            />

            {open && (
              <UpdateEncounterDialog
                open={open}
                onOpenChange={setOpen}
                selectedProduct={selectedProduct!}
              />
            )}
          </>
        );
      },
    },
  ];
}
