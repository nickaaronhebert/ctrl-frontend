import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type { MedicationCatalogueResponse } from "@/types/responses/medication";

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
  }),
});

export const {
  useGetMedicationCatalogueQuery,
  useGetSingleMedicationCatalogueDetailsQuery,
} = medicationApi;

export default medicationApi;
