import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/global/commonTypes";
import type { RootState } from "@/redux/store";

export const AUTH_KEY = "auth";

const persistedAuth =
  localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY);

interface AuthState {
  user: (User & { token?: string }) | null;
}

const initialState: AuthState = {
  user: persistedAuth ? JSON.parse(persistedAuth) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = { ...action.payload.user, token: action.payload.token };
      sessionStorage.setItem(
        AUTH_KEY,
        JSON.stringify({ ...action.payload.user, token: action.payload.token })
      );
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({ ...action.payload.user, token: action.payload.token })
      );
    },
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem(AUTH_KEY);
      localStorage.removeItem(AUTH_KEY);
    },
  },
});
export const selectCurrentUser = (state: RootState) => {
  const user = state.auth.user;
  return user && typeof user.token === "string" && user.token.trim()
    ? user
    : null;
};
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
