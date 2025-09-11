import type { Invoices, MetaData } from "../global/commonTypes";

export type OrganizationInvoices = Pick<
  Invoices,
  | "transmissionCode"
  | "status"
  | "createdAt"
  | "id"
  | "pharmacy"
  | "totalAmount"
>;
export interface IViewAllInvoices {
  data: OrganizationInvoices[];
  meta: MetaData;
}
