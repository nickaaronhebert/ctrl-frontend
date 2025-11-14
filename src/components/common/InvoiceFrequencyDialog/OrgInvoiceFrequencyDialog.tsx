import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BillingFrequencySelector } from "../BillingFrequencySelector/BillingFrequencySelector";
import { Button } from "@/components/ui/button";
import type { BillingFrequency } from "@/components/dialog/action";
import { useUpdateOrgBillingMutation } from "@/redux/services/pharmacy";
import { toast } from "sonner";

interface BillingFrequencySelectorProps {
  selected: BillingFrequency;
  setSelected: (value: BillingFrequency) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  organization: string;
}

export function OrgInvoiceFrequencyDialog({
  selected,
  setSelected,
  open,
  setOpen,
  organization,
}: BillingFrequencySelectorProps) {
  const [updateOrgBilling] = useUpdateOrgBillingMutation();

  const handleUpdate = async () => {
    try {
      await updateOrgBilling({
        organization: organization,
        invoiceFrequency: selected,
      }).unwrap();

      toast.success("Invoice frequency updated successfully!");
      setOpen(false);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update invoice frequency."
      );
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl p-5">
        <DialogHeader className="px-5">
          <DialogTitle>Manage Status and Billing Cycle</DialogTitle>
          <DialogDescription className="sr-only">
            Pick how often you want invoices to be generated.
          </DialogDescription>
        </DialogHeader>

        <BillingFrequencySelector
          selected={selected}
          setSelected={setSelected}
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => console.log("Cancelled")}>
            Cancel
          </Button>
          <Button className="text-white cursor-pointer" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
