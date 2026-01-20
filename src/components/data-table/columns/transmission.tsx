import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTransmissionFailedLogQuery } from "@/redux/services/transmission";
import type { ApiError, Pharmacy } from "@/types/global/commonTypes";
import type {
  ProductVariantDetails,
  TransmissionDetails,
} from "@/types/responses/transmission";
import type { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRetryTransmissionMutation } from "@/redux/services/transmission";
import { toast } from "sonner";

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
        const [open, setOpen] = useState<boolean>(false);
        const id = row.getValue("id") as string;
        const status = row.original.status;
        const isFailed = status === "Failed";

        const { data: errorDetails, isLoading } = useTransmissionFailedLogQuery(
          id,
          {
            skip: !open,
          }
        );

        const [retryTransmission, { isLoading: retryLoading }] =
          useRetryTransmissionMutation();

        const parseErrorResponse = () => {
          if (!errorDetails) return null;
          try {
            return JSON.parse(errorDetails.data?.rawResponse || "{}");
          } catch {
            return errorDetails.data?.rawResponse;
          }
        };

        const errorResponse = parseErrorResponse();

        const handleRetry = async () => {
          try {
            await retryTransmission(id).unwrap();
            toast.success("Transmission retry initiated", {
              duration: 1500,
            });
            setOpen(false);
          } catch (error: unknown) {
            console.error("Error", error);
            let message = "An unexpected error occurred";
            if (
              typeof error === "object" &&
              error !== null &&
              "data" in error
            ) {
              const data = (error as ApiError).data;
              if (Array.isArray(data?.message)) {
                message = data.message[0];
              } else if (typeof data?.message === "string") {
                message = data.message;
              }
            }

            toast.error(message, {
              duration: 1500,
            });
          }
        };
        return (
          <div className="flex items-center gap-4 justify-center">
            <Link
              to={`/org/transmissions/${row.getValue("id")}`}
              className="flex justify-center items-center py-1 px-5 w-[85px] h-[36px] rounded-[50px] border border-primary-foreground "
            >
              View
            </Link>
            {isFailed && (
              <>
                <Eye
                  onClick={() => setOpen(true)}
                  className="w-5 h-5 text-primary cursor-pointer"
                />
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="min-w-4xl max-h-[80vh] overflow-y-auto p-4">
                    <DialogHeader>
                      <DialogTitle className="text-red-600">
                        Transmission Error Details
                      </DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      {isLoading ? (
                        <p className="text-sm text-gray-600">Loading...</p>
                      ) : errorDetails ? (
                        <>
                          {/* Error Type & Reason */}
                          <div className="border rounded-lg p-3 bg-red-50">
                            <p className="text-xs font-semibold text-gray-600 mb-2">
                              ERROR REASON
                            </p>
                            <p className="text-sm text-red-700 font-medium">
                              {errorDetails?.data?.reason}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="border rounded-lg p-3">
                              <p className="text-xs font-semibold text-gray-600 mb-1">
                                ERROR TYPE
                              </p>
                              <p className="text-sm font-medium text-gray-800">
                                {errorDetails.data?.type}
                              </p>
                            </div>
                            <div className="border rounded-lg p-3">
                              <p className="text-xs font-semibold text-gray-600 mb-1">
                                LOG TYPE
                              </p>
                              <p className="text-sm font-medium text-gray-800">
                                {errorDetails.data?.logType}
                              </p>
                            </div>
                          </div>
                          {errorResponse && (
                            <div className="border rounded-lg p-3 bg-gray-50">
                              <p className="text-xs font-semibold text-gray-600 mb-2">
                                API RESPONSE
                              </p>
                              <div className="space-y-2 text-sm">
                                {errorResponse.message && (
                                  <p>
                                    <span className="font-semibold text-gray-700">
                                      Message:
                                    </span>{" "}
                                    <span className="text-gray-600">
                                      {errorResponse.message}
                                    </span>
                                  </p>
                                )}
                                {errorResponse.status && (
                                  <p>
                                    <span className="font-semibold text-gray-700">
                                      Status Code:
                                    </span>{" "}
                                    <span className="text-red-600 font-bold">
                                      {errorResponse.status}
                                    </span>
                                  </p>
                                )}
                                {errorResponse.response?.data?.errors && (
                                  <div>
                                    <p className="font-semibold text-gray-700 mb-1">
                                      Validation Errors:
                                    </p>
                                    <ul className="list-disc list-inside ml-2 space-y-1">
                                      {errorResponse.response.data.errors.map(
                                        (error: string, idx: number) => (
                                          <li
                                            key={idx}
                                            className="text-red-600 text-xs"
                                          >
                                            {error}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Request Details */}
                          {errorResponse?.request && (
                            <div className="border rounded-lg p-3 bg-blue-50">
                              <p className="text-xs font-semibold text-gray-600 mb-2">
                                REQUEST DETAILS
                              </p>
                              <div className="space-y-1 text-xs">
                                <p>
                                  <span className="font-semibold">Method:</span>
                                  <span className="b px-2 py-1 rounded">
                                    {errorResponse.request.method?.toUpperCase() ??
                                      "-"}
                                  </span>
                                </p>
                                <p>
                                  <span className="font-semibold">URL:</span>
                                  <br />
                                  <span className="text-gray-600 break-all">
                                    {errorResponse.request.url ?? "-"}
                                  </span>
                                </p>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-sm text-gray-700">
                          No error details available
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end items-center w-full">
                      {errorDetails?.data?.isExternalPharmacyError && (
                        <Button
                          disabled={retryLoading}
                          className="bg-primary text-white font-semibold px-[10px] py-[5px] rounded-md cursor-pointer"
                          onClick={handleRetry}
                        >
                          Retry Transmission
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        );
      },
    },
  ];
}
