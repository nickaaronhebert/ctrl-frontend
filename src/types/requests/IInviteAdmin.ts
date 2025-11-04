export interface IInviteOrgAdminRequest {
  email: string;
  businessId: string;
  firstName?: string;
  lastName?: string;
}

export interface IInvitePharmacyAdminRequest {
  email: string;
  businessId: string;
}

export interface IInviteProviderRequest {
  email: string;
  businessId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  npi?: string;
}

export interface ITrustedOrganization {
  organization: string;
  isTrusted: boolean;
}
