import { cn } from "@/lib/utils";
import { StatusBadge } from "../StatusBadge/StatusBadge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PayInvoiceDialog from "../PayInvoiceDialog/PayInvoiceDialog";
import { type InvoiceDetail } from "@/types/responses/invoice";

type InvoiceDetailProps = {
  data: InvoiceDetail;
  className?: string;
  screenType?: string;
};

export function TotalAmountCard({
  data,
  className,
  screenType,
}: InvoiceDetailProps) {
  const [open, setOpen] = useState<boolean>(false);

  function isNotPaid(status: string | undefined) {
    return status === "Unpaid";
  }

  return (
    <>
      <div
        className={cn(
          "rounded-xl bg-card flex flex-col justify-between p-5 md:p-6 shadow-sm",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {"Total Amount"}
          </h3>
          <StatusBadge status={data?.status} />
        </div>
        <div
          className={cn(
            "mt-3 flex items-center gap-4",
            isNotPaid(data?.status) ? "justify-between" : "justify-start"
          )}
        >
          <div>
            <p className="text-2xl md:text-3xl font-semibold text-foreground">
              $
              {screenType === "organization"
                ? (data?.totalAmount).toFixed(2)
                : data?.medicationFee}
            </p>
            {screenType === "organization" && (
              <p className="text-[12px] mt-1 text-gray-400 font-semibold ">
                (Includes{" "}
                <span className="text-[12px] font-semibold text-[#BD51BB]">
                  ${data?.applicationFee}
                </span>{" "}
                CTRL service fees)
              </p>
            )}
          </div>

          {isNotPaid(data?.status) && screenType !== "pharmacy" && (
            <Button
              onClick={() => setOpen(true)}
              className="w-[110px] min-h-[40px] rounded-[50px] py-[5px] px-[20px] bg-black text-white"
            >
              Pay Now
            </Button>
          )}
        </div>
      </div>
      {open && (
        <PayInvoiceDialog open={open} onOpenChange={setOpen} data={data} />
      )}
    </>
  );
}
