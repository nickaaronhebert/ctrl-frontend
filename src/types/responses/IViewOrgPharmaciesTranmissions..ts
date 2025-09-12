import type { MetaData } from "../global/commonTypes";

export interface TransmissionsStats {
  id: string;
  statusCounts: {
    status: "Created" | "Transmitted" | "Failed" | "Queued";
    count: number;
  }[];
  name: string;
  email: string;
  phoneNumber: string;
}

export interface IViewOrgPharmaciesResponse {
  data: TransmissionsStats[];
  meta: MetaData;
}
