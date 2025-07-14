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
  providerStatus?: string;
}

export interface IUserResponse {
  data: {
    message: string;
    data: UserDetails;
    statusCode: number;
  };
}
