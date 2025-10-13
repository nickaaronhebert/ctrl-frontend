import { TAG_GET_PROVIDERS, TAG_GET_USER_PROFILE } from "@/types/baseApiTags";
import { baseApi } from ".";
import type { IGetAllAffiliatedProvidersResponse } from "@/types/responses/provider";
import type { ICommonSearchQuery } from "@/types/requests/search";
import type { IVerifyProviderInvitationResponse } from "@/types/responses/IVerifyProviderInvitation";
import type { IVerifyProviderInvitationRequest } from "@/types/requests/IVerifyProviderInvitationRequest";
import type { IViewAllPrescriptions } from "@/types/responses/IViewAllPrescriptions";

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyProviderInvitation: builder.mutation<
      IVerifyProviderInvitationResponse,
      IVerifyProviderInvitationRequest
    >({
      query: (body) => ({
        url: `/invitation/verify-invitation`,
        method: "POST",
        body,
      }),
    }),

    acceptProviderInvitation: builder.mutation<any, any>({
      query: (body) => ({
        url: `/invitation/accept-provider-group-invitation`,
        method: "POST",
        body,
      }),
    }),

    acceptProviderMedicalCredentials: builder.mutation<any, any>({
      query: (body) => ({
        url: `/user/medical-credentials`,
        method: "POST",
        body,
      }),
      invalidatesTags: [TAG_GET_USER_PROFILE],
    }),

    viewAffiliateProviders: builder.query<
      IGetAllAffiliatedProvidersResponse,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, q = "", organization }) => {
        const orgUrl = organization ? `&organization=${organization}` : "";
        return {
          url: `/business/affiliations?page=${page}&limit=${perPage}&q=${q}${orgUrl}`,
          method: "GET",
        };
      },
      providesTags: [TAG_GET_PROVIDERS],
    }),

    viewAllPrescriptions: builder.query<
      IViewAllPrescriptions,
      ICommonSearchQuery
    >({
      query: ({ page, perPage, q = "" }) => ({
        url: `/prescription?page=${page}&limit=${perPage}&q=${q}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useVerifyProviderInvitationMutation,
  useAcceptProviderInvitationMutation,
  useAcceptProviderMedicalCredentialsMutation,
  useViewAffiliateProvidersQuery,
  useViewAllPrescriptionsQuery,
} = providerApi;
