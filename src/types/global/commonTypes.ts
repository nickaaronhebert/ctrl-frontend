import { type Permission } from "@/components/Permissions/permissions";

export interface UserPermission {
  action: Permission;
  resource: string;
  slug: string;
  id: string;
}

export interface Role {
  name: string;
  permissions: UserPermission[];
  id: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Provider {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNUmber?: string;
  npi: string;
  id: string;
}

export type PROVIDER_STATUS = {
  INVITED: "invited";
  INVITATION_ACCEPTED: "invitation_accepted";
  MED_SUBMITTED: "med_submitted";
};
