import FailedBadge from "@/components/TransmissionBadge/failed";
import PendingBadge from "@/components/TransmissionBadge/pending";
import QueuedBadge from "@/components/TransmissionBadge/queued";
import SuccessBadge from "@/components/TransmissionBadge/success";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export type Medication = {
  name: string;
  quantity: string;
  quantityType: string;
  injectible: "oral" | "injectable";
};
export type Provider = {
  name: string;
  npi: string;
};

export type Pharmacy = {
  name: string;
  id: string;
};
export type Transmission = {
  id: string;
  provider: Provider;
  pharmacy: Pharmacy;
  status: "queued" | "transmitted" | "pending" | "failed";
  medication: Medication[];
  amount: string;
};

export function recentTransmissionColumns(): ColumnDef<Transmission>[] {
  return [
    {
      accessorKey: "id",
      header: "Transmission ID",
      cell: ({ row }) => {
        return <p className="text-xs font-medium">{row.getValue("id")}</p>;
      },
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const orderStatus = row.getValue("status");

        return (
          <>
            {orderStatus === "queued" ? (
              <QueuedBadge />
            ) : orderStatus === "transmitted" ? (
              <SuccessBadge />
            ) : orderStatus === "pending" ? (
              <PendingBadge />
            ) : orderStatus === "failed" ? (
              <FailedBadge />
            ) : null}
          </>
        );
      },
    },
    {
      accessorKey: "pharmacy",
      header: "Pharmacy",
      cell: ({ row }) => {
        const pharmacy: Pharmacy = row.getValue("pharmacy");
        return (
          <>
            <p className="text-xs font-medium">{pharmacy.name}</p>
            <p className="text-[10px] font-medium">{pharmacy.id}</p>
          </>
        );
      },
    },

    {
      accessorKey: "medication",
      header: "Medication",
      cell: ({ row }) => {
        const medication: Medication[] = row.getValue("medication");

        const displayedMedications = medication.slice(0, 2);
        const remainingCount = medication.length - 2;

        const getTypeColor = (type: "oral" | "injectable") => {
          return type === "oral" ? "text-green-600" : "text-pink-600";
        };

        return (
          <div className=" max-w-sm ">
            {displayedMedications.map((medication, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="font-medium text-gray-900 text-sm mb-1">
                  {medication.name}
                </div>
                <div className="flex items-center text-xs text-gray-600 mb-1">
                  <span>
                    {medication.quantity} {medication.quantityType}
                  </span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full mx-2 bg-[#63627F] `}
                  ></div>
                  <span
                    className={`capitalize ${getTypeColor(
                      medication.injectible
                    )}`}
                  >
                    {medication.injectible}
                  </span>
                </div>
              </div>
            ))}

            {remainingCount > 0 && (
              <div className="mt-3  ">
                <div className="text-blue-600 text-sm font-medium underline underline-offset-2">
                  +{remainingCount} medication{remainingCount > 1 ? "s" : ""}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: () => {
        return (
          <Link
            to={"#"}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
