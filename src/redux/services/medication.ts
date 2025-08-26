import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type { MedicationCatalogueResponse } from "@/types/responses/medication";
import type { IGetAllProductVariantsResponse } from "@/types/responses/productVariant";

const medicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMedicationCatalogue: builder.query<
      MedicationCatalogueResponse,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, q }) => {
        return {
          url: `/medication-catalogue?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
    }),
    getSingleMedicationCatalogueDetails: builder.query({
      query: (id: string) => ({
        url: `/medication-catalogue/${id}`,
        method: "GET",
      }),
    }),

    getAllProductVariants: builder.query<
      IGetAllProductVariantsResponse,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, q = "" }) => {
        return {
          url: `/product-variants?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetMedicationCatalogueQuery,
  useGetSingleMedicationCatalogueDetailsQuery,
  useGetAllProductVariantsQuery,
} = medicationApi;

export default medicationApi;
