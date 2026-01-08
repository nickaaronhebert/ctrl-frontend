export interface IViewTransmissionFulfillmentStats {
  data: {
    total: number;
    stats: {
      status:
        | "PROCESSING"
        | "IN_SHIPPING"
        | "SHIPPED"
        | "PICKED_UP"
        | "EXCEPTION"
        | "CANCELLED";

      count: number;
    }[];
  };
}
