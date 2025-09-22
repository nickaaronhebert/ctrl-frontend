// import { formatDateMMDDYYYY } from "@/lib/utils";
import type { Transmission } from "@/types/global/commonTypes";
import { Activity } from "lucide-react";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import type { ReactNode } from "react";

type TransmissionDetails = Pick<Transmission, "amount" | "status"> & {
  createdAt: string;
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
];

export default function TransmissionOverviewCard({
  transmission,
}: {
  transmission: TransmissionDetails;
}) {
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
        {orderDisplayFields.map(({ label, getValue }) => (
          <div key={label}>
            <h4 className="text-sm font-normal text-muted-foreground ">
              {label}
            </h4>
            <span className="capitalize font-medium text-primary-foreground text-sm mt-2">
              {getValue(transmission as TransmissionDetails)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
