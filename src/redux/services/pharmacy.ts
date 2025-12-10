import type { PharmacyInvoiceResponse } from "@/types/responses/invoices";
import {
  TAG_GET_CATALOGUE_LIST,
  TAG_GET_CONNECTED_ORGANIZATION,
  TAG_GET_PHARMACY_CATALOGUE,
  TAG_GET_PLAN_CATALOGUES,
  TAG_GET_SUB_ORGANIZATION,
  TAG_GET_USER_PROFILE,
  TAG_GLOBAL_PHARMACIES,
  TAG_LINKED_ORG,
  TAG_ORG_SUB_ORGS,
} from "@/types/baseApiTags";
import { baseApi } from ".";
import type { IGetPharmacyInvoicesDetailsResponse } from "@/types/responses/IGetPharmacyInvoicesDetail";
import type {
  IAvailablePlanCatalogueQuery,
  ICommonSearchQuery,
} from "@/types/requests/search";
import type {
  IConnectedOrganizationResponse,
  OrganizationResponse,
} from "@/types/responses/IConnectedOrganization";
import { type PharmacyCatalogueResponse } from "@/types/responses/IPharmacyCatalogueResponse";
import type { CreateVariantResponse } from "@/types/responses/ICreateVariantResponse";
import type { CreateVariantRequest } from "@/types/requests/ICreateVariantRequest";

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

    // Get organization by id

    getLinkedOrganization: builder.query<OrganizationResponse, string>({
      query: (organizationId) =>
        `/pharmacy/linked-organization/${organizationId}`,
      providesTags: [TAG_LINKED_ORG],
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
      invalidatesTags: [TAG_GET_PHARMACY_CATALOGUE, TAG_GET_CATALOGUE_LIST],
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
      query: ({ page, perPage, pharmacy, q }) => {
        const isPharmacy = pharmacy ? `&pharmacy=${pharmacy}` : "";
        return {
          url: `/pharmacy-catalogue?page=${page}&limit=${perPage}&q=${q}${isPharmacy}
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
      keepUnusedDataFor: 0,
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
      invalidatesTags: [TAG_GET_PHARMACY_CATALOGUE, TAG_GET_CATALOGUE_LIST],
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
      query: (body) => ({
        url: `/pharmacy/approve-invitation`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_CONNECTED_ORGANIZATION],
    }),

    createPharmacyCreds: builder.mutation({
      query: (body) => ({
        url: `/pharmacy/org-creds`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_CONNECTED_ORGANIZATION],
    }),
    updatePharmacyCreds: builder.mutation({
      query: (body) => ({
        url: `/pharmacy/org-creds`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TAG_GET_CONNECTED_ORGANIZATION, TAG_LINKED_ORG],
    }),
    editPharmacyCatalogue: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/pharmacy-catalogue/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [TAG_GET_PHARMACY_CATALOGUE, TAG_GET_CATALOGUE_LIST],
    }),
    createSubOrgCreds: builder.mutation({
      query: (body) => ({
        url: `/pharmacy/suborg-creds`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_SUB_ORGANIZATION, TAG_ORG_SUB_ORGS],
    }),
    updateOrgBilling: builder.mutation({
      query: (body) => ({
        url: `/pharmacy/update-org-billing`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_LINKED_ORG, TAG_ORG_SUB_ORGS],
    }),
    getCatalogueList: builder.query<
      PharmacyCatalogueResponse,
      { page: number; perPage: number }
    >({
      query: ({ page, perPage }) => ({
        url: `/pharmacy-catalogue/variant?page=${page}&limit=${perPage}`,
        method: "GET",
      }),
      providesTags: [TAG_GET_CATALOGUE_LIST],
    }),
    createVariant: builder.mutation<
      CreateVariantResponse,
      CreateVariantRequest
    >({
      query: (body) => ({
        url: "/pharmacy-catalogue/variant",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_CATALOGUE_LIST],
    }),
    createPharmacyCatalogueVariant: builder.mutation({
      query: ({ phmCatalogueVariantId, config }) => ({
        url: `/pharmacy-catalogue/variant/${phmCatalogueVariantId}/configs`,
        method: "PUT",
        body: { config },
      }),
      invalidatesTags: [TAG_GET_CATALOGUE_LIST, TAG_GET_PLAN_CATALOGUES],
    }),
    getCataloguePlan: builder.query({
      query: ({
        phmCatalogueVariantId,
        q,
      }: {
        phmCatalogueVariantId: string;
        q?: string;
      }) => ({
        url: `/pharmacy-catalogue/variant/${phmCatalogueVariantId}/config?q=${q}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: [TAG_GET_PLAN_CATALOGUES],
    }),
    // get available medications for plan catalogue creation //

    getAvailablePlanCatalogue: builder.query<any, IAvailablePlanCatalogueQuery>(
      {
        query: ({ page, perPage, phmCatalogueVariantId, q }) => ({
          url: `/pharmacy-catalogue/variant/${phmCatalogueVariantId}/available-pharmacy-catalogue?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        }),
        keepUnusedDataFor: 0,
      }
    ),

    // update metadata for plan catalogue variant
    updatePlanCatalogueVariant: builder.mutation({
      query: ({
        phmCatalogueVariantId,
        configId,
        body,
      }: {
        phmCatalogueVariantId: string;
        configId: string;
        [key: string]: any;
      }) => ({
        url: `/pharmacy-catalogue/variant/${phmCatalogueVariantId}/config/${configId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [TAG_GET_PLAN_CATALOGUES],
    }),
    deletePlanCatalogueVariant: builder.mutation({
      query: ({
        phmCatalogueVariantId,
        configId,
      }: {
        phmCatalogueVariantId: string;
        configId: string;
      }) => ({
        url: `/pharmacy-catalogue/variant/${phmCatalogueVariantId}/config/${configId}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        TAG_GET_PLAN_CATALOGUES,
        TAG_GET_CATALOGUE_LIST,
        TAG_GET_PHARMACY_CATALOGUE,
      ],
    }),
    // Assign catalogue to organization //
    assignPharmacyCatalogue: builder.mutation({
      query: ({
        organization,
        pharmacyCatalogueVariant,
        subOrganization,
      }: {
        organization: string;
        pharmacyCatalogueVariant: string;
        subOrganization?: string;
      }) => {
        const body: {
          organization: string;
          pharmacyCatalogueVariant: string;
          subOrganization?: string;
        } = {
          organization,
          pharmacyCatalogueVariant,
        };
        if (subOrganization) {
          body.subOrganization = subOrganization;
        }

        return {
          url: `pharmacy/organization/assign-pharmacy-catalogue`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: [TAG_LINKED_ORG],
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
  useCreatePharmacyCredsMutation,
  useUpdatePharmacyCredsMutation,
  useEditPharmacyCatalogueMutation,
  useCreateSubOrgCredsMutation,
  useGetLinkedOrganizationQuery,
  useUpdateOrgBillingMutation,
  useGetCatalogueListQuery,
  useCreateVariantMutation,
  useCreatePharmacyCatalogueVariantMutation,
  useGetCataloguePlanQuery,
  useDeletePlanCatalogueVariantMutation,
  useUpdatePlanCatalogueVariantMutation,
  useGetAvailablePlanCatalogueQuery,
  useAssignPharmacyCatalogueMutation,
} = pharmacyApi;
