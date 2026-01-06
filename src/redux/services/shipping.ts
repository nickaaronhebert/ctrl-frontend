import {
  TAG_GET_SHIPPING,
  TAG_GET_SHIPPING_DETAILS,
} from "@/types/baseApiTags";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type { ShippingResponse } from "@/types/responses/IShippingResponse";
import type { ICreateShippingRequest } from "@/types/requests/ICreateShippingRequest";
import type { IShippingDetailResponse } from "@/types/responses/IShippingDetailResponse";

const shippingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShippingClass: builder.mutation<
      { message: string; code: string },
      ICreateShippingRequest
    >({
      query: (body) => ({
        url: "/shipping/profile",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_SHIPPING, TAG_GET_SHIPPING_DETAILS],
    }),
    viewShipping: builder.query<ShippingResponse, ICommonSearchQuery>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/shipping/profiles?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_SHIPPING],
    }),
    viewShippingDetails: builder.query<
      IShippingDetailResponse,
      { profileId: string }
    >({
      query: ({ profileId }) => ({
        url: `/shipping/profile/${profileId}`,
        method: "GET",
      }),
      providesTags: [TAG_GET_SHIPPING_DETAILS],
    }),
    editShippingDetails: builder.mutation<
      { message: string; code: string },
      ICreateShippingRequest & { profileId: string }
    >({
      query: ({ profileId, ...body }) => ({
        url: `/shipping/profile/${profileId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [TAG_GET_SHIPPING, TAG_GET_SHIPPING_DETAILS],
    }),
  }),
});

export const {
  useViewShippingQuery,
  useCreateShippingClassMutation,
  useViewShippingDetailsQuery,
  useEditShippingDetailsMutation,
} = shippingApi;

export default shippingApi;
