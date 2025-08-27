import type { MetaData, Provider } from "../global/commonTypes";

export type AffiliatedProviders = Omit<Provider, "medicalLicense"> & {
  isAffiliationActive: boolean;
};

export interface IGetAllAffiliatedProvidersResponse {
  data: AffiliatedProviders[];
  meta: MetaData;
}
