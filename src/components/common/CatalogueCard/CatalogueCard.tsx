import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useMedication } from "@/context/ApplicationUser/MedicationContext";
import type { ProductVariant } from "@/context/ApplicationUser/MedicationContext";
import MedicationLibrary from "@/assets/icons/MedicationLibrary";
import type { PharmacyCatalogue } from "@/types/responses/medication";

interface CatalogueCardProps {
  catalogue: PharmacyCatalogue;
}

export function CatalogueCard({ catalogue }: CatalogueCardProps) {
  const {
    getSelectedVariantsForMedication,
    isVariantSelected,
    // toggleVariant,
    toggleCatalogueVariant,
    selectAllCatalogue,
    deselectAllCatalogue,
  } = useMedication();
  const [isExpanded] = useState(true);

  const selectedVariants = getSelectedVariantsForMedication(catalogue._id);
  const selectedCount = selectedVariants.length;
  const totalVariants = catalogue.productVariant.length;
  const isAllSelected = selectedCount === totalVariants;
  const isPartiallySelected =
    selectedCount > 0 && selectedCount < totalVariants;

  const handleMedicationToggle = () => {
    if (isAllSelected) {
      deselectAllCatalogue(catalogue._id);
    } else {
      selectAllCatalogue(catalogue as any);
    }
  };

  const handleVariantToggle = (variant: ProductVariant) => {
    toggleCatalogueVariant(catalogue as any, variant);
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
              {catalogue.medicationCatalogue.drugName}
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
          <div className="flex justify-between items-center">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              VARIANTS
            </div>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              DEFAULT PRICE
            </div>
          </div>
          <div className="space-y-2">
            {catalogue.productVariant.map((variant: any) => {
              return (
                <div
                  key={variant._id}
                  className="flex items-center justify-between gap-3 p-3 rounded-md bg-light-background hover:bg-light-background"
                >
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <Checkbox
                        checked={isVariantSelected(catalogue._id, variant._id)}
                        onCheckedChange={() => handleVariantToggle(variant)}
                        className="h-4 w-4 bg-white"
                      />
                      <span className="text-sm ml-2 text-foreground">
                        {variant?.productVariant?.name
                          ? variant?.productVariant?.name
                          : "-"}
                      </span>
                    </div>

                    <span className="text-sm ml-2 text-foreground">
                      ${variant?.price}
                    </span>
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
