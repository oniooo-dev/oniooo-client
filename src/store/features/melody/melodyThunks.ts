import { Conversation, ConversationMessage, SavedAIModel } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080/api/v1/melody",
});

// should return an array of AI models
export const fetchSavedAIModels = createAsyncThunk<SavedAIModel[], void, { rejectValue: Error }>(
	"melody/fetchSavedModels",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/models/saved");
			console.log(response.data.message);
			return response.data.savedModels;
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
			}
		}
	},
);

// should return an array of conversations
export const fetchConversationHistory = createAsyncThunk<Conversation[], void, { rejectValue: MelodyError }>(
	"melody/fetchConversationHistory",
	async (_, { rejectWithValue }) => {
		try {
			// No request data
			const response = await api.get("/conversations");
			console.log(response.data.message);
			return response.data.conversations;
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
			}
		}
	},
);

// should return an array of messages
export const createConversation = createAsyncThunk<void, { firstPrompt: string }, { rejectValue: MelodyError }>(
	"melody/createConversation",
	async (params: { firstPrompt: string }, { rejectWithValue }) => {
		try {
			const requestData: { firstPrompt: string } = {
				firstPrompt: params.firstPrompt,
			};
			const response = await api.post(`/conversations`, requestData);
			return response.data;
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
			}
		}
	},
);

export const createConversationMessage = createAsyncThunk<
	void,
	{ conversationId: string; prompt: string },
	{ rejectValue: MelodyError }
>(
	"melody/createConversationMessage",
	async (params: { conversationId: string; prompt: string }, { rejectWithValue }) => {
		try {
			const requestData: { prompt: string } = {
				prompt: params.prompt,
			};
			const response = await api.post(`/conversations`, requestData);
			return response.data; // should return an array of messages
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
			}
		}
	},
);

export const fetchMessagesByConversationId = createAsyncThunk<
	ConversationMessage[],
	{ conversationId: string },
	{ rejectValue: MelodyError }
>("melody/fetchMessagesByConversationId", async (params: { conversationId: string }, { rejectWithValue }) => {
	try {
		// No request data
		const response = await api.get(`/conversations/${params.conversationId}/messages`);
		return response.data.conversationMessages; // should return an array of messages
	} catch (error: any) {
		if (error.response && error.response.data) {
			// Assuming the backend sends { message: string } in the response body
			return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
		} else {
			return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
		}
	}
});

export const updateConversationTitle = createAsyncThunk<
	void,
	{ conversationId: string; newTitle: string },
	{ rejectValue: MelodyError }
>(
	"melody/updateConversationTitle",
	async (params: { conversationId: string; newTitle: string }, { rejectWithValue }) => {
		try {
			const requestData: { newTitle: string } = {
				newTitle: params.newTitle,
			};
			const response = await api.patch(`/conversations/${params.conversationId}/title`, requestData);
			return response.data; // should return an array of messages
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
			}
		}
	},
);

export const deleteConversation = createAsyncThunk<void, { conversationId: string }, { rejectValue: MelodyError }>(
	"melody/deleteConversation",
	async (params: { conversationId: string }, { rejectWithValue }) => {
		try {
			const response = await api.delete(`/conversations/${params.conversationId}`);
			return response.data; // should return an array of messages
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
			}
		}
	},
);
