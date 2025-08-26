export interface ICreateOrderRequest {
  patient: string;
  prescriptions: {
    quantity: number;
    provider: string;
    productVariant: string;
    pharmacy: string;
    notes?: string;
    instructions?: string;
    isManualTransmission: boolean;
  }[];
}
