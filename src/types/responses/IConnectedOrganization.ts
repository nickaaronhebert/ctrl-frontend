import type { BillingFrequency } from "@/components/dialog/action";
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

export interface OrganizationResponse {
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    status: string;
    invoiceFrequency: BillingFrequency;
    invitation: string;
  };
}
