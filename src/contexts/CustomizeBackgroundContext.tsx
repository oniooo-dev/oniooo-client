import React, { createContext, useContext, useState } from "react";

interface CustomizeBackgroundContextType {
	backgroundColor: string;
	setBackgrounColor: (color: string) => void;
	backgroundImage: string;
	setBackgroundImage: (image: string) => void;
}

export const CustomizeBackgroundContext = createContext<CustomizeBackgroundContextType>({
	backgroundColor: "",
	setBackgrounColor: () => {},
	backgroundImage: "https://wallpapers.com/images/hd/blue-aesthetic-moon-df8850p673zj275y.jpg",
	setBackgroundImage: () => {},
});

export const useCustomizeBackground = () => {
	const context = useContext(CustomizeBackgroundContext);

	if (!context) {
		throw new Error("useCustomizeBackground must be used within a CustomizeBackgroundProvider");
	}

	return context;
};

export const CustomizeBackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [backgroundColor, setBackgrounColor] = useState("");
	const [backgroundImage, setBackgroundImage] = useState(
		"https://wallpapers.com/images/hd/blue-aesthetic-moon-df8850p673zj275y.jpg",
	);
	return (
		<CustomizeBackgroundContext.Provider
			value={{ backgroundColor, setBackgrounColor, backgroundImage, setBackgroundImage }}
		>
			{children}
		</CustomizeBackgroundContext.Provider>
	);
};
