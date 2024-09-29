import React, { useEffect, useRef } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationMessage from "../messages/ConversationMessage";
import { useChatSocket } from "@/contexts/ChatSocketContext";

interface MessageListProps {
	files: File[];
}

const MessageList: React.FC<MessageListProps> = ({ files }) => {
	// Redux Stuff
	const user = useSelector((state: RootState) => state.auth.user);

	// Context Provider
	const { messages } = useChatSocket();

	// Stuff ...
	const melodyIconUrl = "https://tr.rbxcdn.com/196d20775e64758b25c76b4b2e470d89/420/420/Hat/Webp";
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]);

	return (
		<div className="flex flex-col max-w-full h-full gap-4 pt-12 overflow-y-scroll hide-scrollbar">
			{
				messages.map((message, index) => {
					const isSystem = message.type === "SYSTEM_TEXT";
					return (
						<div key={index} className={`flex flex-row w-full gap-4`}>
							{
								<img
									src={isSystem ? melodyIconUrl : user?.icon_url}
									className="w-9 h-9 rounded-full mt-[4px]"
								/>
							}
							<ConversationMessage content={message.content} />
						</div>
					);
				})
			}
			<div ref={messagesEndRef} /> {/* Scroll to bottom ref */}
			{files && files.length > 0 ? <div className="mb-60"></div> : <div className="mb-2"></div>}
		</div>
	);
};

export default MessageList;