import axios, { AxiosError } from "axios";
import dotenv from "dotenv";

dotenv.config();

const baseURL = process.env.NODE_ENV === 'production'
	? process.env.NEXT_PUBLIC_PRODUCTION_BACKEND_URL
	: process.env.DEVELOPMENT_BACKEND_URL;

const api = axios.create({
	baseURL,
});

// Add a response interceptor
api.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		if (error.response && error.response.status === 401) {
			const { store } = await import("./store");
			const { logout } = await import("./features/auth/authThunks");
			await store.dispatch(logout());
		}
		return Promise.reject(error);
	},
);

export default api;
