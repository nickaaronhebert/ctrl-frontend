import type { Provider } from "../global/commonTypes";

type AffiliatedProviders = Omit<Provider, "medicalLicense"> & {
  isAffiliationActive: boolean;
};

export interface IGetAllAffiliatedProvidersResponse {
  data: AffiliatedProviders[];
}
