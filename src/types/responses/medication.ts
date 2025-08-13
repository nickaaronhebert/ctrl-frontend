export interface ProductVariant {
  id: string;
  strength: string;
  quantityType: string;
  containerQuantity: number;
}

export interface Medication {
  id: string;
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
