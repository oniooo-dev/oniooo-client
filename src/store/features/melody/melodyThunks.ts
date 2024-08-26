import { AIModel, Conversation, ConversationMessage, UserOwnedModels } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/api";

export const fetchModelBasicDetails = createAsyncThunk<AIModel, { modelId: string | undefined }, { rejectValue: Error }>(
	"melody/fetchModelBasicDetails",
	async (params: { modelId: string | undefined }, { rejectWithValue }) => {
		try {
			if (!params.modelId) {
				return rejectWithValue(new Error("Model ID is required"));
			}
			console.log("Fetching model basic details...");
			console.log("Model ID: ", params.modelId);
			const response = await api.get(`/ais/${params.modelId}/basics`);
			console.log("Fetched model basic details: ", response.data.ai_model);
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

// should return an array of messages
export const createConversation = createAsyncThunk<void, { modelId: string; firstPrompt: string }, { rejectValue: MelodyError }>(
	"melody/createConversation",
	async (params: { modelId: string; firstPrompt: string }, { rejectWithValue }) => {
		try {
			const requestData: { modelId: string; firstPrompt: string } = {
				modelId: params.modelId,
				firstPrompt: params.firstPrompt,
			};
			const response = await api.post(`/melody/conversations`, requestData);
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

// should return an array of AI models
export const fetchUserModelOwnerships = createAsyncThunk<UserOwnedModels[], void, { rejectValue: Error }>(
	"melody/fetchUserModelOwnerships",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/melody/models/saved");
			console.log(response.data.message);
			return response.data.userOwnedModels;
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
export const fetchUserConversations = createAsyncThunk<Conversation[], void, { rejectValue: MelodyError }>(
	"melody/fetchUserConversations",
	async (_, { rejectWithValue }) => {
		try {
			// No request data
			const response = await api.get("/melody/conversations");
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

// ...
// ...
// ...

export const createConversationMessage = createAsyncThunk<void, { conversationId: string; prompt: string }, { rejectValue: MelodyError }>(
	"melody/createConversationMessage",
	async (params: { conversationId: string; prompt: string }, { rejectWithValue }) => {
		try {
			const requestData: { prompt: string } = {
				prompt: params.prompt,
			};
			const response = await api.post(`/melody/conversations`, requestData);
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

export const fetchMessagesByConversationId = createAsyncThunk<ConversationMessage[], { conversationId: string }, { rejectValue: MelodyError }>(
	"melody/fetchMessagesByConversationId",
	async (params: { conversationId: string }, { rejectWithValue }) => {
		try {
			if (!params.conversationId) {
				return rejectWithValue({ message: "Conversation ID is required", name: "MelodyError" });
			}

			console.log("Fetching messages by conversation id...");

			// No request data
			const response = await api.get(`/melody/conversations/${params.conversationId}/messages`);
			return response.data.conversationMessages; // should return an array of messages
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

export const updateConversationTitle = createAsyncThunk<void, { conversationId: string; newTitle: string }, { rejectValue: MelodyError }>(
	"melody/updateConversationTitle",
	async (params: { conversationId: string; newTitle: string }, { rejectWithValue }) => {
		try {
			const requestData: { newTitle: string } = {
				newTitle: params.newTitle,
			};
			const response = await api.patch(`/melody/conversations/${params.conversationId}/title`, requestData);
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
			const response = await api.delete(`/melody/conversations/${params.conversationId}`);
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
