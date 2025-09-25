import type { Address } from "../global/commonTypes";

export interface ICreateOrderRequest {
  patient: string;
  address: Address;
  transmissionMethod: "manual" | "auto";
  prescriptions: {
    quantity: number;
    provider: string;
    productVariant: string;
    daysSupply: number;
    // pharmacy: string;
    notes?: string;
    instructions?: string;
    // isManualTransmission: boolean;
  }[];
}
