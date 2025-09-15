import type {
  PharmacyCatalogue,
  PharmacyProductVariant,
} from "@/types/responses/medication";
import VariantRow from "../VariantRow/VariantRow";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";

interface MedicationProps {
  medication: PharmacyCatalogue;
}

export function MedicationRow({ medication }: MedicationProps) {
  const variantCount = medication.productVariant.length;

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
        <div className="flex justify-between items-center bg-white py-[9px] px-4 border-b border-gray-200">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            VARIANTS
          </div>
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            DEFAULT PRICE
          </div>
        </div>

        {medication.productVariant.map((variant: PharmacyProductVariant) => {
          return (
            <VariantRow
              key={variant._id}
              variant={variant}
              drugName={medication.medicationCatalogue.drugName}
            />
          );
        })}
      </div>
    </div>
  );
}
