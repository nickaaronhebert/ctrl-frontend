import type { PaginationMeta } from "./pagination";

export interface CtrlOrganization {
  name: string;
  id: string;
  email: string;
  phoneNumber: string;
  isTelegraTrustedPartner?: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface IListAllOrganizationsResponse {
  data: CtrlOrganization[];
  meta: PaginationMeta;
}
