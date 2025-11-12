import { TAG_GET_ENCOUNTER, TAG_GET_ENCOUNTERED } from "@/types/baseApiTags";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type { IGetAllEncounteredProducts } from "@/types/responses/IGetAllEncounteredProducts";
import type { IGetAllEncounter } from "@/types/responses/IGetAllEncounter";
import type { ICreateEncounter } from "@/types/requests/ICreateEncounter";
import type { ICreateEncounterResponse } from "@/types/responses/ICreareCounter";

export const encounterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEncounterProduct: builder.mutation({
      query: (product) => ({
        url: "/encounters/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [TAG_GET_ENCOUNTERED],
    }),

    createEncounter: builder.mutation<
      ICreateEncounterResponse,
      ICreateEncounter
    >({
      query: (body) => ({
        url: "/encounters",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_ENCOUNTER],
    }),

    getEncounteredProducts: builder.query<
      IGetAllEncounteredProducts,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, q }) => ({
        url: `/encounters/products?page=${page}&limit=${perPage}&q=${q}`,
        method: "GET",
      }),
      providesTags: [TAG_GET_ENCOUNTERED],
    }),

    getAllEncounter: builder.query<IGetAllEncounter, ICommonSearchQuery>({
      query: ({ page, perPage, q, status }) => {
        const url = `/encounters?page=${page}&limit=${perPage}&q=${q}&status=${status}`;
        return {
          url: url,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_ENCOUNTER],
    }),
    updateEncounteredProduct: builder.mutation({
      query: ({ productId, ...body }) => ({
        url: `/encounters/products/${productId}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useCreateEncounterProductMutation,
  useCreateEncounterMutation,
  useGetEncounteredProductsQuery,
  useGetAllEncounterQuery,
  useUpdateEncounteredProductMutation,
} = encounterApi;
