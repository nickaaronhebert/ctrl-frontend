import type { Pharmacy } from "@/components/data-table/columns/recentTransmissions";
import type { Patient, ProductVariant } from "../global/commonTypes";
import type { PaginationMeta } from "./pagination";

export interface PrescriptionDetails {
  pharmacy: Pharmacy;
  patient: Patient & {
    patientId: string;
  };
  productVariant: ProductVariant;
  prescriptionId: string;
  quantity: number;
  createdAt: string;
  id: string;
}

export interface IViewAllPrescriptions {
  data: PrescriptionDetails[];
  meta: PaginationMeta;
}
