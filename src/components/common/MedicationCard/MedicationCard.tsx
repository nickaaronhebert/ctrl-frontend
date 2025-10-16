import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import type {
  Medication,
  ProductVariant,
} from "@/context/ApplicationUser/MedicationContext";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";

interface MedicationCardProps {
  medication: Medication;
}

export function MedicationCard({ medication }: MedicationCardProps) {
  const {
    getSelectedVariantsForMedication,
    isVariantSelected,
    toggleVariant,
    selectAllMedication,
    deselectAllMedication,
  } = useMedication();
  const [isExpanded] = useState(true);

  const selectedVariants = getSelectedVariantsForMedication(medication.id);
  const selectedCount = selectedVariants.length;
  const totalVariants = medication.productVariants.length;
  const isAllSelected = selectedCount === totalVariants;
  const isPartiallySelected =
    selectedCount > 0 && selectedCount < totalVariants;

  const handleMedicationToggle = () => {
    if (isAllSelected) {
      deselectAllMedication(medication.id);
    } else {
      selectAllMedication(medication);
    }
  };

  const handleVariantToggle = (variant: ProductVariant) => {
    toggleVariant(medication, variant);
  };

  return (
    <Card
      style={{
        boxShadow: "0px 2px 6px 0px hsla(0, 0%, 0%, 0.08)",
      }}
      className="p-4 space-y-2 rounded-[15px] bg-white border-card-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={
              isAllSelected
                ? true
                : isPartiallySelected
                ? "indeterminate"
                : false
            }
            onCheckedChange={handleMedicationToggle}
            className="h-4 w-4"
          />
          <div className="flex items-center gap-2">
            <div className="rounded-[8px] p-[12px] w-[40px] h-[40px] bg-secondary flex justify-center items-center">
              <MedicationLibrary color="#5354ac" />
            </div>
            <span className="font-medium text-foreground">
              {medication.drugName}
            </span>
            <span className="text-sm text-muted-foreground">
              {selectedCount} / {totalVariants}
            </span>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">
          {totalVariants} variants available
        </span>
      </div>

      {/* Variants */}
      {isExpanded && (
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            VARIANTS
          </div>
          <div className="space-y-2">
            {medication.productVariants.map((variant: ProductVariant) => {
              console.log("variant>>>", variant);
              return (
                <div
                  key={variant.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-md bg-light-background hover:bg-light-background"
                >
                  <div>
                    <Checkbox
                      checked={isVariantSelected(medication.id, variant.id)}
                      onCheckedChange={() => handleVariantToggle(variant)}
                      className="h-4 w-4 bg-white"
                    />
                    <span className="text-sm ml-2 text-foreground">
                      {variant?.name ? variant?.name : "-"}
                    </span>
                    {/* <span className="text-sm ml-2 text-foreground">-</span> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
