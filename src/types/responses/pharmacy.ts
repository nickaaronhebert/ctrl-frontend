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
