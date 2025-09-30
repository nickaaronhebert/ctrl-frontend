import type {
  IInviteOrgAdminRequest,
  IInviteProviderRequest,
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
  TAG_GET_ORGANIZATIONS,
  TAG_GET_PHARMACY,
  TAG_GET_PROVIDERS,
} from "@/types/baseApiTags";

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

    createPharmacy: builder.mutation<any, any>({
      query: (body) => ({
        url: `/business/pharmacy`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_PHARMACY],
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
} = adminApi;

export default adminApi;
