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

interface BillingFrequencySelectorProps {
  selected: BillingFrequency;
  setSelected: (value: BillingFrequency) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  subOrganization: string;
  organization: string;
  onUpdate?: () => void;
}

export function SubOrgInvoiceFrequencyDialog({
  selected,
  setSelected,
  open,
  setOpen,
  //   subOrganization,
  //   organization,
  onUpdate,
}: BillingFrequencySelectorProps) {
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
          <Button
            className="text-white cursor-pointer"
            onClick={() => {
              if (onUpdate) onUpdate();
              setOpen(false);
            }}
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
