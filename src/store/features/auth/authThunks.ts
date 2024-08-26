import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { AxiosError } from "axios";
import { User } from "@/lib/types";
import api from "@/store/api";

interface AuthError {
	message: string;
	name: string;
}

export const register = createAsyncThunk<User, { username: string; email: string; password: string }, { rejectValue: AuthError }>(
	"auth/register",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await api.post<User>("/auth/register", userData);
			console.log(response.data);
			return response.data;
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "AuthError" });
			} else {
				return rejectWithValue({ message: error.message, name: "AuthError" });
			}
		}
	},
);

export const login = createAsyncThunk<User, { email: string; password: string }, { rejectValue: AuthError }>(
	"auth/login",
	async (credentials: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const response = await api.post<User>("/auth/login", credentials);
			console.log(response.data);
			return response.data;
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "AuthError" });
			} else {
				return rejectWithValue({ message: error.message, name: "AuthError" });
			}
		}
	},
);

export const logout = createAsyncThunk<void, void, { rejectValue: AuthError }>("auth/logout", async (_, { rejectWithValue }) => {
	try {
		const response = await api.post("/auth/logout");
		return;
	} catch (error: any) {
		if (error.response && error.response.data) {
			// Assuming the backend sends { message: string } in the response body
			return rejectWithValue({ message: error.response.data.message, name: "AuthError" });
		} else {
			return rejectWithValue({ message: error.message, name: "AuthError" });
		}
	}
});
