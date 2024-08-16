import React from "react";
import UserConversationMessage from "./UserConversationMessage";
import OtherConversationMessage from "./OtherConversationMessage";

interface ConversationMessageProps {
	iconUrl: string;
	senderName: string;
	senderType: string;
	content: string;
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({ iconUrl, senderType, senderName, content }) => {
	return (
		<div className="flex w-full p-4 rounded-lg bg-white bg-opacity-5 hover:bg-opacity-15 duration-500 cursor-pointer">
			{senderType === "user" ? (
				<UserConversationMessage iconUrl={iconUrl} senderName={senderName} content={content} />
			) : (
				<OtherConversationMessage iconUrl={iconUrl} senderName={senderName} content={content} />
			)}
		</div>
	);
};

export default ConversationMessage;
