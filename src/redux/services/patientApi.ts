import type { ICommonSearchQuery } from "@/types/requests/search";
import { baseApi } from ".";
import type { PatientApiResponse } from "@/types/responses/patient";

const patientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPatientDetails: builder.query<PatientApiResponse, ICommonSearchQuery>({
      query: ({ page, perPage, q }) => {
        return {
          url: `/patient?page=${page}&limit=${perPage}&q=${q}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetPatientDetailsQuery } = patientApi;
