// import FailedBadge from "@/components/TransmissionBadge/failed";
// import PendingBadge from "@/components/TransmissionBadge/pending";
// import QueuedBadge from "@/components/TransmissionBadge/queued";
// import SuccessBadge from "@/components/TransmissionBadge/success";

import type { Pharmacy } from "@/types/global/commonTypes";
import type {
  ProductVariantDetails,
  TransmissionDetails,
} from "@/types/responses/transmission";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function organizationTransmissionColumns(): ColumnDef<TransmissionDetails>[] {
  return [
    {
      accessorKey: "transmissionId",
      header: "Transmission ID",
      cell: ({ row }) => {
        return (
          <p className="text-xs font-medium">
            {row.getValue("transmissionId")}
          </p>
        );
      },
    },

    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => {
    //     const orderStatus = row.getValue("status");

    //     return (
    //       <>
    //         {orderStatus === "queued" ? (
    //           <QueuedBadge />
    //         ) : orderStatus === "transmitted" ? (
    //           <SuccessBadge />
    //         ) : orderStatus === "PENDING" ? (
    //           <PendingBadge />
    //         ) : orderStatus === "failed" ? (
    //           <FailedBadge />
    //         ) : null}
    //       </>
    //     );
    //   },
    // },

    // {
    //   accessorKey: "provider",
    //   header: "Provider",
    //   cell: ({ row }) => {
    //     const provider: Provider = row.getValue("provider");
    //     return (
    //       <>
    //         <p className="text-xs font-medium">{provider.name}</p>
    //         <p className="text-[10px] font-medium">{provider.npi}</p>
    //       </>
    //     );
    //   },
    // },

    {
      accessorKey: "pharmacy",
      header: "Pharmacy",
      cell: ({ row }) => {
        const pharmacy: Pharmacy = row.getValue("pharmacy");

        return (
          <>
            <p className="text-xs font-medium">{pharmacy?.name || "-"}</p>
            <p className="text-[10px] font-medium">
              {pharmacy?.address?.address1 || ""}
            </p>
          </>
        );
      },
    },

    {
      accessorKey: "productVariants",
      header: "Medication",
      cell: ({ row }) => {
        const medication: ProductVariantDetails[] =
          row.getValue("productVariants");
        if (!medication || medication.length === 0) {
          return (
            <p className="text-xs font-medium text-gray-500">No medications</p>
          );
        }
        const displayedMedications = medication.slice(0, 2);
        const remainingCount = medication.length - 2;

        const getTypeColor = (type: "oral" | "Injectable") => {
          return type === "oral" ? "text-green-600" : "text-pink-600";
        };

        return (
          <div className=" max-w-md ">
            {displayedMedications.map((medication, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="font-medium text-gray-900 text-sm mb-1">
                  {medication.medicationCatalogue.drugName}
                </div>
                <div className="flex items-center text-xs text-gray-600 mb-1">
                  <span>
                    {medication.containerQuantity} {medication.quantityType}
                  </span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full mx-2 bg-[#63627F] `}
                  ></div>
                  <span
                    className={`capitalize ${getTypeColor(
                      medication.medicationCatalogue.dosageForm as
                        | "oral"
                        | "Injectable"
                    )}`}
                  >
                    {medication.medicationCatalogue.dosageForm}
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
      accessorKey: "amount",
      header: "Amount",

      cell: ({ row }) => {
        const amount = Number(row.getValue("amount")) || 0;
        return <p className="text-xs font-medium">${amount.toFixed(2)}</p>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt")).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        );
        return <p className="text-sm">{date}</p>;
      },
    },

    {
      accessorKey: "id",
      header: "Action",
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
