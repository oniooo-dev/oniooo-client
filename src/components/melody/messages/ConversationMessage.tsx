import React from "react";
import Markdown from 'react-markdown'

interface ConversationMessageProps {
	content: string;
}

const ConversationMessage: React.FC<ConversationMessageProps> = ({ content }) => {
	return (
		<div className="flex flex-col max-w-[80%] px-6 py-4 rounded-[10px] bg-black bg-opacity-60 border-[2px] border-opacity-20 border-pink-200 backdrop-filter backdrop-blur-sm leading-7">
			<Markdown>
				{content}
			</Markdown>
		</div>
	);
};

export default ConversationMessage;
