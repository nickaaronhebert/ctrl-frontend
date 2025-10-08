export interface ICommonSearchQuery {
  page: number;
  perPage: number;
  q?: string;
  patient?: string;
  type?:
    | "Prescription"
    | "Order"
    | "Transmission"
    | "AccessControl"
    | "ProductVariant"
    | "Invitation"
    | "Provider Group Invitation"
    | "Payment";
  startDate?: string;
  endDate?: string;
  status?: string;
  isConnected?: boolean;
}
