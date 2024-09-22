import React from "react";

interface ConversationMessageProps {
	content: string;
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({ content }) => {
	return (
		<div className="flex flex-col max-w-full px-4 py-3 rounded-[10px] bg-black bg-opacity-40">
			{content}
		</div>
	);
};

export default ConversationMessage;
