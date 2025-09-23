import type { IUserResponse } from "@/types/responses/user-details";
import { baseApi } from ".";
import { TAG_GET_USER_PROFILE } from "@/types/baseApiTags";
import type { IAcceptOrgAdminInvitationRequest } from "@/types/requests/IAcceptOrgAdminInvitation";
import type { IAcceptOrgAdminInvitationResponse } from "@/types/responses/IAcceptOrgAdminInvitationResponse";
import type { IVerifyOrgAdminInvitationResponse } from "@/types/responses/IVerifyOrganizationAdminInvitation";
import type { IVerifyOrgAdminInvitationRequest } from "@/types/requests/IVerifyOrgAdminRequest";

const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    currentUserData: builder.query<IUserResponse, void>({
      query: () => {
        return {
          url: `/auth/me`,
          method: "get",
        };
      },
      providesTags: [TAG_GET_USER_PROFILE],
    }),

    verifyOrganizationInvitation: builder.mutation<
      IVerifyOrgAdminInvitationResponse,
      IVerifyOrgAdminInvitationRequest
    >({
      query: (body) => ({
        url: `/invitation/verify-invitation`,
        method: "POST",
        body,
      }),
    }),

    acceptOrgAdminInvitation: builder.mutation<
      IAcceptOrgAdminInvitationResponse,
      IAcceptOrgAdminInvitationRequest
    >({
      query: (body) => ({
        url: `/invitation/accept-organization-invitation`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCurrentUserDataQuery,
  useVerifyOrganizationInvitationMutation,
  useAcceptOrgAdminInvitationMutation,
} = userProfileApi;

export default userProfileApi;
