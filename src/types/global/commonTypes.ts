import { type Permission } from "@/components/Permissions/permissions";
import type { ProductVariantDetails } from "../responses/transmission";

export interface UserPermission {
  action: Permission;
  resource: string;
  slug: string;
  id: string;
}

export interface Role {
  name: string;
  permissions: UserPermission[];
  id: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export const PROVIDER_STATUS = {
  INVITED: "invited",
  INVITATION_ACCEPTED: "invitation_accepted",
  MED_SUBMITTED: "med_submitted",
};
export interface Patient {
  firstName: string;
  lastName: string;
  dob: string;
  state?: string;
  zipcode: string;
  gender: string;
  phoneNumber: string;
  email: string;
  id: string;
}

export interface Pharmacy {
  name: string;
  email: string;
  phoneNumber: string;
  address?: string;
  id: string;
}

export interface MedicationCatalogue {
  drugName: string;
  isCompound: boolean;
  dosageForm: string;
  category: string;
  condition: string;
  id: string;
}

export interface ProductVariant {
  medicationCatalogue: MedicationCatalogue;
  strength: string;
  quantityType: string;
  containerQuantity: number;
  id: string;
}

export interface Provider {
  firstName: string;
  lastName: string;
  email: string;
  npi: string;
  phoneNumber: string;
  id: string;
  medicalLicense: { state: string; licenseNumber: string; _id: string }[];
}

export interface Prescription {
  productVariant: ProductVariant;
  quantity: number;
  notes: string;
  instructions: string;
  status: string;
  isManualTransmission: boolean;
  provider: Provider;
  id: string;
  prescriptionId: string;
  amount: number;
}

export interface Transmission {
  pharmacy: Pharmacy;
  prescriptions: Prescription[];
  status: string;
  id: string;
  transmissionId: string;
  amount: number;
}

// Pharmacy Transmission //
export type PharmacyTransmissionRow = {
  id: string;
  transmissionId: string;
  status: string;
  providers: Provider;
  patient: Patient;
  productVariants: ProductVariantDetails[];
  // prescriptions: Prescription[];
  amount: number;
};

// Invoice one //
export type InvoiceRow = {
  transmissionId: string;
  date: Date;
  amount: number;
  affiliate: {
    name: string;
    id: string;
  };
};

export interface Order {
  orderId: string;
  amount: string;
  status: string;
  patient: Patient;
  transmissions: Transmission[];
  id: string;
  createdAt: string;
}

export interface CardDetails {
  cardHolderName: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  cardBrand: string;
  paymentMethodId: string;
  user: string;
  zipCode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface MetaData {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
