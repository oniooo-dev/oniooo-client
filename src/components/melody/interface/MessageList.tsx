import React, { useEffect, useRef } from "react";
import ConversationMessage from "../messages/ConversationMessage";
import { useChatSocket } from "@/contexts/ChatSocketContext";
import { useAuth } from "@/contexts/AuthContext";

interface MessageListProps {
	files: File[];
}

const MessageList: React.FC<MessageListProps> = ({ files }) => {
	const { user } = useAuth();
	const { messages, waitingForMessageState } = useChatSocket();

	// Stuff ...
	const melodyIconUrl = "https://tr.rbxcdn.com/196d20775e64758b25c76b4b2e470d89/420/420/Hat/Webp";
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages, waitingForMessageState]);

	const mapWaitingStateToMessage = (state: string) => {
		if (state === "TYPING") {
			return "...";
		}
		else if (state === "GENERATING_IMAGE") {
			return "Generating an image for you"
		}
	}

	return (
		<div className="flex flex-col max-w-full h-full gap-4 pt-36 overflow-y-scroll hide-scrollbar">
			{
				messages.map((message, index) => {
					const isSystem = message.type === "SYSTEM_TEXT" || message.type === "SYSTEM_FILE";
					return (
						<div key={index} className={`flex flex-row w-full gap-4`}>
							<img
								src={isSystem ? melodyIconUrl : user?.iconUrl}
								className="w-9 h-9 rounded-full mt-[4px]"
							/>
							<ConversationMessage type={message.type} content={message.content} />
						</div>
					);
				})
			}
			{
				waitingForMessageState &&
				(
					<div>
						<p>{mapWaitingStateToMessage(waitingForMessageState)}</p>
					</div>
				)
			}
			<div ref={messagesEndRef} /> {/* Scroll to bottom ref */}
			{files && files.length > 0 ? <div className="mb-60"></div> : <div className="mb-2"></div>}
		</div>
	);
};

export default MessageList;