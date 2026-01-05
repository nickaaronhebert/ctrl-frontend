import { type SupplyResponse } from "@/types/responses/supplies";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type { ICreateSupplyRequest } from "@/types/requests/ICreateSupplyRequest";

const suppliesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllSupplies: builder.query<SupplyResponse, ICommonSearchQuery>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/supply?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
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
    }),
  }),
});

export const { useViewAllSuppliesQuery, useCreateSupplyMutation } = suppliesApi;

export default suppliesApi;
