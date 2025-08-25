import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import { type PharmacyResponse } from "@/types/responses/pharmacy";
import {
  type AccessResponse,
  type SingleAccessResponse,
} from "@/types/responses/access-control";
import { TAG_GET_ACCESS_CONTROL } from "@/types/baseApiTags";
import type { DefaultPharmacy } from "@/components/data-table/columns/access-control";

const accessControlApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPharmacyByState: builder.query<
      PharmacyResponse,
      { productVariantId: string; stateName: string }
    >({
      query: ({ productVariantId, stateName }) => ({
        url: `/access-control/pharmacy/${productVariantId}/${stateName}`,
        method: "GET",
      }),
      providesTags: [TAG_GET_ACCESS_CONTROL],
    }),

    // Create access control //
    createAccessControl: builder.mutation<
      void,
      { productVariant: string; defaultPharmacy: DefaultPharmacy }
    >({
      query: (body) => ({
        url: "/access-control",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_ACCESS_CONTROL],
    }),
    getAccessControl: builder.query<AccessResponse, ICommonSearchQuery>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/access-control?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
    }),
    getSingleAccessControl: builder.query({
      query: (id: string) => ({
        method: "GET",
        url: `/access-control/${id}`,
      }),
      providesTags: [TAG_GET_ACCESS_CONTROL],
    }),
    getAccessControlByProductVariant: builder.query<
      SingleAccessResponse,
      string
    >({
      query: (id) => `/access-control/product-variant/${id}`,
    }),
  }),
});

export const {
  useLazyGetPharmacyByStateQuery,
  useCreateAccessControlMutation,
  useGetAccessControlQuery,
  useGetSingleAccessControlQuery,
  useLazyGetAccessControlByProductVariantQuery,
} = accessControlApi;

export default accessControlApi;
