import type { PharmacyInvoiceResponse } from "@/types/responses/invoices";
import {
  TAG_GET_CONNECTED_ORGANIZATION,
  TAG_GET_PHARMACY_CATALOGUE,
  TAG_GET_USER_PROFILE,
  TAG_GLOBAL_PHARMACIES,
} from "@/types/baseApiTags";
import { baseApi } from ".";
import type { IGetPharmacyInvoicesDetailsResponse } from "@/types/responses/IGetPharmacyInvoicesDetail";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type { IConnectedOrganizationResponse } from "@/types/responses/IConnectedOrganization";

export const pharmacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyPharmacyInvitation: builder.mutation<any, any>({
      query: (body) => ({
        url: `/invitation/verify-invitation`,
        method: "POST",
        body,
      }),
    }),

    acceptPharmacyInvitation: builder.mutation<any, any>({
      query: (body) => ({
        url: `/invitation/accept-pharmacy-invitation`,
        method: "POST",
        body,
      }),
    }),
    // Pharmacy invoices get all //
    getPharmacyInvoices: builder.query<
      PharmacyInvoiceResponse,
      ICommonSearchQuery
      // { page: number; perPage: number }
    >({
      query: ({ page, perPage, startDate = "", endDate = "" }) => ({
        url: `/transaction/pharmacy-transfers?page=${page}&limit=${perPage}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
    }),

    getConnectedOrganization: builder.query<
      IConnectedOrganizationResponse,
      ICommonSearchQuery
      // { page: number; perPage: number }
    >({
      query: ({ page, perPage, q, status }) => ({
        url: `/pharmacy/organizations?page=${page}&limit=${perPage}&status=${status}&q=${q}`,
        method: "GET",
      }),
      providesTags: [TAG_GET_CONNECTED_ORGANIZATION],
    }),

    getPharmacyInvoicesDetails: builder.query<
      IGetPharmacyInvoicesDetailsResponse,
      string
    >({
      query: (id) => ({
        url: `/transaction/pharmacy-transfers/${id}`,
        method: "GET",
      }),
    }),

    bulkUpsertPharmacyCatalogue: builder.mutation<any, any>({
      query: (body) => ({
        url: `/pharmacy-catalogue/bulk-upsert`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_PHARMACY_CATALOGUE],
    }),

    setActiveStates: builder.mutation<
      any,
      { allowedStates: string[]; id: string }
    >({
      query: ({ allowedStates, id }) => ({
        url: `/business/${id}/pharmacy/states`,
        method: "PUT",
        body: {
          allowedStates,
        },
      }),
      invalidatesTags: [TAG_GET_USER_PROFILE],
    }),
    getPharmacyCatalogue: builder.query({
      providesTags: [TAG_GET_PHARMACY_CATALOGUE],
      query: ({ page, perPage, pharmacy }) => {
        const isPharmacy = pharmacy ? `&pharmacy=${pharmacy}` : "";
        return {
          url: `/pharmacy-catalogue?page=${page}&limit=${perPage}${isPharmacy}
          `,
          method: "GET",
        };
      },
    }),
    getAvailableMedication: builder.query({
      providesTags: [TAG_GET_PHARMACY_CATALOGUE],
      query: ({ page, perPage, q }) => ({
        url: `/pharmacy/available-medication?page=${page}&limit=${perPage}&q=${q}`,
        method: "GET",
      }),
    }),
    getPharmacyMedicines: builder.query({
      query: ({ id, page, perPage, q }) => ({
        url: `/pharmacy/pharmacies/${id}?page=${page}&limit=${perPage}&q=${q}`,
        method: "GET",
      }),
    }),
    deletePharmacyCatalogue: builder.mutation({
      query: ({ id }) => ({
        url: `/pharmacy-catalogue/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TAG_GET_PHARMACY_CATALOGUE],
    }),

    sendConnectionInvite: builder.mutation({
      query: ({ pharmacyId }) => ({
        url: `/organization/invite-pharmacy/${pharmacyId}`,
        method: "GET",
      }),
      invalidatesTags: [TAG_GLOBAL_PHARMACIES],
    }),

    rejectConnectionInvite: builder.mutation({
      query: (invitationId) => ({
        url: `/pharmacy/reject-invitation/${invitationId}/reject`,
        method: "POST",
      }),
      invalidatesTags: [TAG_GET_CONNECTED_ORGANIZATION],
    }),

    acceptConnectionInvite: builder.mutation({
      query: (invitationId) => ({
        url: `/pharmacy/approve-invitation/${invitationId}/accept`,
        method: "POST",
      }),
      invalidatesTags: [TAG_GET_CONNECTED_ORGANIZATION],
    }),
  }),
});

export const {
  useVerifyPharmacyInvitationMutation,
  useAcceptPharmacyInvitationMutation,
  useGetPharmacyInvoicesQuery,
  useGetConnectedOrganizationQuery,
  useGetPharmacyInvoicesDetailsQuery,
  useBulkUpsertPharmacyCatalogueMutation,
  useSetActiveStatesMutation,
  useGetPharmacyCatalogueQuery,
  useGetAvailableMedicationQuery,
  useGetPharmacyMedicinesQuery,
  useDeletePharmacyCatalogueMutation,
  useSendConnectionInviteMutation,
  useRejectConnectionInviteMutation,
  useAcceptConnectionInviteMutation,
} = pharmacyApi;
