import type { PaginationMeta } from "./pagination";

export type InvitationType =
  | "organization_admin_invitation"
  | "provider_group_invitation"
  | "pharmacy_admin_invitation";

export interface Invitation {
  email: string;
  type: InvitationType;
  status: string;
  _id: string;
  createdAt: string;
}
export interface IViewAllInvitationResponse {
  data: Invitation[];
  meta: PaginationMeta;
}
