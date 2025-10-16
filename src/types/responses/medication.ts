export interface ProductVariant {
  id: string;
  strength: string;
  quantityType: string;
  containerQuantity: number;
}

export interface Medication {
  id: string;
  _id: string;
  drugName: string;
  productVariants: ProductVariant[];
  dosageForm: string;
  category: string;
}

export interface MedicationCatalogueMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface MedicationCatalogueResponse {
  data: Medication[];
  meta: MedicationCatalogueMeta;
}

export interface PharmacyMedicationCatalogue {
  _id: string;
  drugName: string;
}

export interface PharmacyProductVariant {
  _id: string;
  price: number;
  pharmacyIdentifier?: string;
  productVariant: {
    _id: string;
    strength: string;
    containerQuantity: number;
    quantityType: string;
    name?: string;
  };
}

export interface PharmacyCatalogue {
  _id: string;
  medicationCatalogue: PharmacyMedicationCatalogue;
  productVariant: PharmacyProductVariant[];
}

export interface PharmacyCatalogueResponse {
  data: PharmacyCatalogue[];
  meta?: MedicationCatalogueMeta;
}

export interface MedicationCatalogueCardProps {
  data: PharmacyCatalogueResponse;
}
