import { Conversation, ConversationMessage, SavedAIModel } from '@/lib/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSavedAIModels = createAsyncThunk<SavedAIModel[], void, { rejectValue: Error }>(
    'melody/fetchSavedModels',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/melody/models/saved');
            return response.data;     // should return an array of AI models
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Assuming the backend sends { message: string } in the response body
                return rejectWithValue({ message: error.response.data.message, name: 'MelodyFetchError' });
            } else {
                return rejectWithValue({ message: error.message, name: 'MelodyFetchError' });
            }
        }
    }
);

export const fetchConversationHistory = createAsyncThunk<Conversation[], void, { rejectValue: MelodyFetchError }>(
    'melody/fetchConversationHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/api/v1/melody/conversations');
            return response.data;     // should return an array of conversations
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Assuming the backend sends { message: string } in the response body
                return rejectWithValue({ message: error.response.data.message, name: 'MelodyFetchError' });
            } else {
                return rejectWithValue({ message: error.message, name: 'MelodyFetchError' });
            }
        }
    }
)

export const fetchConversationMessages = createAsyncThunk<ConversationMessage[], { conversationId: string }, { rejectValue: MelodyFetchError }>(
    'melody/fetchConversationMessages',
    async (params: { conversationId: string }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/melody/conversation/${params.conversationId}/messages`);
            return response.data;     // should return an array of messages
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Assuming the backend sends { message: string } in the response body
                return rejectWithValue({ message: error.response.data.message, name: 'MelodyFetchError' });
            } else {
                return rejectWithValue({ message: error.message, name: 'MelodyFetchError' });
            }
        }
    }
)