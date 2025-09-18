import type {
  IViewActivityLogDetails,
  IViewAllActivityLogs,
} from "@/types/responses/IViewAllActivityLogs";
import { baseApi } from ".";
import type { ICommonSearchQuery } from "@/types/requests/search";

const auditLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllAuditLogs: builder.query<IViewAllActivityLogs, ICommonSearchQuery>({
      query: ({ page, perPage, q, type }) => {
        const url = type
          ? `/audit-log?page=${page}&limit=${perPage}&q=${q}&type=${type}`
          : `/audit-log?page=${page}&limit=${perPage}&q=${q}`;
        return {
          url: url,
          method: "GET",
        };
      },
    }),

    viewAuditLogsDetails: builder.query<IViewActivityLogDetails, string>({
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
