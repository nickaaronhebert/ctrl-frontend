// import { formatDateMMDDYYYY } from "@/lib/utils";
import type {
  // Organization,
  Transmission,
  OrganizationAddress,
  ApiError,
} from "@/types/global/commonTypes";
import { Activity } from "lucide-react";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { useState, type ReactNode } from "react";
import { TransmissionFailureHint } from "../TransmissionFailureHint/TransmissionFailureHint";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useRetryTransmissionMutation,
  useTransmissionFailedLogQuery,
} from "@/redux/services/transmission";
import { toast } from "sonner";

type TransmissionDetails = Pick<Transmission, "amount" | "status"> & {
  createdAt: string;
  subOrganization?: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    status: string;
    organizationPublicKey: string;
    address: OrganizationAddress;
    createdBy: string;
    applicationFee: number;
    parentOrganization: string;
    isTelegraTrustedPartner: boolean;
    isSubOrgPaymentMethodConfigured: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  organization?: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    status: string;
    organizationPublicKey: string;
    allowedStates: string[];
    createdBy: string;
    applicationFee: number;
    address: OrganizationAddress;
    isTelegraTrustedPartner: boolean;
    createdAt: string;
    updatedAt: string;
  } | null;
  tracking: {
    trackingNumber: string;
    shippingCompany: string;
    trackingUrl: string;
    shipped: boolean;
  } | null;
  id?: string;
};

// const orderDisplayFields: {
//   label: string;
//   getValue: (transmission: TransmissionDetails) => ReactNode;
// }[] = [
//   {
//     label: "Status",
//     getValue: (transmission) => {
//       console.log("transmission.status", transmission.status);
//       return (
//         <div className="flex items-center">
//           <StatusBadge status={transmission.status} />

//           {transmission.status === "Failed" && (
//             <TransmissionFailureHint onClick={() => setOpen(true)} />
//           )}
//         </div>
//       );
//     },
//   },

//   {
//     label: "Total Amount",
//     getValue: (transmission) =>
//       new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(Number(transmission.amount)),
//   },
//   {
//     label: "Submitted",
//     getValue: (transmission) => {
//       const date = new Date(transmission.createdAt);
//       return date.toLocaleString("en-US", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//       });
//     },
//   },

//   // {
//   //   label: "Unique Id",
//   //   getValue: (transmission) => <p>{transmission.uniqueId}</p>,
//   // },
// ];

export default function TransmissionOverviewCard({
  transmission,
  uniqueId,
  externalOrderId,
  id,
}: {
  transmission: TransmissionDetails;
  uniqueId: string;
  externalOrderId?: string;
  id: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  console.log("transmissionnnnnn", id);
  const { data: errorDetails, isLoading } = useTransmissionFailedLogQuery(id, {
    skip: !open,
  });

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
      if (typeof error === "object" && error !== null && "data" in error) {
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

  const orderDisplayFields: {
    label: string;
    getValue: (transmission: TransmissionDetails) => ReactNode;
  }[] = [
    {
      label: "Status",
      getValue: (transmission) => {
        console.log("transmission.status", transmission.status);
        return (
          <div className="flex items-center">
            <StatusBadge status={transmission.status} />

            {transmission.status === "Failed" && (
              <TransmissionFailureHint onClick={() => setOpen(true)} />
            )}
          </div>
        );
      },
    },

    {
      label: "Total Amount",
      getValue: (transmission) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(transmission.amount)),
    },
    {
      label: "Submitted",
      getValue: (transmission) => {
        const date = new Date(transmission.createdAt);
        return date.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
      },
    },

    // {
    //   label: "Unique Id",
    //   getValue: (transmission) => <p>{transmission.uniqueId}</p>,
    // },
  ];
  const overviewFields: {
    label: string;
    getValue?: (t: TransmissionDetails) => ReactNode;
    content?: ReactNode;
  }[] = [
    ...orderDisplayFields.map(({ label, getValue }) => ({
      label,
      getValue,
    })),
    {
      label: "External Order Id",
      content: externalOrderId ?? "-",
    },
    {
      label: "Pharmacy Order Id",
      content: uniqueId || "-",
    },
    {
      label: "Organization",
      content:
        transmission?.subOrganization?.name ||
        transmission?.organization?.name ||
        "-",
    },
    // ...(transmission?.tracking?.trackingUrl
    //   ? [
    //       {
    //         label: "Tracking URL",
    //         content: transmission?.tracking?.trackingUrl ? (
    //           <a
    //             href={transmission?.tracking?.trackingUrl}
    //             target="_blank"
    //             rel="noopener noreferrer"
    //           >
    //             {transmission?.tracking?.trackingUrl?.toLowerCase()}
    //           </a>
    //         ) : (
    //           "-"
    //         ),
    //       },
    //     ]
    //   : []),
    ...(transmission?.tracking?.trackingNumber
      ? [
          {
            label: "Tracking Number",
            content: transmission?.tracking?.trackingNumber || "-",
          },
        ]
      : []),
  ];

  return (
    <>
      <div
        className="bg-white rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
        id="transmissionOverview"
      >
        <div className="flex gap-2 items-center border-b border-card-border p-5">
          <Activity width={16} height={16} />
          <h2 className="text-base font-semibold ">Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
          {overviewFields.map(({ label, getValue, content }) => (
            <div key={label}>
              <h4 className="text-sm font-normal text-muted-foreground ">
                {label}
              </h4>
              <span className="capitalize font-medium text-primary-foreground text-sm mt-2">
                {getValue
                  ? getValue(transmission as TransmissionDetails)
                  : content}
              </span>
            </div>
          ))}
          {transmission?.tracking?.trackingUrl && (
            <div>
              <h4 className="text-sm font-normal text-muted-foreground ">
                Tracking URL
              </h4>
              <span className=" font-medium text-primary-foreground text-sm mt-2">
                <a
                  href={transmission?.tracking?.trackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {transmission?.tracking?.trackingUrl?.toLowerCase()}
                </a>
              </span>
            </div>
          )}
        </div>
      </div>
      {open && (
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
                                ),
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
                            {errorResponse.request.method?.toUpperCase() ?? "-"}
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
      )}
    </>
  );
}
