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
        result ? [{ type: "Webhook", id: "LIST" }] : [],
    }),

    editWebhook: builder.mutation<any, IEditWebhookRequest>({
      query: ({ id, ...values }) => ({
        url: `/webhook/config/${id}`,
        method: "PATCH",
        body: values,
      }),

      invalidatesTags: (result, _error, arg) =>
        result ? [{ type: "Webhook", id: arg.id }] : [],
    }),

    deleteWebhook: builder.mutation<{ message: string; code: string }, string>({
      query: (id) => ({
        url: `/webhook/config/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result) =>
        result ? [{ type: "Webhook", id: "LIST" }] : [],
    }),
  }),
});

export const {
  useCreateWebhookMutation,
  useGetAllWebhookQuery,
  useGetWebhookDetailsQuery,
  useEditWebhookMutation,
  useDeleteWebhookMutation,
} = webhookApi;

export default webhookApi;
