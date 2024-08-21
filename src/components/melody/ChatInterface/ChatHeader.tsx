"use client";

import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ChatHeader = () => {
	const aiModel = useSelector((state: RootState) => state.melody.currentSelectedModel?.ai_model);
	return (
		<div className="flex flex-col w-full items-center justify-center mt-24 gap-4 mb-2">
			<div>
				<div className="w-16 h-16 rounded-full">
					<img src={aiModel?.icon_url} className="w-16 h-16 rounded-full" />
				</div>
			</div>
			<div className="flex flex-col items-center w-full gap-2">
				<p className="font-medium">{aiModel?.name}</p>
				<p className="font-normal">{aiModel?.short_description}</p>
			</div>
		</div>
	);
};

export default ChatHeader;
