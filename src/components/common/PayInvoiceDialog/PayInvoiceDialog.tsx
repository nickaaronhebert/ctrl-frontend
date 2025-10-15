import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { type InvoiceDetail } from "@/types/responses/invoice";

type PayInvoiceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: InvoiceDetail;
};

export function PayInvoiceDialog({
  open,
  onOpenChange,
  data,
}: PayInvoiceDialogProps) {
  const [method, setMethod] = useState<"card" | "stripe-link">("card");
  const [copied, setCopied] = useState(false);
  const paymentLink = "https://checkout.stripe.com/c/pay/s_test_yrf36metu";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
        <DialogHeader className="p-5 md:p-6 border-b">
          <DialogTitle className="text-sm text-muted-foreground">
            Secure Payment for {data?.id}
            <span className="text-foreground font-semibold">{}</span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Review totals and choose a payment method
          </DialogDescription>
        </DialogHeader>

        {/* Totals Summary */}
        <div className="px-5 md:px-6 py-2">
          <div className="flex items-start justify-between gap-6">
            <div className="text-sm w-full">
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="text-foreground">${data?.totalAmount}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">
                  CTRL Service Fees:
                </span>
                <span className="text-foreground">3 transactions × $10.00</span>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between py-1">
                <span className="font-medium">Total:</span>
                <span className="font-semibold">${data?.totalAmount + 30}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="px-5 md:px-6 py-2">
          <p className="text-sm font-medium mb-3">Select Payment Method</p>
          <RadioGroup
            value={method}
            onValueChange={(v) => setMethod(v as "card" | "stripe-link")}
            className="space-y-2"
          >
            <label
              htmlFor="method-card"
              className={`flex items-center gap-3 w-full rounded-md border transition-colors py-3 px-3 cursor-pointer ${
                method === "card"
                  ? "border-primary bg-accent/40"
                  : "bg-card hover:bg-accent/40"
              }`}
            >
              <RadioGroupItem id="method-card" value="card" />
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center text-[10px] font-bold rounded-sm bg-primary/10 text-primary px-1.5 py-0.5">
                  VISA
                </span>
                <span className="text-sm text-foreground">
                  Use Credit Ending in 4008
                </span>
              </div>
            </label>

            <label
              htmlFor="method-stripe-link"
              className={`flex items-center gap-3 w-full rounded-md border transition-colors py-3 px-3 cursor-pointer ${
                method === "stripe-link"
                  ? "border-primary bg-accent/40"
                  : "bg-card hover:bg-accent/40"
              }`}
            >
              <RadioGroupItem id="method-stripe-link" value="stripe-link" />
              <span className="text-sm text-foreground">
                Pay by <span className="underline">Stripe Link</span>
              </span>
              {method === "stripe-link" && (
                <span
                  aria-hidden
                  className="ml-auto text-primary text-xs font-medium"
                >
                  ✓
                </span>
              )}
            </label>
          </RadioGroup>

          {/* Payment Link Section */}
          {method === "stripe-link" && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Payment Link</p>
              <div className="rounded-md border bg-muted/30 p-3 flex gap-2 items-center ">
                <span className="text-xs md:text-sm text-foreground truncate">
                  {paymentLink}
                </span>
                <Button
                  variant="link"
                  className="px-0 text-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(paymentLink);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? "COPIED" : "COPY LINK"}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Security Note + Actions */}
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <p className="text-[11px] text-muted-foreground mb-3">
            Your payment information is encrypted and secure. Powered by{" "}
            <span className="font-medium">stripe</span>.
          </p>
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="min-w-[88px]"
            >
              Cancel
            </Button>
            {method === "card" && (
              <Button
                className="min-w-[140px] text-white"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Pay ${data?.totalAmount + 30}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PayInvoiceDialog;
