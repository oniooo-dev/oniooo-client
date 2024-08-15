"use client";

import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import PromptBox from "./PromptBox";
import ConversationMessage from "./ConversationMessage";

const MessageList = () => {
	const messages = useSelector((state: RootState) => state.melody.currentConversationMessages);
	return (
		<div className="flex flex-col w-full h-full gap-2 overflow-y-scroll hide-scrollbar">
			{messages.map((message, index) => (
				<div key={index}>
					<PromptBox sender={message.sender} content={message.content} />
				</div>
			))}
			<ConversationMessage 
				iconUrl={`https://detoyboys.nl/342138-thickbox_default/crayon-shin-chan-cosplay-pvc-statue-shin-chan-vol-5-ver-b-10-cm.jpg`} 
				sender="user" 
				senderName="Supermarket Yin Phat" 
				content="I love nuts!" 
			/>
		</div>
	);
};

export default MessageList;
