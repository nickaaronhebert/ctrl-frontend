import type { Address } from "../global/commonTypes";

export interface ICreateOrderRequest {
  patient: string;
  address: Address;
  prescriptions: {
    quantity: number;
    provider: string;
    productVariant: string;
    // pharmacy: string;
    notes?: string;
    instructions?: string;
    isManualTransmission: boolean;
  }[];
}
