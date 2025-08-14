export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string; // ISO date string
  zipcode: string;
  email: string;
  gender: string;
  phoneNumber: string;
  organization: string;
  keywords: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface PatientMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PatientApiResponse {
  data: Patient[];
  meta: PatientMeta;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  limit: number;
  page: number;
  pageCount: number;
}
