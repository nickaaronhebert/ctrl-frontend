import FailedBadge from "@/components/TransmissionBadge/failed";
import PendingBadge from "@/components/TransmissionBadge/pending";
import QueuedBadge from "@/components/TransmissionBadge/queued";
import SuccessBadge from "@/components/TransmissionBadge/success";
import type {
  Encounter,
  EncounterStatus,
} from "@/types/responses/IGetAllEncounter";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function encounterColumns(): ColumnDef<Encounter>[] {
  return [
    {
      accessorKey: "patient",
      header: "Patient Name",

      cell: ({ row }) => {
        const patient: { id: string; firstName: string; lastName: string } =
          row.getValue("patient");
        return (
          <p className="text-[14px] font-medium">{`${patient?.firstName} ${patient.lastName}`}</p>
        );
      },
    },
    {
      accessorKey: "encounterProduct",
      header: "Service",

      cell: ({ row }) => {
        const encounterProducts: { id: string; name: string }[] =
          row.getValue("encounterProduct");

        return (
          <div>
            {encounterProducts.map((item) => (
              <p className="text-[14px] font-medium" key={item.id}>
                {item.name}
              </p>
            ))}
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const encounterStatus: EncounterStatus = row.getValue("status");

        return (
          <>
            {encounterStatus === "in_review" ? (
              <QueuedBadge title="In Review" />
            ) : encounterStatus === "completed" ? (
              <SuccessBadge title="Completed" />
            ) : encounterStatus === "started" ? (
              <PendingBadge title="Started" />
            ) : encounterStatus === "cancelled" ? (
              <FailedBadge title="Cancelled" />
            ) : null}
          </>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.getValue("createdAt")
        ).toLocaleDateString("en-US");
        return (
          <>
            <p className="text-[14px] font-medium">{formattedDate}</p>
          </>
        );
      },
    },

    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            to={`/org/encounter/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
