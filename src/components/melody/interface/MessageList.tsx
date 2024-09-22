import React, { useEffect, useRef } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationMessage from "../messages/ConversationMessage";
import { useAppDispatch } from "@/store/useAppDispatch";
import { fetchMessagesByChatId } from "@/store/features/melody/melodyThunks";
import ImageFile from "../messages/files/ImageFile";

interface MessageListProps {
	files: File[];
}

const MessageList: React.FC<MessageListProps> = ({ files }) => {
	const dispatch = useAppDispatch();
	const messages = useSelector((state: RootState) => state.melody.messages);
	const chatId = useSelector((state: RootState) => state.melody.selectedChatId);
	const user = useSelector((state: RootState) => state.auth.user);

	// Melody's icon url
	const melodyIconUrl = "https://tr.rbxcdn.com/196d20775e64758b25c76b4b2e470d89/420/420/Hat/Webp";

	// Create a ref for the messages container
	const messagesEndRef = useRef<HTMLDivElement>(null);

	// Effect to scroll to the bottom of the chat on new messages
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messages]); // Dependency on messages, so it triggers on message update

	let lastSender = "";

	// Fetch messages by conversation ID automatically
	useEffect(() => {
		dispatch(fetchMessagesByChatId({ chatId }));
	}, [dispatch, chatId]);

	return (
		<div className="flex flex-col max-w-full h-full gap-3 overflow-y-scroll hide-scrollbar">
			<div className="h-40"></div>
			<ImageFile imgUrl={null} />
			{messages.map((message, index) => {
				if (message.type === "SYSTEM_TEXT") {
					let currLastSender = lastSender;
					lastSender = "SYSTEM";
					return (
						<div key={index} className="flex flex-row w-full gap-4">
							{currLastSender !== "SYSTEM" ? (
								<img
									src={melodyIconUrl}
									className="w-8 h-8 rounded-full mt-[8px]"
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
						<div key={index} className="flex flex-row max-w-full ml-auto">
							<div className="flex flex-row gap-4 ml-auto">
								<ConversationMessage content={message.content} />
								{currLastSender !== "USER" ? (
									<img
										src={user?.icon_url}
										className="w-8 h-8 rounded-full mt-[8px]"
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
			{files && files.length > 0 ? <div className="mb-60"></div> : <div className="mb-24"></div>}
		</div>
	);
};

export default MessageList;
