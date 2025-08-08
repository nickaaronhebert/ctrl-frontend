import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type { IGetOrderById } from "@/types/responses/order";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllOrders: builder.query<any, ICommonSearchQuery>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/order?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
    }),

    viewOrderById: builder.query<IGetOrderById, string>({
      query: (id) => {
        return {
          url: `/order/${id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useViewAllOrdersQuery, useViewOrderByIdQuery } = orderApi;

export default orderApi;
