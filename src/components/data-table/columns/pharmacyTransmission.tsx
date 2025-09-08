import FailedBadge from "@/components/TransmissionBadge/failed";
import PendingBadge from "@/components/TransmissionBadge/pending";
import QueuedBadge from "@/components/TransmissionBadge/queued";
import SuccessBadge from "@/components/TransmissionBadge/success";
import type {
  Patient,
  PharmacyTransmissionRow,
  Provider,
} from "@/types/global/commonTypes";
import type { ProductVariantDetails } from "@/types/responses/transmission";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

export function pharmacyTransmissionColumns(): ColumnDef<PharmacyTransmissionRow>[] {
  return [
    {
      accessorKey: "transmissionId",
      header: "Transmission ID",
      cell: ({ row }) => {
        console.log("transmissionId", row.getValue("transmissionId"));
        return (
          <p className="text-xs font-medium">
            {row.getValue("transmissionId")}
          </p>
        );
      },
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const orderStatus = row.getValue("status");
        console.log("orderStatus", orderStatus);

        return (
          <>
            {orderStatus === "Queued" ? (
              <QueuedBadge />
            ) : orderStatus === "Transmitted" ? (
              <SuccessBadge title="Transmitted" />
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
      accessorKey: "providers",
      header: "Providers",
      cell: ({ row }) => {
        const providers: Provider[] = row.getValue("providers");

        return (
          <div className="space-y-2">
            {providers.map((provider, index) => (
              <div key={index}>
                <p className="text-sm font-medium">
                  {provider.firstName} {provider.lastName}
                </p>
                <p className="text-[10px] font-medium">{provider.npi}</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "patient",
      header: "Patients",
      cell: ({ row }) => {
        const patient: Patient = row.getValue("patient");
        console.log("patient", patient);

        const defaultAddress = patient.addresses?.find(
          (address) => address.isDefault
        );

        return (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">
              {patient.firstName} {patient.lastName}
            </p>
            <p className="text-[10px] font-medium">{patient.phoneNumber}</p>

            {defaultAddress && (
              <div key={defaultAddress._id}>
                <p className="text-[11px] font-medium">
                  {defaultAddress.address1}
                </p>
                <p className="text-[11px]">{defaultAddress.city}</p>
                <p className="text-[11px]">{defaultAddress.state}</p>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "productVariants",
      header: "Medications",
      cell: ({ row }) => {
        const medication: ProductVariantDetails[] =
          row.getValue("productVariants");
        console.log("medication", medication);
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
      header: "Total Amount",

      cell: ({ row }) => {
        const amount = Number(row.getValue("amount")) || 0;
        console.log("amount", amount);
        return <p className="text-xs font-medium">${amount.toFixed(2)}</p>;
      },
    },

    {
      accessorKey: "id",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            to={`/pharmacy/transmissions/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
