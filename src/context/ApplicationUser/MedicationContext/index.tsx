import type { MedicationCatalogue } from "@/types/global/commonTypes";
import { type PharmacyCatalogue } from "@/types/responses/medication";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface ProductVariant {
  strength: string;
  quantityType: string;
  containerQuantity: number;
  id: string;
  name?: string;
  medicationCatalogue: MedicationCatalogue;
  _id: string;
  price?: number;
  sku?: string;
  productVariant: ProductVariant;
  supplies: {
    supply: {
      _id: string;
      name: string;
      price: string;
      quantity: number;
    };
  }[];
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
  medication: Medication | PharmacyCatalogue;
  variant: ProductVariant;
  // catalogue?: PharmacyCatalogue;
}

export interface VariantShippingSuppliesConfig {
  shippingProfile: string;
  supplies: {
    supply: string;
    supplyRequired: "REQUIRED" | "OPTIONAL";
    quantity: number;
    isOnePerOrder: boolean;
  }[];
}

interface MedicationContextType {
  medications: Medication[];
  catalogues: PharmacyCatalogue[];
  pharmacyCatalogueId: string;
  configuredVariantIds: string[];
  setConfiguredVariantIds: React.Dispatch<React.SetStateAction<string[]>>;
  setPharmacyCatalogueId: React.Dispatch<React.SetStateAction<string>>;
  setCatalogues: React.Dispatch<React.SetStateAction<PharmacyCatalogue[]>>;
  variantShippingSupplies: Record<string, VariantShippingSuppliesConfig>;
  setVariantShippingSupplies: React.Dispatch<
    React.SetStateAction<Record<string, VariantShippingSuppliesConfig>>
  >;
  selectedVariants: SelectedVariant[];
  setSelectedVariants: React.Dispatch<React.SetStateAction<SelectedVariant[]>>;
  configuredVariants: SelectedVariant[];
  setConfiguredVariants: React.Dispatch<
    React.SetStateAction<SelectedVariant[]>
  >;
  searchQuery: string;
  setMedications: (medications: Medication[]) => void;
  setSearchQuery: (query: string) => void;
  toggleVariant: (medication: Medication, variant: ProductVariant) => void;
  toggleCatalogueVariant: (
    catalogue: PharmacyCatalogue,
    variant: ProductVariant
  ) => void;
  selectAllMedication: (medication: Medication) => void;
  deselectAllMedication: (medicationId: string) => void;
  selectAllCatalogue: (catalogue: PharmacyCatalogue) => void;
  deselectAllCatalogue: (catalogueId: string) => void;
  selectAll: () => void;
  clearAll: () => void;
  allCatalogues: () => void;
  getSelectedVariantsForMedication: (medicationId: string) => SelectedVariant[];
  prices: Record<string, string>;
  setPrices: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isVariantSelected: (medicationId: string, variantId: string) => boolean;
  getFilteredMedications: () => Medication[];
  getFilteredCatalogues: () => PharmacyCatalogue[];
  isCatalogueVariantSelected: (
    catalogueId: string,
    variantId: string
  ) => boolean;
}

const MedicationContext = createContext<MedicationContextType | undefined>(
  undefined
);

export function MedicationProvider({ children }: { children: ReactNode }) {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [variantShippingSupplies, setVariantShippingSupplies] = useState<
    Record<string, VariantShippingSuppliesConfig>
  >({});
  const [catalogues, setCatalogues] = useState<PharmacyCatalogue[]>([]);
  const [configuredVariants, setConfiguredVariants] = useState<
    typeof selectedVariants
  >([]);
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariant[]>(
    []
  );
  console.log("Configured variants: ", configuredVariants);
  const [pharmacyCatalogueId, setPharmacyCatalogueId] = useState<string>("");
  const [configuredVariantIds, setConfiguredVariantIds] = useState<string[]>(
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

  const toggleCatalogueVariant = (
    catalogue: PharmacyCatalogue,
    variant: any
  ) => {
    setSelectedVariants((prev) => {
      const existingIndex = prev.findIndex(
        (sv) =>
          sv.medicationId === catalogue._id && sv.variantId === variant._id
      );

      if (existingIndex >= 0) {
        return prev.filter((_, index) => index !== existingIndex);
      } else {
        // Add variant
        return [
          ...prev,
          {
            medicationId: catalogue._id,
            variantId: variant._id,
            variant,
            medication: catalogue as any,
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

  const selectAllCatalogue = (catalogue: PharmacyCatalogue) => {
    setSelectedVariants((prev: any) => {
      const catalogueVariants = catalogue.productVariant.map((variantObj) => ({
        medicationId: catalogue._id,
        variantId: variantObj._id,
        medication: catalogue,
        variant: variantObj,
      }));

      // Remove existing variants for this catalogue
      const filteredVariants = prev.filter(
        (sv: any) => sv.medicationId !== catalogue._id
      );

      return [...filteredVariants, ...catalogueVariants];
    });
  };

  const deselectAllCatalogue = (catalogueId: string) => {
    setSelectedVariants((prev) =>
      prev.filter((sv) => sv.medicationId !== catalogueId)
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

  const allCatalogues = () => {
    const allVariants: SelectedVariant[] = [];
    catalogues.forEach((catalogue) => {
      catalogue.productVariant.forEach((variant: any) => {
        allVariants.push({
          medicationId: catalogue._id,
          variantId: variant._id,
          variant: variant,
          medication: catalogue,
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

  const isCatalogueVariantSelected = (
    catalogueId: string,
    variantId: string
  ) => {
    return selectedVariants.some(
      (sv) => sv.medicationId === catalogueId && sv.variantId === variantId
    );
  };

  const getFilteredMedications = () => {
    if (!searchQuery.trim()) return medications;

    return medications.filter((medication) =>
      medication.drugName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getFilteredCatalogues = () => {
    if (!searchQuery.trim()) return catalogues;
    return catalogues.filter((catalogue) =>
      catalogue.medicationCatalogue.drugName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  };

  console.log("ConfiguredVariants", configuredVariants);
  console.log(
    "Variant Shipping Supplies Configuration",
    variantShippingSupplies
  );

  const value: MedicationContextType = {
    medications,
    selectedVariants,
    configuredVariants,
    setConfiguredVariants,
    searchQuery,
    setMedications,
    setSearchQuery,
    toggleVariant,
    toggleCatalogueVariant,
    pharmacyCatalogueId,
    setPharmacyCatalogueId,
    selectAllMedication,
    deselectAllMedication,
    configuredVariantIds,
    setConfiguredVariantIds,
    selectAll,
    clearAll,
    getSelectedVariantsForMedication,
    isVariantSelected,
    getFilteredMedications,
    isCatalogueVariantSelected,
    selectAllCatalogue,
    deselectAllCatalogue,
    setSelectedVariants,
    catalogues,
    allCatalogues,
    setCatalogues,
    getFilteredCatalogues,
    prices,
    setPrices,
    variantShippingSupplies,
    setVariantShippingSupplies,
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
