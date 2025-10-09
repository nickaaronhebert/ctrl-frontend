import type {
  MedicationCatalogue,
  Patient,
  ProductVariant,
} from "@/types/global/commonTypes";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

type MedicationCatalogueDetails = Pick<
  MedicationCatalogue,
  "drugName" | "dosageForm"
>;
type ProductVariantDetails = Omit<ProductVariant, "medicationCatalogue"> & {
  medicationCatalogue: MedicationCatalogueDetails;
};

type PatientDetails = Pick<Patient, "firstName" | "lastName" | "phoneNumber">;
export type PharmacyInvoiceDetails = {
  id: string;
  productVariants: ProductVariantDetails[];
  amount: number;
  createdAt: string;
  patient: PatientDetails;
};

export function pharmacyInvoiceColumns(): ColumnDef<PharmacyInvoiceDetails>[] {
  return [
    {
      accessorKey: "id",
      header: "Invoice ID",

      cell: ({ row }) => {
        return (
          <p className="text-xs font-medium uppercase">{row.getValue("id")}</p>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "productVariants",
      header: "Medication",
      cell: ({ row }) => {
        const medication: ProductVariantDetails[] =
          row.getValue("productVariants");

        const displayedMedications = medication.slice(0, 1);
        const remainingCount = medication.length - 1;

        const getTypeColor = (type: "oral" | "Injectable") => {
          return type === "oral" ? "text-green-600" : "text-pink-600";
        };

        return (
          <div className=" max-w-sm ">
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
      accessorKey: "patient",
      header: "Patient",

      cell: ({ row }) => {
        const patient: Patient = row.getValue("patient");
        return (
          <>
            <p className="text-xs font-medium">{`${patient.firstName} ${patient.lastName}`}</p>
            <p className="text-[10px] font-medium">{patient.phoneNumber}</p>
          </>
        );
      },
    },

    // {
    //   accessorKey: "providers",
    //   header: "Provider",
    //   cell: ({ row }) => {
    //     const providers: Provider[] = row.getValue("providers");

    //     const displayedProviders = providers.slice(0, 2);
    //     const remainingCount = providers.length - 2;

    //     return (
    //       <div className=" max-w-sm ">
    //         {displayedProviders.map((provider) => (
    //           <div key={provider.id} className="mb-3 last:mb-0">
    //             <div className="font-medium text-gray-900 text-sm mb-1">
    //               {`${provider.firstName} ${provider.lastName}`}
    //             </div>
    //             <div className="flex items-center text-xs text-gray-600 mb-1">
    //               <span>{provider.phoneNumber}</span>
    //             </div>
    //           </div>
    //         ))}

    //         {remainingCount > 0 && (
    //           <div className="mt-3  ">
    //             <div className="text-blue-600 text-sm font-medium underline underline-offset-2">
    //               +{remainingCount} Provider{remainingCount > 1 ? "s" : ""}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     );
    //   },
    // },

    {
      accessorKey: "amount",
      header: "Amount",

      cell: ({ row }) => {
        const amount = Number(row.getValue("amount")) || 0;
        return <p className="text-xs font-medium">${amount.toFixed(2)}</p>;
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
    //         ) : orderStatus === "pending" ? (
    //           <PendingBadge />
    //         ) : orderStatus === "failed" ? (
    //           <FailedBadge />
    //         ) : null}
    //       </>
    //     );
    //   },
    // },
    {
      accessorKey: "createdAt",
      header: "Created On",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.getValue("createdAt")
        ).toLocaleDateString("en-US");
        return (
          <>
            <p className="text-xs font-medium">{formattedDate}</p>
          </>
        );
      },
    },

    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <Link
            to={`/org/order/${row.getValue("id")}`}
            className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
          >
            View
          </Link>
        );
      },
    },
  ];
}
