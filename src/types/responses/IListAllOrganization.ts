import type { PaginationMeta } from "./pagination";

export interface CtrlOrganization {
  name: string;
  id: string;
  email: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface IListAllOrganizationsResponse {
  data: CtrlOrganization[];
  meta: PaginationMeta;
}
