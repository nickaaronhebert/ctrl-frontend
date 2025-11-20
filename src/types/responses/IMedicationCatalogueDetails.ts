export interface MedicationCatalogueDetails {
  compoundBaseDrug: string;
  drugName: string;
  isCompound: boolean;
  tags: string[];
  activeIngredients: {
    name: string;
    strength?: string;
    _id: string;
  }[];
  category: string;
  dosageForm: string;
  route: string;
  indications: string[];
  id: string;
  createdAt: string;
  updatedAt: string;
  productVariants: {
    strength: string;
    quantityType: string;
    containerQuantity: number;
    id: string;
    telegraProductVariant?: string;
  }[];
}

export interface IGetMedicationCatalogueDetailsResponse {
  data: MedicationCatalogueDetails;
}

//   indications?: string[];
//   category: string;
//   clinicalInstructions?: string;
//   // condition: string;

//   variants: {
//     strength: string;
//     quantityType: string;
//     containerQuantity: number;
//   }[];
