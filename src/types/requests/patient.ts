import type { Address } from "../global/commonTypes";

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
  addresses: Address[];
  height: number;
  weight: number;
}

export interface ICreatePatientRequest extends Patient {}

type UpdatePatientPayload = Omit<Patient, "email">;
export interface IUpdatePatientRequest extends UpdatePatientPayload {
  id: string;
}
