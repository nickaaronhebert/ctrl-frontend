export const PERMISSIONS = {
  WRITE: "write",
  READ: "read",
  DELETE: "delete",
  UPDATE: "update",
} as const;

export const MODULE = {
  PATIENT: "patient",
  DASHBOARD: "business",
  PROFILE: "profile",
  PROVIDER: "me",
  ACCESS_CONTROL: "access-control",
  PRESCRIPTION: "prescription",
  PHARMACY_CATALOGUE: "pharmacy-catalogue",
  ORDER: "order",
  ME: "me",
  MEDICATION_CATALOGUE: "medication-catalogue",
  BUSINESS: "business",
  PROVIDER_GROUP_INVITATION: "provider-group-invitation",
  TRANSMISSION: "transmission",
  ORGANIZATION_ADMIN_INVITATION: "organization-admin-invitation",
};

export type AvailableModules = keyof typeof MODULE;
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
