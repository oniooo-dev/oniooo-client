import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ConversationMessage from "../other/ConversationMessage";
import ChatHeader from "../ChatInterface/ChatHeader";
import { DaoYouMessage } from "@/lib/types";

interface UnsignedMessageListProps {
    messages: DaoYouMessage[];
}

const UnsignedMessageList: React.FC<UnsignedMessageListProps> = ({ messages }) => {
	// const messages = useSelector((state: RootState) => state.melody.currentConversationMessages);
	// const conversationId = useSelector((state: RootState) => state.melody.selectedConversationId);
	// const currentSelectedModel = useSelector((state: RootState) => state.melody.currentSelectedModel);
	return (
		<div className="flex flex-col w-full h-full gap-2 overflow-y-scroll hide-scrollbar">
			<ChatHeader />
			{messages.map((message, index) => (
				<div key={index} className="w-full">
					<ConversationMessage iconUrl={message.iconUrl} senderType={message.senderType} senderName={message.senderName} content={message.content} />
				</div>
			))}
		</div>
	);
};

export default UnsignedMessageList;
