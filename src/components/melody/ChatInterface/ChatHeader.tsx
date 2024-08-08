"use client";

import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ChatHeader = () => {
	const modelName = useSelector((state: RootState) => state.melody.selectedModelId);
	return (
		<div className="w-full">
			<p className="text-3xl font-semibold">{modelName}</p>
		</div>
	);
};

export default ChatHeader;
