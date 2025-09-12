import type {
  IViewAllPharmacyTransmissionsResponse,
  IViewAllTransmissionsRequest,
  IViewAllTransmissionsResponse,
  IViewPharmacyTransmissionByIdResponse,
  IViewTransmissionByIdResponse,
} from "@/types/responses/transmission";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";

const transmissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllTransmissions: builder.query<
      IViewAllTransmissionsResponse,
      IViewAllTransmissionsRequest
    >({
      query: ({ page, perPage, activeStatus }) => {
        return {
          url: `/transmission?page=${page}&limit=${perPage}&status=${activeStatus}`,
          method: "GET",
        };
      },
    }),

    viewAllPharmacyTransmissions: builder.query<
      IViewAllPharmacyTransmissionsResponse,
      IViewAllTransmissionsRequest
    >({
      query: ({ page, perPage }) => {
        return {
          url: `/transmission?page=${page}&limit=${perPage}`,
          method: "GET",
        };
      },
    }),

    viewTransmissionById: builder.query<IViewTransmissionByIdResponse, string>({
      query: (id) => {
        return {
          url: `/transmission/${id}`,
          method: "GET",
        };
      },
    }),

    viewPharmacyTransmissionById: builder.query<
      IViewPharmacyTransmissionByIdResponse,
      string
    >({
      query: (id) => {
        return {
          url: `/transmission/${id}`,
          method: "GET",
        };
      },
    }),

    viewOrgPharmaciesTransmissions: builder.query<any, ICommonSearchQuery>({
      query: ({ page, perPage, q = "" }) => {
        return {
          url: `/organization/pharmacies-transmissions-insights?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useViewAllTransmissionsQuery,
  useViewTransmissionByIdQuery,
  useViewAllPharmacyTransmissionsQuery,
  useViewPharmacyTransmissionByIdQuery,
  useViewOrgPharmaciesTransmissionsQuery,
} = transmissionApi;

export default transmissionApi;
