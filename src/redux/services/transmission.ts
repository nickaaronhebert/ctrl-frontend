import type {
  IViewAllTransmissionsRequest,
  IViewAllTransmissionsResponse,
} from "@/types/responses/transmission";
import { baseApi } from ".";

const transmissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllTransmissions: builder.query<
      IViewAllTransmissionsResponse,
      IViewAllTransmissionsRequest
    >({
      query: ({ page, perPage }) => {
        return {
          url: `/transmission?page=${page}&limit=${perPage}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useViewAllTransmissionsQuery } = transmissionApi;

export default transmissionApi;
