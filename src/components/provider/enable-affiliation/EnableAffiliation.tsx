import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EnableAffiliation from "@/assets/icons/EnableAffiliation";
import { useUpdateAffiliationStatusMutation } from "@/redux/services/authApi";
import type { UseFormSetValue } from "react-hook-form";
import type { AffiliationForm } from "@/schemas/affiliationSchema";

interface EnableAffiliationDialogProps {
  open: boolean;
  id: string;
  fieldIndex: number;
  setValue: UseFormSetValue<AffiliationForm>;
  onCancel: () => void;
}

export function EnableAffiliationDialog({
  open,
  id,
  fieldIndex,
  setValue,
  onCancel,
}: EnableAffiliationDialogProps) {
  console.log("field id............", id);
  console.log("field index........", fieldIndex);
  const [editAffiliationStatus] = useUpdateAffiliationStatusMutation();

  const handleConfirm = async () => {
    try {
      await editAffiliationStatus({ id, status: true }).unwrap();
      setValue(`affiliations.${fieldIndex}.isAffiliationActive`, true);
      onCancel();
    } catch (err) {
      console.error("Failed to enable affiliation", err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-[382px] h-[330px] px-[25px] py-[45px] gap-0">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        <div className="px-6 ">
          {/* Warning Icon */}
          <div className="flex justify-center mb-1">
            <div className="w-[82px] bg-background rounded-full flex items-center justify-center">
              <EnableAffiliation />
            </div>
          </div>

          {/* Message */}
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Are you sure you want to enable this affiliation?
            </h3>
            <p className="text-sm text-gray-600">
              You can enable it again anytime.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-primary text-white"
            >
              Yes, Active
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
