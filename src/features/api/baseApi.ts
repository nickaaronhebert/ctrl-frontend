import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: () => ({}),
  reducerPath: "api",
  tagTypes: ["User", "Prescription", "Provider"],
});
