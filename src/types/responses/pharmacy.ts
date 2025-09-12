export interface Pharmacy {
  type: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: "active" | "inactive";
  allowedStates: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface PharmacyResponse {
  data: Pharmacy[];
  message: string;
  code: string;
}

export interface PharmacyMedicationResponse {
  data: PharmacyData[];
  meta?: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}

export interface PharmacyData {
  id: string;
  name: string;
  phone: string;
  productvariants: ProductVariantEntry[];
}

export interface ProductVariantEntry {
  pharmacy: string;
  inStock: boolean;
  price: number;
  medicationCatalogue: {
    id: string;
    drugName: string;
    pharmacy: string;
  };
  productVariant: {
    strength: string;
    quantityType: string;
    containerQuantity: number;
  };
}

export interface PharmacyResultsProps {
  data: PharmacyMedicationResponse;
}
