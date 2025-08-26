import { formatDateMMDDYYYY } from "@/lib/utils";
import type { Order } from "@/types/global/commonTypes";

type OrderDetails = Pick<Order, "createdAt" | "amount" | "status"> & {
  medicationCatalogueLength: number;
};

const orderDisplayFields: {
  label: string;
  getValue: (order: OrderDetails) => string;
}[] = [
  {
    label: "Status",
    getValue: (order) => `${order.status}`,
  },
  {
    label: "Total Medications",
    getValue: (order) => `${order.medicationCatalogueLength}`,
  },
  {
    label: "Amount",
    getValue: (order) => `${order.amount}`,
  },
  {
    label: "Order Date",
    getValue: (order) => `${formatDateMMDDYYYY(order.createdAt)}`,
  },
];

export default function OrderOverviewCard({ order }: { order: OrderDetails }) {
  return (
    <div
      className="bg-white   rounded-[10px] shadow-[0px_2px_40px_0px_#00000014]"
      id="orderOverview"
    >
      <h2 className="text-base font-semibold p-5 border-b border-card-border">
        Order Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 p-5">
        {orderDisplayFields.map(({ label, getValue }) => (
          <div key={label}>
            <h4 className="text-sm font-normal text-muted-foreground ">
              {label}
            </h4>
            <span className="capitalize font-medium text-primary-foreground">
              {getValue(order as OrderDetails)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
