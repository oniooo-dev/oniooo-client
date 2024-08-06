import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, ConversationMessage, SavedAIModel } from '@/lib/types';
import { fetchSavedAIModels, fetchConversationHistory, fetchConversationMessages } from './melodyThunks';

interface MelodyState {
    loading: boolean;
    error: Error | null;
    savedModels: SavedAIModel[];
    selectedModelId: string;
    conversations: Conversation[];
    selectedConversationId: string;
}

const initialState: MelodyState = {
    loading: false,
    error: null,
    savedModels: [],
    selectedModelId: '',
    conversations: [],
    selectedConversationId: '',
}

const melodySlice = createSlice({
    name: 'melody',
    initialState,
    reducers: {
        selectModelById(state, action: PayloadAction<string>) {
            state.selectedModelId = action.payload;
        },
        selectConversationById(state, action: PayloadAction<string>) {
            state.selectedConversationId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSavedAIModels.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchSavedAIModels.fulfilled, (state, action: PayloadAction<SavedAIModel[]>) => {
            state.loading = false;
            state.error = null;
            state.savedModels = action.payload
        })
        .addCase(fetchSavedAIModels.rejected, (state, action: PayloadAction<MelodyFetchError | undefined>) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'Unknown server error';
            state.
        })
        .addCase(fetchConversationHistory.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchConversationHistory.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchConversationHistory.rejected, (state, action: PayloadAction<MelodyFetchError | undefined>) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'Unknown server error';
        })
        .addCase(fetchConversationMessages.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchConversationMessages.fulfilled, (state, action: PayloadAction<ConversationMessage[]>) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchConversationMessages.rejected, (state, action: PayloadAction<MelodyFetchError | undefined>) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'Unknown server error';
        })
        .addCase(fetchConversationMessages.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchConversationMessages.fulfilled, (state, action: PayloadAction<ConversationMessage[]>) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchConversationMessages.rejected, (state, action: PayloadAction<MelodyFetchError | undefined>) => {
            state.loading = false;
            state.error = action.payload ? action.payload.message : 'Unknown server error';
        })
    }
})