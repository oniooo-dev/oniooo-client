import { Conversation, ConversationMessage, SavedAIModel } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// should return an array of AI models
export const fetchSavedAIModels = createAsyncThunk<SavedAIModel[], void, { rejectValue: Error }>(
	"melody/fetchSavedModels",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get("http://localhost:8080/api/v1/melody/models/saved");
			console.log(response.data.message);
			return response.data.savedModels;
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: error.message, name: "MelodyError" });
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
			const response = await axios.get("http://localhost:8080/api/v1/melody/conversations");
			console.log(response.data.message);
			return response.data.conversations;
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: error.message, name: "MelodyError" });
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
			const response = await axios.post(`/api/v1/melody/conversations`, requestData);
			return response.data;
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: error.message, name: "MelodyError" });
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
			const response = await axios.post(`/api/v1/melody/conversations`, requestData);
			return response.data; // should return an array of messages
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: error.message, name: "MelodyError" });
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
		const response = await axios.get(`/api/v1/melody/conversations/${params.conversationId}/messages`);
		return response.data; // should return an array of messages
	} catch (error: any) {
		if (error.response && error.response.data) {
			// Assuming the backend sends { message: string } in the response body
			return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
		} else {
			return rejectWithValue({ message: error.message, name: "MelodyError" });
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
			const response = await axios.patch(
				`/api/v1/melody/conversations/${params.conversationId}/title`,
				requestData,
			);
			return response.data; // should return an array of messages
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: error.message, name: "MelodyError" });
			}
		}
	},
);

export const deleteConversation = createAsyncThunk<void, { conversationId: string }, { rejectValue: MelodyError }>(
	"melody/deleteConversation",
	async (params: { conversationId: string }, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`/api/v1/melody/conversations/${params.conversationId}`);
			return response.data; // should return an array of messages
		} catch (error: any) {
			if (error.response && error.response.data) {
				// Assuming the backend sends { message: string } in the response body
				return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
			} else {
				return rejectWithValue({ message: error.message, name: "MelodyError" });
			}
		}
	},
);
