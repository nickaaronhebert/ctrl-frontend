interface Patient {
  firstName: string;
  lastName: string;
  dob: string;
  medicationAllergies?: string;
  currentMedications?: string;
  diagnosedConditions?: string;
  gender: string;
  phoneNumber: string;
  address: string;

  height: number;
  weight: number;
}

export interface ICreatePatientRequest extends Patient {}

export interface IUpdatePatientRequest extends Patient {
  id: string;
}
