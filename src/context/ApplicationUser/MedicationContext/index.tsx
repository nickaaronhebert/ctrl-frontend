import type { MedicationCatalogue } from "@/types/global/commonTypes";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface ProductVariant {
  strength: string;
  quantityType: string;
  containerQuantity: number;
  id: string;
  name?: string;
  medicationCatalogue: MedicationCatalogue;
}

export interface Medication {
  drugName: string;
  productVariants: ProductVariant[];
  dosageForm: string;
  category: string;
  id: string;
}

export interface SelectedVariant {
  medicationId: string;
  variantId: string;
  medication: Medication;
  variant: ProductVariant;
}

interface MedicationContextType {
  medications: Medication[];
  selectedVariants: SelectedVariant[];
  searchQuery: string;
  setMedications: (medications: Medication[]) => void;
  setSearchQuery: (query: string) => void;
  toggleVariant: (medication: Medication, variant: ProductVariant) => void;
  selectAllMedication: (medication: Medication) => void;
  deselectAllMedication: (medicationId: string) => void;
  selectAll: () => void;
  clearAll: () => void;
  getSelectedVariantsForMedication: (medicationId: string) => SelectedVariant[];
  prices: Record<string, string>;
  setPrices: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isVariantSelected: (medicationId: string, variantId: string) => boolean;
  getFilteredMedications: () => Medication[];
}

const MedicationContext = createContext<MedicationContextType | undefined>(
  undefined
);

export function MedicationProvider({ children }: { children: ReactNode }) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariant[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [prices, setPrices] = useState<Record<string, string>>({});

  const toggleVariant = (medication: Medication, variant: ProductVariant) => {
    setSelectedVariants((prev) => {
      const existingIndex = prev.findIndex(
        (sv) => sv.medicationId === medication.id && sv.variantId === variant.id
      );

      if (existingIndex >= 0) {
        return prev.filter((_, index) => index !== existingIndex);
      } else {
        // Add variant
        return [
          ...prev,
          {
            medicationId: medication.id,
            variantId: variant.id,
            medication,
            variant,
          },
        ];
      }
    });
  };

  const selectAllMedication = (medication: Medication) => {
    setSelectedVariants((prev) => {
      const medicationVariants = medication.productVariants.map((variant) => ({
        medicationId: medication.id,
        variantId: variant.id,
        medication,
        variant,
      }));

      // Remove existing variants for this medication
      const filteredVariants = prev.filter(
        (sv) => sv.medicationId !== medication.id
      );
      return [...filteredVariants, ...medicationVariants];
    });
  };

  const deselectAllMedication = (medicationId: string) => {
    setSelectedVariants((prev) =>
      prev.filter((sv) => sv.medicationId !== medicationId)
    );
  };

  const selectAll = () => {
    const allVariants: SelectedVariant[] = [];
    medications.forEach((medication) => {
      medication.productVariants.forEach((variant) => {
        allVariants.push({
          medicationId: medication.id,
          variantId: variant.id,
          medication,
          variant,
        });
      });
    });
    setSelectedVariants(allVariants);
  };

  const clearAll = () => {
    setSelectedVariants([]);
  };

  const getSelectedVariantsForMedication = (medicationId: string) => {
    return selectedVariants.filter((sv) => sv.medicationId === medicationId);
  };

  const isVariantSelected = (medicationId: string, variantId: string) => {
    return selectedVariants.some(
      (sv) => sv.medicationId === medicationId && sv.variantId === variantId
    );
  };

  const getFilteredMedications = () => {
    if (!searchQuery.trim()) return medications;

    return medications.filter((medication) =>
      medication.drugName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const value: MedicationContextType = {
    medications,
    selectedVariants,
    searchQuery,
    setMedications,
    setSearchQuery,
    toggleVariant,
    selectAllMedication,
    deselectAllMedication,
    selectAll,
    clearAll,
    getSelectedVariantsForMedication,
    isVariantSelected,
    getFilteredMedications,
    prices,
    setPrices,
  };

  return (
    <MedicationContext.Provider value={value}>
      {children}
    </MedicationContext.Provider>
  );
}

export function useMedication() {
  const context = useContext(MedicationContext);
  if (context === undefined) {
    throw new Error("useMedication must be used within a MedicationProvider");
  }
  return context;
}
