import { TAG_GET_SHIPPING } from "@/types/baseApiTags";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type { ShippingResponse } from "@/types/responses/IShippingResponse";
import type { ICreateShippingRequest } from "@/types/requests/ICreateShippingRequest";

const shippingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewShipping: builder.query<ShippingResponse, ICommonSearchQuery>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/shipping/profiles?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_SHIPPING],
    }),
    createShippingClass: builder.mutation<
      { message: string; code: string },
      ICreateShippingRequest
    >({
      query: (body) => ({
        url: "/shipping/profile",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_SHIPPING],
    }),
  }),
});

export const { useViewShippingQuery, useCreateShippingClassMutation } =
  shippingApi;

export default shippingApi;
