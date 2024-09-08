import React, { createContext, useState } from "react";

// Define the shape of the context value
interface CustomerServiceContextValue {
	customerName: string;
	setCustomerName: (name: string) => void;
}

// Create the context
export const CustomerServiceContext = createContext<CustomerServiceContextValue>({
	customerName: "",
	setCustomerName: () => {},
});

// Create the provider component
export const CustomerServiceContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [customerName, setCustomerName] = useState("");

	return (
		<CustomerServiceContext.Provider value={{ customerName, setCustomerName }}>
			{children}
		</CustomerServiceContext.Provider>
	);
};
