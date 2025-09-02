import { baseApi } from ".";

const auditLogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllAuditLogs: builder.query<any, any>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/audit-log?page=${page}&limit=${perPage}&q=${q}`,
          //   url: `/order?page=${page}&limit=${perPage}&q=${q}&patient=${patient}`,
          method: "GET",
        };
      },
      //   providesTags: (result) => {
      //     return result
      //       ? [
      //           ...result?.data?.map(({ id }) => ({
      //             type: "Orders" as const,
      //             id,
      //           })),
      //           { type: "Orders", id: "LIST" },
      //         ]
      //       : [{ type: "Orders", id: "LIST" }];
      //   },
    }),

    // createOrder: builder.mutation<ICreateOrderResponse, ICreateOrderRequest>({
    //   query: (body) => {
    //     return {
    //       url: `/order`,
    //       method: "POST",
    //       body,
    //     };
    //   },
    //   invalidatesTags: (result) =>
    //     result ? [{ type: "Orders", id: "LIST" }] : [],
    // }),
  }),
});

export const { useViewAllAuditLogsQuery } = auditLogsApi;

export default auditLogsApi;
