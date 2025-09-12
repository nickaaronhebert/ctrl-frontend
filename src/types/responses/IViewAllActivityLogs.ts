import type { MetaData } from "../global/commonTypes";

export type EntityType =
  | "Prescription"
  | "Order"
  | "Transmission"
  | "AccessControl"
  | "ProductVariant"
  | "Invitation";

export type Actor = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: {
    name: string;
    id: string;
  };
};
export interface IActivityLogData {
  action: string;
  entityType: EntityType;
  entityId: string;
  entitySecondaryId: string;
  actor: Actor;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IViewAllActivityLogs {
  data: IActivityLogData[];
  meta: MetaData;
}

export interface IViewActivityLogDetails {
  data: IActivityLogData & {
    entity: object;
  };
}
