import type { Business, User } from "../global/commonTypes";
import type { UserDetails } from "./user-details";

export interface LoginResponse {
  data: {
    access_token: string;
    user: User;
  };
  statusCode: number;
}

export interface SSOProviderOnboardResponse {
  providerId: string;
  providerToken: string;
  affiliation: {
    orgId: string;
    status: "active" | "pending";
  };
}

export interface LogoutResponse {
  success: boolean;
}

export interface RequestPasswordResetResponse {
  access_token: string;
  statusCode: number;
}

export interface ResetPasswordResponse {
  access_token: string;
}

export interface EditProfileResponse extends UserDetails {
  phoneNumber: string;
  password: string;
  business: Business;
  organizations: string[];
  medicalLicense: string[];
  deaNumber: string[];
  otpSecret: string;
  emailOtpSecret: string;
  createdAt: Date;
  updatedAt: Date;
}
