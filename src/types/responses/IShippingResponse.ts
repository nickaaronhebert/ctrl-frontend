export interface Shipping {
  id: string;
  name: string;
  isDefault?: boolean;
  services: {
    carrier: "UPS" | "FEDEX" | "USPS" | "DHL" | "Custom Carrier";
    carrierProductCode: string;
    serviceType:
      | "STANDARD"
      | "TWO_DAY"
      | "OVERNIGHT"
      | "SAME_DAY"
      | "REFRIGERATED"
      | "CUSTOM";
    price: number;
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
