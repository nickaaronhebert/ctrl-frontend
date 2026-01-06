export interface ICreateShippingRequest {
  name: string;
  description?: string;
  services: {
    carrier: string;
    serviceType: string;
    carrierProductCode: string;
    price: number;
    deliveryWindow: string;
    signatureType: string;
    refrigerated: boolean;
    tempMonitor: boolean;
    weekendDelivery: boolean;
    saturdayPickup: boolean;
    holdAtLocation: boolean;
    hazmat: boolean;
    oversize: boolean;
  };
}
