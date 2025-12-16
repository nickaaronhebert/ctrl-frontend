export interface WebhookEventResponse {
  data: WebhookEvent[];
  meta: PaginationMeta;
}

export interface WebhookEvent {
  _id: string;
  eventId: string;
  direction: string;
  eventType: string;
  subEventType: string;

  transmission: {
    _id: string;
    transmissionId: string;
  };

  pharmacy: {
    _id: string;
    name: string;
  };

  webhookStatus: "success" | "failed";

  webhook: {
    _id: string;
    name: string;
    targetUrl?: string;
  };

  requestPayload: {
    transmission: string;
    status: string | null;
    trackingUrl: string;
  };
  responsePayload: any;

  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
