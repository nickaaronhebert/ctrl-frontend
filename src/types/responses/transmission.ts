import type {
  MedicationCatalogue,
  PharmacyTransmissionRow,
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

interface IndividualTranmissionDetails extends Transmission {
  createdAt: string;
}

export interface IViewAllTransmissionsResponse {
  data: TransmissionDetails[];
  meta: PaginationMeta;
}
export interface IViewAllPharmacyTransmissionsResponse {
  data: PharmacyTransmissionRow[];
  meta: PaginationMeta;
}

export interface IViewAllTransmissionsRequest {
  page: number;
  perPage: number;
  q?: string;
  activeStatus?: "Created" | "Processing" | "Queued" | "Transmitted";
}

export interface IViewTransmissionByIdResponse {
  data: IndividualTranmissionDetails;
}
