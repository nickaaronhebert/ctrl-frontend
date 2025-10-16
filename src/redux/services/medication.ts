import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type { MedicationCatalogueResponse } from "@/types/responses/medication";
import type { IGetAllProductVariantsResponse } from "@/types/responses/productVariant";
import type {
  ICreateMedicationCatalogue,
  IEditMedicationCatalogue,
} from "@/types/requests/ICreateMedication";
import type {
  ICreateMedicationCatalogueResponse,
  IEditMedicationCatalogueResponse,
} from "@/types/responses/ICreateMedication";
import type { IGetMedicationCatalogueDetailsResponse } from "@/types/responses/IMedicationCatalogueDetails";

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

      invalidatesTags: (result) =>
        result ? [{ type: "Medication_Catalogue", id: "LIST" }] : [],
    }),

    editMedication: builder.mutation<
      IEditMedicationCatalogueResponse,
      IEditMedicationCatalogue
    >({
      query: ({ data, id }) => ({
        url: `/medication-catalogue/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, _error, arg) =>
        result ? [{ type: "Medication_Catalogue", id: arg.id }] : [],
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
      providesTags: (result) => {
        return result
          ? [
              ...result?.data?.map(({ id }) => ({
                type: "Medication_Catalogue" as const,
                id,
              })),
              { type: "Medication_Catalogue", id: "LIST" },
            ]
          : [{ type: "Medication_Catalogue", id: "LIST" }];
      },
    }),
    getSingleMedicationCatalogueDetails: builder.query<
      IGetMedicationCatalogueDetailsResponse,
      string
    >({
      query: (id: string) => ({
        url: `/medication-catalogue/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "Medication_Catalogue", id },
      ],
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
  useEditMedicationMutation,
} = medicationApi;

export default medicationApi;
