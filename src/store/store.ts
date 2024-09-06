"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import melodyReducer from "./features/melody/melodySlice";
import { combineReducers } from "redux";
<<<<<<< HEAD
=======
import { PersistConfig, Persistor, persistReducer, persistStore } from "redux-persist";
>>>>>>> 93a2e6609c7419898473533b42c078f7d6561893

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
<<<<<<< HEAD
	reducer: rootReducer,
=======
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
			},
		})
>>>>>>> 93a2e6609c7419898473533b42c078f7d6561893
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
