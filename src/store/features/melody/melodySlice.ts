import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MelodyChat, MelodyMessage } from "@/lib/types";
import { ChatState } from "@/lib/enums";
import {
	createChat,
	fetchChats,
	createChatMessage,
	fetchMessagesByChatId,
	updateChat,
	deleteChat,
} from "./melodyThunks";

interface MelodyState {
	chatState: ChatState;
	loading: boolean;
	error: string | null;
	chats: MelodyChat[];
	selectedChatId: string;
	messages: MelodyMessage[];
}

const initialState: MelodyState = {
	chatState: ChatState.NEW_CHAT,
	loading: false,
	chats: [],
	selectedChatId: "",
	messages: [],
	error: null,
};

export const melodySlice = createSlice({
	name: "melody",
	initialState,
	reducers: {
		selectChat(state, action: PayloadAction<{ chatId: string }>) {
			state.loading = true;
			state.chatState = ChatState.EXISTING_CHAT;
			state.selectedChatId = action.payload.chatId;
			state.error = null;
			state.loading = false;
		},
		startNewMelodyChat(state) {
			state.loading = true;
			state.chatState = ChatState.NEW_CHAT;
			state.selectedChatId = "";
			state.messages = [];
			state.error = null;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createChat.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				createChat.fulfilled,
				(state, action: PayloadAction<{ newChat: MelodyChat; newMessage: MelodyMessage }>) => {
					state.loading = false;
					state.chatState = ChatState.EXISTING_CHAT;
					state.chats = [action.payload.newChat, ...state.chats];
					state.selectedChatId = action.payload.newChat.chat_id;
					state.messages = [action.payload.newMessage];
					state.error = null;
				},
			)
			.addCase(createChat.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
			})
			.addCase(fetchChats.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchChats.fulfilled, (state, action: PayloadAction<MelodyChat[]>) => {
				state.loading = false;
				state.error = null;
				state.chats = action.payload;
			})
			.addCase(fetchChats.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
				state.chats = [];
			})
			.addCase(createChatMessage.pending, (state) => {
				state.loading = true;
			})
			.addCase(createChatMessage.fulfilled, (state, action: PayloadAction<MelodyMessage>) => {
				state.loading = false;
				state.messages = [action.payload, ...state.messages];
				state.error = null;
			})
			.addCase(createChatMessage.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
			})
			.addCase(fetchMessagesByChatId.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMessagesByChatId.fulfilled, (state, action: PayloadAction<MelodyMessage[]>) => {
				state.loading = false;
				state.error = null;
				state.messages = action.payload;
			})
			.addCase(fetchMessagesByChatId.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
				state.messages = [];
			})
			.addCase(updateChat.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateChat.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(updateChat.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
			})
			.addCase(deleteChat.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteChat.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(deleteChat.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
			});
	},
});

export const { selectChat, startNewMelodyChat } = melodySlice.actions;
export default melodySlice.reducer;
