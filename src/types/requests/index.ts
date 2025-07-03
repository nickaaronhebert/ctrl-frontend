export interface LoginRequest {
  username: string;
  password: string;
}

export interface SSOProviderOnboardRequest {
  ssoToken: string;
  orgId: string;
}

export interface SSOProviderTokenPayload {
  email: string;
  externalProviderId: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}
