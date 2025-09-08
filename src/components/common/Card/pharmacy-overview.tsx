import type { PharmacyTransmissionRow } from "@/types/global/commonTypes";
import { Activity } from "lucide-react";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import type { ReactNode } from "react";

const orderDisplayFields: {
  label: string;
  getValue: (transmission: PharmacyTransmissionRow) => ReactNode;
}[] = [
  {
    label: "Status",
    getValue: (transmission) => <StatusBadge status={transmission.status} />,
  },
  {
    label: "Total Amount",
    getValue: (transmission) => `$${Number(transmission.amount).toFixed(2)}`,
  },
  {
    label: "Submitted",
    getValue: (_transmission) => "Aug 10, 2025 8:02:15 AM",
  },
];

export default function PharmacyOverviewCard({
  transmission,
}: {
  transmission: PharmacyTransmissionRow;
}) {
  console.log("transmission", transmission);
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
              {getValue(transmission)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
