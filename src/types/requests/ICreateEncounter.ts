export interface ICreateEncounter {
  patient: string;
  encounterProduct: string;
  notes?: string;
  subOrganization?: string;
  transmissionMethod?: string;
  prescriptions?: {
    quantity: number;
    provider: string;
    productVariant: string;
    pharmacy?: string;
    notes: string;
    instructions: string;
    daysSupply: number;
    clinicalDifference?: string;
  }[];
  address?: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    isDefault: boolean;
  };
}
