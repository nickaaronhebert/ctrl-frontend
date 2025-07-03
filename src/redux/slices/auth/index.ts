import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/global/commonTypes";
import type { RootState } from "@/redux/store";

export const AUTH_KEY = "auth";
export const AUTH_TOKEN = "auth_token";

const persistedAuth =
  localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY);
const persistedToken =
  localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: persistedAuth ? JSON.parse(persistedAuth) : null,
  token: persistedToken ? JSON.parse(persistedToken) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(action.payload.user));
      sessionStorage.setItem(AUTH_TOKEN, JSON.stringify(action.payload.token));
      localStorage.setItem(AUTH_KEY, JSON.stringify(action.payload.user));
      localStorage.setItem(AUTH_TOKEN, JSON.stringify(action.payload.token));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      sessionStorage.removeItem(AUTH_KEY);
      sessionStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_TOKEN);
    },
  },
});
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
