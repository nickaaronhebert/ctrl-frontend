import type { Pharmacy } from "./pharmacy";

type MedicationCatalogue = {
  drugName: string;
  dosageForm: string;
  id: string;
};

type ProductVariant = {
  medicationCatalogue: MedicationCatalogue;
  strength: string;
  quantityType: string;
  containerQuantity: number;
  id: string;
};

type DefaultPharmacy = {
  [state: string]: Pharmacy;
};

export type DataItem = {
  productVariant: ProductVariant;
  organization: string;
  createdAt: Date;
  defaultPharmacy: DefaultPharmacy;
  pharmacySelectionMethod: string;
  status: string;
  updatedAt: Date;
  id: string;
};

type Meta = {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type AccessResponse = {
  data: DataItem[];
  meta: Meta;
};

export type SingleAccessResponse = {
  data: DataItem;
  meta: Meta;
};
