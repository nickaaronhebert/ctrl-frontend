import { formatDateMMDDYYYY } from "@/lib/utils";
import type { Transmission } from "@/types/global/commonTypes";

type TransmissionDetails = Pick<Transmission, "amount" | "status"> & {
  createdAt: string;
};

const orderDisplayFields: {
  label: string;
  getValue: (transmission: TransmissionDetails) => string | number;
}[] = [
  {
    label: "Status",
    getValue: (transmission) => `${transmission.status}`,
  },

  {
    label: "Amount",
    getValue: (transmission) => Number(transmission.amount).toFixed(2),
  },
  {
    label: "Created At",
    getValue: (transmission) => `${formatDateMMDDYYYY(transmission.createdAt)}`,
  },
];

export default function TransmissionOverviewCard({
  transmission,
}: {
  transmission: TransmissionDetails;
}) {
  return (
    <div
      className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="transmissionOverview"
    >
      <h2 className="text-base font-semibold p-5 border-b border-card-border">
        Transmission Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
        {orderDisplayFields.map(({ label, getValue }) => (
          <div key={label}>
            <h4 className="text-sm font-normal text-muted-foreground ">
              {label}
            </h4>
            <span className="capitalize font-medium text-primary-foreground text-sm">
              {getValue(transmission as TransmissionDetails)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
