import type {
  ICreateWebhookRequest,
  IEditWebhookRequest,
} from "@/types/requests/ICreateWebhook";
import { baseApi } from ".";
import type {
  IGetAllWebhookResponse,
  IGetWebhookDetailsResponse,
} from "@/types/responses/IGetAllWebhook";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type { WebhookEventResponse } from "@/types/responses/IEventLog";
import { TAG_GET_EVENTS } from "@/types/baseApiTags";

const webhookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllWebhook: builder.query<IGetAllWebhookResponse, ICommonSearchQuery>({
      query: ({ perPage, page, q = "" }) => {
        return {
          url: `/webhook/config?limit=${perPage}&page=${page}&q=${q}`,
          method: "get",
        };
      },
      providesTags: (result) => {
        return result
          ? [
              ...result?.data?.map(({ id }) => ({
                type: "Webhook" as const,
                id,
              })),
              { type: "Webhook", id: "LIST" },
            ]
          : [{ type: "Webhook", id: "LIST" }];
      },
    }),

    getWebhookDetails: builder.query<IGetWebhookDetailsResponse, string>({
      query: (id) => {
        return {
          url: `/webhook/config/${id}`,
          method: "get",
        };
      },
      providesTags: (_result, _error, id) => [{ type: "Webhook", id }],
    }),

    createWebhook: builder.mutation<any, ICreateWebhookRequest>({
      query: (body) => ({
        url: `/webhook/config`,
        method: "POST",
        body,
      }),

      invalidatesTags: (result) =>
        result ? [{ type: "Webhook", id: "LIST" }, TAG_GET_EVENTS] : [],
    }),

    editWebhook: builder.mutation<any, IEditWebhookRequest>({
      query: ({ id, ...values }) => ({
        url: `/webhook/config/${id}`,
        method: "PATCH",
        body: values,
      }),

      invalidatesTags: (result, _error, arg) =>
        result ? [{ type: "Webhook", id: arg.id }, TAG_GET_EVENTS] : [],
    }),

    deleteWebhook: builder.mutation<{ message: string; code: string }, string>({
      query: (id) => ({
        url: `/webhook/config/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result) =>
        result ? [{ type: "Webhook", id: "LIST" }, TAG_GET_EVENTS] : [],
    }),

    getEventLogs: builder.query<
      WebhookEventResponse,
      ICommonSearchQuery & { webhook?: string; organization?: string }
    >({
      query: ({
        page,
        perPage,
        startDate,
        endDate,
        webhook,
        q = "",
        direction = "",
        webhookStatus = "",
        organization = "",
      }) => ({
        url: "/webhook/events",
        params: {
          page,
          limit: perPage,
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
          ...(webhook && { webhook }),
          ...(q && { q }),
          ...(direction && { direction }),
          ...(webhookStatus && { webhookStatus }),
          ...(organization && { organization }),
        },
      }),
      providesTags: [TAG_GET_EVENTS],
    }),
    replayWebhookService: builder.mutation({
      query: ({ eventId }: { eventId: string }) => ({
        url: `/webhook/${eventId}/replay`,
        method: "POST",
      }),
      invalidatesTags: [TAG_GET_EVENTS, { type: "Webhook", id: "LIST" }],
    }),

    getOrgsAndSubOrgs: builder.query<any, ICommonSearchQuery>({
      query: ({ page, perPage }) => ({
        url: `/organization/accessible?page=${page}&limit=${perPage}`,
        method: "GET",
        params: {
          page,
          limit: perPage,
        },
      }),
    }),
    getPharmacyCredentials: builder.query<any, any>({
      query: () => ({
        url: "/pharmacy/webhook-credentials",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateWebhookMutation,
  useGetAllWebhookQuery,
  useGetWebhookDetailsQuery,
  useEditWebhookMutation,
  useDeleteWebhookMutation,
  useGetEventLogsQuery,
  useReplayWebhookServiceMutation,
  useGetOrgsAndSubOrgsQuery,
  useGetPharmacyCredentialsQuery,
} = webhookApi;

export default webhookApi;
