"use client";

import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ChatHeader = () => {
	const modelName = useSelector((state: RootState) => state.melody.selectedModelId);
	return (
		<div className="flex flex-col w-full items-center justify-center mt-16 mb-4">
			<div>
				<div className="w-16 h-16 bg-white rounded-full"></div>
			</div>
			<div className="flex flex-col items-center w-full">
				<p className="font-medium">{modelName}</p>
				<p className="">Your lovely cute helper, always with you</p>
			</div>
		</div>
	);
};

export default ChatHeader;
