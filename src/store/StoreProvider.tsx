"use client";

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store"; // Adjust the import according to your project structure

interface StoreProviderProps {
	children: React.ReactNode;
}

const LoadingPage: React.FC = () => {
	const imgUrl = "https://nofilmschool.com/media-library/the-thing.jpg?id=34081882&width=1245&height=700&quality=90&coordinates=148%2C0%2C148%2C0";
	return (
		<div className="absolute top-0 left-0 w-[100vw] h-[100vh] items-center justify-center bg-black text-white">
			{/* <img src={imgUrl} alt="Loading" className="w-full h-full" /> */}
			<p>Loading ...</p>
		</div>
	);
};

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
	return (
		<Provider store={store}>
			{persistor ? (
				<PersistGate loading={<LoadingPage />} persistor={persistor}>
					{children}
				</PersistGate>
			) : (
				<LoadingPage />
			)}
		</Provider>
	);
};

export default StoreProvider;
