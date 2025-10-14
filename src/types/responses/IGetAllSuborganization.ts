import type { Address } from "../global/commonTypes";
import type { PaginationMeta } from "./pagination";

export type SubOrganization = {
  name: string;
  email: string;
  //   integration: string;
  phoneNumber: string;
  address: Address;
  status: string;
};

export interface IGetAllSubOrganization {
  data: SubOrganization[];
  meta: PaginationMeta;
}
