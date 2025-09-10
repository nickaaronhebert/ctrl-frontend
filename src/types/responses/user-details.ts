import type { Role } from "../global/commonTypes";

export interface UserDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  npi?: string;
  role: Role;
  isEmailVerified: string;
  organisations: string[];
  providerStatus?: string;
  medicalLicense?: MedicalLicense[];
  deaNumber: DeaCredentials[];
  affiliations: Affiliation[];
  pharmacy: {
    stripeAccountId: string;
    allowedStates: string[];
    name: string;
    _id: string;
  };
}

export interface MedicalLicense {
  _id: string;
  state: string;
  licenseNumber: string;
}

export interface DeaCredentials {
  _id: string;
  state: string;
  registrationNumber: string;
}

export interface Affiliation {
  business: {
    name: string;
  };
  _id: string;
  type: string;
  status: string;
  isAffiliationActive: boolean;
}

export interface IUserResponse {
  data: {
    message: string;
    data: UserDetails;
    statusCode: number;
  };
}
