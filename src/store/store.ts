"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import melodyReducer from "./features/melody/melodySlice";
import { combineReducers } from "redux";

export interface RootState {
	auth: ReturnType<typeof authReducer>;
	melody: ReturnType<typeof melodyReducer>;
}

// Combine the reducers
const rootReducer = combineReducers({
	auth: authReducer,
	melody: melodyReducer,
});

// Configure the store with the persisted reducer
export const store = configureStore({
	reducer: rootReducer,
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
