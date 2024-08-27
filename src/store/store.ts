"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import melodyReducer from "./features/melody/melodySlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { PersistConfig, Persistor, persistReducer, persistStore } from "redux-persist";

export interface RootState {
	auth: ReturnType<typeof authReducer>;
	melody: ReturnType<typeof melodyReducer>;
}

// Combine the reducers
const rootReducer = combineReducers({
	auth: authReducer,
	melody: melodyReducer,
});

const isClient = typeof window !== "undefined";

const noopStorage = {
	getItem: async (_: string) => null,
	setItem: async (_: string, __: any) => {},
	removeItem: async (_: string) => {},
	clear: async () => {},
};

// Configuration for redux-persist
const persistConfig: PersistConfig<RootState> = {
	key: "root",
	storage: isClient ? storage : noopStorage,
	whitelist: ["auth", "melody"],
};

// Apply redux-persist to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
			},
		})
});

export const persistor: Persistor | null = isClient ? persistStore(store) : null;

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
