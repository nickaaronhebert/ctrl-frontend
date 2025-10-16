import type { PharmacyProductVariant } from "@/types/responses/medication";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface VariantProps {
  drugName: string;
  variant: PharmacyProductVariant;
  onDelete?: (variant: PharmacyProductVariant) => void;
}

const VariantRow = ({ variant, drugName, onDelete }: VariantProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete?.(variant);
    setIsOpen(false);
  };

  return (
    <div className="grid grid-cols-12 items-center py-3 px-4 bg-light-background  border-b border-gray-200 last:border-b-0 gap-4">
      {/* <p className="col-span-12 md:col-span-3 text-sm text-gray-900 font-medium">
        {variant?.productVariant?.name}
      </p> */}
      <p className="col-span-12 md:col-span-3 text-sm text-gray-900 font-medium">
        -
      </p>
      <p className="col-span-12 md:col-span-3 text-sm text-gray-900 font-medium truncate">
        {variant?.pharmacyIdentifier || "N/A"}
      </p>
      <p className="col-span-6 md:col-span-3 text-sm text-gray-900 font-semibold md:text-right">
        ${variant?.price?.toFixed(2)}
      </p>

      <div className="col-span-6 md:col-span-3 flex justify-end items-center">
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <button
              className="hover:bg-red-50 rounded-full p-1 transition-colors duration-200"
              aria-label="Delete variant"
            >
              <Trash2
                color="#5354ac"
                className="h-4 w-4 cursor-pointer hover:text-red-500 transition-colors duration-200"
              />
            </button>
          </AlertDialogTrigger>

          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg font-semibold text-gray-900">
                Delete Variant
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-600 mt-2">
                Are you sure you want to delete "{drugName}{" "}
                {variant?.productVariant?.strength}"? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter className="gap-2 mt-6">
              <AlertDialogCancel className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none  duration-200">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default VariantRow;
