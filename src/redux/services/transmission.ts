import type { IViewAllTransmissionsResponse } from "@/types/responses/transmission";
import { baseApi } from ".";

const transmissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    viewAllTransmissions: builder.query<IViewAllTransmissionsResponse, void>({
      query: () => {
        return {
          url: `/transmission`,
          method: "get",
        };
      },
    }),
  }),
});

export const { useViewAllTransmissionsQuery } = transmissionApi;

export default transmissionApi;
