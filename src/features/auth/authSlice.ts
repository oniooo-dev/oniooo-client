import { User } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, register } from "./authThunks";

// Define a type for the slice state
interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	loading: boolean;
	error: String | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthErrorPayload {
  error: AuthError;
}

const initialState: AuthState = {
	isAuthenticated: false,
  user: null as User | null,
  loading: false,
  error: null as string | null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(login.rejected, (state, action: PayloadAction<AuthError | undefined>) => {
      state.loading = false;
      state.error = action.payload ? action.payload.message : 'Unknown authentication error';
})
    .addCase(register.pending, (state) => {
      state.loading = true;
    })
    .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(register.rejected, (state, action: PayloadAction<AuthError | undefined>) => {
      state.loading = false;
      state.error = action.payload ? action.payload.message : 'Unknown authentication error';
})
    .addCase(logout.pending, (state) => {
      state.loading = true;
    })
    .addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    })
    .addCase(logout.rejected, (state, action: PayloadAction<AuthError | undefined>) => {
      state.loading = false;
      state.error = action.payload ? action.payload.message : 'Unknown authentication error';
})
  },
});

export default authSlice.reducer;