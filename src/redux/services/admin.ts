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
        url: `/invitation/pharmacy-admin`,
        method: "POST",
        body,
      }),
    }),

    createOrganization: builder.mutation<any, any>({
      query: (body) => ({
        url: `/business/organization`,
        method: "POST",
        body,
      }),
    }),

    createPharmacy: builder.mutation<any, any>({
      query: (body) => ({
        url: `/business/pharmacy`,
        method: "POST",
        body,
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
    }),
  }),
});

export const {
  useCreateOrganizationMutation,
  useCreatePharmacyMutation,
  useViewAllOrganizationQuery,
  useInviteOrgAdminMutation,
  useViewAllPharmaciesQuery,
  useInvitePharmacyAdminMutation,
} = adminApi;

export default adminApi;
