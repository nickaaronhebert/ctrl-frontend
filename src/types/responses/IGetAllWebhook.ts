import type { PaginationMeta } from "./pagination";

export interface Webhook {
  name: string;
  webhookId: string;
  eventTypes: string[];
  targetUrl: string;
  authType: "basic_auth" | "header_auth";
  lastTriggered?: string;
  targetOrganization: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface WebhookDetails extends Webhook {
  authConfig: Record<string, string>;
}

export interface IGetAllWebhookResponse {
  data: Webhook[];
  code: string;
  meta: PaginationMeta;
}

export interface IGetWebhookDetailsResponse {
  message: string;
  code: string;
  data: WebhookDetails;
}
