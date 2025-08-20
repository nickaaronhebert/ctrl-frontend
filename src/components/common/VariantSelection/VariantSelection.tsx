import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Medication } from "@/pages/AccessDetail";
import { useGetSingleMedicationCatalogueDetailsQuery } from "@/redux/services/medication";
import { useState } from "react";
type MedicationSelectionProps = {
  selectedMedication: Medication | null;
  selectedVariant: string | null;
  setSelectedVariant: (value: string) => void;
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
  console.log("selectedVariant", data);

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      onValueChange={setSelectedVariant}
      value={selectedVariant || ""}
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
