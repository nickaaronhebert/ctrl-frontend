import { TAG_GET_ENCOUNTERED } from "@/types/baseApiTags";
import { baseApi } from ".";

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
    getEncounteredProducts: builder.query({
      query: ({ page, perPage, q }) => ({
        url: `/encounters/products?page=${page}&limit=${perPage}&q=${q}`,
        method: "GET",
      }),
      providesTags: [TAG_GET_ENCOUNTERED],
    }),
  }),
});

export const {
  useCreateEncounterProductMutation,
  useGetEncounteredProductsQuery,
} = encounterApi;
