import { TAG_GET_ENCOUNTERED } from "@/types/baseApiTags";
import { baseApi } from ".";

export const encounterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEncounteredProducts: builder.query({
      query: ({ page, perPage, q }) => ({
        url: `/encounters/products?page=${page}&limit=${perPage}&q=${q}`,
        method: "GET",
      }),
      providesTags: [TAG_GET_ENCOUNTERED],
    }),
    createEncounterProduct: builder.mutation({
      query: (product) => ({
        url: "/encounters/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [TAG_GET_ENCOUNTERED],
    }),
    updateEncounteredProduct: builder.mutation({
      query: ({ productId, ...body }) => ({
        url: `/encounters/products/${productId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [TAG_GET_ENCOUNTERED],
    }),
  }),
});

export const {
  useCreateEncounterProductMutation,
  useGetEncounteredProductsQuery,
  useUpdateEncounteredProductMutation,
} = encounterApi;
