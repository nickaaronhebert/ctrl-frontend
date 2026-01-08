export type PharmacyTrackingStatus =
  | "PROCESSING"
  | "IN_SHIPPING"
  | "SHIPPED"
  | "EXCEPTION"
  | "CANCELLED"
  | "PICKED_UP";

export interface PharmacyDetails {
  name: string;
  address: {
    address1: string;
  };
}

export interface PatientDetails {
  firstName: string;
  lastName: string;
  addresses: {
    address1: string;
  };
}

export type PrescriptionItem = {
  prescriptionId: string;
  productVariant: string;
  quantity: number;
  provider: string;
  createdBy: string;
  pharmacy: string;
  organization: string;
  order: string;
  amount: number;
  patient: string;
  daysSupply: number;
  clinicalDifference: string;
  instructions: string;
  status: string;
  pharmacyCatalogue: string;
  pharmacyCataloguePrice: number;
  createdAt: string;
  updatedAt: string;
};

export interface PharmacyTracking {
  PROCESSING: string | null;
  IN_SHIPPING: string | null;
  SHIPPED: string | null;
  EXCEPTION: string | null;
  CANCELLED: string | null;
  PICKED_UP: string | null;
}

export interface ShippingDetails {
  trackingNumber: string;
  shippingCompany: string;
  trackingUrl: string;
  shipped: boolean;
}

export interface FulfillmentData {
  _id: string;
  transmissionId: string;
  pharmacy: PharmacyDetails;
  patient: PatientDetails;
  organization: {
    name: string;
  };
  subOrganization?: {
    name: string;
  };
  status: string;
  prescriptions: PrescriptionItem[];
  pharmacyTracking: PharmacyTracking;
  pharmacyStatus: PharmacyTrackingStatus;
  createdAt: string;
  lastStatusReceived: string;
  shippingDetails: ShippingDetails;
}

export interface FulfillmentTrackingResponse {
  data: FulfillmentData;
  message: string;
  code: string;
}
