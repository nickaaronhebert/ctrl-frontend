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
    }),
  }),
});

export const {
  useVerifyProviderInvitationMutation,
  useAcceptProviderInvitationMutation,
  useAcceptProviderMedicalCredentialsMutation,
} = providerApi;
