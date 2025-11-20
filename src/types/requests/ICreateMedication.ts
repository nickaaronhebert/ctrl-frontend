export interface MedicationCatalogue {
  drugName: string;
  isCompound: boolean;

  dosageForm: string;
  //   route: string;
  indications?: string[];
  category: string;
  clinicalInstructions?: string;
  // condition: string;
  tags?: string[];
  activeIngredients: {
    name: string;
    // strength: string;
  }[];
  variants: {
    strength: string;
    quantityType: string;
    containerQuantity: number;
    telegraProductVariant?: string;
  }[];
  // availableQuantities: (number | undefined)[];
}

export interface ICreateMedicationCatalogue extends MedicationCatalogue {}
export interface IEditMedicationCatalogue {
  data: MedicationCatalogue;
  id: string;
}
