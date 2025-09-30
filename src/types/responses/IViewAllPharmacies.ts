import type { PaginationMeta } from "./pagination";

export interface CtrlPharmacy {
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  stripeAccountId?: string;
  status: string;
  id: string;
}
export interface IViewAllPharmaciesResponse {
  data: CtrlPharmacy[];
  meta: PaginationMeta;
}
