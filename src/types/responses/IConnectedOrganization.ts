import type { Address } from "../global/commonTypes";
import type { PaginationMeta } from "./pagination";

interface Organization {
  name: string;
  email: string;
  phoneNumber: string;
  address: Address;
  id: string;
}

export interface ConnectedOrganization {
  status: string;
  organization: Organization;
  invitation: string;
  isAffiliationActive?: boolean;
  invoiceFrequency?: string;
}
export interface IConnectedOrganizationResponse {
  data: ConnectedOrganization[];

  meta: PaginationMeta;
}
