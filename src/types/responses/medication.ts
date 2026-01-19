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
  defaultPrice?: number;
  newPrice?: number;
  pharmacyCatalogue?: {
    _id?: string;
  };
  pharmacyIdentifier?: string;
  primaryPharmacyIdentifier?: string;
  pharmacyDescriptor?: string;
  secondaryPharmacyIdentifier?: string;
  drugForm?: string;
  scheduleCode?: string;
  shippingClass?: string;
  drugStrength?: string;
  pharmacy: string;
  sku: string;
  transmissionMethod: string;
  productVariant: {
    _id: string;
    strength: string;
    containerQuantity: number;
    quantityType: string;
    name?: string;
    medicationCatalogue?: string;
    telegraProductVariant?: string;
  };
  shippingProfile?: {
    _id: string;
    name: string;
  };
  supplies?: {
    supply: string;
    quantity: number;
    supplyRequired: "REQUIRED" | "OPTIONAL";
    isOnePerOrder?: boolean;
  }[];
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
  id?: string;
}
