import FailedBadge from "@/components/TransmissionBadge/failed";
import PendingBadge from "@/components/TransmissionBadge/pending";
import QueuedBadge from "@/components/TransmissionBadge/queued";
import SuccessBadge from "@/components/TransmissionBadge/success";
import type { ProductVariantDetails } from "@/types/responses/transmission";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export type Medication = {
  name: string;
  quantity: string;
  quantityType: string;
  injectible: "oral" | "injectable";
} & {
  productVariant: ProductVariantDetails;
};

export type Pharmacy = {
  name: string;
  id: string;
  phoneNumber?: string;
};
export type Transmission = {
  transmissionId: string;
  pharmacy: Pharmacy;
  status: "Created" | "Queued" | "Transmitted" | "Failed";
  prescriptions: Medication[];
};

export function recentTransmissionColumns(): ColumnDef<Transmission>[] {
  return [
    {
      accessorKey: "id",
      header: "Transmission ID",
      cell: ({ row }) => {
        return (
          <p className="text-xs font-medium">{row.original.transmissionId}</p>
        );
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
            {orderStatus === "Queued" ? (
              <QueuedBadge />
            ) : orderStatus === "Transmitted" ? (
              <SuccessBadge />
            ) : orderStatus === "Created" ? (
              <PendingBadge />
            ) : orderStatus === "Failed" ? (
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
          <div className="max-w-[100px]">
            <p className="text-[11px] font-medium text-wrap  mb-2">
              {pharmacy.name}
            </p>
            <p className="text-[9px] font-medium">{pharmacy.phoneNumber}</p>
          </div>
        );
      },
    },

    {
      accessorKey: "prescriptions",
      header: "Medication",
      cell: ({ row }) => {
        const medication: Medication[] = row.getValue("prescriptions");

        const displayedMedications = medication.slice(0, 2);
        const remainingCount = medication.length - 2;

        const getTypeColor = (type: "oral" | "injectable") => {
          return type === "oral" ? "text-green-600" : "text-pink-600";
        };

        return (
          <div className=" max-w-sm ">
            {displayedMedications.map((medication, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="font-medium text-gray-900 text-xs mb-1">
                  {medication.productVariant?.medicationCatalogue?.drugName}
                </div>
                <div className="flex items-center text-xs text-gray-600 mb-1">
                  <span className="text-xs text-gray-600 mb-1">
                    {medication.productVariant?.containerQuantity}
                    {medication.productVariant?.quantityType}
                  </span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full mx-2 bg-[#63627F] `}
                  ></div>
                  <span
                    className={`capitalize text-xs ${getTypeColor(
                      medication.injectible
                    )}`}
                  >
                    {medication.productVariant?.medicationCatalogue?.dosageForm}
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
      header: "Actions",
      cell: ({ row }) => {
        return (
          <Link
            to={`/org/transmissions/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
