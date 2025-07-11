import type { User } from "../global/commonTypes";

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
