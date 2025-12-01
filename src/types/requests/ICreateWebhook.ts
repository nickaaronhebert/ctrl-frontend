export type Auth = {
  username?: string;
  password?: string;
  headers?: string;
};

export interface ICreateWebhookRequest {
  name: string;
  authType: string;
  authConfig: Auth;
  targetUrl: string;
  targetOrganization?: string;
  eventTypes: string[];
}

export interface IEditWebhookRequest extends ICreateWebhookRequest {
  id: string;
}
