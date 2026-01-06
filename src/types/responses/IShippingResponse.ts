export interface Shipping {
  name: string;
  services: {
    carrier: string;
    carrierProductCode: string;
    serviceType: string;
    price: string;
  };
}

export interface ShippingResponse {
  data: Shipping[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  code: string;
}
