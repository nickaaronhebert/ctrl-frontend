export interface LoginRequest {
  username: string;
  password: string;
}

export interface RequestPasswordResetRequest {
  email: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface EditProfileRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  organizationName?: string;
  pharmacyName?: string;
}

export interface ResendOtpRequest {
  username: string;
  password: string;
}
