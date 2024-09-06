import axios, { AxiosError } from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080/api/v1",
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
