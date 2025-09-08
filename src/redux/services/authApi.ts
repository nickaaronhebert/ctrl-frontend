// src/api/authApi.ts
import { TAG_GET_USER_PROFILE } from "@/types/baseApiTags";
import { baseApi } from ".";
import {
  type LoginRequest,
  type RequestPasswordResetRequest,
  type EditProfileRequest,
  type ResendOtpRequest,
} from "@/types/requests";
import {
  type LoginResponse,
  type LogoutResponse,
  type RequestPasswordResetResponse,
  type ResetPasswordResponse,
  type EditProfileResponse,
  type ResendOtpResponse,
} from "@/types/responses";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => {
        const basicAuthHeader = `Basic ${btoa(`${username}:${password}`)}`;

        return {
          url: "/auth/login",
          method: "POST",
          headers: {
            Authorization: basicAuthHeader,
          },
          body: {},
        };
      },
      invalidatesTags: [TAG_GET_USER_PROFILE],
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: "/auth/change-password",
        method: "PUT",
        body,
      }),
      invalidatesTags: [TAG_GET_USER_PROFILE],
    }),

    verifyOtp: builder.mutation<
      LoginResponse,
      { username: string; password: string; otpCode: string }
    >({
      query: ({ username, password, otpCode }) => {
        const basicAuthHeader = `Basic ${btoa(`${username}:${password}`)}`;
        return {
          url: "/auth/verify/otp",
          method: "POST",
          headers: {
            Authorization: basicAuthHeader,
          },
          body: { otpCode },
        };
      },
      invalidatesTags: [TAG_GET_USER_PROFILE],
    }),

    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpRequest>({
      query: ({ username, password }) => {
        const basicAuthHeader = `Basic ${btoa(`${username}:${password}`)}`;
        return {
          url: "/auth/resend/otp",
          method: "POST",
          headers: {
            Authorization: basicAuthHeader,
          },
          body: {},
        };
      },
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    requestPasswordReset: builder.mutation<
      RequestPasswordResetResponse,
      RequestPasswordResetRequest
    >({
      query: (body) => ({
        url: "/auth/forgot",
        method: "POST",
        headers: {
          // No Header
        },
        body,
      }),
    }),

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      { password: string; token: string }
    >({
      query: ({ password, token }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: {
          password,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    editProfile: builder.mutation<EditProfileResponse, EditProfileRequest>({
      query: (body) => ({
        url: "/user",
        method: "PUT",
        body,
      }),
      invalidatesTags: [TAG_GET_USER_PROFILE],
    }),

    // Update affiliation status
    updateAffiliationStatus: builder.mutation<
      void,
      { id: string; status: boolean }
    >({
      query: ({ id, status }) => ({
        url: `/user/affiliation-status/${id}`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: [TAG_GET_USER_PROFILE],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useEditProfileMutation,
  useUpdateAffiliationStatusMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useUpdatePasswordMutation,
} = authApi;
