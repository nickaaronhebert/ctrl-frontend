import { type Permission } from "@/components/Permissions/permissions";

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

export interface Business {
  id: string;
  type: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: "active" | "inactive" | string;
  createdBy: Record<string, any>;
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
  state: string;
  zipcode: string;
  gender: string;
  phoneNumber: string;
  email: string;
  _id: string;
}

export interface Pharmacy {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  id: string;
}

export interface MedicationCatalogue {
  drugName: string;
  isCompund: boolean;
  dosageForm: string;
  category: string;
  condition: string;
  _id: string;
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
  quantity: string;
  notes: string;
  instructions: string;
  status: string;
  isManualTransmission: boolean;
  provider: Provider;
  id: string;
  prescriptionId: string;
  amount: string;
}

export interface Transmission {
  pharmacy: Pharmacy;
  prescriptions: Prescription[];
  status: string;
  id: string;
  transmissionId: string;
}

export interface Order {
  orderId: string;
  amount: string;
  status: string;
  patient: Patient;
  transmissions: Transmission[];
  id: string;
  createdAt: string;
}
