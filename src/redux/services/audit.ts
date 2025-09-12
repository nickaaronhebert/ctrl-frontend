import type { IViewAllActivityLogs } from "@/types/responses/IViewAllActivityLogs";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";

const auditLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllAuditLogs: builder.query<IViewAllActivityLogs, ICommonSearchQuery>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/audit-log?page=${page}&limit=${perPage}&q=${q}`,

          method: "GET",
        };
      },
    }),

    viewAuditLogsDetails: builder.query<any, string>({
      query: (id) => {
        return {
          url: `/audit-log/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useViewAllAuditLogsQuery, useViewAuditLogsDetailsQuery } =
  auditLogsApi;

export default auditLogsApi;
