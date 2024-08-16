import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AIModel, Conversation, ConversationMessage, SavedAIModel } from "@/lib/types";
import {
	fetchSavedAIModels,
	fetchConversationHistory,
	fetchMessagesByConversationId,
	createConversation,
	createConversationMessage,
	updateConversationTitle,
	deleteConversation,
} from "./melodyThunks";

interface MelodyState {
	loading: boolean;
	error: string | null;
	savedModels: SavedAIModel[];
	selectedModelId: string;
	currentSelectedModel: AIModel | null;
	conversationHistory: Conversation[];
	selectedConversationId: string;
	currentConversationMessages: ConversationMessage[];
}

const initialState: MelodyState = {
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
			state.selectedModelId = action.payload;
			state.currentSelectedModel = state.savedModels.find((model) => model.id === action.payload) || null;
		},
		selectConversationById(state, action: PayloadAction<string>) {
			state.selectedConversationId = action.payload;
			fetchMessagesByConversationId({ conversationId: action.payload });
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSavedAIModels.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchSavedAIModels.fulfilled, (state, action: PayloadAction<SavedAIModel[]>) => {
				state.loading = false;
				state.error = null;
				state.savedModels = action.payload;
			})
			.addCase(fetchSavedAIModels.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
				state.loading = false;
				state.error = action.payload ? action.payload.message : "Unknown server error";
				state.savedModels = [];
			})
			.addCase(fetchConversationHistory.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchConversationHistory.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
				state.loading = false;
				state.error = null;
				state.conversationHistory = action.payload;
			})
			.addCase(fetchConversationHistory.rejected, (state, action: PayloadAction<MelodyError | undefined>) => {
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
			.addCase(
				fetchMessagesByConversationId.rejected,
				(state, action: PayloadAction<MelodyError | undefined>) => {
					state.loading = false;
					state.error = action.payload ? action.payload.message : "Unknown server error";
					state.currentConversationMessages = [];
				},
			)
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
