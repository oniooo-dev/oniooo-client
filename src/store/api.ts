import axios from "axios";
import { supabase } from "@/utils/supabase/client";
import config from "@/config";

// Create Axios instance with base URL
const api = axios.create({
	baseURL: `${config.backendUrl}`,
	headers: {
		'Content-Type': 'application/json'
	}
});

// Add an interceptor to add the Authorization header to each request
api.interceptors.request.use(
	async (requestConfig) => {
		try {
			// Get the current session from Supabase
			const { data, error } = await supabase.auth.getSession();

			if (error || !data.session) {
				console.error("Failed to retrieve session:", error);
				return requestConfig;
			}

			// Set the Authorization header with the access token
			requestConfig.headers.Authorization = `Bearer ${data.session.access_token}`;
			return requestConfig;
		} catch (err) {
			console.error("Error in Axios request interceptor:", err);
			return Promise.reject(err);
		}
	},
	(error) => {
		console.error("Request error:", error);
		return Promise.reject(error);
	}
);

export default api;