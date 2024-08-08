"use client";

import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import PromptBox from "./PromptBox";

const MessageList = () => {
	const messages = useSelector((state: RootState) => state.melody.currentConversationMessages);
	return (
		<div className="flex flex-col w-full h-full overflow-y-scroll gap-2 bg-gray-950 hide-scrollbar">
			{messages.map((message, index) => (
				<div key={index}>
					<PromptBox sender={message.sender} content={message.content} />
				</div>
			))}
		</div>
	);
};

export default MessageList;
