import React, { useEffect, useRef, useState } from "react";
import ConversationMessage from "../messages/ConversationMessage";
import MelodyHeader from "./MelodyHeader";
import { DaoYouMessage } from "@/lib/types";

interface UnsignedMessageListProps {
	messages: DaoYouMessage[];
}

const UnsignedMessageList: React.FC<UnsignedMessageListProps> = ({ messages }) => {
	// Create a ref for the messages container
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Effect to scroll to the bottom of the chat on new messages
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]); // Dependency on messages, so it triggers on message update

	let lastSender = "";
	return (
		<div className="flex flex-col w-full h-full gap-4 overflow-y-scroll hide-scrollbar">
			<MelodyHeader />
			{messages.map((message, index) => {
				if (message.type === "SYSTEM_TEXT") {
					let currLastSender = lastSender;
					lastSender = "SYSTEM";
					return (
						<div key={index} className="flex flex-row w-[90%] gap-4">
							{currLastSender !== "SYSTEM" ? (
								<img
									src="https://tr.rbxcdn.com/196d20775e64758b25c76b4b2e470d89/420/420/Hat/Webp"
									className="w-8 h-8 rounded-full mt-1"
								/>
							) : (
								<div className="w-8 h-8 rounded-full" />
							)}
							<ConversationMessage content={message.content} />
						</div>
					);
				} else {
					let currLastSender = lastSender;
					lastSender = "USER";
					return (
						<div key={index} className="flex flex-row w-[90%] ml-auto">
							<div className="flex flex-row gap-4 ml-auto">
								<ConversationMessage content={message.content} />
								{currLastSender !== "USER" ? (
									<img
										src="https://pbs.twimg.com/media/F-28_vlXcAAcJFP.jpg"
										className="w-8 h-8 rounded-full mt-1"
									/>
								) : (
									<div className="w-8 h-8 rounded-full" />
								)}
							</div>
						</div>
					);
				}
			})}
			<div ref={messagesEndRef} className="h-4"></div>
		</div>
	);
};

export default UnsignedMessageList;
