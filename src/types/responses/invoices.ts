import type { Transaction } from "../global/commonTypes";

export interface PharmacyInvoiceResponse {
  data: Array<{
    transaction: Transaction;
    transferStatus: string;
    pharmacy: string;
    organization: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  }>;
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
