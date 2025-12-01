// All invoices response below //

import type { Transaction } from "../global/commonTypes";

export interface Invoice {
  invoiceId: string;
  pharmacy: string;
  organization: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: string;
  subOrganization?: string;
}

export interface InvoicesApiResponse {
  data: Invoice[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

// Detail response by id //

export type InvoiceDetail = {
  id: string;
  invoiceId: string;
  pharmacy: {
    id: string;
    name: string;
    applicationFee: number;
  };
  organization: {
    id: string;
    name: string;
  };
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: string;
  stripeAccountId: string;
  stripeConnectOnboardingStatus: string;
  applicationFee: number;
  medicationFee: number;
  transactions: Transaction[];
  stripeHostedInvoiceUrl: string;
  subOrganization?: string;
};
