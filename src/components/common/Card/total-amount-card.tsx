import { cn } from "@/lib/utils";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import type { Invoice, OrgInvoice } from "@/types/global/commonTypes";

export type TotalAmountData = {
  amount: number;
};

export function TotalAmountCard({
  data,
  className,
}: {
  data: Invoice | OrgInvoice;
  onMarkRemitted?: () => void;
  className?: string;
}) {
  console.log("databby>>--", data);
  return (
    <div
      className={cn(
        "rounded-xl bg-card flex flex-col justify-between p-5 md:p-6 shadow-sm ",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          {"Total Amount"}
        </h3>
        <StatusBadge status={data?.status} />
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="mt-3 text-2xl md:text-3xl font-semibold text-foreground">
          ${data?.totalAmount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
