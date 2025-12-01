import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { type InvoiceDetail } from "@/types/responses/invoice";
import { usePayInvoiceMutation } from "@/redux/services/invoice";
import { toast } from "sonner";

type PayInvoiceDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: InvoiceDetail;
  cards: any;
  refetch: any;
};

export function PayInvoiceDialog({
  open,
  onOpenChange,
  data,
  cards,
  refetch,
}: PayInvoiceDialogProps) {
  const [payInvoice, { isLoading }] = usePayInvoiceMutation();
  const [method, setMethod] = useState<"card" | "stripe-link">("card");
  const [isWaitingForWebhook, setIsWaitingForWebhook] = useState(false);

  const defaultCard = data?.subOrganization
    ? cards[0]
    : cards.find((card: any) => card.isDefault);

  const handleCardPayment = async () => {
    if (!defaultCard || !data?.invoiceId) return;

    try {
      const response = await payInvoice({
        invoice: data.id,
        paymentMethod: defaultCard.paymentMethodId,
      }).unwrap();
      setIsWaitingForWebhook(true);
      setTimeout(() => {
        refetch();
        setIsWaitingForWebhook(false);
        onOpenChange(false);
        console.log("Payment successful", response);
        toast.success("Payment successful!", {
          duration: 1500,
        });
      }, 2500);
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.", {
        duration: 1500,
      });
      setIsWaitingForWebhook(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
        <DialogHeader className="px-5 py-3 border-b">
          <DialogTitle className="font-semibold text-[18px] leading-[26px] text-black">
            Secure Payment for {data?.invoiceId}
          </DialogTitle>
        </DialogHeader>
        <div className="w-[470px] mx-auto py-[14px] px-[10px] rounded-[6px] bg-[#F7F1FD]">
          <div className="flex items-start justify-between gap-6">
            <div className="text-sm w-full">
              <div className="flex items-center justify-between py-1">
                <span className="font-normal text-[14px] leading-[18px] text-[#081F3B]">
                  Subtotal:
                </span>
                <span className="font-medium text-[14px] leading-[18px] text-[#00000]">
                  ${data?.totalAmount}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="font-normal text-[14px] leading-[18px] text-[#081F3B] ">
                  CTRL Service Fees:
                </span>
                <p className="font-normal text-[14px] leading-[18px] text-[#63627F]">
                  {data?.transactions?.length} transactions ×{" "}
                  <span className="font-medium text-[14px] leading-[18px] text-black">
                    $10.00
                  </span>
                </p>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between py-1">
                <span className="font-semibold text-[18px] leading-[26px] text-black">
                  Total:
                </span>
                <span className="font-semibold text-black text-[18px] leading-[26px]">
                  ${data?.totalAmount}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-5 md:px-6 py-2">
          <p className="font-semibold text-[16px] leading-[22px] text-black mb-3">
            Select Payment Method
          </p>
          <RadioGroup
            value={method}
            onValueChange={(v) => setMethod(v as "card" | "stripe-link")}
            className="space-y-0"
          >
            {!defaultCard ? (
              <p className="text-sm text-red-600">
                No card available. You can still pay via Stripe link.
              </p>
            ) : (
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
                    {defaultCard?.cardBrand || "card"}
                  </span>
                  <span className="text-sm text-foreground">
                    Use Credit Ending in {defaultCard?.last4 || "XXXX"}
                  </span>
                </div>
              </label>
            )}

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
          {method === "stripe-link" && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Payment Link</p>
              <div className="rounded-md border bg-muted/30 p-3 flex gap-2 items-center ">
                <a
                  href={data?.stripeHostedInvoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm text-foreground truncate max-w-[400px] hover:underline"
                >
                  {data?.stripeHostedInvoiceUrl}
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <p className="text-[11px] text-muted-foreground mb-3">
            Your payment information is encrypted and secure. Powered by2
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
            {method === "card" && defaultCard && (
              <Button
                className="min-w-[140px] text-white"
                onClick={handleCardPayment}
                disabled={isLoading || isWaitingForWebhook}
              >
                {isLoading || isWaitingForWebhook
                  ? "Processing..."
                  : `Pay $${data?.totalAmount}`}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PayInvoiceDialog;
