"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // Adjust the import according to your project structure

interface StoreProviderProps {
  children: React.ReactNode;
}

const LoadingPage: React.FC = () => {
	return (
		<div className="absolute top-0 left-0 w-[100vw] h-[100vh] items-center justify-center bg-black text-white">
			<p>Loading...</p>
		</div>
	)
}

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