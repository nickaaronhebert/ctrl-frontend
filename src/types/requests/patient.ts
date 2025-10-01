import type { Address } from "../global/commonTypes";

type PatientAddress = Omit<Address, "_id">;
interface Patient {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  medicationAllergies?: string;
  currentMedications?: string;
  diagnosedConditions?: string;
  gender: string;
  phoneNumber: string;
  addresses: PatientAddress[];
  height: number;
  weight: number;
}

export interface ICreatePatientRequest extends Patient {}

type UpdatePatientPayload = Omit<Patient, "email">;
export interface IUpdatePatientRequest extends UpdatePatientPayload {
  id: string;
}
