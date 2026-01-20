import { cn, formatDate } from "@/lib/utils";
import type { IFulfillmentTracking } from "@/types/responses/IViewTransmissionFulfillments";
import type { ColumnDef } from "@tanstack/react-table";
import { Truck } from "lucide-react";
import { Box } from "lucide-react";
import { File } from "lucide-react";
import { Check } from "lucide-react";
import { ShieldAlert } from "lucide-react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const fulfillmentStatusMapper = {
  PROCESSING: {
    title: "Processing",
    style: "text-[#BD51BB] border border-[#BD51BB] bg-[#F1EDF5]",
    icon: <File size={14} />,
  },

  SHIPPED: {
    title: "Shipped",
    style: "text-[#008CE3] bg-[#E5F3FC] border border-[#008CE3] ",
    icon: <Truck size={14} />,
  },

  IN_SHIPPING: {
    title: "Ready to Ship",
    style: "text-[#FF8400] border border-[#FF8400] bg-[#FFF6E5] ",
    icon: <Box size={14} />,
  },

  PICKED_UP: {
    title: "Delivered",
    style: "text-[#1AA061] border border-[#1AA061] bg-[#E6FAF5]",
    icon: <Check size={14} />,
  },

  EXCEPTION: {
    title: "Exception",
    style: "text-[#3E4D61] border border-[#3E4D61] bg-[#F6F8F9]",
    icon: <ShieldAlert size={14} />,
  },

  CANCELLED: {
    title: "Cancelled",
    style: "text-[#E31010] border border-[#E31010] bg-[#FFE9E9]",
    icon: <X size={14} />,
  },
};

export const STATUS_CONFIG: Record<
  string,
  { status: string; description: string; icon: React.ReactNode; style: string }
> = {
  PROCESSING: {
    status: "Processed",
    description: "Pharmacy filling prescription",
    style: "text-[#BD51BB] border border-transparent bg-[#F1EDF5]",
    icon: <File size={14} />,
  },
  IN_SHIPPING: {
    status: "In Shipping",
    description: "Package is in transit",
    style: "text-[#FF8400] border border-transparent bg-[#FFF6E5] ",
    icon: <Box size={14} />,
  },
  SHIPPED: {
    status: "Shipped",
    description: "Package has been shipped",
    style: "text-[#008CE3] bg-[#E5F3FC] border border-transparent ",
    icon: <Truck size={14} />,
  },
  PICKED_UP: {
    status: "Picked Up",
    description: "Picked up by customer",
    style: "text-[#1AA061] border border-transparent bg-[#E6FAF5]",
    icon: <Check size={14} />,
  },
  EXCEPTION: {
    status: "Exception",
    description: "There was an issue with fulfillment",
    style: "text-[#3E4D61] border border-transparent bg-[#F6F8F9]",
    icon: <ShieldAlert size={14} />,
  },
  CANCELLED: {
    status: "Cancelled",
    description: "Order was cancelled",
    style: "text-[#E31010] border border-transparent bg-[#FFE9E9]",
    icon: <X size={14} />,
  },
};

export function transmissionFulfillmentColumns(
  handleTrackClick: (id: string) => void
): ColumnDef<IFulfillmentTracking>[] {
  return [
    {
      accessorKey: "transmissionId",
      header: "Transmission ID",
      cell: ({ row }) => {
        const { transmissionId } = row.original;
        return (
          <div>
            <p className="text-sm font-medium">{transmissionId}</p>
          </div>
        );
      },
    },

    {
      accessorKey: "pharmacyStatus",
      header: "Status",
      cell: ({ row }) => {
        const { pharmacyStatus } = row.original;

        const statusClass =
          fulfillmentStatusMapper?.[pharmacyStatus]?.style || "";
        const statusTitle =
          fulfillmentStatusMapper?.[pharmacyStatus]?.title || "-";
        const statusIcon = fulfillmentStatusMapper?.[pharmacyStatus]?.icon;
        return (
          <div
            className={cn(
              "text-xs font-medium p-[6px] rounded-[5px] flex gap-1 w-fit",
              statusClass
            )}
          >
            {statusIcon}
            {statusTitle}
          </div>
        );
      },
    },

    // {

    // }

    {
      accessorKey: "pharmacy",
      header: "Pharmacy",
      cell: ({ row }) => {
        const { pharmacy } = row.original;
        return (
          <div>
            <p className="text-sm font-medium">{pharmacy?.name || "-"}</p>
          </div>
        );
      },
    },

    {
      accessorKey: "shippingDetails",
      header: "Carrier Tracking #",
      cell: ({ row }) => {
        const { shippingDetails } = row.original;
        return (
          <div>
            <p className="text-sm font-medium">
              {shippingDetails?.trackingNumber || "-"}
            </p>
            <p className="text-[10px] font-normal">
              {shippingDetails?.shippingCompany || "-"}
            </p>
          </div>
        );
      },
    },

    {
      accessorKey: "lastStatusReceived",
      header: "Last Updated",
      cell: ({ row }) => {
        const { lastStatusReceived } = row.original;
        return (
          <div>
            <p className="text-sm font-medium">
              {lastStatusReceived ? formatDate(lastStatusReceived) : ""}
            </p>
          </div>
        );
      },
    },

    {
      accessorKey: "_id",
      header: "Action",
      cell: ({ row }) => {
        return (
          <>
            <Button
              onClick={() => handleTrackClick(row.original._id!)}
              className="font-semibold text-[10px] py-2 px-5 border rounded-[50px] bg-transparent hover:bg-transparent cursor-pointer"
            >
              Track
            </Button>
          </>
        );
      },
    },
  ];
}
