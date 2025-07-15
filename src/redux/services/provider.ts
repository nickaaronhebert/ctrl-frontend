import { TAG_GET_USER_PROFILE } from "@/types/baseApiTags";
import { baseApi } from ".";

export const providerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    verifyProviderInvitation: builder.mutation<any, any>({
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
  }),
});

export const {
  useVerifyProviderInvitationMutation,
  useAcceptProviderInvitationMutation,
  useAcceptProviderMedicalCredentialsMutation,
} = providerApi;
