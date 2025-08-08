import type {
  MedicationCatalogue,
  ProductVariant,
  Transmission,
} from "../global/commonTypes";
import type { PaginationMeta } from "./pagination";

type MedicationCatalogueDetails = Omit<
  MedicationCatalogue,
  "category" | "condition"
>;
export type ProductVariantDetails = Omit<
  ProductVariant,
  "medicationCatalogue"
> & {
  medicationCatalogue: MedicationCatalogueDetails;
};
export type TransmissionDetails = Transmission & {
  amount: string;
  productVariants: ProductVariantDetails;
};

export interface IViewAllTransmissionsResponse {
  data: TransmissionDetails[];
  meta: PaginationMeta;
}

export interface IViewAllTransmissionsRequest {
  page: number;
  perPage: number;
}
