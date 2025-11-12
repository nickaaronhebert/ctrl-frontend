import type {
  IInviteOrgAdminRequest,
  IInviteProviderRequest,
  ITrustedOrganization,
} from "@/types/requests/IInviteAdmin";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type { IListAllOrganizationsResponse } from "@/types/responses/IListAllOrganization";
import type {
  IInviteOrgAdminResponse,
  IInvitePharmacyAdminResponse,
} from "@/types/responses/Invitation";
import type { IViewAllPharmaciesResponse } from "@/types/responses/IViewAllPharmacies";
import {
  TAG_GET_CREDENTIALS,
  TAG_GET_INVITATIONS,
  TAG_GET_ORGANIZATIONS,
  TAG_GET_PHARMACY,
  TAG_GET_PROVIDERS,
  TAG_GET_SUB_ORGANIZATION,
} from "@/types/baseApiTags";
import type { IViewAllInvitationResponse } from "@/types/responses/IViewInvitation";

import type { IGetAllSubOrganization } from "@/types/responses/IGetAllSuborganization";
import type { IViewAllCredentialsResponse } from "@/types/responses/IViewAllCredentials";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    inviteOrgAdmin: builder.mutation<
      IInviteOrgAdminResponse,
      IInviteOrgAdminRequest
    >({
      query: (body) => ({
        url: `/invitation/organization-admin`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_INVITATIONS],
    }),

    invitePharmacyAdmin: builder.mutation<
      IInvitePharmacyAdminResponse,
      IInviteOrgAdminRequest
    >({
      query: (body) => ({
        url: `/invitation/pharmacy-admin`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_INVITATIONS],
    }),

    inviteProvider: builder.mutation<any, IInviteProviderRequest>({
      query: (body) => ({
        url: `/invitation/provider-group`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_PROVIDERS],
    }),

    createOrganization: builder.mutation<any, any>({
      query: (body) => ({
        url: `/business/organization`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_ORGANIZATIONS],
    }),

    createSubOrganization: builder.mutation<any, any>({
      query: (body) => ({
        url: `/organization/sub-organization`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_SUB_ORGANIZATION],
    }),

    createPharmacy: builder.mutation<any, any>({
      query: (body) => ({
        url: `/pharmacy`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_PHARMACY],
    }),

    generateCredentials: builder.mutation({
      query: (body) => ({
        url: `/organization/api-keys`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_CREDENTIALS],
    }),

    revokeCredentials: builder.mutation({
      query: (apiKeyId) => ({
        url: `/organization/api-keys/${apiKeyId}/revoke`,
        method: "PUT",
      }),
      invalidatesTags: [TAG_GET_CREDENTIALS],
    }),

    viewCredentials: builder.query<IViewAllCredentialsResponse, void>({
      query: () => ({
        url: `/organization/api-keys`,
        method: "GET",
      }),
      providesTags: [TAG_GET_CREDENTIALS],
    }),

    // Stats API organziation //
    organizationStats: builder.query({
      query: ({ startDate }) => ({
        url: "/organization/stats",
        method: "GET",
        params: {
          startDate,
        },
      }),
    }),
    viewAllOrganization: builder.query<
      IListAllOrganizationsResponse,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, q }) => {
        return {
          url: `/organization?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_ORGANIZATIONS],
    }),

    viewAllSubOrganization: builder.query<
      IGetAllSubOrganization,
      ICommonSearchQuery & { parentOrganization?: string }
    >({
      query: ({ page, perPage, q = "", parentOrganization }) => {
        const parentOrgParam = parentOrganization
          ? `&parentOrganization=${parentOrganization}`
          : "";

        return {
          url: `/organization/sub-organizations?page=${page}&limit=${perPage}&q=${q}${parentOrgParam}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_SUB_ORGANIZATION],
    }),

    viewAllPharmacies: builder.query<
      IViewAllPharmaciesResponse,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, q }) => {
        return {
          url: `/pharmacy?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_PHARMACY],
    }),

    viewAllInvitations: builder.query<
      IViewAllInvitationResponse,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, status }) => {
        const statusQuery = status ? `&status=${status}` : "";

        return {
          url: `/invitation?page=${page}&limit=${perPage}${statusQuery}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_INVITATIONS],
      // providesTags: [TAG_GET_PHARMACY],
    }),
    trustedOrganizations: builder.mutation<ITrustedOrganization, any>({
      query: (body) => ({
        url: `/admin/organization/trusted`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_ORGANIZATIONS],
    }),
  }),
});

export const {
  useCreateOrganizationMutation,
  useCreatePharmacyMutation,
  useOrganizationStatsQuery,
  useViewAllOrganizationQuery,
  useInviteOrgAdminMutation,
  useViewAllPharmaciesQuery,
  useInvitePharmacyAdminMutation,
  useInviteProviderMutation,
  useViewAllInvitationsQuery,
  useCreateSubOrganizationMutation,
  useGenerateCredentialsMutation,
  useRevokeCredentialsMutation,
  useViewCredentialsQuery,
  useViewAllSubOrganizationQuery,
  useTrustedOrganizationsMutation,
} = adminApi;

export default adminApi;
