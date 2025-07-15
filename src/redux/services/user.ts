import type { IUserResponse } from "@/types/responses/user-details";
import { baseApi } from ".";
import { TAG_GET_USER_PROFILE } from "@/types/baseApiTags";

const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    currentUserData: builder.query<IUserResponse, void>({
      query: () => {
        return {
          url: `/auth/me`,
          method: "get",
        };
      },
      providesTags: [TAG_GET_USER_PROFILE],
    }),
  }),
});

export const { useCurrentUserDataQuery } = userProfileApi;

export default userProfileApi;
