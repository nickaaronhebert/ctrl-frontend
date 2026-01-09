import type {
  IViewAllPharmacyTransmissionsResponse,
  IViewAllTransmissionsRequest,
  IViewAllTransmissionsResponse,
  IViewPharmacyTransmissionByIdResponse,
  IViewTransmissionByIdResponse,
} from "@/types/responses/transmission";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";

import type { IViewOrgPharmaciesResponse } from "@/types/responses/IViewOrgPharmaciesTranmissions";
import { TAG_GLOBAL_PHARMACIES } from "@/types/baseApiTags";
import type { IViewFulfillmentTrackingResponse } from "@/types/responses/IViewTransmissionFulfillments";
import type { IViewTransmissionFulfillmentStats } from "@/types/responses/IViewTransmissionFulfillmentStats";
import type { FulfillmentTrackingResponse } from "@/types/responses/IViewTransmissionFullfillmentDetail";

const transmissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllTransmissions: builder.query<
      IViewAllTransmissionsResponse,
      IViewAllTransmissionsRequest & { subOrganization?: string }
    >({
      query: ({ page, perPage, activeStatus, subOrganization = "" }) => {
        const subOrg = subOrganization
          ? `&subOrganization=${subOrganization}`
          : "";

        return {
          url: `/transmission?page=${page}&limit=${perPage}&status=${activeStatus}${subOrg}`,
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

    viewAllTransmissionFulfillments: builder.query<
      IViewFulfillmentTrackingResponse,
      ICommonSearchQuery
    >({
      query: ({
        page,
        perPage,
        transmissionId,
        pharmacyStatus,
        pharmacy,
        subOrganization,
      }) => {
        const pharmacyQuery = pharmacyStatus
          ? `&pharmacyStatus=${pharmacyStatus}`
          : "";
        const connectedPharmacyQuery = pharmacy ? `&pharmacy=${pharmacy}` : "";
        const subOrgQuery = subOrganization
          ? `&subOrganization=${subOrganization}`
          : "";
        return {
          url: `/transmission/fulfillment-tracking?page=${page}&limit=${perPage}&transmissionId=${transmissionId}${pharmacyQuery}${connectedPharmacyQuery}${subOrgQuery}`,
          method: "GET",
        };
      },
    }),

    viewTransmissionFulfillmentDetail: builder.query<
      FulfillmentTrackingResponse,
      string
    >({
      query: (id: string) => {
        return {
          url: `/transmission/fulfillment-tracking/${id}`,
          method: "GET",
        };
      },
    }),

    viewAllTransmissionFulfillmentStats: builder.query<
      IViewTransmissionFulfillmentStats,
      any
    >({
      query: () => {
        return {
          url: `/transmission/fulfillment-tracking/stats`,
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

    viewOrgPharmaciesTransmissionsV2: builder.query<
      IViewOrgPharmaciesResponse,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, q = "", connectionStatus }) => {
        return {
          url: `/organization/pharmacies?page=${page}&limit=${perPage}&connectionStatus=${connectionStatus}&q=${q}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GLOBAL_PHARMACIES],
    }),
    transmitTransmission: builder.query({
      query: (id: string) => ({
        url: `transmission/transmit/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useViewAllTransmissionsQuery,
  useViewTransmissionByIdQuery,
  useViewAllPharmacyTransmissionsQuery,
  useViewPharmacyTransmissionByIdQuery,
  useViewOrgPharmaciesTransmissionsQuery,
  useViewOrgPharmaciesTransmissionsV2Query,
  useLazyTransmitTransmissionQuery,
  useViewAllTransmissionFulfillmentsQuery,
  useViewAllTransmissionFulfillmentStatsQuery,
  useViewTransmissionFulfillmentDetailQuery,
} = transmissionApi;

export default transmissionApi;
