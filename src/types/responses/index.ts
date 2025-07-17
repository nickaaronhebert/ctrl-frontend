import type { Business, User } from "../global/commonTypes";
import type {
  DeaCredentials,
  MedicalLicense,
  UserDetails,
} from "./user-details";

export interface LoginResponse {
  data: {
    access_token: string;
    user: User;
  };
  statusCode: number;
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

export interface ResendOtpResponse {
  message: string;
}

export interface EditProfileResponse extends UserDetails {
  phoneNumber: string;
  password: string;
  business: Business;
  organizations: string[];
  medicalLicense: MedicalLicense[];
  deaNumber: DeaCredentials[];
  otpSecret: string;
  emailOtpSecret: string;
  createdAt: Date;
  updatedAt: Date;
}
