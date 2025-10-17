import type {
  PharmacyCatalogue,
  PharmacyProductVariant,
} from "@/types/responses/medication";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import { useDeletePharmacyCatalogueMutation } from "@/redux/services/pharmacy";
import { toast } from "sonner";
import OrgVariantRow from "../OrgVariantRow/OrgVariantRow";

interface MedicationProps {
  medication: PharmacyCatalogue;
}

export function OrgMedicationRow({ medication }: MedicationProps) {
  const variantCount = medication.productVariant.length;
  const [deletePharmacyCatalogue] = useDeletePharmacyCatalogueMutation();

  const handleDeleteVariant = async (variant: PharmacyProductVariant) => {
    try {
      await deletePharmacyCatalogue({ id: variant._id }).unwrap();
      // console.log("Deleted variant:", variant._id);
      toast.success("Catalogue deleted successfully", {
        duration: 1500,
      });
    } catch (error) {
      console.error("Failed to delete variant:", error);
      toast.success("Failed to delete catalogue", {
        duration: 1500,
      });
    }
  };

  return (
    <div className="p-[10px] rounded-[15px] border border-card-border bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-[8px] p-[12px] w-[40px] h-[40px] bg-secondary flex justify-center items-center">
            <MedicationLibrary color="#5354ac" />
          </div>
          <h3 className="font-semibold text-[16px] leading-[22px] text-black">
            {medication.medicationCatalogue.drugName}
          </h3>
        </div>
        <span className="font-medium text-[14px] leading-[18px] text-black">
          {variantCount} variant{variantCount !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="space-y-0 rounded-[10px] border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 bg-white py-[9px] px-4 border-b border-gray-200">
          <div className="col-span-12 md:col-span-3 text-xs font-medium text-gray-500 uppercase">
            VARIANTS
          </div>
        </div>

        <div className="border border-gray-200 overflow-hidden">
          {medication.productVariant.map((variant: PharmacyProductVariant) => {
            return (
              <OrgVariantRow
                key={variant._id}
                variant={variant}
                drugName={medication.medicationCatalogue.drugName}
                onDelete={handleDeleteVariant}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
