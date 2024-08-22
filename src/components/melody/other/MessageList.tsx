import React, { useEffect } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationMessage from "./ConversationMessage";
import ChatHeader from "../ChatInterface/ChatHeader";
import { useAppDispatch } from "@/store/hooks";
import { fetchMessagesByConversationId } from "@/store/features/melody/melodyThunks";

const MessageList = () => {
	const dispatch = useAppDispatch();
	const messages = useSelector((state: RootState) => state.melody.currentConversationMessages);
	const conversationId = useSelector((state: RootState) => state.melody.selectedConversationId);
	const currentSelectedModel = useSelector((state: RootState) => state.melody.currentSelectedModel);

	useEffect(() => {
		dispatch(fetchMessagesByConversationId({ conversationId: conversationId }));
	}, [dispatch, conversationId])

	return (
		<div className="flex flex-col w-full h-full gap-2 overflow-y-scroll hide-scrollbar">
			{currentSelectedModel && <ChatHeader />}
			{messages.map((message, index) => (
				<div key={index} className="w-full">
					<ConversationMessage iconUrl={message.iconUrl} senderType={message.senderType} senderName={message.senderName} content={message.content} />
				</div>
			))}
			{messages.map((message, index) => (
				<div key={index} className="w-full">
					<ConversationMessage iconUrl={message.iconUrl} senderType={message.senderType} senderName={message.senderName} content={message.content} />
				</div>
			))}
			{messages.map((message, index) => (
				<div key={index} className="w-full">
					<ConversationMessage iconUrl={message.iconUrl} senderType={message.senderType} senderName={message.senderName} content={message.content} />
				</div>
			))}
		</div>
	);
};

export default MessageList;
