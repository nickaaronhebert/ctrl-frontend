export const PERMISSIONS = {
  WRITE: "write",
  READ: "read",
  DELETE: "delete",
  UPDATE: "update",
} as const;

export const MODULE = {
  DASHBOARD: "business",
  PROFILE: "profile",
  PROVIDER: "provider-group-invitation",
};

export type AvailableModules = keyof typeof MODULE;
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
