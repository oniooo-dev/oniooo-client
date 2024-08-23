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
		<div className="flex w-full p-4">
			{senderType === "user" ? (
				<UserConversationMessage iconUrl={iconUrl} senderName={senderName} content={content} />
			) : (
				<OtherConversationMessage iconUrl={iconUrl} senderName={senderName} content={content} />
			)}
		</div>
	);
};

export default ConversationMessage;
