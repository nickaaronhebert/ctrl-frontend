import type { PharmacyProductVariant } from "@/types/responses/medication";
import { SquarePen, Trash2 } from "lucide-react";
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
import EditVariantModal from "../EditVariantModal/EditVariantModal";

interface VariantProps {
  drugName: string;
  variant: PharmacyProductVariant;
  onDelete?: (variant: PharmacyProductVariant) => void;
  id?: string;
}

const PlanVariantRow = ({ variant, drugName, onDelete, id }: VariantProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const handleDelete = () => {
    onDelete?.(variant);
    setIsDeleteOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-14 items-center py-3 px-4 bg-light-background  border-b border-gray-200 last:border-b-0 gap-4">
        <p className="col-span-12 md:col-span-2 text-sm text-gray-900 font-medium">
          {variant?.productVariant?.name ? variant?.productVariant?.name : "-"}
        </p>
        <p className="col-span-12 md:col-span-2 text-sm text-gray-900 font-medium truncate">
          {variant?.primaryPharmacyIdentifier || "N/A"}
        </p>
        <p className="col-span-6 md:col-span-2 text-sm text-gray-900 font-semibold md:text-center">
          ${variant?.defaultPrice?.toFixed(2)}
        </p>
        <p className="col-span-6 md:col-span-2 text-sm text-gray-900 font-semibold md:text-center">
          ${variant?.newPrice?.toFixed(2)}
        </p>

        <p className="col-span-6 md:col-span-2 text-sm text-gray-900 font-semibold md:text-center truncate ">
          {variant?.shippingProfile?.name}
        </p>

        <p className="col-span-6 md:col-span-2 text-sm text-gray-900 font-semibold md:text-center">
          {variant?.supplies?.length}
        </p>

        <div className="col-span-6 md:col-span-2 flex justify-center items-center">
          <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <AlertDialogTrigger asChild>
              <button
                className="hover:bg-red-50 flex items-center gap-3 rounded-full p-1 transition-colors duration-200"
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
          <button
            onClick={() => setIsEditOpen(true)}
            className="hover:bg-blue-50 p-1 rounded-full transition-colors duration-200"
            aria-label="Edit variant"
          >
            <SquarePen
              color="#5354ac"
              className="h-4 w-4 cursor-pointer hover:text-blue-500 transition-colors duration-200"
            />
          </button>
        </div>
      </div>
      {isEditOpen && (
        <EditVariantModal
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          variant={variant}
          mode="plan"
          id={id}
        />
      )}
    </>
  );
};

export default PlanVariantRow;
