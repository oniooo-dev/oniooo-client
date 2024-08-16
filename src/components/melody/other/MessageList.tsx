"use client";

import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationMessage from "./ConversationMessage";

const MessageList = () => {
	const messages = useSelector((state: RootState) => state.melody.currentConversationMessages);
	return (
		<div className="flex flex-col w-full h-full gap-2 overflow-y-scroll hide-scrollbar">
			{messages.map((message, index) => (
				<div key={index} className="w-full">
					<ConversationMessage
						iconUrl={message.iconUrl}
						senderType={message.senderType}
						senderName={message.senderName}
						content={message.content}
					/>
				</div>
			))}
		</div>
	);
};

export default MessageList;
