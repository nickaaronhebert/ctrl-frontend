export interface IShippingDetailResponse {
  message: string;
  code: string;
  data: {
    name: string;
    description?: string;
    services: {
      carrier: "UPS" | "FEDEX" | "USPS" | "DHL" | "Custom Carrier";
      serviceType:
        | "STANDARD"
        | "TWO_DAY"
        | "OVERNIGHT"
        | "SAME_DAY"
        | "REFRIGERATED"
        | "CUSTOM";
      carrierProductCode: string;
      price: number;
      refrigerated: boolean;
      hazmat: boolean;
      weekendDelivery: boolean;
      saturdayPickup: boolean;
      holdAtLocation: boolean;
      signatureType: string;
      tempMonitor: boolean;
      oversize: boolean;
      overweight: boolean;
      deliveryWindow: string;
    };
  };
  isDefault: boolean;
}
