import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { AxiosError } from "axios";
import { User } from "@/lib/types";

const api = axios.create({
	baseURL: "http://localhost:8080/api/v1/auth",
});

export const register = createAsyncThunk<User, { username: string; email: string; password: string }, { rejectValue: AuthError }>(
	"auth/register",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await axios.post<User>("/register", userData);
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
			const response = await api.post<User>("/login", credentials);
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
		const response = await axios.post("/logout");
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
