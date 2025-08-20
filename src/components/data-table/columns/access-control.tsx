export interface MedicationAssignment {
  id: string;
  variant: string;
  assignedStates: string;
  status: "Not Assigned" | "Partial" | "Assigned";
}

import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export function medicationAssignmentColumns(): ColumnDef<MedicationAssignment>[] {
  return [
    {
      accessorKey: "variant",
      header: "Variants",
      cell: ({ row }) => (
        <p className="font-medium text-[13px] leading-[18px] text-black">
          {row.getValue("variant")}
        </p>
      ),
    },
    {
      accessorKey: "assignedStates",
      header: "Assigned States",
      cell: ({ row }) => (
        <span className="text-[12px] font-semibold">
          {row.getValue("assignedStates")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        const statusClasses =
          status === "Assigned"
            ? "border border-progress bg-white p-[6px] rounded-[5px] text-progress"
            : status === "Partial"
            ? "border border-pending bg-white text-pending p-[6px] rounded-[5px]"
            : "border border-slate bg-light-background p-[6px] rounded-[5px]";

        return <span className={`${statusClasses}`}>{status}</span>;
      },
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.status;
        const buttonLabel = status === "Assigned" ? "Continue" : "Configure";

        return (
          <Button
            variant="outline"
            className="rounded-full h-[30px] text-[12px] px-4"
          >
            {buttonLabel}
          </Button>
        );
      },
    },
  ];
}
