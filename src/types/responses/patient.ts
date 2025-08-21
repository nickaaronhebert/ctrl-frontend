import type { Patient } from "../global/commonTypes";

export type PatientDetails = Omit<Patient, "state"> & {
  createdAt: string;
  updatedAt: string;
  height: number;
  weight: number;
  address: string;
  patientId: string;
};

export interface PatientMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PatientApiResponse {
  data: PatientDetails[];
  meta: PatientMeta;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  itemCount: number;
  limit: number;
  page: number;
  pageCount: number;
}

export interface ICreatePatientApiResponse {
  message: string;
  code: string;
}

export type SelectedPatientDetails = PatientDetails & {
  medicationAllergies: string;
  currentMedications: string;
};
export interface IGetPatientDetailsByIdResponse {
  data: SelectedPatientDetails;
}
