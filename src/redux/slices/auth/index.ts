import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "@/redux/services/authApi";
import type { RootState } from "@/redux/reducers";
import { providerApi } from "@/redux/services/provider";
import type { Provider } from "@/types/global/commonTypes";
import { pharmacyApi } from "@/redux/services/pharmacy";
import userProfileApi from "@/redux/services/user";
export const AUTH_TOKEN = "auth_token";
export const PROVIDER_KEY = "provider";
export const PHARMACY_KEY = "pharmacy";
export const ORGANIZATION_ADMIN_KEY = "org_admin";

interface Pharmacy {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
}

interface OrgAdmin {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  organization: string;
}

const persistedToken =
  localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);

const providerToken =
  localStorage.getItem(PROVIDER_KEY) || sessionStorage.getItem(PROVIDER_KEY);

const pharmacyToken =
  localStorage.getItem(PHARMACY_KEY) || sessionStorage.getItem(PHARMACY_KEY);

const organizationToken =
  localStorage.getItem(ORGANIZATION_ADMIN_KEY) ||
  sessionStorage.getItem(ORGANIZATION_ADMIN_KEY);

interface AuthState {
  token: string | null;
  provider: Provider | null;
  pharmacy: Pharmacy | null;
  organization: OrgAdmin | null;
}

const initialState: AuthState = {
  token: persistedToken ? persistedToken : null,
  provider: providerToken ? JSON.parse(providerToken) : null,
  pharmacy: pharmacyToken ? JSON.parse(pharmacyToken) : null,
  organization: organizationToken ? JSON.parse(organizationToken) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_TOKEN);
    },
  },
  extraReducers(builder) {
    // builder.addMatcher(
    //   authApi.endpoints.login.matchFulfilled,

    //   (state, { payload }) => {
    //     if (payload?.data.access_token) {
    //       state.token = payload?.data.access_token;

    //       sessionStorage.setItem(
    //         AUTH_TOKEN,
    //         JSON.stringify(payload?.data.access_token)
    //       );
    //       localStorage.setItem(
    //         AUTH_TOKEN,
    //         JSON.stringify(payload?.data.access_token)
    //       );
    //     } else {
    //       state.token = null;
    //       state.token = "";

    //       localStorage.removeItem(AUTH_TOKEN);
    //       sessionStorage.removeItem(AUTH_TOKEN);
    //     }
    //   }
    // );
    builder.addMatcher(
      authApi.endpoints.verifyOtp.matchFulfilled,
      (state, { payload }) => {
        const token = payload?.data?.access_token;

        if (token) {
          state.token = token;
          sessionStorage.setItem(AUTH_TOKEN, token);
          localStorage.setItem(AUTH_TOKEN, token);
        } else {
          state.token = null;
          sessionStorage.removeItem(AUTH_TOKEN);
          localStorage.removeItem(AUTH_TOKEN);
        }
      }
    ),
      builder.addMatcher(
        providerApi.endpoints.acceptProviderInvitation.matchFulfilled,
        (state, { payload }) => {
          if (payload?.data.token) {
            state.token = payload?.data.token;

            sessionStorage.removeItem("provider_token");
            localStorage.removeItem("provider_token");
            sessionStorage.removeItem("provider");
            localStorage.removeItem("provider");
            sessionStorage.setItem("auth_token", payload?.data.token);
            localStorage.setItem("auth_token", payload?.data.token);
          } else {
            localStorage.removeItem("auth_token");
            sessionStorage.removeItem("auth_token");
          }
        }
      );
    builder.addMatcher(
      providerApi.endpoints.acceptProviderInvitation.matchRejected,
      (_, { payload }) => {
        if (payload?.data) {
        } else {
          console.error(`something went wrong`);
        }
        console.error(payload, "error");
      }
    );

    builder.addMatcher(
      pharmacyApi.endpoints.acceptPharmacyInvitation.matchFulfilled,
      (state, { payload }) => {
        if (payload?.data.token) {
          state.token = payload?.data.token;

          sessionStorage.removeItem("pharmacy_token");
          localStorage.removeItem("pharmacy_token");
          sessionStorage.removeItem("pharmacy");
          localStorage.removeItem("pharmacy");
          sessionStorage.setItem("auth_token", payload?.data.token);
          localStorage.setItem("auth_token", payload?.data.token);
        } else {
          localStorage.removeItem("auth_token");
          sessionStorage.removeItem("auth_token");
        }
      }
    );
    builder.addMatcher(
      pharmacyApi.endpoints.acceptPharmacyInvitation.matchRejected,
      (_, { payload }) => {
        if (payload?.data) {
        } else {
          console.error(
            `something went wrong while accepting pharmacy invitation`
          );
        }
        console.error(payload, "error");
      }
    );

    builder.addMatcher(
      userProfileApi.endpoints.acceptOrgAdminInvitation.matchFulfilled,
      (state, { payload }) => {
        if (payload?.data.token) {
          state.token = payload?.data.token;

          sessionStorage.removeItem("org_admin_token");
          localStorage.removeItem("org_admin_token");
          sessionStorage.removeItem("org_admin");
          localStorage.removeItem("org_admin");
          sessionStorage.setItem("auth_token", payload?.data.token);
          localStorage.setItem("auth_token", payload?.data.token);
        } else {
          localStorage.removeItem("auth_token");
          sessionStorage.removeItem("auth_token");
        }
      }
    );

    builder.addMatcher(
      userProfileApi.endpoints.acceptOrgAdminInvitation.matchRejected,
      (_, { payload }) => {
        if (payload?.data) {
        } else {
          console.error(
            `something went wrong while accepting organization invitation`
          );
        }
        console.error(payload, "error");
      }
    );

    builder.addMatcher(
      providerApi.endpoints.verifyProviderInvitation.matchFulfilled,
      (state, { payload }) => {
        if (payload?.data) {
          state.provider = payload?.data;

          sessionStorage.setItem(PROVIDER_KEY, JSON.stringify(payload?.data));
          localStorage.setItem(PROVIDER_KEY, JSON.stringify(payload?.data));
        } else {
          state.provider = null;

          sessionStorage.removeItem(PROVIDER_KEY);

          localStorage.removeItem(PROVIDER_KEY);
        }
      }
    );
    builder.addMatcher(
      providerApi.endpoints.verifyProviderInvitation.matchRejected,
      (_, { payload }) => {
        if (payload?.data) {
        } else {
          console.error(`something went wrong`);
        }
        console.error(payload, "error");
      }
    );

    builder.addMatcher(
      pharmacyApi.endpoints.verifyPharmacyInvitation.matchFulfilled,
      (state, { payload }) => {
        if (payload?.data) {
          state.pharmacy = payload?.data;

          sessionStorage.setItem(PHARMACY_KEY, JSON.stringify(payload?.data));
          localStorage.setItem(PHARMACY_KEY, JSON.stringify(payload?.data));
        } else {
          state.provider = null;

          sessionStorage.removeItem(PHARMACY_KEY);

          localStorage.removeItem(PHARMACY_KEY);
        }
      }
    );
    builder.addMatcher(
      pharmacyApi.endpoints.verifyPharmacyInvitation.matchRejected,
      (_, { payload }) => {
        if (payload?.data) {
        } else {
          console.error(`something went wrong`);
        }
        console.error(payload, "error");
      }
    );

    builder.addMatcher(
      userProfileApi.endpoints.verifyOrganizationInvitation.matchFulfilled,
      (state, { payload }) => {
        if (payload?.data) {
          state.organization = payload?.data;

          sessionStorage.setItem(
            ORGANIZATION_ADMIN_KEY,
            JSON.stringify(payload?.data)
          );
          localStorage.setItem(
            ORGANIZATION_ADMIN_KEY,
            JSON.stringify(payload?.data)
          );
        } else {
          state.organization = null;

          sessionStorage.removeItem(ORGANIZATION_ADMIN_KEY);
          localStorage.removeItem(ORGANIZATION_ADMIN_KEY);
        }
      }
    );

    builder.addMatcher(
      userProfileApi.endpoints.verifyOrganizationInvitation.matchRejected,
      (_, { payload }) => {
        if (payload?.data) {
        } else {
          console.error(`something went wrong`);
        }
        console.error(payload, "error");
      }
    );
  },
});

export const selectIsLoggedIn = (state: RootState) => {
  return !!state.auth.token;
};
export const selectProvider = (state: RootState) => state.auth.provider;
export const selectPharmacy = (state: RootState) => state.auth.pharmacy;
export const selectOrgAdmin = (state: RootState) => state.auth.organization;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
