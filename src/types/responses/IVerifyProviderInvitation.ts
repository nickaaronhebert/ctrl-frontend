import type { Provider } from "../global/commonTypes";

type PROVIDER = Provider & {
  providerStatus: string;
};

export interface IVerifyProviderInvitationResponse {
  data: PROVIDER;
}
