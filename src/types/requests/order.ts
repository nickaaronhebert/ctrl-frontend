import type { Address } from "../global/commonTypes";

export interface ICreateOrderRequest {
  patient: string;
  address: Omit<Address, "_id">;
  transmissionMethod: "manual" | "auto";
  subOrganization?: string;
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
