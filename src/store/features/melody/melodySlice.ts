import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AIModel, Conversation, ConversationMessage, UserOwnedModels } from "@/lib/types";
import {
	fetchUserModelOwnerships,
	fetchUserConversations,
	fetchMessagesByConversationId,
	createConversation,
	createConversationMessage,
	updateConversationTitle,
	deleteConversation,
	fetchModelBasicDetails,
} from "./melodyThunks";

interface MelodyState {
	chatState: "idle" | "new" | "existing";
	loading: boolean;
	error: string | null;
	savedModels: UserOwnedModels[];
	selectedModelId: string;
	currentSelectedModel: AIModel | null;
	conversationHistory: Conversation[];
	selectedConversationId: string;
	currentConversationMessages: ConversationMessage[];
}

const initialState: MelodyState = {
	chatState: "idle",
	loading: false,
	error: null,
	savedModels: [],
	selectedModelId: "",
	currentSelectedModel: null,
	conversationHistory: [],
	selectedConversationId: "",
	currentConversationMessages: [],
};

export const melodySlice = createSlice({
	name: "melody",
	initialState,
	reducers: {
		selectModelById(state, action: PayloadAction<string>) {
			state.loading = true;
			state.chatState = "new";

			const newModelId = action.payload;

			state.selectedModelId = newModelId;
			state.currentSelectedModel = state.savedModels.find((model) => model.ai_model.model_id === newModelId) || null;

			// Reset the selected conversation id
			state.selectedConversationId = "";
			state.currentConversationMessages = [];
			state.loading = false;
		},
		selectConversationById(state, action: PayloadAction<string>) {
			state.loading = true;
			state.chatState = "existing";

			const newConversationId = action.payload;

			// Select conversation's model id
			// const newSelectedModelId = state.conversationHistory.find((conversation) => conversation.conversation_id === newConversationId)?.model_id || "";
			// console.log("Selected model id: ", newSelectedModelId);
			state.selectedModelId = "";
			state.selectedConversationId = newConversationId;
			// state.currentSelectedModel = null;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchModelBasicDetails.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchModelBasicDetails.fulfilled, (state, action: PayloadAction<AIModel>) => {
				state.loading = false;
				state.currentSelectedModel = action.payload;
				state.error = null;
			})
			.addCase(fetchModelBasicDetails.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
			})
			.addCase(createConversation.pending, (state) => {
				state.loading = true;
			})
			.addCase(createConversation.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(createConversation.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
			})
			.addCase(createConversationMessage.pending, (state) => {
				state.loading = true;
			})
			.addCase(createConversationMessage.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(createConversationMessage.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
			})
			.addCase(fetchUserModelOwnerships.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUserModelOwnerships.fulfilled, (state, action: PayloadAction<UserOwnedModels[]>) => {
				state.loading = false;
				state.error = null;
				state.savedModels = action.payload;
			})
			.addCase(fetchUserModelOwnerships.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
				state.savedModels = [];
			})
			.addCase(fetchUserConversations.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUserConversations.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
				state.loading = false;
				state.error = null;
				state.conversationHistory = action.payload;
			})
			.addCase(fetchUserConversations.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
				state.conversationHistory = [];
			})
			.addCase(fetchMessagesByConversationId.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMessagesByConversationId.fulfilled, (state, action: PayloadAction<ConversationMessage[]>) => {
				state.loading = false;
				state.error = null;
				state.currentConversationMessages = action.payload;
			})
			.addCase(fetchMessagesByConversationId.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
				state.currentConversationMessages = [];
			})
			.addCase(updateConversationTitle.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateConversationTitle.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(updateConversationTitle.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
			})
			.addCase(deleteConversation.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteConversation.fulfilled, (state) => {
				state.loading = false;
				state.error = null;
			})
			.addCase(deleteConversation.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
			});
	},
});

export const { selectModelById, selectConversationById } = melodySlice.actions;
export default melodySlice.reducer;
