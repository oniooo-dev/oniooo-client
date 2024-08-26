import React from "react";

interface ConversationMessageProps {
	content: string;
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({ content }) => {
	return (
		<div className="flex w-fit px-4 py-2 rounded-[10px] bg-white bg-opacity-15">
			<p>{content}</p>
		</div>
	);
};

export default ConversationMessage;
