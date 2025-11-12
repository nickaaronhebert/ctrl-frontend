import type { PaginationMeta } from "./pagination";

export type EncounterStatus =
  | "started"
  | "in_review"
  | "completed"
  | "cancelled";
export interface Encounter {
  id: string;
  status: EncounterStatus;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  encounterProduct: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface IGetAllEncounter {
  data: Encounter[];
  meta: PaginationMeta;
  code: string;
}
