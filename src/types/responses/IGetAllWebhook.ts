import type { PaginationMeta } from "./pagination";

export interface Webhook {
  name: string;
  webhookId: string;
  eventTypes: string[];
  targetUrl: string;
  authTye: "basic_auth" | "header_auth";
  lastTriggered?: string;
  targetOrganization: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IGetAllWebhookResponse {
  data: Webhook[];
  code: string;
  meta: PaginationMeta;
}
