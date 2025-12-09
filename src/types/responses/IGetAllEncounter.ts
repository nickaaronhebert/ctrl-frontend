import type { Address, Patient } from "../global/commonTypes";
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

export interface EncounterDetails {
  encounterId: string;
  status: EncounterStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  telegraOrder?: {
    visitLink: string;
  };
  encounterProduct: {
    id: string;
    name: string;
  }[];
  timeline: {
    status: EncounterStatus;
    timestamp: string;
  }[];
  patient: Omit<Patient, "addresses"> & {
    address: Address;
  };
  ctrlOrder?: {
    id: string;
    orderId: string;
  };
  telegraProvider?: {
    name: string;
    npi: string;
  };
}

export interface IGetAllEncounter {
  data: Encounter[];
  meta: PaginationMeta;
  code: string;
}

export interface IGetEncounterDetails {
  message: string;
  code: string;
  data: EncounterDetails;
}
