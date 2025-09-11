import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Medication,
  type Variant,
} from "@/pages/Organization/AccessControl/AccessDetail";
import { useGetSingleMedicationCatalogueDetailsQuery } from "@/redux/services/medication";
import type { ProductVariant } from "@/types/global/commonTypes";
import { useState } from "react";
type MedicationSelectionProps = {
  selectedMedication: Medication | null;
  selectedVariant: Variant | null;
  setSelectedVariant: (value: Variant) => void;
  disabled: boolean;
};

export function VariantSelection({
  selectedVariant,
  setSelectedVariant,
  selectedMedication,
  disabled,
}: MedicationSelectionProps) {
  const [open, setOpen] = useState<boolean>(false);
  // const { data, isError, isLoading } =
  //   useGetSingleMedicationCatalogueDetailsQuery(selectedMedication?.id || "", {
  //     skip: !open || !selectedMedication?.id,
  //   });
  const { data, isError, isLoading } =
    useGetSingleMedicationCatalogueDetailsQuery(selectedMedication?.id || "", {
      skip: false,
    });

  const variantOptions = data?.data;

  return (
    <Select
      disabled={disabled}
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => {
        const selectedVariant = variantOptions?.productVariants?.find(
          (variant: ProductVariant) => variant.id.toString() === value
        );
        if (selectedVariant) {
          setSelectedVariant({
            id: selectedVariant?.id?.toString(),
            strength: selectedVariant?.strength,
          });
        }
      }}
      value={selectedVariant?.id || ""}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Variant" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Medications</SelectLabel>

          {isLoading && <div>Loading</div>}

          {isError && <div>Error loading medications</div>}

          {data?.data?.productVariants?.map((med: ProductVariant) => (
            <SelectItem key={med.id} value={med.id.toString()}>
              {med.strength}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
