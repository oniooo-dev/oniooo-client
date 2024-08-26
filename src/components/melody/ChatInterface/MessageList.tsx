import React, { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationMessage from "../other/ConversationMessage";
import ChatHeader from "./ChatHeader";
import { useAppDispatch } from "@/store/hooks";
import { fetchMessagesByConversationId } from "@/store/features/melody/melodyThunks";

interface MessageListProps {
	files: File[];
}

const MessageList: React.FC<MessageListProps> = ({ files }) => {
	const dispatch = useAppDispatch();
	const messages = useSelector((state: RootState) => state.melody.currentConversationMessages);
	const conversationId = useSelector((state: RootState) => state.melody.selectedConversationId);
	const currentSelectedModel = useSelector((state: RootState) => state.melody.currentSelectedModel);
	const [lastSender, setLastSender] = useState<string>("");

	// Fetch messages by conversation ID automatically
	useEffect(() => {
		dispatch(fetchMessagesByConversationId({ conversationId }));
	}, [dispatch, conversationId]);

	return (
		<div className="flex flex-col w-full h-full gap-4 overflow-y-scroll hide-scrollbar">
			{currentSelectedModel && <ChatHeader />}
			{messages.map((message, index) => (
				<div key={index} className="flex flex-row w-full gap-2">
					{message.senderType === "user" ? (
						<div className="flex flex-row gap-2">
							{lastSender !== message.senderName ? (
								<img src={message.iconUrl} alt="User Icon" className="w-8 h-8 rounded-full" />
							) : (
								<div className="w-8 h-8 rounded-full"></div>
							)}
							<ConversationMessage content={message.content} />
						</div>
					) : (
						<div className="flex flex-row gap-2">
							<ConversationMessage content={message.content} />
							<img src={message.iconUrl} alt="User Icon" className="w-8 h-8 rounded-full" />
						</div>
					)}
				</div>
			))}
			{files && files.length > 0 ? <div className="mb-60"></div> : <div className="mb-24"></div>}
		</div>
	);
};

export default MessageList;
