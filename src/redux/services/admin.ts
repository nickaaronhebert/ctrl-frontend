import { baseApi } from ".";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // currentUserData: builder.query<any, void>({
    //   query: () => {
    //     return {
    //       url: `/auth/me`,
    //       method: "get",
    //     };
    //   },
    // }),

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

    // Stats API organziation //
    organizationStats: builder.query({
      query: () => ({
        url: "/organization/stats",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrganizationMutation,
  useCreatePharmacyMutation,
  useOrganizationStatsQuery,
} = adminApi;

export default adminApi;
