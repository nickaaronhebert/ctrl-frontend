export type ListCredentials = {
  id: string;
  publicKey: string;
  createdAt: string;
}[];
export interface IViewAllCredentialsResponse {
  data: ListCredentials;
}
