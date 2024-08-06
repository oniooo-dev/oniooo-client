import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../lib/types';

export const login = createAsyncThunk<User, { username: string; password: string }, { rejectValue: AuthError }>(
    'auth/login',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
          const response = await axios.post<User>('/api/v1/auth/login', credentials);
          return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Assuming the backend sends { message: string } in the response body
                return rejectWithValue({ message: error.response.data.message, name: 'AuthError' });
            } else {
                return rejectWithValue({ message: error.message, name: 'AuthError' });
            }
        }
    }
);

export const register = createAsyncThunk<User, { username: string; password: string }, { rejectValue: AuthError }>(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post<User>('/api/v1/auth/register', userData);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Assuming the backend sends { message: string } in the response body
                return rejectWithValue({ message: error.response.data.message, name: 'AuthError' });
            } else {
                return rejectWithValue({ message: error.message, name: 'AuthError' });
            }
        }
    }
);

export const logout = createAsyncThunk<void, void, { rejectValue: AuthError }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/v1/auth/logout');
            return;
        } catch (error: any) {
            if (error.response && error.response.data) {
                // Assuming the backend sends { message: string } in the response body
                return rejectWithValue({ message: error.response.data.message, name: 'AuthError' });
            } else {
                return rejectWithValue({ message: error.message, name: 'AuthError' });
            }
        }
    }
);