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
            // No request data
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
            // No request data
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

export const createConversation = createAsyncThunk<void, { firstPrompt: string }, { rejectValue: MelodyFetchError }>(
    'melody/createConversation',
    async (params: { firstPrompt: string }, { rejectWithValue }) => {
        try {
            const requestData: { firstPrompt: string } = {
                firstPrompt: params.firstPrompt
            }
            const response = await axios.post(`/api/v1/melody/conversation`, requestData);
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

export const createConversationMessage = createAsyncThunk<void, { conversationId: string, prompt: string }, { rejectValue: MelodyPostError }>(
    'melody/createConversationMessage',
    async (params: { conversationId: string, prompt: string }, { rejectWithValue }) => {
        try {
            const requestData: { prompt: string } = {
                prompt: params.prompt
            }
            const response = await axios.post(`/api/v1/melody/conversation`, requestData);
            return response.data;     // should return an array of messages
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Assuming the backend sends { message: string } in the response body
                return rejectWithValue({ message: error.response.data.message, name: 'MelodyPostError' });
            } else {
                return rejectWithValue({ message: error.message, name: 'MelodyPostError' });
            }
        }
    }
)

export const updateConversationTitle = createAsyncThunk<void, { conversationId: string, newTitle: string }, { rejectValue: MelodyPutError }>(
    'melody/updateConversationTitle',
    async (params: { conversationId: string, newTitle: string }, { rejectWithValue }) => {
        try {
            const requestData: { newTitle: string } = {
                newTitle: params.newTitle
            }
            const response = await axios.post(`/api/v1/melody/conversation/${params.conversationId}/title`, requestData);
            return response.data;     // should return an array of messages
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Assuming the backend sends { message: string } in the response body
                return rejectWithValue({ message: error.response.data.message, name: 'MelodyPutError' });
            } else {
                return rejectWithValue({ message: error.message, name: 'MelodyPutError' });
            }
        }
    }
)

export const deleteConversationTitle = createAsyncThunk<void, { conversationId: string }, { rejectValue: MelodyPutError }>(
    'melody/deleteConversation',
    async (params: { conversationId: string, }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`/api/v1/melody/conversation/${params.conversationId}`);
            return response.data;     // should return an array of messages
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Assuming the backend sends { message: string } in the response body
                return rejectWithValue({ message: error.response.data.message, name: 'MelodyPutError' });
            } else {
                return rejectWithValue({ message: error.message, name: 'MelodyPutError' });
            }
        }
    }
)