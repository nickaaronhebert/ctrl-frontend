import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type { MedicationCatalogueResponse } from "@/types/responses/medication";
import type { IGetAllProductVariantsResponse } from "@/types/responses/productVariant";
import type { ICreateMedicationCatalogue } from "@/types/requests/ICreateMedication";
import type { ICreateMedicationCatalogueResponse } from "@/types/responses/ICreateMedication";

const medicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMedication: builder.mutation<
      ICreateMedicationCatalogueResponse,
      ICreateMedicationCatalogue
    >({
      query: (body) => ({
        url: `/medication-catalogue`,
        method: "POST",
        body,
      }),
    }),

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
      query: ({ page, perPage, q = "", state = "" }) => {
        return {
          url: `/product-variants?page=${page}&limit=${perPage}&state=${state}&q=${q}`,
          method: "GET",
        };
      },
    }),
    getMedicationDetailsByOrg: builder.query({
      query: ({ page, perPage, q }) => ({
        url: `/organization/medication-catalogues?page=${page}&limit=${perPage}&q=${q}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMedicationCatalogueQuery,
  useGetSingleMedicationCatalogueDetailsQuery,
  useGetAllProductVariantsQuery,
  useCreateMedicationMutation,
  useGetMedicationDetailsByOrgQuery,
} = medicationApi;

export default medicationApi;
