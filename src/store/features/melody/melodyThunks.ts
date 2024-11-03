import { MelodyChat, MelodyMessage } from "@/lib/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/store/api";

// should return an array of messages
export const createChat = createAsyncThunk<
	{ newChat: MelodyChat; newMessage: MelodyMessage },
	{ firstPrompt: string, modelName: string },
	{ rejectValue: MelodyError }
>("melody/createChat", async (params: { firstPrompt: string, modelName: string }, { rejectWithValue }) => {
	try {
		const requestData: { firstPrompt: string, modelName: string } = {
			firstPrompt: params.firstPrompt,
			modelName: params.modelName
		};
		const response = await api.post(`/melody/chats`, requestData);

		// returns newMessage
		return response.data;
	} catch (error: any) {
		if (error.response && error.response.data) {
			// Assuming the backend sends { message: string } in the response body
			return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
		} else {
			return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
		}
	}
});

// should return an array of chats
export const fetchChats = createAsyncThunk<MelodyChat[], void, { rejectValue: MelodyError }>(
	"melody/fetchChats",
	async (_, { rejectWithValue }) => {
		try {
			// No request data
			const response = await api.get("/melody/chats");
			console.log(response.data);
			return response.data.chats;
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

export const createChatMessage = createAsyncThunk<
	MelodyMessage,
	{ chatId: string; message: string },
	{ rejectValue: MelodyError }
>("melody/createChatMessage", async (params: { chatId: string; message: string }, { rejectWithValue }) => {
	try {
		const requestData: { message: string } = {
			message: params.message,
		};
		const response = await api.post(`/melody/chats/${params.chatId}/messages`, requestData);
		return response.data.newMessage;
	} catch (error: any) {
		if (error.response && error.response.data) {
			// Assuming the backend sends { message: string } in the response body
			return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
		} else {
			return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
		}
	}
});

export const fetchMessagesByChatId = createAsyncThunk<
	MelodyMessage[],
	{ chatId: string },
	{ rejectValue: MelodyError }
>("melody/fetchMessagesByChatId", async (params: { chatId: string }, { rejectWithValue }) => {
	try {
		if (!params.chatId) {
			return rejectWithValue({ message: "Chat ID is required", name: "MelodyError" });
		}

		console.log("Fetching messages by chat id...");

		const response = await api.get(`/melody/chats/${params.chatId}/messages`);
		return response.data.messages;
	} catch (error: any) {
		if (error.response && error.response.data) {
			// Assuming the backend sends { message: string } in the response body
			return rejectWithValue({ message: error.response.data.message, name: "MelodyError" });
		} else {
			return rejectWithValue({ message: "Internal Server Error", name: "MelodyError" });
		}
	}
});

export const updateChat = createAsyncThunk<void, { chatId: string; newTitle: string }, { rejectValue: MelodyError }>(
	"melody/updateChat",
	async (params: { chatId: string; newTitle: string }, { rejectWithValue }) => {
		try {
			const requestData: { newTitle: string } = {
				newTitle: params.newTitle,
			};
			const response = await api.patch(`/melody/chats/${params.chatId}/title`, requestData);
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

export const deleteChat = createAsyncThunk<void, { chatId: string }, { rejectValue: MelodyError }>(
	"melody/deleteChat",
	async (params: { chatId: string }, { rejectWithValue }) => {
		try {
			const response = await api.delete(`/melody/chats/${params.chatId}`);
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
