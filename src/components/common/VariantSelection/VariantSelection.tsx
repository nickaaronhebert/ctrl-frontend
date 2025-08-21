import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Medication, type Variant } from "@/pages/AccessDetail";
import { useGetSingleMedicationCatalogueDetailsQuery } from "@/redux/services/medication";
import { useState } from "react";
type MedicationSelectionProps = {
  selectedMedication: Medication | null;
  selectedVariant: Variant | null;
  setSelectedVariant: (value: Variant) => void;
};

export function VariantSelection({
  selectedVariant,
  setSelectedVariant,
  selectedMedication,
}: MedicationSelectionProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isError, isLoading } =
    useGetSingleMedicationCatalogueDetailsQuery(selectedMedication?.id || "", {
      skip: !open || !selectedMedication?.id,
    });

  const variantOptions = data?.data;
  console.log("variantOptionsss", variantOptions);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={(value) => {
        const selectedVariant = variantOptions?.productVariants?.find(
          (variant: any) => variant.id.toString() === value
        );
        console.log(
          "selectedVariant----------------------------",
          selectedVariant
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

          {data?.data?.productVariants?.map((med: any) => (
            <SelectItem key={med.id} value={med.id.toString()}>
              {med.strength}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
