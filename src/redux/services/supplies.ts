import { type SupplyResponse } from "@/types/responses/supplies";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type {
  ICreateSupplyRequest,
  IEditSupplyRequest,
} from "@/types/requests/ICreateSupplyRequest";
import { TAG_GET_SUPPLIES } from "@/types/baseApiTags";

const suppliesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllSupplies: builder.query<SupplyResponse, ICommonSearchQuery>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/supply?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_SUPPLIES],
    }),
    createSupply: builder.mutation<
      { message: string; code: string },
      ICreateSupplyRequest
    >({
      query: (body) => ({
        url: "/supply",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_SUPPLIES],
    }),
    editSupply: builder.mutation<
      { message: string; code: string },
      IEditSupplyRequest
    >({
      query: ({ supplyId, ...body }) => ({
        url: `/supply/${supplyId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [TAG_GET_SUPPLIES],
    }),
  }),
});

export const {
  useViewAllSuppliesQuery,
  useCreateSupplyMutation,
  useEditSupplyMutation,
} = suppliesApi;

export default suppliesApi;
