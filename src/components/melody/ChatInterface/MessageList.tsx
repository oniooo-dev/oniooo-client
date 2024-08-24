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

	// Fetch messages by conversation ID automatically
	useEffect(() => {
		dispatch(fetchMessagesByConversationId({ conversationId: conversationId }));
	}, [dispatch, conversationId]);

	return (
		<div className="flex flex-col w-full h-full gap-1 overflow-y-scroll hide-scrollbar">
			{currentSelectedModel && <ChatHeader />}
			{messages.map((message, index) => (
				<div key={index} className="w-full">
					<ConversationMessage iconUrl={message.iconUrl} senderType={message.senderType} senderName={message.senderName} content={message.content} />
				</div>
			))}
			{files && files.length > 0 ? <div className="mb-60"></div> : <div className="mb-24"></div>}
		</div>
	);
};

export default MessageList;
