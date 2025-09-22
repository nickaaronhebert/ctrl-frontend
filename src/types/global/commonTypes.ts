import { type Permission } from "@/components/Permissions/permissions";

export interface UserPermission {
  action: Permission;
  resource: string;
  slug: string;
  id: string;
}

export interface Address {
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  isDefault: boolean;
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

// export type Address = {
//   address1: string;
//   address2: string;
//   city: string;
//   country: string;
//   isDefault: boolean;
//   state: string;
//   zipcode: string;
//   _id: string;
// };
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
  addresses: Address[];
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

// export interface Invoices {
//   transmissionCode: string;
//   totalAmount: string;
//   id: string;
//   createdAt: string;
//   pharmacy: {
//     name: string;
//     phoneNumber: string;
//   };
// }

// export interface Invoices {
//   transmissionCode: string;
//   totalAmount: string;
//   id: string;
//   createdAt: string;
//   pharmacy: {
//     name: string;
//     phoneNumber: string;
//     email: string;
//     id: string;
//     address: string;
//   };
//   medicationFee: string;
//   applicationFee: string;
//   status: string;
//   lineItems: {
//     quantity: number;
//     productVariantPrice: number;
//     productVariant: ProductVariant;
//   }[];
//   card: {
//     last4: string;
//     id: string;
//   };
//   paymentIntent: string;
// }

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
  statusUpdatedAt?: string;
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
  prescriptions: Prescription[];
  amount: number;
  createdAt: string;
};

// Invoice one //
export type InvoiceRow = {
  transmissionId: string;
  date: Date;
  amount: number;
  affiliate: {
    firstName: string;
    lastName: string;
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
  transmissionMethod: string;
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

export interface Invoices {
  transmissionCode: string;
  totalAmount: number;
  id: string;
  createdAt: string;
  pharmacy: {
    name: string;
    phoneNumber: string;
    email: string;
    id: string;
    address: string;
  };
  medicationFee: string;
  applicationFee: string;
  status: string;
  lineItems: {
    quantity: number;
    productVariantPrice: number;
    productVariant: ProductVariant;
  }[];
  card: {
    last4: string;
    id: string;
  };
  paymentIntent: string;
}

export interface MetaData {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Define the structure of a Line Item
export interface LineItem {
  productVariantPrice: number;
  quantity: number;
  productVariant: ProductVariant;
  pharmacyCatalogue: string;
  totalPrice: number;
  prescription: string;
  prescriptionCode: string;
  _id: string;
}

// Define the structure of the Transaction
export interface Transaction {
  order: string;
  orderCode: string;
  transmission: string;
  transmissionCode: string;
  pharmacy: string;
  organization: string;
  lineItems: LineItem[];
  medicationFee: number;
  applicationFee: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentIntent: string;
  id: string;
}

// Define the structure of the Transfer
export interface Transfer {
  transferStatus: string;
  pharmacy: string;
  organization: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface PharmacyInvoices {
  transaction: Transaction;
  transferStatus: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  stripeTransferId: string;
}

export interface ApiError {
  data?: {
    message?: string | string[];
  };
}
