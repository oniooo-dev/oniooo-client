import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/lib/types";
import api from "@/store/api";

interface AuthError {
	message: string;
	name: string;
}

export const register = createAsyncThunk<
	User,
	{ username: string; email: string; password: string },
	{ rejectValue: AuthError }
>("auth/register", async (userData, { rejectWithValue }) => {
	try {
		console.log("Registering with data:", userData);

		if (userData.username === "" || userData.email === "" || userData.password === "") {
			return rejectWithValue({ message: "Please fill in all fields", name: "AuthError" });
		}

		const response = await api.post<User>("/auth/register", userData);

		if (response.status === 200) {
			return response.data;
		}

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
});

export const login = createAsyncThunk<{ user: User }, { email: string; password: string }, { rejectValue: AuthError }>(
	"auth/login",
	async (credentials: { email: string; password: string }, { rejectWithValue }) => {
		try {
			console.log("Logging in with credentials:", credentials);

			if (credentials.email === "" || credentials.password === "") {
				return rejectWithValue({ message: "Please fill in all fields", name: "AuthError" });
			}

			const response = await api.post("/auth/login", credentials);

			if (response.status === 200) {
				return response.data;
			}

			console.log(response.data);
			return response.data.user;
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

export const logout = createAsyncThunk<void, void, { rejectValue: AuthError }>(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.post("/auth/logout");

			if (response.status === 200) {
				return response.data;
			}

			return;
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
