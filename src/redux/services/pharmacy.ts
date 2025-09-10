import { TAG_GET_USER_PROFILE } from "@/types/baseApiTags";
import { baseApi } from ".";

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
  }),
});

export const {
  useVerifyPharmacyInvitationMutation,
  useAcceptPharmacyInvitationMutation,
  useSetActiveStatesMutation,
} = pharmacyApi;
