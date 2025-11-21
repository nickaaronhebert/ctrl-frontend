import type { ICreateWebhookRequest } from "@/types/requests/ICreateWebhook";
import { baseApi } from ".";
import type { IGetAllWebhookResponse } from "@/types/responses/IGetAllWebhook";
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
    }),

    createWebhook: builder.mutation<any, ICreateWebhookRequest>({
      query: (body) => ({
        url: `/webhook/config`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateWebhookMutation, useGetAllWebhookQuery } = webhookApi;

export default webhookApi;
