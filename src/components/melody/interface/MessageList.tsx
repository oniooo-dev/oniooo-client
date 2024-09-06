import React, { useEffect, useRef } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationMessage from "../messages/ConversationMessage";
import ChatHeader from "./ChatHeader";
import { useAppDispatch } from "@/store/useAppDispatch";
import { fetchMessagesByChatId } from "@/store/features/melody/melodyThunks";
import { motion, AnimatePresence } from "framer-motion";

interface MessageListProps {
	files: File[];
}

const MessageList: React.FC<MessageListProps> = ({ files }) => {
	const dispatch = useAppDispatch();
	const messages = useSelector((state: RootState) => state.melody.messages);
	const chatId = useSelector((state: RootState) => state.melody.selectedChatId);

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
		<div className="flex flex-col max-w-full h-full gap-4 overflow-y-scroll hide-scrollbar">
			<ChatHeader />
			<AnimatePresence>
				{messages.length === 0 && (
					<motion.div className="flex flex-row w-full gap-4">
						<img
							src="https://tr.rbxcdn.com/196d20775e64758b25c76b4b2e470d89/420/420/Hat/Webp"
							className="w-8 h-8 rounded-full mt-[8px]"
						/>
						<ConversationMessage content={"Hi"} />
					</motion.div>
				)}
			</AnimatePresence>
			{messages.map((message, index) => {
				if (message.type === "SYSTEM_TEXT") {
					let currLastSender = lastSender;
					lastSender = "SYSTEM";
					return (
						<div key={index} className="flex flex-row w-full gap-4">
							{currLastSender !== "SYSTEM" ? (
								<img
									src="https://tr.rbxcdn.com/196d20775e64758b25c76b4b2e470d89/420/420/Hat/Webp"
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
										src="https://pbs.twimg.com/media/F-28_vlXcAAcJFP.jpg"
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
