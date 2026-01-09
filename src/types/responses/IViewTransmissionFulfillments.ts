import type { PaginationMeta } from "./pagination";

export interface IFulfillmentTracking {
  id: string;
  _id?: string;
  transmissionId: string;
  pharmacy: {
    name: string;
  };
  lastStatusReceived: string;

  pharmacyStatus:
    | "PROCESSING"
    | "IN_SHIPPING"
    | "SHIPPED"
    | "PICKED_UP"
    | "EXCEPTION"
    | "CANCELLED";
  createdAt: string;
  shippingDetails: {
    trackingNumber: string;
    shippingCompany: string;
    trackingUrl: string;
  };
}

export interface IViewFulfillmentTrackingResponse {
  data: IFulfillmentTracking[];
  meta: PaginationMeta;
}
