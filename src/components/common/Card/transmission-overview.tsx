// import { formatDateMMDDYYYY } from "@/lib/utils";
import type { Organization, Transmission } from "@/types/global/commonTypes";
import { Activity } from "lucide-react";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import type { ReactNode } from "react";

type TransmissionDetails = Pick<Transmission, "amount" | "status"> & {
  createdAt: string;
  subOrganization?: Organization;
  organization?: Organization;
  tracking: {
    trackingNumber: string;
    shippingCompany: string;
    trackingUrl: string;
    shipped: boolean;
  };
};

const orderDisplayFields: {
  label: string;
  getValue: (transmission: TransmissionDetails) => ReactNode;
}[] = [
  {
    label: "Status",
    getValue: (transmission) => <StatusBadge status={transmission.status} />,
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

export default function TransmissionOverviewCard({
  transmission,
  uniqueId,
  externalOrderId,
}: {
  transmission: TransmissionDetails;
  uniqueId: string;
  externalOrderId?: string;
}) {
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
  );
}
