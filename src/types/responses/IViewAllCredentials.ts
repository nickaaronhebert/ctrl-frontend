export type ListCredentials = {
  id: string;
  publicKey: string;
  createdAt: string;
  expiresAt: string;
}[];
export interface IViewAllCredentialsResponse {
  data: ListCredentials;
}
